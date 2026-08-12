import clienteService from '../services/clienteService.js';

const getAll = async (req, res, next) => {
    try {
        const clientes = await clienteService.obtenerTodos();
        res.json(clientes);
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        const nuevoCliente = await clienteService.crearCliente(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default { getAll, create };