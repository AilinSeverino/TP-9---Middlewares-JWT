import userService from '../services/user-service.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { nombre_usuario, nombre_completo, email, password } = req.body;

    try {
        const userExists = await userService.getByEmailOrUsername(email, nombre_usuario);
        if (userExists) {
            return res.status(400).json({ error: "El email o nombre de usuario ya existen." });
        }

        const nuevoUsuario = await userService.createAsync({ nombre_usuario, nombre_completo, email, password });
        return res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno al registrar usuario." });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await userService.getByEmailOrUsername(email, '');
        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ error: "no." });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario },
            process.env.JWT_SECRET || 'secret_key_por_defecto',
            { expiresIn: '2h' }
        );

        return res.status(200).json({ mensaje: "Login exitoso", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno en el login." });
    }
};

export default { register, login };