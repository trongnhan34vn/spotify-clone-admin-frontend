export type ThunkRequest<T> = {
  data: T,
  token?: string
}

export type ThunkResponse<T> = {
  data: T | null
  message: string;
  code: string;
  timestamp?: string;
  cause?: any
}

export type ReduxState<T> = {
  data?: T | null;
  message?: string | null;
  error?: string | null;
  loading?: boolean
}