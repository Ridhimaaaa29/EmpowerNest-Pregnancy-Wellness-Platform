/**
 * Mock Backend Server for Testing
 * Runs on http://localhost:5000
 * Simulates Aditya's backend API endpoints
 * Used for frontend testing without Docker/MySQL
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'test_secret_key_123';

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// In-memory database (for testing only)
const mockDB = {
  users: {},
  cycles: {},
  pregnancy: {},
  userIdCounter: 1,
  cycleIdCounter: 1,
  pregnancyIdCounter: 1,
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token', message: err.message });
  }
};

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    message: 'EmpowerNest Backend (Mock) is running!',
    status: 'OK',
    database: 'In-Memory (Testing)',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// USER AUTHENTICATION ROUTES
// ============================================

// SIGNUP
app.post('/api/users/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, name, phoneNumber, dateOfBirth } = req.body;

    // Validation
    if (!email || !password || !confirmPassword || !name || !phoneNumber || !dateOfBirth) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    if (Object.values(mockDB.users).find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const userId = mockDB.userIdCounter++;
    const user = {
      id: userId,
      email,
      name,
      phoneNumber,
      dateOfBirth,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDB.users[userId] = user;

    // Generate token
    const token = jwt.sign({ userId: userId, email: email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name, phoneNumber: user.phoneNumber, dateOfBirth: user.dateOfBirth },
    });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed', message: error.message });
  }
});

// LOGIN
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = Object.values(mockDB.users).find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, phoneNumber: user.phoneNumber, dateOfBirth: user.dateOfBirth },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// GET PROFILE
app.get('/api/users/profile', verifyToken, (req, res) => {
  try {
    const user = mockDB.users[req.userId];
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile', message: error.message });
  }
});

// UPDATE PROFILE
app.put('/api/users/profile', verifyToken, (req, res) => {
  try {
    const { name, phoneNumber, dateOfBirth } = req.body;
    const user = mockDB.users[req.userId];
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    user.updatedAt = new Date().toISOString();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
});

// CHANGE PASSWORD
app.post('/api/users/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = mockDB.users[req.userId];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcryptjs.compare(currentPassword, user.password);
    if (!isValid) return res.status(401).json({ error: 'Current password is incorrect' });

    if (newPassword !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    user.password = await bcryptjs.hash(newPassword, 10);
    user.updatedAt = new Date().toISOString();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password', message: error.message });
  }
});

// ============================================
// CYCLE TRACKER ROUTES
// ============================================

// CREATE CYCLE ENTRY
app.post('/api/cycles', verifyToken, (req, res) => {
  try {
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, flow, symptoms, notes } = req.body;
    const id = mockDB.cycleIdCounter++;

    const entry = {
      id,
      userId: req.userId,
      lastPeriodDate,
      cycleLength,
      periodLength,
      regularCycle,
      flow,
      symptoms,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDB.cycles[id] = entry;
    res.status(201).json({ message: 'Cycle entry created successfully', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create cycle entry', message: error.message });
  }
});

// GET ALL CYCLE ENTRIES
app.get('/api/cycles', verifyToken, (req, res) => {
  try {
    const userCycles = Object.values(mockDB.cycles).filter(c => c.userId === req.userId);
    res.json({ entries: userCycles, count: userCycles.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cycles', message: error.message });
  }
});

// GET LATEST CYCLE ENTRY
app.get('/api/cycles/latest', verifyToken, (req, res) => {
  try {
    const userCycles = Object.values(mockDB.cycles).filter(c => c.userId === req.userId);
    if (userCycles.length === 0) return res.status(404).json({ error: 'No cycle entries found' });

    const latest = userCycles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    res.json({ entry: latest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get latest cycle', message: error.message });
  }
});

// GET CYCLE PREDICTIONS
app.get('/api/cycles/predictions', verifyToken, (req, res) => {
  try {
    const userCycles = Object.values(mockDB.cycles).filter(c => c.userId === req.userId);
    if (userCycles.length === 0) {
      return res.status(404).json({ error: 'No cycle data for predictions', predictions: {} });
    }

    const latest = userCycles[0];
    const lastPeriodDate = new Date(latest.lastPeriodDate);
    const cycleLength = latest.cycleLength || 28;
    
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    const fertileWindowStart = new Date(lastPeriodDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() + (cycleLength - 17));

    const fertileWindowEnd = new Date(lastPeriodDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + (cycleLength - 12));

    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

    res.json({
      predictions: {
        nextPeriodDate,
        fertileWindowStart,
        fertileWindowEnd,
        ovulationDate,
        cycleLength: latest.cycleLength,
        periodLength: latest.periodLength,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get predictions', message: error.message });
  }
});

// GET CYCLE STATISTICS
app.get('/api/cycles/statistics', verifyToken, (req, res) => {
  try {
    const userCycles = Object.values(mockDB.cycles).filter(c => c.userId === req.userId);
    if (userCycles.length === 0) {
      return res.json({
        statistics: { totalCycles: 0, averageCycleLength: 0, averagePeriodLength: 0, minCycleLength: 0, maxCycleLength: 0, regularCycles: 0 }
      });
    }

    const cycleLengths = userCycles.map(c => c.cycleLength);
    const periodLengths = userCycles.map(c => c.periodLength);
    const regularCount = userCycles.filter(c => c.regularCycle).length;

    res.json({
      statistics: {
        totalCycles: userCycles.length,
        averageCycleLength: (cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length).toFixed(1),
        averagePeriodLength: (periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length).toFixed(1),
        minCycleLength: Math.min(...cycleLengths),
        maxCycleLength: Math.max(...cycleLengths),
        regularCycles: regularCount,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get statistics', message: error.message });
  }
});

// UPDATE CYCLE ENTRY
app.put('/api/cycles/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;
    const entry = mockDB.cycles[id];
    if (!entry || entry.userId !== req.userId) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }

    Object.assign(entry, req.body, { updatedAt: new Date().toISOString() });
    res.json({ message: 'Cycle entry updated', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cycle', message: error.message });
  }
});

// DELETE CYCLE ENTRY
app.delete('/api/cycles/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;
    const entry = mockDB.cycles[id];
    if (!entry || entry.userId !== req.userId) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }

    delete mockDB.cycles[id];
    res.json({ message: 'Cycle entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cycle', message: error.message });
  }
});

// ============================================
// PREGNANCY TRACKER ROUTES
// ============================================

// CREATE PREGNANCY ENTRY
app.post('/api/pregnancy', verifyToken, (req, res) => {
  try {
    const { dueDate, weight, bloodPressure, notes } = req.body;
    const id = mockDB.pregnancyIdCounter++;

    // Calculate trimester and week
    const today = new Date();
    const due = new Date(dueDate);
    const daysRemaining = Math.floor((due - today) / (1000 * 60 * 60 * 24));
    const daysPregnant = 280 - daysRemaining; // 280 days = 40 weeks
    const weekNumber = Math.ceil(daysPregnant / 7);
    const dayNumber = (daysPregnant % 7) || 7;
    
    let currentTrimester = 1;
    if (weekNumber > 13) currentTrimester = 2;
    if (weekNumber > 26) currentTrimester = 3;

    const entry = {
      id,
      userId: req.userId,
      dueDate,
      weight,
      bloodPressure,
      notes,
      currentTrimester,
      weekNumber: Math.min(weekNumber, 40),
      dayNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDB.pregnancy[id] = entry;
    res.status(201).json({ message: 'Pregnancy entry created successfully', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pregnancy entry', message: error.message });
  }
});

// GET ALL PREGNANCY ENTRIES
app.get('/api/pregnancy', verifyToken, (req, res) => {
  try {
    const userPregnancies = Object.values(mockDB.pregnancy).filter(p => p.userId === req.userId);
    res.json({ entries: userPregnancies, count: userPregnancies.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pregnancies', message: error.message });
  }
});

// GET LATEST PREGNANCY ENTRY
app.get('/api/pregnancy/latest', verifyToken, (req, res) => {
  try {
    const userPregnancies = Object.values(mockDB.pregnancy).filter(p => p.userId === req.userId);
    if (userPregnancies.length === 0) return res.status(404).json({ error: 'No pregnancy entries found' });

    const latest = userPregnancies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    res.json({ entry: latest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get latest pregnancy', message: error.message });
  }
});

// GET PREGNANCY PROGRESS
app.get('/api/pregnancy/progress', verifyToken, (req, res) => {
  try {
    const userPregnancies = Object.values(mockDB.pregnancy).filter(p => p.userId === req.userId);
    if (userPregnancies.length === 0) {
      return res.status(404).json({ error: 'No pregnancy data', progress: {} });
    }

    const latest = userPregnancies[0];
    const { weekNumber, dayNumber, currentTrimester, dueDate } = latest;
    
    const due = new Date(dueDate);
    const today = new Date();
    const daysRemaining = Math.floor((due - today) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.floor(daysRemaining / 7);

    res.json({
      progress: {
        weekNumber,
        dayNumber,
        currentTrimester,
        daysRemaining: Math.max(0, daysRemaining),
        weeksRemaining: Math.max(0, weeksRemaining),
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get progress', message: error.message });
  }
});

// UPDATE PREGNANCY ENTRY
app.put('/api/pregnancy/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;
    const entry = mockDB.pregnancy[id];
    if (!entry || entry.userId !== req.userId) {
      return res.status(404).json({ error: 'Pregnancy entry not found' });
    }

    Object.assign(entry, req.body, { updatedAt: new Date().toISOString() });
    res.json({ message: 'Pregnancy entry updated', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pregnancy', message: error.message });
  }
});

// DELETE PREGNANCY ENTRY
app.delete('/api/pregnancy/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;
    const entry = mockDB.pregnancy[id];
    if (!entry || entry.userId !== req.userId) {
      return res.status(404).json({ error: 'Pregnancy entry not found' });
    }

    delete mockDB.pregnancy[id];
    res.json({ message: 'Pregnancy entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pregnancy', message: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path, method: req.method });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🎭 Mock Backend Server Running`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Database: In-Memory (Testing Only)`);
  console.log(`✅ CORS Enabled for Localhost`);
  console.log(`=================================\n`);
});

module.exports = app;
