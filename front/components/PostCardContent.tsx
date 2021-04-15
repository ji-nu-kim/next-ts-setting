import Link from 'next/link';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootStateInterface } from 'interfaces/RootState';
const { TextArea } = Input;

interface PostCardContentProps {
  postData: string;
  editMode?: boolean;
  onCancelUpdatePost: () => void;
  onChangeUpdatePost: any;
}

function PostCardContent({
  postData,
  editMode = false,
  onCancelUpdatePost,
  onChangeUpdatePost,
}: PostCardContentProps) {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdatePost();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button
              loading={updatePostLoading}
              onClick={onChangeUpdatePost(editText)}
            >
              저장
            </Button>
            <Button type="primary" onClick={onCancelUpdatePost}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link key={i} href={`/hashtag/${v.slice(1)}`}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
}

export default PostCardContent;
