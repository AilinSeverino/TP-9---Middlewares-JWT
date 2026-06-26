import { Router } from 'express';
import registerRoute from './api/auth/register.js';
import loginRoute from './api/auth/login.js';

const router = Router();
router.use('/register', registerRoute);
router.use('/login', loginRoute);
export default router;