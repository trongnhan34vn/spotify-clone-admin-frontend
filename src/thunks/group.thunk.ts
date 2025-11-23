import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReduxState } from "../types/redux.type";
import type { Group } from "../types/entities/user.type";
import { AxiosError } from "axios";
import { listAdminGroupsService } from "../services/group.service";

export const listAdminGroupsThunk = createAsyncThunk(
  'groups/listAdminGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await listAdminGroupsService();
    } catch (err: any) {
      console.error('[Thunk] Error occurred when listing admin groups', err.message);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          window.location.href = '/unauthorized';
        }

        let error = err.message;
        return rejectWithValue(error);
      }

      let error = 'System Error';
      return rejectWithValue(error);
    }
  }
);