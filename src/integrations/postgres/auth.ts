import { query } from './client';
import type { QueryResult } from 'pg';

export const checkAdminLogin = async (email: string, password: string): Promise<string | null> => {
  try {
    const result = await query(
      `SELECT id FROM admin_users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
    return null;
  } catch (error) {
    console.error('PostgreSQL auth error:', error);
    throw error;
  }
};