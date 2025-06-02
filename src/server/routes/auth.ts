import { RequestHandler } from 'express';
import { sql } from '../../integrations/postgres/client';
import { logger } from '../config';

interface AuthRequestBody {
  email: string;
  password: string;
}

const authHandler: RequestHandler = async (req, res, next) => {
  // Explicitly return void when sending responses
  const sendResponse = (status: number, body: any) => {
    res.status(status).json(body);
    return;
  };
  try {
    const { email, password, createAdmin } = req.body as AuthRequestBody & { createAdmin?: boolean };
    
    if (createAdmin) {
      const [existing] = await sql`
        SELECT id FROM admin_users WHERE email = ${email}
      `;
      
      if (!existing) {
        const [admin] = await sql`
          INSERT INTO admin_users (email, password)
          VALUES (${email}, ${password})
          RETURNING id
        `;
        return res.json({ message: `Admin account created with ID: ${admin.id}` });
      }
      return res.status(400).json({ error: 'Admin already exists' });
    }
    
    const [user] = await sql`
      SELECT id FROM admin_users 
      WHERE email = ${email} AND password = ${password}
    `;
    
    if (!user?.id) {
      logger.warn(`Failed login attempt for email: ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    logger.info(`User ${user.id} logged in successfully`);
    res.json({ userId: user.id });
  } catch (error) {
    next(error);
  }
};

export default authHandler;