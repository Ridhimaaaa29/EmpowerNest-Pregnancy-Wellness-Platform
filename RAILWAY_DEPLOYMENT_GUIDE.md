# Railway Deployment Guide - EmpowerNest Backend

Complete step-by-step guide to deploy your Express backend + MySQL database on Railway.

---

## **Step 1: Create Railway Account**

1. Go to [Railway.app](https://railway.app)
2. Click **"Start Project"**
3. Sign up with GitHub (recommended)
4. Authorize Railway to access your GitHub account

---

## **Step 2: Create New Project**

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Search for: `EmpowerNest-Pregnancy-Wellness-Platform`
4. Select your fork/repository
5. Click **"Deploy"**

---

## **Step 3: Select Deployment Folder**

1. Railway will show project structure
2. Select `/backend` folder as root
3. Click **"Deploy"**

Railway will start building your backend automatically.

---

## **Step 4: Add MySQL Database Service**

While backend is deploying, add MySQL:

1. In your Railway project, click **"+ New"** button
2. Select **"Database"** → **"MySQL"**
3. Railway will create MySQL instance automatically
4. Note the database credentials (shown in Railway dashboard)

---

## **Step 5: Configure Environment Variables**

Backend needs environment variables to connect to MySQL and Render properly.

### In Railway Dashboard:

1. Go to your **Backend service**
2. Click **"Variables"** tab
3. Add these variables:

```
DB_HOST=<from MySQL service connection string>
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<from MySQL service>
DB_NAME=empowerNest
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://empowernest-vercel.vercel.app,http://localhost:8081
NODE_ENV=production
```

**How to get MySQL credentials:**

1. Click on the **MySQL service** in Railway
2. Go to **"Connect"** tab
3. Copy connection details:
   - Host
   - Port
   - Username
   - Password
   - Database

---

## **Step 6: Get Backend URL**

Once deployment completes:

1. Go to Backend service settings
2. Look for **"Public URL"** or **"Domain"**
3. It will be something like: `https://empowernest-backend-prod.up.railway.app`

**Copy this URL!** You'll need it for Vercel.

---

## **Step 7: Update Vercel Environment Variable**

Now update your Vercel frontend with the Railway backend URL:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your **EmpowerNest project**
3. Go to **Settings** → **Environment Variables**
4. **Update** the `VITE_API_URL` variable:

```
VITE_API_URL=https://empowernest-backend-prod.up.railway.app
```

5. Redeploy frontend (Vercel auto-redeploys on git push)

---

## **Step 8: Test Backend Connection**

Test if backend is running:

```bash
curl https://empowernest-backend-prod.up.railway.app/api/health
```

You should see:
```json
{
  "message": "EmpowerNest Backend is running!",
  "status": "OK",
  "timestamp": "2026-03-31T05:30:00.000Z"
}
```

---

## **Step 9: Test Database Connection**

The backend will automatically initialize the MySQL database on first run.

Check in Railway logs if database creation succeeded:

1. Go to Backend service → **"Deployments"**
2. Click latest deployment
3. View **"Logs"** tab
4. Look for messages about database connection

---

## **Step 10: Test Frontend-Backend Integration**

1. Go to your Vercel deployment: `https://empowernest-yourusername.vercel.app`
2. Sign up with test account
3. Add cycle data
4. Refresh page - data should persist ✅

---

## **Troubleshooting**

### **Backend won't deploy?**
- Check Railway Logs for errors
- Ensure `/backend` folder is selected as root
- Verify `package.json` has start script: `node server.js`

### **Database connection error?**
- Verify DB credentials in environment variables
- Ensure MySQL service is running in Railway
- Check `DB_HOST` is the correct MySQL container hostname

### **Frontend can't reach backend?**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS is enabled in backend: `credentials: true`
- Frontend must use `https://` (not `http://`)

### **Session/Cookie issues?**
- Ensure backends runs on HTTPS (Railway does this automatically)
- Check cookie domain settings if using custom domain
- Verify `SameSite=Lax` in backend cookie configuration

---

## **Environment Variables Reference**

| Variable | Example | Notes |
|----------|---------|-------|
| `DB_HOST` | `mysql.railway.internal` | Railway internal DNS |
| `DB_PORT` | `3306` | Default MySQL port |
| `DB_USER` | `root` | From MySQL service |
| `DB_PASSWORD` | `abc123xyz` | From MySQL service |
| `DB_NAME` | `empowerNest` | Database name |
| `JWT_SECRET` | `your-secret-key` | Change in production! |
| `JWT_EXPIRE` | `7d` | Token expiration |
| `ALLOWED_ORIGINS` | `https://yourdomain.vercel.app` | Frontend URL |
| `NODE_ENV` | `production` | Auto set |

---

## **After Deployment Checklist**

- ✅ Backend deployed on Railway
- ✅ MySQL database created and connected
- ✅ Environment variables set correctly
- ✅ Backend URL copied to Vercel `VITE_API_URL`
- ✅ Frontend redeployed on Vercel
- ✅ Can sign up and login on production
- ✅ Cycle/pregnancy data persists across sessions
- ✅ Different users see different data

---

## **Cost Breakdown (Railway Free Tier)**

- **Backend**: Free tier available
- **MySQL**: Included in free tier (5GB storage)
- **Total**: Free! (Upgrade when needed)

---

## **Next Steps**

1. ✅ Deploy backend on Railway
2. ✅ Update Vercel environment variables
3. ✅ Test frontend-backend integration
4. ✅ Share live URL with Ridhima for testing
5. ✅ Monitor Railway dashboard for errors
6. ✅ Set up alerts (optional)

---

## **Useful Railway Links**

- [Railway Documentation](https://docs.railway.app)
- [MySQL on Railway](https://docs.railway.app/databases/mysql)
- [Environment Variables](https://docs.railway.app/develop/variables)
- [Custom Domains](https://docs.railway.app/develop/domains)

---

**Your project will be LIVE and FULLY FUNCTIONAL! 🚀**

All users will get their own secure sessions + isolated data stored in MySQL.
