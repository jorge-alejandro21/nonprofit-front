import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Notificacion } from '@types/index';
import { notificacionesService } from '@services/notificacionesService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notificaciones: Notificacion[];
  notificacionesNoLeidas: number;
  isLoading: boolean;
  cargarNotificaciones: () => Promise<void>;
  cargarContador: () => Promise<void>;
  marcarComoLeida: (id: string) => Promise<void>;
  marcarTodasComoLeidas: () => Promise<void>;
  eliminarNotificacion: (id: string) => Promise<void>;
  eliminarTodasLeidas: () => Promise<void>;
  refrescar: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser usado dentro de NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { isAuthenticated } = useAuth();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cargarNotificaciones = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      const response = await notificacionesService.obtenerNotificaciones({
        limit: 20,
        page: 1,
      });
      setNotificaciones(response.notificaciones);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const cargarContador = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await notificacionesService.obtenerContadorNoLeidas();
      setNotificacionesNoLeidas(response.count);
    } catch (error) {
      console.error('Error al cargar contador:', error);
    }
  }, [isAuthenticated]);

  const marcarComoLeida = useCallback(async (id: string) => {
    try {
      await notificacionesService.marcarComoLeida(id);
      setNotificaciones((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, leida: true, fechaLectura: new Date() } : notif
        )
      );
      setNotificacionesNoLeidas((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  }, []);

  const marcarTodasComoLeidas = useCallback(async () => {
    try {
      await notificacionesService.marcarTodasComoLeidas();
      setNotificaciones((prev) =>
        prev.map((notif) => ({ ...notif, leida: true, fechaLectura: new Date() }))
      );
      setNotificacionesNoLeidas(0);
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error);
    }
  }, []);

  const eliminarNotificacion = useCallback(async (id: string) => {
    try {
      await notificacionesService.eliminarNotificacion(id);
      const notif = notificaciones.find((n) => n.id === id);
      if (notif && !notif.leida) {
        setNotificacionesNoLeidas((prev) => Math.max(0, prev - 1));
      }
      setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
    }
  }, [notificaciones]);

  const eliminarTodasLeidas = useCallback(async () => {
    try {
      await notificacionesService.eliminarTodasLeidas();
      setNotificaciones((prev) => prev.filter((n) => !n.leida));
    } catch (error) {
      console.error('Error al eliminar todas las leídas:', error);
    }
  }, []);

  const refrescar = useCallback(async () => {
    await Promise.all([cargarNotificaciones(), cargarContador()]);
  }, [cargarNotificaciones, cargarContador]);

  // Cargar notificaciones al montar y cuando cambie la autenticación
  useEffect(() => {
    if (isAuthenticated) {
      cargarNotificaciones();
      cargarContador();
    } else {
      setNotificaciones([]);
      setNotificacionesNoLeidas(0);
    }
  }, [isAuthenticated, cargarNotificaciones, cargarContador]);

  // Refrescar contador cada 30 segundos
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      cargarContador();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [isAuthenticated, cargarContador]);

  const value: NotificationContextType = {
    notificaciones,
    notificacionesNoLeidas,
    isLoading,
    cargarNotificaciones,
    cargarContador,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    eliminarTodasLeidas,
    refrescar,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

