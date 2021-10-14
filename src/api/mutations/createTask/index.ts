import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { Task } from '../../../types';
import api from '../../index';

const createTask = async (listId: string, task: Task): Promise<Task> => {
  try {
    const response = await api.post<Partial<Task>, AxiosResponse>(
      `/lists/${listId}/tasks`,
      { ...task, due_date: dayjs(task.due_date).add(12, 'hours').format() }
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default createTask;
