import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';
import type { UserRole } from '@app-types/index';
import './Sidebar.css';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  // Dashboard - se mostrará según el rol
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: '📊',
    roles: ['donante', 'fundacion', 'voluntariado', 'super_administrador'],
  },
  // Donante
  {
    label: 'Mis Donaciones',
    path: ROUTES.DONACIONES,
    icon: '🎁',
    roles: ['donante', 'super_administrador'],
  },
  {
    label: 'Crear Donación',
    path: ROUTES.CREAR_DONACION,
    icon: '➕',
    roles: ['donante', 'super_administrador'],
  },
  // Fundación
  {
    label: 'Donaciones Disponibles',
    path: ROUTES.DONACIONES,
    icon: '📦',
    roles: ['fundacion'],
  },
  {
    label: 'Mis Solicitudes',
    path: ROUTES.SOLICITUDES,
    icon: '📋',
    roles: ['fundacion'],
  },
  {
    label: 'Crear Solicitud',
    path: ROUTES.CREAR_SOLICITUD,
    icon: '➕',
    roles: ['fundacion'],
  },
  {
    label: 'Inventario',
    path: ROUTES.INVENTARIO,
    icon: '📚',
    roles: ['fundacion'],
  },
  // Voluntariado
  {
    label: 'Entregas Asignadas',
    path: `${ROUTES.DONACIONES}?estado=en_camino`,
    icon: '🚚',
    roles: ['voluntariado'],
  },
  {
    label: 'Historial de Entregas',
    path: `${ROUTES.DONACIONES}?estado=entregada`,
    icon: '📜',
    roles: ['voluntariado'],
  },
  // Super Administrador
  {
    label: 'Gestión de Usuarios',
    path: `${ROUTES.ADMIN}/usuarios`,
    icon: '👥',
    roles: ['super_administrador'],
  },
  {
    label: 'Validar Fundaciones',
    path: `${ROUTES.ADMIN}/fundaciones`,
    icon: '✅',
    roles: ['super_administrador'],
  },
  {
    label: 'Gestión de Donaciones',
    path: ROUTES.DONACIONES,
    icon: '🎁',
    roles: ['super_administrador'],
  },
  {
    label: 'Gestión de Voluntarios',
    path: `${ROUTES.ADMIN}/voluntarios`,
    icon: '🤝',
    roles: ['super_administrador'],
  },
  // Común
  {
    label: 'Mensajes',
    path: ROUTES.MENSAJES,
    icon: '💬',
    roles: ['donante', 'fundacion', 'voluntariado', 'super_administrador'],
  },
  {
    label: 'Reportes',
    path: ROUTES.REPORTES,
    icon: '📈',
    roles: ['donante', 'fundacion', 'super_administrador'],
  },
  {
    label: 'Mi Perfil',
    path: ROUTES.PERFIL,
    icon: '👤',
    roles: ['donante', 'fundacion', 'voluntariado', 'super_administrador'],
  },
];

export const Sidebar = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return null;
  }

  // Obtener la ruta del dashboard según el rol
  const getDashboardPath = (): string => {
    switch (user.rol) {
      case 'donante':
        return ROUTES.DASHBOARD_DONANTE;
      case 'fundacion':
        return ROUTES.DASHBOARD_FUNDACION;
      case 'voluntariado':
        return ROUTES.DASHBOARD_VOLUNTARIADO;
      case 'super_administrador':
        return ROUTES.DASHBOARD_ADMIN;
      default:
        return ROUTES.DASHBOARD;
    }
  };

  // Filtrar items según el rol del usuario y reemplazar la ruta del dashboard
  const filteredItems = menuItems
    .filter((item) => item.roles.includes(user.rol))
    .map((item) => {
      if (item.path === ROUTES.DASHBOARD) {
        return { ...item, path: getDashboardPath() };
      }
      return item;
    });

  const isActive = (path: string): boolean => {
    if (path === getDashboardPath()) {
      return location.pathname === path || location.pathname.startsWith('/dashboard');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Menú</h3>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {filteredItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <li key={index} className={`sidebar-item ${active ? 'active' : ''}`}>
                <Link to={item.path} className="sidebar-link">
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

