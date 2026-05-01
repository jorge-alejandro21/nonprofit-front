import { useEffect, useState } from 'react';
import { adminService } from '@services/adminService';
import { User } from '@types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { formatDate } from '@utils/formatDate';
import './AdminFundaciones.css';

export const AdminFundaciones = () => {
  const [fundaciones, setFundaciones] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroValidada, setFiltroValidada] = useState<string>('');

  useEffect(() => {
    loadFundaciones();
  }, [filtroValidada]);

  // Datos mock para visualización
  const getMockFundaciones = (): User[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        email: 'fundacion.esperanza@example.com',
        nombre: 'Fundación Esperanza',
        rol: 'fundacion',
        telefono: '6012345678',
        direccion: 'Carrera 50 #20-30, Medellín',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 45 * 24 * 60 * 60 * 1000),
        validada: true,
        nit: '900123456-1',
        descripcion: 'Organización sin ánimo de lucro dedicada a ayudar a familias vulnerables en Medellín. Trabajamos con programas de alimentación, educación y vivienda.',
      } as any,
      {
        id: '2',
        email: 'fundacion.solidaridad@example.com',
        nombre: 'Fundación Solidaridad',
        rol: 'fundacion',
        telefono: '6019876543',
        direccion: 'Carrera 30 #40-50, Barranquilla',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 30 * 24 * 60 * 60 * 1000),
        validada: false,
        nit: '900234567-2',
        descripcion: 'Fundación enfocada en el apoyo a niños y jóvenes en situación de vulnerabilidad. Programas de nutrición, educación y recreación.',
      } as any,
      {
        id: '3',
        email: 'fundacion.caridad@example.com',
        nombre: 'Fundación Caridad',
        rol: 'fundacion',
        telefono: '6015551234',
        direccion: 'Calle 72 #10-15, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 20 * 24 * 60 * 60 * 1000),
        validada: true,
        nit: '900345678-3',
        descripcion: 'Organización que brinda apoyo integral a comunidades vulnerables en Bogotá. Programas de salud, educación y emprendimiento.',
      } as any,
      {
        id: '4',
        email: 'fundacion.amor@example.com',
        nombre: 'Fundación Amor y Esperanza',
        rol: 'fundacion',
        telefono: '6014445566',
        direccion: 'Avenida 6N #28-50, Cali',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 10 * 24 * 60 * 60 * 1000),
        validada: false,
        nit: '900456789-4',
        descripcion: 'Nueva fundación dedicada a ayudar a adultos mayores y personas en situación de discapacidad. Programas de acompañamiento y apoyo.',
      } as any,
      {
        id: '5',
        email: 'fundacion.futuro@example.com',
        nombre: 'Fundación Futuro Mejor',
        rol: 'fundacion',
        telefono: '6017778888',
        direccion: 'Carrera 15 #5-20, Bucaramanga',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 5 * 24 * 60 * 60 * 1000),
        validada: false,
        nit: '900567890-5',
        descripcion: 'Fundación enfocada en educación y desarrollo infantil. Programas de apoyo escolar y actividades recreativas para niños.',
      } as any,
    ];
  };

  const loadFundaciones = async () => {
    // Mostrar datos mock inmediatamente
    let mockData = getMockFundaciones();
    if (filtroValidada !== '') {
      const validada = filtroValidada === 'true';
      mockData = mockData.filter((f) => (f as any).validada === validada);
    }
    setFundaciones(mockData);
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const validada = filtroValidada !== '' ? filtroValidada === 'true' : undefined;
      const data = await adminService.obtenerFundaciones(validada);
      if (data.length > 0) {
        setFundaciones(data);
      }
    } catch (error) {
      console.error('Error al cargar fundaciones:', error);
      // Mantener datos mock si hay error
    }
  };

  const handleValidar = async (id: string) => {
    if (window.confirm('¿Estás seguro de validar esta fundación?')) {
      try {
        await adminService.validarFundacion(id);
        loadFundaciones();
        alert('Fundación validada correctamente');
      } catch (error) {
        console.error('Error al validar fundación:', error);
        alert('Error al validar fundación');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando fundaciones...</div>;
  }

  const fundacionesPendientes = fundaciones.filter((f) => !(f as any).validada);
  const fundacionesValidadas = fundaciones.filter((f) => (f as any).validada);

  return (
    <div className="admin-fundaciones">
      <div className="admin-fundaciones-header">
        <h2>Validar Fundaciones</h2>
        <div className="admin-filtros">
          <button
            className={filtroValidada === '' ? 'active' : ''}
            onClick={() => setFiltroValidada('')}
          >
            Todas
          </button>
          <button
            className={filtroValidada === 'false' ? 'active' : ''}
            onClick={() => setFiltroValidada('false')}
          >
            Pendientes ({fundacionesPendientes.length})
          </button>
          <button
            className={filtroValidada === 'true' ? 'active' : ''}
            onClick={() => setFiltroValidada('true')}
          >
            Validadas ({fundacionesValidadas.length})
          </button>
        </div>
      </div>

      <div className="fundaciones-grid">
        {fundaciones.length === 0 ? (
          <Card>
            <p>No hay fundaciones</p>
          </Card>
        ) : (
          fundaciones.map((fundacion) => (
            <Card key={fundacion.id} className="fundacion-card">
              <div className="fundacion-header">
                <h3>{fundacion.nombre}</h3>
                {(fundacion as any).validada ? (
                  <span className="status-validated">✓ Validada</span>
                ) : (
                  <span className="status-pending">⏳ Pendiente</span>
                )}
              </div>
              <div className="fundacion-info">
                <p>
                  <strong>Email:</strong> {fundacion.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {fundacion.telefono || 'No registrado'}
                </p>
                <p>
                  <strong>Dirección:</strong> {fundacion.direccion || 'No registrada'}
                </p>
                {(fundacion as any).nit && (
                  <p>
                    <strong>NIT:</strong> {(fundacion as any).nit}
                  </p>
                )}
                {(fundacion as any).descripcion && (
                  <p>
                    <strong>Descripción:</strong> {(fundacion as any).descripcion}
                  </p>
                )}
                <p>
                  <strong>Fecha de Registro:</strong> {formatDate(fundacion.fechaCreacion)}
                </p>
              </div>
              {!(fundacion as any).validada && (
                <div className="fundacion-actions">
                  <Button variant="success" onClick={() => handleValidar(fundacion.id)}>
                    Validar Fundación
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

