import { Pool } from 'pg';

const connectionString = "postgresql://spectrumsite:kU1-6V64b9jBJ-_88lML@38.102.125.145:5433/spectrumsitedb";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // For development only
  }
});

// Helper function to execute queries
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};