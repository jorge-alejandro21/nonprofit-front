import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '@utils/constants';
import { storage } from '@utils/storage';

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000, // 3 segundos máximo
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      storage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

