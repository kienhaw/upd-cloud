import axios from 'Services/axiosInterceptor';
import { baseUrl } from '../../../../configs/constants';

export const submitQuestion = (payload) => {
    return axios.post(`${baseUrl}/submissions`, payload);
  };
  