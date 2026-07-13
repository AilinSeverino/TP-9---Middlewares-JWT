import { Router } from 'express';
import userController from '../controllers/userController.js'; // Tu controlador real
import verificarToken from '../middlewares/authMiddleware.js';
import { validarPerfil } from '../middlewares/validacionDeDatos.js';

const router = Router();

router.get('/perfil', verificarToken, userController.getPerfil);
router.put('/perfil', verificarToken, validarPerfil, userController.updatePerfil);

export default router;