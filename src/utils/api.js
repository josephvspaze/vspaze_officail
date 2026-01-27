import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vspaze.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('CORS or Network Error - Check backend CORS configuration');
    }
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;
