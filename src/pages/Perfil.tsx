import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { formatDate } from '@utils/formatDate';
import './Perfil.css';

export const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ...(user?.rol === 'voluntariado' && {
      habilidades: [] as string[],
      disponibilidad: '',
      experiencia: '',
    }),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        email: user.email || '',
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        ...(user.rol === 'voluntariado' && {
          habilidades: (user as any).habilidades || [],
          disponibilidad: (user as any).disponibilidad || '',
          experiencia: (user as any).experiencia || '',
        }),
      });
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (user) {
        await updateUser(formData);
        setSuccess('Perfil actualizado correctamente');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!user) {
    return <div className="loading">Cargando perfil...</div>;
  }

  return (
    <div className="perfil">
      <h1>Mi Perfil</h1>

      <div className="perfil-container">
        <Card className="perfil-info-card">
          <h2>Información Personal</h2>
          <div className="perfil-info">
            <p>
              <strong>Rol:</strong> {user.rol}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Fecha de Registro:</strong> {formatDate(user.fechaCreacion)}
            </p>
            {user.rol === 'fundacion' && (
              <p>
                <strong>Estado:</strong>{' '}
                {(user as any).validada ? (
                  <span className="status-validated">✓ Validada</span>
                ) : (
                  <span className="status-pending">⏳ Pendiente de validación</span>
                )}
              </p>
            )}
          </div>
        </Card>

        <Card className="perfil-edit-card">
          <h2>Editar Perfil</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="input-label">Nombre</label>
              <Input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Teléfono</label>
              <Input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Dirección</label>
              <Input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            {user.rol === 'voluntariado' && (
              <>
                <div className="form-group">
                  <label className="input-label">Disponibilidad</label>
                  <Input
                    type="text"
                    name="disponibilidad"
                    value={formData.disponibilidad}
                    onChange={handleChange}
                    placeholder="Ej: Lunes a Viernes, 9am - 5pm"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Experiencia</label>
                  <textarea
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleChange}
                    className="input"
                    rows={4}
                    placeholder="Describe tu experiencia en voluntariado..."
                  />
                </div>
              </>
            )}

            <div className="form-actions">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

