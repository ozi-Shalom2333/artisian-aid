import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRoles && userRole) {
    const normalizedUserRole = userRole.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      
      if (normalizedUserRole === 'admin') {
        return <Navigate to="/admindashboard" replace />;
      } else if (normalizedUserRole === 'artisan') {
        return <Navigate to="/artisandashboard" replace />;
      } else if (normalizedUserRole === 'employer') {
        return <Navigate to="/employerdashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }


  return <Outlet />;
};

export default PrivateRoute;