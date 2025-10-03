import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Mail, Lock, Eye, EyeOff, LogIn, RefreshCw } from 'lucide-react';
import { useAuth } from '@new/contexts/real-auth-context';

/**
 * RealLoginForm - Formulário de login com Supabase real
 * Localização: src_new/pages/real-login.jsx
 */
const RealLoginForm = () => {
  const navigate = useNavigate();
  const { user, login, loading: authLoading } = useAuth();
  
  // States do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirecionamento automático se já logado
  useEffect(() => {
    if (user && !authLoading) {
      console.log('✅ Usuário já logado, redirecionando...');
      // O AuthContext já vai fazer o redirecionamento inteligente
    }
  }, [user, authLoading]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Tentando login:', email);

    try {
      // Validação básica
      if (!email || !password) {
        setError('Por favor, preencha todos os campos');
        return;
      }

      if (!email.includes('@')) {
        setError('Por favor, insira um email válido');
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      // Fazer login
      const result = await login(email, password);
      console.log('📤 Resultado do login:', result);

      if (result.success) {
        console.log('✅ Login bem-sucedido!');
        // O AuthContext já vai redirecionar automaticamente
      } else if (result.needsEmailVerification) {
        setError(result.error);
        // Aqui poderíamos mostrar botão para reenviar email
      } else {
        setError(result.error || 'Erro no login');
      }
    } catch (error) {
      console.error('❌ Erro inesperado:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Se já está logado, mostrar loading
  if (user && !authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white">🎵</span>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Nipo School
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Faça seu login
          </h2>
          <p className="text-gray-600">
            Sistema Oriental de Ensino Musical
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading || authLoading ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Entrando...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </>
            )}
          </button>

          {/* Links */}
          <div className="space-y-3 text-center">
            <div>
              <Link
                to="/register"
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Não tem conta? Cadastre-se
              </Link>
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Voltar ao início
              </button>
            </div>
          </div>
        </form>

        {/* System Info */}
        <div className="text-center text-xs text-gray-500">
          <p>Sistema com autenticação real via Supabase</p>
          <p>Redirecionamento automático baseado no seu perfil</p>
        </div>
      </div>
    </div>
  );
};

export default RealLoginForm;