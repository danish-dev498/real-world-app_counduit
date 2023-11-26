'use client';

import UserProfile from '@/features/layout/components/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';
import Article from '@/features/home/components/Article';
import { useAppSelector } from '@/hooks/reduxHooks';
import Hr from '@/components/ui/hr';
import { useGetProfileQuery } from '@/features/layout/services/profileApi';

const Profile = ({ params }: { params: { slug: string } }) => {
  console.log('======CHECK THE PARAMS=======', params);

  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useGetProfileQuery(params.slug);

  console.log('=========PROFILE DATA OVER HERE=========', data);
  console.log('=========PROFILE DATA OVER HERE  ERROR=========', error);

  return (
    <>
      <UserProfile user={user} />
      <div className='p-4  container lg:max-w-5xl mt-5'>
        <Tabs defaultValue='account' activationMode='automatic'>
          <TabsList className='w-[12rem]'>
            <TabsTrigger value='account'>My Articles</TabsTrigger>
            <TabsTrigger value='password'>Favorited Articles</TabsTrigger>
          </TabsList>
          <Hr />
          <TabsContent value='account'>
            <Article query={`?author=${user?.username}`} />
          </TabsContent>
          <TabsContent value='password'>
            <Article query='?' />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;

{
  /* query={`?favorited=${user?.username}`} */
}
