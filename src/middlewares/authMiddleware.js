import jwt from 'jsonwebtoken';

export default verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El formato es: Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no provisto.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_por_defecto');
        req.user = decoded; // Adjuntamos los datos del usuario logueado a la petición
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};