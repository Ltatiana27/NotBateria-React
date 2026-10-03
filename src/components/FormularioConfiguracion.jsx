// FormularioConfiguracion.jsx - Formulario para registrar configuraciones
import { useState } from 'react';

/**
 * Formulario para registrar una nueva configuración de usuario.
 * @param {Function} onGuardar - Callback al guardar
 */
function FormularioConfiguracion({ onGuardar }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [limite, setLimite] = useState(80);

  /**
   * Maneja el envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del rango del límite
    if (limite < 50 || limite > 100) {
      alert('El límite debe estar entre 50 y 100');
      return;
    }

    // Crear objeto y enviar al componente padre
    onGuardar({ nombre, correo, limite });

    // Limpiar formulario
    setNombre('');
    setCorreo('');
    setLimite(80);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Registrar nueva configuración</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo:</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Límite de batería (%):</label>
            <input
              type="number"
              className="form-control"
              value={limite}
              onChange={(e) => setLimite(parseInt(e.target.value))}
              min="50"
              max="100"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Guardar configuración
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioConfiguracion;