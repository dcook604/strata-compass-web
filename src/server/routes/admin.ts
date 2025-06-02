import { RequestHandler } from 'express';
import { sql } from '../../integrations/postgres/client';
import { logger } from '../config';

interface AdminCreateRequest {
  email: string;
  password: string;
}

export const createAdminHandler: RequestHandler = async (req, res) => {
  // Explicitly return void when sending responses
  const sendResponse = (status: number, body: any) => {
    res.status(status).json(body);
    return;
  };

  try {
    const { email, password } = req.body as AdminCreateRequest;
    
    if (!email || !password) {
      return sendResponse(400, { error: 'Email and password required' });
    }

    const [existing] = await sql`
      SELECT id FROM admin_users WHERE email = ${email}
    `;
    
    if (existing) {
      return sendResponse(400, { error: 'Admin already exists' });
    }
    
    const [admin] = await sql`
      INSERT INTO admin_users (email, password)
      VALUES (${email}, ${password})
      RETURNING id
    `;

    logger.info(`Created admin account with ID: ${admin.id}`);
    return sendResponse(200, { message: `Admin account created with ID: ${admin.id}` });
  } catch (error) {
    logger.error('Error creating admin:', error);
    return sendResponse(500, { error: 'Failed to create admin' });
  }
};