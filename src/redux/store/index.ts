import { configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth.slice'
import user from '../slices/user.slice'
import group from '../slices/group.slice'
import genre from '../slices/genre.slice'
export const store = configureStore({
  reducer: {
    auth,
    user,
    group,
    genre
    // user: userReducer,
    // thêm slice khác ở đây
  },
});

// Infer type cho hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
