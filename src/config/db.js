import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_DATABASE ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    port: parseInt(process.env.DB_PORT ?? '5432'),
});

pool.on('error', (err) => {
    console.error('Error inesperado en el pool de PostgreSQL', err);
});

export default pool;