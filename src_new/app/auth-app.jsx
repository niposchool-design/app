import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@new/contexts/auth-context';
import AuthRouter from '@new/router/auth-router';

/**
 * AuthApp - Aplicação principal com sistema de autenticação
 * Localização: src_new/app/auth-app.jsx
 */
const AuthApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AuthRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AuthApp;