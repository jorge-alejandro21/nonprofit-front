import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { donacionesService } from '@services/donacionesService';
import type { Donacion } from '@app-types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { ROUTES, TIPOS_ARTICULOS } from '@utils/constants';
import { formatDate } from '@utils/formatDate';
import './Donaciones.css';

export const Donaciones = () => {
  const { user } = useAuth();
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonaciones();
  }, []);

  // Datos mock para visualización inmediata
  const getMockDonaciones = (): Donacion[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        donanteId: user?.id || '1',
        tipoArticulo: 'ropa',
        descripcion: 'Ropa en buen estado para donación. Incluye camisetas, pantalones y chaquetas de diferentes tallas.',
        cantidad: 25,
        estado: 'disponible',
        estadoArticulo: 'usado',
        fechaDisponible: new Date(fechaBase.getTime() - 2 * 24 * 60 * 60 * 1000),
        ubicacionRecoleccion: 'Calle 123 #45-67, Bogotá',
        fechaCreacion: new Date(fechaBase.getTime() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        donanteId: user?.id || '1',
        tipoArticulo: 'alimentos',
        descripcion: 'Alimentos no perecederos: arroz, frijoles, pasta, aceite y azúcar.',
        cantidad: 50,
        estado: 'asignada',
        estadoArticulo: 'nuevo',
        fechaDisponible: new Date(fechaBase.getTime() - 1 * 24 * 60 * 60 * 1000),
        ubicacionRecoleccion: 'Carrera 50 #20-30, Medellín',
        fechaCreacion: new Date(fechaBase.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        donanteId: user?.id || '1',
        tipoArticulo: 'juguetes',
        descripcion: 'Juguetes educativos para niños. Incluye rompecabezas, juegos de mesa y muñecas.',
        cantidad: 15,
        estado: 'entregada',
        estadoArticulo: 'usado',
        fechaDisponible: new Date(fechaBase.getTime() - 10 * 24 * 60 * 60 * 1000),
        ubicacionRecoleccion: 'Avenida 68 #10-20, Cali',
        fechaCreacion: new Date(fechaBase.getTime() - 15 * 24 * 60 * 60 * 1000),
        fechaEntrega: new Date(fechaBase.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
  };

  const loadDonaciones = async () => {
    // Mostrar datos mock inmediatamente
    setDonaciones(getMockDonaciones());
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const filters: any = {};
      if (user?.rol === 'donante') {
        filters.donanteId = user.id;
      }
      const data = await donacionesService.obtenerDonaciones(filters);
      if (data.length > 0) {
        setDonaciones(data);
      }
    } catch (error) {
      console.error('Error al cargar donaciones:', error);
      // Mantener datos mock si hay error
    }
  };

  const getTipoArticuloLabel = (tipo: string) => {
    return TIPOS_ARTICULOS.find((t) => t.value === tipo)?.label || tipo;
  };

  if (loading) {
    return <div className="loading">Cargando donaciones...</div>;
  }

  return (
    <div className="donaciones">
      <div className="donaciones-header">
        <h1>Donaciones</h1>
        {user?.rol === 'donante' && (
          <Link to={ROUTES.CREAR_DONACION}>
            <Button variant="success">Crear Nueva Donación</Button>
          </Link>
        )}
      </div>

      {donaciones.length === 0 ? (
        <Card>
          <p>No hay donaciones disponibles.</p>
        </Card>
      ) : (
        <div className="donaciones-grid">
          {donaciones.map((donacion) => (
            <Card key={donacion.id} className="donacion-card">
              <div className="donacion-header">
                <h3>{getTipoArticuloLabel(donacion.tipoArticulo)}</h3>
                <span className={`estado-badge estado-${donacion.estado}`}>
                  {donacion.estado}
                </span>
              </div>
              <p className="donacion-descripcion">{donacion.descripcion}</p>
              <div className="donacion-info">
                <p>
                  <strong>Cantidad:</strong> {donacion.cantidad}
                </p>
                <p>
                  <strong>Estado del artículo:</strong> {donacion.estadoArticulo}
                </p>
                <p>
                  <strong>Fecha disponible:</strong> {formatDate(donacion.fechaDisponible)}
                </p>
                <p>
                  <strong>Ubicación:</strong> {donacion.ubicacionRecoleccion}
                </p>
              </div>
              <div className="donacion-actions">
                <Button variant="primary">Ver Detalles</Button>
                {user?.rol === 'fundacion' && donacion.estado === 'disponible' && (
                  <Button variant="success">Solicitar</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

