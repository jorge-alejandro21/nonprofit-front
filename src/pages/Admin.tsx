import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AdminUsuarios } from './admin/AdminUsuarios';
import { AdminFundaciones } from './admin/AdminFundaciones';
import { AdminVoluntarios } from './admin/AdminVoluntarios';
import { AdminConfiguracion } from './admin/AdminConfiguracion';
import { ROUTES } from '@utils/constants';
import './Admin.css';

export const Admin = () => {
  const location = useLocation();

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
      </div>

      <div className="admin-container">
        <nav className="admin-nav">
          <NavLink
            to={`${ROUTES.ADMIN}/usuarios`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            👥 Gestión de Usuarios
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMIN}/fundaciones`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            ✅ Validar Fundaciones
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMIN}/voluntarios`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            🤝 Gestión de Voluntarios
          </NavLink>
          <NavLink
            to={`${ROUTES.ADMIN}/configuracion`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            ⚙️ Configuración
          </NavLink>
        </nav>

        <div className="admin-content">
          <Routes>
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="fundaciones" element={<AdminFundaciones />} />
            <Route path="voluntarios" element={<AdminVoluntarios />} />
            <Route path="configuracion" element={<AdminConfiguracion />} />
            <Route path="*" element={<AdminUsuarios />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

