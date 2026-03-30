# 📥 How to Get This Project - For Aditya

## **Quick Start (Fastest Way)**

### **Method 1: Clone from GitHub** ⭐ (RECOMMENDED)

```bash
# Open terminal/command prompt and run:
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git

# Navigate to project
cd EmpowerNest

# Open in VS Code
code .
```

This is the quickest way to get the project with full Git history!

---

### **Method 2: Download as ZIP**

1. Go to: https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file
5. Open the folder in VS Code

⚠️ **Note:** You won't have Git history, so you'll need to initialize Git:
```bash
cd EmpowerNest
git init
git config user.email "your.email@example.com"
git config user.name "Aditya"
git add .
git commit -m "Initial commit"
```

---

## **After Getting the Project**

### **Step 1: Install Prerequisites**

Make sure you have:
- **Node.js** (v16+) - Download from https://nodejs.org/
- **MySQL** (local) - Download from https://dev.mysql.com/downloads/mysql/
- **VS Code** - Download from https://code.visualstudio.com/
- **Git** - Download from https://git-scm.com/

Check installations:
```bash
node --version
npm --version
mysql --version
git --version
```

### **Step 2: Read These Files (In Order)**

1. **ADITYA_QUICK_REFERENCE.md** (you might be reading this!)
2. **BACKEND_TASKS.md** ⭐ (Complete step-by-step guide)
3. **CONTRIBUTING.md** (Team workflow)
4. **SETUP.md** (Project overview)

### **Step 3: Set Up Backend**

```bash
# Navigate to project root
cd EmpowerNest

# Create backend folder
mkdir backend
cd backend

# Initialize Node.js
npm init -y

# Install packages
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

# Create folder structure
mkdir models routes controllers middleware config services

# Create .env file (copy content from .env.example)
# Edit it with your MySQL credentials

# Start coding!
npm run dev
```

---

## **How to Continue This Conversation in Your System**

### **Option 1: Using VS Code Copilot (BEST)**

1. **In VS Code:**
   - Install GitHub Copilot extension (if not already installed)
   - Open Copilot Chat: Press `Ctrl+Shift+I`

2. **Paste This Prompt:**
   ```
   I'm the backend developer for EmpowerNest, a women's health platform.
   I need to create REST APIs for:
   - User authentication (signup, login, profile)
   - Cycle tracking (CRUD operations)
   - Pregnancy tracking
   - Baby care tracking
   
   Tech stack: Node.js, Express, MySQL, JWT, Bcryptjs
   
   I'm building for Evaluation 1 which requires:
   - express server on port 5000
   - MySQL database with proper tables
   - Auth API endpoints with JWT
   - Cycle tracker CRUD endpoints
   - Error handling and validation
   
   The frontend (React) is at http://localhost:5173
   I need to enable CORS for this.
   
   Can you help me build these APIs? I'll ask as I build.
   ```

3. **Ask Questions:**
   ```
   "Create an Express server with MySQL connection"
   "Write the User model for MySQL"
   "How do I implement JWT authentication?"
   "Create the cycle tracker API endpoints"
   "Help me test this endpoint in Postman"
   ```

### **Option 2: The Detailed Chat History**

I've created several detailed files that have all information:

- **BACKEND_TASKS.md** - Complete code and explanations
- **ADITYA_QUICK_REFERENCE.md** - Quick summary
- **CONTRIBUTING.md** - Workflow and standards
- **ADITYA_BACKEND_GUIDE.md** - Copilot prompt and resources

**You can reference these files as you work!**

### **Option 3: Continue with Ridhima**

If you have questions:
1. Ask Ridhima directly on GitHub
2. Create a GitHub Issue with your question
3. Ridhima can pull up this conversation and help

---

## **Project File Structure**

After cloning, here's what you'll see:

```
EmpowerNest/
├── src/                          # Frontend (React)
│   ├── pages/                   # Page components
│   ├── components/              # Reusable components
│   ├── services/
│   │   └── api.ts              # API endpoints (THIS IS WHAT YOU'LL BUILD)
│   ├── types/
│   │   └── index.ts            # Data structures
│   └── ...
├── public/                       # Static files
├── backend/                      # CREATE THIS (Your work area!)
├── BACKEND_TASKS.md             # Your step-by-step guide
├── CONTRIBUTING.md              # Team rules
├── SETUP.md                      # General info
├── ADITYA_QUICK_REFERENCE.md    # Quick summary
├── ADITYA_BACKEND_GUIDE.md     # Copilot guide
├── README.md                     # Project overview
├── package.json                  # Frontend dependencies
├── .env.example                  # Environment template
└── ...
```

---

## **Expected Endpoints (What Frontend Needs)**

These are defined in `src/services/api.ts`:

```
Authentication:
POST   /api/auth/signup       - Register user
POST   /api/auth/login        - Login user
GET    /api/auth/profile      - Get user profile
PUT    /api/auth/profile      - Update profile
POST   /api/auth/logout       - Logout

Cycle Tracker:
GET    /api/cycle             - Get all cycle entries
POST   /api/cycle             - Create cycle entry
PUT    /api/cycle/:id         - Update cycle entry
DELETE /api/cycle/:id         - Delete cycle entry

(Pregnancy & Baby Care endpoints for later phases)
```

---

## **Testing Your APIs**

### **Install Postman:**
- Download from https://www.postman.com/downloads/

### **Test Example:**
```
1. POST http://localhost:5000/api/auth/signup
   Body: {
     "email": "test@example.com",
     "password": "test123",
     "name": "Test User"
   }

2. POST http://localhost:5000/api/auth/login
   Body: {
     "email": "test@example.com",
     "password": "test123"
   }
   
   Response: { token: "your_jwt_token_here" }

3. GET http://localhost:5000/api/cycle
   Header: Authorization: Bearer <your_token_here>
```

---

## **Troubleshooting**

### **"MySQL Connection Error"**
```bash
# Make sure MySQL is running
# Check your .env file has correct credentials
# Default: host=localhost, user=root, password=your_password
```

### **"Port 5000 is already in use"**
```bash
# Change port in .env or in server.js
PORT=5001  # Use different port
```

### **"npm packages not installing"**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **"Can't connect to MySQL"**
```bash
# Start MySQL server
# Windows: MySQL should start automatically
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql
```

---

## **Daily Development Workflow**

**Each Day:**
1. Open VS Code
2. Open integrated terminal
3. Navigate to backend folder: `cd backend`
4. Start server: `npm run dev`
5. Open Postman and test endpoints
6. Make changes and test again
7. When task is done:
   ```bash
   git add .
   git commit -m "feat: [what you did]"
   git push origin feat/aditya/[task-name]
   ```
8. Create Pull Request on GitHub

---

## **Key Files to Reference**

1. **BACKEND_TASKS.md** ⭐
   - Step-by-step with code examples
   - All 9 tasks for Eval 1

2. **src/types/index.ts**
   - Data structure definitions
   - Database entity types

3. **src/services/api.ts**
   - What endpoints frontend expects
   - What parameters each endpoint needs

4. **.env.example**
   - Create your .env from this

---

## **VS Code Extensions You Should Install**

- **Thunder Client** or **REST Client** - Test APIs in VS Code
- **MySQL** - MySQL client in VS Code
- **Prettier** - Code formatter
- **ESLint** - Code quality
- **GitHub Copilot** - AI assistance (already mentioned)
- **GitLens** - Git integration

---

## **Quick Commands**

```bash
# Start development server
npm run dev

# Create new git branch
git checkout -b feat/aditya/feature-name

# Check git status
git status

# View recent commits
git log --oneline

# Pull latest changes
git pull origin main

# Push your branch
git push origin feat/aditya/feature-name
```

---

## **First Week Plan**

**Day 1:**
- Clone project ✓
- Read BACKEND_TASKS.md ✓
- Read CONTRIBUTING.md ✓
- Install MySQL locally ✓
- Create backend folder ✓

**Day 2:**
- Set up Node.js + packages ✓
- Create server.js ✓
- Connect to MySQL database ✓
- Create first commit ✓

**Day 3-4:**
- Build authentication API ✓
- Test with Postman ✓

**Day 5-6:**
- Build cycle tracker API ✓
- Test all endpoints ✓

**Day 7:**
- Write documentation ✓
- Code review ✓
- Prepare for evaluation ✓

---

## **Support Resources**

- **BACKEND_TASKS.md** - Step-by-step guide with code
- **Ridhima** - Your teammate, ask for help
- **Copilot Chat** - AI assistant in VS Code
- **GitHub Issues** - Document problems and solutions
- **Google** - Search error messages
- **Stack Overflow** - Community Q&A
- **Official Docs:**
  - Express.js: https://expressjs.com
  - MySQL: https://dev.mysql.com/doc/
  - Node.js: https://nodejs.org/en/docs/
  - JWT: https://jwt.io

---

## **Important Reminders**

✅ **DO:**
- Read BACKEND_TASKS.md first - It has everything
- Test your code with Postman
- Commit frequently (every 2-3 hours)
- Ask for help when stuck
- Communicate with Ridhima
- Use meaningful commit messages
- Follow the folder structure

❌ **DON'T:**
- Don't skip BACKEND_TASKS.md reading
- Don't commit without testing
- Don't push directly to main branch
- Don't hardcode passwords/secrets
- Don't commit .env file
- Don't make giant commits
- Don't work alone for too long

---

## **You're All Set! 🚀**

Now:
1. Clone the repository
2. Read BACKEND_TASKS.md
3. Follow the tasks step by step
4. Ask Copilot for help
5. Test everything with Postman
6. Commit your progress
7. Create a Pull Request

**Let's build the best backend ever! 💪**

---

**Questions? Create a GitHub Issue or ask Ridhima!**

Last Updated: March 30, 2026
