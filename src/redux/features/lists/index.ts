import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { List } from '../../../types';
import { AppState } from '../../store';

const listsAdapter = createEntityAdapter<List>();

const listsState = createSlice({
  name: 'lists',
  initialState: listsAdapter.getInitialState(),
  reducers: {
    addList: listsAdapter.addOne,
    addLists: listsAdapter.setAll,
    updateList: listsAdapter.updateOne,
    removeList: listsAdapter.removeOne,
  },
});

export const { addList, addLists, updateList, removeList } = listsState.actions;

export const listsSelectors = listsAdapter.getSelectors<AppState>(
  (state) => state.lists
);

export default listsState.reducer;
