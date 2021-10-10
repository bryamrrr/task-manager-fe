import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_TASK_MANAGER_API}/api`,
  headers: {
    'access-control-allow-origin': '*',
  },
});

export default api;
