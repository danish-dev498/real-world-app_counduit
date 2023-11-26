import { createApi } from '@/utils/rktCreateApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/services/store';

interface Comments {
  author: Object;
  body: 'string';
}

export const commentApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',

    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth.user;
      console.log('check the token=====', token);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  // keepUnusedDataFor: 5,
  tagTypes: ['getComment'],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getComment: builder.query({
      query: (data) => ({
        url: `${data}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCommentQuery } = commentApi;
