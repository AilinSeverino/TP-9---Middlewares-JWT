import { Router } from 'express';
import publicacionesRoute from './api/publicaciones.js';
const router = Router();
router.use('/', publicacionesRoute);
export default router;