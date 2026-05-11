# localStorage Authentication Setup

## Overview

The project is now using **frontend-only authentication with localStorage**. This means:

- ✅ No backend server calls needed for login/signup
- ✅ Demo-friendly (works offline)
- ✅ Easy to test and present
- ✅ Can be extended later with Docker MySQL backend

---

## Architecture

```
User Input (Login/Signup)
    ↓
localStorage Auth Service
    ↓
localStorage (stores users & session)
    ↓
Protected Routes Check
    ↓
App Dashboard
```

---

## How It Works

### 1. User Data Storage (localStorage)

When you signup/login, user data is stored in browser localStorage:

```javascript
// Users are stored as JSON in localStorage['empowernest_users']
[
  {
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    phone: "1234567890",
    dateOfBirth: "1995-05-15"
  }
]

// Current session stored in localStorage['empowernest_auth']
{
  token: "local_1234567890",
  user: {
    email: "user@example.com",
    name: "John Doe",
    phone: "1234567890",
    dateOfBirth: "1995-05-15"
  }
}
```

### 2. Flow on App Load

1. App checks localStorage for auth token
2. If token exists → User is logged in → Show dashboard
3. If no token → User is not logged in → Show login page
4. ProtectedRoute components check auth status before rendering

### 3. Login Flow

```
User enters email & password
    ↓
authLocal.login() validates against localStorage users
    ↓
If match found:
  - Create session token
  - Save to localStorage['empowernest_auth']
  - Redirect to /tracker
    ↓
If not match:
  - Show error message
```

### 4. Signup Flow

```
User fills signup form
    ↓
authLocal.signup() validates and creates new user
    ↓
If email not already registered:
  - Add user to localStorage['empowernest_users']
  - Create session
  - Redirect to /tracker
    ↓
If email exists:
  - Show error: "Email already registered"
```

---

## Test Credentials

### Default Test User (Already Registered)

```
Email: chawlaadityavikram@gmail.com
Password: admin123
Name: Aditya Chawla
Phone: 9876543210
DOB: 1995-05-15
```

### Testing Steps

1. **Test Login with Default User:**
   - Go to `/login`
   - Enter: `chawlaadityavikram@gmail.com`
   - Enter password: `admin123`
   - Click "Login"
   - Should redirect to `/tracker` ✓

2. **Test Signup (Create New User):**
   - Go to `/signup`
   - Fill form with new email and details
   - Click "Sign up"
   - Should be redirected to `/tracker` ✓
   - New user is added to localStorage

3. **Test Session Persistence:**
   - Login to the app
   - Refresh the page
   - Should still be logged in ✓
   - Try opening DevTools Console: `localStorage.getItem('empowernest_auth')`
   - Should show your token

4. **Test Logout:**
   - Click "Logout" in navigation
   - Should be redirected to `/login`
   - localStorage['empowernest_auth'] should be removed

5. **Test Protected Routes:**
   - Logout
   - Try accessing `/tracker` directly
   - Should be redirected to `/login` ✓

---

## Files Changed

### **Removed:**
- `api/users/signup.js` - Backend signup endpoint
- `api/users/login.js` - Backend login endpoint
- `api/users/profile.js` - Backend profile endpoint

### **Added:**
- `src/services/authLocal.ts` - localStorage authentication service

### **Updated:**
- `src/services/api.ts` - Uses localStorage auth instead of API calls
- `src/components/ProtectedRoute.tsx` - Synchronous auth check
- `src/components/Navigation.tsx` - Sync auth check
- `src/App.tsx` - Simplified RootRedirect

---

## localStorage API

### Functions Available in `src/services/authLocal.ts`

```typescript
// Check if user is authenticated
isAuthenticated(): boolean

// Get current logged-in user
getCurrentUser(): User | null

// Get auth token
getToken(): string | null

// Signup new user
signup(email, password, name, phone, dob): Promise<{user, token}>

// Login existing user
login(email, password): Promise<{user, token}>

// Clear session
logout(): void

// Initialize default user
initialize(): void
```

---

## Extending with Backend + MySQL + Docker

### Current State
- localStorage: Temporary (cleared on browser data clear)
- Demo friendly: Works without internet

### Future: Add Express Backend + Docker MySQL
```
1. Create Express API for auth endpoints
2. Run MySQL in Docker container
3. Replace localStorage calls with API calls in src/services/api.ts
4. No UI changes needed - everything stays same!
```

**The code is already structured to support this transition!**

---

## Testing with Demo User

### Quick Test Script

Copy/paste in browser console while on app:

```javascript
// 1. Check if user is stored
console.log(localStorage.getItem('empowernest_users'));

// 2. Check current session
console.log(localStorage.getItem('empowernest_auth'));

// 3. Manually add a new test user
const users = JSON.parse(localStorage.getItem('empowernest_users') || '[]');
users.push({
  email: 'test@example.com',
  password: 'test123',
  name: 'Test User',
  phone: '9999999999',
  dateOfBirth: '1990-01-01'
});
localStorage.setItem('empowernest_users', JSON.stringify(users));

// 4. Try logging in with new user
// Go to /login and use: test@example.com / test123
```

---

## Security Notes

⚠️ **This is frontend-only auth for DEMO purposes**

- Passwords stored in localStorage (not secure for production)
- No server-side validation
- Don't use for sensitive data
- For production: must use backend with hashed passwords

✅ **To make production-ready:**
1. Add Express backend
2. Use Docker MySQL
3. Hash passwords with bcryptjs
4. Use JWT tokens from server
5. Remove localStorage passwords

---

## Troubleshooting

### "Cannot find module 'authLocal'"
- Make sure `src/services/authLocal.ts` exists
- Check import: `import { localAuthService } from './authLocal'`

### Login fails with correct credentials
- Check localStorage: `localStorage.getItem('empowernest_users')`
- Verify email and password match exactly (case-sensitive)

### Session lost after page refresh
- Check localStorage auth: `localStorage.getItem('empowernest_auth')`
- Check browser privacy settings (shouldn't block localStorage)

### Signup says "email already registered" but I never signed up
- Multiple signup attempts with same email
- Check localStorage users list
- Clear localStorage if needed and app will reinitialize with default user

---

## Next Steps

1. ✅ Test login/signup works locally
2. ✅ Demo the app without needing a server
3. ✅ When ready, add Express backend + Docker MySQL
4. ✅ Minimal code changes needed to switch!

---

**Your app is ready for demo! Test it now with the default credentials.** 🚀
