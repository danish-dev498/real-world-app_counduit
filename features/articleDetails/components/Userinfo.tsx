import React, { memo, useCallback, useEffect, useState } from 'react';
import data from '@/data/data.json';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdModeEdit } from 'react-icons/md';

import { useAppSelector } from '@/hooks/reduxHooks';
import { ArticleProps } from '@/type';

import { useRouter } from 'next/navigation';

interface UserActionProps {
  change?: boolean;
  article: ArticleProps;
  follow: (slug: string) => Promise<void>;
  unFollow: (slug: string) => Promise<void>;
  favorite: (slug: string) => Promise<void>;
  unFavorite: (slug: string) => Promise<void>;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
}

const Userinfo = ({
  change,
  article,
  follow,
  unFollow,
  favorite,
  unFavorite,
  following,
  favorited,
  favoritesCount,
}: UserActionProps) => {
  const [disableFav, setDisableFav] = useState(false);
  const [disableFollow, setDisablefollow] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const handleFollow = async (username: string) => {
    if (!isLoggedIn) return router.push('/login');
    setDisablefollow(true);
    following ? await unFollow(username) : await follow(username);
    setTimeout(() => {
      setDisablefollow(false);
    }, 1000);
  };

  const handleFavCount = async (slug: string) => {
    if (!isLoggedIn) return router.push('/login');
    setDisableFav(true);
    favorited ? await unFavorite(slug) : await favorite(slug);

    setTimeout(() => {
      setDisableFav(false);
    }, 1000);
  };

  return (
    <div className='flex items-center gap-6 md:gap-10'>
      <div className='flex flex-row items-center gap-2'>
        <img
          src={article?.author.image}
          alt='user image'
          className='w-8 h-8 rounded-full'
        />

        <div>
          <Link
            href={`/${article?.author.username}`}
            className={`${
              change
                ? 'block text-base leading-4 text-steel-blue-500 hover:steel-blue-500 hover:underline'
                : 'block text-base leading-4 text-white hover:text-white hover:underline'
            }`}
          >
            {article?.author.username}
          </Link>
          <h1 className='text-xs text-custom-gray'>December 9, 2022</h1>
        </div>
      </div>

      <div className='flex flex-col items-center gap-1 sm:flex sm:flex-row'>
        {user.username === article.author.username ? (
          <>
            <button
              className='inline-flex items-center gap-1 p-1 px-2 py-0.5 border rounded-sm dark:border-custom-gray disabled:cursor-not-allowed'
              disabled={disableFollow}
              onClick={() => handleFollow(article?.author.username)}
            >
              <MdModeEdit />
              <h1 className='text-sm dark:text-gray-200'>edit</h1>
            </button>
            <button
              className='inline-flex items-center gap-1 p-1 px-2 py-0.5 border rounded-sm dark:border-custom-gray disabled:cursor-not-allowed'
              disabled={disableFav}
              onClick={() => handleFavCount(article.slug)}
            >
              <HiOutlineHeart />
              <h1 className='text-sm dark:text-gray-200'>delete</h1>
            </button>
          </>
        ) : (
          <>
            <button
              className='inline-flex items-center gap-1 p-1 px-2 py-0.5 border rounded-sm dark:border-custom-gray disabled:cursor-not-allowed'
              disabled={disableFollow}
              onClick={() => handleFollow(article?.author.username)}
            >
              <HiPlus />
              <h1 className='text-sm dark:text-gray-200'>
                {following ? 'Unfollow' : 'Follow'} {article?.author.username}
              </h1>
            </button>
            <button
              className='inline-flex items-center gap-1 p-1 px-2 py-0.5 border rounded-sm dark:border-custom-gray disabled:cursor-not-allowed'
              disabled={disableFav}
              onClick={() => handleFavCount(article.slug)}
            >
              <HiOutlineHeart />
              <h1 className='text-sm dark:text-gray-200'>
                {favorited ? 'UnFavorite Article' : 'Favorite Article'} (
                {favoritesCount})
              </h1>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Userinfo;
