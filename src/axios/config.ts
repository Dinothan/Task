// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      // Handle network errors
      throw new Error('Network error. Please check your internet connection.');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
