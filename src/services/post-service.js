import pool from '../config/db.js';

export default class PostService {
    getAll = async () => {
        const sql = `
            SELECT p.id, p.url_imagen, p.descripcion, p.likes, p.fecha_creacion,
                   u.id AS usuario_id, u.nombre_usuario, u.foto_perfil
            FROM public.publicaciones p
            JOIN public.usuarios u ON u.id = p.usuario_id
            ORDER BY p.fecha_creacion DESC
        `;
        const result = await pool.query(sql);
        return result.rows;
    };

    getByUserId = async (usuarioId) => {
        const sql = `
            SELECT id, url_imagen, descripcion, likes, fecha_creacion
            FROM public.publicaciones
            WHERE usuario_id = $1
            ORDER BY fecha_creacion DESC
        `;
        const result = await pool.query(sql, [usuarioId]);
        return result.rows;
    };

    create = async ({ usuario_id, url_imagen, descripcion }) => {
        const sql = `
            INSERT INTO public.publicaciones (usuario_id, url_imagen, descripcion)
            VALUES ($1, $2, $3)
            RETURNING id, usuario_id, url_imagen, descripcion, likes, fecha_creacion
        `;
        const result = await pool.query(sql, [usuario_id, url_imagen, descripcion ?? null]);
        return result.rows[0];
    };
}