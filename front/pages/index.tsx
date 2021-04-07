import AppLayout from '@components/AppLayout';
import PostCard from '@components/PostCard';
import PostForm from '@components/PostForm';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootStateInterface } from '../interfaces/RootState';

function Home() {
  const { isLoggedIn } = useSelector((state: RootStateInterface) => state.user);
  const { mainPosts } = useSelector((state: RootStateInterface) => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export default Home;
