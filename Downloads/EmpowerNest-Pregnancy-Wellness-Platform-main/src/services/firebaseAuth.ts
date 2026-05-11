/**
 * Firebase Authentication Service
 * Handles Google Sign-In and user management
 */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

export const firebaseAuthService = {
  /**
   * Sign in with Google
   */
  signInWithGoogle: async (): Promise<FirebaseUser> => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Add custom parameters for better UX
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({
        prompt: 'consent',
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Convert Firebase user to our interface
      const firebaseUser: FirebaseUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      };

      // Store user info in localStorage for quick access
      localStorage.setItem('firebase_user', JSON.stringify(firebaseUser));
      localStorage.setItem('firebase_token', await user.getIdToken());

      return firebaseUser;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  },

  /**
   * Sign out
   */
  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem('firebase_user');
      localStorage.removeItem('firebase_token');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  },

  /**
   * Get current user from Firebase
   */
  getCurrentUser: (): FirebaseUser | null => {
    const userStr = localStorage.getItem('firebase_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        return null;
      }
    }
    return null;
  },

  /**
   * Get current user from Auth state (real-time)
   */
  getCurrentAuthUser: (): User | null => {
    return auth.currentUser;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return localStorage.getItem('firebase_user') !== null;
  },

  /**
   * Get Firebase ID Token
   */
  getToken: async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        localStorage.setItem('firebase_token', token);
        return token;
      } catch (error) {
        console.error('Error getting token:', error);
        return null;
      }
    }
    return localStorage.getItem('firebase_token');
  },

  /**
   * Refresh auth state from localStorage
   */
  restoreSession: (): FirebaseUser | null => {
    return firebaseAuthService.getCurrentUser();
  },
};
