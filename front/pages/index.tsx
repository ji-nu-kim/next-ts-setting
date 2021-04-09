import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';
import { loadPostsRequestAction } from 'actions/actionPost';

function Home() {
  const dispatch = useDispatch();
  const { logInDone } = useSelector((state: RootStateInterface) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state: RootStateInterface) => state.post
  );

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY + document.documentElement.clientHeight);
      console.log(document.documentElement.scrollHeight);
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch(loadPostsRequestAction());
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export default Home;
