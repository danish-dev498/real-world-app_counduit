'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemePopover from './ThemePopover';

import React, { use, useEffect, useState } from 'react';
import Header from './Header';
import UserHeader from './UserHeader';
import useAuth from '@/hooks/useAuth';
import { useAppSelector } from '@/hooks/reduxHooks';

const Navbar = () => {
  const { status } = useAppSelector((state) => state.auth);
  console.log('chck status', status);

  return (
    <div className=''>
      <div className='container flex flex-row items-center justify-between p-4 mx-auto lg:max-w-6xl '>
        <div className='flex items-center justify-between flex-1 mr-5'>
          <Link href='/' className='text-2xl font-bold text-steel-blue-700'>
            conduit
          </Link>
          <ThemePopover />
        </div>
        {status === 'succeeded' ? <UserHeader /> : <Header />}

        {/* <Header /> */}
      </div>
    </div>
  );
};

export default Navbar;
