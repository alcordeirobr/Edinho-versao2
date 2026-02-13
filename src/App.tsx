import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import PDV from './pages/PDV';
import Estoque from './pages/Estoque';
import Caixa from './pages/Caixa';
import Courier from './pages/Courier';
import Admin from './pages/Admin';
import { RoutePath } from './types';

// Simple guard component for demo purposes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, check auth token here
  const isAuthenticated = true; 
  if (!isAuthenticated) {
    return <Navigate to={RoutePath.LOGIN} replace />;
  }
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePath.LOGIN} element={<Login />} />
        
        <Route path="/" element={<Navigate to={RoutePath.LOGIN} replace />} />
        
        <Route path={RoutePath.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path={RoutePath.KANBAN} element={<ProtectedRoute><Kanban /></ProtectedRoute>} />
        <Route path={RoutePath.PDV} element={<ProtectedRoute><PDV /></ProtectedRoute>} />
        <Route path={RoutePath.ESTOQUE} element={<ProtectedRoute><Estoque /></ProtectedRoute>} />
        <Route path={RoutePath.CAIXA} element={<ProtectedRoute><Caixa /></ProtectedRoute>} />
        <Route path={RoutePath.COURIER} element={<ProtectedRoute><Courier /></ProtectedRoute>} />
        <Route path={RoutePath.ADMIN} element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={RoutePath.DASHBOARD} replace />} />
      </Routes>
    </Router>
  );
};

export default App;