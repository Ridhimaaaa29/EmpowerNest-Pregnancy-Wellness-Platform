# Firebase Credentials Guide - Where to Find Each Value

## 📍 How to Get Your Firebase Credentials

### **Step 1: Go to Firebase Console**
1. Visit: https://console.firebase.google.com/
2. Select your **"EmpowerNest"** project

---

## 📋 Get Your Firebase Config

### **Method 1: Via Project Settings (Recommended)**

1. Click the **⚙️ Settings icon** (gear) in top-left
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Find your **"Web"** app
5. You'll see a box with your config - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",                    // ← VITE_FIREBASE_API_KEY
  authDomain: "empowernest-xxxxx.firebaseapp.com",  // ← VITE_FIREBASE_AUTH_DOMAIN
  projectId: "empowernest-xxxxx",          // ← VITE_FIREBASE_PROJECT_ID
  storageBucket: "empowernest-xxxxx.appspot.com",   // ← VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789012",       // ← VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789012:web:abcd..."      // ← VITE_FIREBASE_APP_ID
};
```

---

## 🔑 Detailed Breakdown

### **1. VITE_FIREBASE_API_KEY**
- **Where:** Project Settings → "Your apps" → Web config → `apiKey`
- **Format:** Long string starting with `AIzaSy...`
- **Example:** `AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q`
- **Copy:** Exactly as shown (include quotes if in the config, but just the value in `.env`)

### **2. VITE_FIREBASE_AUTH_DOMAIN**
- **Where:** Project Settings → "Your apps" → Web config → `authDomain`
- **Format:** `project-name.firebaseapp.com`
- **Example:** `empowernest-a1b2c.firebaseapp.com`
- **Copy:** Exactly as shown (without https://)

### **3. VITE_FIREBASE_PROJECT_ID**
- **Where:** Project Settings → "Your apps" → Web config → `projectId`
- **OR:** Project Settings → "General" tab at the top → "Project ID"
- **Format:** Your project name in lowercase with numbers
- **Example:** `empowernest-a1b2c`
- **Copy:** Exactly as shown

### **4. VITE_FIREBASE_STORAGE_BUCKET**
- **Where:** Project Settings → "Your apps" → Web config → `storageBucket`
- **Format:** `project-name.appspot.com`
- **Example:** `empowernest-a1b2c.appspot.com`
- **Note:** This starts with your project ID (similar to authDomain)
- **Copy:** Exactly as shown

### **5. VITE_FIREBASE_MESSAGING_SENDER_ID**
- **Where:** Project Settings → "Your apps" → Web config → `messagingSenderId`
- **OR:** Project Settings → "General" tab → "Sender ID"
- **Format:** 12-digit number
- **Example:** `123456789012`
- **Copy:** Just the numbers (no quotes)

### **6. VITE_FIREBASE_APP_ID**
- **Where:** Project Settings → "Your apps" → Web config → `appId`
- **Format:** `1:number:web:alphanumeric`
- **Example:** `1:123456789012:web:abcdef1234567890abcd`
- **Copy:** Exactly as shown

---

## 📸 Visual Guide

### **Finding Project Settings:**
```
Firebase Console
    ↓
Select Project (EmpowerNest)
    ↓
Click ⚙️ (Settings gear icon) at top-left
    ↓
Select "Project settings"
    ↓
Look for "Your apps" section at the bottom
    ↓
Find "Web" app config
    ↓
Copy all values
```

### **Screenshot Path:**
1. **Top-left:** Click the gear icon ⚙️
2. **Dropdown menu:** Click "Project settings"
3. **Page content:** Scroll down to find "Your apps" 
4. **Web config:** Copy the JavaScript object values

---

## ✅ Complete .env.local Example

Here's what your `.env.local` should look like after filling in:

```env
VITE_API_URL=http://localhost:5000

# Firebase Configuration - Copy from Firebase Console Project Settings
VITE_FIREBASE_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q
VITE_FIREBASE_AUTH_DOMAIN=empowernest-a1b2c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=empowernest-a1b2c
VITE_FIREBASE_STORAGE_BUCKET=empowernest-a1b2c.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcd
```

---

## 🚨 Important Notes

### **DO:**
✅ Copy the values **exactly** as shown (including dashes and dots)  
✅ Keep your API Key **private** - don't commit `.env.local` to Git  
✅ Paste in the exact format (no `https://`, no extra spaces)  
✅ Use quotes only in code, NOT in `.env` files  

### **DON'T:**
❌ Don't include quotes in your `.env.local` file  
❌ Don't add spaces around the `=` sign  
❌ Don't modify or shorten the values  
❌ Don't commit `.env.local` to version control  

---

## 🔄 Copy-Paste Template

Ready to fill in? Use this template:

```env
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=[PASTE_YOUR_API_KEY_HERE]
VITE_FIREBASE_AUTH_DOMAIN=[PASTE_YOUR_AUTH_DOMAIN_HERE]
VITE_FIREBASE_PROJECT_ID=[PASTE_YOUR_PROJECT_ID_HERE]
VITE_FIREBASE_STORAGE_BUCKET=[PASTE_YOUR_STORAGE_BUCKET_HERE]
VITE_FIREBASE_MESSAGING_SENDER_ID=[PASTE_YOUR_MESSAGING_SENDER_ID_HERE]
VITE_FIREBASE_APP_ID=[PASTE_YOUR_APP_ID_HERE]
```

Replace each `[PASTE_...]` with the actual value from Firebase Console.

---

## ❓ Can't Find Your Values?

### **If you see "No applications registered":**
1. You haven't added a Web app to your Firebase project yet
2. Go to Project Settings → "Your apps"
3. Click the **</> (Web)** icon
4. Click "Register app"
5. Follow the setup wizard
6. Copy the config that appears

### **If values are blank in console:**
1. Make sure you've selected the correct project
2. Check you're in "Project Settings" (not just "General")
3. Try refreshing the page
4. Log out and log back into Firebase

### **Need help with Firebase project creation?**
See: `FIREBASE_SETUP_GUIDE.md` → "Step 1: Create Firebase Project"

---

## ✨ After Adding Credentials

1. Save your `.env.local` file
2. Restart your dev server: `npm run dev`
3. Go to http://localhost:8080/login
4. Click "Sign in with Google"
5. ✅ It should work!

---

**Next:** Once added, restart your dev server and test the Google Sign-In button!
