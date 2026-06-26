import { Router } from 'express';
import perfilRoute from './api/usuarios/perfil.js';

const router = Router();
router.use('/perfil', perfilRoute);
export default router;