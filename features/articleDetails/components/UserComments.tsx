import React from 'react';
import { useGetCommentQuery } from '../services/commentApi';
import Link from 'next/link';
import { CommentProps } from '@/type';

const UserComments = ({ comments }: { comments: CommentProps[] }) => {
  console.log(comments);

  return (
    <div className='mt-5'>
      {comments.map((comment) => (
        <div className='mb-2'>
          <h1 className='p-5 border rounded-t-sm'>{comment.body}</h1>
          <div className='p-3 border-b border-x bg-custom-gray-100'>
            <div className='flex items-center gap-2 '>
              <Link href={`/${comment.author.username}`}>
                <img
                  src='https://api.realworld.io/images/smiley-cyrus.jpeg'
                  alt='commentImage'
                  className='w-5 h-5 rounded-full'
                />
              </Link>
              <Link href={`/${comment.author.username}`}>
                <h1 className='text-sm text-steel-blue-600 hover:underline hover:text-steel-blue-800 '>
                  {comment.author.username}
                </h1>
              </Link>
              <h1 className='text-sm font-light text-zinc-400'>
                October 25, 2022
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserComments;
