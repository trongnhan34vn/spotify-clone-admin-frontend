import { createSlice } from '@reduxjs/toolkit';
import type { ReduxState } from '../../types/redux.type';
import type { Group } from '../../types/entities/user.type';
import { listAdminGroupsThunk } from '../../thunks/group.thunk';

const initialState: ReduxState<Group> = {
  data: null,
  error: null,
  message: null,
  loading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(listAdminGroupsThunk.fulfilled, (state, action) => {
      const { data } = action.payload as ReduxState<Group>;
      state.data = data;
      state.loading = false;
    });

    builder.addCase(listAdminGroupsThunk.rejected, (state, action) => {
      const { error } = action.payload as ReduxState<Group>;
      state.error = error;
      state.loading = false;
    });

    builder.addCase(listAdminGroupsThunk.pending, state => {
      state.loading = true;
    });
  },
});

export default groupSlice.reducer;
export const { reset } = groupSlice.actions;
