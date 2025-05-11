// src/contexts/AuthContext.tsx

// These imports provide essential React functionality:
// - createContext: Creates a way to share login information between different parts of the app
// - useContext: Helps components access the shared login information
// - useState: Keeps track of information that can change (like user details or error messages)
// - useEffect: Runs code when the component loads (used to check if user was previously logged in)
import { createContext, useContext, useState, useEffect } from 'react';

// Type imports should be separate from value imports for best practices
// - ReactNode: A TypeScript type that lets us accept any valid React content as children
import type { ReactNode } from 'react';

// Define types for our authentication
interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component that wraps our app and makes auth available
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Mock login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (username === 'demo' && password === 'password') {
        const user = { username };
        setUser(user);
        localStorage.setItem('auth_user', JSON.stringify(user));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  // Value that will be provided to consumers of this context
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};