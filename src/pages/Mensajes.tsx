import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { mensajesService } from '@services/mensajesService';
import { Mensaje } from '@types/index';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { formatDate } from '@utils/formatDate';
import './Mensajes.css';

export const Mensajes = () => {
  const { user } = useAuth();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState<'recibidos' | 'enviados'>('recibidos');
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<Mensaje | null>(null);

  useEffect(() => {
    loadMensajes();
  }, [tipo]);

  // Datos mock para visualización
  const getMockMensajes = (): Mensaje[] => {
    const fechaBase = new Date();
    if (tipo === 'recibidos') {
      return [
        {
          id: '1',
          remitenteId: { id: 'u1', nombre: 'María González', email: 'maria@example.com', rol: 'donante' } as any,
          destinatarioId: user?.id || 'u2',
          asunto: 'Consulta sobre donación de ropa',
          contenido: 'Hola, tengo varias prendas de ropa en buen estado que me gustaría donar. ¿Cuál sería el mejor momento para coordinar la entrega? También tengo algunas preguntas sobre el proceso.',
          leido: false,
          fechaCreacion: new Date(fechaBase.getTime() - 2 * 60 * 60 * 1000),
        },
        {
          id: '2',
          remitenteId: { id: 'u3', nombre: 'Fundación Esperanza', email: 'esperanza@example.com', rol: 'fundacion' } as any,
          destinatarioId: user?.id || 'u2',
          asunto: 'Solicitud de colaboración',
          contenido: 'Nos gustaría coordinar una actividad conjunta para recoger donaciones en tu zona. ¿Te interesaría participar? Sería el próximo fin de semana.',
          leido: false,
          fechaCreacion: new Date(fechaBase.getTime() - 5 * 60 * 60 * 1000),
        },
        {
          id: '3',
          remitenteId: { id: 'u4', nombre: 'Carlos Ramírez', email: 'carlos@example.com', rol: 'voluntariado' } as any,
          destinatarioId: user?.id || 'u2',
          asunto: 'Confirmación de entrega',
          contenido: 'Confirmo que la entrega se realizará mañana a las 2:00 PM en la dirección acordada. Llevaré la donación de alimentos que coordinamos.',
          leido: true,
          fechaCreacion: new Date(fechaBase.getTime() - 24 * 60 * 60 * 1000),
        },
        {
          id: '4',
          remitenteId: { id: 'u5', nombre: 'Ana Martínez', email: 'ana@example.com', rol: 'donante' } as any,
          destinatarioId: user?.id || 'u2',
          asunto: 'Gracias por la donación',
          contenido: 'Quería agradecerte por la donación que recibimos. Fue de gran ayuda para las familias que atendemos. ¡Esperamos seguir colaborando!',
          leido: true,
          fechaCreacion: new Date(fechaBase.getTime() - 3 * 24 * 60 * 60 * 1000),
        },
      ];
    } else {
      return [
        {
          id: '5',
          remitenteId: user?.id || 'u2',
          destinatarioId: { id: 'u1', nombre: 'María González', email: 'maria@example.com', rol: 'donante' } as any,
          asunto: 'Re: Consulta sobre donación de ropa',
          contenido: 'Hola María, gracias por tu interés en donar. Estamos disponibles para recibir las prendas cualquier día de la semana de 9 AM a 5 PM. Te puedo dar más detalles si necesitas.',
          leido: true,
          fechaCreacion: new Date(fechaBase.getTime() - 1 * 60 * 60 * 1000),
        },
        {
          id: '6',
          remitenteId: user?.id || 'u2',
          destinatarioId: { id: 'u6', nombre: 'Fundación Solidaridad', email: 'solidaridad@example.com', rol: 'fundacion' } as any,
          asunto: 'Propuesta de colaboración',
          contenido: 'Me gustaría proponer una actividad conjunta para recoger donaciones en nuestra zona. ¿Estarían interesados en participar?',
          leido: true,
          fechaCreacion: new Date(fechaBase.getTime() - 12 * 60 * 60 * 1000),
        },
      ];
    }
  };

  const loadMensajes = async () => {
    // Mostrar datos mock inmediatamente
    setMensajes(getMockMensajes());
    setLoading(false);
    
    // Intentar cargar datos reales en background
    try {
      const data = await mensajesService.obtenerMensajes(tipo);
      if (data.length > 0) {
        setMensajes(data);
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
      // Mantener datos mock si hay error
    }
  };

  const handleMensajeClick = async (mensaje: Mensaje) => {
    setMensajeSeleccionado(mensaje);
    if (!mensaje.leido && tipo === 'recibidos') {
      try {
        await mensajesService.marcarComoLeido(mensaje.id);
        loadMensajes();
      } catch (error) {
        console.error('Error al marcar como leído:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando mensajes...</div>;
  }

  return (
    <div className="mensajes">
      <div className="mensajes-header">
        <h1>Mensajes</h1>
        <div className="mensajes-tabs">
          <button
            className={tipo === 'recibidos' ? 'active' : ''}
            onClick={() => setTipo('recibidos')}
          >
            Recibidos ({mensajes.filter((m) => !m.leido).length} no leídos)
          </button>
          <button
            className={tipo === 'enviados' ? 'active' : ''}
            onClick={() => setTipo('enviados')}
          >
            Enviados
          </button>
        </div>
      </div>

      <div className="mensajes-container">
        <div className="mensajes-list">
          {mensajes.length === 0 ? (
            <Card>
              <p>No hay mensajes {tipo === 'recibidos' ? 'recibidos' : 'enviados'}.</p>
            </Card>
          ) : (
            mensajes.map((mensaje) => {
              const otroUsuario =
                tipo === 'recibidos'
                  ? (mensaje as any).remitenteId
                  : (mensaje as any).destinatarioId;

              return (
                <Card
                  key={mensaje.id}
                  className={`mensaje-item ${!mensaje.leido && tipo === 'recibidos' ? 'unread' : ''}`}
                  onClick={() => handleMensajeClick(mensaje)}
                >
                  <div className="mensaje-header">
                    <div>
                      <h3>{mensaje.asunto}</h3>
                      <p className="mensaje-from">
                        {tipo === 'recibidos' ? 'De' : 'Para'}:{' '}
                        {otroUsuario?.nombre || 'Usuario'}
                      </p>
                    </div>
                    {!mensaje.leido && tipo === 'recibidos' && (
                      <span className="unread-dot"></span>
                    )}
                  </div>
                  <p className="mensaje-preview">
                    {mensaje.contenido.substring(0, 100)}
                    {mensaje.contenido.length > 100 ? '...' : ''}
                  </p>
                  <span className="mensaje-date">{formatDate(mensaje.fechaCreacion)}</span>
                </Card>
              );
            })
          )}
        </div>

        {mensajeSeleccionado && (
          <div className="mensaje-detail">
            <Card>
              <div className="mensaje-detail-header">
                <h2>{mensajeSeleccionado.asunto}</h2>
                <Button variant="secondary" onClick={() => setMensajeSeleccionado(null)}>
                  Cerrar
                </Button>
              </div>
              <div className="mensaje-detail-info">
                <p>
                  <strong>
                    {tipo === 'recibidos' ? 'De' : 'Para'}:
                  </strong>{' '}
                  {tipo === 'recibidos'
                    ? (mensajeSeleccionado as any).remitenteId?.nombre
                    : (mensajeSeleccionado as any).destinatarioId?.nombre}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatDate(mensajeSeleccionado.fechaCreacion)}
                </p>
              </div>
              <div className="mensaje-detail-content">
                <p>{mensajeSeleccionado.contenido}</p>
              </div>
              {tipo === 'recibidos' && (
                <div className="mensaje-detail-actions">
                  <Button variant="primary">Responder</Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

