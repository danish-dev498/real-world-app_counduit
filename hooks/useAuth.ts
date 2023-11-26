'use client';

import { useState } from 'react';

const useAuth = () => {
  const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem('userValue') || '{}');
    return token;
  };
  const getUser = () => {};
  const [token, setToken] = useState(getToken());
  return {
    getToken,
    getUser,
    token,
  };
};

export default useAuth;
