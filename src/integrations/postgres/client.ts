import postgres from 'postgres';

const connectionString = "postgresql://spectrumsite:kU1-6V64b9jBJ-_88lML@38.102.125.145:5433/spectrumsitedb";

export const sql = postgres(connectionString, {
  ssl: 'require'
});