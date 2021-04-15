import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { GetServerSideProps } from 'next';
import { RootStateInterface } from 'interfaces/RootState';
import { loadUserPostsRequestAction } from 'actions/actionPost';
import {
  loadMyInfoRequestAction,
  loadUserInfoRequestAction,
} from 'actions/actionUser';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = Number(router.query.id);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state: RootStateInterface) => state.post
  );
  const { userInfo } = useSelector((state: RootStateInterface) => state.user);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1].id;
          dispatch(
            loadUserPostsRequestAction({ postId: lastId, userId: userId })
          );
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts, userId]);

  if (!userInfo) {
    return (
      <AppLayout>
        <div>존재하지 않는 유저입니다</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head>
        <title>{userInfo.nickname}님의 글</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${userInfo.nickname}님의 게시글`}
        />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta
          property="og:url"
          content={`https://nodebird.com/post/${userId}`}
        />
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
          />
        </Card>
      ) : null}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async context => {
    const userId = Number(context.query.id);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(loadUserPostsRequestAction({ postId: 0, userId }));
    context.store.dispatch(loadUserInfoRequestAction({ userId }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default User;
