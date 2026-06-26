import { Router } from 'express';
import authController from '../../../controllers/authController.js';
import { validarLogIn } from '../../../middlewares/validacionDeDatos.js';

const router = Router();
router.post('/', validarLogIn, authController.login);
export default router;