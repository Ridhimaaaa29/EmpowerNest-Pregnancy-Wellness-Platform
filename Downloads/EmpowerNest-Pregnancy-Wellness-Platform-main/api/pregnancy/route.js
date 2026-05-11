const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Verify token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  const pool = mysql.createPool(process.env.DATABASE_URL);
  const connection = await pool.getConnection();

  try {
    if (req.method === 'GET') {
      // Get all pregnancy entries for user
      const [entries] = await connection.query(
        'SELECT * FROM pregnancy_entries WHERE user_id = ? ORDER BY created_at DESC',
        [decoded.id]
      );
      res.status(200).json(entries);
    } else if (req.method === 'POST') {
      // Create new pregnancy entry
      const { weeksPregnant, healthStatus, notes } = req.body;

      if (!weeksPregnant) {
        return res.status(400).json({ error: 'Weeks pregnant is required' });
      }

      await connection.query(
        'INSERT INTO pregnancy_entries (user_id, weeks_pregnant, health_status, notes) VALUES (?, ?, ?, ?)',
        [decoded.id, weeksPregnant, healthStatus || null, notes || null]
      );

      res.status(201).json({ message: 'Pregnancy entry created successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Pregnancy error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  } finally {
    connection.release();
  }
}
