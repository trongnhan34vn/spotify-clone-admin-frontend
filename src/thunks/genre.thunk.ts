import { createAsyncThunk } from '@reduxjs/toolkit';
import { GenreAction } from '../constants/actions';
import { handleException } from '../helpers/handle.exception';
import {
  createGenreService,
  deleteGenreService,
  listGenreService,
  listGenreFilterOptionService,
  updateGenreService,
  detailGenreService,
} from '../services/genre.service';
import type { CreateGenre, Genre } from '../types/entities/genre.type';
import type { Query } from '../types/entities/query.type';

export const listGenreThunk = createAsyncThunk(
  GenreAction.LIST,
  async (query: Query, { rejectWithValue }) => {
    try {
      return await listGenreService(query);
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when listing genres: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);

export const detailGenreThunk = createAsyncThunk(
  GenreAction.DETAIL,
  async (id: string, { rejectWithValue }) => {
    try {
      return await detailGenreService(id);
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when detailing genre: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);

export const createGenreThunk = createAsyncThunk(
  GenreAction.CREATE,
  async (data: CreateGenre, { rejectWithValue }) => {
    try {
      return await createGenreService(data);
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when creating genres: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);

export const deleteGenreThunk = createAsyncThunk(
  GenreAction.DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteGenreService(id);
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when deleting genres: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);

export const updateGenreThunk = createAsyncThunk(
  GenreAction.UPDATE,
  async (data: Genre, { rejectWithValue }) => {
    try {
      return updateGenreService(data);
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when updating genres: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);

export const listGenreFilterOptionsThunk = createAsyncThunk(
  GenreAction.FILTER_OPTION,
  async (_, { rejectWithValue }) => {
    try {
      return await listGenreFilterOptionService();
    } catch (error: any) {
      console.error(
        '[THUNK] Error occurred when listing genre filter options: ',
        error.message
      );
      return handleException(error, rejectWithValue);
    }
  }
);
