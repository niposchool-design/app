import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SimpleRouter from '@new/router/simple-router';

/**
 * App - Versão simplificada para resolver travamentos
 * Localização: src_new/app/simple-app.jsx
 */
const SimpleApp = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <SimpleRouter />
      </div>
    </BrowserRouter>
  );
};

export default SimpleApp;