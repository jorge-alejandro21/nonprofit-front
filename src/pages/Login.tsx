import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFillCredentials = (email: string, password: string) => {
    setFormData({
      email,
      password,
    });
  };

  // Credenciales de ejemplo para cada rol
  const credencialesEjemplo = [
    {
      rol: 'Donante',
      email: 'donante@example.com',
      password: 'donante123',
      color: '#3498db',
    },
    {
      rol: 'Fundación',
      email: 'fundacion@example.com',
      password: 'fundacion123',
      color: '#27ae60',
    },
    {
      rol: 'Voluntariado',
      email: 'voluntario@example.com',
      password: 'voluntario123',
      color: '#f39c12',
    },
    {
      rol: 'Super Administrador',
      email: 'admin@example.com',
      password: 'admin123',
      color: '#e74c3c',
    },
  ];

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <Link to={ROUTES.REGISTER}>Regístrate aquí</Link>
        </p>

        <div className="credenciales-section">
          <h3 className="credenciales-title">Credenciales de Prueba</h3>
          <p className="credenciales-subtitle">Haz clic en cualquier credencial para rellenar el formulario</p>
          <div className="credenciales-grid">
            {credencialesEjemplo.map((credencial, index) => (
              <div
                key={index}
                className="credencial-card"
                onClick={() => handleFillCredentials(credencial.email, credencial.password)}
                style={{ borderLeftColor: credencial.color }}
              >
                <div className="credencial-rol" style={{ color: credencial.color }}>
                  {credencial.rol}
                </div>
                <div className="credencial-info">
                  <div className="credencial-field">
                    <strong>Email:</strong> {credencial.email}
                  </div>
                  <div className="credencial-field">
                    <strong>Password:</strong> {credencial.password}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

