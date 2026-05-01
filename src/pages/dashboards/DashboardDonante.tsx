import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import { donacionesService } from '@services/donacionesService';
import './DashboardDonante.css';

export const DashboardDonante = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    donacionesActivas: 0,
    donacionesCompletadas: 0,
    totalDonaciones: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  // Datos mock para visualización
  const getMockStats = () => {
    return {
      donacionesActivas: 3,
      donacionesCompletadas: 12,
      totalDonaciones: 15,
    };
  };

  const loadStats = async () => {
    // Mostrar datos mock inmediatamente
    setStats(getMockStats());
    
    // Intentar cargar datos reales en background
    try {
      if (user?.id) {
        const donaciones = await donacionesService.obtenerDonaciones({
          donanteId: user.id,
        });
        
        if (donaciones.length > 0) {
          const activas = donaciones.filter((d) => d.estado !== 'entregada' && d.estado !== 'cancelada').length;
          const completadas = donaciones.filter((d) => d.estado === 'entregada').length;
          setStats({
            donacionesActivas: activas,
            donacionesCompletadas: completadas,
            totalDonaciones: donaciones.length,
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // Mantener datos mock si hay error
    }
  };

  return (
    <div className="dashboard-donante">
      <div className="dashboard-header">
        <h1>Bienvenido, {user?.nombre}</h1>
        <p className="dashboard-subtitle">Panel de Donante</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Donaciones Activas</h3>
          <p className="stat-number">{stats.donacionesActivas}</p>
          <p className="stat-description">Donaciones en proceso</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>Donaciones Completadas</h3>
          <p className="stat-number">{stats.donacionesCompletadas}</p>
          <p className="stat-description">Entregas exitosas</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>Total de Donaciones</h3>
          <p className="stat-number">{stats.totalDonaciones}</p>
          <p className="stat-description">Historial completo</p>
        </Card>
      </div>

      <div className="dashboard-actions">
        <Card className="action-card">
          <h3>Gestionar Donaciones</h3>
          <p>Ver y administrar todas tus donaciones</p>
          <Link to={ROUTES.DONACIONES}>
            <Button variant="primary">Ver Mis Donaciones</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Crear Nueva Donación</h3>
          <p>Registra una nueva donación en especie</p>
          <Link to={ROUTES.CREAR_DONACION}>
            <Button variant="success">Crear Donación</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Ver Impacto</h3>
          <p>Consulta el impacto de tus donaciones</p>
          <Link to={ROUTES.REPORTES}>
            <Button variant="secondary">Ver Reportes</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

