import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import type { RegistroForm } from '@app-types/index';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegistroForm>({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    direccion: '',
    rol: 'donante',
    tipoDonante: 'persona',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2>Registrarse</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="input-label">Tipo de Usuario</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="donante">Donante</option>
              <option value="fundacion">Fundación</option>
              <option value="voluntariado">Voluntariado</option>
            </select>
          </div>

          {formData.rol === 'donante' && (
            <div className="form-row">
              <select
                name="tipoDonante"
                value={formData.tipoDonante}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="persona">Persona Natural</option>
                <option value="empresa">Empresa</option>
              </select>
            </div>
          )}

          <Input
            type="text"
            name="nombre"
            label={formData.rol === 'fundacion' ? 'Razón Social' : 'Nombre Completo'}
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            label="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <Input
            type="tel"
            name="telefono"
            label="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="direccion"
            label="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />

          {formData.rol === 'fundacion' && (
            <Input
              type="text"
              name="nit"
              label="NIT"
              value={formData.nit || ''}
              onChange={handleChange}
              required
            />
          )}

          {formData.rol === 'donante' && formData.tipoDonante === 'empresa' && (
            <>
              <Input
                type="text"
                name="nit"
                label="NIT"
                value={formData.nit || ''}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="razonSocial"
                label="Razón Social"
                value={formData.razonSocial || ''}
                onChange={handleChange}
                required
              />
            </>
          )}

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to={ROUTES.LOGIN}>Inicia sesión aquí</Link>
        </p>
      </Card>
    </div>
  );
};

