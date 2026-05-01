import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { donacionesService } from '@services/donacionesService';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { ROUTES, TIPOS_ARTICULOS, ESTADOS_ARTICULO } from '@utils/constants';
import { Donacion, TipoArticulo } from '@types/index';
import './CrearDonacion.css';

export const CrearDonacion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tipoArticulo: 'ropa' as TipoArticulo,
    descripcion: '',
    cantidad: 1,
    estadoArticulo: 'usado' as 'nuevo' | 'usado' | 'reparado',
    fechaDisponible: new Date().toISOString().split('T')[0],
    fechaLimite: '',
    ubicacionRecoleccion: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Debes estar autenticado para crear una donación');
      setLoading(false);
      return;
    }

    try {
      const donacionData = {
        donanteId: user.id,
        tipoArticulo: formData.tipoArticulo,
        descripcion: formData.descripcion,
        cantidad: formData.cantidad,
        estado: 'disponible' as const,
        estadoArticulo: formData.estadoArticulo,
        fechaDisponible: new Date(formData.fechaDisponible),
        fechaLimite: formData.fechaLimite ? new Date(formData.fechaLimite) : undefined,
        ubicacionRecoleccion: formData.ubicacionRecoleccion,
      };

      await donacionesService.crearDonacion(donacionData);
      navigate(ROUTES.DONACIONES);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la donación');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cantidad' ? parseInt(value) || 1 : value,
    });
  };

  return (
    <div className="crear-donacion">
      <h1>Crear Nueva Donación</h1>
      <Card className="crear-donacion-card">
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
              required
            />
          </div>

          <div className="form-row">
            <Input
              type="number"
              name="cantidad"
              label="Cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              min={1}
              required
            />

            <div className="form-group">
              <label className="input-label">Estado del Artículo</label>
              <select
                name="estadoArticulo"
                value={formData.estadoArticulo}
                onChange={handleChange}
                className="input"
                required
              >
                {ESTADOS_ARTICULO.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <Input
              type="date"
              name="fechaDisponible"
              label="Fecha Disponible"
              value={formData.fechaDisponible}
              onChange={handleChange}
              required
            />

            <Input
              type="date"
              name="fechaLimite"
              label="Fecha Límite (Opcional)"
              value={formData.fechaLimite}
              onChange={handleChange}
            />
          </div>

          <Input
            type="text"
            name="ubicacionRecoleccion"
            label="Ubicación de Recolección"
            value={formData.ubicacionRecoleccion}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Donación'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(ROUTES.DONACIONES)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

