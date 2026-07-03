import { Router } from 'express';
import authController from '../../../controllers/authController.js';
import { validarRegistro } from '../../../middlewares/validacionDeDatos.js';

const router = Router();
router.post('/', validarRegistro, authController.register);
export default router;