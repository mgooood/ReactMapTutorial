// src/App.tsx

// Imports for our main App component:
// - Router, Routes, Route, Navigate: React Router components for handling navigation and URL routing
// - AuthProvider: Wraps our app with login functionality
// - ProtectedRoute: Only allows logged-in users to see certain pages
// - LoginForm: Our login screen component
// - MapView: The map component we'll create in the next tutorial
// - App.css: The main styles for our entire app
//
// Note: This component doesn't need any type-only imports. If it did, we would follow best
// practices by using the 'import type' syntax as shown in previous components.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginForm } from './components/LoginForm';
import { MapViewComponent } from './components/MapView';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>React ArcGIS Map Application</h1>
          </header>
          
          <main className="app-content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route 
                path="/map" 
                element={
                  <ProtectedRoute>
                    <MapViewComponent />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;