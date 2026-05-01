import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { inventarioService } from '@services/inventarioService';
import type { InventarioItem } from '@app-types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { TIPOS_ARTICULOS } from '@utils/constants';
import { formatDate } from '@utils/formatDate';
import './Inventario.css';

export const Inventario = () => {
  const { user } = useAuth();
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  useEffect(() => {
    loadInventario();
  }, []);

  useEffect(() => {
    loadInventario();
  }, [filtroEstado]);

  // Datos mock para visualización
  const getMockInventario = (): InventarioItem[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        fundacionId: user?.id || '1',
        donacionId: 'don1',
        tipoArticulo: 'ropa',
        descripcion: 'Ropa en buen estado: camisetas, pantalones, chaquetas. Varias tallas para adultos y niños.',
        cantidad: 45,
        fechaEntrada: new Date(fechaBase.getTime() - 10 * 24 * 60 * 60 * 1000),
        estado: 'disponible',
      },
      {
        id: '2',
        fundacionId: user?.id || '1',
        donacionId: 'don2',
        tipoArticulo: 'alimentos',
        descripcion: 'Alimentos no perecederos: arroz, frijoles, pasta, aceite, azúcar, leche en polvo.',
        cantidad: 80,
        fechaEntrada: new Date(fechaBase.getTime() - 5 * 24 * 60 * 60 * 1000),
        estado: 'disponible',
      },
      {
        id: '3',
        fundacionId: user?.id || '1',
        donacionId: 'don3',
        tipoArticulo: 'juguetes',
        descripcion: 'Juguetes educativos y didácticos para niños. Incluye rompecabezas, juegos de mesa, muñecas y carros.',
        cantidad: 25,
        fechaEntrada: new Date(fechaBase.getTime() - 20 * 24 * 60 * 60 * 1000),
        fechaSalida: new Date(fechaBase.getTime() - 2 * 24 * 60 * 60 * 1000),
        estado: 'entregado',
      },
      {
        id: '4',
        fundacionId: user?.id || '1',
        donacionId: 'don4',
        tipoArticulo: 'libros',
        descripcion: 'Libros de literatura, cuentos infantiles y material educativo. Varios géneros y para diferentes edades.',
        cantidad: 60,
        fechaEntrada: new Date(fechaBase.getTime() - 7 * 24 * 60 * 60 * 1000),
        estado: 'asignado',
      },
      {
        id: '5',
        fundacionId: user?.id || '1',
        donacionId: 'don5',
        tipoArticulo: 'utensilios',
        descripcion: 'Utensilios de cocina: ollas, sartenes, platos, vasos, cubiertos. Material en buen estado.',
        cantidad: 35,
        fechaEntrada: new Date(fechaBase.getTime() - 3 * 24 * 60 * 60 * 1000),
        estado: 'disponible',
      },
    ];
  };

  const loadInventario = async () => {
    // Mostrar datos mock inmediatamente
    let mockData = getMockInventario();
    if (filtroEstado) {
      mockData = mockData.filter((i) => i.estado === filtroEstado);
    }
    setInventario(mockData);
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const data = await inventarioService.obtenerInventario();
      if (data.length > 0) {
        let filteredData = data;
        if (filtroEstado) {
          filteredData = data.filter((i) => i.estado === filtroEstado);
        }
        setInventario(filteredData);
      }
    } catch (error) {
      console.error('Error al cargar inventario:', error);
      // Mantener datos mock si hay error
    }
  };

  const getTipoArticuloLabel = (tipo: string) => {
    return TIPOS_ARTICULOS.find((t) => t.value === tipo)?.label || tipo;
  };

  const inventarioFiltrado = filtroEstado
    ? inventario.filter((item) => item.estado === filtroEstado)
    : inventario;

  if (loading) {
    return <div className="loading">Cargando inventario...</div>;
  }

  return (
    <div className="inventario">
      <div className="inventario-header">
        <h1>Mi Inventario</h1>
        <div className="inventario-stats">
          <div className="stat-item">
            <span className="stat-label">Total Items:</span>
            <span className="stat-value">{inventario.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Disponibles:</span>
            <span className="stat-value">
              {inventario.filter((i) => i.estado === 'disponible').length}
            </span>
          </div>
        </div>
      </div>

      <div className="inventario-filtros">
        <button
          className={filtroEstado === '' ? 'active' : ''}
          onClick={() => setFiltroEstado('')}
        >
          Todos
        </button>
        <button
          className={filtroEstado === 'disponible' ? 'active' : ''}
          onClick={() => setFiltroEstado('disponible')}
        >
          Disponibles
        </button>
        <button
          className={filtroEstado === 'asignado' ? 'active' : ''}
          onClick={() => setFiltroEstado('asignado')}
        >
          Asignados
        </button>
        <button
          className={filtroEstado === 'entregado' ? 'active' : ''}
          onClick={() => setFiltroEstado('entregado')}
        >
          Entregados
        </button>
      </div>

      {inventarioFiltrado.length === 0 ? (
        <Card>
          <p>No hay items en el inventario.</p>
        </Card>
      ) : (
        <div className="inventario-grid">
          {inventarioFiltrado.map((item) => (
            <Card key={item.id} className="inventario-item-card">
              <div className="inventario-item-header">
                <h3>{getTipoArticuloLabel(item.tipoArticulo)}</h3>
                <span className={`estado-badge estado-${item.estado}`}>
                  {item.estado}
                </span>
              </div>
              <p className="inventario-item-descripcion">{item.descripcion}</p>
              <div className="inventario-item-info">
                <p>
                  <strong>Cantidad:</strong> {item.cantidad}
                </p>
                <p>
                  <strong>Fecha de Entrada:</strong> {formatDate(item.fechaEntrada)}
                </p>
                {item.fechaSalida && (
                  <p>
                    <strong>Fecha de Salida:</strong> {formatDate(item.fechaSalida)}
                  </p>
                )}
              </div>
              <div className="inventario-item-actions">
                <Button variant="primary">Ver Detalles</Button>
                {item.estado === 'disponible' && (
                  <Button variant="secondary">Marcar como Entregado</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

