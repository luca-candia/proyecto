import turnoService from '../services/turnoService.js';

const getAll = async (req, res, next) => {
  try {
    const turnos = await turnoService.obtenerTodos();
    res.json(turnos);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const nuevoTurno = await turnoService.crearTurno(req.body);
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const completar = async (req, res, next) => {
  try {
    await turnoService.completarTurno(req.params.id, req.body.notas);
    res.json({ mensaje: 'Turno completado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelar = async (req, res, next) => {
  try {
    await turnoService.cancelarTurno(req.params.id);
    res.json({ mensaje: 'Turno cancelado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getAll, create, completar, cancelar };