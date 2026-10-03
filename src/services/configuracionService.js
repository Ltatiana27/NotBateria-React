// configuracionService.js - Servicio para gestionar configuraciones
const API_URL = 'http://localhost:3000/api/configuraciones';

/**
 * Servicio que gestiona las operaciones CRUD de configuraciones.
 * Usa localStorage como respaldo si la API no está disponible.
 */
const configuracionService = {
  /**
   * Obtiene todas las configuraciones.
   */
  obtenerTodas: async () => {
    try {
      // Intenta consumir la API
      const response = await fetch(API_URL);
      if (response.ok) return await response.json();
    } catch (error) {
      console.warn('API no disponible, usando localStorage');
    }

    // Respaldo: localStorage
    const datos = localStorage.getItem('configuraciones');
    return datos ? JSON.parse(datos) : [];
  },

  /**
   * Crea una nueva configuración.
   */
  crear: async (config) => {
    const nuevaConfig = { ...config, id: Date.now() };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaConfig),
      });
      if (response.ok) return await response.json();
    } catch (error) {
      console.warn('API no disponible, guardando en localStorage');
    }

    // Respaldo: localStorage
    const datos = JSON.parse(localStorage.getItem('configuraciones') || '[]');
    datos.push(nuevaConfig);
    localStorage.setItem('configuraciones', JSON.stringify(datos));
    return nuevaConfig;
  },

  /**
   * Elimina una configuración por ID.
   */
  eliminar: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.warn('API no disponible, eliminando de localStorage');
    }

    // Respaldo: localStorage
    const datos = JSON.parse(localStorage.getItem('configuraciones') || '[]');
    const filtrados = datos.filter((c) => c.id !== id);
    localStorage.setItem('configuraciones', JSON.stringify(filtrados));
  },
};

export default configuracionService;