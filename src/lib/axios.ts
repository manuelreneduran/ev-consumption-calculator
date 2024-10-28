// src/lib/axiosConfig.ts

import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Your API base URL
  timeout: 60000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, add an auth token
    // config.headers.Authorization = `Bearer ${getToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default axios;
