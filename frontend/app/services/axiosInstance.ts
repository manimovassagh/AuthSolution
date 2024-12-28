import axios from 'axios';
import keycloak from '../../services/keycloak';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your backend's base URL
  timeout: 10000, // Optional: Timeout for requests
});

// Interceptor to add the token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    if (keycloak.token) {
      // Refresh the token if needed
      try {
        await keycloak.updateToken(5); // Update token if it expires in less than 5 seconds
      } catch (error) {
        console.error('Failed to refresh token:', error);
        keycloak.logout();
      }

      config.headers.Authorization = `Bearer ${keycloak.token}`;
    
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;