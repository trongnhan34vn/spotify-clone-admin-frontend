import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../constants/slice';
import {
  createGenreThunk,
  deleteGenreThunk,
  detailGenreThunk,
  listGenreFilterOptionsThunk,
  listGenreThunk,
  updateGenreThunk,
} from '../../thunks/genre.thunk';
import type { Genre, GenreFilterOption } from '../../types/entities/genre.type';
import type { Pagination } from '../../types/entities/pagination.type';
import type { ReduxState } from '../../types/redux.type';

type ActionState = {
  list: ReduxState<Pagination<Genre>>;
  create: ReduxState<Genre>;
  detail: ReduxState<Genre>;
  delete: ReduxState<string>;
  update: ReduxState<string>;
  listFilterOption: ReduxState<GenreFilterOption>;
};

const defaultState = {
  data: null,
  error: null,
  loading: false,
};

const initialState: ActionState = {
  list: defaultState,
  create: defaultState,
  update: defaultState,
  detail: defaultState,
  delete: defaultState,
  listFilterOption: defaultState,
};

const genreSlice = createSlice({
  name: SliceName.GENRE,
  initialState,
  reducers: {
    resetCreate: state => {
      state.create = defaultState;
    },
    resetList: state => {
      state.list = defaultState;
    },
    resetDetail: state => {
      state.detail = defaultState;
    },
    resetUpdate: state => {
      state.update = defaultState;
    },
    resetListFilterOption: state => {
      state.listFilterOption = defaultState;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(listGenreThunk.fulfilled, (state, action) => {
        state.list.data = action.payload;
        state.list.loading = false;
      })
      .addCase(listGenreThunk.pending, state => {
        state.list.loading = true;
      })
      .addCase(listGenreThunk.rejected, (state, action) => {
        state.list.error = action.payload as string;
        state.list.loading = false;
      })
      .addCase(createGenreThunk.fulfilled, (state, action) => {
        state.create.data = action.payload;
        state.create.loading = false;
      })
      .addCase(createGenreThunk.pending, state => {
        state.create.loading = true;
      })
      .addCase(createGenreThunk.rejected, (state, action) => {
        state.create.error = action.payload as string;
        state.create.loading = false;
      })
      .addCase(detailGenreThunk.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.loading = false;
      })
      .addCase(detailGenreThunk.pending, state => {
        state.detail.loading = true;
      })
      .addCase(detailGenreThunk.rejected, (state, action) => {
        state.detail.error = action.payload as string;
        state.detail.loading = false;
      })
      .addCase(updateGenreThunk.fulfilled, (state, action) => {
        state.update.data = action.payload;
        state.update.loading = false;
      })
      .addCase(updateGenreThunk.pending, state => {
        state.update.loading = true;
      })
      .addCase(updateGenreThunk.rejected, (state, action) => {
        state.update.error = action.payload as string;
        state.update.loading = false;
      })
      .addCase(listGenreFilterOptionsThunk.fulfilled, (state, action) => {
        state.listFilterOption.data = action.payload;
        state.listFilterOption.loading = false;
      })
      .addCase(listGenreFilterOptionsThunk.pending, state => {
        state.listFilterOption.loading = true;
      })
      .addCase(listGenreFilterOptionsThunk.rejected, (state, action) => {
        state.listFilterOption.error = action.payload as string;
        state.listFilterOption.loading = false;
      })
      .addCase(deleteGenreThunk.fulfilled, (state, action) => {
        state.delete.data = action.payload;
        state.delete.loading = false;
      })
      .addCase(deleteGenreThunk.pending, state => {
        state.delete.loading = true;
      })
      .addCase(deleteGenreThunk.rejected, (state, action) => {
        state.delete.error = action.payload as string;
        state.delete.loading = false;
      });
  },
});

export default genreSlice.reducer;
export const {
  resetCreate,
  resetDetail,
  resetList,
  resetListFilterOption,
  resetUpdate,
} = genreSlice.actions;
