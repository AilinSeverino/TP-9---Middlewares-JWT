import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

if (!process.env.JWT_SECRET) {
    throw new Error('Falta la variable de entorno JWT_SECRET. Revisa tu archivo .env');
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/publicaciones', postRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API TP9 - Middlewares JWT funcionando correctamente.' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor.' });
});

export default app;