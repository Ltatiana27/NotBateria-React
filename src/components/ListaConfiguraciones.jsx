// ListaConfiguraciones.jsx - Lista de configuraciones registradas
import TarjetaConfiguracion from './TarjetaConfiguracion';

/**
 * Lista todas las configuraciones registradas.
 * @param {Array} configuraciones - Array de configuraciones
 * @param {Function} onEliminar - Callback al eliminar
 */
function ListaConfiguraciones({ configuraciones, onEliminar }) {
  if (configuraciones.length === 0) {
    return <p className="text-center">No hay configuraciones registradas.</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>Configuraciones registradas ({configuraciones.length})</h4>
      </div>
      <div className="card-body">
        <div className="row">
          {configuraciones.map((config) => (
            <div className="col-md-4 mb-3" key={config.id}>
              <TarjetaConfiguracion
                configuracion={config}
                onEliminar={onEliminar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaConfiguraciones;