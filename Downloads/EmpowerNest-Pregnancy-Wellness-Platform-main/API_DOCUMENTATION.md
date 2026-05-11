# EmpowerNest Backend API Documentation

## 🚀 Backend Setup Complete!

**Server Running on:** `http://localhost:5001`  
**Database:** MySQL (Docker) on port 3307  
**Authentication:** JWT (Bearer Token)

---

## 📋 API Endpoints Overview

### **1. User Authentication** (`/api/users`)

#### **Sign Up** (Public)
```bash
POST /api/users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-15"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN_HERE",
  "user": { id, email, name, phoneNumber, dateOfBirth }
}
```

#### **Login** (Public)
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": { ... }
}
```

#### **Get Profile** (Protected)
```bash
GET /api/users/profile
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1990-01-15",
    "role": "user",
    "createdAt": "2026-03-30T...",
    "updatedAt": "2026-03-30T..."
  }
}
```

#### **Update Profile** (Protected)
```bash
PUT /api/users/profile
Authorization: Bearer JWT_TOKEN_HERE

{
  "name": "Jane Doe",
  "phoneNumber": "+0987654321",
  "dateOfBirth": "1992-05-20"
}
```

#### **Change Password** (Protected)
```bash
POST /api/users/change-password
Authorization: Bearer JWT_TOKEN_HERE

{
  "currentPassword": "oldpass",
  "newPassword": "newpass123",
  "confirmPassword": "newpass123"
}
```

---

### **2. Cycle Tracker** (`/api/cycles`)

#### **Create Cycle Entry** (Protected)
```bash
POST /api/cycles
Authorization: Bearer JWT_TOKEN_HERE

{
  "lastPeriodDate": "2026-03-15",
  "cycleLength": 28,
  "periodLength": 5,
  "regularCycle": true,
  "flow": "medium",
  "symptoms": ["cramps", "bloating"],
  "notes": "Notes about the cycle"
}

Response (201):
{
  "message": "Cycle entry created successfully",
  "entry": { id, userId, lastPeriodDate, ... }
}
```

#### **Get All Cycle Entries** (Protected)
```bash
GET /api/cycles
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "entries": [ ... ],
  "count": 5
}
```

#### **Get Latest Cycle Entry** (Protected)
```bash
GET /api/cycles/latest
Authorization: Bearer JWT_TOKEN_HERE
```

#### **Get Cycle Predictions** (Protected)
```bash
GET /api/cycles/predictions
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "predictions": {
    "nextPeriodDate": "2026-04-11T...",
    "fertileWindowStart": "2026-03-26T...",
    "fertileWindowEnd": "2026-03-30T...",
    "ovulationDate": "2026-03-28T...",
    "cycleLength": 28,
    "periodLength": 5
  }
}
```

#### **Get Cycle Statistics** (Protected)
```bash
GET /api/cycles/statistics
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "statistics": {
    "totalCycles": 12,
    "averageCycleLength": 28,
    "averagePeriodLength": 5,
    "minCycleLength": 26,
    "maxCycleLength": 30,
    "regularCycles": 10
  }
}
```

#### **Update Cycle Entry** (Protected)
```bash
PUT /api/cycles/:id
Authorization: Bearer JWT_TOKEN_HERE

{ "flow": "light", "notes": "Updated notes" }
```

#### **Delete Cycle Entry** (Protected)
```bash
DELETE /api/cycles/:id
Authorization: Bearer JWT_TOKEN_HERE
```

---

### **3. Pregnancy Tracker** (`/api/pregnancy`)

#### **Create Pregnancy Entry** (Protected)
```bash
POST /api/pregnancy
Authorization: Bearer JWT_TOKEN_HERE

{
  "dueDate": "2026-12-15",
  "weight": 65.5,
  "bloodPressure": "120/80",
  "notes": "Check-up notes"
}

Response (201):
{
  "message": "Pregnancy entry created successfully",
  "entry": {
    "id": 1,
    "userId": 1,
    "dueDate": "2026-12-15",
    "currentTrimester": 1,
    "weekNumber": 3,
    "dayNumber": 7,
    "weight": 65.5,
    "bloodPressure": "120/80",
    "notes": "..."
  }
}
```

#### **Get All Pregnancy Entries** (Protected)
```bash
GET /api/pregnancy
Authorization: Bearer JWT_TOKEN_HERE
```

#### **Get Latest Pregnancy Entry** (Protected)
```bash
GET /api/pregnancy/latest
Authorization: Bearer JWT_TOKEN_HERE
```

#### **Get Pregnancy Progress** (Protected)
```bash
GET /api/pregnancy/progress
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "progress": {
    "weekNumber": 20,
    "dayNumber": 3,
    "currentTrimester": 2,
    "daysRemaining": 197,
    "weeksRemaining": 28,
    "estimatedDueDate": "2026-12-15T...",
    "pregnancyStatus": "ongoing"
  },
  "currentMilestone": "Halfway through pregnancy, major organs formed"
}
```

#### **Get Health Metrics** (Protected)
```bash
GET /api/pregnancy/metrics
Authorization: Bearer JWT_TOKEN_HERE

Response (200):
{
  "metrics": {
    "totalCheckups": 5,
    "averageWeight": "67.5",
    "minimumWeight": "65.5",
    "maximumWeight": "70.0",
    "weightGain": "4.5",
    "pressureReadings": 5
  }
}
```

#### **Get Milestone for Week** (Protected)
```bash
GET /api/pregnancy/milestone/:week
Authorization: Bearer JWT_TOKEN_HERE

# Example:
GET /api/pregnancy/milestone/20

Response (200):
{
  "week": 20,
  "milestone": "Halfway through pregnancy, major organs formed"
}
```

#### **Update Pregnancy Entry** (Protected)
```bash
PUT /api/pregnancy/:id
Authorization: Bearer JWT_TOKEN_HERE

{ "weight": 68.5, "bloodPressure": "118/78" }
```

#### **Delete Pregnancy Entry** (Protected)
```bash
DELETE /api/pregnancy/:id
Authorization: Bearer JWT_TOKEN_HERE
```

---

## 🔐 Authentication

All protected endpoints require JWT token in the Authorization header:

```bash
Authorization: Bearer <JWT_TOKEN>
```

**Token expires in:** 7 days

---

## 🗄️ Database Schema

### **users**
- id (INT, Primary Key)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- name (VARCHAR)
- phoneNumber (VARCHAR)
- dateOfBirth (DATE)
- role (ENUM: 'user', 'admin')
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### **cycle_entries**
- id (INT, Primary Key)
- userId (INT, Foreign Key)
- lastPeriodDate (DATE)
- cycleLength (INT)
- periodLength (INT)
- regularCycle (BOOLEAN)
- symptoms (JSON)
- flow (VARCHAR)
- notes (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### **pregnancy_entries**
- id (INT, Primary Key)
- userId (INT, Foreign Key)
- dueDate (DATE)
- currentTrimester (INT)
- weekNumber (INT)
- dayNumber (INT)
- weight (DECIMAL)
- bloodPressure (VARCHAR)
- notes (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### **vaccinations** (Reserved)
### **sleep_logs** (Reserved)
### **daily_logs** (Reserved)

---

## 📊 Sample Requests Using cURL

### **Sign Up and Get Token**
```bash
curl -X POST http://localhost:5001/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aditya@example.com",
    "password": "pass123456",
    "confirmPassword": "pass123456",
    "name": "Aditya"
  }'
```

### **Login**
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aditya@example.com",
    "password": "pass123456"
  }'
```

### **Create Cycle Entry**
```bash
curl -X POST http://localhost:5001/api/cycles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lastPeriodDate": "2026-03-20",
    "cycleLength": 28,
    "periodLength": 5
  }'
```

---

## ✅ Testing Checklist

- [x] User signup with password hashing
- [x] User login with JWT token generation
- [x] Protected routes with JWT verification
- [x] Create cycle entries with automatic calculations
- [x] Get cycle predictions (fertile window, ovulation)
- [x] Get cycle statistics
- [x] Create pregnancy entries
- [x] Calculate pregnancy progress from due date
- [x] Get pregnancy milestones
- [x] Get pregnancy health metrics
- [x] All CRUD operations working
- [x] Error handling and validation

---

## 🐛 Error Responses

All errors return appropriate HTTP status codes:

```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized (missing token)
- 403 Forbidden (invalid token)
- 404 Not Found
- 409 Conflict (duplicate email)
- 500 Server Error

---

## 🚀 Next Steps (Frontend Integration)

1. Connect frontend to `http://localhost:5001`
2. Update CORS settings if needed
3. Store JWT token in localStorage
4. Add token to all API requests in Authorization header
5. Implement logout (clear localStorage)
6. Handle token expiration (redirect to login)

---

## 📞 API Base URL

```
http://localhost:5001
```

**Environment Variables (.env):**
```env
PORT=5001
DB_HOST=localhost
DB_USER=empoweruser
DB_PASSWORD=empowerpass123
DB_NAME=empowerNest
DB_PORT=3307
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

Created by: Aditya  
Date: 2026-03-30  
Status: ✅ Complete & Tested
