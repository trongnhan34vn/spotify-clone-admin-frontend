import { configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth.slice'

export const store = configureStore({
  reducer: {
    auth
    // user: userReducer,
    // thêm slice khác ở đây
  },
});

// Infer type cho hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
