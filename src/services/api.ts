/**
 * API Service Layer
 * Centralized location for all API calls
 * Uses JWT tokens sent via Authorization header
 * Backend: Vercel Serverless Functions
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Token storage (localStorage for Vercel deployment)
const TOKEN_KEY = 'auth_token';

// ============= AUTHENTICATION SERVICE =============
export const tokenService = {
  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Save token to localStorage
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Clear token
  clearToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return false;

      // Try to fetch profile - if it succeeds, user is authenticated
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};

// Generic API request handler with JWT support
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
      
      // Handle 401 - session expired
      if (response.status === 401) {
        tokenService.clearToken();
        // Redirect to login will be handled by ProtectedRoute
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
    const response = await apiRequest<any>('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, confirmPassword, name, phoneNumber, dateOfBirth }),
    });
    
    // Save token to localStorage
    if (response.token) {
      tokenService.setToken(response.token);
    }
    
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await apiRequest<any>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Save token to localStorage
    if (response.token) {
      tokenService.setToken(response.token);
    }
    
    return response;
  },

  logout: () => {
    tokenService.clearToken();
    return Promise.resolve();
  },

  getProfile: () =>
    apiRequest('/api/users/profile', { method: 'GET' }),

  updateProfile: (name: string, phoneNumber: string, dateOfBirth: string) =>
    apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, phoneNumber, dateOfBirth }),
    }),

  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) =>
    apiRequest('/api/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    }),
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
