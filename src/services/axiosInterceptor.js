import axios from 'axios';
import { baseUrl } from '../configs/constants';

const authInterceptors = axios.create({
  baseURL: baseUrl,
});

authInterceptors.interceptors.request.use(
  (config) => {
    let token = undefined;
    let byebugToken = undefined;
    if (localStorage.getItem("token")) {
      token = JSON.parse(localStorage.getItem('token')).access_token;
    }

    if (token) {
      // to decide which one to take or maybe not needed for this project
      config.headers['access_token'] = `${token}`;
      config.headers['Authorization'] = `Bearer ${byebugToken}`;
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

authInterceptors.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.code === "ERR_NETWORK") {
      return Promise.reject("Request Timeout, Please try again later.")
    }

    if ([401, 1001, 1002].includes(error.response.data.code) || error.response.data.message === "Unauthorized") {
      localStorage.clear();
      setTimeout(() => {
        setTimeout(() => {
          window.location.assign('/')
        }, 500);
      }, 300);
    } else if ([404].includes(error.response.status)) {
      // window.location.assign('/404');
    }
    return Promise.reject(error.response);
  },
);
export default authInterceptors;
