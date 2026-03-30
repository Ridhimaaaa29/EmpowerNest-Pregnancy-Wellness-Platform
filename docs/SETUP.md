# EmpowerNest - Setup & Project Structure Guide

## Overview
EmpowerNest is a comprehensive parental support platform that tracks pregnancy, baby care, menstrual cycles, and provides resources for mothers and fathers. This guide explains the current project structure and setup instructions.

---

## Project Structure

```
EmpowerNest/
├── src/                                    # Frontend React application
│   ├── pages/                             # Full page components
│   │   ├── Index.tsx                      # Home page
│   │   ├── PregnancyPage.tsx              # Pregnancy tracking
│   │   ├── BabyCare.tsx                   # Baby care dashboard
│   │   ├── TrackerPage.tsx                # Cycle tracker
│   │   ├── Postpartum.tsx                 # Postpartum support
│   │   ├── Resources.tsx                  # Resources library
│   │   ├── LoginPage.tsx                  # User login
│   │   ├── SignupPage.tsx                 # User registration
│   │   └── [other pages]
│   │
│   ├── components/                        # Reusable components
│   │   ├── ui/                            # Shadcn/ui components
│   │   ├── layout/                        # [NEW] Layout components
│   │   ├── features/                      # [NEW] Feature components
│   │   ├── tracker/                       # [NEW] Tracker components
│   │   ├── Navigation.tsx                 # Navigation bar
│   │   ├── PageTransition.tsx             # Page transition effects
│   │   ├── CycleTracker.tsx               # Cycle tracker UI
│   │   ├── PregnancyTracker.tsx           # Pregnancy tracker UI
│   │   └── [other components]
│   │
│   ├── services/                          # [NEW] API service layer
│   │   └── api.ts                        # Centralized API calls
│   │
│   ├── types/                             # [NEW] TypeScript definitions
│   │   └── index.ts                      # Type definitions
│   │
│   ├── constants/                         # [NEW] App constants
│   │   └── index.ts                      # Constants & config
│   │
│   ├── contexts/                          # React Context
│   │   └── VaccinationContext.tsx        # Vaccination management
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useTheme.tsx                  # Theme management
│   │   └── use-toast.ts                  # Toast notifications
│   │
│   ├── lib/                               # Utilities
│   │   └── utils.ts                      # Helper functions
│   │
│   ├── App.tsx                            # Main app component
│   ├── main.tsx                           # Entry point
│   ├── App.css                            # Global styles
│   └── index.css                          # Global imports
│
├── public/                                # Static assets
│   └── [images, icons, etc]
│
├── backend/                               # [UPCOMING] Express backend
│   ├── models/                            # MongoDB schemas
│   ├── routes/                            # API endpoints
│   ├── controllers/                       # Business logic
│   ├── middleware/                        # Auth, validation
│   ├── config/                            # Configuration
│   ├── server.js                          # Server entry point
│   ├── package.json
│   └── .env
│
├── .env.example                           # [NEW] Environment template
├── .gitignore                             # Git ignore rules
├── package.json                           # Frontend dependencies
├── tsconfig.json                          # TypeScript config
├── vite.config.ts                         # Vite config
├── tailwind.config.ts                     # Tailwind CSS config
├── postcss.config.js                      # PostCSS config
├── eslint.config.js                       # ESLint config
├── README.md                              # Project documentation
└── SETUP.md                               # This file
```

---

## Current State (Phase 0 - Complete)

### ✅ What's Working
- **Frontend UI**: All pages and components are functional
- **Routing**: React Router DOM setup with all major routes
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack React Query + Context API
- **Notifications**: Sonner toast notifications
- **Charts**: Recharts and Chart.js visualizations
- **Dark Mode**: Theme toggle with localStorage persistence
- **Responsive Design**: Mobile-friendly interface

### ❌ What's Not Working (Requires Backend)
- **Data Persistence**: Currently uses localStorage (lost on browser clear)
- **Authentication**: Login/Signup UI only, no backend validation
- **User Accounts**: No actual user system
- **API Integration**: No backend API calls
- **Real Data**: All data is mock/temporary

### 📁 New Folders Created
- `src/services/` - API service layer (ready for backend)
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants
- `src/components/layout/` - Layout components (to be populated)
- `src/components/features/` - Feature components (to be populated)
- `src/components/tracker/` - Tracker components (to be populated)

### 📝 New Files Created
- `.env.example` - Environment variables template
- `src/services/api.ts` - API service functions (awaiting backend)
- `src/types/index.ts` - TypeScript type definitions
- `src/constants/index.ts` - Application constants and config

---

## Setup Instructions

### Prerequisites
- Node.js v16+ (or v18+)
- Bun package manager (recommended) or npm/yarn
- MongoDB instance (for Phase 1+)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   bun install
   # or: npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server:**
   ```bash
   bun run dev
   # or: npm run dev
   ```

4. **Visit the application:**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
bun run build
# or: npm run build
```

This creates a `dist/` folder with optimized production build.

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.5.3 |
| **Build Tool** | Vite | 5.4.1 |
| **Styling** | Tailwind CSS | 3.4.11 |
| **UI Components** | Shadcn/ui | Latest |
| **Form Handling** | React Hook Form | 7.53.0 |
| **Validation** | Zod | 3.23.8 |
| **Routing** | React Router | 6.26.2 |
| **State Management** | TanStack Query | 5.56.2 |
| **Charts** | Recharts & Chart.js | 2.12.7 & 4.4.8 |
| **Animations** | Framer Motion | 12.4.9 |
| **Icons** | Lucide React | 0.462.0 |
| **Notifications** | Sonner | 1.5.0 |
| **Package Manager** | Bun | Latest |

### Backend (Upcoming - Phase 1)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Security**: bcrypt

---

## Key Features

### 1. **Period & Ovulation Tracking**
- Track menstrual cycles
- Predict ovulation dates
- Log symptoms and flow
- Personalized insights

### 2. **Pregnancy Tracking**
- Trimester guides
- Week-by-week tracking
- Health monitoring
- Wellness tips

### 3. **Baby Care**
- Vaccination schedules
- Milestone tracking
- Growth charts
- Baby care tips

### 4. **Support Resources**
- Educational content
- Mental health resources
- Work-life balance tools
- Community support

---

## Development Workflow

### Running the Project

**Frontend only (current state):**
```bash
bun run dev
```

**Frontend + Backend (after Phase 1):**
```bash
# Terminal 1 - Frontend
bun run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### Code Quality

**Linting:**
```bash
bun run lint
```

**Building:**
```bash
bun run build
```

**Preview production build:**
```bash
bun run preview
```

---

## Next Steps (Phase 1 - Backend Integration)

### Setup Backend
1. Create `backend/` folder with Express.js
2. Set up MongoDB connection
3. Create user authentication system

### API Endpoints to Implement
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/cycle` - Get cycle data
- `POST /api/cycle` - Create cycle entry
- `GET /api/pregnancy` - Get pregnancy data
- `POST /api/pregnancy` - Create pregnancy entry
- `GET /api/baby-care/vaccinations` - Get vaccination schedule
- `POST /api/baby-care/vaccinations` - Save vaccination
- `GET /api/baby-care/milestones` - Get milestones
- `POST /api/baby-care/milestones` - Save milestone

### Frontend Integration
1. Import API functions from `src/services/api.ts`
2. Replace localStorage calls with API calls
3. Add loading and error states
4. Test data persistence

---

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env) - Phase 1
```
MONGODB_URI=mongodb://localhost:27017/empowerNest
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

## Code Organization Guidelines

### Imports
- Use `@/` alias for src directory imports
- Example: `import { Button } from '@/components/ui/button'`

### Component Structure
- Functional components with hooks
- TypeScript interfaces for props
- Export at bottom of file

### Services
- Add all API calls to `src/services/api.ts`
- Use TypeScript types from `src/types/index.ts`
- Never make fetch calls directly in components

### Constants
- Add app-wide constants to `src/constants/index.ts`
- Route paths, config values, etc.

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Node Modules Issues
```bash
rm -rf node_modules bun.lockb
bun install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
bun run build
```

---

## Contributing Guidelines

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Keep components small and reusable
3. Use TypeScript for type safety
4. Follow the folder structure
5. Test before pushing
6. Write meaningful commit messages

---

## Support

For issues or questions, please create a GitHub issue or contact the development team.

---

## License

MIT License - feel free to use this project for educational and commercial purposes.
