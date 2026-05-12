import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { tokenService } from '../services/api';

describe('Token Service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getToken', () => {
    it('should return null when no token is stored', () => {
      const token = tokenService.getToken();
      expect(token).toBeNull();
    });

    it('should return the stored token', () => {
      const testToken = 'test-token-123';
      localStorage.setItem('empowernest_auth', JSON.stringify({ token: testToken }));
      
      const token = tokenService.getToken();
      expect(token).toBe(testToken);
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('empowernest_auth', 'invalid-json{');
      
      const token = tokenService.getToken();
      expect(token).toBeNull();
    });
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      const testToken = 'new-test-token';
      
      tokenService.setToken(testToken);
      
      const stored = JSON.parse(localStorage.getItem('empowernest_auth') || '{}');
      expect(stored.token).toBe(testToken);
    });

    it('should preserve existing auth data when setting token', () => {
      const existingAuth = { userId: '123', token: 'old-token' };
      localStorage.setItem('empowernest_auth', JSON.stringify(existingAuth));
      
      const newToken = 'new-token';
      tokenService.setToken(newToken);
      
      const stored = JSON.parse(localStorage.getItem('empowernest_auth') || '{}');
      expect(stored.userId).toBe('123');
      expect(stored.token).toBe(newToken);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no token exists', () => {
      const isAuth = tokenService.isAuthenticated();
      expect(isAuth).toBe(false);
    });

    it('should return true when token exists', () => {
      localStorage.setItem('empowernest_auth', JSON.stringify({ token: 'test-token' }));
      
      const isAuth = tokenService.isAuthenticated();
      expect(isAuth).toBe(true);
    });
  });
});
