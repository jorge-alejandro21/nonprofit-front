import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@contexts/NotificationContext';
import { ROUTES } from '@utils/constants';
import './NotificationBell.css';

export const NotificationBell = () => {
  const {
    notificacionesNoLeidas,
    notificaciones,
    marcarComoLeida,
    eliminarNotificacion,
    refrescar,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notificacion: any) => {
    if (!notificacion.leida) {
      await marcarComoLeida(notificacion.id);
    }

    // Navegar según el tipo de notificación
    if (notificacion.metadata?.donacionId) {
      navigate(`${ROUTES.DONACIONES}/${notificacion.metadata.donacionId}`);
    } else if (notificacion.metadata?.solicitudId) {
      navigate(`${ROUTES.SOLICITUDES}/${notificacion.metadata.solicitudId}`);
    } else if (notificacion.metadata?.mensajeId) {
      navigate(`${ROUTES.MENSAJES}`);
    }

    setIsOpen(false);
  };

  const handleVerTodas = () => {
    navigate(ROUTES.NOTIFICACIONES);
    setIsOpen(false);
  };

  const formatFecha = (fecha: Date | string) => {
    const date = new Date(fecha);
    const ahora = new Date();
    const diffMs = ahora.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-CO');
  };

  const notificacionesRecientes = notificaciones.slice(0, 5);

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button
        className="notification-bell-button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            refrescar();
          }
        }}
        aria-label="Notificaciones"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {notificacionesNoLeidas > 0 && (
          <span className="notification-badge">{notificacionesNoLeidas}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificaciones</h3>
            {notificacionesNoLeidas > 0 && (
              <span className="notification-count">{notificacionesNoLeidas} nuevas</span>
            )}
          </div>

          <div className="notification-list">
            {notificacionesRecientes.length === 0 ? (
              <div className="notification-empty">
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              notificacionesRecientes.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${!notif.leida ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="notification-content">
                    <h4>{notif.titulo}</h4>
                    <p>{notif.contenido}</p>
                    <span className="notification-time">{formatFecha(notif.fechaCreacion)}</span>
                  </div>
                  {!notif.leida && <div className="notification-dot"></div>}
                  <button
                    className="notification-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarNotificacion(notif.id);
                    }}
                    aria-label="Eliminar notificación"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {notificacionesRecientes.length > 0 && (
            <div className="notification-footer">
              <button onClick={handleVerTodas}>Ver todas las notificaciones</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

