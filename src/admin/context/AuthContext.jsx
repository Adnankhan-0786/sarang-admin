import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function - calls backend API (falls back to mock if API is unavailable)
  const login = useCallback(
    async (email, password, role = 'SUPER_ADMIN') => {
      try {
        const { login: apiLogin } = await import('../services/api')
        const user = await apiLogin(email, password, role)
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('adminToken', user.token || 'mock_token_123')
        localStorage.setItem('adminUser', JSON.stringify(user))
        return true
      } catch (error) {
        // Fallback to mock authentication when API is not available.
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: role, // 'SUPER_ADMIN' or 'ADMIN'
          school: 'Sarang School',
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem('adminToken', 'mock_token_123')
        localStorage.setItem('adminUser', JSON.stringify(mockUser))
        return true
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }, []);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }, []);

  const hasRole = useCallback((requiredRole) => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true; // SUPER_ADMIN has all permissions
    return user.role === requiredRole;
  }, [user]);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
