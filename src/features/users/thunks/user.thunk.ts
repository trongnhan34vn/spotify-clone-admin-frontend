import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createAdminService,
  deleteAdminService,
  detailAdminService,
  listAdminsService,
  listUserFilterOptionService,
  updateAdminService,
} from '../services/user.service';
import type { CreateAdminReq, User } from '../../../types/entities/user.type';
import type { Query } from '../../../types/entities/query.type';

export const listAdminsThunk = createAsyncThunk(
  'users/listAdmins',
  async (query: Query, { rejectWithValue }) => {
    try {
      return await listAdminsService(query);
      
    } catch (err: any) {
      console.error('[Thunk] Error occurred when listing admins', err.message);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }

        let error = err.response?.data.errorMessage;
        return rejectWithValue(error);
      }

      let error = 'System Error';
      return rejectWithValue(error);
    }
  }
);

export const createAdminThunk = createAsyncThunk(
  'users/createAdmin',
  async (req: CreateAdminReq, { rejectWithValue }) => {
    try {
      return await createAdminService(req);
    } catch (err: any) {
      console.error('[Thunk] Error occurred when creating admins', err.message);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }
        let error = err.response?.data.errorMessage;
        return rejectWithValue(error);
      }

      let error = 'System Error';
      return rejectWithValue(error);
    }
  }
);

export const detailAdminThunk = createAsyncThunk(
  'users/detailAdmin',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await detailAdminService(id);
      return result;
    } catch (err: any) {
      console.error(
        '[Thunk] Error occurred when getting admin detail:',
        err.message
      );

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }
        return rejectWithValue(
          err.response?.data?.errorMessage || 'Unauthorized'
        );
      }

      return rejectWithValue('System Error');
    }
  }
);

export const deleteAdminThunk = createAsyncThunk(
  'users/deleteAdmin',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await deleteAdminService(id);
      return result;
    } catch (err: any) {
      console.error(
        '[Thunk] Error occurred when deleting admin detail:',
        err.message
      );

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }
        return rejectWithValue(
          err.response?.data?.errorMessage || 'Unauthorized'
        );
      }

      return rejectWithValue('System Error');
    }
  }
);

export const updateAdminThunk = createAsyncThunk(
  'users/updateAdmin',
  async (data: User, { rejectWithValue }) => {
    try {
      const result = await updateAdminService(data);
      return result;
    } catch (err: any) {
      console.error(
        '[Thunk] Error occurred when updating admin detail:',
        err.message
      );

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }
        return rejectWithValue(
          err.response?.data?.errorMessage || 'Unauthorized'
        );
      }

      return rejectWithValue('System Error');
    }
  }
);

export const listUserFilterOptionThunk = createAsyncThunk(
  'users/listFilterOption',
  async (_, { rejectWithValue }) => {
    try {
      const result = await listUserFilterOptionService();
      return result;
    } catch (err: any) {
      console.error(
        '[Thunk] Error occurred when getting admin detail:',
        err.message
      );

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }
        return rejectWithValue(
          err.response?.data?.errorMessage || 'Unauthorized'
        );
      }

      return rejectWithValue('System Error');
    }
  }
);
