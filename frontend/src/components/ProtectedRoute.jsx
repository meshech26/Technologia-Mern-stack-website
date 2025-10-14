import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If there's a token, render the child routes (using Outlet).
  // Otherwise, redirect the user to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;