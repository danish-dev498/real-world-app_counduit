import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='flex flex-row items-center gap-5'>
      <Link
        href='/'
        className={pathname === '/' ? 'text-steel-blue-600 font-semibold' : ''}
      >
        Home
      </Link>
      <Link
        href='/login'
        className={
          pathname === '/login' ? 'text-steel-blue-500 font-semibold ' : ''
        }
      >
        Sign in
      </Link>
      <Link
        href='/register'
        className={
          pathname === '/register' ? 'text-steel-blue-500 font-semibold ' : ''
        }
      >
        Sign up
      </Link>
    </div>
  );
};

export default Header;
