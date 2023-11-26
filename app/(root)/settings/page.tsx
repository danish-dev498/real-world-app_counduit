import { Button } from '@/components/ui/button';
import Hr from '@/components/ui/hr';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const Setting = () => {
  return (
    <div className='flex justify-center'>
      <div className='container mx-auto p-4 flex flex-col gap-2 md:max-w-xl'>
        <h1 className='text-center text-4xl  '>Your Settings</h1>

        <Input placeholder='URL of profile picture' className=' py-1' />
        <Input placeholder='Username' className='py-6' />
        <Textarea placeholder='Short bio about you ' className='h-48' />
        <Input placeholder='Email' className='py-6' />
        <Input placeholder='Password' className='py-6' />
        <Button className='flex ml-auto py-6 font-semibold text-lg'>
          Update Setting
        </Button>
        <Hr />
        <Button className='w-fit py-3' variant={'destructive'}>
          or click here to logout
        </Button>
      </div>
    </div>
  );
};

export default Setting;
