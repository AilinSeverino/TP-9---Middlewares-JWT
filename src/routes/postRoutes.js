import { Router } from 'express';
import postController from '../controllers/postController.js'; // Tu controlador real
import verificarToken from '../middlewares/authMiddleware.js';
import { validarPublicacion } from '../middlewares/validacionDeDatos.js';

const router = Router();

router.get('/', postController.getFeed); 
router.post('/', verificarToken, validarPublicacion, postController.createPost);

export default router;