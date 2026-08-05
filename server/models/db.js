import pg from 'pg';
const { Pool } = pg;

// Uses DATABASE_URL for Supabase/Cloud SQL, or defaults to local
const pool = new Pool(
  process.env.DATABASE_URL 
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 3000 }
    : {
        user: process.env.DB_USER || 'hope_admin',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'hope_initiative',
        password: process.env.DB_PASSWORD || 'hope_password',
        port: process.env.DB_PORT || 5432,
        connectionTimeoutMillis: 2000,
      }
);

pool.on('error', (err) => {
  console.error('Unexpected error on idle DB client:', err.message);
});

export let isDbConnected = false;

export const initDB = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          id SERIAL PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          target_amount NUMERIC NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS site_files (
          id SERIAL PRIMARY KEY,
          filename TEXT NOT NULL,
          mimetype TEXT NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      isDbConnected = true;
      console.log("Database initialized successfully.");
    } finally {
      client.release();
    }
  } catch (error) {
    isDbConnected = false;
    console.warn("Database not connected — using in-memory fallback mode.");
  }
};

export default pool;
