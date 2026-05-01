import api from './api';
import type { Notificacion, NotificacionesResponse } from '@app-types/index';

export const notificacionesService = {
  // Obtener notificaciones
  obtenerNotificaciones: async (params?: {
    leida?: boolean;
    tipo?: string;
    limit?: number;
    page?: number;
  }): Promise<NotificacionesResponse> => {
    const response = await api.get<NotificacionesResponse>('/notificaciones', { params });
    return response.data;
  },

  // Obtener contador de no leídas
  obtenerContadorNoLeidas: async (): Promise<{ count: number }> => {
    const response = await api.get<{ count: number }>('/notificaciones/contador');
    return response.data;
  },

  // Obtener notificación por ID
  obtenerNotificacion: async (id: string): Promise<Notificacion> => {
    const response = await api.get<Notificacion>(`/notificaciones/${id}`);
    return response.data;
  },

  // Marcar como leída
  marcarComoLeida: async (id: string): Promise<Notificacion> => {
    const response = await api.put<Notificacion>(`/notificaciones/${id}/leer`);
    return response.data;
  },

  // Marcar todas como leídas
  marcarTodasComoLeidas: async (): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>('/notificaciones/leer-todas');
    return response.data;
  },

  // Eliminar notificación
  eliminarNotificacion: async (id: string): Promise<void> => {
    await api.delete(`/notificaciones/${id}`);
  },

  // Eliminar todas las leídas
  eliminarTodasLeidas: async (): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>('/notificaciones/leidas/todas');
    return response.data;
  },
};

