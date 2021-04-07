import useInput from '@hooks/useInput';
import { RootStateInterface } from '@interfaces/RootState';
import { Form, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

interface CommentFormProps {
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

function CommentForm({ post }: CommentFormProps) {
  const id = useSelector((state: RootStateInterface) => state.user.me?.id);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const onSubmitComment = useCallback(() => {
    setCommentText('');
  }, [commentText]);

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
