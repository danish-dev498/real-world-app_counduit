import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserData, reset } from '../authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const { user, errors } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    setUserData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(
      getUserData({
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      })
    )
      .unwrap()
      .then((response) => {
        console.log(response);
        if (!response.error) {
          console.log(errors);
          router.push('/');
        }
      });
  };

  return (
    <div className='flex justify-center'>
      <div className='container md:w-[600px] mt-9 p-4 mx-auto'>
        <div className='mb-4 text-center'>
          <h1 className='text-4xl font-medium '>Sign Up</h1>
          <Link
            href='/login'
            className='text-sm font-medium leading-7 text-steel-blue-600 hover:underline'
          >
            Have an account?
          </Link>
        </div>
        <div className='flex flex-col gap-3'>
          <Input
            className=''
            placeholder='Username'
            name='username'
            value={userData.username}
            onChange={handleChange}
          />
          {<p>{errors !== null ? errors?.username : null}</p>}

          <Input
            className=''
            placeholder='Email'
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
          {<p>{errors !== null ? errors?.email : null}</p>}
          <Input
            className=''
            placeholder='Password'
            name='password'
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <Button
          className='flex mt-4 ml-auto text-xl bg-steel-blue-800 hover:bg-steel-blue-700 dark:text-white '
          type='submit'
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
