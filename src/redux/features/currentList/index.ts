import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Task } from '../../../types';
import { AppState } from '../../store';

const tasksAdapter = createEntityAdapter<Task>();

const initialState = {
  id: '',
  tasks: tasksAdapter.getInitialState(),
};

const currentListState = createSlice({
  name: 'currentList',
  initialState,
  reducers: {
    setCurrentList: (
      state,
      { payload }: PayloadAction<{ id: string; tasks: Task[] }>
    ) => {
      state.id = payload.id;
      tasksAdapter.setAll(state.tasks, payload.tasks);
    },
    updateTask: (
      state,
      { payload }: PayloadAction<{ id: string; changes: Partial<Task> }>
    ) => {
      tasksAdapter.updateOne(state.tasks, payload);
    },
    addTask: (
      state,
      { payload }: PayloadAction<{ id: string; title: string }>
    ) => {
      tasksAdapter.addOne(state.tasks, payload);
    },
    removeTask: (state, { payload }: PayloadAction<string>) => {
      tasksAdapter.removeOne(state.tasks, payload);
    },
  },
});

export const { setCurrentList, updateTask, addTask, removeTask } =
  currentListState.actions;

export const tasksSelectors = tasksAdapter.getSelectors<AppState>(
  (state) => state.currentList.tasks
);

export default currentListState.reducer;
