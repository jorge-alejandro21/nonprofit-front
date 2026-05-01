import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

