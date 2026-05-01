import api from './api';
import { ReporteImpacto } from '@types/index';

export const reportesService = {
  // Obtener reporte de impacto
  obtenerReporteImpacto: async (params?: {
    inicio?: string;
    fin?: string;
    fundacionId?: string;
  }): Promise<ReporteImpacto> => {
    const response = await api.get<ReporteImpacto>('/reportes/impacto', { params });
    return response.data;
  },

  // Obtener estadísticas
  obtenerEstadisticas: async (): Promise<any> => {
    const response = await api.get('/reportes/estadisticas');
    return response.data;
  },
};

