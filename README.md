# 🌟 EmpowerNest - Women's Health & Wellness Platform

A comprehensive web application designed to support women throughout their complete health journey - from before pregnancy, during pregnancy, and postpartum recovery. Also provides guidance and support for parents in childcare.

**Status:** 🚀 Phase 1 - Backend Integration (Evaluation 1)

---

## ✨ Key Features

### **Women's Health & Wellness**
- 📊 **Period & Ovulation Tracking** - Track menstrual cycles, predict ovulation, log symptoms
- 🤰 **Pregnancy Monitoring** - Week-by-week tracking, health metrics, trimester guides
- 💪 **Postpartum Support** - Recovery tracking, wellness resources, health monitoring
- 🎯 **Personalized Insights** - AI-powered health analytics and recommendations

### **Parental Support**
- 👶 **Baby Care Dashboard** - Vaccination schedules, milestone tracking, growth charts
- 📚 **Parenting Resources** - Guidance for mothers and fathers
- 💬 **Mental Health Support** - Wellness resources and support materials

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18.3 + TypeScript + Vite |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **State Management** | TanStack React Query + Context API |
| **Forms** | React Hook Form + Zod validation |
| **Charts** | Recharts + Chart.js |
| **Animations** | Framer Motion |
| **Backend** | Node.js + Express.js |
| **Database** | MySQL (Mandatory) |
| **Authentication** | JWT + Bcryptjs |
| **Deployment** | Vercel (Frontend) + TBD (Backend) |

---

## 📦 Project Structure

```
EmpowerNest/
├── src/                           # Frontend (React + TypeScript)
│   ├── pages/                    # Page components
│   ├── components/               # Reusable UI components
│   ├── services/                 # API service layer
│   ├── types/                    # TypeScript definitions
│   ├── constants/                # App constants
│   ├── hooks/                    # Custom React hooks
│   ├── contexts/                 # React Context
│   ├── lib/                      # Utilities
│   └── App.tsx
│
├── backend/                       # Backend (Node.js + Express) [In Development]
│   ├── models/                  # Database models
│   ├── routes/                  # API endpoints
│   ├── controllers/             # Business logic
│   ├── middleware/              # Authentication & validation
│   └── config/                  # Database configuration
│
├── docs/                         # 📚 Project documentation
│   ├── SETUP.md                 # Project setup guide
│   ├── CONTRIBUTING.md          # Team contribution guide
│   ├── BACKEND_TASKS.md         # Backend implementation tasks
│   └── [other guides...]
│
├── public/                       # Static assets
├── .env.example                 # Environment variables template
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js v16+ or v18+
- Bun package manager (or npm)
- MySQL server (for backend - Aditya)

### **Frontend Setup**

```bash
# Clone the repository
git clone https://github.com/Ridhimaaaa29/EmpowerNest-Pregnancy-Wellness-Platform.git
cd EmpowerNest

# Install dependencies
bun install
# or: npm install

# Create environment file
cp .env.example .env.local

# Run development server
bun run dev
# or: npm run dev
```

Access frontend at: `http://localhost:5173`

### **Backend Setup**

See [docs/BACKEND_TASKS.md](./docs/BACKEND_TASKS.md) for detailed backend setup instructions.

```bash
# Create backend folder
mkdir backend
cd backend

# Install dependencies
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv

# Run backend
npm run dev
```

Backend runs at: `http://localhost:5000`

---

## 📚 Documentation

All project documentation is organized in the `/docs` folder:

| Document | Purpose |
|----------|---------|
| **[docs/SETUP.md](./docs/SETUP.md)** | Complete project setup and overview |
| **[docs/BACKEND_TASKS.md](./docs/BACKEND_TASKS.md)** | Backend implementation guide with code examples |
| **[docs/ADITYA_START_HERE.md](./docs/ADITYA_START_HERE.md)** | Quick start for backend developer |
| **[docs/VERCEL_DEPLOYMENT_GUIDE.md](./docs/VERCEL_DEPLOYMENT_GUIDE.md)** | Frontend deployment guide |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Team contribution guidelines |

---

## 👥 Team & Responsibilities

| Role | Developer | Responsibility |
|------|-----------|-----------------|
| **Frontend** | Ridhima | React UI, forms, API integration, AI features |
| **Backend** | Aditya | Express API, MySQL database, authentication |

---

## 📅 Project Timeline

| Phase | Duration | Focus | Status |
|-------|----------|-------|--------|
| **Phase 0** | Completed | Setup & cleanup | ✅ Done |
| **Phase 1** | Week 1-2 | Backend API + Auth + Cycle Tracker | 🚀 In Progress |
| **Phase 2** | Week 3-4 | Enhanced features + AI integration | ⏳ Upcoming |
| **Phase 3** | Week 5-6 | Final features + Deployment | 🎯 Planned |

---

## 🎯 Current Development Status

### ✅ Completed (Phase 0)
- Project structure organized
- Type definitions created
- API service layer designed
- All documentation prepared
- GitHub repository setup

### 🚀 In Progress (Phase 1)
- **Aditya (Backend):** Building Express API with MySQL
- **Ridhima (Frontend):** Preparing API integration & UI enhancements

### ⏳ Upcoming
- Complete API integration
- User profile management
- AI-powered health insights
- Enhanced baby care features

---

## 🗂️ Environment Variables

### **Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000
```

### **Backend (.env) - [To be added by Aditya]**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=empowerNest
PORT=5000
JWT_SECRET=your_secret_key
```

See [.env.example](./.env.example) for complete template.

---

## 🔄 Git Workflow

### **Branching Strategy**
```bash
# Create feature branch
git checkout -b feat/[developer]/[feature-name]

# Examples:
git checkout -b feat/aditya/auth-api
git checkout -b feat/ridhima/api-integration
```

### **Commit Standards**
```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code formatting
refactor: Code restructuring
test: Add/update tests
```

### **Pull Request Workflow**
1. Create feature branch
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request for review
5. After approval, merge to main

---

## 📝 Building for Production

```bash
# Build frontend
bun run build
# or: npm run build

# Output: dist/ folder (ready for deployment)
```

**Frontend deployed on:** [Vercel](https://vercel.com)

---

## 🤝 Contributing

This is a class project for educational purposes. For contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### **Development Setup**
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Clone the repository
3. Create feature branch
4. Read relevant documentation in `/docs`
5. Submit Pull Request

---

## 📞 Support & Help

For questions or documentation needs:
- **Backend Help:** Refer to [docs/BACKEND_TASKS.md](./docs/BACKEND_TASKS.md) 
- **Frontend Help:** Refer to [docs/RIDHIMA_CONTEXT_SUMMARY.md](./docs/RIDHIMA_CONTEXT_SUMMARY.md)
- **Getting Started:** See [docs/README.md](./docs/README.md)

---

## 📄 License

This project is created for educational purposes. All rights reserved.

---

## 🙌 Acknowledgments

Built with:
- React & TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Recharts & Chart.js
- Framer Motion
- And many more amazing libraries

---

**Last Updated:** January 2025  
**Status:** 🚀 Phase 1 - Backend Integration in Progress

## Support  
For queries or feedback, please create an issue in the GitHub repository or contact the development team.  


