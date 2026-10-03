// TarjetaConfiguracion.jsx - Tarjeta individual de configuración
/**
 * Muestra la información de una configuración individual.
 */
function TarjetaConfiguracion({ configuracion, onEliminar }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{configuracion.nombre}</h5>
        <p className="card-text">
          <strong>Correo:</strong> {configuracion.correo}
          <br />
          <strong>Límite:</strong> {configuracion.limite}%
        </p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onEliminar(configuracion.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaConfiguracion;