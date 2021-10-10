import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentUser {
  email?: string;
}

const initialState: CurrentUser = {};

const currentUserState = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateCurrentUser: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.email = payload;
    },
  },
});

export const { updateCurrentUser } = currentUserState.actions;

export default currentUserState.reducer;
