'use client';

import { SignIn } from '@/features/authentication';
import React from 'react';

const session = null;
const SignInPage = () => {
  // if (!session) throw new Error('Auth is required');
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
