import Link from 'next/link';
import React from 'react';

interface PostCardContentProps {
  postData: string;
}

function PostCardContent({ postData }: PostCardContentProps) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={i} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}

export default PostCardContent;
