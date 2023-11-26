import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import details from '@/data/articleDetails.json';
import Userinfo from './Userinfo';
import { Badge } from '@/components/ui/badge';
import Hr from '@/components/ui/hr';
import CommentBox from './CommentBox';
import UserComments from './UserComments';
import { ArticleProps, CommentProps } from '@/type';
import {
  useFavArticleMutation,
  useUnFavArticleMutation,
} from '@/features/home/services/articleApi';

import {
  useDeleteFollowMutation,
  usePostFollowMutation,
} from '@/features/layout/services/profileApi';

const ArticleDetails = ({
  article,
  comments,
  refetch,
}: {
  article: ArticleProps;
  comments: CommentProps[];
  refetch: () => void;
}) => {
  const [following, setFollowing] = useState(article?.author.following);
  const [favorited, setFavorited] = useState(article?.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article?.favoritesCount);

  const [followTrigger, { data: followData }] = usePostFollowMutation();
  const [followDeleteTrigger, { data: followDeleteData }] =
    useDeleteFollowMutation();
  const [favTrigger, favData] = useFavArticleMutation();
  const [unFavTrigger, unFavData] = useUnFavArticleMutation();

  const follow = async (slug: string) => {
    try {
      await followTrigger(slug);
      setFollowing(true);
      refetch();
    } catch (error) {
      console.log('follow error', error);
    }
  };

  const unFollow = async (slug: string) => {
    try {
      await followDeleteTrigger(slug);
      setFollowing(false);
      refetch();
    } catch (error) {
      console.log('follow error', error);
    }
  };

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

  return (
    <>
      <div>
        <div className='bg-steel-blue-800 '>
          <div className='container p-4 mx-auto py-9 lg:max-w-6xl'>
            <h1 className='mb-6 text-2xl font-semibold leading-tight text-white md:text-4xl'>
              {article.title}
            </h1>
            <Userinfo
              article={article}
              follow={follow}
              unFollow={unFollow}
              favorite={favorite}
              unFavorite={unFavorite}
              following={following}
              favoritesCount={favoritesCount}
              favorited={favorited}
            />
          </div>
        </div>

        <div className='container p-4 mx-auto lg:max-w-6xl'>
          <h1 className='mb-8 text-lg'>{article.body}</h1>
          <div className='flex items-center gap-1 mb-16'>
            <Badge>fdssd</Badge>
            <Badge>fdssd</Badge>
            <Badge>sdfdssd</Badge>
          </div>
          <Hr />
        </div>
        <div className='container flex items-center justify-center p-4 mx-auto mt-1 mb-36'>
          <div className='flex flex-col gap-4'>
            <div className='m-auto mb-10 '>
              <Userinfo
                change
                article={article}
                follow={follow}
                unFollow={unFollow}
                following={following}
                favorite={favorite}
                unFavorite={unFavorite}
                favoritesCount={favoritesCount}
                favorited={favorited}
              />
            </div>
            <div className='sm:w-[100%] md:w-[700px] flex  flex-col gap-2 '>
              <CommentBox />
              <UserComments comments={comments} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
