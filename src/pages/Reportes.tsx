import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { reportesService } from '@services/reportesService';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { TIPOS_ARTICULOS } from '@utils/constants';
import { formatDate } from '@utils/formatDate';
import './Reportes.css';

export const Reportes = () => {
  const { user } = useAuth();
  const [reporteImpacto, setReporteImpacto] = useState<any>(null);
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    loadReportes();
  }, []);

  // Datos mock para visualización
  const getMockReporteImpacto = () => {
    const fechaBase = new Date();
    return {
      periodo: {
        inicio: fechaInicio ? new Date(fechaInicio) : new Date(fechaBase.getTime() - 30 * 24 * 60 * 60 * 1000),
        fin: fechaFin ? new Date(fechaFin) : new Date(),
      },
      totalDonaciones: 45,
      totalArticulos: 320,
      personasBeneficiadas: 280,
      tiposArticulos: {
        ropa: 120,
        alimentos: 85,
        juguetes: 45,
        libros: 35,
        medicamentos: 20,
        utensilios: 15,
      },
      fechaGeneracion: new Date(),
    };
  };

  const getMockEstadisticas = () => {
    if (user?.rol === 'donante') {
      return {
        donacionesActivas: 3,
        donacionesCompletadas: 12,
        totalDonaciones: 15,
      };
    } else if (user?.rol === 'fundacion') {
      return {
        donacionesDisponibles: 28,
        solicitudesActivas: 5,
        inventarioItems: 18,
        donacionesRecibidas: 32,
      };
    } else if (user?.rol === 'super_administrador') {
      return {
        totalUsuarios: 156,
        totalDonaciones: 342,
        totalFundaciones: 28,
        fundacionesPendientes: 5,
        donacionesPendientes: 12,
        totalVoluntarios: 45,
      };
    }
    return {};
  };

  const loadReportes = async () => {
    // Mostrar datos mock inmediatamente
    setReporteImpacto(getMockReporteImpacto());
    setEstadisticas(getMockEstadisticas());
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const [impacto, stats] = await Promise.all([
        reportesService.obtenerReporteImpacto({
          inicio: fechaInicio || undefined,
          fin: fechaFin || undefined,
        }),
        reportesService.obtenerEstadisticas(),
      ]);
      if (impacto) setReporteImpacto(impacto);
      if (stats) setEstadisticas(stats);
    } catch (error) {
      console.error('Error al cargar reportes:', error);
      // Mantener datos mock si hay error
    }
  };

  const handleFiltrar = () => {
    loadReportes();
  };

  const getTipoArticuloLabel = (tipo: string) => {
    return TIPOS_ARTICULOS.find((t) => t.value === tipo)?.label || tipo;
  };

  if (loading) {
    return <div className="loading">Cargando reportes...</div>;
  }

  return (
    <div className="reportes">
      <div className="reportes-header">
        <h1>Reportes e Impacto</h1>
        <div className="reportes-filtros">
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            placeholder="Fecha inicio"
            className="filtro-date"
          />
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            placeholder="Fecha fin"
            className="filtro-date"
          />
          <Button variant="primary" onClick={handleFiltrar}>
            Filtrar
          </Button>
        </div>
      </div>

      {estadisticas && (
        <div className="reportes-stats">
          <Card className="stat-card">
            <h3>Estadísticas Generales</h3>
            <div className="stats-grid">
              {Object.entries(estadisticas).map(([key, value]) => (
                <div key={key} className="stat-item">
                  <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="stat-value">{value as number}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {reporteImpacto && (
        <div className="reporte-impacto">
          <Card>
            <h2>Reporte de Impacto</h2>
            <div className="impacto-info">
              <p>
                <strong>Período:</strong> {formatDate(reporteImpacto.periodo.inicio)} -{' '}
                {formatDate(reporteImpacto.periodo.fin)}
              </p>
              <p>
                <strong>Total Donaciones:</strong> {reporteImpacto.totalDonaciones}
              </p>
              <p>
                <strong>Total Artículos:</strong> {reporteImpacto.totalArticulos}
              </p>
              <p>
                <strong>Personas Beneficiadas:</strong> {reporteImpacto.personasBeneficiadas}
              </p>
            </div>

            <div className="tipos-articulos">
              <h3>Distribución por Tipo de Artículo</h3>
              <div className="tipos-grid">
                {Object.entries(reporteImpacto.tiposArticulos || {}).map(([tipo, cantidad]) => (
                  <div key={tipo} className="tipo-item">
                    <span className="tipo-label">{getTipoArticuloLabel(tipo)}</span>
                    <span className="tipo-cantidad">{cantidad as number}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

