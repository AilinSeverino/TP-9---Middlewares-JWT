import postService from '../services/post-service.js';

const posts = new postService();

const getFeed = async (req, res) => {
    try {
        const publicaciones = await posts.getAll();
        return res.status(200).json({ publicaciones });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno al obtener el feed.' });
    }
};

const createPost = async (req, res) => {
    try {
        const { url_imagen, descripcion } = req.body;
        const nuevaPublicacion = await posts.create({
            usuario_id: req.user.id,
            url_imagen,
            descripcion,
        });

        return res.status(201).json({ mensaje: 'Publicación creada con éxito', publicacion: nuevaPublicacion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno al crear la publicación.' });
    }
};

export default { getFeed, createPost };