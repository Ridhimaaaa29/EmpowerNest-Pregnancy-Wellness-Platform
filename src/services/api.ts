/**
 * API Service Layer
 * Centralized location for all API calls
 * This replaces direct localStorage usage for data persistence
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// ============= USER AUTHENTICATION =============
export const authService = {
  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (userData: any) =>
    apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () =>
    apiRequest('/api/auth/logout', { method: 'POST' }),

  getProfile: () =>
    apiRequest('/api/auth/profile', { method: 'GET' }),
};

// ============= CYCLE TRACKER =============
export const cycleService = {
  getCycleData: () =>
    apiRequest('/api/cycle', { method: 'GET' }),

  createCycleEntry: (data: any) =>
    apiRequest('/api/cycle', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCycleEntry: (id: string, data: any) =>
    apiRequest(`/api/cycle/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCycleEntry: (id: string) =>
    apiRequest(`/api/cycle/${id}`, { method: 'DELETE' }),
};

// ============= PREGNANCY TRACKER =============
export const pregnancyService = {
  getPregnancyData: () =>
    apiRequest('/api/pregnancy', { method: 'GET' }),

  createPregnancyEntry: (data: any) =>
    apiRequest('/api/pregnancy', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePregnancyEntry: (id: string, data: any) =>
    apiRequest(`/api/pregnancy/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// ============= BABY CARE =============
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
};
