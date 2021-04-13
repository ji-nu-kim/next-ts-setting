const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id', 'nickname', 'email'],
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(user);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userInfo = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'nickname', 'email'],
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(userInfo);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('로그아웃 되었습니다');
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    return res.status(201).send('회원가입이 되었습니다');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const searchUser = await User.findOne({
      where: parseInt(req.params.userId, 10),
    });
    if (!searchUser) {
      return res.status(403).send('유저를 찾을 수 없습니다');
    }
    // 상대방의 팔로워에 나를 추가
    await searchUser.addFollowers(req.user.id);
    return res.status(200).json({ userId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const searchUser = await User.findOne({
      where: parseInt(req.params.userId, 10),
    });
    if (!searchUser) {
      return res.status(403).send('유저를 찾을 수 없습니다');
    }
    await searchUser.removeFollowers(req.user.id);
    return res.status(200).json({ userId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다');
    }
    const followers = await user.getFollowers();
    const followersInfo = followers.map(v => ({
      id: v.id,
      nickname: v.nickname,
    }));
    return res.status(200).json(followersInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다');
    }
    const followings = await user.getFollowings();
    const followingsInfo = followings.map(v => ({
      id: v.id,
      nickname: v.nickname,
    }));
    return res.status(200).json(followingsInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: parseInt(req.params.userId, 10),
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다');
    }
    await user.removeFollowings(req.user.id);
    return res.status(200).json({ userId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
