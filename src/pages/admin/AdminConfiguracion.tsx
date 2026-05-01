import { useEffect, useState, FormEvent } from 'react';
import { adminService } from '@services/adminService';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import './AdminConfiguracion.css';

export const AdminConfiguracion = () => {
  const [configuracion, setConfiguracion] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadConfiguracion();
  }, []);

  const loadConfiguracion = async () => {
    try {
      setLoading(true);
      const data = await adminService.obtenerConfiguracion();
      setConfiguracion(data);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await adminService.actualizarConfiguracion(configuracion);
      setSuccess('Configuración actualizada correctamente');
    } catch (error) {
      setError('Error al actualizar la configuración');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando configuración...</div>;
  }

  return (
    <div className="admin-configuracion">
      <div className="admin-configuracion-header">
        <h2>Configuración del Sistema</h2>
      </div>

      <Card>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="config-section">
            <h3>Información del Sistema</h3>
            <div className="form-group">
              <label className="input-label">Nombre del Sistema</label>
              <input
                type="text"
                className="input"
                value={configuracion.sistema || 'Sistema de Donaciones en Especie'}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="input-label">Versión</label>
              <input
                type="text"
                className="input"
                value={configuracion.version || '1.0.0'}
                disabled
              />
            </div>
          </div>

          <div className="config-section">
            <h3>Configuraciones Generales</h3>
            <p className="config-note">
              Las configuraciones avanzadas estarán disponibles en futuras versiones.
            </p>
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

