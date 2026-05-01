import { useEffect, useState } from 'react';
import { adminService } from '@services/adminService';
import { User } from '@types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { formatDate } from '@utils/formatDate';
import './AdminUsuarios.css';

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroRol, setFiltroRol] = useState<string>('');
  const [filtroActivo, setFiltroActivo] = useState<string>('');

  useEffect(() => {
    loadUsuarios();
  }, [filtroRol, filtroActivo]);

  // Datos mock para visualización
  const getMockUsuarios = (): User[] => {
    const fechaBase = new Date();
    return [
      {
        id: '1',
        email: 'maria.gonzalez@example.com',
        nombre: 'María González',
        rol: 'donante',
        telefono: '3001234567',
        direccion: 'Calle 123 #45-67, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        email: 'fundacion.esperanza@example.com',
        nombre: 'Fundación Esperanza',
        rol: 'fundacion',
        telefono: '6012345678',
        direccion: 'Carrera 50 #20-30, Medellín',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 45 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        email: 'carlos.ramirez@example.com',
        nombre: 'Carlos Ramírez',
        rol: 'voluntariado',
        telefono: '3109876543',
        direccion: 'Avenida 68 #10-20, Cali',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: '4',
        email: 'ana.martinez@example.com',
        nombre: 'Ana Martínez',
        rol: 'donante',
        telefono: '3201112233',
        direccion: 'Calle 100 #15-25, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        id: '5',
        email: 'fundacion.solidaridad@example.com',
        nombre: 'Fundación Solidaridad',
        rol: 'fundacion',
        telefono: '6019876543',
        direccion: 'Carrera 30 #40-50, Barranquilla',
        activo: false,
        fechaCreacion: new Date(fechaBase.getTime() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        id: '6',
        email: 'luis.torres@example.com',
        nombre: 'Luis Torres',
        rol: 'voluntariado',
        telefono: '3154445566',
        direccion: 'Avenida 19 #5-10, Bogotá',
        activo: true,
        fechaCreacion: new Date(fechaBase.getTime() - 10 * 24 * 60 * 60 * 1000),
      },
    ];
  };

  const loadUsuarios = async () => {
    // Mostrar datos mock inmediatamente
    let mockData = getMockUsuarios();
    if (filtroRol) {
      mockData = mockData.filter((u) => u.rol === filtroRol);
    }
    if (filtroActivo !== '') {
      mockData = mockData.filter((u) => u.activo === (filtroActivo === 'true'));
    }
    setUsuarios(mockData);
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const filters: any = {};
      if (filtroRol) filters.rol = filtroRol;
      if (filtroActivo !== '') filters.activo = filtroActivo === 'true';
      const data = await adminService.obtenerUsuarios(filters);
      if (data.length > 0) {
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      // Mantener datos mock si hay error
    }
  };

  const handleEliminar = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await adminService.eliminarUsuario(id);
        loadUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="admin-usuarios">
      <div className="admin-usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <div className="admin-filtros">
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos los roles</option>
            <option value="donante">Donantes</option>
            <option value="fundacion">Fundaciones</option>
            <option value="voluntariado">Voluntarios</option>
            <option value="super_administrador">Administradores</option>
          </select>
          <select
            value={filtroActivo}
            onChange={(e) => setFiltroActivo(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="usuarios-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                  No hay usuarios
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`rol-badge rol-${usuario.rol}`}>{usuario.rol}</span>
                  </td>
                  <td>
                    {usuario.activo ? (
                      <span className="status-active">Activo</span>
                    ) : (
                      <span className="status-inactive">Inactivo</span>
                    )}
                  </td>
                  <td>{formatDate(usuario.fechaCreacion)}</td>
                  <td>
                    <div className="acciones">
                      <Button variant="primary" size="small">
                        Editar
                      </Button>
                      {usuario.rol !== 'super_administrador' && (
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleEliminar(usuario.id)}
                        >
                          Eliminar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

