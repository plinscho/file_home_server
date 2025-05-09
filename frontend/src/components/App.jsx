import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider/Authprovider';
import LoginRegister from './LoginRegister/LoginRegister';
import HomePage from './HomePage/HomePage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// App with auth provider
function AppWithAuth() {
  const { login } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  
useEffect(() => {
  if (!isInitialized) {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        login(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem('user'); // Clear corrupted data
    }
    setIsInitialized(true);
  }
}, [login, isInitialized]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

// Main app component
function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

export default App;