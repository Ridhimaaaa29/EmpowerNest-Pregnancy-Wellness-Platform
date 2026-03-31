/**
 * API Service Layer
 * Frontend-only for now - uses localStorage for authentication
 * Can be extended later to use backend APIs
 */

import { localAuthService } from './authLocal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// ============= AUTHENTICATION SERVICE =============
export const tokenService = {
  getToken: (): string | null => {
    return localAuthService.getToken();
  },

  clearToken: (): void => {
    localAuthService.logout();
  },
  
  isAuthenticated: (): Promise<boolean> => {
    return Promise.resolve(localAuthService.isAuthenticated());
  },

  getCurrentUser: () => {
    return localAuthService.getCurrentUser();
  },
};

// Generic API request handler (for future backend integration)
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = tokenService.getToken();

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 401) {
        tokenService.clearToken();
      }
      
      throw new Error(error.message || error.error || `API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// ============= USER AUTHENTICATION =============
export const authService = {
  signup: async (email: string, password: string, confirmPassword: string, name: string, phoneNumber: string, dateOfBirth: string) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await localAuthService.signup(email, password, name, phoneNumber, dateOfBirth);
    return response;
  },

  login: async (email: string, password: string) => {
    return await localAuthService.login(email, password);
  },

  logout: () => {
    localAuthService.logout();
    return Promise.resolve();
  },

  getProfile: async () => {
    const user = localAuthService.getCurrentUser();
    if (!user) throw new Error('No user logged in');
    return { user };
  },

  updateProfile: async (name: string, phoneNumber: string, dateOfBirth: string) => {
    const user = localAuthService.getCurrentUser();
    if (!user) throw new Error('No user logged in');
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('empowernest_users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);
    if (index !== -1) {
      users[index] = { ...users[index], name, phone: phoneNumber, dateOfBirth };
      localStorage.setItem('empowernest_users', JSON.stringify(users));
    }
    
    return { user: { ...user, name, phone: phoneNumber, dateOfBirth } };
  },

  changePassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    throw new Error('Feature not yet implemented');
  },
};

// ============= CYCLE TRACKER =============
export const cycleService = {
  getAllCycles: () =>
    apiRequest('/api/cycles', { method: 'GET' }),

  getLatestCycle: () =>
    apiRequest('/api/cycles/latest', { method: 'GET' }),

  getPredictions: () =>
    apiRequest('/api/cycles/predictions', { method: 'GET' }),

  getStatistics: () =>
    apiRequest('/api/cycles/statistics', { method: 'GET' }),

  createEntry: (data: {
    lastPeriodDate?: string;
    cycleLength?: number;
    periodLength?: number;
    regularCycle?: boolean;
    flow?: string;
    symptoms?: string[];
    notes?: string;
    cycleLengthDays?: number;
    cycleStartDate?: string;
  }) =>
    apiRequest('/api/cycles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEntry: (id: number, data: any) =>
    apiRequest(`/api/cycles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteEntry: (id: number) =>
    apiRequest(`/api/cycles/${id}`, { method: 'DELETE' }),
};

// ============= PREGNANCY TRACKER =============
export const pregnancyService = {
  getAllEntries: () =>
    apiRequest('/api/pregnancy', { method: 'GET' }),

  getLatestEntry: () =>
    apiRequest('/api/pregnancy/latest', { method: 'GET' }),

  getProgress: () =>
    apiRequest('/api/pregnancy/progress', { method: 'GET' }),

  createEntry: (data: {
    dueDate?: string;
    weight?: number;
    bloodPressure?: string;
    notes?: string;
    weeksPregnant?: number;
    healthStatus?: string;
  }) =>
    apiRequest('/api/pregnancy', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEntry: (id: number, data: any) =>
    apiRequest(`/api/pregnancy/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteEntry: (id: number) =>
    apiRequest(`/api/pregnancy/${id}`, { method: 'DELETE' }),
};

// ============= BABY CARE (Placeholder for future) =============
export const babyCareService = {
  getVaccinations: () =>
    apiRequest('/api/baby-care/vaccinations', { method: 'GET' }),

  saveVaccination: (data: any) =>
    apiRequest('/api/baby-care/vaccinations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMilestones: () =>
    apiRequest('/api/baby-care/milestones', { method: 'GET' }),

  saveMilestone: (data: any) =>
    apiRequest('/api/baby-care/milestones', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getGrowthData: () =>
    apiRequest('/api/baby-care/growth', { method: 'GET' }),

  saveGrowthData: (data: any) =>
    apiRequest('/api/baby-care/growth', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default {
  authService,
  cycleService,
  pregnancyService,
  babyCareService,
  tokenService,
};
