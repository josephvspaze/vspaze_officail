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
    // Debug: Log token info (first/last 10 chars only for security)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔑 Token attached:', token.substring(0, 10) + '...' + token.substring(token.length - 10));
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ No token found in localStorage for request:', config.url);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('❌ CORS or Network Error - Check backend CORS configuration');
    } else if (error.response.status === 401) {
      console.error('🔒 401 Unauthorized:', {
        url: error.config?.url,
        message: error.response?.data?.message || 'Authentication failed',
        hasToken: !!localStorage.getItem('token')
      });
      
      // If token exists but still getting 401, it might be expired
      if (localStorage.getItem('token')) {
        console.warn('⚠️ Token exists but request was unauthorized. Token might be expired or invalid.');
        console.log('💡 Tip: Try logging out and logging in again.');
      }
    } else {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
        data: error.response?.data
      });
    }
    return Promise.reject(error);
  }
);

export default api;

// Helper function to check if token is valid (not expired)
export const checkTokenValidity = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { valid: false, reason: 'No token found' };
  }

  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, reason: 'Invalid token format' };
    }

    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        return { valid: false, reason: 'Token expired', expiredAt: new Date(expirationTime) };
      }
      
      return { 
        valid: true, 
        expiresAt: new Date(expirationTime),
        userId: payload.id || payload.userId,
        role: payload.role
      };
    }
    
    return { valid: true, reason: 'No expiration set' };
  } catch (error) {
    return { valid: false, reason: 'Failed to decode token', error: error.message };
  }
};

// Helper to log token status (for debugging)
export const logTokenStatus = () => {
  const status = checkTokenValidity();
  console.log('🔍 Token Status:', status);
  return status;
};
