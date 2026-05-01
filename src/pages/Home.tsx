import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@utils/constants';
import { Button } from '@components/common/Button';
import './Home.css';

// Datos de ejemplo de fundaciones
const fundaciones = [
  {
    id: '1',
    nombre: 'La Casita de Emmanuel',
    descripcion: 'Brinda hogar y cuidado a niños en situación vulnerable.',
    imagen: null,
  },
  {
    id: '2',
    nombre: 'Banco de Alimentos',
    descripcion: 'Distribuye alimentos a comunidades necesitadas.',
    imagen: null,
  },
  {
    id: '3',
    nombre: 'Samaritanos de la Calle',
    descripcion: 'Apoya personas en situación de calle con alimentación y refugio.',
    imagen: null,
  },
];

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <h1>Conectando Comunidades</h1>
        <div className="hero-hearts">
          <span>💛</span>
          <span>🧡</span>
          <span>💙</span>
        </div>
        <p className="hero-subtitle">
          Apoyamos fundaciones sin ánimo de lucro conectándolas con personas que desean ayudar, donar y participar en proyectos sociales.
        </p>
      </section>

      <section className="fundaciones-section">
        <h2>Fundaciones Registradas</h2>
        <div className="fundaciones-grid">
          {fundaciones.map((fundacion) => (
            <div key={fundacion.id} className="fundacion-card">
              <div className="fundacion-header">
                <div className="fundacion-image-placeholder">
                  <span>📷</span>
                </div>
                <h3>{fundacion.nombre}</h3>
              </div>
              <p className="fundacion-descripcion">{fundacion.descripcion}</p>
              <Link to={`/fundacion/${fundacion.id}`}>
                <Button variant="primary">Ver más</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

