import { Pool } from 'pg';

// Only create client if running in Node.js environment
let pool: Pool | null = null;

if (typeof window === 'undefined') {
  const dbUrl = process.env.POSTGRES_URL;
  if (!dbUrl) {
    throw new Error('POSTGRES_URL environment variable not defined.');
  }

  pool = new Pool({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false, // For development purposes only!
    },
  });
}

const sql = {
  query: async (text: string, params: any[]) => {
    if (!pool) {
      throw new Error('Pool is not initialized');
    }
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  },
};

export { sql };