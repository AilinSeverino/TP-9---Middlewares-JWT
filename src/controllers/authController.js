import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from '../services/user-service.js';

const service = new userService();

const register = async (req, res) => {
    const { nombre_usuario, nombre_completo, email, password } = req.body;

    try {
        const userExists = await service.getByEmailOrUsername(email, nombre_usuario);
        if (userExists) {
            return res.status(400).json({ error: 'El email o nombre de usuario ya existen.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await service.createAsync({
            nombre_usuario,
            nombre_completo,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno al registrar usuario.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await service.getByEmailOrUsername(email, '');
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno en el login.' });
    }
};

export default { register, login };