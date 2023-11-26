import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/hooks/reduxHooks';
import Link from 'next/link';
import React from 'react';

const CommentBox = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Textarea
            placeholder='Write a comment...'
            className='px-5 py-3 rounded-none rounded-t-sm'
          />
          <div className='p-3 border-b border-x bg-custom-gray-100'>
            <div className='flex items-center justify-between '>
              <img
                src='https://api.realworld.io/images/smiley-cyrus.jpeg'
                alt='commentImage'
                className='w-8 h-8 rounded-full'
              />
              <Button
                className='hover:bg-steel-blue-800 bg-steel-blue-700'
                size='sm'
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className='mb-3'>
          {' '}
          <Link
            href='/login'
            className='text-steel-blue-500 hover:text-steel-blue-700 hover:underline'
          >
            {' '}
            sign in{' '}
          </Link>{' '}
          or{' '}
          <Link
            href='/register'
            className='text-steel-blue-500 hover:text-steel-blue-700 hover:underline'
          >
            sign up
          </Link>{' '}
          for comment{' '}
        </h1>
      )}
    </>
  );
};

export default CommentBox;
