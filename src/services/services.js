import axiosInterceptor from './axiosInterceptor';
import { baseUrl } from '../configs/constants';

export const authentications = (username, password) => {
  const authApi = baseUrl + '/users/login';
  const data = {
    username: username,
    password: password,
  };
  return axiosInterceptor.post(authApi, data);
  // return axiosInterceptor.post('https://ems-api.4ftech.com/ccl/devices/register', {})
};

export const registerUser = (username, password, email, role) => {
  const regApi = baseUrl + '/users';
  const data = {
    username: username,
    password: password,
    email: email,
    role: role
  };
  return axiosInterceptor.post(regApi, data);
};

