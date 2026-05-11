# Getting Your Firebase Credentials - Step by Step

## From Your Screenshot

I can see you're in the **EmpowerNest** Firebase project.

**Project ID (visible from URL):** `empowernest-e989a`

---

## Next Steps to Get All Credentials

### **Step 1: Click Settings Gear Icon**
1. Look at the left sidebar
2. Click on **⚙️ Settings** (gear icon)
3. Select **"Project settings"** from the dropdown

### **Step 2: Navigate to Project Settings**
- You should see tabs: "General", "Service accounts", "Integrations", etc.
- Stay on the **"General"** tab

### **Step 3: Copy Your Project IDs**
On the General tab, you'll find:
- **Project ID:** `empowernest-e989a` ✅ (already visible in your URL)
- **Sender ID:** Look for this number in the General tab

### **Step 4: Scroll Down to "Your apps"**
- Scroll down on the Project Settings page
- Look for section called **"Your apps"** or **"Web apps"**
- You should see your web app with this config:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "empowernest-e989a",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### **Step 5: Copy Each Value**

From the firebaseConfig, copy these values:

```env
VITE_FIREBASE_API_KEY=AIzaSy... (copy the apiKey value)
VITE_FIREBASE_AUTH_DOMAIN=empowernest-e989a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=empowernest-e989a
VITE_FIREBASE_STORAGE_BUCKET=empowernest-e989a.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=... (the messagingSenderId value)
VITE_FIREBASE_APP_ID=... (the appId value)
```

---

## If You Don't See "Your apps"

### **You might need to register a web app first:**

1. In Project Settings, look for **"Your apps"** section
2. Click the **</> (Web)** icon
3. Enter app nickname: `EmpowerNest Web App`
4. Click **"Register app"**
5. Copy the config that appears

---

## Quick Checklist

After getting all values, your `.env.local` should have:

```env
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=[6-character string starting with AIzaSy]
VITE_FIREBASE_AUTH_DOMAIN=empowernest-e989a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=empowernest-e989a
VITE_FIREBASE_STORAGE_BUCKET=empowernest-e989a.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=[12-digit number]
VITE_FIREBASE_APP_ID=[formatted like: 1:123456789:web:abc...]
```

---

**Take a screenshot of your "Project Settings" → "Your apps" section and I can help you copy the exact values!**
