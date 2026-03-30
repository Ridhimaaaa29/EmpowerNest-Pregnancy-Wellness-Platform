# 🚀 Backend Setup Instructions

## Option 1: Using Docker (Recommended)

1. **Install Docker Desktop** from: https://www.docker.com/products/docker-desktop

2. **Start Docker Desktop** (Open the application)

3. **Run Docker Compose:**
   ```bash
   cd c:\Users\USER\Downloads\EmpowerNest
   docker-compose up -d
   ```

4. **Wait 10-15 seconds** for MySQL to start

5. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

---

## Option 2: Using Local MySQL Installation

If you have MySQL Server installed locally:

1. **Create the database and tables:**
   ```bash
   mysql -u root -p
   ```

2. **Run SQL from `backend/config/database.sql`:**
   ```sql
   CREATE DATABASE IF NOT EXISTS empowerNest;
   USE empowerNest;
   
   -- [Copy the rest of SQL from database.sql file]
   ```

3. **Update `.env` file in `backend/` folder:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=empowerNest
   DB_PORT=3306
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

---

## Quick Test Commands

Check if Docker is running:
```bash
docker --version
docker ps
```

Check if MySQL is running on Docker:
```bash
docker ps     # Look for "empowerNest_mysql"
docker logs empowerNest_mysql
```

Check if backend is running:
```bash
curl http://localhost:5000/api/health
```

---

## Status

- ✅ Frontend: Running on http://localhost:8080/
- ⏳ Backend: Waiting for MySQL connection
- ⏳ MySQL: Needs Docker or local installation

**Which option would you like to use?**
