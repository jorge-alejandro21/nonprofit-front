import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import './DashboardAdmin.css';

export const DashboardAdmin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalDonaciones: 0,
    totalFundaciones: 0,
    fundacionesPendientes: 0,
    donacionesPendientes: 0,
    totalVoluntarios: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  // Datos mock para visualización
  const getMockStats = () => {
    return {
      totalUsuarios: 156,
      totalDonaciones: 342,
      totalFundaciones: 28,
      fundacionesPendientes: 5,
      donacionesPendientes: 12,
      totalVoluntarios: 45,
    };
  };

  const loadStats = async () => {
    // Mostrar datos mock inmediatamente
    setStats(getMockStats());
    
    // Intentar cargar datos reales en background
    try {
      // Aquí se cargarían las estadísticas desde el backend
      // Por ahora solo usamos mock
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // Mantener datos mock si hay error
    }
  };

  return (
    <div className="dashboard-admin">
      <div className="dashboard-header">
        <h1>Bienvenido, {user?.nombre}</h1>
        <p className="dashboard-subtitle">Panel de Super Administrador</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card stat-primary">
          <div className="stat-icon">👥</div>
          <h3>Total de Usuarios</h3>
          <p className="stat-number">{stats.totalUsuarios}</p>
          <p className="stat-description">Usuarios registrados en el sistema</p>
        </Card>

        <Card className="stat-card stat-success">
          <div className="stat-icon">🎁</div>
          <h3>Total de Donaciones</h3>
          <p className="stat-number">{stats.totalDonaciones}</p>
          <p className="stat-description">Donaciones registradas</p>
        </Card>

        <Card className="stat-card stat-info">
          <div className="stat-icon">🏢</div>
          <h3>Fundaciones</h3>
          <p className="stat-number">{stats.totalFundaciones}</p>
          <p className="stat-description">Fundaciones registradas</p>
        </Card>

        <Card className="stat-card stat-warning">
          <div className="stat-icon">⏳</div>
          <h3>Pendientes de Validación</h3>
          <p className="stat-number">{stats.fundacionesPendientes}</p>
          <p className="stat-description">Fundaciones por validar</p>
        </Card>

        <Card className="stat-card stat-danger">
          <div className="stat-icon">📋</div>
          <h3>Donaciones Pendientes</h3>
          <p className="stat-number">{stats.donacionesPendientes}</p>
          <p className="stat-description">Donaciones en proceso</p>
        </Card>

        <Card className="stat-card stat-secondary">
          <div className="stat-icon">🤝</div>
          <h3>Voluntarios</h3>
          <p className="stat-number">{stats.totalVoluntarios}</p>
          <p className="stat-description">Voluntarios activos</p>
        </Card>
      </div>

      <div className="dashboard-actions">
        <Card className="action-card">
          <h3>Gestión de Usuarios</h3>
          <p>Administra todos los usuarios del sistema</p>
          <Link to={ROUTES.ADMIN}>
            <Button variant="primary">Gestionar Usuarios</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Validar Fundaciones</h3>
          <p>Revisa y valida fundaciones pendientes</p>
          <Link to={`${ROUTES.ADMIN}/fundaciones`}>
            <Button variant="warning">Validar Fundaciones</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Gestión de Donaciones</h3>
          <p>Administra todas las donaciones del sistema</p>
          <Link to={ROUTES.DONACIONES}>
            <Button variant="primary">Gestionar Donaciones</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Reportes y Estadísticas</h3>
          <p>Consulta reportes detallados del sistema</p>
          <Link to={ROUTES.REPORTES}>
            <Button variant="secondary">Ver Reportes</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Gestión de Voluntarios</h3>
          <p>Administra el voluntariado del sistema</p>
          <Link to={`${ROUTES.ADMIN}/voluntarios`}>
            <Button variant="secondary">Gestionar Voluntarios</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Configuración del Sistema</h3>
          <p>Configura parámetros generales del sistema</p>
          <Link to={`${ROUTES.ADMIN}/configuracion`}>
            <Button variant="secondary">Configuración</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

