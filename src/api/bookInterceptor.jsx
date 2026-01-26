import axios from 'axios';
import { API_URL } from '../config/config';


// Create an instance of axios
const bookInterceptor = axios.create({
  baseURL: API_URL+"/api",
});

// Helpers to manage auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Add a request interceptor to include the token in every request
bookInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 responses gracefully
bookInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Clear token and optionally redirect to login
      clearAuthToken();
      // You can emit an event or navigate here depending on your router
    }
    return Promise.reject(error);
  }
);

export default bookInterceptor;