import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    // Redirigir según el rol del usuario
    switch (user.rol) {
      case 'donante':
        navigate(ROUTES.DASHBOARD_DONANTE, { replace: true });
        break;
      case 'fundacion':
        navigate(ROUTES.DASHBOARD_FUNDACION, { replace: true });
        break;
      case 'voluntariado':
        navigate(ROUTES.DASHBOARD_VOLUNTARIADO, { replace: true });
        break;
      case 'super_administrador':
        navigate(ROUTES.DASHBOARD_ADMIN, { replace: true });
        break;
      default:
        navigate(ROUTES.HOME, { replace: true });
    }
  }, [user, navigate]);

  return null; // Este componente solo redirige
};

