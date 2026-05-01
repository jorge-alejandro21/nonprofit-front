import api from './api';
import type { InventarioItem } from '@app-types/index';

export const inventarioService = {
  // Obtener inventario
  obtenerInventario: async (): Promise<InventarioItem[]> => {
    const response = await api.get<InventarioItem[]>('/inventario');
    return response.data;
  },

  // Obtener item por ID
  obtenerItem: async (id: string): Promise<InventarioItem> => {
    const response = await api.get<InventarioItem>(`/inventario/${id}`);
    return response.data;
  },

  // Agregar item al inventario
  agregarItem: async (donacionId: string): Promise<InventarioItem> => {
    const response = await api.post<InventarioItem>('/inventario', { donacionId });
    return response.data;
  },

  // Actualizar item
  actualizarItem: async (id: string, item: Partial<InventarioItem>): Promise<InventarioItem> => {
    const response = await api.put<InventarioItem>(`/inventario/${id}`, item);
    return response.data;
  },
};

