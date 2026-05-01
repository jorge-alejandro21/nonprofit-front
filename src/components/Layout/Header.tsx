import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { NotificationBell } from '@components/common/NotificationBell';
import { ROUTES } from '@utils/constants';
import './Header.css';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={ROUTES.HOME} className="header-logo">
          <div className="logo-icon">
            <img src="/img/logo.jpg" alt="Logo" />
          </div>
          <h1>NON PROFIT</h1>
        </Link>

        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <span className="user-name">Hola, {user?.nombre}</span>
              <Link to={ROUTES.PERFIL}>Perfil</Link>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.CREAR_DONACION}>Hacer Donación</Link>
              <Link to={ROUTES.REGISTER}>Inscribir Fundación</Link>
              <Link to={ROUTES.LOGIN}>Iniciar Sesión</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

