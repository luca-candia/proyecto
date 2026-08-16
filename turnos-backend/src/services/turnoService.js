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

const completarTurno = async (id, notasVisita) => {
  const turno = await turnoRepository.findById(id);
  
  if (!turno) throw new Error('El turno no existe.');
  if (turno.estado !== 'pendiente') throw new Error('Este turno ya fue completado o cancelado.');

  const precioFinal = turno.Servicio.precio_actual;

  await turnoRepository.update(id, {
    estado: 'completado',
    precio_cobrado: precioFinal,
    notas_visita: notasVisita
  });
  
  return true;
};

const cancelarTurno = async (id) => {
  const turno = await turnoRepository.findById(id);
  
  if (!turno) throw new Error('El turno no existe.');
  if (turno.estado !== 'pendiente') throw new Error('Solo se pueden cancelar turnos que estén pendientes.');

  await turnoRepository.update(id, {
    estado: 'cancelado'
  });

  return true;
};

export default { obtenerTodos, crearTurno, completarTurno, cancelarTurno };