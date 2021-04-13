import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';
import { loadPostsRequestAction } from 'actions/actionPost';
import { loadMyInfoRequestAction } from 'actions/actionUser';

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
    dispatch(loadMyInfoRequestAction());
    dispatch(loadPostsRequestAction({ postId: 0 }));
  }, []);

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

export default Home;
