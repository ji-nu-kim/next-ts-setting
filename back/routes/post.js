const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  // 저장위치(현재: 서버 hdd, 미래: 인터넷 스토리지 서비스)
  storage: multer.diskStorage({
    // 저장될 폴더
    destination(req, file, done) {
      done(null, 'uploads');
    },
    // 저장될 파일명
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(hashtag =>
          Hashtag.findOrCreate({
            where: { name: hashtag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map(v => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // Promise.all로 비동기 요청을 한 번에 처리
        const images = await Promise.all(
          req.body.image.map(img => Image.create({ src: img }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      attributes: ['id', 'content', 'createdAt', 'updatedAt', 'RetweetId'],
      include: [
        { model: Image },
        { model: User, attributes: ['id', 'nickname'] },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    return res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 프론트 input name="image"에서 올린 사진들이 upload.array('image')로 전달됨
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: parseInt(req.params.postId, 10),
        UserId: req.user.id,
      },
    });
    return res.status(200).json({ postId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다');
    }
    const comment = await Comment.create({
      content: req.body.comment,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      attributes: ['id', 'content', 'PostId'],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다');
    }
    await post.addLikers(req.user.id);
    return res.status(200).json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다');
    }
    await post.removeLikers(req.user.id);
    return res.status(200).json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다');
    }
    // 내가 쓴 게시물, 내 게시물을 남이 리트윗한 게시물을 리트윗하는 것을 방지
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신이 쓴 게시물을 리트윗 할 수 없습니다');
    }
    // 리트윗된 게시물이면 오리지널 게시물의 id를 사용
    const retweetTargetId = post.RetweetId || post.id;
    // 리트윗한 게시물을 다시 리트윗하는 걸 방지
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다');
    }
    const retweetPost = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const prevRetweetPost = await Post.findOne({
      where: { id: retweetPost.id },
      attributes: ['id', 'content', 'createdAt', 'updatedAt', 'RetweetId'],
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            { model: Image },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        { model: Image },
      ],
    });
    return res.status(201).json(prevRetweetPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
