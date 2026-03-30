# 📚 SUMMARY FOR ADITYA - EmpowerNest Backend Development

## **What is EmpowerNest?**

A comprehensive women's health and wellness platform that helps with:
- **Period Tracking** - Track cycles, predict ovulation, log symptoms
- **Pregnancy Monitoring** - Week-by-week tracking, health metrics, trimester guides
- **Baby Care** - Vaccinations, milestones, growth charts
- **Parental Support** - Resources and guidance for mothers and fathers

---

## **Your Role**

You are the **Backend Developer** for this project. Your responsibility is to:
1. Create REST API endpoints using Node.js + Express
2. Design and manage the MySQL database
3. Implement user authentication with JWT
4. Ensure all data is properly stored and retrieved
5. Work with Ridhima (frontend developer) to integrate frontend and backend

---

## **Project Links**

- **GitHub Repository:** https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform
- **Current Status:** Phase 1 (Backend Integration) - Starting now
- **Timeline:** 1-2 weeks for Evaluation 1

---

## **What's Already Done**

✅ Frontend UI complete (React + TypeScript)  
✅ Project structure organized  
✅ API service layer created (frontend waiting for backend)  
✅ TypeScript types defined  
✅ Team roles assigned  
✅ GitHub repo created

---

## **What You Need to Build**

### **For Evaluation 1 (This Week):**

1. **Express Server** - Basic Node.js/Express setup
2. **MySQL Database** - Tables for users, cycle entries, pregnancy entries
3. **Authentication API** - Signup, login, profile management
4. **Cycle Tracker API** - Create, read, update, delete cycle entries
5. **Error Handling** - Proper error responses
6. **Documentation** - API documentation and setup guide

### **For Evaluation 2 & 3:**

- Pregnancy tracking API
- Baby care APIs (vaccinations, milestones, growth)
- Advanced features
- Performance optimization

---

## **Tech Stack You'll Use**

| Tool | Purpose |
|------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MySQL** | Database (MANDATORY) |
| **Bcryptjs** | Password hashing |
| **JWT** | Authentication tokens |
| **CORS** | Cross-origin requests |
| **Dotenv** | Environment variables |
| **Postman** | API testing tool |

---

## **Quick Setup (Copy & Paste)**

```bash
# Clone the project
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest

# Create backend folder
mkdir backend
cd backend

# Initialize Node
npm init -y

# Install packages
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

# Create folders
mkdir models routes controllers middleware config services

# Create .env file (copy from .env.example)
# Create server.js and start building!
npm run dev
```

---

## **API Endpoints You Need to Create**

### **Authentication** (`/api/auth`)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### **Cycle Tracker** (`/api/cycle`)
- `GET /api/cycle` - Get all cycle entries (protected)
- `POST /api/cycle` - Create new cycle entry (protected)
- `PUT /api/cycle/:id` - Update cycle entry (protected)
- `DELETE /api/cycle/:id` - Delete cycle entry (protected)

### **Future (Not for Eval 1)**
- Pregnancy tracker endpoints
- Baby care endpoints

---

## **Database Tables to Create**

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  dateOfBirth DATE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cycle Entries Table
CREATE TABLE cycle_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  lastPeriodDate DATE NOT NULL,
  cycleLength INT NOT NULL,
  periodLength INT NOT NULL,
  regularCycle BOOLEAN DEFAULT true,
  symptoms JSON,
  flow VARCHAR(50),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Pregnancy Entries Table
CREATE TABLE pregnancy_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  dueDate DATE NOT NULL,
  currentTrimester INT,
  weekNumber INT,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## **Files You Need to Read**

1. **BACKEND_TASKS.md** ⭐ (START HERE!)
   - Complete step-by-step guide
   - Code examples for everything
   - 9 tasks for Eval 1

2. **CONTRIBUTING.md**
   - Team workflow rules
   - Git branching strategy
   - Code quality standards

3. **SETUP.md**
   - General project info
   - Tech stack details
   - Development workflow

4. **.env.example**
   - Environment variables you need

5. **src/services/api.ts**
   - See what endpoints frontend expects

6. **src/types/index.ts**
   - Data structure definitions

---

## **How to Get Help**

### **From GitHub Copilot:**
Use this prompt in VS Code Copilot Chat:

```
I'm building the backend for EmpowerNest, a women's health platform.
I need help with Node.js, Express, MySQL, JWT, and REST API development.
The project uses React frontend with TypeScript.
I'm creating authentication and cycle tracking APIs with JWT tokens and bcrypt password hashing.
My task for Eval 1 is to create working auth and cycle tracker endpoints with MySQL.
```

### **From Ridhima:**
- Sync up on GitHub via Issues/PRs
- Ask about frontend expectations
- Test integration when APIs are ready
- Code review and feedback

### **From Resources:**
- Express.js Docs: https://expressjs.com
- MySQL Docs: https://dev.mysql.com/doc/
- JWT Guide: https://jwt.io
- Node.js Docs: https://nodejs.org/en/docs/

---

## **Success Checklist for Eval 1**

- [ ] Backend folder created with proper structure
- [ ] npm packages installed correctly
- [ ] MySQL server running locally
- [ ] Database and tables created
- [ ] Server runs on port 5000 without errors
- [ ] Signup endpoint creates users
- [ ] Login endpoint returns JWT token
- [ ] Profile endpoint works with authentication
- [ ] Can create cycle entries
- [ ] Can read cycle entries
- [ ] Can update cycle entries
- [ ] Can delete cycle entries
- [ ] All endpoints tested in Postman
- [ ] Error handling works properly
- [ ] Code committed to GitHub
- [ ] Pull request created for code review

---

## **Git Workflow**

```bash
# 1. Create a feature branch
git checkout -b feat/aditya/backend-setup

# 2. Work on your feature
# ... coding ...

# 3. Commit your work
git add .
git commit -m "feat: Setup Express server with MySQL connection"

# 4. Push to GitHub
git push origin feat/aditya/backend-setup

# 5. Create Pull Request on GitHub
# - Title: "feat: Backend setup - Express + MySQL"
# - Description: Explain what you did
# - Request review from Ridhima

# 6. After approval/fixes, merge to main
```

---

## **Important Notes**

⚠️ **MUST DO:**
- Use MySQL (not MongoDB) - This is a requirement
- Use JWT for authentication - Frontend expects this
- Hash passwords with bcrypt - Never store plain passwords
- Add CORS middleware - Frontend needs to call backend
- Test every endpoint - Use Postman before committing
- Write error handling - Don't let errors crash the server

✅ **SHOULD DO:**
- Add input validation - Check data before saving
- Write clear error messages - Help frontend handle errors
- Document API endpoints - Others need to understand them
- Use meaningful variable names - Code readability matters
- Commit frequently - Save your progress

❌ **DON'T DO:**
- Don't hardcode configuration - Use .env file
- Don't commit .env file - It has secrets
- Don't use plain HTTP - CORS needs proper setup
- Don't make endpoints without authentication - Protect user data
- Don't skip error handling - It's essential

---

## **Questions to Ask Yourself**

As you build:

1. **Is my code secure?**
   - Passwords hashed? ✓
   - Tokens validated? ✓
   - User data protected? ✓

2. **Does it work?**
   - Tested all endpoints? ✓
   - Error cases handled? ✓
   - Data persists? ✓

3. **Is it clear?**
   - Code is readable? ✓
   - Comments where needed? ✓
   - Documented? ✓

4. **Can others use it?**
   - API documented? ✓
   - Examples provided? ✓
   - Setup guide clear? ✓

---

## **Your Timeline**

**Week 1-2 (Eval 1):**
- Days 1-2: Setup & Database
- Days 3-4: Authentication API
- Days 5-6: Cycle Tracker API
- Day 7: Testing & Documentation

**Week 3-4 (Eval 2):**
- Pregnancy Tracking API
- Baby Care APIs
- Enhanced features
- Bug fixes

**Week 5-6 (End Term):**
- Advanced features
- Performance optimization
- Final testing
- Deployment

---

## **Communication with Ridhima**

- **Daily:** Quick check-in on progress
- **When APIs ready:** She'll integrate frontend
- **Weekly:** Sync on Evaluation prep
- **PR Reviews:** Get feedback and merge together

---

## **Your First Day Plan**

1. ✅ Clone the repository
2. ✅ Read BACKEND_TASKS.md completely
3. ✅ Read CONTRIBUTING.md
4. ✅ Install Node.js and MySQL locally
5. ✅ Set up backend folder structure
6. ✅ Create first commit "Initial backend setup"
7. ✅ Start Task 1: Basic Server Setup

---

## **Let's Do This! 🚀**

You have:
- ✅ Clear instructions (BACKEND_TASKS.md)
- ✅ Code examples (in BACKEND_TASKS.md)
- ✅ Defined endpoints (what frontend expects)
- ✅ Database schema (SQL provided)
- ✅ Timeline (clear dates)
- ✅ Support (Ridhima + resources)

**Start with BACKEND_TASKS.md and follow it step by step.**

You've got this! 💪

---

## **Aditya's Contact**
- GitHub: @[aditya username]
- Email: [aditya email]
- Sync with Ridhima regularly

---

**Good luck, Aditya! We're building something amazing together! 🎉**

---

Generated: March 30, 2026  
For: Aditya - Backend Developer  
Project: EmpowerNest
