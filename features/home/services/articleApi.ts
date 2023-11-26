import { createApi } from '@/utils/rktCreateApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { HYDRATE } from 'next-redux-wrapper';

import getToken from '@/utils/getToken';
import { RootState } from '@/services/store';

export const articleApi = createApi({
  reducerPath: 'articles',
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
  tagTypes: ['articles', 'favArticle', 'unFavArticle'],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (data) => ({
        url: `${data}`,
        method: 'GET',
      }),
      providesTags: (_) => ['articles', ],
    }),
    postArticle: builder.mutation({
      query: (payloads) => ({
        url: `/articles`,
        body: payloads,
        method: 'POST',
      }),
      invalidatesTags: (_) => ['articles'],
    }),
    favArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),

    unFavArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (_) => ['articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useFavArticleMutation,
  useUnFavArticleMutation,
  usePostArticleMutation,
} = articleApi;
