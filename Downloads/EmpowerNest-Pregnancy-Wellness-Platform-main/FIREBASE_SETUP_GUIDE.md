# Firebase Google Authentication Setup Guide

## 📋 Overview

Firebase has been integrated into the EmpowerNest project to support Google sign-in authentication. This guide will walk you through setting up Firebase and enabling Google authentication.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `EmpowerNest` (or your preferred name)
4. Follow the setup wizard and click **"Create project"**
5. Wait for project creation to complete

### Step 2: Register Web App
1. In Firebase Console, click the **</> (Web)** icon to add a web app
2. Enter app nickname: `EmpowerNest Web App`
3. Check the box to **"Also set up Firebase Hosting for this app"** (optional)
4. Click **"Register app"**
5. You'll see your Firebase config - copy it

### Step 3: Get Your Firebase Credentials

After registering your web app, you'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "empowernest-xxxxx.firebaseapp.com",
  projectId: "empowernest-xxxxx",
  storageBucket: "empowernest-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### Step 4: Enable Google Sign-In
1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click the **"Sign-in method"** tab
3. Click on **"Google"**
4. Toggle the switch to **"Enable"**
5. Select a support email from the dropdown
6. Click **"Save"**

### Step 5: Configure Environment Variables

Update your `.env.local` file with your Firebase credentials:

```env
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace each `YOUR_XXX` value with the actual values from your Firebase config.

### Step 6: Restart Development Server

```bash
# Kill the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

---

## ✅ Test Google Sign-In

1. Open http://localhost:8080/login
2. Click **"Sign in with Google"** button
3. You'll see a Google authentication popup
4. Select your Google account
5. You should be redirected to the home page on successful login

---

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts                 # Firebase configuration
├── services/
│   ├── api.ts                      # Main API service
│   ├── authLocal.ts                # Local storage auth (fallback)
│   └── firebaseAuth.ts             # Firebase authentication service
├── pages/
│   ├── LoginPage.tsx               # Updated with Google Sign-In
│   └── SignupPage.tsx              # Updated with Google Sign-In
```

---

## 🔐 Security Considerations

### 1. **Firestore Security Rules** (Optional)

If you plan to store user data in Firestore, add these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public data (cycles, pregnancy) - users can write their own
    match /cycles/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### 2. **API Key Restrictions** (Recommended)

In Firebase Console → Project Settings → API Keys:
1. Click on your browser API key
2. Set **"Application restrictions"** to **"HTTP referrers"**
3. Add your domain: `localhost:8080` (for development), and your production domain later
4. Under **"API restrictions"**, restrict to only **Identity Toolkit API** and **Firebase Authentication API**

---

## 🌐 Deployment to Production

### For Vercel Deployment:

1. Add environment variables in Vercel project settings:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

2. Update Firebase Console → Authentication → Sign-in providers:
   - Add your production domain to authorized redirect URIs
   - Example: `https://your-app.vercel.app/login`

3. Update API Key restrictions in Firebase:
   - Add your production domain (e.g., `your-app.vercel.app`)

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'firebase'"
**Solution:** Make sure you've installed Firebase:
```bash
npm install firebase react-firebase-hooks
```

### Issue: "Firebase config not found" or blank values
**Solution:** Check that your `.env.local` file has correct Firebase credentials:
```bash
# View your .env.local
cat .env.local
```

### Issue: Google Sign-In button shows error
**Solution:** 
1. Verify Firebase credentials are correct
2. Check that Google Sign-In is enabled in Firebase Console
3. Check browser console for specific error messages
4. Ensure your domain is added to authorized redirect URIs

### Issue: "Auth not initialized" error
**Solution:** Make sure Firebase config environment variables are set before starting the app:
```bash
# Restart dev server after adding .env.local
npm run dev
```

---

## 📚 Code Examples

### Using Firebase Auth in Components

```typescript
import { firebaseAuthService } from '@/services/firebaseAuth';
import { useEffect, useState } from 'react';

export function MyComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    const currentUser = firebaseAuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await firebaseAuthService.signOut();
      // User logged out
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
```

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)

---

## 📝 Next Steps

After Firebase setup:

1. **Create Firestore database** (if you want to store user data)
   - Go to Firebase Console → Firestore Database → Create Database
   - Start in test mode (for development)

2. **Add user profile collection**
   - Create a `users` collection
   - Store additional user info (phone, DOB, preferences)

3. **Sync with backend**
   - Update your Node.js backend to verify Firebase tokens
   - Store user data in MySQL database

---

**Questions?** Check the Firebase documentation or open an issue in the project repository.
