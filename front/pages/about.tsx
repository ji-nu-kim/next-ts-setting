import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { Avatar, Card } from 'antd';

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { RootStateInterface } from 'interfaces/RootState';
import { GetStaticProps } from 'next';
import { loadUserInfoRequestAction } from 'actions/actionUser';

function About() {
  const { userInfo } = useSelector((state: RootStateInterface) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>About - NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async context => {
    context.store.dispatch(loadUserInfoRequestAction({ userId: 1 }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default About;
