# Vercel Deployment - Complete Step-by-Step Guide

Your app is now ready for 100% free deployment on Vercel! Follow these steps:

---

## **STEP 1: Set Up PlanetScale MySQL Database**

### 1.1 Create PlanetScale Account
- Go to https://planetscale.com
- Click **"Sign Up"**
- Sign up with GitHub (recommended)
- Create or use default organization

### 1.2 Create Database
- Click **"Create a new database"**
- Database name: `empowernest`
- Select region closest to you (e.g., `us-east`)
- Click **"Create database"**

### 1.3 Get Connection String
1. Open your database
2. Click **"Connect"** button (top right)
3. Select **"Node.js"** from dropdown
4. Copy the connection string (looks like):
```
mysql://[username]:[password]@[host]/empowernest?sslaccept=strict
```
5. **Save this!** You'll need it in Step 2

### 1.4 Create Tables
1. In PlanetScale dashboard, click your database
2. Click **"Console"** tab
3. Copy entire content from [PLANETSCALE_SETUP.sql](PLANETSCALE_SETUP.sql)
4. Paste into console
5. Press **Enter/Run**
6. You should see: "Tables created successfully ✓"

---

## **STEP 2: Deploy to Vercel**

### 2.1 Connect GitHub to Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"** (or login if you have account)
3. Select **"Continue with GitHub"**
4. Authorize Vercel to access GitHub

### 2.2 Import Your Project
1. After logging in, click **"Add New"** → **"Project"**
2. Select **"Import Git Repository"**
3. Search for: `EmpowerNest-Pregnancy-Wellness-Platform`
4. Click **"Import"**

### 2.3 Configure Project Settings
In the "Configure Project" page:

1. **Framework Preset**: Select **"Other"**
2. **Root Directory**: Leave empty (default)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

Then scroll down to **"Environment Variables"**

### 2.4 Add Environment Variables
Add these variables (copy from PlanetScale + create JWT secret):

| Name | Value | Get From |
|------|-------|----------|
| `DATABASE_URL` | Your connection string from PlanetScale | PlanetScale Console |
| `JWT_SECRET` | `your-super-secret-key-12345` | **Create your own!** (long random string) |

**Example DATABASE_URL:**
```
mysql://[user]:[password]@pscale_g1a2b3c4.us-east.psdb.cloud/empowernest?sslaccept=strict
```

### 2.5 Deploy!
Click **"Deploy"** button

**Wait 2-3 minutes for deployment to complete.**

When done, you'll see:
```
✓ Deployment complete!
Visit: https://empowernest.vercel.app
```

---

## **STEP 3: Test Your Deployment**

### 3.1 Test Backend API
Open terminal and run:
```bash
curl https://your-project.vercel.app/api/health
```

You should see:
```json
{
  "message": "EmpowerNest Backend is running!",
  "status": "OK",
  "timestamp": "2026-03-31T..."
}
```

### 3.2 Test Signup
```bash
curl -X POST https://your-project.vercel.app/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

Response should include:
```json
{
  "message": "User created successfully",
  "token": "eyJ0eXAi...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Copy the token!** You'll use it to test other endpoints.

### 3.3 Test Protected Route (Profile)
```bash
curl https://your-project.vercel.app/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Should return your user profile. ✓

### 3.4 Open Your App
Go to your Vercel URL in browser:
```
https://your-project-name.vercel.app
```

You should see:
- Login page
- Signup option
- Can register and login
- Data saves to PlanetScale MySQL

---

## **STEP 4: How Data Flows**

### Architecture:
```
Browser (Frontend)
    ↓ (React + TypeScript)
    ↓
https://your-project.vercel.app
    ↓ (Shows UI)
    ↓ (Sends JWT token in Authorization header)
    ↓
Vercel Serverless Functions (/api)
    ↓ (Verifies JWT token)
    ↓ (Executes Node.js code)
    ↓
PlanetScale MySQL
    ↓ (Stores user data)
    ↓ (Each user sees only their data)
    ↓
Response back to browser
```

### What Happens When You Signup:
1. You fill form → Click "Sign Up"
2. Browser sends POST to `/api/users/signup` with name, email, password
3. Vercel Function receives request
4. Hashes password with bcryptjs
5. Creates user in PlanetScale MySQL
6. Generates JWT token
7. Sends token back to browser
8. Browser saves token to localStorage
9. Redirects you to `/tracker` page
10. All your data is tied to your user ID ✓

### What Happens When You Add Cycle Data:
1. Fill cycle form → Click "Save"
2. Browser sends POST to `/api/cycles` **with JWT token in header**
3. Vercel Function verifies token (ensures you're logged in)
4. Extracts your user ID from token
5. Saves cycle data to PlanetScale with your user_id
6. You see "Data saved successfully"
7. Next time you login → all your data is there ✓

---

## **STEP 5: Important Notes**

### Security ✓
- Tokens expire after 7 days (need to login again)
- Passwords hashed with bcryptjs (even we can't read them)
- JWT signature verified on every request
- Each user sees ONLY their data
- No data leakage between users

### Cold Starts
- First request might take 2-5 seconds (Vercel warming up)
- Subsequent requests are instant
- **This is normal for free tier!**

### Database Limits
- PlanetScale free tier: 5 GB storage
- More than enough for semester project
- MySQL pooling configured (max 5 connections)

### Scaling
- If you need more storage → Upgrade PlanetScale (paid)
- If you need more API calls → Upgrade Vercel (paid)
- Each starts free! Scale only when you need

---

## **STEP 6: Troubleshooting**

### Error: "DATABASE_URL is not defined"
**Solution**: Go to Vercel project → Settings → Environment Variables → Make sure `DATABASE_URL` is set

### Error: "Cannot connect to database"
**Solution**: 
1. Check DATABASE_URL value (no extra spaces)
2. Make sure PlanetScale database is created and tables exist
3. Try running SQL script again

### Error: "Invalid token"
**Solution**:
1. Make sure JWT_SECRET matches between signup and usage
2. Generate new token by logging in again
3. Check Authorization header format: `Bearer YOUR_TOKEN`

### Frontend shows "Login Required" but I'm logged in
**Solution**:
1. Clear localStorage: Open DevTools → Application → Clear localStorage
2. Refresh page
3. Login again

### Cycle data not saving
**Solution**:
1. Verify you're logged in (token in localStorage)
2. Check browser console for errors
3. Make sure cycle_entries table exists in PlanetScale

---

## **STEP 7: Going Live (Optional)**

### Custom Domain (Optional)
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain (if you have one)
4. Update DNS records as shown

### Monitoring (Optional)
1. Go to Vercel project → "Analytics"
2. See API usage, response times, errors
3. Get alerts if something breaks

### Backup Database (Optional)
1. PlanetScale has automatic backups
2. Go to your database → "Backups"
3. You can restore to any point

---

## **Summary**

✅ **What You Have:**
- Frontend deployed on Vercel (auto-deploys when you push to GitHub)
- Backend running as Vercel Serverless Functions
- MySQL database on PlanetScale (free tier)
- Complete user authentication
- Data persistence for each user
- Zero cost!

✅ **Project Ready For:**
- Team presentation
- Semester submission
- Adding more features
- Real user testing

✅ **Next Steps (Optional):**
- Add more fields to forms
- Add email verification
- Add password reset
- Add admin dashboard
- Performance optimization

---

## **URLs You'll Need**

- **Frontend**: https://your-project.vercel.app
- **Backend API**: https://your-project.vercel.app/api
- **Health Check**: https://your-project.vercel.app/api/health
- **PlanetScale Dashboard**: https://app.planetscale.com
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## **Quick Reference**

```bash
# Test backend is running
curl https://your-project.vercel.app/api/health

# Create account
curl -X POST https://your-project.vercel.app/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Pass123"}'

# Login (get token)
curl -X POST https://your-project.vercel.app/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass123"}'

# Use token to access protected routes
curl https://your-project.vercel.app/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Add cycle data
curl -X POST https://your-project.vercel.app/api/cycles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"cycleLengthDays":28,"cycleStartDate":"2026-03-31"}'
```

---

**Your app is ready to share with the world! 🚀**

Have questions? Check the Common Issues section or reach out to your team!
