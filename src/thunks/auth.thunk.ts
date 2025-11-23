import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleException } from '../helpers/handle.exception';
import { changePasswordService, signInService, signOutService } from '../services/auth.service';
import type { UserSignIn } from '../types/entities/user.type';
import type { ThunkRequest } from '../types/redux.type';

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (req: ThunkRequest<UserSignIn>, { rejectWithValue }) => {
    try {
      const { data } = req;
      return await signInService(data);
  
    } catch (err: any) {
      console.error('[Thunk] Error occurred when signing in', err);
      return handleException(err, rejectWithValue);
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async (req: ThunkRequest<any>, {rejectWithValue}) => {
    try {
      return await changePasswordService(req);
    } catch (error) {
      console.error('[Thunk] Error occurred when changing password', error);
      return handleException(error, rejectWithValue);
    }
  }
)

export const signOutThunk =  createAsyncThunk(
  'auth/signOut',
  async (req: string, {rejectWithValue}) => {
    try {
      return await signOutService(req);
    } catch (error) {
      console.error('[Thunk] Error occurred when changing password', error);
      return handleException(error, rejectWithValue);
    }
  }
)
