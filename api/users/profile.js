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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const pool = mysql.createPool(process.env.DATABASE_URL);
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.query(
        'SELECT id, name, email FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user: users[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(403).json({ error: 'Invalid token', details: error.message });
  }
}
