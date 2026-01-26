import axios from 'axios';
import { API_URL } from '../config/config';

// Create an instance of axios
const authInterceptor = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in every request
authInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authInterceptor;