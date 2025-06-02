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
    const { email, password } = req.body as AuthRequestBody;

    logger.info(`Attempting login for email: ${email}`);

    const result = await sql.query(
      'SELECT id, email FROM admin_users WHERE email = $1 AND password = $2',
      [email, password]
    );

    logger.info(`Query executed successfully. User: ${JSON.stringify(result.rows)}`);

    const user = result.rows[0];

    if (!user?.id) {
      logger.warn(`Failed login attempt for email: ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    logger.info(`User ${user.id} logged in successfully`);
    res.json({ userId: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
};

export default authHandler;