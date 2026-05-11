/**
 * Local Storage Authentication Service
 * Frontend-only authentication using localStorage
 * Can be extended later to use backend APIs
 */

// Default test user for demo
const DEFAULT_USER = {
  email: 'chawlaadityavikram@gmail.com',
  password: 'admin123',
  name: 'Aditya Chawla',
  phone: '9876543210',
  dateOfBirth: '1995-05-15',
};

const AUTH_KEY = 'empowernest_auth';
const USERS_KEY = 'empowernest_users';

// ============= LOCAL STORAGE AUTH SERVICE =============
export const localAuthService = {
  // Initialize default user if no users exist
  initialize: () => {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      const defaultUsers = [DEFAULT_USER];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  },

  // Signup with email and password
  signup: async (email: string, password: string, name: string, phone: string, dateOfBirth: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    // Add new user
    const newUser = { email, password, name, phone, dateOfBirth };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Auto-login after signup
    return {
      user: { email, name, phone, dateOfBirth },
      token: 'local_' + Date.now(), // Simple token
    };
  },

  // Login with email and password
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Find user by email and password
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Create auth token
    const token = 'local_' + Date.now();
    
    // Store auth info
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      token,
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
      },
    }));

    return {
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
      },
      token,
    };
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Get current user
  getCurrentUser: () => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return null;
    
    try {
      const { user } = JSON.parse(auth);
      return user;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_KEY);
  },

  // Get token
  getToken: (): string | null => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return null;
    
    try {
      const { token } = JSON.parse(auth);
      return token;
    } catch {
      return null;
    }
  },
};

// Initialize on load
localAuthService.initialize();

export default localAuthService;
