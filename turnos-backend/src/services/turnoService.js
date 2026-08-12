import turnoRepository from '../repositories/turnoRepository.js';
import { Cliente, Servicio } from '../models/associations.js'; 

const obtenerTodos = async () => {
  return await turnoRepository.findAll();
};

const crearTurno = async (datos) => {
    if (!datos.cliente_id || !datos.servicio_id || !datos.fecha_hora) {
    throw new Error('Faltan datos obligatorios (cliente_id, servicio_id, fecha_hora).');
  }

  const fechaTurno = new Date(datos.fecha_hora);
  const hoy = new Date();
  if (fechaTurno < hoy) {
    throw new Error('No podés agendar un turno en el pasado.');
  }

  const clienteExiste = await Cliente.findByPk(datos.cliente_id);
  if (!clienteExiste) {
    throw new Error('El cliente ingresado no existe en la base de datos.');
  }

  const servicioExiste = await Servicio.findByPk(datos.servicio_id);
  if (!servicioExiste) {
    throw new Error('El servicio ingresado no existe en la base de datos.');
  }

  return await turnoRepository.create(datos);
};

export default { obtenerTodos, crearTurno };