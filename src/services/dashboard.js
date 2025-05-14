import { baseUrl } from '../configs/constants';
import byebugAxios from './axiosInterceptor'

export const changePassword = (payload) => {
    return byebugAxios.put(`${baseUrl}/users/password`, payload);
};