import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * StructureBridge - Página de transição simplificada
 * Localização: src_new/pages/structure-bridge.jsx
 */
const StructureBridge = () => {
  const navigate = useNavigate();

  const adminPages = [
    {
      id: 'dashboard',
      title: 'Dashboard Admin',
      path: '/admin/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'students',
      title: 'Estudantes',
      path: '/admin/students',
      color: 'bg-green-500'
    },
    {
      id: 'teachers',
      title: 'Professores',
      path: '/admin/teachers',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nipo School</h1>
              <p className="text-sm text-gray-600">Sistema de Ensino Musical</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Sistema Ativo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🌉 Bridge - Centro de Navegação
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bem-vindo ao sistema Nipo School. Escolha uma seção para começar.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminPages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border"
              onClick={() => navigate(page.path)}
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white text-xl font-bold">
                    {page.title[0]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Acessar seção de {page.title.toLowerCase()}
                </p>
                <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Acessar →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Status do Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <p className="text-sm text-gray-600 mt-2">Servidor Ativo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">🚀</div>
              <p className="text-sm text-gray-600 mt-2">Performance OK</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">🔧</div>
              <p className="text-sm text-gray-600 mt-2">Sistema Configurado</p>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">🔍 Debug Info</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Estrutura: src_new (Nova arquitetura)</p>
            <p>• Router: SimpleRouter ativo</p>
            <p>• Hot Reload: Funcional</p>
            <p>• Timestamp: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureBridge;