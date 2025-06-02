import { logger } from './config';
import createApp from './app';
import { sql } from '../integrations/postgres/client.ts';

const PORT = process.env.PORT || 3001;
const app = createApp();


app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);

  // Test database connection
  try {
    const result = await sql.query('SELECT 1', []);
    logger.info(`Database connection successful! Result: ${JSON.stringify(result.rows)}`);
  } catch (error) {
    logger.error('Database connection failed:', error);
  }
});