import { RequestHandler } from 'express';
import { sql } from '../../integrations/postgres/client';
import { logger } from '../config';

interface AuthRequestBody {
  email: string;
  password: string;
}

const authHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    
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