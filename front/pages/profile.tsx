import AppLayout from '@components/AppLayout';
import FollowList from '@components/FollowList';
import NicknameEditForm from '@components/NicknameEditForm';
import Head from 'next/head';
import React from 'react';

function Profile() {
  const followingList = [
    { nickname: '디올' },
    { nickname: '라올' },
    { nickname: '고올' },
  ];
  const followerList = [
    { nickname: '디올' },
    { nickname: '라올' },
    { nickname: '고올' },
  ];

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
}

export default Profile;
