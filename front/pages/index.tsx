import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { RootStateInterface } from '../interfaces/RootState';
import { loadPostsRequestAction } from 'actions/actionPost';
import { loadMyInfoRequestAction } from 'actions/actionUser';
import wrapper from 'store/configureStore';
import { GetServerSideProps } from 'next';

function Home() {
  const dispatch = useDispatch();
  const me = useSelector((state: RootStateInterface) => state.user.me);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    (state: RootStateInterface) => state.post
  );

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1].id;
          dispatch(loadPostsRequestAction({ postId: lastId }));
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMorePost, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async context => {
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(loadPostsRequestAction({ postId: 0 }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
