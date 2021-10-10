import { AxiosResponse } from 'axios';
import api from '../../index';

interface createUserRequest {
  email: string;
  password: string;
}

type createUserResponse = {
  authentication_token: string;
  email: string;
};

const createUser = async (
  data: createUserRequest
): Promise<createUserResponse | unknown> => {
  var bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('password', data.password);

  try {
    const response = await api.post<FormData, AxiosResponse>(
      '/users',
      bodyFormData
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export default createUser;
