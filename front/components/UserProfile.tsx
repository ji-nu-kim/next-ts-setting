import { RootStateInterface } from '../interfaces/RootState';
import { Button, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionTypesUser } from '../interfaces/user/userAction.interfaces';
import Link from 'next/link';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector(
    (state: RootStateInterface) => state.user
  );

  const onLogOut = useCallback(() => {
    dispatch({ type: actionTypesUser.LOG_OUT_REQUEST });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me?.id}`}>
            <a>
              짹짹
              <br />
              {me?.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me?.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followers">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me?.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me?.id}`} prefetch={false}>
            <a>
              <Avatar>{me?.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me?.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
