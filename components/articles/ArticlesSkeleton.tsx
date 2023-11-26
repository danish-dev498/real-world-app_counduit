import { Skeleton } from '@/components/ui/skeleton';

export function ArticlesSkeleton() {
  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row  items-center gap-1 mb-4'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='items-center flex flex-col  gap-1'>
            <Skeleton className='h-2 w-24 ' />
            <Skeleton className='h-2 w-24' />
          </div>
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-3 w-full' />
        </div>

        <div className='flex  flex-row justify-between mt-3 mb-4'>
          <Skeleton className='h-1.5 w-7' />
          <div className='flex flex-row gap-1'>
            <Skeleton className='h-3  w-8 rounded-md' />
            <Skeleton className='h-3 w-8 rounded-md' />
            <Skeleton className='h-3 w-8 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
