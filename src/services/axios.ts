import axios, { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://api-demo.dpaexpress.xyz',
  responseType: 'json',
};

export const axiosInstance = axios.create(options);
