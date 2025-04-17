import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || null);

  useEffect(() => {
    if (authToken && userInfo) {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
    }
  }, [authToken, userInfo]);

  const login = (token, user) => {
    setAuthToken(token);
    setUserInfo(user);
  };

  const logout = () => {
    setAuthToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
