import axios, { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
};

export const axiosInstance = axios.create(options);
