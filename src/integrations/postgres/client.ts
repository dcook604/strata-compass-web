import * as postgres from 'postgres';

// Only create client if running in Node.js environment
export const sql = typeof window === 'undefined'
  ? postgres(process.env.POSTGRES_URL || "postgresql://spectrumsite:kU1-6V64b9jBJ-_88lML@38.102.125.145:5433/spectrumsitedb", {
      ssl: 'require'
    })
  : null;