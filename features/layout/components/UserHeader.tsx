import { useAppSelector } from '@/hooks/reduxHooks';
import useAuth from '@/hooks/useAuth';
import limitText from '@/utils/limitText';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { BsPencilSquare } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

const UserHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const userName = limitText(user.username, 5);

  // console.log('check the user over here', user.username);

  return (
    <div className='flex flex-row items-center gap-5'>
      <Link
        href='/'
        className={` flex items-center gap-1   ${
          pathname === '/'
            ? 'text-steel-blue-600 font-semibold'
            : 'text-custom-gray'
        }  `}
      >
        <p>Home</p>
      </Link>
      <Link
        href='/editor'
        className={` flex items-center gap-1   ${
          pathname === '/editor'
            ? 'text-steel-blue-600 font-semibold'
            : 'text-custom-gray'
        } `}
      >
        <BsPencilSquare />
        <p>New Article</p>
      </Link>
      <Link
        href='/settings'
        className={` flex items-center gap-1   ${
          pathname === '/settings'
            ? 'text-steel-blue-600 font-semibold'
            : 'text-custom-gray'
        }  `}
      >
        <FiSettings />
        <p>Settings</p>
      </Link>
      <Link
        href='/ds'
        className={` flex items-center gap-1   ${
          pathname === '/sd'
            ? 'text-steel-blue-600 font-semibold'
            : 'text-custom-gray'
        }  `}
      >
        <FiSettings />
        <p> {userName} </p>
      </Link>
    </div>
  );
};

export default UserHeader;
