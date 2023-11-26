import React from 'react';
import { Skeleton } from '../ui/skeleton';

const PopularTagSkeleton = () => {
  return (
    <div>
      <Skeleton className='h-3 w-24 mb-5 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
      <div className='flex flex-wrap gap-1'>
        <Skeleton className='h-4 w-9 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-16 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-12 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-9 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-10 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-6 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
        <Skeleton className='h-4 w-9 text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400   ' />
      </div>
    </div>
  );
};

export default PopularTagSkeleton;
