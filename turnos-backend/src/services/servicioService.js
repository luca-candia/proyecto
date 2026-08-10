import servicioRepository from '../repositories/servicioRepository.js';

const obtenerTodos = async () => {
  return await servicioRepository.findAll();
};

const crearServicio = async (datos) => {
  if (datos.precio_actual < 0) {
    throw new Error('El precio del servicio no puede ser negativo');
  }
  
  return await servicioRepository.create(datos);
};

export default { obtenerTodos, crearServicio };