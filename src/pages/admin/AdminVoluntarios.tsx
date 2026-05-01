import { useEffect, useState } from 'react';
import { adminService } from '@services/adminService';
import type { User } from '@app-types/index';
import { Card } from '@components/common/Card';
import { formatDate } from '@utils/formatDate';
import './AdminVoluntarios.css';

export const AdminVoluntarios = () => {
  const [voluntarios, setVoluntarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVoluntarios();
  }, []);

  // Datos mock para visualización
  const getMockVoluntarios = (): User[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        email: 'carlos.ramirez@example.com',
        nombre: 'Carlos Ramírez',
        rol: 'voluntariado',
        telefono: '3109876543',
        direccion: 'Avenida 68 #10-20, Cali',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 30 * 24 * 60 * 60 * 1000),
        habilidades: ['Logística', 'Manejo de vehículos', 'Comunicación'],
        disponibilidad: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
        experiencia: '5 años de experiencia en voluntariado. He participado en múltiples campañas de recolección y distribución de donaciones.',
      } as any,
      {
        id: '2',
        email: 'luis.torres@example.com',
        nombre: 'Luis Torres',
        rol: 'voluntariado',
        telefono: '3154445566',
        direccion: 'Avenida 19 #5-10, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 20 * 24 * 60 * 60 * 1000),
        habilidades: ['Organización', 'Trabajo en equipo', 'Atención al cliente'],
        disponibilidad: 'Fines de semana y días festivos',
        experiencia: '3 años colaborando con diferentes fundaciones. Especializado en organización de eventos y actividades comunitarias.',
      } as any,
      {
        id: '3',
        email: 'sofia.mendez@example.com',
        nombre: 'Sofía Méndez',
        rol: 'voluntariado',
        telefono: '3207778888',
        direccion: 'Calle 100 #25-30, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 15 * 24 * 60 * 60 * 1000),
        habilidades: ['Comunicación', 'Redes sociales', 'Fotografía'],
        disponibilidad: 'Lunes, Miércoles y Viernes, 2:00 PM - 6:00 PM',
        experiencia: '2 años de experiencia. Me encargo de documentar las actividades y gestionar las redes sociales de las fundaciones.',
      } as any,
      {
        id: '4',
        email: 'juan.perez@example.com',
        nombre: 'Juan Pérez',
        rol: 'voluntariado',
        telefono: '3112223344',
        direccion: 'Carrera 7 #40-50, Medellín',
        activo: false,
        fechaCreacion: new Date(fechaBase.getTime() - 10 * 24 * 60 * 60 * 1000),
        habilidades: ['Manejo de carga', 'Logística', 'Mantenimiento'],
        disponibilidad: 'Martes y Jueves, 8:00 AM - 12:00 PM',
        experiencia: '4 años de experiencia. Especializado en manejo de inventario y distribución de donaciones.',
      } as any,
      {
        id: '5',
        email: 'maria.rodriguez@example.com',
        nombre: 'María Rodríguez',
        rol: 'voluntariado',
        telefono: '3123334455',
        direccion: 'Avenida 30 #15-25, Cali',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 7 * 24 * 60 * 60 * 1000),
        habilidades: ['Educación', 'Trabajo con niños', 'Psicología'],
        disponibilidad: 'Sábados, 9:00 AM - 1:00 PM',
        experiencia: '1 año de experiencia. Trabajo principalmente con programas educativos y de apoyo a la infancia.',
      } as any,
    ];
  };

  const loadVoluntarios = async () => {
    // Mostrar datos mock inmediatamente
    setVoluntarios(getMockVoluntarios());
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const data = await adminService.obtenerVoluntarios();
      if (data.length > 0) {
        setVoluntarios(data);
      }
    } catch (error) {
      console.error('Error al cargar voluntarios:', error);
      // Mantener datos mock si hay error
    }
  };

  if (loading) {
    return <div className="loading">Cargando voluntarios...</div>;
  }

  return (
    <div className="admin-voluntarios">
      <div className="admin-voluntarios-header">
        <h2>Gestión de Voluntarios</h2>
        <p className="admin-subtitle">Total: {voluntarios.length} voluntarios</p>
      </div>

      <div className="voluntarios-grid">
        {voluntarios.length === 0 ? (
          <Card>
            <p>No hay voluntarios registrados</p>
          </Card>
        ) : (
          voluntarios.map((voluntario) => (
            <Card key={voluntario.id} className="voluntario-card">
              <div className="voluntario-header">
                <h3>{voluntario.nombre}</h3>
                {voluntario.activo ? (
                  <span className="status-active">Activo</span>
                ) : (
                  <span className="status-inactive">Inactivo</span>
                )}
              </div>
              <div className="voluntario-info">
                <p>
                  <strong>Email:</strong> {voluntario.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {voluntario.telefono || 'No registrado'}
                </p>
                <p>
                  <strong>Dirección:</strong> {voluntario.direccion || 'No registrada'}
                </p>
                {(voluntario as any).habilidades && (voluntario as any).habilidades.length > 0 && (
                  <p>
                    <strong>Habilidades:</strong>{' '}
                    {(voluntario as any).habilidades.join(', ')}
                  </p>
                )}
                {(voluntario as any).disponibilidad && (
                  <p>
                    <strong>Disponibilidad:</strong> {(voluntario as any).disponibilidad}
                  </p>
                )}
                {(voluntario as any).experiencia && (
                  <p>
                    <strong>Experiencia:</strong> {(voluntario as any).experiencia}
                  </p>
                )}
                <p>
                  <strong>Fecha de Registro:</strong> {formatDate(voluntario.fechaCreacion)}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

