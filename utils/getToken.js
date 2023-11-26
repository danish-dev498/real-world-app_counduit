import React from 'react';

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  console.log('check if there is any token available', token);
  return token;
};

export default getToken;
