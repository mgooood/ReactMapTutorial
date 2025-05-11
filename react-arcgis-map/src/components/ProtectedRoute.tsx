// src/components/ProtectedRoute.tsx

// Important imports for our protected route:
// - Navigate: Used to automatically redirect users to another page
// - useAuth: Gives us access to the login information we created
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Note: We're using React.ReactNode from the global React namespace
// Another approach would be to import it directly with: import type { ReactNode } from 'react';

// Define our component props with proper type imports
interface ProtectedRouteProps {
  children: React.ReactNode; // We use React namespace here since we're not importing ReactNode directly
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the protected content
  return <>{children}</>;
};