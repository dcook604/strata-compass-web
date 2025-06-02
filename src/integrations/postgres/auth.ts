import { sql } from './client';

export const checkAdminLogin = async (email: string, password: string): Promise<string | null> => {
  try {
    const [user] = await sql`
      SELECT id FROM admin_users 
      WHERE email = ${email} AND password = ${password}
    `;
    
    return user?.id || null;
  } catch (error) {
    console.error('PostgreSQL auth error:', error);
    throw error;
  }
};