import {
  addPostRequestAction,
  removeImage,
  uploadImagesRequestAction,
} from '../actions/actionPost';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';

function PostForm() {
  const { imagePaths, addPostDone } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput<string>('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성해주세요');
    }
    const formData = new FormData();
    imagePaths.forEach(p => formData.append('image', p));
    formData.append('content', text);
    return dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current?.click();
  }, [imageInputRef.current]);

  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const imageFormData = new FormData();
    // obj타입은 배열메소드를 사용못하기때문에 call을 사용해 빌려온다
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch(uploadImagesRequestAction(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (id: number) => () => {
      dispatch(removeImage(id));
    },
    []
  );

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
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInputRef}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
