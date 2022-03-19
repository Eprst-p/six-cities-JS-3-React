import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {SERVER_URL, REQUEST_TIMEOUT} from '../settings/server-settings';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
