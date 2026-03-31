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

    const pool = mysql.createPool(process.env.DATABASE_URL);
    const connection = await pool.getConnection();

    try {
      // Get cycle statistics
      const [stats] = await connection.query(
        `SELECT 
          COUNT(*) as totalEntries,
          AVG(cycle_length_days) as averageCycleLength,
          MIN(cycle_length_days) as minCycleLength,
          MAX(cycle_length_days) as maxCycleLength
        FROM cycle_entries 
        WHERE user_id = ?`,
        [decoded.id]
      );

      res.status(200).json({
        totalEntries: stats[0]?.totalEntries || 0,
        averageCycleLength: Math.round(stats[0]?.averageCycleLength) || 0,
        minCycleLength: stats[0]?.minCycleLength || 0,
        maxCycleLength: stats[0]?.maxCycleLength || 0,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Statistics error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
