# Vercel-Only Deployment Guide - EmpowerNest

Deploy entire app (frontend + backend) on Vercel with free PlanetScale MySQL database.

---

## **Architecture Overview**

```
🎨 Frontend (React)
    ↓
    https://empowernest.vercel.app
    ↓
⚙️ Backend (Vercel Serverless Functions)
    ↓
    https://empowernest.vercel.app/api/*
    ↓
🗄️ Database (PlanetScale MySQL - FREE)
    ↓
    MySQL hosted in cloud
```

**Total Cost: ✅ 100% FREE**

---

## **Step 1: Set Up PlanetScale Database (FREE)**

### Create PlanetScale Account

1. Go to [PlanetScale.com](https://planetscale.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Create organization (use default)

### Create MySQL Database

1. Click **"Create a database"**
2. Enter name: `empowernest`
3. Select region closest to you
4. Click **"Create database"**

### Get Connection String

1. Open database → Click **"Connect"**
2. Select **"Node.js"**
3. Copy the connection string (looks like):
```
mysql://[username]:[password]@[host]/empowernest?sslaccept=strict
```

4. Save this - you'll need it for Vercel!

---

## **Step 2: Create Vercel Functions for Backend**

Your backend API will run as Vercel Serverless Functions in `/api` folder.

### Create Backend Structure

In your project root, create this folder structure:

```
/api
  /cycles/
    route.js
  /users/
    route.js
    signup.js
    login.js
    logout.js
    profile.js
  /pregnancy/
    route.js
  middleware/
    auth.js
  utils/
    database.js
```

### Create Database Connection File

**`/api/utils/database.js`:**

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool;
```

### Create Auth Middleware

**`/api/middleware/auth.js`:**

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
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

module.exports = authenticateToken;
```

### Create Login API

**`/api/users/login.js`:**

```javascript
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // Parse connection string
    const pool = mysql.createPool(process.env.DATABASE_URL);
    const connection = await pool.getConnection();

    // Find user
    const [users] = await connection.execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    connection.release();

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
```

### Create Signup API

**`/api/users/signup.js`:**

```javascript
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  try {
    const pool = mysql.createPool(process.env.DATABASE_URL);
    const connection = await pool.getConnection();

    // Check if user exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    connection.release();

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: userId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
```

### Create Profile API (Protected)

**`/api/users/profile.js`:**

```javascript
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
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

    const [users] = await connection.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.id]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: users[0] });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
}
```

### Create Cycles API

**`/api/cycles/route.js`:**

```javascript
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
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
      // Get all cycles for user
      const [cycles] = await connection.execute(
        'SELECT * FROM cycle_entries WHERE user_id = ? ORDER BY created_at DESC',
        [decoded.id]
      );
      res.status(200).json(cycles);
    } else if (req.method === 'POST') {
      // Create new cycle
      const { cycleLengthDays, cycleStartDate, notes } = req.body;

      await connection.execute(
        'INSERT INTO cycle_entries (user_id, cycle_length_days, cycle_start_date, notes) VALUES (?, ?, ?, ?)',
        [decoded.id, cycleLengthDays, cycleStartDate, notes]
      );

      res.status(201).json({ message: 'Cycle entry created' });
    }
  } catch (error) {
    console.error('Cycles error:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    connection.release();
  }
}
```

---

## **Step 3: Install Dependencies**

Add required packages:

```bash
npm install mysql2 jsonwebtoken bcryptjs dotenv
```

Update `vercel.json` in root:

```json
{
  "buildCommand": "npm install && npm run build",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

---

## **Step 4: Create Tables on PlanetScale**

Connect to PlanetScale and run:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cycle_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  cycle_length_days INT,
  cycle_start_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE pregnancy_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  weeks_pregnant INT,
  health_status VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## **Step 5: Deploy to Vercel**

### Connect GitHub to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository
4. Click **"Import"**

### Configure Environment Variables

1. In Vercel project settings → **"Environment Variables"**
2. Add:

```
DATABASE_URL = mysql://[user]:[password]@[host]/empowernest?sslaccept=strict
JWT_SECRET = your-super-secret-key-change-this
VITE_API_URL = https://your-vercel-project.vercel.app/api
```

3. Click **"Deploy"**

Vercel automatically detects Vite project and deploys frontend + functions!

---

## **Step 6: Update Frontend API Calls**

Your frontend needs to call the new `/api` endpoints instead of localhost.

**`src/services/api.ts`** - Already updated to use `VITE_API_URL`, which is now set to Vercel domain!

No code changes needed - just environment variable setup.

---

## **Testing**

### Test Health Check
```bash
curl https://your-project.vercel.app/api/health
```

### Test Signup
```bash
curl -X POST https://your-project.vercel.app/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password"}'
```

### Get Token from Response
Use the token to call protected endpoints:

```bash
curl https://your-project.vercel.app/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## **Deployment Checklist**

- ✅ PlanetScale database created
- ✅ Connection string from PlanetScale
- ✅ Vercel Functions created in `/api` folder
- ✅ Tables created in PlanetScale
- ✅ Environment variables set in Vercel
- ✅ Frontend deployed on Vercel
- ✅ Signup/Login working
- ✅ Data persisting in PlanetScale MySQL

---

## **Cost Breakdown**

| Service | Cost | Details |
|---------|------|---------|
| Vercel Frontend | FREE | Unlimited deployments |
| Vercel Functions | FREE | 1,000,000 invocations/month |
| PlanetScale MySQL | FREE | 5 GB storage, perfect for semester |
| **Total** | **$0** | Completely free! |

---

## **Useful Links**

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Functions Guide](https://vercel.com/docs/functions/serverless-functions)
- [PlanetScale Docs](https://planetscale.com/docs)
- [MySQL Connection Strings](https://planetscale.com/docs/concepts/connection-strings)

---

## **Important Notes**

⚠️ **Serverless Functions:**
- Functions sleep if no traffic for 30 days (free tier limitation)
- First request after sleep takes 2-5 seconds (cold start)
- Not ideal for real-time apps, but fine for team project

✅ **What Works Great:**
- Authentication (signup/login)
- Data persistence in MySQL
- User isolation (each user sees own data)
- Multi-user support
- All CRUD operations

---

**Your app is 100% FREE and ready for production!** 🚀

Frontend: Vercel  
Backend: Vercel Functions  
Database: PlanetScale MySQL

