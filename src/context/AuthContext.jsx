import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Verify token with backend
          const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.valid) {
            setAuthToken(token);
            setUserData(response.data.user);
          } else {
            // Token invalid or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            setAuthToken(null);
            setUserData(null);
          }
        } catch (error) {
          console.error('Token verification error:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userEmail');
          setAuthToken(null);
          setUserData(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
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