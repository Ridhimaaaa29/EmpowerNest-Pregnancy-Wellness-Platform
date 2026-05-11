# MySQL Setup Guide for EmpowerNest

## ✅ Option 1: Using MySQL Docker (Recommended)

If Docker is running on your machine:

```bash
# Navigate to project root
cd /Users/adityachawla/Desktop/EMPOWERNEST/EmpowerNest-Pregnancy-Wellness-Platform

# Start MySQL in Docker
docker-compose up -d

# Verify container is running
docker ps | grep empowernest_mysql

# Connection details:
# Host: localhost
# Port: 3306
# Root Password: root
# User: empoweruser
# Password: empowerpass123
# Database: empowerNest
```

---

## ✅ Option 2: Manual MySQL Setup (Local Installation)

### Step 1: Start MySQL Server

```bash
# If MySQL is installed via Homebrew
brew services start mysql

# Or if using local installation
/usr/local/mysql/support-files/mysql.server start
sudo chown -R _mysql:_mysql /usr/local/mysql/data
```

### Step 2: Run the SQL Setup File

```bash
# Option A: Run SQL file directly
mysql -u root < /Users/adityachawla/Desktop/EMPOWERNEST/EmpowerNest-Pregnancy-Wellness-Platform/backend/config/database.sql

# Option B: Manually in MySQL shell
mysql -u root
```

Then paste all SQL from: `backend/config/database.sql`

### Step 3: Verify Setup

```bash
mysql -u root -e "SHOW DATABASES;" | grep empowerNest
mysql -u root -e "USE empowerNest; SHOW TABLES;"
```

---

## 📝 Update .env File

Edit `backend/.env` with your credentials:

```env
# For Docker setup:
DB_HOST=localhost
DB_USER=empoweruser
DB_PASSWORD=empowerpass123
DB_NAME=empowerNest
DB_PORT=3306

# For local MySQL setup (default):
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=empowerNest
DB_PORT=3306
```

---

## ✅ Test Connection

Once MySQL is running and .env is updated:

```bash
cd /Users/adityachawla/Desktop/EMPOWERNEST/EmpowerNest-Pregnancy-Wellness-Platform/backend

# The server will automatically test the connection on startup
npm run dev

# Look for: ✅ MySQL Database Connected Successfully!
```

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| Access denied | Check .env DB_USER and DB_PASSWORD match your MySQL setup |
| Connection refused | Verify MySQL is running: `mysql -u root -e "SELECT 1;"` |
| Database not found | Run the SQL file again: `< backend/config/database.sql` |
| Port already in use | Change DB_PORT in .env or stop other MySQL instances |

---

## 📌 Quick Commands

```bash
# Stop MySQL
brew services stop mysql

# Check MySQL status
brew services list | grep mysql

# Enter MySQL shell
mysql -u root -p

# Show all databases
SHOW DATABASES;

# Connect to empowerNest
USE empowerNest;

# Show all tables
SHOW TABLES;
```

Done! Let me know which option you're using. 👇
