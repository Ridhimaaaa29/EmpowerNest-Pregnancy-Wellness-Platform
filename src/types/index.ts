/**
 * Type Definitions for EmpowerNest
 * Central location for all TypeScript types
 */

// ============= USER TYPES =============
export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============= CYCLE TRACKER TYPES =============
export interface CycleEntry {
  id: string;
  userId: string;
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
  regularCycle: boolean;
  symptoms: string[];
  flow: 'light' | 'medium' | 'heavy';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CyclePrediction {
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
}

// ============= PREGNANCY TYPES =============
export interface PregnancyEntry {
  id: string;
  userId: string;
  dueDate: Date;
  currentTrimester: 1 | 2 | 3;
  weekNumber: number;
  dayNumber: number;
  weight?: number;
  bloodPressure?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============= BABY CARE TYPES =============
export interface Vaccination {
  id: string;
  userId: string;
  name: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: 'pending' | 'completed' | 'skipped';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  userId: string;
  title: string;
  description: string;
  ageInMonths: number;
  achievedDate?: Date;
  status: 'pending' | 'achieved' | 'delayed';
  createdAt: Date;
  updatedAt: Date;
}

export interface GrowthData {
  id: string;
  userId: string;
  date: Date;
  age: number; // in months
  weight: number; // in kg
  height: number; // in cm
  headCircumference?: number; // in cm
  createdAt: Date;
  updatedAt: Date;
}

// ============= API RESPONSE TYPES =============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
