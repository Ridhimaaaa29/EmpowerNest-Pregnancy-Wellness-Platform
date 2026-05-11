/**
 * Application Constants
 * Centralized constants for the entire application
 */

// ============= APP CONFIG =============
export const APP_NAME = 'EmpowerNest';
export const APP_VERSION = '1.0.0';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ============= ROUTES =============
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TRACKER: '/tracker',
  PREGNANCY: '/pregnancy',
  BABY_CARE: '/baby-care',
  POSTPARTUM: '/postpartum',
  RESOURCES: '/resources',
  WORK_LIFE: '/work-life',
  ABOUT: '/about',
  MENTAL_HEALTH: '/mental-health',
  INSIGHTS: '/insights',
  NOT_FOUND: '*',
} as const;

// ============= CYCLE TRACKER CONSTANTS =============
export const AVERAGE_CYCLE_LENGTH = 28;
export const AVERAGE_PERIOD_LENGTH = 5;
export const OVULATION_DAY = 14;

export const CYCLE_SYMPTOMS = [
  'Cramping',
  'Bloating',
  'Headaches',
  'Mood Changes',
  'Fatigue',
  'Breast Tenderness',
  'Acne',
  'Back Pain',
] as const;

export const FLOW_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'heavy', label: 'Heavy' },
] as const;

// ============= PREGNANCY CONSTANTS =============
export const TRIMESTERS = [
  { number: 1, startWeek: 1, endWeek: 12, label: 'First Trimester' },
  { number: 2, startWeek: 13, endWeek: 26, label: 'Second Trimester' },
  { number: 3, startWeek: 27, endWeek: 40, label: 'Third Trimester' },
] as const;

export const PREGNANCY_MILESTONES = [
  'Positive Test',
  'First Ultrasound',
  'Anatomy Scan',
  'Glucose Test',
  'Maternity Photos',
  'Baby Shower',
  'Hospital Bag Packed',
] as const;

// ============= BABY CARE CONSTANTS =============
export const VACCINATION_SCHEDULE = [
  'BCG',
  'Hepatitis B',
  'Polio',
  'DPT',
  'Measles',
  'Meningococcal',
  'Pneumococcal',
] as const;

export const MILESTONE_CATEGORIES = [
  'Physical Development',
  'Cognitive Development',
  'Speech & Language',
  'Social & Emotional',
  'Feeding',
  'Sleeping',
] as const;

// ============= PAGINATION =============
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// ============= THEME =============
export const THEMES = ['light', 'dark'] as const;
export const DEFAULT_THEME = 'light' as const;
