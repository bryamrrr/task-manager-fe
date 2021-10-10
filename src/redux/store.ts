import { configureStore } from '@reduxjs/toolkit';
import currentUser from './features/currentUser';
import lists from './features/lists';

export const reducers = {
  currentUser,
  lists,
};

const store = configureStore({
  reducer: reducers,
});

export type AppState = ReturnType<typeof store.getState>;

export default store;
