import { RootState } from '@/services/store';
import { createApi } from '@/utils/rktCreateApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { HYDRATE } from 'next-redux-wrapper';

interface User {
  name: 'string';
}

export const userProfileData = createApi({
  reducerPath: 'profile',
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<User[], string>({
      query: (user) => `profiles/${user}`,
    }),
    postFollow: builder.mutation({
      query: (user) => ({
        url: `profiles/${user}/follow`,
        method: 'POST',
      }),
    }),
    deleteFollow: builder.mutation({
      query: (user) => ({
        url: `profiles/${user}/follow`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  usePostFollowMutation,
  useDeleteFollowMutation,
} = userProfileData;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

// import { createApi } from '@/utils/rktCreateApi';
// import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
// import { HYDRATE } from 'next-redux-wrapper';

// export const userProfile = createApi({
//   reducerPath: 'userProfile',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.realworld.io/api/',
//   }),

//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath];
//     }
//   },
//   endpoints: (builder) => ({
//     getProfile: builder.query({
//       query: (user) => ({
//         url: `${user}`,
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// export const { useGetProfileQuery } = userProfile;
