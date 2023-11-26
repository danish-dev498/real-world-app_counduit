import { createApi } from '@/utils/rktCreateApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface Tags {
  name: 'string';
}

export const popularTag = createApi({
  reducerPath: 'tags',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (tag) => `${tag}`,
    }),
  }),
});

export const { useGetTagsQuery } = popularTag;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
