import { AxiosResponse } from 'axios';
import api from '../../index';

const deleteTask = async (taskId: number): Promise<any> => {
  try {
    const response = await api.delete<undefined, AxiosResponse>(
      `/tasks/${taskId}`
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default deleteTask;
