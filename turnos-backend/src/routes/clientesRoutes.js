import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';

const router = Router();

router.get('/', clienteController.getAll);

router.post('/', clienteController.create);

export default router;