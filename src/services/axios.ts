import axios, { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://18.141.205.178:3000',
  responseType: 'json',
};

export const axiosInstance = axios.create(options);
