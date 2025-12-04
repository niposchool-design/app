import React from 'react';

const NavigationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎌 Central de Navegação</h1>
          <p className="text-gray-600">Acesso rápido às funcionalidades do sistema</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <a href="/landing" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors text-center">
            Landing Page
          </a>
          <a href="/dashboard" className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center">
            Dashboard
          </a>
          <a href="/showcase" className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center">
            Components
          </a>
          <a href="/login" className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition-colors text-center">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;