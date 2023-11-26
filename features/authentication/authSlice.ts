import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getUser } from './services/signup';
import { existedUser } from './services/login';

interface AuthState {
  user: {
    email: string;
    username: string;
    token: string;
    image: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoggedIn: boolean;
  errors: {
    email: string;
    username: string;
  };
  token: null;
}

export const getUserData = createAsyncThunk(
  'users/fetchUser',
  async (requestedParams: any, thunkAPI) => {
    try {
      const response = await getUser(requestedParams);
      // console.log('RESPONSE =--]]]', response);
      return response;
    } catch (error: any) {
      console.log('check error ion thunk', error);
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const existedUserData = createAsyncThunk(
  'users/logusers',
  async (requestedParams: any, thunkAPI) => {
    try {
      const response = await existedUser(requestedParams);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: AuthState = {
  user: {
    email: '',
    token: '',
    username: '',
    image: '',
  },
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  isLoggedIn: false,
  token: null,
  errors: {
    email: '',
    username: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.errors = initialState.errors;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.status = 'loading';
        state.isLoggedIn = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.user.token);
        state.errors = initialState.errors;
      })
      .addCase(getUserData.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.isLoggedIn = false;
        console.log('this is the builder failed', action.payload);
        state.errors = {
          username:
            action.payload?.errors.username?.length &&
            action.payload?.errors.username[0],
          email:
            action.payload?.errors.email?.length &&
            action.payload?.errors.email[0],
        };
      });
    builder
      .addCase(existedUserData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(existedUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem('userValue', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        state.errors = initialState.errors;
        console.log('this is the builder', action.payload);
      })
      .addCase(
        existedUserData.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = 'failed';
          console.log('this is the builder failed', action.payload);

          // state.errors = {
          //   username: action.payload.errors.username[0],
          //   email:
          //     action.payload.errors.email?.length &&
          //     action.payload.errors.email[0],
          // };
        }
      );
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
