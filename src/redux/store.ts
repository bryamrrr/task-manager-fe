import { configureStore } from '@reduxjs/toolkit';
import currentUser from './features/currentUser';

export const reducers = {
  currentUser,
};

const store = configureStore({
  reducer: reducers,
});

export type AppState = ReturnType<typeof store.getState>;

export default store;
