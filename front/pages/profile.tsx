import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { RootStateInterface } from '../interfaces/RootState';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const router = useRouter();
  const { me } = useSelector((state: RootStateInterface) => state.user);

  useEffect(() => {
    if (!me) {
      router.push('/');
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
