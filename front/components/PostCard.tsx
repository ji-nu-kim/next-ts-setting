import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Button, Card, Popover, List, Avatar, Comment } from 'antd';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

interface postCardProps {
  post: {
    id: number;
    User: {
      id: string;
      nickname: string;
    };
    content: string;
    Images: { src: string }[];
    Comments: { User: { nickname: string }; content: string }[];
  };
}

function PostCard({ post }: postCardProps) {
  const id = useSelector((state: RootStateInterface) => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleFormOpened = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleFormOpened} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button danger>삭제</Button>
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
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
