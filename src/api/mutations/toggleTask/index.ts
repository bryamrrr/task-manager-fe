import { AxiosResponse } from 'axios';
import { Task } from '../../../types';
import api from '../../index';

const toggleTask = async (taskId: string): Promise<Task> => {
  try {
    const response = await api.post<undefined, AxiosResponse>(
      `/tasks/${taskId}/toggle`
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default toggleTask;
