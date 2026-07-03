import userService from '../services/user-service.js';
import postService from '../services/post-service.js';

const users = new userService();
const posts = new postService();

const getPerfil = async (req, res) => {
    try {
        const usuario = await users.getById(req.user.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const publicaciones = await posts.getByUserId(req.user.id);

        return res.status(200).json({ usuario, publicaciones });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno al obtener el perfil.' });
    }
};

const updatePerfil = async (req, res) => {
    try {
        const { nombre_completo, biografia, foto_perfil } = req.body;
        const usuarioActualizado = await users.updateProfile(req.user.id, {
            nombre_completo,
            biografia,
            foto_perfil,
        });

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        return res.status(200).json({ mensaje: 'Perfil actualizado con éxito', usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno al actualizar el perfil.' });
    }
};

export default { getPerfil, updatePerfil };