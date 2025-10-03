import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Mail, Lock, Eye, EyeOff, LogIn, RefreshCw } from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext.tsx';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

const LoginForm = () => {
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
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // ===== FUNÇÃO PARA REENVIAR EMAIL DE VERIFICAÇÃO =====
  const handleResendVerificationEmail = async (email) => {
    try {
      console.log('📧 Reenviando email de verificação para:', email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) {
        console.error('❌ Erro ao reenviar:', error);
        alert('❌ Erro ao reenviar email: ' + error.message);
      } else {
        console.log('✅ Email reenviado com sucesso');
        
        // Detectar provedor de email
        const emailDomain = email.split('@')[1].toLowerCase();
        const emailProviders = {
          'gmail.com': 'https://mail.google.com',
          'hotmail.com': 'https://outlook.live.com',
          'outlook.com': 'https://outlook.live.com',
          'yahoo.com': 'https://mail.yahoo.com',
          'icloud.com': 'https://www.icloud.com/mail',
          'uol.com.br': 'https://email.uol.com.br',
          'bol.com.br': 'https://email.bol.uol.com.br',
          'terra.com.br': 'https://webmail.terra.com.br'
        };
        
        const emailProviderUrl = emailProviders[emailDomain];
        
        const successMessage = 
          `✅ Email reenviado com sucesso!\n\n` +
          `📧 Verifique sua caixa de entrada: ${email}\n\n` +
          `📬 Procure por um email de: noreply@mail.app.supabase.io\n\n` +
          `${emailProviderUrl ? '🚀 Quer abrir sua caixa de entrada agora?' : '⏰ O email pode demorar alguns minutos.'}`;
        
        if (emailProviderUrl) {
          const openEmail = window.confirm(successMessage);
          if (openEmail) {
            window.open(emailProviderUrl, '_blank');
          }
        } else {
          alert(successMessage);
        }
      }
    } catch (error) {
      console.error('💥 Erro crítico ao reenviar:', error);
      alert('❌ Erro inesperado ao reenviar email. Tente novamente.');
    }
  };

  // Handle form submission - VERSÃO MELHORADA
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha email e senha');
      return;
    }

    setLoading(true);

    try {
      console.log('🔑 Tentando fazer login...', { email });

      await login(email.trim(), password.trim());
      
      // Se chegou aqui, login foi bem-sucedido
      console.log('✅ Login realizado com sucesso');
      
      // O redirecionamento é automático via AuthContext
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
      
      // ===== TRATAMENTO ESPECÍFICO DE ERROS =====
      
      let errorMessage = 'Erro ao fazer login';
      let errorDetails = '';
      let showResendOption = false;
      
      if (error.message) {
        const msg = error.message.toLowerCase();
        
        if (msg.includes('email not confirmed') || 
            msg.includes('email_not_confirmed') ||
            msg.includes('email is not confirmed') ||
            msg.includes('confirm your email')) {
          
          // ERRO DE EMAIL NÃO CONFIRMADO
          errorMessage = '📧 Email não verificado';
          errorDetails = 'Você precisa confirmar seu email antes de fazer login.';
          showResendOption = true;
          
        } else if (msg.includes('invalid credentials') ||
                   msg.includes('invalid login credentials') ||
                   msg.includes('wrong password') ||
                   msg.includes('incorrect password')) {
          
          errorMessage = '🔒 Email ou senha incorretos';
          errorDetails = 'Verifique suas credenciais e tente novamente.';
          
        } else if (msg.includes('too many requests') ||
                   msg.includes('rate limit') ||
                   msg.includes('too many attempts')) {
          
          errorMessage = '⏱️ Muitas tentativas';
          errorDetails = 'Aguarde alguns minutos antes de tentar novamente.';
          
        } else if (msg.includes('user not found') ||
                   msg.includes('no user found') ||
                   msg.includes('user does not exist')) {
          
          errorMessage = '👤 Usuário não encontrado';
          errorDetails = 'Este email não está cadastrado. Que tal criar uma conta?';
          
        } else if (msg.includes('network') ||
                   msg.includes('connection') ||
                   msg.includes('fetch')) {
          
          errorMessage = '🌐 Erro de conexão';
          errorDetails = 'Verifique sua internet e tente novamente.';
          
        } else if (msg.includes('disabled') ||
                   msg.includes('suspended') ||
                   msg.includes('blocked')) {
          
          errorMessage = '🚫 Conta suspensa';
          errorDetails = 'Entre em contato com o suporte para mais informações.';
          
        } else {
          // Erro genérico
          errorMessage = '❌ ' + error.message;
          errorDetails = 'Se o problema persistir, contate o suporte.';
        }
      }
      
      setError(`${errorMessage}${errorDetails ? '\n' + errorDetails : ''}`);
      
      // ===== OPÇÃO DE REENVIO DE EMAIL =====
      if (showResendOption) {
        // Aguardar um pouco e mostrar opção de reenvio
        setTimeout(() => {
          const resend = window.confirm(
            `📧 Email não verificado!\n\n` +
            `Seu email (${email}) ainda não foi confirmado.\n\n` +
            `🔄 Quer que reenviemos o email de confirmação?\n\n` +
            `Clique OK para reenviar ou Cancelar para verificar sua caixa de entrada.`
          );
          
          if (resend) {
            handleResendVerificationEmail(email);
          } else {
            // Dar dicas de onde procurar
            alert(
              `📬 Verifique seu email!\n\n` +
              `Procure por um email de: noreply@mail.app.supabase.io\n\n` +
              `📂 Não esqueça de verificar:\n` +
              `• Caixa de entrada\n` +
              `• Spam/Lixo eletrônico\n` +
              `• Promoções (Gmail)\n` +
              `• Social (Gmail)\n\n` +
              `⏰ O email pode demorar alguns minutos para chegar.`
            );
          }
        }, 1000);
      }
      
      // Log detalhado para debug
      if (process.env.NODE_ENV === 'development') {
        console.group('🔍 Debug do Erro de Login');
        console.log('Tipo:', error.constructor.name);
        console.log('Mensagem original:', error.message);
        console.log('Mensagem tratada:', errorMessage);
        console.log('Detalhes:', errorDetails);
        console.log('Mostrar reenvio:', showResendOption);
        console.groupEnd();
      }
      
    } finally {
      setLoading(false);
    }
  };

  // Função para preencher credenciais de teste
  const fillTestCredentials = () => {
    setEmail('teste@niposchool.com');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header do Nipo School */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">鳥</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nipo School</h1>
          <p className="text-gray-600">Faça login para continuar seus estudos</p>
          <p className="text-sm text-red-500 font-medium mt-1">
            🎵 "Se não for divertido, ninguém aprende. Se não for fácil, ninguém começa. Se não for TikTokável, ninguém compartilha."
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="seu@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message - MELHORADO */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-start">
                  <span className="mr-2 mt-0.5">⚠️</span>
                  <div>
                    <div className="whitespace-pre-line">{error}</div>
                    {error.includes('Email não verificado') && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <button
                          type="button"
                          onClick={() => handleResendVerificationEmail(email)}
                          className="inline-flex items-center text-sm text-red-700 hover:text-red-800 font-medium"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Reenviar email de confirmação
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Ainda não tem conta?{' '}
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm font-medium mb-2">🧪 Versão Beta - Credenciais de Teste:</p>
          <div className="text-blue-700 text-xs space-y-1 mb-3">
            <p><strong>Email:</strong> teste@niposchool.com</p>
            <p><strong>Senha:</strong> 123456</p>
          </div>
          <button
            type="button"
            onClick={fillTestCredentials}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            🔧 Usar Credenciais de Teste
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Nipo School App &copy; 2025
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Versão Beta • ADNIPO Suzano
          </p>
        </footer>
      </div>

      {/* Floating Musical Notes */}
      <div className="fixed top-20 left-10 text-red-200 text-3xl animate-bounce opacity-20 pointer-events-none">
        🎵
      </div>
      <div className="fixed bottom-20 right-10 text-red-200 text-2xl animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '1s'}}>
        🎶
      </div>
      <div className="fixed top-1/2 left-4 text-red-200 text-xl animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '2s'}}>
        🎼
      </div>
    </div>
  );
};

export default LoginForm;