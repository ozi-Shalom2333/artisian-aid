import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           
  const navigate = useNavigate();

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored?.token) {
      setUser(stored);
    }
  }, []);

  
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate(getDashboardRoute(userData.role));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');  
  };

  
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'employer': return '/employer/dashboard';
      case 'artisan':  return '/artisan/dashboard';
      case 'admin':    return '/admin/dashboard';
      default:         return '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getDashboardRoute }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
