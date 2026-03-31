import { Navigate } from 'react-router-dom';
import { tokenService } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Checks if user is authenticated (JWT token exists)
 * If authenticated: renders the page
 * If not authenticated: redirects to login page
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = tokenService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
