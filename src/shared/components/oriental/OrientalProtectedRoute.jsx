import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Shield, AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';

// 🛡️ MIDDLEWARE DE PROTEÇÃO ORIENTAL AVANÇADO
export const OrientalProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermissions = [],
  fallbackPath = '/dashboard',
  showLoadingState = true,
  allowedUserTypes = [] 
}) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState('');

  // 🧠 Verificações de segurança avançadas
  useEffect(() => {
    if (!loading && user && userProfile) {
      // Verificar tipo de usuário
      if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userProfile.tipo)) {
        setErrorType('user_type');
        setShowError(true);
        return;
      }

      // Verificar role específico
      if (requiredRole && userProfile.role !== requiredRole) {
        setErrorType('role');
        setShowError(true);
        return;
      }

      // Verificar permissões específicas
      if (requiredPermissions.length > 0) {
        const hasPermissions = requiredPermissions.every(permission => 
          userProfile.permissions?.includes(permission)
        );
        if (!hasPermissions) {
          setErrorType('permission');
          setShowError(true);
          return;
        }
      }

      // Todas as verificações passaram
      setShowError(false);
      setErrorType('');
    }
  }, [user, userProfile, loading, allowedUserTypes, requiredRole, requiredPermissions]);

  // 🔄 Loading State Oriental
  if (loading && showLoadingState) {
    return <OrientalLoadingScreen />;
  }

  // 🚫 Usuário não logado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Erro de permissão ou acesso
  if (showError) {
    return (
      <OrientalAccessDenied 
        errorType={errorType}
        userProfile={userProfile}
        requiredRole={requiredRole}
        requiredPermissions={requiredPermissions}
        fallbackPath={fallbackPath}
      />
    );
  }

  // ✅ Acesso autorizado
  return children;
};

// 🔄 Loading Screen Oriental
const OrientalLoadingScreen = () => {
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const phases = [
      '🔐 Verificando credenciais...',
      '👤 Carregando perfil...',
      '🛡️  Validando permissões...',
      '✨ Preparando experiência...'
    ];

    const interval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % phases.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const phases = [
    '🔐 Verificando credenciais...',
    '👤 Carregando perfil...',
    '🛡️  Validando permissões...',
    '✨ Preparando experiência...'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner Oriental */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-pink-200 rounded-full animate-spin border-t-pink-500"></div>
          <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500 absolute top-2 left-2 animation-delay-200"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Texto de loading */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            🌸 Nipo School
          </h2>
          <p className="text-gray-600 font-medium animate-pulse">
            {phases[loadingPhase]}
          </p>
        </div>
      </div>
    </div>
  );
};

// 🚫 Componente de Acesso Negado Oriental
const OrientalAccessDenied = ({ 
  errorType, 
  userProfile, 
  requiredRole, 
  requiredPermissions, 
  fallbackPath 
}) => {
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.href = fallbackPath;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fallbackPath]);

  // 📝 Mensagens de erro personalizadas
  const getErrorMessage = () => {
    switch (errorType) {
      case 'user_type':
        return {
          title: '🚫 Tipo de Usuário Inadequado',
          description: 'Esta área é restrita a tipos específicos de usuário.',
          details: `Seu tipo atual: ${userProfile?.tipo || 'Não definido'}`
        };
      case 'role':
        return {
          title: '🛡️ Role Insuficiente',
          description: 'Você não possui o nível de acesso necessário.',
          details: `Role necessário: ${requiredRole}`
        };
      case 'permission':
        return {
          title: '🔐 Permissões Insuficientes',
          description: 'Você não possui as permissões específicas necessárias.',
          details: `Permissões necessárias: ${requiredPermissions.join(', ')}`
        };
      default:
        return {
          title: '⚠️ Acesso Não Autorizado',
          description: 'Você não tem permissão para acessar esta área.',
          details: 'Entre em contato com o administrador se necessário.'
        };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Ícone de erro */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Card de erro principal */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-200 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {errorInfo.title}
          </h1>
          
          <p className="text-gray-600 text-center mb-6">
            {errorInfo.description}
          </p>

          {/* Detalhes do erro */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-700 font-medium">
              📋 Detalhes:
            </p>
            <p className="text-sm text-red-600 mt-1">
              {errorInfo.details}
            </p>
          </div>

          {/* Informações do usuário atual */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700 font-medium mb-2">
              👤 Seu perfil atual:
            </p>
            <div className="text-sm text-blue-600 space-y-1">
              <p>• Tipo: {userProfile?.tipo || 'Não definido'}</p>
              <p>• Nome: {userProfile?.full_name || 'Não informado'}</p>
              {userProfile?.role && <p>• Role: {userProfile.role}</p>}
            </div>
          </div>

          {/* Ações disponíveis */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = fallbackPath}
              className="
                w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500
                text-white rounded-xl hover:from-pink-600 hover:to-red-600
                transition-all duration-200 hover:scale-105
                flex items-center justify-center gap-2 shadow-lg
              "
            >
              <Home className="w-5 h-5" />
              Voltar ao Dashboard
            </button>

            <button
              onClick={() => window.history.back()}
              className="
                w-full px-4 py-3 bg-white border-2 border-gray-300
                text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-400
                transition-all duration-200 hover:scale-105
                flex items-center justify-center gap-2
              "
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar à Página Anterior
            </button>

            <button
              onClick={() => window.location.reload()}
              className="
                w-full px-4 py-3 bg-white border-2 border-blue-300
                text-blue-600 rounded-xl hover:bg-blue-50 hover:border-blue-400
                transition-all duration-200 hover:scale-105
                flex items-center justify-center gap-2
              "
            >
              <RefreshCw className="w-5 h-5" />
              Recarregar Página
            </button>
          </div>

          {/* Countdown */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Redirecionamento automático em <span className="font-bold text-pink-600">{countdown}</span>s
          </div>
        </div>

        {/* Informações de contato */}
        <div className="mt-6 text-center text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
          <p className="font-medium mb-1">🤝 Precisa de ajuda?</p>
          <p>Entre em contato com o administrador do sistema</p>
        </div>
      </div>
    </div>
  );
};

// 🎯 Hook para verificações de permissão mais específicas
export const useOrientalPermissions = () => {
  const { userProfile } = useAuth();

  const hasPermission = (permission) => {
    return userProfile?.permissions?.includes(permission) ?? false;
  };

  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  const hasUserType = (type) => {
    return userProfile?.tipo === type;
  };

  const isAdmin = () => {
    return hasUserType('admin') || hasRole('admin');
  };

  const isProfessor = () => {
    return hasUserType('professor') || hasRole('professor');
  };

  const isAluno = () => {
    return hasUserType('aluno') || hasRole('aluno');
  };

  return {
    hasPermission,
    hasRole,
    hasUserType,
    isAdmin,
    isProfessor,
    isAluno,
    permissions: userProfile?.permissions || [],
    role: userProfile?.role,
    userType: userProfile?.tipo
  };
};

export default OrientalProtectedRoute;