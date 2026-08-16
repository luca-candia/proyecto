import { Router } from 'express';
import turnoController from '../controllers/turnoController.js';

const router = Router();

router.get('/', turnoController.getAll);

router.post('/', turnoController.create);

router.patch('/:id/completar', turnoController.completar);

router.patch('/:id/cancelar', turnoController.cancelar);

export default router;