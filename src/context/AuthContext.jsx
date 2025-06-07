import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userData, setUserData] = useState(() => {
    // Try to initialize from localStorage
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userId && userEmail) {
      return {
        id: userId,
        _id: userId, // Add both formats to be safe
        email: userEmail
      };
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      
      if (token && (userId || userEmail)) {
        try {
          // Set initial userData from localStorage to prevent null values
          setUserData({
            _id: userId, // Use _id format for MongoDB compatibility
            id: userId,  // Keep id for backward compatibility
            email: userEmail
          });
          
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          const data = await response.json();

          if (data.valid && data.user) {
            setAuthToken(token);
            // Make sure both id and _id formats are available
            setUserData({
              ...data.user,
              _id: data.user._id || data.user.id,
              id: data.user.id || data.user._id,
              email: data.user.email
            });
            console.log("User verified:", data.user);
          } else {
            // Token invalid or expired
            clearUserData();
          }
        } catch (error) {
          console.error('Token verification error:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            clearUserData();
          }
        }
      } else {
        setAuthToken(null);
        setUserData(null);
      }
      setLoading(false);
    };

    // Helper to clear user data
    const clearUserData = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      setAuthToken(null);
      setUserData(null);
    };

    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setAuthToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authToken, 
        setAuthToken, 
        userData, 
        setUserData, 
        isAuthenticated: !!authToken,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);