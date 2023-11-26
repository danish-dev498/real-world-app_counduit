'use client';

import Image from 'next/image';

import Image404 from '@/assets/images/error-404.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const route = useRouter();
  const handleClick = () => {};
  return (
    <>
      <div className='flex items-center justify-center mt-8'>
        <div className='flex flex-col w-full p-4 md:w-1/2'>
          <Image src={Image404} alt='404_image' className='flex m-auto' />
          <h1 className='font-semibold text-center text-slate-400 '>
            "Oops! It looks like the page you're trying to reach doesn't exist.
            Please check the URL or navigate to one of our other pages using the
            menu above."
          </h1>

          <Button
            className='flex w-auto m-auto mt-5 font-semibold'
            onClick={handleClick}
          >
            Go Back
          </Button>
        </div>
      </div>
    </>
  );
}
