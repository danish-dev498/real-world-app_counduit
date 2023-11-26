'use client';

import { useCallback, useEffect, useState } from 'react';
import { HeroSection } from '@/features/home/index';

import dataa from '@/data/data.json';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Article from '@/features/home/components/Article';
import PopularTags from '@/features/home/components/PopularTags';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Hr from '@/components/ui/hr';
import { useGetTagsQuery } from '@/features/home/services/getPopularTag';
import { useGetArticlesQuery } from '@/features/home/services/articleApi';

import usePagination from '@/features/home/hooks/usePagination';
import Loading from './loading';
import { ArticlesSkeleton } from '@/components/articles/ArticlesSkeleton';
import PopularTagSkeleton from '@/components/articles/PopularTagSkeleton';
import { useAppSelector } from '@/hooks/reduxHooks';
import { FiHash } from 'react-icons/fi';

const Home = () => {
  const [currentTag, setCurrentTag] = useState('');
  const [tagActive, setActiveTag] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(isLoggedIn ? 'feed' : 'account');

  const handleBadge = useCallback((tagValue: string) => {
    setCurrentTag(tagValue);
    setActiveTag(true);
    setActiveTab('password');
  }, []);

  const { data: tagsData, error, isLoading } = useGetTagsQuery('tags');

  if (isLoading) return;

  const { tags }: { tags: string[] } = tagsData || [];

  const handleSelectChange = (newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <div className='container grid-cols-12 gap-2 p-4 mx-auto md:grid lg:max-w-6xl'>
      <div className='col-span-9'>
        <Tabs
          value={activeTab}
          defaultValue={isLoggedIn ? 'feed' : 'account'}
          className=''
          onValueChange={handleSelectChange}
          activationMode='automatic'
        >
          <TabsList className='w-[12.5rem]'>
            {isLoggedIn && (
              <TabsTrigger
                value='feed'
                data-state={activeTab === 'feed' ? 'active' : 'inactive'}
              >
                Your Feed
              </TabsTrigger>
            )}
            <TabsTrigger
              value='account'
              data-state={activeTab === 'account' ? 'active' : 'inactive'}
            >
              <p className='text-base'>Global Article</p>
            </TabsTrigger>

            {activeTab === 'password' ? (
              <TabsTrigger
                value='password'
                data-state={activeTab === 'password' ? 'active' : 'inactive'}
              >
                <div className='flex items-center gap-1'>
                  <FiHash size={18} />
                  <p className='text-base'> {currentTag}</p>
                </div>
              </TabsTrigger>
            ) : null}
          </TabsList>
          <Hr />

          <TabsContent value='feed'>
            <Article query='/feed?' />
          </TabsContent>
          <TabsContent value='account'>
            <Article query='?' />
          </TabsContent>
          <TabsContent value='password'>
            <Article query={`?tag=${currentTag}&`} />
          </TabsContent>
        </Tabs>
      </div>

      <div className='col-span-3 gap-4 p-4'>
        <div className='p-4 -100 rounded-md bg-gray-100 dark:bg-[#22303c] '>
          {isLoading && tags?.length === 0 ? (
            <PopularTagSkeleton />
          ) : (
            <>
              <h1 className='block mb-3 '>Popular Tags</h1>
              <div className='flex flex-wrap gap-1 '>
                {tags.map((tag, index) => (
                  <PopularTags
                    tag={tag}
                    key={index}
                    handleBadge={handleBadge}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
