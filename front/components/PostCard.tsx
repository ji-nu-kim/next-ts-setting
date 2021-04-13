import {
  likePostRequestAction,
  removePostRequestAction,
  retweetRequestAction,
  unlikePostRequestAction,
} from '../actions/actionPost';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { IPost } from '../interfaces/db';
import { Button, Card, Popover, List, Avatar, Comment } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';

interface postCardProps {
  post: IPost;
}

function PostCard({ post }: postCardProps) {
  const dispatch = useDispatch();
  const id = useSelector((state: RootStateInterface) => state.user.me?.id);
  const { removePostLoading } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const liked = post.Likers.find(v => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다');
    }
    return dispatch(likePostRequestAction({ postId: post.id }));
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다');
    }
    return dispatch(unlikePostRequestAction({ postId: post.id }));
  }, [id]);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleFormOpened = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    return dispatch(removePostRequestAction({ postId: post.id }));
  }, [post]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다');
    }
    return dispatch(retweetRequestAction({ postId: post.id }));
  }, [id, post]);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleFormOpened} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      danger
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            {/* <div style={{ float: 'right' }}>
            {moment(post.createdAt).format('YYYY.MM.DD')}
          </div> */}
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            {/* <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div> */}
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default PostCard;
