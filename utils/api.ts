import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'https://event-rsvp-backend-d0s8.onrender.com/api';

const API = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add interceptors for debugging
API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Api request with token", token);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default API;