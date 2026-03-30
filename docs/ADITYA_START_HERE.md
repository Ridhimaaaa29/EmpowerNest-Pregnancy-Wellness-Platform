# 🎯 ADITYA - START HERE: Your Complete Onboarding Guide

**Hi Aditya!** 👋

Ridhima has set up everything for you to start backend development. This document tells you exactly what to do.

---

## **📱 In 3 Simple Steps:**

### **Step 1: Get the Project** (5 minutes)
```bash
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest
code .
```

### **Step 2: Read These Files** (30 minutes - IMPORTANT!)
In this order:
1. This file (you're reading it!)
2. **BACKEND_TASKS.md** ⭐ - Your complete task guide
3. **CONTRIBUTING.md** - Team rules
4. **HOW_TO_GET_PROJECT.md** - Detailed setup help

### **Step 3: Start Building Backend** (Follow BACKEND_TASKS.md)

That's it! You're ready to start!

---

## **📚 What to Read - Priority Order**

| File | Purpose | Read Time |
|------|---------|-----------|
| **This file** | Quick orientation | 5 min |
| **BACKEND_TASKS.md** | ⭐ YOUR MAIN GUIDE - Step by step | 30 min |
| **HOW_TO_GET_PROJECT.md** | Setup instructions | 10 min |
| **CONTRIBUTING.md** | Team workflows | 15 min |
| **ADITYA_BACKEND_GUIDE.md** | Copilot prompt help | 5 min |
| **ADITYA_QUICK_REFERENCE.md** | Quick reference | 5 min |

**TOTAL TIME: ~70 minutes of reading = Ready to code!**

---

## **🎬 Your First 30 Minutes**

### **Minute 1-5: Get the Project**
```bash
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest
code .
```

### **Minute 6-35: Read BACKEND_TASKS.md**
- Open the file in VS Code
- Read from top to bottom
- Understand all 9 tasks
- Identify 3 files you need to create

### **Minute 36-45: Verify Prerequisites**
- Node.js installed? → `node --version`
- MySQL installed? → `mysql --version`
- Git installed? → `git --version`

### **Minute 46-50: Create GitHub Feature Branch**
```bash
git checkout -b feat/aditya/backend-setup
```

### **Minute 51-60: Start Task 1 from BACKEND_TASKS.md**
Create `backend/server.js` with basic Express server

You're now officially started! 🚀

---

## **📌 Key Files You'll Create**

From BACKEND_TASKS.md, you need to build:

```
backend/
├── server.js                    # Main Express server
├── config/
│   └── database.js             # MySQL connection
├── middleware/
│   └── auth.js                 # JWT authentication
├── models/
│   ├── User.js                 # User model
│   └── CycleEntry.js           # Cycle tracker model
├── controllers/
│   ├── authController.js       # Auth logic
│   └── cycleController.js      # Cycle tracker logic
├── routes/
│   ├── authRoutes.js           # Auth endpoints
│   └── cycleRoutes.js          # Cycle endpoints
├── .env                        # Your config (copy from .env.example)
└── package.json                # Dependencies
```

**All code examples are in BACKEND_TASKS.md!**

---

## **🔗 Project Links**

- **GitHub Repo:** https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform
- **Your Assignment:** Backend API development for Phase 1
- **Your Teammate:** Ridhima (Frontend + AI)
- **Timeline:** 1-2 weeks for Evaluation 1

---

## **✅ Success Criteria (What You Need Done)**

For Evaluation 1:

- [x] Express server running on port 5000
- [x] MySQL database with 2+ tables
- [x] User signup endpoint works
- [x] User login endpoint returns JWT token
- [x] Protected routes (JWT verification)
- [x] Cycle tracker GET/POST/PUT/DELETE endpoints
- [x] Error handling on all endpoints
- [x] Code committed to GitHub
- [x] API documentation written
- [x] All tested in Postman

---

## **🆘 Quick Help Guide**

### **"Where do I start?"**
→ Read BACKEND_TASKS.md, then follow Task 1

### **"How do I set up MySQL?"**
→ See BACKEND_TASKS.md "Step 6: Setup MySQL Database"

### **"What should server.js look like?"**
→ See BACKEND_TASKS.md "TASK 1: Basic Server Setup"

### **"How do I test my API?"**
→ Use Postman (instructions in BACKEND_TASKS.md)

### **"What endpoints do I need?"**
→ See BACKEND_TASKS.md "What You Need to Build"

### **"Who can I ask for help?"**
→ Ridhima (your teammate), Copilot Chat in VS Code, or GitHub Issues

---

## **💬 Using Copilot Chat for Help**

In VS Code:
1. Press `Ctrl+Shift+I` to open Copilot Chat
2. Paste the prompt from **ADITYA_BACKEND_GUIDE.md**
3. Ask questions like:
   - "Create an Express server with MySQL"
   - "Write the User model code"
   - "How do I verify JWT tokens?"
   - "What's wrong with this error?"

---

## **📅 Daily Tasks**

**Day 1-2: Setup**
- [ ] Clone project
- [ ] Read documentation
- [ ] Install Node/MySQL
- [ ] Create backend folder structure
- [ ] Commit initial setup

**Day 3-4: Authentication API**
- [ ] Create database tables
- [ ] Build User model
- [ ] Create signup endpoint
- [ ] Create login endpoint
- [ ] Test with Postman

**Day 5-6: Cycle Tracker API**
- [ ] Create CycleEntry model
- [ ] Build CRUD endpoints
- [ ] Test all endpoints
- [ ] Test with frontend integration

**Day 7: Documentation & Final**
- [ ] Write API documentation
- [ ] Test everything once more
- [ ] Commit and push
- [ ] Create Pull Request
- [ ] Prepare for evaluation

---

## **🔧 Quick Setup Commands**

```bash
# Clone & navigate
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest

# Create backend folder and setup
mkdir backend
cd backend
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

# Create folder structure
mkdir models routes controllers middleware config services

# Start development
npm run dev
```

---

## **🎓 Learning Resources**

If you get stuck:

1. **Express.js** → https://expressjs.com
2. **MySQL** → https://dev.mysql.com/doc/
3. **JWT** → https://jwt.io
4. **Node.js** → https://nodejs.org/en/docs/
5. **Stack Overflow** → Google your error message
6. **YouTube** → Search "Express MySQL REST API"

---

## **📞 Need Help?**

1. **Check the docs** - Answer is probably in BACKEND_TASKS.md
2. **Use Copilot Chat** - Paste prompt and ask
3. **Ask Ridhima** - Create GitHub Issue
4. **Google the error** - Learn from the error message
5. **Check Stack Overflow** - Community answers

---

## **🎯 Your Main Goals**

**Phase 1 (Right Now):**
- Build working REST API with Express
- Connect to MySQL database
- Implement JWT authentication
- Create cycle tracker endpoints

**Phase 2 (Next):**
- Add pregnancy tracking API
- Add baby care APIs
- Enhance error handling

**Phase 3 (Final):**
- Performance optimization
- Advanced features
- Final testing and deployment

---

## **🚀 Let's Go!**

You have everything you need:

✅ Clear instructions (BACKEND_TASKS.md)  
✅ Code examples (provided)  
✅ Team support (Ridhima)  
✅ AI assistance (Copilot)  
✅ Project timeline (1-2 weeks)  

**Next Step:**
1. Clone the project
2. Read BACKEND_TASKS.md completely
3. Follow Task 1: Basic Server Setup
4. Start building!

---

## **Notes**

- BACKEND_TASKS.md has ALL the code you need - copy and adapt
- Test with Postman as you build
- Commit every 2-3 hours
- Use descriptive commit messages
- Ask questions if stuck
- Keep code clean and organized

---

## **You Got This! 💪**

The backend is your responsibility. Make it awesome!

**Start with BACKEND_TASKS.md now → Follow it step by step → Build amazing APIs!**

---

**Questions?** Ask Ridhima or create a GitHub Issue!  
**Last Updated:** March 30, 2026  
**Status:** Ready to build! 🚀

---

Happy coding, Aditya! We're building something incredible! 🎉
