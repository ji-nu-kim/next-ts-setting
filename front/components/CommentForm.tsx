import { IPost } from '../interfaces/db';
import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { addCommentRequestAction } from '../actions/actionPost';
import useInput from '../hooks/useInput';
import { RootStateInterface } from '../interfaces/RootState';
import { useDispatch, useSelector } from 'react-redux';

interface CommentFormProps {
  post: IPost;
}

function CommentForm({ post }: CommentFormProps) {
  const dispatch = useDispatch();
  const id = useSelector((state: RootStateInterface) => state.user.me?.id);
  const { addCommentDone } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput<string>(
    ''
  );

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    if (id) {
      dispatch(
        addCommentRequestAction({
          comment: commentText,
          postId: post.id,
          userId: id,
        })
      );
    }
  }, [commentText, post, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 10 }}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
