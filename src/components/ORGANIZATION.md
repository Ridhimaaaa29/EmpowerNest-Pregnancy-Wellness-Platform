/**
 * Component Organization Guide
 * 
 * CURRENT STRUCTURE:
 * ├── src/
 * │   ├── pages/                    # Page components (full page components)
 * │   ├── components/
 * │   │   ├── ui/                   # Shadcn/ui component library
 * │   │   ├── layout/               # [NEW] Layout components
 * │   │   │   ├── Navigation.tsx
 * │   │   │   ├── Hero.tsx
 * │   │   │   └── PageTransition.tsx
 * │   │   ├── features/             # [NEW] Feature-specific components
 * │   │   │   ├── CycleOverview.tsx
 * │   │   │   ├── PregnancyGuide.tsx
 * │   │   │   └── BabyCareOverview.tsx
 * │   │   ├── tracker/              # [NEW] Tracker-related components
 * │   │   │   ├── CycleTracker.tsx
 * │   │   │   ├── PregnancyTracker.tsx
 * │   │   │   └── CycleInputForm.tsx
 * │   │   ├── [other components]    # Existing components
 * │   ├── contexts/                 # React Context files
 * │   ├── hooks/                    # Custom React hooks
 * │   ├── services/                 # [NEW] API service layer
 * │   │   └── api.ts
 * │   ├── types/                    # [NEW] TypeScript type definitions
 * │   │   └── index.ts
 * │   ├── constants/                # [NEW] Application constants
 * │   │   └── index.ts
 * │   ├── lib/                      # Utility functions
 * │   └── App.tsx
 * │
 * └── backend/                      # [UPCOMING] Express backend
 *
 * 
 * MIGRATION NOTES:
 * Phase 0 (Current):
 * - Created folder structure
 * - Components NOT moved yet (to avoid breaking imports)
 * - New service, type, and constants files created
 * 
 * Phase 1 (When backend is ready):
 * - Move existing components to proper folders
 * - Update all imports
 * - Start using api.ts service layer
 * 
 * COMPONENT MIGRATION PLAN:
 * TO MOVE TO layout/:
 * - Navigation.tsx
 * - Hero.tsx
 * - PageTransition.tsx
 * 
 * TO MOVE TO features/:
 * - CycleOverview.tsx
 * - CycleInsights.tsx
 * - PregnancyTracker.tsx
 * - Overview.tsx (from baby care)
 * - Vaccinations.tsx
 * - Milestones.tsx
 * 
 * TO MOVE TO tracker/:
 * - CycleInputForm.tsx
 * - CycleTracker.tsx
 * - DailyLog.tsx
 * - PeriodTracker.tsx
 */

// This file serves as documentation of the folder structure
// and component organization strategy
