import servicioService from '../services/servicioService.js';

const getAll = async (req, res, next) => {
  try {
    const servicios = await servicioService.obtenerTodos();
    res.json(servicios);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const nuevoServicio = await servicioService.crearServicio(req.body);
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getAll, create };