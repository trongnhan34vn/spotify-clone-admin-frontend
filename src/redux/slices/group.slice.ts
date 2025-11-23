import { createSlice } from '@reduxjs/toolkit';
import type { ReduxState } from '../../types/redux.type';
import type { Group } from '../../types/entities/user.type';
import { listAdminGroupsThunk } from '../../thunks/group.thunk';

type ActionState = {
  list: ReduxState<Group[]>;
};

const defaultState = {
  data: null,
  error: null,
  loading: false,
};


const initialState: ActionState = {
  list: defaultState,
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
      state.list.data = action.payload;
      state.list.loading = false;
    });

    builder.addCase(listAdminGroupsThunk.rejected, (state, action) => {
      state.list.error = action.payload as string;
      state.list.loading = false;
    });

    builder.addCase(listAdminGroupsThunk.pending, state => {
      state.list.loading = true;
    });
  },
});

export default groupSlice.reducer;
export const { reset } = groupSlice.actions;
