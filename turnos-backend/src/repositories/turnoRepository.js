import { Turno, Cliente, Servicio } from '../models/associations.js';

const findAll = async () => {
  return await Turno.findAll({
    include: [Cliente, Servicio]
  });
};

const create = async (datosTurno) => {
  return await Turno.create(datosTurno);
};

const findById = async (id) => {
  return await Turno.findByPk(id, { include: [Cliente, Servicio] });
};

const update = async (id, datos) => {
  return await Turno.update(datos, { where: { id } });
};

export default { findAll, create, findById, update };