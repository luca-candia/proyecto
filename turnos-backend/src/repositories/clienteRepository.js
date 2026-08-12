import { Cliente } from '../models/associations.js';

const findAll = async () => {
    return await Cliente.findAll();
}

const create = async (datosCliente) => {
    return await Cliente.create(datosCliente);
}

export default { findAll, create };