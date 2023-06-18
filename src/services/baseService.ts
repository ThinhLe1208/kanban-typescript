import axios from 'axios';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBER, TOKEN_CYBER_HEADER } from 'util/constants/settingSystem';
import history from 'util/history';
import storage from 'util/storage';

export const https = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

https.interceptors.request.use(
  (config) => {
    const isLogin = storage.checkLogin();
    if (isLogin) {
      config.headers.Authorization = 'Bearer ' + storage.getStorageJson(ACCESS_TOKEN);
    }
    config.headers[TOKEN_CYBER_HEADER] = TOKEN_CYBER;
    return config;
  },
  (error) => {
    toast.error('Failed to request.');
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const isLogin = storage.checkLogin();
      if (!isLogin) {
        toast.error('You must log in first.', { toastId: 'login request' });
        history.push('/signin');
      }
    }
    if (error.response?.status === 400 || error.response?.status === 404) {
      if (error?.response?.data?.message === 'Email đã được sử dụng!') {
        toast.error('The email has already been taken.', { toastId: 'duplicated email' });
      } else {
        toast.error('The data was not found.', { toastId: '400/404' });
      }
    }
    return Promise.reject(error);
  }
);
