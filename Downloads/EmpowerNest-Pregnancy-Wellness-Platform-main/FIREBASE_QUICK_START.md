# Firebase Setup - Quick Reference

## ⚡ 5-Minute Setup

### 1. Firebase Console Setup
```
https://console.firebase.google.com/
→ New Project → "EmpowerNest"
→ Add Web App
→ Copy config
```

### 2. Enable Google Sign-In
```
Authentication → Sign-in method → Google → Enable
```

### 3. Update .env.local
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Restart Server
```bash
npm run dev
```

### 5. Test
- Go to http://localhost:8080/login
- Click "Sign in with Google"
- Select account → Done! ✅

---

## 📂 Files Added/Modified

| File | Purpose |
|------|---------|
| `src/config/firebase.ts` | Firebase initialization |
| `src/services/firebaseAuth.ts` | Google auth logic |
| `src/pages/LoginPage.tsx` | Added Google button |
| `src/pages/SignupPage.tsx` | Added Google button |
| `.env.local` | Firebase credentials |

---

## 🎯 What Works Now

✅ Google Sign-In on Login page  
✅ Google Sign-Up on Signup page  
✅ User session persistence  
✅ Logout functionality  
✅ Local storage session backup  

---

## ⚠️ Common Mistakes

❌ Forgot to add Firebase credentials to `.env.local`  
✅ Add credentials before starting dev server

❌ Firebase config shows undefined  
✅ Restart dev server after updating `.env.local`

❌ Google button shows error  
✅ Check Firebase Console → Authentication → Google is enabled

---

## 🔗 Get Firebase Credentials

1. Visit: https://console.firebase.google.com/
2. Select your project
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" → Copy Web config
5. Paste into `.env.local`

---

## 📞 Need Help?

- Check browser console for errors (F12)
- Read full guide: `FIREBASE_SETUP_GUIDE.md`
- Firebase docs: https://firebase.google.com/docs/auth
