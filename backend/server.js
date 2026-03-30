const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database (this will test connection)
const pool = require('./config/database');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'EmpowerNest Backend is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cycles', require('./routes/cycleRoutes'));
app.use('/api/pregnancy', require('./routes/pregnancyRoutes'));

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    status: err.status || 500,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`=================================\n`);
});
