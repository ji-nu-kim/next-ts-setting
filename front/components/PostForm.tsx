import { addPostRequestAction } from '../actions/actionPost';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';

function PostForm() {
  const { imagePaths, addPostDone } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const id = useSelector((state: RootStateInterface) => state.user.me?.id);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput<string>('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (id) {
      dispatch(addPostRequestAction({ content: text, userId: id }));
    }
  }, [text, id]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current?.click();
  }, [imageInputRef.current]);

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
          <div key={v.src} style={{ display: 'inline-block' }}>
            <img src={v.src} style={{ width: '200px' }} alt={v.src} />
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
