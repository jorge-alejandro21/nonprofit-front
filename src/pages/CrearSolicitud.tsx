import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { solicitudesService } from '@services/solicitudesService';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { ROUTES, TIPOS_ARTICULOS, PRIORIDADES_SOLICITUD } from '@utils/constants';
import { TipoArticulo } from '@types/index';
import './CrearSolicitud.css';

export const CrearSolicitud = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tipoArticulo: 'ropa' as TipoArticulo,
    descripcion: '',
    cantidadNecesaria: 1,
    prioridad: 'media' as 'baja' | 'media' | 'alta' | 'urgente',
    fechaLimite: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Debes estar autenticado para crear una solicitud');
      setLoading(false);
      return;
    }

    if (user.rol !== 'fundacion') {
      setError('Solo las fundaciones pueden crear solicitudes');
      setLoading(false);
      return;
    }

    try {
      const solicitudData = {
        fundacionId: user.id,
        tipoArticulo: formData.tipoArticulo,
        descripcion: formData.descripcion,
        cantidadNecesaria: formData.cantidadNecesaria,
        prioridad: formData.prioridad,
        fechaLimite: formData.fechaLimite ? new Date(formData.fechaLimite) : undefined,
      };

      await solicitudesService.crearSolicitud(solicitudData);
      navigate(ROUTES.SOLICITUDES);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cantidadNecesaria' ? parseInt(value) || 1 : value,
    });
  };

  return (
    <div className="crear-solicitud">
      <h1>Crear Nueva Solicitud</h1>
      <Card className="crear-solicitud-card">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">Tipo de Artículo</label>
            <select
              name="tipoArticulo"
              value={formData.tipoArticulo}
              onChange={handleChange}
              className="input"
              required
            >
              {TIPOS_ARTICULOS.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="input"
              rows={4}
              placeholder="Describe qué necesitas y para qué lo usarás..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Cantidad Necesaria</label>
              <Input
                type="number"
                name="cantidadNecesaria"
                value={formData.cantidadNecesaria}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Prioridad</label>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="input"
                required
              >
                {PRIORIDADES_SOLICITUD.map((prioridad) => (
                  <option key={prioridad.value} value={prioridad.value}>
                    {prioridad.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Fecha Límite (Opcional)</label>
            <Input
              type="date"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Solicitud'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(ROUTES.SOLICITUDES)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

