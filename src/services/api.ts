/**
 * API Service Layer
 * Centralized location for all API calls
 * Uses httpOnly cookies for authentication (automatic on each request)
 * Backend: http://localhost:5001 (Aditya's Express server)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// ============= AUTHENTICATION SERVICE =============
export const tokenService = {
  // Cookies are handled automatically by the browser
  // No need to manually manage tokens
  
  isAuthenticated: async (): Promise<boolean> => {
    try {
      // Try to fetch profile - if it succeeds, user is authenticated
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'GET',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};

// Generic API request handler with automatic cookie support
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      credentials: 'include', // Include httpOnly cookies automatically
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      
      // Handle 401 - session expired
      if (response.status === 401) {
        // Clear any local state if needed
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
  signup: (email: string, password: string, confirmPassword: string, name: string, phoneNumber: string, dateOfBirth: string) =>
    apiRequest<any>('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, confirmPassword, name, phoneNumber, dateOfBirth }),
    }),

  login: (email: string, password: string) =>
    apiRequest<any>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiRequest<any>('/api/users/logout', { method: 'POST' }),

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
    lastPeriodDate: string;
    cycleLength: number;
    periodLength: number;
    regularCycle: boolean;
    flow: string;
    symptoms: string[];
    notes: string;
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
    dueDate: string;
    weight: number;
    bloodPressure: string;
    notes: string;
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
