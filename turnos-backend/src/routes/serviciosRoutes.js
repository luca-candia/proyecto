import { Router } from 'express';
import servicioController from '../controllers/servicioController.js';

const router = Router();

router.get('/', servicioController.getAll);

router.post('/', servicioController.create);

export default router;