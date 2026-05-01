import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { solicitudesService } from '@services/solicitudesService';
import { SolicitudDonacion } from '@types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { ROUTES, TIPOS_ARTICULOS, PRIORIDADES_SOLICITUD } from '@utils/constants';
import { formatDate } from '@utils/formatDate';
import './Solicitudes.css';

export const Solicitudes = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState<SolicitudDonacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  useEffect(() => {
    loadSolicitudes();
  }, []);

  // Datos mock para visualización
  const getMockSolicitudes = (): SolicitudDonacion[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        fundacionId: user?.id || '1',
        tipoArticulo: 'ropa',
        descripcion: 'Necesitamos ropa en buen estado para familias vulnerables del barrio. Especialmente ropa de niños y adultos en tallas medianas.',
        cantidadNecesaria: 50,
        cantidadRecibida: 35,
        prioridad: 'alta',
        estado: 'parcialmente_cubierta',
        fechaCreacion: new Date(fechaBase.getTime() - 5 * 24 * 60 * 60 * 1000),
        fechaLimite: new Date(fechaBase.getTime() + 10 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        fundacionId: user?.id || '1',
        tipoArticulo: 'alimentos',
        descripcion: 'Solicitamos alimentos no perecederos para nuestro comedor comunitario. Arroz, frijoles, aceite, azúcar, etc.',
        cantidadNecesaria: 100,
        cantidadRecibida: 0,
        prioridad: 'urgente',
        estado: 'pendiente',
        fechaCreacion: new Date(fechaBase.getTime() - 2 * 24 * 60 * 60 * 1000),
        fechaLimite: new Date(fechaBase.getTime() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        fundacionId: user?.id || '1',
        tipoArticulo: 'juguetes',
        descripcion: 'Buscamos juguetes educativos y didácticos para nuestro programa de apoyo a la infancia. Juguetes en buen estado para niños de 3 a 12 años.',
        cantidadNecesaria: 30,
        cantidadRecibida: 30,
        prioridad: 'media',
        estado: 'completada',
        fechaCreacion: new Date(fechaBase.getTime() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        id: '4',
        fundacionId: user?.id || '1',
        tipoArticulo: 'libros',
        descripcion: 'Necesitamos libros para nuestra biblioteca comunitaria. Libros de literatura, cuentos infantiles, enciclopedias y material educativo.',
        cantidadNecesaria: 80,
        cantidadRecibida: 45,
        prioridad: 'baja',
        estado: 'parcialmente_cubierta',
        fechaCreacion: new Date(fechaBase.getTime() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        id: '5',
        fundacionId: user?.id || '1',
        tipoArticulo: 'medicamentos',
        descripcion: 'Solicitamos medicamentos básicos para nuestro dispensario. Analgésicos, antiinflamatorios, vitaminas y medicamentos para enfermedades comunes.',
        cantidadNecesaria: 60,
        cantidadRecibida: 0,
        prioridad: 'urgente',
        estado: 'pendiente',
        fechaCreacion: new Date(fechaBase.getTime() - 1 * 24 * 60 * 60 * 1000),
        fechaLimite: new Date(fechaBase.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    ];
  };

  const loadSolicitudes = async () => {
    // Mostrar datos mock inmediatamente
    let mockData = getMockSolicitudes();
    if (filtroEstado) {
      mockData = mockData.filter((s) => s.estado === filtroEstado);
    }
    setSolicitudes(mockData);
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const filters: any = {};
      if (user?.rol === 'fundacion') {
        filters.fundacionId = user.id;
      }
      if (filtroEstado) {
        filters.estado = filtroEstado;
      }
      const data = await solicitudesService.obtenerSolicitudes(filters);
      if (data.length > 0) {
        setSolicitudes(data);
      }
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      // Mantener datos mock si hay error
    }
  };

  useEffect(() => {
    loadSolicitudes();
  }, [filtroEstado]);

  const getTipoArticuloLabel = (tipo: string) => {
    return TIPOS_ARTICULOS.find((t) => t.value === tipo)?.label || tipo;
  };

  const getPrioridadLabel = (prioridad: string) => {
    return PRIORIDADES_SOLICITUD.find((p) => p.value === prioridad)?.label || prioridad;
  };

  const getPrioridadColor = (prioridad: string) => {
    return PRIORIDADES_SOLICITUD.find((p) => p.value === prioridad)?.color || 'gray';
  };

  const handleEliminar = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      try {
        await solicitudesService.eliminarSolicitud(id);
        loadSolicitudes();
      } catch (error) {
        console.error('Error al eliminar solicitud:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando solicitudes...</div>;
  }

  return (
    <div className="solicitudes">
      <div className="solicitudes-header">
        <h1>Mis Solicitudes</h1>
        {user?.rol === 'fundacion' && (
          <Link to={ROUTES.CREAR_SOLICITUD}>
            <Button variant="success">Crear Nueva Solicitud</Button>
          </Link>
        )}
      </div>

      <div className="solicitudes-filtros">
        <button
          className={filtroEstado === '' ? 'active' : ''}
          onClick={() => setFiltroEstado('')}
        >
          Todas
        </button>
        <button
          className={filtroEstado === 'pendiente' ? 'active' : ''}
          onClick={() => setFiltroEstado('pendiente')}
        >
          Pendientes
        </button>
        <button
          className={filtroEstado === 'parcialmente_cubierta' ? 'active' : ''}
          onClick={() => setFiltroEstado('parcialmente_cubierta')}
        >
          Parcialmente Cubiertas
        </button>
        <button
          className={filtroEstado === 'completada' ? 'active' : ''}
          onClick={() => setFiltroEstado('completada')}
        >
          Completadas
        </button>
      </div>

      {solicitudes.length === 0 ? (
        <Card>
          <p>No hay solicitudes disponibles.</p>
          {user?.rol === 'fundacion' && (
            <Link to={ROUTES.CREAR_SOLICITUD}>
              <Button variant="success">Crear Primera Solicitud</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="solicitudes-grid">
          {solicitudes.map((solicitud) => (
            <Card key={solicitud.id} className="solicitud-card">
              <div className="solicitud-header">
                <h3>{getTipoArticuloLabel(solicitud.tipoArticulo)}</h3>
                <div className="solicitud-badges">
                  <span className={`estado-badge estado-${solicitud.estado}`}>
                    {solicitud.estado.replace('_', ' ')}
                  </span>
                  <span
                    className={`prioridad-badge prioridad-${getPrioridadColor(solicitud.prioridad)}`}
                  >
                    {getPrioridadLabel(solicitud.prioridad)}
                  </span>
                </div>
              </div>
              <p className="solicitud-descripcion">{solicitud.descripcion}</p>
              <div className="solicitud-info">
                <p>
                  <strong>Cantidad Necesaria:</strong> {solicitud.cantidadNecesaria}
                </p>
                <p>
                  <strong>Cantidad Recibida:</strong> {solicitud.cantidadRecibida}
                </p>
                <p>
                  <strong>Progreso:</strong>{' '}
                  {Math.round((solicitud.cantidadRecibida / solicitud.cantidadNecesaria) * 100)}%
                </p>
                <p>
                  <strong>Fecha de creación:</strong> {formatDate(solicitud.fechaCreacion)}
                </p>
                {solicitud.fechaLimite && (
                  <p>
                    <strong>Fecha límite:</strong> {formatDate(solicitud.fechaLimite)}
                  </p>
                )}
              </div>
              <div className="solicitud-actions">
                <Button variant="primary">Ver Detalles</Button>
                {user?.rol === 'fundacion' && solicitud.estado !== 'completada' && (
                  <Button variant="secondary">Editar</Button>
                )}
                {user?.rol === 'fundacion' && solicitud.estado === 'pendiente' && (
                  <Button variant="danger" onClick={() => handleEliminar(solicitud.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

