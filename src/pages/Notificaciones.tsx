import { useEffect, useState } from 'react';
import { useNotifications } from '@contexts/NotificationContext';
import { Notificacion } from '@types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import './Notificaciones.css';

export const Notificaciones = () => {
  const {
    notificaciones,
    isLoading,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    eliminarTodasLeidas,
  } = useNotifications();
  const [filtro, setFiltro] = useState<'todas' | 'leidas' | 'no-leidas'>('todas');

  useEffect(() => {
    cargarNotificaciones();
  }, [cargarNotificaciones]);

  const notificacionesFiltradas = notificaciones.filter((notif) => {
    if (filtro === 'leidas') return notif.leida;
    if (filtro === 'no-leidas') return !notif.leida;
    return true;
  });

  const formatFecha = (fecha: Date | string) => {
    const date = new Date(fecha);
    return date.toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case 'donacion_creada':
      case 'donacion_asignada':
      case 'donacion_entregada':
        return '📦';
      case 'solicitud_creada':
      case 'solicitud_completada':
        return '📋';
      case 'mensaje_nuevo':
        return '💬';
      case 'fundacion_validada':
        return '✅';
      case 'voluntario_asignado':
        return '🚚';
      default:
        return '🔔';
    }
  };

  if (isLoading) {
    return (
      <div className="notificaciones-page">
        <div className="loading">Cargando notificaciones...</div>
      </div>
    );
  }

  return (
    <div className="notificaciones-page">
      <div className="notificaciones-header">
        <h1>Notificaciones</h1>
        <div className="notificaciones-actions">
          <Button
            onClick={marcarTodasComoLeidas}
            disabled={notificaciones.filter((n) => !n.leida).length === 0}
          >
            Marcar todas como leídas
          </Button>
          <Button
            variant="secondary"
            onClick={eliminarTodasLeidas}
            disabled={notificaciones.filter((n) => n.leida).length === 0}
          >
            Eliminar leídas
          </Button>
        </div>
      </div>

      <div className="notificaciones-filtros">
        <button
          className={filtro === 'todas' ? 'active' : ''}
          onClick={() => setFiltro('todas')}
        >
          Todas ({notificaciones.length})
        </button>
        <button
          className={filtro === 'no-leidas' ? 'active' : ''}
          onClick={() => setFiltro('no-leidas')}
        >
          No leídas ({notificaciones.filter((n) => !n.leida).length})
        </button>
        <button
          className={filtro === 'leidas' ? 'active' : ''}
          onClick={() => setFiltro('leidas')}
        >
          Leídas ({notificaciones.filter((n) => n.leida).length})
        </button>
      </div>

      <div className="notificaciones-list">
        {notificacionesFiltradas.length === 0 ? (
          <Card>
            <div className="notificaciones-empty">
              <p>No hay notificaciones {filtro !== 'todas' ? `(${filtro})` : ''}</p>
            </div>
          </Card>
        ) : (
          notificacionesFiltradas.map((notif) => (
            <Card
              key={notif.id}
              className={`notificacion-item ${!notif.leida ? 'unread' : ''}`}
            >
              <div className="notificacion-icon">{getTipoIcono(notif.tipo)}</div>
              <div className="notificacion-content">
                <div className="notificacion-header-item">
                  <h3>{notif.titulo}</h3>
                  {!notif.leida && (
                    <button
                      className="btn-marcar-leida"
                      onClick={() => marcarComoLeida(notif.id)}
                    >
                      Marcar como leída
                    </button>
                  )}
                </div>
                <p>{notif.contenido}</p>
                <span className="notificacion-fecha">{formatFecha(notif.fechaCreacion)}</span>
              </div>
              <button
                className="notificacion-delete-btn"
                onClick={() => eliminarNotificacion(notif.id)}
                aria-label="Eliminar notificación"
              >
                ×
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

