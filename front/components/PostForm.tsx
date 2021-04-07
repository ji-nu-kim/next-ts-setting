import { addPostAction } from '@actions/actionPost';
import useInput from '@hooks/useInput';
import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';

function PostForm() {
  const { imagePaths } = useSelector((state: RootStateInterface) => state.post);
  const dispatch = useDispatch();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageInput = imageInputRef.current;

  const [text, onChangeText, setText] = useInput('');
  const onSubmit = useCallback(() => {
    dispatch(addPostAction());
    setText('');
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput?.click();
  }, [imageInput]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="글을 써주세요"
      />
      <div>
        <input type="file" multiple hidden ref={imageInputRef} />
        <Button onClick={onClickImageUpload}>업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
