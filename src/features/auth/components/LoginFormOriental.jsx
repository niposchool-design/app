import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';

// Sistema Oriental Avançado
import {
  OrientalForm,
  OrientalInput, 
  OrientalFormButton
} from '../../../shared/components/oriental/OrientalAdvanced';

const LoginFormOriental = () => {
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

  // Função para reenviar email de verificação
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

  // Handle form submission
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
      
      // Tratar diferentes tipos de erro
      if (error.message?.includes('Email not confirmed')) {
        setError(
          <div className="space-y-3">
            <p className="font-semibold text-red-700">📧 Email não verificado</p>
            <p className="text-sm text-red-600">
              Você precisa confirmar seu email antes de fazer login.
            </p>
            <button
              type="button"
              onClick={() => handleResendVerificationEmail(email)}
              className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              🔄 Reenviar email de verificação
            </button>
          </div>
        );
      } else if (error.message?.includes('Invalid login credentials')) {
        setError('❌ Email ou senha incorretos. Verifique suas credenciais.');
      } else if (error.message?.includes('Too many requests')) {
        setError('⏰ Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.');
      } else {
        setError(`❌ Erro ao fazer login: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-white text-2xl">🌸</span>
          </div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <OrientalForm
      onSubmit={handleSubmit}
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta Nipo School"
      level="teacher"
      loading={loading}
    >
      {/* Mensagem de Erro Oriental */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="text-red-800">
            {typeof error === 'string' ? error : error}
          </div>
        </div>
      )}

      {/* Campo de Email */}
      <OrientalInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu-email@exemplo.com"
        icon={Mail}
        required
        level="teacher"
        autoComplete="email"
      />

      {/* Campo de Senha */}
      <div className="relative">
        <OrientalInput
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          icon={Lock}
          required
          level="teacher"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Botão de Login */}
      <div className="space-y-4">
        <OrientalFormButton
          type="submit"
          variant="primary"
          level="teacher"
          loading={loading}
          disabled={loading || !email || !password}
          className="w-full"
        >
          <div className="flex items-center justify-center">
            <LogIn className="w-5 h-5 mr-2" />
            {loading ? 'Entrando...' : 'Entrar'}
          </div>
        </OrientalFormButton>

        {/* Link para Cadastro */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Ainda não tem uma conta?{' '}
            <Link 
              to="/register"
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>

        {/* Link para Recuperação de Senha */}
        <div className="text-center">
          <Link 
            to="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>

      {/* Footer Oriental */}
      <div className="text-center pt-6 border-t border-orange-100">
        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <span>🌸</span>
          <span>Nipo School</span>
          <span>•</span>
          <span>Sistema Oriental</span>
          <span>🎌</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          "Educação Musical com Tradição Oriental"
        </p>
      </div>
    </OrientalForm>
  );
};

export default LoginFormOriental;