import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SimpleAuthProvider } from '@new/contexts/simple-auth-context';
import DebugRouter from '@new/router/debug-router';

/**
 * DebugApp - Aplicação simplificada com debug extensivo
 */
const DebugApp = () => {
  console.log('🚀 DebugApp iniciada');

  return (
    <BrowserRouter>
      <SimpleAuthProvider>
        <div className="min-h-screen bg-gray-50">
          <DebugRouter />
        </div>
      </SimpleAuthProvider>
    </BrowserRouter>
  );
};

export default DebugApp;