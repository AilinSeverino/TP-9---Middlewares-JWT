import pool from './../config/db.js';

export default class UserService {
    getByEmailOrUsername = async (email, username) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.usuarios WHERE email = $3 OR nombre_usuario = $1`;
            const result = await pool.query(sql, [email, username]);
            await client.end();
            returnArray = result.rows [0] || null;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createAsync = async (userData) => {
        let rowsAffected = 0;
        const { nombre_usuario, nombre_completo, email, password } = userData;
        try {
            await client.connect();
            const sql = `INSERT INTO public.usuarios (nombre_usuario, nombre_completo, email, password) VALUES ($1, $2, $3, $4)`;
            const values = [userData.nombre_usuario, userData.nombre_completo, userData.email, userData.password];
            const result = await pool.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount; //cuantas filas se insertaron
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}