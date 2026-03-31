const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Try to get token from cookies first (httpOnly cookie)
  let token = req.cookies?.authToken;
  
  // Fall back to Authorization header for backward compatibility
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  }

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      message: 'No token provided'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid or expired token',
        message: err.message 
      });
    }
    req.user = user; // Attach user data to request
    next();
  });
};

const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

module.exports = { 
  authenticateToken, 
  generateToken 
};
