# EmpowerNest Backend - Complete Setup Guide

## Overview

This guide covers the complete Backend setup for EmpowerNest with Node.js/Express, MySQL (Dockerized), and AI insights simulation.

## Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **Database Manager**: Docker & Docker Compose
- **Authentication**: JWT (stored in httpOnly cookies)
- **Password Security**: bcryptjs
- **Port**: 5001 (configurable via `.env`)

### Database Schema

#### 1. Users Table
```sql
id, email (unique), password (hashed), name, phoneNumber, dateOfBirth, role, createdAt, updatedAt
```

#### 2. Cycle Entries Table
```sql
id, userId, lastPeriodDate, cycleLength, periodLength, regularCycle, symptoms (JSON), flow, notes, createdAt, updatedAt
```

#### 3. Pregnancy Entries Table
```sql
id, userId, dueDate, currentTrimester, weekNumber, dayNumber, weight, bloodPressure, notes, createdAt, updatedAt
```

#### 4. Health Risk Assessment Table (NEW)
```sql
id, userId, age, weight, medicalConditions (JSON), riskScore, riskLevel, insights (JSON), recommendations (JSON), createdAt, updatedAt
```

#### 5. Additional Tables
- Vaccinations
- Sleep Logs
- Daily Logs

## Setup Instructions

### 1. Prerequisites

Ensure you have installed:
- Docker & Docker Compose
- Node.js 16+ (for running locally without Docker)
- npm or yarn

### 2. Environment Configuration

Create `.env` file in `/backend` directory with:

```env
# Database Configuration (for Docker)
DB_HOST=localhost
DB_USER=empoweruser
DB_PASSWORD=empowerpass123
DB_NAME=empowerNest
DB_PORT=3307

# Server Configuration
PORT=5001
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

### 3. Start MySQL with Docker

```bash
# From project root directory
docker-compose up -d

# Verify container is running
docker ps | grep empowernest_mysql

# Check logs
docker-compose logs mysql
```

**Output should show:**
```
✅ MySQL Database Connected Successfully!
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Start Backend Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

**Expected output:**
```
[Timestamp] Starting server on port 5001...
✅ MySQL Database Connected Successfully!
```

### 6. Verify Backend Health

```bash
curl http://localhost:5001/api/health
```

**Expected response:**
```json
{
  "message": "EmpowerNest Backend is running!",
  "status": "OK",
  "timestamp": "2026-04-01T12:00:00.000Z"
}
```

## API Endpoints Reference

### Authentication APIs

#### Signup
```
POST /api/users/signup

Request Body:
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-01-15"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "dateOfBirth": "1990-01-15"
  }
}
```

#### Login
```
POST /api/users/login

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Profile
```
GET /api/users/profile
Authorization: Bearer {token}

Response (200):
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "dateOfBirth": "1990-01-15"
  }
}
```

#### Update Profile
```
PUT /api/users/profile
Authorization: Bearer {token}

Request Body:
{
  "name": "Jane Doe",
  "phoneNumber": "9876543210",
  "dateOfBirth": "1990-01-15"
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

### Health Risk Assessment APIs

#### Create Assessment
```
POST /api/health-risk
Authorization: Bearer {token}

Request Body:
{
  "age": 28,
  "weight": 65,
  "medicalConditions": ["none"] // or ["diabetes", "hypertension", "pcos", etc.]
}

Response (201):
{
  "message": "Health risk assessment completed successfully",
  "assessment": {
    "id": 1,
    "riskScore": 15,
    "riskLevel": "low",
    "insights": [
      {
        "type": "age_risk",
        "message": "..."
      }
    ],
    "recommendations": [
      "Maintain a healthy lifestyle...",
      ...
    ],
    "createdAt": "2026-04-01T12:00:00.000Z"
  }
}
```

#### Get Latest Assessment
```
GET /api/health-risk/latest
Authorization: Bearer {token}

Response (200):
{
  "assessment": {...}
}
```

#### Get All Assessments
```
GET /api/health-risk
Authorization: Bearer {token}

Response (200):
{
  "assessments": [...],
  "count": 5
}
```

#### Update Assessment
```
PUT /api/health-risk/{id}
Authorization: Bearer {token}

Request Body:
{
  "age": 29,
  "weight": 66,
  "medicalConditions": [...]
}

Response (200):
{
  "message": "Assessment updated successfully",
  "assessment": {...}
}
```

#### Delete Assessment
```
DELETE /api/health-risk/{id}
Authorization: Bearer {token}

Response (200):
{
  "message": "Assessment deleted successfully"
}
```

### Cycle Tracker APIs

#### Create Cycle Entry
```
POST /api/cycles
Authorization: Bearer {token}

Request Body:
{
  "lastPeriodDate": "2026-03-15",
  "cycleLength": 28,
  "periodLength": 5,
  "regularCycle": true,
  "symptoms": ["cramps", "bloating"],
  "flow": "medium",
  "notes": "Started cycle today"
}

Response (201):
{
  "message": "Cycle entry created successfully",
  "entry": {...}
}
```

#### Get Latest Cycle
```
GET /api/cycles/latest
Authorization: Bearer {token}

Response (200):
{
  "entry": {...}
}
```

#### Get Cycle Predictions
```
GET /api/cycles/predictions
Authorization: Bearer {token}

Response (200):
{
  "predictions": {
    "nextCycleDate": "2026-04-12",
    "ovulationDate": "2026-03-29",
    "fertileWindow": {...}
  }
}
```

### Pregnancy Tracker APIs

#### Create Pregnancy Entry
```
POST /api/pregnancy
Authorization: Bearer {token}

Request Body:
{
  "dueDate": "2026-12-15",
  "currentTrimester": 2,
  "weekNumber": 14,
  "weight": 68,
  "bloodPressure": "120/80",
  "notes": "Feeling good"
}

Response (201):
{
  "message": "Pregnancy entry created successfully",
  "entry": {...}
}
```

## AI Insights Simulation

The health risk assessment includes **rule-based AI insights** that simulate AI analysis:

### Risk Calculation Logic

1. **Age-based Risk** (0-15 points)
   - Age < 20 or > 35: +10 points
   - Age < 18 or > 40: +5 points

2. **Weight-based Risk** (0-20 points)
   - BMI < 18.5 or > 30: +15 points
   - BMI < 16 or > 35: +5 points additional

3. **Medical Conditions** (0-30 points)
   - High-risk conditions: 15 points each
   - Other conditions: 5 points each

### Risk Levels

- **Low**: 0-20 points
- **Moderate**: 21-40 points
- **Medium-High**: 41-60 points
- **High**: 61+ points

### Insight Triggers

Insights are generated based on:
- Age in non-standard pregnancy range
- BMI indicators
- Medical conditions
- Lifestyle factors

### Example Insights

**Age-Based:**
> "You are younger, which may have specific health considerations during pregnancy planning"

**Weight-Based:**
> "Your BMI suggests you are overweight. Maintaining a healthy weight is important."

**Medical Conditions:**
> "You have reported medical conditions (diabetes, hypertension). Close medical supervision is recommended."

## Frontend Integration

The frontend (`src/services/api.ts`) now integrates with the backend:

### Authentication Flow
1. Frontend calls `POST /api/users/signup` or `POST /api/users/login`
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. All subsequent requests include token in Authorization header
5. Falls back to localStorage auth if backend unavailable

### Health Risk Flow
1. Frontend calls `POST /api/health-risk` with user data
2. Backend calculates risk score and generates insights
3. Stores in MySQL for persistence
4. Returns insights and recommendations
5. Frontend displays AI-powered health insights

## Common Issues & Solutions

### Issue: MySQL connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:3307
```

**Solution:**
```bash
# Check if Docker container is running
docker ps | grep empowernest_mysql

# Start Docker if not running
docker-compose up -d

# Check logs
docker-compose logs mysql
```

### Issue: JWT token expired
```
Error: Invalid or expired token
```

**Solution:**
- Token expires based on `JWT_EXPIRE` setting (default: 7 days)
- User needs to login again
- Update JWT_EXPIRE in `.env` to change duration

### Issue: CORS error from frontend
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Update `ALLOWED_ORIGINS` in `.env` to include frontend URL
- Backend CORS middleware will then allow requests
- Default includes `http://localhost:5173`

### Issue: Database tables not created
**Solution:**
```bash
# Manually run SQL
docker exec -i empowernest_mysql mysql -u root -proot empowerNest < backend/config/database.sql

# Or check /docker-entrypoint-initdb.d/ in container
docker exec empowernest_mysql ls -la /docker-entrypoint-initdb.d/
```

## Running Both Frontend & Backend

### Terminal 1: Start Database
```bash
docker-compose up
```

### Terminal 2: Start Backend
```bash
cd backend
npm run dev
```

### Terminal 3: Start Frontend
```bash
npm run dev
```

**Expected Result:**
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5001`
- MySQL runs on `localhost:3307`
- All data persists in MySQL

## Testing API Endpoints with Curl

### Create User
```bash
curl -X POST http://localhost:5001/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "confirmPassword": "test123",
    "name": "Test User",
    "phoneNumber": "1234567890",
    "dateOfBirth": "1990-01-15"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Create Health Risk Assessment
```bash
curl -X POST http://localhost:5001/api/health-risk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_login>" \
  -d '{
    "age": 28,
    "weight": 65,
    "medicalConditions": ["none"]
  }'
```

## Future Enhancements

1. **Real AI Integration**
   - Replace rule-based insights with AI API (OpenAI, Anthropic, etc.)
   - Use ML models for better risk prediction

2. **Additional Features**
   - Appointment scheduling
   - Doctor consultations
   - Prescription management
   - Fetal development tracking

3. **Security Improvements**
   - Rate limiting
   - Request validation
   - Input sanitization
   - 2FA authentication

4. **Performance Optimization**
   - Database indexing
   - Query optimization
   - Caching strategies
   - Pagination support

## Production Deployment

### Database Backup
```bash
docker exec empowernest_mysql mysqldump -u empoweruser -pempowerpass123 empowerNest > backup.sql
```

### Environment Variables (Production)
```env
DB_HOST=mysql.your-domain.com
DB_USER=prod_user
DB_PASSWORD=strong_random_password
PORT=5001
NODE_ENV=production
JWT_SECRET=very_long_random_secret_key
ALLOWED_ORIGINS=https://your-frontend.com
```

### Security Checklist
- [ ] Change all default passwords
- [ ] Enable HTTPS
- [ ] Set strong JWT_SECRET
- [ ] Configure proper CORS origins
- [ ] Enable database backups
- [ ] Implement logging
- [ ] Set up monitoring
- [ ] Enable rate limiting

## Support Files

The backend includes these support files:
- `/backend/.env` - Configuration
- `/backend/config/database.js` - Database connection
- `/backend/config/database.sql` - Schema
- `/backend/models/` - Data models
- `/backend/controllers/` - Business logic
- `/backend/routes/` - API routes
- `/backend/middleware/` - Authentication & validation

## References

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Reference](https://dev.mysql.com/doc/)
- [JWT Documentation](https://jwt.io/)
- [Docker Documentation](https://docs.docker.com/)
