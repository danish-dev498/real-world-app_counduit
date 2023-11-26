// 'use client';
import React from 'react';

import Image from 'next/image';
import { HiPlus } from 'react-icons/hi';

const UserProfile = ({ user }) => {
  return (
    <div>
      <div className=' p-11 bg-steel-blue-100'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <Image
            src={user.image}
            width={100}
            height={100}
            alt='user_image'
            className='rounded-full'
          />

          <h1 className='text-2xl font-light text-gray-800 '>
            {user.username}
          </h1>
        </div>

        <div className='flex justify-end mr-80'>
          <div className='flex flex-col items-center gap-1 sm:flex sm:flex-row'>
            <div className='inline-flex items-center gap-1 p-1 px-2 py-0.5 border rounded-sm dark:border-custom-gray'>
              <HiPlus />
              <h1 className='text-sm dark:text-gray-200'>Follow User Name</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
