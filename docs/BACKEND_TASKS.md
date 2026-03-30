# BACKEND TASKS & SETUP GUIDE - For Aditya

## 📝 Overview

This document contains all the tasks and setup instructions for the backend development phase of EmpowerNest.

**Phase:** Evaluation 1 (First Evaluation)  
**Duration:** 1-2 weeks  
**Responsibility:** Aditya  

---

## 🚀 Getting Started - Local Setup

### Step 1: Clone the Project

```bash
# Option A: Clone from GitHub
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest

# Option B: If you have ZIP file
# Extract the ZIP file and open in VS Code
```

### Step 2: Create Backend Folder Structure

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Create folder structure
mkdir models
mkdir routes
mkdir controllers
mkdir middleware
mkdir config
mkdir services
```

### Step 3: Install Required Packages

```bash
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon
```

**What each package does:**
- `express` - Web framework for Node.js
- `mysql2` - MySQL database driver
- `bcryptjs` - Password hashing library
- `jsonwebtoken` - JWT authentication
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management
- `nodemon` - Auto-restart server on file changes

### Step 4: Update package.json Scripts

Edit `backend/package.json` and update the "scripts" section:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 5: Create Environment File

Create `backend/.env`:

```env
# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=empowerNest
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email (for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Step 6: Setup MySQL Database

```bash
# Open MySQL
mysql -u root -p

# Create database
CREATE DATABASE empowerNest;
USE empowerNest;

# You'll create tables with models in the next section
```

---

## 📋 TASK BREAKDOWN - What You Need to Build

### ✅ Tasks for Evaluation 1

#### **TASK 1: Basic Server Setup** ⏱️ Day 1

**File:** `backend/server.js`

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be added later)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Test it:**
```bash
npm run dev
# Visit http://localhost:5000/api/health
```

---

#### **TASK 2: Database Connection** ⏱️ Day 1-2

**File:** `backend/config/database.js`

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

**Create Database Tables:**

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  dateOfBirth DATE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cycle Entries Table
CREATE TABLE cycle_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  lastPeriodDate DATE NOT NULL,
  cycleLength INT NOT NULL,
  periodLength INT NOT NULL,
  regularCycle BOOLEAN DEFAULT true,
  symptoms JSON,
  flow VARCHAR(50),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId)
);

-- Pregnancy Entries Table
CREATE TABLE pregnancy_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  dueDate DATE NOT NULL,
  currentTrimester INT,
  weekNumber INT,
  dayNumber INT,
  weight DECIMAL(5,2),
  bloodPressure VARCHAR(20),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (userId)
);
```

---

#### **TASK 3: Authentication Middleware** ⏱️ Day 2

**File:** `backend/middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
```

---

#### **TASK 4: User Model & Auth Controller** ⏱️ Day 2-3

**File:** `backend/models/User.js`

```javascript
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password, name, phoneNumber, dateOfBirth) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      'INSERT INTO users (email, password, name, phoneNumber, dateOfBirth) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, phoneNumber, dateOfBirth]
    );
    
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, email, name, phoneNumber, dateOfBirth, createdAt FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async update(id, data) {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, phoneNumber = ?, dateOfBirth = ?, updatedAt = NOW() WHERE id = ?',
      [data.name, data.phoneNumber, data.dateOfBirth, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = User;
```

**File:** `backend/controllers/authController.js`

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name, phoneNumber, dateOfBirth } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const userId = await User.create(email, password, name, phoneNumber, dateOfBirth);
    
    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      message: 'User created successfully',
      user: { id: userId, email, name },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await User.verifyPassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const success = await User.update(req.user.userId, req.body);
    if (!success) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
```

---

#### **TASK 5: Auth Routes** ⏱️ Day 3

**File:** `backend/routes/authRoutes.js`

```javascript
const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
```

---

#### **TASK 6: Cycle Tracker API** ⏱️ Day 4-5

**File:** `backend/models/CycleEntry.js`

```javascript
const pool = require('../config/database');

class CycleEntry {
  static async create(userId, data) {
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = data;
    
    const [result] = await pool.query(
      `INSERT INTO cycle_entries 
       (userId, lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, lastPeriodDate, cycleLength, periodLength, regularCycle, JSON.stringify(symptoms), flow, notes]
    );
    
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM cycle_entries WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );
    return rows.map(row => ({
      ...row,
      symptoms: JSON.parse(row.symptoms || '[]')
    }));
  }

  static async findById(id, userId) {
    const [rows] = await pool.query(
      'SELECT * FROM cycle_entries WHERE id = ? AND userId = ?',
      [id, userId]
    );
    if (rows[0]) {
      rows[0].symptoms = JSON.parse(rows[0].symptoms || '[]');
    }
    return rows[0];
  }

  static async update(id, userId, data) {
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = data;
    
    const [result] = await pool.query(
      `UPDATE cycle_entries 
       SET lastPeriodDate = ?, cycleLength = ?, periodLength = ?, regularCycle = ?, 
           symptoms = ?, flow = ?, notes = ?, updatedAt = NOW()
       WHERE id = ? AND userId = ?`,
      [lastPeriodDate, cycleLength, periodLength, regularCycle, JSON.stringify(symptoms), flow, notes, id, userId]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM cycle_entries WHERE id = ? AND userId = ?',
      [id, userId]
    );
    
    return result.affectedRows > 0;
  }
}

module.exports = CycleEntry;
```

**File:** `backend/controllers/cycleController.js`

```javascript
const CycleEntry = require('../models/CycleEntry');

exports.getCycleEntries = async (req, res) => {
  try {
    const entries = await CycleEntry.findByUserId(req.user.userId);
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCycleEntry = async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms, flow, notes } = req.body;

    if (!lastPeriodDate || !cycleLength) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = await CycleEntry.create(req.user.userId, req.body);
    res.status(201).json({ message: 'Cycle entry created', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCycleEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await CycleEntry.update(id, req.user.userId, req.body);
    
    if (!success) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }
    
    res.json({ message: 'Cycle entry updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCycleEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await CycleEntry.delete(id, req.user.userId);
    
    if (!success) {
      return res.status(404).json({ error: 'Cycle entry not found' });
    }
    
    res.json({ message: 'Cycle entry deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
```

**File:** `backend/routes/cycleRoutes.js`

```javascript
const express = require('express');
const { getCycleEntries, createCycleEntry, updateCycleEntry, deleteCycleEntry } = require('../controllers/cycleController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getCycleEntries);
router.post('/', createCycleEntry);
router.put('/:id', updateCycleEntry);
router.delete('/:id', deleteCycleEntry);

module.exports = router;
```

---

#### **TASK 7: Integrate Routes into Server** ⏱️ Day 5

**Update** `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const cycleRoutes = require('./routes/cycleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cycle', cycleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

#### **TASK 8: Testing with Postman** ⏱️ Day 6

Test your API endpoints:

```
1. POST http://localhost:5000/api/auth/signup
Body:
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User",
  "phoneNumber": "1234567890",
  "dateOfBirth": "2000-01-01"
}

2. POST http://localhost:5000/api/auth/login
Body:
{
  "email": "test@example.com",
  "password": "password123"
}

3. GET http://localhost:5000/api/cycle
Header: Authorization: Bearer <token_from_login>

4. POST http://localhost:5000/api/cycle
Header: Authorization: Bearer <token_from_login>
Body:
{
  "lastPeriodDate": "2024-03-20",
  "cycleLength": 28,
  "periodLength": 5,
  "regularCycle": true,
  "symptoms": ["cramps", "bloating"],
  "flow": "medium",
  "notes": "Test entry"
}
```

---

#### **TASK 9: Documentation** ⏱️ Day 7

**File:** `backend/API_DOCS.md`

Document all endpoints:
- Authentication endpoints
- Cycle tracker endpoints
- Request/response examples
- Error codes
- Rate limiting (if applicable)

---

## 📋 Checklist for Evaluation 1

- [ ] Backend folder created with proper structure
- [ ] npm packages installed
- [ ] MySQL database created and tables set up
- [ ] Server starts without errors
- [ ] Auth signup endpoint works
- [ ] Auth login endpoint works and returns JWT token
- [ ] Auth profile endpoint works with token
- [ ] Cycle tracker GET endpoint works
- [ ] Cycle tracker POST endpoint works
- [ ] Cycle tracker PUT endpoint works
- [ ] Cycle tracker DELETE endpoint works
- [ ] All endpoints tested with Postman
- [ ] Error handling implemented
- [ ] Documentation written
- [ ] Code committed to GitHub
- [ ] Code review requested

---

## 🔗 Links & Resources

- [Express.js Docs](https://expressjs.com)
- [MySQL Node Package](https://github.com/mysqljs/mysql2)
- [JWT Auth Guide](https://jwt.io/introduction)
- [Bcrypt Guide](https://www.npmjs.com/package/bcryptjs)
- [RESTful API Design](https://restfulapi.net)
- [Project README](./README.md)
- [Contribution Guidelines](./CONTRIBUTING.md)

---

## 📞 Need Help?

1. Check the CONTRIBUTING.md file
2. Review the example code in this file
3. Read the error messages carefully
4. Check Stack Overflow for similar issues
5. Ask Ridhima for help
6. Create a GitHub Issue

---

**Let's build something amazing! 🚀**

**Start Date:** March 30, 2026  
**Target Completion:** April 13, 2026
