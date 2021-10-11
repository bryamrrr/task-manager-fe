import { AxiosResponse } from 'axios';
import { List } from '../../../types';
import api from '../../index';

const createList = async (title: string): Promise<List> => {
  try {
    const response = await api.post<{ title: string }, AxiosResponse>(
      '/lists',
      {
        title,
      }
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default createList;
