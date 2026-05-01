import api from './api';
import type { Mensaje } from '@app-types/index';

export const mensajesService = {
  // Obtener mensajes
  obtenerMensajes: async (tipo?: 'enviados' | 'recibidos'): Promise<Mensaje[]> => {
    const response = await api.get<Mensaje[]>('/mensajes', { params: { tipo } });
    return response.data;
  },

  // Obtener mensaje por ID
  obtenerMensaje: async (id: string): Promise<Mensaje> => {
    const response = await api.get<Mensaje>(`/mensajes/${id}`);
    return response.data;
  },

  // Crear mensaje
  crearMensaje: async (mensaje: Omit<Mensaje, 'id' | 'fechaCreacion' | 'leido'>): Promise<Mensaje> => {
    const response = await api.post<Mensaje>('/mensajes', mensaje);
    return response.data;
  },

  // Marcar como leído
  marcarComoLeido: async (id: string): Promise<Mensaje> => {
    const response = await api.put<Mensaje>(`/mensajes/${id}/leer`);
    return response.data;
  },
};

