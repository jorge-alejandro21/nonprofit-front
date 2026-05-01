import api from './api';
import type { Donacion, SolicitudDonacion, Emparejamiento } from '@app-types/index';

export const donacionesService = {
  // Obtener todas las donaciones
  obtenerDonaciones: async (filters?: {
    tipoArticulo?: string;
    estado?: string;
    donanteId?: string;
  }): Promise<Donacion[]> => {
    const response = await api.get<Donacion[]>('/donaciones', { params: filters });
    return response.data;
  },

  // Obtener donación por ID
  obtenerDonacion: async (id: string): Promise<Donacion> => {
    const response = await api.get<Donacion>(`/donaciones/${id}`);
    return response.data;
  },

  // Crear donación
  crearDonacion: async (donacion: Omit<Donacion, 'id' | 'fechaCreacion'>): Promise<Donacion> => {
    const response = await api.post<Donacion>('/donaciones', donacion);
    return response.data;
  },

  // Actualizar donación
  actualizarDonacion: async (
    id: string,
    donacion: Partial<Donacion>
  ): Promise<Donacion> => {
    const response = await api.put<Donacion>(`/donaciones/${id}`, donacion);
    return response.data;
  },

  // Eliminar donación
  eliminarDonacion: async (id: string): Promise<void> => {
    await api.delete(`/donaciones/${id}`);
  },

  // Obtener solicitudes de donación
  obtenerSolicitudes: async (filters?: {
    fundacionId?: string;
    tipoArticulo?: string;
    estado?: string;
  }): Promise<SolicitudDonacion[]> => {
    const response = await api.get<SolicitudDonacion[]>('/solicitudes', { params: filters });
    return response.data;
  },

  // Crear solicitud de donación
  crearSolicitud: async (
    solicitud: Omit<SolicitudDonacion, 'id' | 'fechaCreacion'>
  ): Promise<SolicitudDonacion> => {
    const response = await api.post<SolicitudDonacion>('/solicitudes', solicitud);
    return response.data;
  },

  // Asignar donación a fundación
  asignarDonacion: async (
    donacionId: string,
    fundacionId: string
  ): Promise<Emparejamiento> => {
    const response = await api.post<Emparejamiento>('/emparejamientos', {
      donacionId,
      fundacionId,
    });
    return response.data;
  },

  // Aceptar emparejamiento
  aceptarEmparejamiento: async (emparejamientoId: string): Promise<Emparejamiento> => {
    const response = await api.put<Emparejamiento>(
      `/emparejamientos/${emparejamientoId}/aceptar`
    );
    return response.data;
  },

  // Rechazar emparejamiento
  rechazarEmparejamiento: async (emparejamientoId: string): Promise<void> => {
    await api.put(`/emparejamientos/${emparejamientoId}/rechazar`);
  },
};

