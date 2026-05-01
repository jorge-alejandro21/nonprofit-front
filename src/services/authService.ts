import api from './api';
import { AuthResponse, LoginForm, RegistroForm, User } from '@types/index';

// Credenciales de ejemplo para desarrollo
const CREDENCIALES_EJEMPLO: Record<string, { user: User; password: string }> = {
  'donante@example.com': {
    user: {
      id: '1',
      email: 'donante@example.com',
      nombre: 'Juan Pérez',
      rol: 'donante',
      telefono: '3001234567',
      direccion: 'Calle 123, Cali',
      activo: true,
      fechaCreacion: new Date(),
    },
    password: 'donante123',
  },
  'fundacion@example.com': {
    user: {
      id: '2',
      email: 'fundacion@example.com',
      nombre: 'Fundación La Casita de Emmanuel',
      rol: 'fundacion',
      telefono: '3007654321',
      direccion: 'Carrera 45, Cali',
      activo: true,
      fechaCreacion: new Date(),
    },
    password: 'fundacion123',
  },
  'voluntario@example.com': {
    user: {
      id: '3',
      email: 'voluntario@example.com',
      nombre: 'María González',
      rol: 'voluntariado',
      telefono: '3009876543',
      direccion: 'Avenida 6N, Cali',
      activo: true,
      fechaCreacion: new Date(),
    },
    password: 'voluntario123',
  },
  'admin@example.com': {
    user: {
      id: '4',
      email: 'admin@example.com',
      nombre: 'Super Administrador',
      rol: 'super_administrador',
      telefono: '3001111111',
      direccion: 'Oficina Central, Cali',
      activo: true,
      fechaCreacion: new Date(),
    },
    password: 'admin123',
  },
};

export const authService = {
  // Login
  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    try {
      // Intentar con el backend real primero
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      // Si el backend no está disponible, usar credenciales de ejemplo como fallback
      const credencialEjemplo = CREDENCIALES_EJEMPLO[credentials.email];
      
      if (credencialEjemplo && credencialEjemplo.password === credentials.password) {
        // Simular respuesta del servidor
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: credencialEjemplo.user,
              token: `mock_token_${credencialEjemplo.user.id}_${Date.now()}`,
            });
          }, 500);
        });
      }

      // Si no es una credencial de ejemplo, lanzar el error original
      throw error;
    }
  },

  // Registro
  register: async (formData: RegistroForm): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', formData);
    return response.data;
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      // Si el backend no está disponible, intentar obtener del storage
      const savedUser = localStorage.getItem('user_data');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/auth/users/${userId}`, userData);
    return response.data;
  },

  // Logout (solo en frontend, el backend puede invalidar el token)
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Si falla, igual limpiamos el frontend
      console.error('Error en logout:', error);
    }
  },
};

