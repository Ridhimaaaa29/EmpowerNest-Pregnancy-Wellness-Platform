# 🤖 GitHub Copilot Prompt for Backend Development - Aditya

## **To Use with VS Code Copilot**

Copy and paste the following prompt into your VS Code Copilot chat to get context and assistance with backend development:

---

```
# I'm working on EmpowerNest Backend Development

## Project Overview: 
EmpowerNest is a women's health and wellness platform covering period tracking, 
pregnancy monitoring, and baby care. The frontend is React-based, and I'm building 
the Node.js/Express backend with MySQL database.

## My Role:
I'm the backend developer (Aditya). My task is to create REST API endpoints for:
- User authentication (signup, login, profile management)
- Cycle tracking (CRUD operations)
- Pregnancy tracking (to be added)
- Baby care (vaccinations, milestones)

## Tech Stack:
- Backend: Node.js + Express.js
- Database: MySQL (mandatory requirement)
- Authentication: JWT tokens + Bcrypt password hashing
- Validation: Input validation on all endpoints
- CORS: Enabled for frontend at http://localhost:5173

## Project Structure:
The project is in: c:\Users\USER\Downloads\EmpowerNest\
Frontend: src/ (React + TypeScript)
Backend: backend/ (to be created by me)

## What I Need:
1. Help setting up Express server with MySQL
2. Help creating models and controllers
3. Help designing API endpoints
4. Help with error handling and validation
5. Help with authentication middleware
6. Best practices for backend code organization

## Database Tables:
- users (id, email, password, name, phoneNumber, dateOfBirth, createdAt, updatedAt)
- cycle_entries (id, userId, lastPeriodDate, cycleLength, symptoms, flow, notes, etc.)
- pregnancy_entries (id, userId, dueDate, trimester, week, weight, bloodPressure, notes)
- baby_care (vaccinations, milestones, growth_data related tables)

## Current Task:
Building Phase 1 (Evaluation 1) - need working auth and cycle tracker APIs by next week

## When I Ask:
- "Create a model for..." - provide code template
- "How do I..." - explain with code examples
- "Fix error..." - help debug and provide solution
- "Explain..." - provide detailed explanation

Please help me with backend development, best practices, and problem-solving!
```

---

## **How to Use This Prompt**

1. **In VS Code:**
   - Open VS Code
   - Open the GitHub Copilot Chat (Ctrl+Shift+I)
   - Paste the above prompt
   - Ask your questions about backend development

2. **During Development:**
   - Use this context to reference the project
   - Ask specific questions about API endpoints
   - Get help with debugging errors
   - Learn best practices for backend development

3. **Example Questions You Can Ask:**
   ```
   "Create an Express server that connects to MySQL"
   "How do I hash passwords with bcrypt?"
   "Create a JWT authentication middleware"
   "What's the best way to handle errors in Express?"
   "Create a User model for MySQL"
   "Write a POST endpoint for user registration"
   ```

---

## **Alternative: Continue This Conversation**

### **Option 1: Share Chat History with Aditya**

You can:
1. Download this entire conversation as a file
2. Share it with Aditya
3. He can reference it while working

### **Option 2: Create a Continuation File**

I'll create a `BACKEND_COPILOT_GUIDE.md` file that summarizes everything Aditya needs to know.

### **Option 3: Direct GitHub Access**

Aditya can:
1. Clone the repo
2. Read BACKEND_TASKS.md
3. Read CONTRIBUTING.md
4. Start the implementation following the step-by-step guide

---

## **Files Aditya Should Read First**

In order of importance:

1. **BACKEND_TASKS.md** (You are reading this!)
   - Step-by-step backend setup
   - Complete code examples
   - All 9 tasks for Eval 1

2. **CONTRIBUTING.md**
   - Team workflows
   - Git branching strategy
   - Code quality standards
   - Communication guidelines

3. **SETUP.md**
   - General project architecture
   - Tech stack overview
   - Development workflow

4. **src/services/api.ts**
   - Understand what endpoints are expected
   - See the frontend API layer

5. **src/types/index.ts**
   - Understand data types and structures
   - Types for database models

6. **.env.example**
   - Environment variable template

---

## **Quick Start Commands for Aditya**

```bash
# 1. Clone and navigate
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest

# 2. Create backend folder
mkdir backend
cd backend

# 3. Initialize Node.js
npm init -y

# 4. Install dependencies
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

# 5. Create folders
mkdir models routes controllers middleware config services

# 6. Create server.js and start building!
npm run dev
```

---

## **Success Criteria for Eval 1**

✅ **Must Have (Mandatory):**
- [x] Express server running on port 5000
- [x] MySQL database connected
- [x] User signup endpoint working
- [x] User login endpoint returning JWT
- [x] Protected route with JWT verification
- [x] Cycle tracker CRUD endpoints all working
- [x] Password hashing with bcrypt
- [x] Error handling on all endpoints
- [x] Code committed to GitHub

✅ **Nice to Have (Extra Credit):**
- [x] Input validation on endpoints
- [x] Rate limiting
- [x] API documentation
- [x] Unit tests for endpoints
- [x] Pregnancy tracker endpoints (bonus)
- [x] Baby care endpoints (bonus)

---

## **Important Notes for Aditya**

1. **MySQL is Mandatory** - Don't use MongoDB, must use MySQL
2. **Frontend Expects These Endpoints** - Check `src/services/api.ts` for all expected endpoints
3. **CORS Needed** - Frontend at `http://localhost:5173` needs to call backend at `http://localhost:5000`
4. **JWT Tokens** - Frontend will send token in Authorization header
5. **Test with Postman** - Use Postman to test all endpoints before frontend integration
6. **Git Workflow** - Create feature branches, make PRs, get code review
7. **Communication** - Sync with Ridhima regularly to ensure frontend/backend alignment

---

## **What Ridhima Will Be Doing**

While Aditya builds the backend:
- Frontend API integration (updating services/api.ts)
- Authentication UI (LoginPage, SignupPage)
- Connecting cycle tracker to API
- Connecting pregnancy tracker to API
- AI integration preparation

---

## **Timeline**

| Day | Tasks | Aditya | Ridhima |
|-----|-------|--------|---------|
| 1-2 | Setup, Database, Server | Backend setup | Prep frontend |
| 3-4 | Auth API | Build auth endpoints | Integrate auth |
| 5-6 | Cycle API | Build cycle endpoints | Integrate cycle |
| 7 | Testing & Docs | Test & document | Final integration |

---

## **Next Steps**

1. **For Aditya:**
   - [ ] Read BACKEND_TASKS.md completely
   - [ ] Read CONTRIBUTING.md
   - [ ] Clone the repository
   - [ ] Follow the setup steps
   - [ ] Start Task 1 (Server Setup)
   - [ ] Create feature branch: `feat/aditya/backend-setup`
   - [ ] Push your first commit

2. **For Ridhima:**
   - [ ] Update CONTRIBUTING.md if needed
   - [ ] Ensure test credentials are documented
   - [ ] Be ready to review PRs
   - [ ] Start frontend API integration

3. **For Both:**
   - [ ] Sync up daily
   - [ ] Test integration between frontend and backend
   - [ ] Keep code clean and documented
   - [ ] Celebrate progress! 🎉

---

**Happy coding, Aditya! You've got this! 🚀**

For questions, check BACKEND_TASKS.md or ask Ridhima.

---

Generated: March 30, 2026
