# 🚀 Vercel Deployment Guide - EmpowerNest

## **Why Deploy on Vercel?**

✅ **Live URL** - Share with Aditya for testing  
✅ **Automatic Deployments** - Updates when you push to GitHub  
✅ **Environment Variables** - Easy config management  
✅ **Preview Deployments** - Test features on branches before merging  
✅ **Free tier** - Good for development and class projects  
✅ **Fast & Reliable** - Perfect for React apps  

---

## **Step-by-Step Deployment**

### **Step 1: Create Vercel Account** (5 minutes)

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"GitHub"** (connects to your repo)
4. Authorize Vercel to access your GitHub account
5. Complete signup

---

### **Step 2: Import Your GitHub Project** (3 minutes)

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Find **"EmpowerNest-Pregnancy-Wellness-Platform"**
4. Click **"Import"**

---

### **Step 3: Configure Project Settings** (5 minutes)

On the import screen, you'll see:

#### **Project Name:**
- Leave as default or rename to `empowernest`

#### **Framework Preset:**
- Should auto-detect as **Vite** ✓

#### **Root Directory:**
- Leave as default (`.`) ✓

#### **Build Command:**
- Should auto-detect as: `bun run build` ✓
- (or `npm run build` if you prefer)

#### **Output Directory:**
- Should auto-detect as: `dist` ✓

#### **Environment Variables:** (Click to add)

```
# Add these variables:
VITE_API_URL=http://localhost:5000

# Later, when Aditya has backend deployed:
VITE_API_URL=https://your-backend-url.com
```

---

### **Step 4: Deploy** (1 minute)

Click **"Deploy"** button

**Vercel will:**
1. Clone your GitHub repo
2. Install dependencies
3. Build the project (`bun run build`)
4. Deploy to their servers
5. Give you a live URL

---

### **Step 5: Your Live URL**

After deployment, you'll get:
```
https://empowernest-[random].vercel.app
```

**Share this URL with Aditya!**

---

## **🔄 Auto-Deployment Setup**

### **How It Works:**

Vercel automatically deploys when you:
1. Push to `main` branch
2. Create a Pull Request (preview deployment)
3. Merge PR to main (production deployment)

**No manual deployment needed!**

---

## **📋 Deployment Checklist**

Before deploying:

- [x] Project is on GitHub
- [x] All files are committed
- [x] `.env.local` is in `.gitignore` (don't commit secrets)
- [x] `bun run build` works locally
- [x] No build errors

---

## **🔧 Troubleshooting Deployment**

### **"Build Failed"**

Common causes:
```
✗ Missing dependencies
  → Check package.json
  → Run: npm install / bun install

✗ TypeScript errors
  → Check for type issues
  → Run locally: npm run build

✗ Environment variables missing
  → Add VITE_API_URL in Vercel settings

✗ Port 5173 conflict
  → Vercel uses different port, this is fine
```

**Fix:**
1. Check the build error in Vercel dashboard
2. Fix locally: `npm run build`
3. Push to GitHub
4. Vercel auto-redeploys

---

## **📱 Testing Deployed Frontend**

### **Live URL:** https://empowernest-[random].vercel.app

**What to test:**
- ✅ Pages load correctly
- ✅ Dark/Light mode works
- ✅ Forms are functional
- ✅ Navigation works
- ✅ Responsive design on mobile

**What Won't Work Yet:**
- ❌ Login/Signup (no backend)
- ❌ Saving data (no database)
- ❌ API calls (will error)

Once Aditya has backend ready:
- Update `.env` → `VITE_API_URL` to backend URL
- Re-deploy
- Test full integration

---

## **🔐 Environment Variables in Vercel**

### **How to Add/Update Variables:**

1. Go to your Vercel project dashboard
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Add variables:
   - Name: `VITE_API_URL`
   - Value: `http://localhost:5000` (dev) or deployed backend URL (prod)
5. Click **"Save"**
6. **Redeploy** is automatic

---

## **🌳 Deployment Branches**

### **Main Branch (Production)**
- URL: `https://empowernest-[random].vercel.app`
- Deployed automatically when you push to main
- Should only have stable code

### **Feature Branches (Preview)**
- URL: `https://feat-[feature]-[random].vercel.app`
- Created automatically when you push feature branch
- Great for testing before merging
- Shared via PR link

**Example:**
```bash
git checkout -b feat/ridhima/api-integration
# Make changes
git push origin feat/ridhima/api-integration
# Vercel creates preview URL automatically!
```

---

## **📊 Vercel Dashboard Features**

Once deployed, you get:

### **Overview Tab:**
- Deployment status
- Build/Deployment time
- Environment variables
- Domain routes

### **Deployments Tab:**
- History of all deployments
- See when each was deployed
- Rollback to previous version if needed

### **Settings Tab:**
- Environment variables
- Build settings
- Domains (add custom domain later)
- Git integration settings

### **Logs Tab:**
- Build logs (see errors)
- Function logs (if using serverless)

---

## **🔄 Continuous Integration Flow**

Your workflow:

```
1. Make changes locally
2. Test: npm run dev
3. Commit: git add . && git commit -m "feat: ..."
4. Push: git push origin feat/ridhima/...
5. ↓
   Vercel creates PREVIEW deployment
   ↓
   Preview URL appears in GitHub PR
6. Review → Merge PR
   ↓
   Vercel deploys to PRODUCTION
   ↓
   https://empowernest-[random].vercel.app updated
```

---

## **🤝 Sharing with Aditya**

### **For Testing Integration:**

```
Hi Aditya!

I've deployed the frontend on Vercel:
https://empowernest-[random].vercel.app

When you have endpoints ready:
1. Share your backend URL
2. I'll update environment variables
3. You can test your API with the frontend

Current status:
- Frontend: Live
- Backend: In development
- Database: You're building
- Integration: Ready to test
```

---

## **⚡ Quick Commands to Memorize**

```bash
# Test build locally before pushing
npm run build

# Deploy to Vercel (automatic via GitHub)
git push origin main

# See build status
# Go to https://vercel.com/dashboard → Your Project

# Share preview URL
# Link from GitHub PR or Vercel dashboard
```

---

## **🎯 Deployment Checklist**

**Before First Deployment:**
- [ ] GitHub account ready
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] No `.env` file in git

**After Each Change:**
- [ ] Code works locally
- [ ] Commit with clear message
- [ ] Push to GitHub
- [ ] Vercel auto-deploys
- [ ] Check live URL for updates

---

## **📝 Environment Variables Setup**

### **For Development (Local):**
File: `.env.local`
```
VITE_API_URL=http://localhost:5000
```

### **For Production (Vercel):**
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add:
   - Variable Name: `VITE_API_URL`
   - Value: `https://your-backend-api.com`
   - Select: Production
4. Save and re-deploy

---

## **🔗 Custom Domain (Future)**

When project is complete, add custom domain:

1. Go to Vercel project
2. Settings → Domains
3. Add your domain
4. Update DNS records
5. Vercel provides instructions

Can wait for after evaluations! 

---

## **🚨 Important Notes**

1. **Free Tier Limits:**
   - 100 deployments/month ✓ (enough for you)
   - 6,000 build minutes/month ✓ (plenty)
   - Production deployments unlimited ✓

2. **CORS Issue:**
   - Frontend: `https://empowernest-[random].vercel.app`
   - When Aditya deploys backend, update CORS settings in Express to allow this URL

3. **Environment Variables:**
   - Never commit `.env` file
   - Add to `.gitignore` (already done)
   - Set in Vercel dashboard instead

4. **Redeploy If Needed:**
   - Vercel → Deployments → Select old → Click "Redeploy"
   - Or push new commit to trigger deploy

---

## **📱 Mobile Testing**

**Easy Mobile Testing:**
1. Get Vercel URL
2. Open on phone browser
3. Test responsive design
4. Share preview URL with team

---

## **🎉 After Deployment**

You'll have:
✅ Live frontend at: `https://empowernest-[random].vercel.app`  
✅ Auto-deployment on every push  
✅ Preview URLs for feature branches  
✅ Environment variables managed  
✅ Easy testing with Aditya  
✅ Shareable link for evaluations  

---

## **📞 Next Steps**

1. **Right Now:**
   - Create Vercel account
   - Import GitHub project
   - Set environment variables
   - Deploy

2. **Share URL with Aditya:**
   - Tell him the live frontend URL
   - Explain what's working
   - When backend ready, he'll provide API URL
   - You update and test integration

3. **Keep Developing:**
   - Work locally with `npm run dev`
   - Test to ensure it works
   - Push to GitHub
   - Vercel auto-deploys
   - Check live URL for updates

---

## **Vercel Links**

- **Dashboard:** https://vercel.com/dashboard
- **Documentation:** https://vercel.com/docs
- **React Guide:** https://vercel.com/guides/deploying-react-with-vercel
- **Vite Guide:** https://vercel.com/guides/vite

---

**You're ready to deploy! Your frontend will be live in minutes! 🚀**

---

Generated: March 30, 2026
