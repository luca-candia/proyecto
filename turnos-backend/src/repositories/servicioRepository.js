import { Servicio } from '../models/associations.js';

const findAll = async () => {
  return await Servicio.findAll();
};

const create = async (datosServicio) => {
  return await Servicio.create(datosServicio);
};

export default { findAll, create };