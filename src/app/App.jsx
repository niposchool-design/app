import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../shared/contexts/AuthContext.tsx';
import AppRouter from './router/AppRouter';
import '../styles/globals.css';

function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter> 
  );
}

export default App;