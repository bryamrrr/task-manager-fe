import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Task } from '../../../types';
import { AppState } from '../../store';

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = {
  id: '',
  title: '',
  tasks: tasksAdapter.getInitialState(),
};

const currentListState = createSlice({
  name: 'currentList',
  initialState,
  reducers: {
    setCurrentList: (
      state,
      { payload }: PayloadAction<{ id: string; title: string; tasks: Task[] }>
    ) => {
      state.id = payload.id;
      state.title = payload.title;
      tasksAdapter.setAll(state.tasks, payload.tasks);
    },
    updateTask: (
      state,
      { payload }: PayloadAction<{ id: number; changes: Partial<Task> }>
    ) => {
      tasksAdapter.updateOne(state.tasks, payload);
    },
    addTask: (state, { payload }: PayloadAction<Task>) => {
      tasksAdapter.addOne(state.tasks, payload);
    },
    removeTask: (state, { payload }: PayloadAction<number>) => {
      tasksAdapter.removeOne(state.tasks, payload);
    },
  },
});

export const { setCurrentList, updateTask, addTask, removeTask } =
  currentListState.actions;

export const tasksSelectors = tasksAdapter.getSelectors<AppState>(
  (state) => state.currentList.tasks
);

export const getCurrentListTitle = (state: AppState) => state.currentList.title;

export default currentListState.reducer;
