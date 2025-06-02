import { pool } from '../integrations/postgres/client';
import { logger } from './config';

async function createAdmin(email: string, password: string) {
  try {
    // Check if admin already exists
    const [existing] = await sql`
      SELECT id FROM admin_users WHERE email = ${email}
    `;

    if (existing) {
      logger.warn(`Admin with email ${email} already exists`);
      return;
    }

    // Create new admin
    const [admin] = await sql`
      INSERT INTO admin_users (email, password)
      VALUES (${email}, ${password})
      RETURNING id
    `;

    logger.info(`Created admin account with ID: ${admin.id}`);
    console.log(`Successfully created admin account for ${email}`);
  } catch (error) {
    logger.error('Error creating admin account:', error);
    console.error('Error creating admin account:', error);
  } finally {
    // Don't close the shared pool connection
  }
}

// Get email and password from command line arguments
const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: tsx createAdmin.ts <email> <password>');
  process.exit(1);
}

createAdmin(email, password);