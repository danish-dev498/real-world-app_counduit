import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducers from '@/features/authentication/authSlice';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { popularTag } from '@/features/home/services/getPopularTag';
import {
  articleApi,
  useFavArticleMutation,
} from '@/features/home/services/articleApi';
import { userProfileData } from '@/features/layout/services/profileApi';
import { commentApi } from '@/features/articleDetails/services/commentApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['getTags'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['errors'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducers),
  [popularTag.reducerPath]: popularTag.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [userProfileData.reducerPath]: userProfileData.reducer,
  // [useFavArticleMutation.]: userProfileData.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      popularTag.middleware,
      articleApi.middleware,
      commentApi.middleware,
      userProfileData.middleware
    ),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// // import { combineReducers, configureStore } from '@reduxjs/toolkit';
// // import storage from 'redux-persist/lib/storage';
// // import { persistReducer, persistStore } from 'redux-persist';

// // import authReducers from '@/features/authentication/authSlice';

// // import thunk from 'redux-thunk';

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // }

// // const rootReducer = combineReducers({
// // 	auth: authReducers,
// // })

// // const persistedReducer = persistReducer(
// // 	persistConfig,
// // 	rootReducer
// // ) as typeof rootReducer

// // export const store = configureStore({
// //   reducer: { auth: authReducers },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: false,
// //     }),
// // });

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authReducers from '@/features/authentication/authSlice';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// const rootPersistConfig = {
//   key: 'root',
//   storage,
// };

// const authPersistConfig = {
//   key: 'user',
//   storage,
//   blacklist: ['errors'],
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducers),
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
