import axios from 'axios';
import { getAuthData } from '../utils/storage';

const authData = getAuthData();

const api = axios.create({
  baseURL: `${process.env.REACT_APP_TASK_MANAGER_API}/api`,
  headers:
    authData?.token && authData?.email
      ? {
          'X-User-Token': authData?.token,
          'X-User-Email': authData?.email,
        }
      : {},
});

export default api;
