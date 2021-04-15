import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { RootStateInterface } from 'interfaces/RootState';
import { loadMyInfoRequestAction } from 'actions/actionUser';
import { loadHashtagPostsRequestAction } from 'actions/actionPost';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hashtag = String(router.query.tag);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state: RootStateInterface) => state.post
  );
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1].id;
          dispatch(loadHashtagPostsRequestAction({ postId: lastId, hashtag }));
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading, mainPosts, hashtag]);

  return (
    <AppLayout>
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const hashtag = String(context.query.tag);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadHashtagPostsRequestAction({ postId: 0, hashtag }));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Hashtag;
