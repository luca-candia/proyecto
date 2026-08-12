import { Turno, Cliente, Servicio } from '../models/associations.js';

const findAll = async () => {
  return await Turno.findAll({
    include: [Cliente, Servicio]
  });
};

const create = async (datosTurno) => {
  return await Turno.create(datosTurno);
};

export default { findAll, create };