import { IPost } from 'interfaces/db';
import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../interfaces/RootState';
import {
  unfollowRequestAction,
  followRequestAction,
} from '../actions/actionUser';

interface FollowButtonProps {
  post: IPost;
}

function FollowButton({ post }: FollowButtonProps) {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state: RootStateInterface) => state.user
  );
  const isFollowing = me?.Followings.find(v => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction({ userId: post.User.id }));
    } else {
      dispatch(followRequestAction({ userId: post.User.id }));
    }
  }, [isFollowing, post]);

  if (post.User.id === me?.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}

export default FollowButton;
