import { AxiosResponse } from 'axios';
import { List } from '../../../types';
import api from '../../index';

const getLists = async (): Promise<List[]> => {
  try {
    const response = await api.get<undefined, AxiosResponse>('/lists');
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default getLists;
