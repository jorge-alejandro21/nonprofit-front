import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import { NotificationProvider } from '@contexts/NotificationContext';
import { Layout } from '@components/Layout/Layout';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { Dashboard } from '@pages/Dashboard';
import { DashboardDonante } from '@pages/dashboards/DashboardDonante';
import { DashboardFundacion } from '@pages/dashboards/DashboardFundacion';
import { DashboardVoluntariado } from '@pages/dashboards/DashboardVoluntariado';
import { DashboardAdmin } from '@pages/dashboards/DashboardAdmin';
import { Donaciones } from '@pages/Donaciones';
import { CrearDonacion } from '@pages/CrearDonacion';
import { Solicitudes } from '@pages/Solicitudes';
import { CrearSolicitud } from '@pages/CrearSolicitud';
import { Inventario } from '@pages/Inventario';
import { Mensajes } from '@pages/Mensajes';
import { Reportes } from '@pages/Reportes';
import { Perfil } from '@pages/Perfil';
import { Admin } from '@pages/Admin';
import { Notificaciones } from '@pages/Notificaciones';
import { ROUTES } from '@utils/constants';
import { PrivateRoute } from '@components/common/PrivateRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_DONANTE}
              element={
                <PrivateRoute>
                  <DashboardDonante />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_FUNDACION}
              element={
                <PrivateRoute>
                  <DashboardFundacion />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_VOLUNTARIADO}
              element={
                <PrivateRoute>
                  <DashboardVoluntariado />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_ADMIN}
              element={
                <PrivateRoute>
                  <DashboardAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DONACIONES}
              element={
                <PrivateRoute>
                  <Donaciones />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.CREAR_DONACION}
              element={
                <PrivateRoute>
                  <CrearDonacion />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.SOLICITUDES}
              element={
                <PrivateRoute>
                  <Solicitudes />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.CREAR_SOLICITUD}
              element={
                <PrivateRoute>
                  <CrearSolicitud />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.INVENTARIO}
              element={
                <PrivateRoute>
                  <Inventario />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.MENSAJES}
              element={
                <PrivateRoute>
                  <Mensajes />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.REPORTES}
              element={
                <PrivateRoute>
                  <Reportes />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.PERFIL}
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTES.ADMIN}/*`}
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.NOTIFICACIONES}
              element={
                <PrivateRoute>
                  <Notificaciones />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Layout>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

