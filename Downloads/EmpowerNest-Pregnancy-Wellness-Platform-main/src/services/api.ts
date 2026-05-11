/**
 * API Service Layer
 * Now integrates with Express backend
 * Falls back to localStorage for offline support
 */

import { localAuthService } from './authLocal';

const API_URL = import.meta.env.VITE_API_URL || '';

// ============= TOKEN SERVICE =============
export const tokenService = {
  getToken: (): string | null => {
    // Try to get from localStorage first
    try {
      const auth = localStorage.getItem('empowernest_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        return parsed.token || null;
      }
    } catch (e) {
      console.error('Error parsing auth token:', e);
    }
    return null;
  },

  setToken: (token: string): void => {
    const auth = JSON.parse(localStorage.getItem('empowernest_auth') || '{}');
    auth.token = token;
    localStorage.setItem('empowernest_auth', JSON.stringify(auth));
  },

  clearToken: (): void => {
    localAuthService.logout();
  },
  
  isAuthenticated: (): boolean => {
    return localAuthService.isAuthenticated();
  },

  getCurrentUser: () => {
    return localAuthService.getCurrentUser();
  },
};

// Generic API request handler
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
      credentials: 'include', // Include cookies
      ...options,
    });

    if (!response.ok) {
      let error: any;
      try {
        error = await response.json();
      } catch (e) {
        error = { error: response.statusText };
      }
      
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

    try {
      // Try backend first
      const response = await apiRequest('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          name,
          phoneNumber,
          dateOfBirth
        })
      }) as any;

      // Store token if returned
      if (response.token) {
        tokenService.setToken(response.token);
      }

      return response;
    } catch (error) {
      console.warn('Backend signup failed, falling back to localStorage:', error);
      // Fall back to localStorage
      return await localAuthService.signup(email, password, name, phoneNumber, dateOfBirth);
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Try backend first
      const response = await apiRequest('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }) as any;

      // Store token if returned
      if (response.token) {
        tokenService.setToken(response.token);
      }

      return response;
    } catch (error) {
      console.warn('Backend login failed, falling back to localStorage:', error);
      // Fall back to localStorage
      return await localAuthService.login(email, password);
    }
  },

  logout: () => {
    try {
      // Try backend logout
      apiRequest('/api/users/logout', { method: 'POST' }).catch(e => 
        console.warn('Backend logout failed:', e)
      );
    } catch (e) {
      console.warn('Backend logout error:', e);
    }
    
    // Always clear local state
    tokenService.clearToken();
    return Promise.resolve();
  },

  getProfile: async () => {
    try {
      return await apiRequest('/api/users/profile', { method: 'GET' });
    } catch (error) {
      console.warn('Backend profile fetch failed, using localStorage:', error);
      const user = localAuthService.getCurrentUser();
      if (!user) throw new Error('No user logged in');
      return { user };
    }
  },

  updateProfile: async (name: string, phoneNumber: string, dateOfBirth: string) => {
    try {
      return await apiRequest('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, phoneNumber, dateOfBirth })
      });
    } catch (error) {
      console.warn('Backend profile update failed, using localStorage:', error);
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
    }
  },

  changePassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      return await apiRequest('/api/users/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword })
      });
    } catch (error) {
      throw new Error('Failed to change password');
    }
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

  createCycle: (data: {
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

// ============= HEALTH RISK ASSESSMENT =============
export const healthRiskService = {
  getAllAssessments: () =>
    apiRequest('/api/health-risk', { method: 'GET' }),

  getLatestAssessment: () =>
    apiRequest('/api/health-risk/latest', { method: 'GET' }),

  createAssessment: (data: {
    age: number;
    weight: number;
    medicalConditions?: string[];
  }) =>
    apiRequest('/api/health-risk', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAssessment: (id: number, data: any) =>
    apiRequest(`/api/health-risk/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteAssessment: (id: number) =>
    apiRequest(`/api/health-risk/${id}`, { method: 'DELETE' }),
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
  healthRiskService,
  babyCareService,
  tokenService,
};
