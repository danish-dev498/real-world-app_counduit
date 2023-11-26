import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { AiOutlineEye } from 'react-icons/ai';
import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { existedUserData } from '../authSlice';

const SignIn = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<null | unknown[]>(null);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      existedUserData({
        user: {
          email: userData.email,
          password: userData.password,
        },
      })
    ).then((response: any) => {
      if (!response.error) {
        // dispatch to the main home
      } else {
        let errors = Object.values(response.payload.errors);
        setError(errors);
      }
    });
  };

  return (
    <div className='flex justify-center'>
      <div className='container md:w-[600px] mt-9 p-4 mx-auto'>
        <div className='mb-4 text-center'>
          <h1 className='text-4xl font-medium '>Sign in</h1>
          <Link
            href='/register'
            className='text-sm font-medium leading-7 text-steel-blue-600 hover:underline'
          >
            Need an account?
          </Link>
          <p> {error !== null ? `email or pass ${error[0]}` : ''}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <Input
              className=''
              placeholder='Email'
              name='email'
              value={userData.email}
              onChange={handleChange}
            />
            <div className='relative'>
              <Input
                className=''
                placeholder='Password'
                name='password'
                value={userData.password}
                onChange={handleChange}
              />
              <AiOutlineEye size={20} className='absolute bottom-2 right-2' />
            </div>
          </div>

          <Button className='flex mt-4 ml-auto text-xl '>Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
