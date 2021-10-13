import { AxiosResponse } from 'axios';
import { Task } from '../../../types';
import api from '../../index';

const createTask = async (listId: string, task: Task): Promise<Task> => {
  try {
    const response = await api.post<Partial<Task>, AxiosResponse>(
      `/lists/${listId}/tasks`,
      task
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default createTask;
