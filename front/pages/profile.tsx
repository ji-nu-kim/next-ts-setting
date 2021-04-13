import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { RootStateInterface } from '../interfaces/RootState';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
} from 'actions/actionUser';

function Profile() {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootStateInterface) => state.user);

  useEffect(() => {
    dispatch(loadFollowersRequestAction());
    dispatch(loadFollowingsRequestAction());
  }, []);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me?.Followings} />
        <FollowList header="팔로워" data={me?.Followers} />
      </AppLayout>
    </>
  );
}

export default Profile;
