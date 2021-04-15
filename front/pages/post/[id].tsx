import { END } from '@redux-saga/core';
import { loadPostRequestAction } from 'actions/actionPost';
import { loadMyInfoRequestAction } from 'actions/actionUser';
import axios from 'axios';
import AppLayout from 'components/AppLayout';
import PostCard from 'components/PostCard';
import { RootStateInterface } from 'interfaces/RootState';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import wrapper from 'store/configureStore';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const singlePost = useSelector(
    (state: RootStateInterface) => state.post.singlePost
  );

  if (!singlePost) {
    return (
      <AppLayout>
        <div>게시글이 존재하지 않습니다</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta
          name="description"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta
          property="og:description"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta
          property="og:image"
          content="https://localhost:3333/favicon.ico"
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async context => {
    const cookie = context.req ? context.req.headers.cookie : '';
    const postId = Number(context.query.id);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(loadPostRequestAction({ postId: postId }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
