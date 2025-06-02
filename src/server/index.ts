import express from 'express';
import { sql } from '../integrations/postgres/client';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [user] = await sql`
      SELECT id FROM admin_users 
      WHERE email = ${email} AND password = ${password}
    `;
    
    if (!user?.id) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({ userId: user.id });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});