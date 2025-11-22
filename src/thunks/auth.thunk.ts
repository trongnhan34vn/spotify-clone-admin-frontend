import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ReduxState, ThunkRequest, ThunkResponse } from '../types/redux.type';
import type { UserSignIn } from '../types/entities/user.type';
import { signInService } from '../services/auth.service';
import type { Token } from '../types/entities/Auth.type';

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (req: ThunkRequest<UserSignIn>, { rejectWithValue }) => {
    try {
      const { data } = req;
      const res: ThunkResponse<Token> = await signInService(data);
      const resData = res.data;
      const code = res.code;

      const resState: ReduxState<Token> = {
        data: resData!,
        message: 'Sign In Successfully' // gen từ code i18n
      }

      return resState;

    } catch (err: any) {
      console.error('[Thunk] Error occurred when signing in', err);
      return rejectWithValue(err.response?.data?.code);
    }
  }
);
