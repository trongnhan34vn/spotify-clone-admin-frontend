import { createSlice } from '@reduxjs/toolkit';
import {
  createAdminThunk,
  deleteAdminThunk,
  detailAdminThunk,
  listAdminsThunk,
  listUserFilterOptionThunk,
  updateAdminThunk,
} from '../../thunks/user.thunk';
import type { Pagination } from '../../types/entities/pagination.type';
import type { User, UserFilterOption } from '../../types/entities/user.type';
import type { ReduxState } from '../../types/redux.type';

type ActionState = {
  list: ReduxState<Pagination<User>>;
  create: ReduxState<User>;
  detail: ReduxState<User>;
  delete: ReduxState<string>;
  update: ReduxState<string>;
  listFilterOption: ReduxState<UserFilterOption>;
};

const defaultState = {
  data: null,
  error: null,
  loading: false,
};

const initialState: ActionState = {
  list: defaultState,
  create: defaultState,
  detail: defaultState,
  delete: defaultState,
  update: defaultState,
  listFilterOption: defaultState,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate: state => {
      state.create = initialState.create;
    },

    resetFilter: state => {
      state.listFilterOption = initialState.listFilterOption;
    },

    resetList: state => {
      state.list = initialState.list;
    },
    resetDetail: state => {
      state.detail = initialState.detail;
    },
    resetDelete: state => {
      state.delete = initialState.delete;
    },
    resetUpdate: state => {
      state.update = initialState.update;
    },
  },
  extraReducers: builder => {
    builder.addCase(listAdminsThunk.fulfilled, (state, action) => {
      state.list.data = action.payload;
      state.list.loading = false;
    });
    builder.addCase(listAdminsThunk.pending, (state, action) => {
      state.list.loading = true;
    });
    builder.addCase(listAdminsThunk.rejected, (state, action) => {
      const { error } = action.payload as ReduxState<User>;
      state.list.error = error;
      state.list.loading = false;
    });

    builder.addCase(createAdminThunk.fulfilled, (state, action) => {
      state.create.data = action.payload;
      state.create.loading = false;
    });

    builder.addCase(createAdminThunk.pending, state => {
      state.create.loading = true;
    });

    builder.addCase(createAdminThunk.rejected, (state, action) => {
      state.create.error = action.payload as string;
      state.create.loading = false;
    });

    builder.addCase(detailAdminThunk.fulfilled, (state, action) => {
      state.detail.data = action.payload;
      state.detail.loading = false;
    });

    builder.addCase(detailAdminThunk.rejected, (state, action) => {
      state.detail.error = action.payload as string;
      state.detail.loading = false;
    });

    builder.addCase(detailAdminThunk.pending, state => {
      state.detail.loading = true;
    });

    builder.addCase(deleteAdminThunk.fulfilled, (state, action) => {
      state.delete.data = action.payload;
      state.delete.loading = false;
    });
    builder.addCase(deleteAdminThunk.rejected, (state, action) => {
      state.delete.error = action.payload as string;
      state.delete.loading = false;
    });
    builder.addCase(deleteAdminThunk.pending, state => {
      state.delete.loading = true;
    });

    builder.addCase(updateAdminThunk.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(updateAdminThunk.rejected, (state, action) => {
      state.update.error = action.payload as string;
      state.update.loading = false;
    });
    builder.addCase(updateAdminThunk.pending, (state, action) => {
      state.update.loading = true;
    });

    builder.addCase(listUserFilterOptionThunk.fulfilled, (state, action) => {
      state.listFilterOption.data = action.payload;
      state.listFilterOption.loading = false;
    });

    builder.addCase(listUserFilterOptionThunk.rejected, (state, action) => {
      state.listFilterOption.error = action.payload as string;
      state.listFilterOption.loading = false;
    });

    builder.addCase(listUserFilterOptionThunk.pending, state => {
      state.listFilterOption.loading = true;
    });
  },
});

export default userSlice.reducer;
export const {
  resetCreate,
  resetList,
  resetDetail,
  resetDelete,
  resetUpdate,
  resetFilter,
} = userSlice.actions;
