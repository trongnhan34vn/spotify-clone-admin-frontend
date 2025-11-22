import { createSlice } from '@reduxjs/toolkit';
import type { ReduxState } from '../../types/redux.type';
import type { Token } from '../../types/entities/Auth.type';
import { signInThunk } from '../../thunks/auth.thunk';

const initState: ReduxState<Token> = {
  data: null,
  loading: false,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    reset: () => {
      return initState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const { data, message } = action.payload as any;
        state.data = data;
        state.loading = false;
        state.message = message;
      })
      .addCase(signInThunk.pending, state => {
        state.loading = true;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
