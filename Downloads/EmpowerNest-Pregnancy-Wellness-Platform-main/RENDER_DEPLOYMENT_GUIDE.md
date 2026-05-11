# Deploy EmpowerNest Backend on Render

## Overview
This guide helps you deploy the Node.js backend to Render.com with a hosted MySQL database.

---

## **Step 1: Set Up Hosted MySQL Database**

### Option A: Use Render's PostgreSQL (Easiest)
Unfortunately Render doesn't offer MySQL, but offers PostgreSQL (similar). However, we'll use an external service.

### Option B: Use Aiven for MySQL (Recommended)
1. Go to https://aiven.io
2. Sign up (free tier available)
3. Create a new MySQL Service
4. Choose region close to your users
5. Wait for service to be ready
6. Copy connection details:
   - **Host**: (provided by Aiven)
   - **User**: (provided)
   - **Password**: (provided)
   - **Port**: 3306
   - **Database**: empowerNest (create this)

### Option C: Use Railway MySQL
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Add MySQL
4. Copy connection details

---

## **Step 2: Create Database on Hosted MySQL**

Connect to your MySQL and run:

```sql
-- Create database
CREATE DATABASE empowerNest;

-- Use database
USE empowerNest;

-- Run schema from backend/config/database.sql
-- (copy the CREATE TABLE commands from that file)
```

Or execute the SQL file directly through your hosting provider's console.

---

## **Step 3: Create Render Web Service**

### 3.1 Git Push Backend to Separate Repository (Optional)
If your backend isn't in a separate repo, create one:

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/your-username/EmpowerNest-Backend.git
git push -u origin main
```

Or you can deploy the full repo and specify the subdirectory.

### 3.2 Create Service on Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Select your backend repository
5. Fill in details:
   - **Name**: `empowernest-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Close to your users
   - **Plan**: Free tier (sufficient for testing)
   - **Root Directory**: `backend` (if backend is in subdirectory)

6. Click **Advanced** and add Environment Variables (see Step 4)

---

## **Step 4: Set Environment Variables on Render**

In Render dashboard, go to your Web Service → **Environment**:

Add these variables:

```
DB_HOST=your-aiven-host.aivencloud.com
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=empowerNest
DB_PORT=3306

PORT=5001
NODE_ENV=production

JWT_SECRET=generate-a-secure-random-string-here-32-chars

ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.your-frontend.vercel.app
```

**Generate JWT_SECRET**:
```bash
# On your Mac, run:
openssl rand -base64 32
```

Copy the output and paste as JWT_SECRET.

---

## **Step 5: Deploy & Get URL**

1. Render automatically deploys when you push to main
2. Or click **Trigger Deploy** button
3. Wait for build to complete (takes 2-3 minutes)
4. Copy the **URL** provided:
   ```
   https://empowernest-backend.onrender.com
   ```

---

## **Step 6: Update Frontend on Vercel**

Update your Vercel environment variable:

```
VITE_API_URL=https://empowernest-backend.onrender.com
```

---

## **Step 7: Test Deployment**

```bash
# Test health endpoint
curl https://empowernest-backend.onrender.com/api/health

# Should return:
{"message":"EmpowerNest Backend is running!","status":"OK",...}

# Test signup
curl -X POST https://empowernest-backend.onrender.com/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "confirmPassword": "TestPassword123",
    "name": "Test User"
  }'
```

---

## **Troubleshooting**

### Issue: "Cannot connect to database"
- Verify all DB environment variables are correct
- Check database is running and accessible from Render's IP
- Aiven may require allowlisting Render IPs: Go to Aiven console → IP Allowlist → Add Render region

### Issue: "Request origin not allowed"
- Update ALLOWED_ORIGINS to include your Vercel frontend URL
- Format: `https://your-site.vercel.app`

### Issue: Render keeps crashing
- Check logs on Render dashboard
- Verify NODE_ENV=production
- Ensure all required packages are installed

---

## **Important Notes**

1. **Render Free Tier**: Services spin down after 15 minutes of inactivity
   - Upgrade to paid if you need always-on
   
2. **Database Backups**: Your MySQL provider should have backups
   - Aiven: Check backup settings
   - Railway: Automatic backups included

3. **Logs**: Check Render logs for any errors:
   - Dashboard → Web Service → Logs

4. **Custom Domain**: Add your domain in Render settings (optional)

---

## **Architecture After Deployment**

```
Vercel Frontend
    ↓ (API calls)
    ↓ VITE_API_URL=https://empowernest-backend.onrender.com
    ↓
Render Backend (Node.js + Express)
    ↓ (MySQL queries)
    ↓
Aiven MySQL Database
    ↓
User Data Persisted
```

---

## **Security Checklist**

- ✅ JWT_SECRET: Strong random string (32+ chars)
- ✅ Node Environment: production
- ✅ HTTPS: Automatic on Render & Vercel
- ✅ CORS: Only allow your frontend domain
- ✅ Database: Password protected
- ✅ Credentials: Never commit .env file

---

## **Support**

- Render Docs: https://render.com/docs
- Aiven Docs: https://aiven.io/docs
- Contact support if deployment issues persist

---

**Your backend is now deployed! 🚀**
