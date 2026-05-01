import api from './api';
import { SolicitudDonacion } from '@types/index';

export const solicitudesService = {
  // Obtener todas las solicitudes
  obtenerSolicitudes: async (filters?: {
    fundacionId?: string;
    tipoArticulo?: string;
    estado?: string;
  }): Promise<SolicitudDonacion[]> => {
    const response = await api.get<SolicitudDonacion[]>('/solicitudes', { params: filters });
    return response.data;
  },

  // Obtener solicitud por ID
  obtenerSolicitud: async (id: string): Promise<SolicitudDonacion> => {
    const response = await api.get<SolicitudDonacion>(`/solicitudes/${id}`);
    return response.data;
  },

  // Crear solicitud
  crearSolicitud: async (solicitud: Omit<SolicitudDonacion, 'id' | 'fechaCreacion'>): Promise<SolicitudDonacion> => {
    const response = await api.post<SolicitudDonacion>('/solicitudes', solicitud);
    return response.data;
  },

  // Actualizar solicitud
  actualizarSolicitud: async (id: string, solicitud: Partial<SolicitudDonacion>): Promise<SolicitudDonacion> => {
    const response = await api.put<SolicitudDonacion>(`/solicitudes/${id}`, solicitud);
    return response.data;
  },

  // Eliminar solicitud
  eliminarSolicitud: async (id: string): Promise<void> => {
    await api.delete(`/solicitudes/${id}`);
  },
};

