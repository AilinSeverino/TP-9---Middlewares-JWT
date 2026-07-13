import { Router } from 'express';
import authController from '../controllers/authController.js'; // Tu controlador real
import { validarRegistro, validarLogIn } from '../middlewares/validacionDeDatos.js';

const router = Router();

router.post('/register', validarRegistro, authController.register);
router.post('/login', validarLogIn, authController.login);

export default router;