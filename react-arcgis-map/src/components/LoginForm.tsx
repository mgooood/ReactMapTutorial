// src/components/LoginForm.tsx

// These imports provide functionality for our login form:
// - useState: Helps us store and update the username, password, and any error messages
// - useNavigate: Lets us change pages after successful login
// - useAuth: Gives us access to login/logout functions
// - LoginForm.css: The styles for our login form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginForm.css';

// Type imports should be separate from value imports for best practices
// - FormEvent: A type that represents when a form is submitted
import type { FormEvent } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{username?: string, password?: string}>({});
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  // Form validation
  const validateForm = () => {
    const errors: {username?: string, password?: string} = {};
    
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(username, password);
      navigate('/map'); // Redirect to map page after login
    } catch (err) {
      // Error is handled in the AuthContext
    }
  };
  
  return (
    <div className="login-container">
      <h2>Log in to ArcGIS Map</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="form-error" role="alert">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            aria-invalid={!!formErrors.username}
            aria-describedby={formErrors.username ? "username-error" : undefined}
          />
          {formErrors.username && (
            <div className="field-error" id="username-error">{formErrors.username}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            aria-invalid={!!formErrors.password}
            aria-describedby={formErrors.password ? "password-error" : undefined}
          />
          {formErrors.password && (
            <div className="field-error" id="password-error">{formErrors.password}</div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading} 
          className="login-button"
          aria-busy={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
        
        <div className="demo-credentials">
          <p><strong>Demo credentials:</strong></p>
          <p>Username: <code>demo</code> / Password: <code>password</code></p>
        </div>
      </form>
    </div>
  );
};