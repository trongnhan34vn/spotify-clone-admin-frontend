import { AxiosError, HttpStatusCode } from "axios";

export const handleException = (err: any,rejectWithValue: any) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === HttpStatusCode.Unauthorized) {
      window.location.href = '/unauthorized';
    }
    return rejectWithValue(
      err.response?.data?.errorMessage || err.message || 'Unauthorized'
    );
  }

  return rejectWithValue('System Error');
}