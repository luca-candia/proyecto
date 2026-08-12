import { Router } from 'express';
import turnoController from '../controllers/turnoController.js';

const router = Router();

router.get('/', turnoController.getAll);

router.post('/', turnoController.create);

export default router;