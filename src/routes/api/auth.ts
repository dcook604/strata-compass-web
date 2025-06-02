import { sql } from '../../integrations/postgres/client';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    
    const [user] = await sql`
      SELECT id FROM admin_users
      WHERE email = ${email} AND password = ${password}
    `;
    
    if (!user?.id) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ userId: user.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Authentication error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
};