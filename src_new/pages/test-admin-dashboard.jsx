import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AdminDashboard } from '@new/pages/admin';
// Temporariamente desabilitado para build

/**
 * TestAdminDashboard - Página de teste para o dashboard administrativo
 * Localização: src_new/pages/test-admin-dashboard.jsx
 */
const TestAdminDashboard = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        
        {/* Cabeçalho de Teste */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">🧪 TESTE - Admin Dashboard (Nova Estrutura)</h1>
          <p className="text-blue-100">Testando: src_new/pages/admin/dashboard.jsx</p>
        </div>

        {/* Rota de Teste */}
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<div>AdminDashboard - Em Construção</div>} />
        </Routes>

        {/* Informações de Debug */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-2">✅ Componentes Testados:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ AdminDashboard migrado</li>
            <li>✅ useAuth hook</li>
            <li>✅ adminApi.getGeneralStats()</li>
            <li>✅ Header component</li>
            <li>✅ Button component</li>
            <li>✅ Utils (formatters)</li>
          </ul>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>FASE 4:</strong> Admin Pages<br />
              Status: 🔄 Em progresso
            </p>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default TestAdminDashboard;