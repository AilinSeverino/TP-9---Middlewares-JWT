import pool from '../config/db.js';

export default class UserService {
    getByEmailOrUsername = async (email, username) => {
        const sql = `SELECT * FROM public.usuarios WHERE email = $1 OR nombre_usuario = $2`;
        const result = await pool.query(sql, [email, username]);
        return result.rows[0] || null;
    };

    getById = async (id) => {
        const sql = `SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia FROM public.usuarios WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0] || null;
    };

    createAsync = async (userData) => {
        const { nombre_usuario, nombre_completo, email, password } = userData;
        const sql = `
            INSERT INTO public.usuarios (nombre_usuario, nombre_completo, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia
        `;
        const values = [nombre_usuario, nombre_completo, email, password];
        const result = await pool.query(sql, values);
        return result.rows[0];
    };

    updateProfile = async (id, { nombre_completo, biografia, foto_perfil }) => {
        const sql = `
            UPDATE public.usuarios
            SET nombre_completo = COALESCE($1, nombre_completo),
                biografia = COALESCE($2, biografia),
                foto_perfil = COALESCE($3, foto_perfil)
            WHERE id = $4
            RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia
        `;
        const values = [nombre_completo ?? null, biografia ?? null, foto_perfil ?? null, id];
        const result = await pool.query(sql, values);
        return result.rows[0] || null;
    };
}