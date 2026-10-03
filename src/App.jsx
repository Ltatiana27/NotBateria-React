// App.jsx - Componente principal de la aplicación
import { useState, useEffect } from 'react';
import FormularioConfiguracion from './components/FormularioConfiguracion';
import ListaConfiguraciones from './components/ListaConfiguraciones';
import configuracionService from './services/configuracionService';
import './App.css';

/**
 * Componente principal de la aplicación React de NotiBatería.
 * Gestiona el estado global y la comunicación con el servicio.
 */
function App() {
  const [configuraciones, setConfiguraciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  // useEffect: cargar configuraciones al montar el componente
  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  /**
   * Carga las configuraciones desde el servicio.
   */
  const cargarConfiguraciones = async () => {
    try {
      setCargando(true);
      const datos = await configuracionService.obtenerTodas();
      setConfiguraciones(datos);
    } catch (error) {
      mostrarMensaje('Error al cargar configuraciones', 'error');
    } finally {
      setCargando(false);
    }
  };

  /**
   * Agrega una nueva configuración.
   */
  const agregarConfiguracion = async (nuevaConfig) => {
    try {
      const guardada = await configuracionService.crear(nuevaConfig);
      setConfiguraciones([...configuraciones, guardada]);
      mostrarMensaje('✅ Configuración guardada correctamente', 'exito');
    } catch (error) {
      mostrarMensaje('❌ Error al guardar la configuración', 'error');
    }
  };

  /**
   * Elimina una configuración por su ID.
   */
  const eliminarConfiguracion = async (id) => {
    try {
      await configuracionService.eliminar(id);
      setConfiguraciones(configuraciones.filter((c) => c.id !== id));
      mostrarMensaje('🗑️ Configuración eliminada', 'exito');
    } catch (error) {
      mostrarMensaje('❌ Error al eliminar', 'error');
    }
  };

  /**
   * Muestra un mensaje temporal al usuario.
   */
  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">NotiBatería - Panel de Configuración</h1>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo === 'exito' ? 'success' : 'danger'}`}>
          {mensaje.texto}
        </div>
      )}

      <FormularioConfiguracion onGuardar={agregarConfiguracion} />

      {cargando ? (
        <p className="text-center">Cargando configuraciones...</p>
      ) : (
        <ListaConfiguraciones
          configuraciones={configuraciones}
          onEliminar={eliminarConfiguracion}
        />
      )}
    </div>
  );
}

export default App;