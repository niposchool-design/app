import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@new/contexts/auth-context';

/**
 * LoginPage - Página de autenticação
 * Localização: src_new/pages/login.jsx
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  // URL de redirecionamento após login (se especificada)
  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirecionar para URL original ou dashboard baseado no role
      const redirectPath = from || result.redirectPath;
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillDemoUser = (role) => {
    const demoUsers = {
      admin: { email: 'admin@niposchool.com', password: '123456' },
      teacher: { email: 'professor@niposchool.com', password: '123456' },
      student: { email: 'aluno@niposchool.com', password: '123456' }
    };

    setFormData(demoUsers[role]);
    setShowDemoUsers(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            🎵 Nipo School
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Faça seu login
          </h2>
          <p className="text-gray-600">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        {/* Demo Users Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowDemoUsers(!showDemoUsers)}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Ver usuários de demonstração
          </button>
        </div>

        {/* Demo Users List */}
        {showDemoUsers && (
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <h3 className="font-medium text-blue-900 text-sm">Usuários Demo:</h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => fillDemoUser('admin')}
                className="w-full text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors"
              >
                <strong>👨‍💼 Admin:</strong> admin@niposchool.com
              </button>
              <button
                onClick={() => fillDemoUser('teacher')}
                className="w-full text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors"
              >
                <strong>👨‍🏫 Professor:</strong> professor@niposchool.com
              </button>
              <button
                onClick={() => fillDemoUser('student')}
                className="w-full text-left p-2 bg-white rounded hover:bg-blue-100 transition-colors"
              >
                <strong>👨‍🎓 Aluno:</strong> aluno@niposchool.com
              </button>
            </div>
            <p className="text-xs text-blue-700">Senha para todos: 123456</p>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Voltar ao início
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500">
          <p>Sistema Oriental de Ensino Musical</p>
          <p>O redirecionamento é automático baseado no seu perfil</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;