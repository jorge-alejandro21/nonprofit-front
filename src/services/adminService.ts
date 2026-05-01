import api from './api';
import type { User } from '@app-types/index';

export const adminService = {
  // Obtener todos los usuarios
  obtenerUsuarios: async (filters?: { rol?: string; activo?: boolean }): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/usuarios', { params: filters });
    return response.data;
  },

  // Obtener usuario por ID
  obtenerUsuario: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/admin/usuarios/${id}`);
    return response.data;
  },

  // Actualizar usuario
  actualizarUsuario: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/admin/usuarios/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario
  eliminarUsuario: async (id: string): Promise<void> => {
    await api.delete(`/admin/usuarios/${id}`);
  },

  // Obtener fundaciones
  obtenerFundaciones: async (validada?: boolean): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/fundaciones', { params: { validada } });
    return response.data;
  },

  // Validar fundación
  validarFundacion: async (id: string): Promise<User> => {
    const response = await api.put<User>(`/admin/fundaciones/${id}/validar`);
    return response.data;
  },

  // Obtener voluntarios
  obtenerVoluntarios: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/voluntarios');
    return response.data;
  },

  // Actualizar voluntario
  actualizarVoluntario: async (id: string, voluntarioData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/admin/voluntarios/${id}`, voluntarioData);
    return response.data;
  },

  // Obtener configuración
  obtenerConfiguracion: async (): Promise<any> => {
    const response = await api.get('/admin/configuracion');
    return response.data;
  },

  // Actualizar configuración
  actualizarConfiguracion: async (configuracion: any): Promise<any> => {
    const response = await api.put('/admin/configuracion', configuracion);
    return response.data;
  },
};

