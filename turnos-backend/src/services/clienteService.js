import clienteRepository from '../repositories/clienteRepository.js';

const obtenerTodos = async () => {
  return await clienteRepository.findAll();
};

const crearCliente = async (datos) => {
  if (!datos.nombre_completo || typeof datos.nombre_completo !== 'string') {
    throw new Error('El nombre completo es obligatorio y debe ser texto.');
  }
  
  return await clienteRepository.create(datos);
};

export default { obtenerTodos, crearCliente };