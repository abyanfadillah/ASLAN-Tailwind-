import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../database/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();



  if (!user) {
    return <Navigate to='/masukakun' />;
  }

  return children;

};

export default ProtectedRoute;
