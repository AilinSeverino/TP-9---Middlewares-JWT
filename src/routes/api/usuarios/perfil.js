import { Router } from 'express';
import userController from '../../../controllers/userController.js';
import verificarToken from '../../../middlewares/authMiddleware.js';
import { validarPerfil } from '../../../middlewares/validacionDeDatos.js';

const router = Router();
router.get('/', verificarToken, userController.getPerfil);
router.put('/', verificarToken, validarPerfil, userController.updatePerfil);
export default router;