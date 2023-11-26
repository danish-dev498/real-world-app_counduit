import { Badge } from '@/components/ui/badge';
import { ArticleProps } from '@/type';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  useFavArticleMutation,
  useUnFavArticleMutation,
} from '../services/articleApi';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';

const ArticlePreview = ({
  articles,
  refetch,
}: {
  articles: ArticleProps;
  refetch: () => void;
}) => {
  const [favorited, setFavorited] = useState(articles.favorited);
  const [favoritesCount, setFavoritesCount] = useState(articles.favoritesCount);
  const [disable, setDisable] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [favTrigger, { data, isLoading, error }] = useFavArticleMutation();
  const [unFavTrigger, unFavData] = useUnFavArticleMutation();

  const favorite = async (slug: string) => {
    try {
      favTrigger(slug);
      setFavoritesCount(favoritesCount + 1);
      setFavorited(true);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const unFavorite = async (slug: string) => {
    try {
      unFavTrigger(slug);
      setFavoritesCount(favoritesCount - 1);
      setFavorited(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavCount = async (slug: string) => {
    if (!isLoggedIn) return router.push('/login');
    setDisable(true);
    favorited ? await unFavorite(slug) : await favorite(slug);

    setTimeout(() => {
      setDisable(false);
    }, 4000);
  };

  return (
    <div>
      <>
        <div className='flex justify-between mb-3'>
          <div className='flex flex-row items-center gap-2'>
            <img
              src={articles.author.image}
              alt='user image'
              className='w-8 h-8 rounded-full'
            />
            <div>
              <Link
                href={`/${articles.author.username}`}
                className='block text-base leading-4 text-steel-blue-500 hover:text-steel-blue-700 hover:underline '
              >
                {articles.author.username}
              </Link>
              <h1 className='text-xs text-custom-gray'>December 9, 2022</h1>
            </div>
          </div>
          <button
            className='flex items-center gap-1 px-3.5 py-0.5 border rounded-sm bg-red-500 disabled:cursor-not-allowed'
            disabled={disable}
            onClick={() => handleFavCount(articles.slug)}
          >
            <div>❤</div>
            <h1>{favoritesCount}</h1>
          </button>
        </div>
        <div className='mb-3'>
          <Link href={`article/${articles.slug}`}>
            <h1 className='text-2xl font-semibold'>{articles.title}</h1>
          </Link>
          <Link href={`article/${articles.slug}`}>
            <p className='text-base font-light text-custom-gray dark:text-custom-gray-200 '>
              {articles.description}
            </p>
          </Link>
        </div>
        <div className='flex items-center justify-between mb-5'>
          <Link href={`article/${articles.slug}`}>
            <p className='text-sm text-custom-gray dark:text-custom-gray-200'>
              Read more...
            </p>
          </Link>
          <div className='flex gap-1'>
            {articles.tagList.map((tag) => (
              <Link href={`article/${articles.slug}`}>
                <Badge
                  className='dark:bg-slate-700 dark:text-custom-gray-200'
                  key={tag}
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default ArticlePreview;
