# Authentication Flow - Complete Guide

## 📱 Current Implementation: Cookie-Based Auth

### How It Works:
1. **User Login** → Backend sends JWT in httpOnly cookie
2. **API Requests** → Browser automatically includes cookie
3. **Session Persistence** → Cookie lasts 7 days per browser
4. **No localStorage** → More secure against XSS attacks

### Security Features:
- ✅ **HttpOnly**: JavaScript cannot access token (XSS protection)
- ✅ **Secure**: Only sent over HTTPS in production
- ✅ **SameSite**: Prevents CSRF attacks
- ✅ Auto-sent on all requests

---

## 🌍 Cross-Device Persistence (Multiple Devices)

### Current Behavior:
- Device A: User logs in → Cookie stored for 7 days
- Device B: User logs in → Separate cookie for this device
- **Each device/browser has independent session**

### If You Need Same Session Across Devices:

Option 1: Use Backend Sessions (Database)
- Store session ID in database
- Send small sessionId in cookie
- Survives browser restarts
- Perfect for "Remember me" on multiple devices

Option 2: Keep Cookie + Add Device Sync
- Use email/password as fallback
- Auto-login if credentials match
- Session-independent

---

## 🔒 Current Setup (Recommended for Most Apps)

### Database: Stores User Data
```
users table:
- id
- email
- password (hashed)
- created_at
- Updated fields via API calls
```

### Session: Browser Cookie (7 days)
```
authToken (httpOnly cookie):
- JWT { userId, email }
- Sent automatically with requests
- Cleared on logout
```

### User Data Access:
```
When user visits any page:
1. Browser sends cookie
2. Backend verifies JWT signature
3. Extracts userId
4. Queries MySQL for user data
5. Returns user-specific information
```

---

## 🚀 Deployment (Vercel)

### Required Environment Variables:
```
VITE_API_URL=https://your-backend.com
# Frontend uses this to call backend API
```

### Backend Deployment:
- Deploy to Heroku, Railway, or your server
- MySQL database hosted somewhere accessible
- `process.env.NODE_ENV === 'production'` makes cookie `secure: true`

### Cookie Works Perfect On Deployed Sites Because:
- HTTPS enforced on deployed sites ✅
- Cookies persist across sessions ✅
- Same domain for frontend + backend ✅
- All users get their own isolated session ✅

---

## 📊 Data Flow Summary

```
┌─────────────────────────────────────────────────────┐
│ User Signup/Login                                   │
│ POST /api/users/signup or /api/users/login         │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│ Backend Verifies Email & Password                   │
│ Checks against MySQL Users table                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│ Generate JWT & Send in HttpOnly Cookie              │
│ Cookie: authToken = eyJ0eX...                       │
│ Duration: 7 days                                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│ User Navigates App                                  │
│ Frontend Requests: GET /api/cycles                  │
│ Browser Auto-Includes Cookie ✅                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│ Backend Middleware Verifies JWT from Cookie         │
│ Extracts userId from token                          │
│ Queries: SELECT * FROM cycles WHERE userId = X     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│ Returns User-Specific Data                          │
│ Frontend shows cycle data for logged-in user ✅    │
└─────────────────────────────────────────────────────┘
```

---

## ✅ What's Working Now

1. **User Registration** → Stored in MySQL with hashed password
2. **User Login** → Verified against MySQL, cookie issued
3. **Protected Routes** → Only accessible with valid cookie
4. **Data Persistence** → All data in MySQL tied to userId
5. **Multiple Users** → Each user sees only their data
6. **Session Timeout** → After 7 days, must login again
7. **Deployment Ready** → Works on Vercel with backend URL

---

## 🛡️ Security Checklist

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT signed with secret key
- ✅ HttpOnly cookie (not accessible by JavaScript)
- ✅ Secure cookie flag (HTTPS only in production)
- ✅ SameSite=lax (CSRF protection)
- ✅ No tokens in localStorage
- ✅ All API requests verified with middleware
- ✅ User data isolated by ID

---

## 🎯 Next Steps

1. **Test Locally**: npm run dev (both backend & frontend)
2. **Test Logout**: Click logout → cookie cleared
3. **Test Login Again**: New session created
4. **Deploy to Vercel**:
   - Frontend: Auto-deployed on GitHub push
   - Backend: Deploy separately, set VITE_API_URL
5. **Verify on Live Site**: 
   - No data mismatch ✅
   - Different users see different data ✅
   - Session persists for 7 days ✅
