import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSimpleAuth } from '@new/contexts/simple-auth-context';

/**
 * SimpleLoginPage - Página de login simplificada com debug
 */
const SimpleLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useSimpleAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  console.log('🔐 LoginPage renderizada', { location: location.pathname });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Enviando formulário de login...');
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const result = await login(formData.email, formData.password);
    console.log('📤 Resultado do login:', result);

    if (result.success) {
      console.log('✅ Login bem-sucedido! Redirecionando para:', result.redirectPath);
      
      // Tentar diferentes estratégias de navegação
      setTimeout(() => {
        navigate(result.redirectPath, { replace: true });
      }, 100);
      
    } else {
      console.error('❌ Login falhou:', result.error);
      setError(result.error);
    }
  };

  const fillDemoUser = (role) => {
    const demoUsers = {
      admin: { email: 'admin@niposchool.com', password: '123456' },
      teacher: { email: 'professor@niposchool.com', password: '123456' },
      student: { email: 'aluno@niposchool.com', password: '123456' }
    };

    console.log('🎭 Preenchendo usuário demo:', role);
    setFormData(demoUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">🎵 Nipo School</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Simplificado</h2>
          <p className="text-gray-600">Entre com suas credenciais</p>
        </div>

        {/* Debug Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 text-sm mb-2">🔍 Debug Info:</h3>
          <p className="text-xs text-blue-700">Página atual: {location.pathname}</p>
          <p className="text-xs text-blue-700">Loading: {loading ? 'Sim' : 'Não'}</p>
        </div>

        {/* Demo Users */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-gray-900 text-sm">Usuários Demo:</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => fillDemoUser('admin')}
              className="text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors text-sm"
            >
              👨‍💼 Admin: admin@niposchool.com
            </button>
            <button
              onClick={() => fillDemoUser('teacher')}
              className="text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors text-sm"
            >
              👨‍🏫 Professor: professor@niposchool.com
            </button>
            <button
              onClick={() => fillDemoUser('student')}
              className="text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors text-sm"
            >
              👨‍🎓 Aluno: aluno@niposchool.com
            </button>
          </div>
          <p className="text-xs text-gray-600">Senha para todos: 123456</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-sm text-gray-600 hover:text-gray-800"
          >
            ← Voltar ao início
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleLoginPage;