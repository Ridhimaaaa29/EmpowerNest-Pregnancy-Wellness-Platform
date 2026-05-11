# CONTRIBUTING.md - Team Contribution Guide

## Welcome to EmpowerNest Development! 👋

This document outlines the team structure, contribution guidelines, and workflow for the EmpowerNest project.

---

## **👥 Team Structure**

### **Ridhima** - Frontend Developer + AI Integration
- Frontend React application development
- UI/UX implementation
- AI feature integration
- Frontend testing and quality assurance

### **Aditya** - Backend Developer  
- Node.js/Express backend development
- MySQL database design and management
- API endpoint development
- Database optimization and security
- Authentication system

---

## **🚀 Getting Started as a Developer**

### **Option 1: Clone from GitHub (Recommended)**

```bash
# Clone the repository
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git

# Navigate to project directory
cd EmpowerNest

# For Frontend Developers (Ridhima):
bun install
bun run dev

# For Backend Developers (Aditya):
mkdir backend  # If not already created
cd backend
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon
```

### **Option 2: Download as ZIP**

1. Go to GitHub repo: https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open in VS Code

---

## **📁 Project Structure Overview**

```
EmpowerNest/
├── src/                              # Frontend (React)
│   ├── pages/                       # Page components
│   ├── components/                  # Reusable components
│   ├── services/                    # API service layer
│   ├── types/                       # TypeScript definitions
│   ├── constants/                   # App constants
│   ├── contexts/                    # React context
│   ├── hooks/                       # Custom hooks
│   ├── lib/                         # Utilities
│   └── App.tsx
│
├── backend/                         # [TO BE CREATED BY ADITYA]
│   ├── models/                      # Database schemas
│   ├── routes/                      # API endpoints
│   ├── controllers/                 # Business logic
│   ├── middleware/                  # Auth & validation
│   ├── config/                      # Database config
│   ├── services/                    # AI, email, etc.
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/                          # Static assets
├── .env.example                     # Environment template
├── SETUP.md                         # Detailed setup guide
├── BACKEND_TASKS.md                 # Backend specific tasks
├── package.json
├── README.md
└── CONTRIBUTING.md                  # This file
```

---

## **📋 Phase 1: First Evaluation Tasks**

### **For Aditya (Backend)**

**Duration: 1-2 weeks**

#### Setup Phase (Day 1-2)
- [ ] Clone/download the project locally
- [ ] Create `backend/` folder structure
- [ ] Initialize Node.js project with npm
- [ ] Install required packages (Express, MySQL, JWT, Bcrypt)
- [ ] Create `.env` file from `.env.example`
- [ ] Set up MySQL database locally

#### Authentication API (Day 3-4)
- [ ] Create User model in Express
- [ ] Implement `POST /api/auth/signup`
- [ ] Implement `POST /api/auth/login` with JWT
- [ ] Implement `POST /api/auth/logout`
- [ ] Create JWT middleware for protected routes
- [ ] Add password hashing with bcrypt

#### Cycle Tracker API (Day 5-6)
- [ ] Create Cycle_Entry model/table
- [ ] Implement `GET /api/cycle`
- [ ] Implement `POST /api/cycle`
- [ ] Implement `PUT /api/cycle/:id`
- [ ] Implement `DELETE /api/cycle/:id`
- [ ] Add prediction calculation logic

#### Testing & Documentation (Day 7)
- [ ] Test all endpoints with Postman
- [ ] Write API documentation
- [ ] Create BACKEND_README.md
- [ ] Commit and push to GitHub

---

### **For Ridhima (Frontend)**

**Duration: 1-2 weeks**

#### API Integration (Day 1-3)
- [ ] Update `src/services/api.ts` to call backend
- [ ] Implement authentication token handling
- [ ] Add loading states to components
- [ ] Add error handling and user feedback
- [ ] Test API connections

#### Authentication UI (Day 4-5)
- [ ] Perfect LoginPage.tsx
- [ ] Perfect SignupPage.tsx
- [ ] Add form validation
- [ ] Test with backend

#### Cycle Tracker Integration (Day 6-7)
- [ ] Connect cycle-input-form.tsx to API
- [ ] Replace localStorage with API calls
- [ ] Point CycleTracker.tsx to real API data
- [ ] Test end-to-end

#### Evaluation Presentation (Day 8)
- [ ] Demo working features
- [ ] Show code quality
- [ ] Explain architectur

---

## **🔄 Git Workflow**

### **Creating Feature Branches**

```bash
# For backend features
git checkout -b feat/aditya/auth-api
git checkout -b feat/aditya/cycle-api
git checkout -b feat/aditya/baby-care-api

# For frontend features
git checkout -b feat/ridhima/api-integration
git checkout -b feat/ridhima/auth-pages
git checkout -b feat/ridhima/ai-integration

# Work on your feature
git add .
git commit -m "feat: [component] description"
git push origin feat/aditya/auth-api

# Create Pull Request on GitHub
# Request review from team member
# Merge to main after approval
```

### **Commit Message Format**

```
feat: Add user authentication API
fix: Resolve cycle data validation issue
docs: Update API documentation
style: Format code according to standards
test: Add unit tests for auth controller
refactor: Reorganize database models
chore: Update dependencies
```

---

## **💬 Collaboration & Communication**

### **GitHub Issues**
- Use Issues to track bugs and feature requests
- Assign issues to yourself
- Add labels (backend, frontend, bug, enhancement)
- Close with corresponding commit/PR

### **Pull Requests**
- Create PR before merging to main
- Request review from team member
- Resolve conflicts if any
- Delete branch after merge

### **Code Review Checklist**
- [ ] Code follows project standards
- [ ] No unnecessary console.logs or comments
- [ ] Proper error handling
- [ ] TypeScript types added (frontend)
- [ ] Tests written/updated
- [ ] Documentation updated

---

## **📚 Important Files to Read**

1. **SETUP.md** - Detailed project setup guide
2. **BACKEND_TASKS.md** - Detailed backend tasks (for Aditya)
3. **src/services/api.ts** - API service layer structure
4. **src/types/index.ts** - TypeScript type definitions
5. **src/constants/index.ts** - App constants and configuration

---

## **🆘 Getting Help**

### **Issues & Support**
1. Check GitHub Issues for similar problems
2. Search in project documentation
3. Ask team member for help
4. Document the issue and create a GitHub Issue

### **Resources**
- [Express.js Documentation](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## **✅ Quality Standards**

### **Code Quality**
- Use TypeScript for type safety
- Follow ESLint rules
- Write clean, readable code
- Add meaningful comments
- Keep functions small and focused

### **Git Hygiene**
- One feature per branch
- Clean commit history
- Descriptive commit messages
- No merge commits (use rebase)

### **Testing**
- Test your code before pushing
- Test edge cases
- Test error scenarios
- Document test results

---

## **📅 Evaluation Timeline**

| Phase | Duration | Focus |
|-------|----------|-------|
| **Phase 0** | Done | Cleanup & Setup |
| **Phase 1 (Eval 1)** | Week 1-2 | Backend API + Frontend Integration |
| **Phase 2 (Eval 2)** | Week 3-4 | Enhanced Features + AI Start |
| **Phase 3 (End Term)** | Week 5-6 | Polish + Deployment |

---

## **🚀 Next Steps**

1. **For Aditya:**
   - Read BACKEND_TASKS.md
   - Follow backend setup instructions
   - Start with authentication API
   - Create feature branch: `feat/aditya/auth-api`

2. **For Ridhima:**
   - Read API integration guide in SETUP.md
   - Update services/api.ts with endpoints
   - Start integrating authentication
   - Create feature branch: `feat/ridhima/api-integration`

3. **Both:**
   - Sync regularly to avoid conflicts
   - Create PRs for code review
   - Communicate about progress
   - Document as you go

---

## **📞 Contact & Discussions**

- GitHub Issues for bugs and features
- GitHub Discussions for general questions
- Direct message for urgent issues
- Weekly sync-ups recommended

---

**Happy Coding! 🎉**

Last Updated: March 30, 2026
