import { AxiosResponse } from 'axios';
import api from '../../index';

interface loginUserRequest {
  email: string;
  password: string;
}

type loginUserResponse = {
  authentication_token: string;
  email: string;
};

const loginUser = async (
  data: loginUserRequest
): Promise<loginUserResponse> => {
  var bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('password', data.password);

  try {
    const response = await api.post<FormData, AxiosResponse>(
      '/users/token',
      bodyFormData
    );
    return response.data;
  } catch (e) {
    console.warn(e);
    throw new Error(e as any);
  }
};

export default loginUser;
