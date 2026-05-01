import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import './DashboardVoluntariado.css';

export const DashboardVoluntariado = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    entregasCompletadas: 0,
    entregasPendientes: 0,
    horasVoluntariado: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  // Datos mock para visualización
  const getMockStats = () => {
    return {
      entregasCompletadas: 12,
      entregasPendientes: 3,
      horasVoluntariado: 45,
    };
  };

  const loadStats = async () => {
    // Mostrar datos mock inmediatamente
    setStats(getMockStats());
    
    // Intentar cargar datos reales en background (si se implementa en el futuro)
    try {
      // Aquí se cargarían las estadísticas desde el backend
      // Por ahora solo usamos mock
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // Mantener datos mock si hay error
    }
  };

  return (
    <div className="dashboard-voluntariado">
      <div className="dashboard-header">
        <h1>Bienvenido, {user?.nombre}</h1>
        <p className="dashboard-subtitle">Panel de Voluntariado</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">🚚</div>
          <h3>Entregas Completadas</h3>
          <p className="stat-number">{stats.entregasCompletadas}</p>
          <p className="stat-description">Donaciones entregadas exitosamente</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Entregas Pendientes</h3>
          <p className="stat-number">{stats.entregasPendientes}</p>
          <p className="stat-description">Donaciones en proceso de entrega</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">⏱️</div>
          <h3>Horas de Voluntariado</h3>
          <p className="stat-number">{stats.horasVoluntariado}</p>
          <p className="stat-description">Horas dedicadas al voluntariado</p>
        </Card>
      </div>

      <div className="dashboard-actions">
        <Card className="action-card">
          <h3>Entregas Asignadas</h3>
          <p>Ver y gestionar las entregas que tienes asignadas</p>
          <Link to={ROUTES.DONACIONES}>
            <Button variant="primary">Ver Entregas</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Disponibilidad</h3>
          <p>Actualiza tu disponibilidad para entregas</p>
          <Link to={ROUTES.PERFIL}>
            <Button variant="secondary">Actualizar Disponibilidad</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Historial</h3>
          <p>Consulta tu historial de entregas completadas</p>
          <Link to={ROUTES.REPORTES}>
            <Button variant="secondary">Ver Historial</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

