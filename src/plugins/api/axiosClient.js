// api/axiosClient.js
import axios from 'axios';
import { LOCAL_STORAGE } from 'utils/localStorage';
import { notifFailure } from '../helpers/notificatiton';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
const URL = process.env.REACT_APP_API_DOMAIN;

const axiosClient = axios.create({
  // timeout: 5000,
  // baseURL: 'http://localhost:3000',
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.TOKEN)}`,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    notifFailure(error);
    throw error;
  },
);

export default axiosClient;
