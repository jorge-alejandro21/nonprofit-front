import api from './api';
import type { SolicitudDonacion } from '@app-types/index';

/** Cuerpo enviado al crear una solicitud (el backend asigna estado y cantidad recibida). */
export type CrearSolicitudPayload = Pick<
  SolicitudDonacion,
  'fundacionId' | 'tipoArticulo' | 'descripcion' | 'cantidadNecesaria' | 'prioridad'
> & {
  fechaLimite?: Date;
};

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
  crearSolicitud: async (solicitud: CrearSolicitudPayload): Promise<SolicitudDonacion> => {
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

