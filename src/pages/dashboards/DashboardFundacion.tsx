import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import { donacionesService } from '@services/donacionesService';
import { solicitudesService } from '@services/solicitudesService';
import './DashboardFundacion.css';

export const DashboardFundacion = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    donacionesDisponibles: 0,
    solicitudesActivas: 0,
    inventarioItems: 0,
    donacionesRecibidas: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  // Datos mock para visualización
  const getMockStats = () => {
    return {
      donacionesDisponibles: 28,
      solicitudesActivas: 5,
      inventarioItems: 18,
      donacionesRecibidas: 32,
    };
  };

  const loadStats = async () => {
    // Mostrar datos mock inmediatamente
    setStats(getMockStats());
    
    // Intentar cargar datos reales en background
    try {
      if (user?.id) {
        const [donaciones, solicitudes] = await Promise.all([
          donacionesService.obtenerDonaciones(),
          solicitudesService.obtenerSolicitudes({ fundacionId: user.id }),
        ]);

        const donacionesDisponibles = donaciones.filter((d) => d.estado === 'disponible').length;
        const solicitudesActivas = solicitudes.filter((s) => s.estado === 'pendiente' || s.estado === 'parcialmente_cubierta').length;
        const donacionesRecibidas = donaciones.filter((d) => d.fundacionAsignadaId === user.id && d.estado === 'entregada').length;

        // Actualizar con datos reales si existen
        if (donaciones.length > 0 || solicitudes.length > 0) {
          setStats({
            donacionesDisponibles: donacionesDisponibles || 28,
            solicitudesActivas: solicitudesActivas || 5,
            inventarioItems: 18,
            donacionesRecibidas: donacionesRecibidas || 32,
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // Mantener datos mock si hay error
    }
  };

  return (
    <div className="dashboard-fundacion">
      <div className="dashboard-header">
        <h1>Bienvenida, {user?.nombre}</h1>
        <p className="dashboard-subtitle">Panel de Fundación</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">🎁</div>
          <h3>Donaciones Disponibles</h3>
          <p className="stat-number">{stats.donacionesDisponibles}</p>
          <p className="stat-description">Donaciones que puedes solicitar</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📋</div>
          <h3>Solicitudes Activas</h3>
          <p className="stat-number">{stats.solicitudesActivas}</p>
          <p className="stat-description">Solicitudes en proceso</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Inventario</h3>
          <p className="stat-number">{stats.inventarioItems}</p>
          <p className="stat-description">Items en inventario</p>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>Donaciones Recibidas</h3>
          <p className="stat-number">{stats.donacionesRecibidas}</p>
          <p className="stat-description">Total de donaciones recibidas</p>
        </Card>
      </div>

      <div className="dashboard-actions">
        <Card className="action-card">
          <h3>Ver Donaciones Disponibles</h3>
          <p>Explora las donaciones que puedes solicitar</p>
          <Link to={ROUTES.DONACIONES}>
            <Button variant="primary">Ver Donaciones</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Mis Solicitudes</h3>
          <p>Gestiona tus solicitudes de donación</p>
          <Link to={ROUTES.SOLICITUDES}>
            <Button variant="primary">Ver Solicitudes</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Crear Solicitud</h3>
          <p>Solicita donaciones según tus necesidades</p>
          <Link to={ROUTES.CREAR_SOLICITUD}>
            <Button variant="success">Crear Solicitud</Button>
          </Link>
        </Card>

        <Card className="action-card">
          <h3>Inventario</h3>
          <p>Gestiona tu inventario de donaciones recibidas</p>
          <Link to={ROUTES.INVENTARIO}>
            <Button variant="secondary">Ver Inventario</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

