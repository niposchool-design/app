import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { 
  BookOpen, 
  Plus, 
  BarChart3, 
  User, 
  Grid,
  Home,
  LogOut,
  Bell,
  Search,
  RefreshCw,
  ChevronRight,
  Star,
  Eye,
  Download,
  FileText,
  Video,
  Lightbulb,
  Heart
} from 'lucide-react';
import QuickSwitch from '../components/QuickSwitch';
import { NipoHeaderLogo } from '../../../shared/components/ui/NipoLogo';

const ProfessoresLayout = () => {
  const { user, userProfile, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 🛡️ ANTI-LOOP: Refs para controlar redirects
  const hasRedirectedAuth = useRef(false);
  const hasRedirectedPermission = useRef(false);
  const lastAuthState = useRef(null);

  // Evita problemas de hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🛡️ ANTI-LOOP: Verificar permissões COM PROTEÇÃO
  useEffect(() => {
    // ✅ Aguardar loading terminar
    if (loading) return;
    
    // ✅ Aguardar montagem do componente
    if (!mounted) return;

    const currentAuthState = `${!!user}-${!!userProfile}-${userProfile?.tipo_usuario}`;

    // ✅ Se o estado de auth mudou, resetar flags
    if (lastAuthState.current !== currentAuthState) {
      hasRedirectedAuth.current = false;
      hasRedirectedPermission.current = false;
      lastAuthState.current = currentAuthState;
    }

    // ✅ Verificar autenticação - SEM REDIRECT EM LOOP
    if (!user && !hasRedirectedAuth.current) {
      console.log('❌ ProfessoresLayout: Usuário não autenticado, redirecionando para login...');
      hasRedirectedAuth.current = true;
      navigate('/login', { replace: true });
      return;
    }

    // ✅ Verificar permissão de professor - SEM REDIRECT EM LOOP
    if (user && userProfile && 
        !['professor', 'admin'].includes(userProfile.tipo_usuario) && 
        !hasRedirectedPermission.current) {
      console.log(`❌ ProfessoresLayout: Usuário ${userProfile.tipo_usuario} sem permissão, redirecionando...`);
      hasRedirectedPermission.current = true;
      navigate('/dashboard', { replace: true });
      return;
    }

    // ✅ Sucesso - resetar flags para próxima navegação
    if (user && userProfile && ['professor', 'admin'].includes(userProfile.tipo_usuario)) {
      hasRedirectedAuth.current = false;
      hasRedirectedPermission.current = false;
    }
  }, [loading, mounted, user, userProfile, navigate]);

  // Reset flags ao mudar de rota
  useEffect(() => {
    if (location.pathname !== '/professores') {
      hasRedirectedAuth.current = false;
      hasRedirectedPermission.current = false;
    }
  }, [location.pathname]);

  // Fechar busca no mobile quando navegar
  useEffect(() => {
    setSearchTerm('');
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redireciona para a landing page
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/professores/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 🔒 Proteção contra renderização sem permissão
  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Carregando Área dos Professores</h2>
          <p className="text-gray-600">Verificando permissões...</p>
          <RefreshCw className="w-5 h-5 text-orange-500 animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  if (!user || !userProfile || !['professor', 'admin'].includes(userProfile.tipo_usuario)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Esta área é exclusiva para professores. Você será redirecionado em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              <NipoHeaderLogo />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar aulas, materiais..."
                className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 rounded-full border border-orange-200">
              <User className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Professor</span>
            </div>
            
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <span className="text-white text-sm sm:text-base font-bold">
                {userProfile?.full_name?.charAt(0) || 'P'}
              </span>
            </div>

            {/* Quick Switch */}
            <QuickSwitch />
            
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aulas, materiais..."
              className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
            />
          </form>
        </div>
      </nav>

      {/* Main Content - Layout Simplificado */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Action Button */}
      <Link
        to="/professores/novo"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 z-40"
      >
        <Plus className="w-6 h-6" />
      </Link>

      {/* Floating Elements - EDUCACIONAIS */}
      <div className="fixed top-1/4 left-4 text-green-200 text-2xl animate-bounce opacity-20 pointer-events-none">
        📚
      </div>
      <div className="fixed top-1/3 right-8 text-green-200 text-xl animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '1s'}}>
        ✨
      </div>
      <div className="fixed bottom-1/3 left-8 text-green-200 text-lg animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '2s'}}>
        🎓
      </div>
      <div className="fixed bottom-1/4 right-4 text-green-200 text-xl animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '0.5s'}}>
        💡
      </div>
    </div>
  );
};

export default ProfessoresLayout;