import { createSlice } from '@reduxjs/toolkit';
import type { ReduxState } from '../../types/redux.type';
import type { Token } from '../../types/entities/auth.type';
import {
  changePasswordThunk,
  signInThunk,
  signOutThunk,
} from '../../thunks/auth.thunk';

type ActionState = {
  signIn: ReduxState<Token>;
  changePassword: ReduxState<string>;
  signOut: ReduxState<string>;
};

const defaultState = { data: null, error: null, loading: false };

const initState: ActionState = {
  signIn: defaultState,
  changePassword: defaultState,
  signOut: defaultState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    reset: state => {
      state.signIn = defaultState;
    },

    resetChangePassword: state => {
      state.changePassword = defaultState;
    },

    resetSignOut: state => {
      state.signOut = defaultState;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signInThunk.rejected, (state, action) => {
        state.signIn.loading = false;
        state.signIn.error = action.payload as any;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.signIn.data = action.payload;
        state.signIn.loading = false;
      })
      .addCase(signInThunk.pending, state => {
        state.signIn.loading = true;
      })

      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.changePassword.loading = false;
        state.changePassword.error = action.payload as string;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.changePassword.data = action.payload;
        state.changePassword.loading = false;
      })
      .addCase(changePasswordThunk.pending, state => {
        state.changePassword.loading = true;
      })

      .addCase(signOutThunk.rejected, (state, action) => {
        state.signOut.error = action.payload as string;
        state.signOut.loading = false;
      })
      .addCase(signOutThunk.fulfilled, (state, action) => {
        state.signOut.data = action.payload;
        state.signOut.loading = false;
      })
      .addCase(signOutThunk.pending, state => {
        state.signOut.loading = true;
      });
  },
});

export default authSlice.reducer;
export const { reset, resetChangePassword, resetSignOut } = authSlice.actions;
