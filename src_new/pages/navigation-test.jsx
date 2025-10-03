import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, XCircle, ArrowRight, Home, Settings, 
  Users, BookOpen, Music, Crown, RefreshCw 
} from 'lucide-react';

// ✅ NOVA ESTRUTURA - Imports de teste
import { useAuth } from '@new/hooks';
import { Header } from '@new/components/layout';
import { Button } from '@new/components/ui';
import { FEATURE_FLAGS } from '@new/lib/utils/feature-flags';

/**
 * NavigationTest - Página de testes de navegação
 * Localização: src_new/pages/navigation-test.jsx
 */
const NavigationTest = () => {
  const { userProfile, isAdmin, isAuthenticated } = useAuth();

  const testRoutes = [
    {
      category: 'Páginas Públicas',
      routes: [
        { path: '/', label: 'Landing Page', icon: Home },
        { path: '/login', label: 'Login', icon: Users },
        { path: '/register', label: 'Registro', icon: Users }
      ]
    },
    {
      category: 'Dashboard',
      routes: [
        { path: '/dashboard', label: 'Dashboard Principal', icon: Home, requiresAuth: true }
      ]
    },
    {
      category: 'Nova Estrutura Admin',
      routes: [
        { path: '/admin-new', label: 'Admin Dashboard', icon: Crown, requiresAdmin: true },
        { path: '/admin-new/students', label: 'Gestão de Estudantes', icon: Users, requiresAdmin: true },
        { path: '/admin-new/teachers', label: 'Gestão de Professores', icon: Users, requiresAdmin: true },
        { path: '/admin-new/instruments', label: 'Gestão de Instrumentos', icon: Music, requiresAdmin: true },
        { path: '/admin-new/curriculum', label: 'Gestão de Currículo', icon: BookOpen, requiresAdmin: true }
      ]
    },
    {
      category: 'Sistema Legacy',
      routes: [
        { path: '/admin-legacy', label: 'Admin Legacy', icon: Settings, requiresAdmin: true },
        { path: '/alunos', label: 'Alunos Legacy', icon: Users, requiresAuth: true },
        { path: '/professores', label: 'Professores Legacy', icon: Users, requiresAuth: true }
      ]
    },
    {
      category: 'Páginas de Integração',
      routes: [
        { path: '/bridge', label: 'Structure Bridge', icon: RefreshCw, requiresAdmin: true },
        { path: '/test-new', label: 'Teste Nova Estrutura', icon: Settings, requiresAuth: true }
      ]
    }
  ];

  const StatusIcon = ({ available, reason }) => {
    if (available) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return (
      <div className="flex items-center">
        <XCircle className="w-4 h-4 text-red-500" />
        {reason && <span className="text-xs text-gray-500 ml-1">({reason})</span>}
      </div>
    );
  };

  const RouteCard = ({ route }) => {
    let available = true;
    let reason = '';

    if (route.requiresAuth && !isAuthenticated) {
      available = false;
      reason = 'Login necessário';
    } else if (route.requiresAdmin && !isAdmin) {
      available = false;
      reason = 'Admin necessário';
    }

    return (
      <div className={`bg-white rounded-lg border p-4 ${
        available ? 'hover:shadow-md hover:border-red-200' : 'opacity-60'
      } transition-all`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <route.icon className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">{route.label}</h3>
              <p className="text-sm text-gray-500">{route.path}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <StatusIcon available={available} reason={reason} />
            {available ? (
              <Link to={route.path}>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" disabled>
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Teste de Navegação - FASE 5
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Teste todas as rotas disponíveis e verifique a integração entre 
            a nova estrutura e o sistema legacy.
          </p>
        </div>

        {/* Status do usuário */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status da Sessão
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">
                {isAuthenticated ? '✅' : '❌'}
              </div>
              <div className="text-sm">
                <strong>Autenticado:</strong><br />
                {isAuthenticated ? 'Sim' : 'Não'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">
                {isAdmin ? '👑' : '👤'}
              </div>
              <div className="text-sm">
                <strong>Admin:</strong><br />
                {isAdmin ? 'Sim' : 'Não'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">
                {userProfile?.nome ? '👋' : '❓'}
              </div>
              <div className="text-sm">
                <strong>Usuário:</strong><br />
                {userProfile?.nome || 'Não identificado'}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Feature Flags Ativas
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className={`text-2xl mb-2 ${FEATURE_FLAGS.USE_NEW_STRUCTURE ? 'text-green-600' : 'text-red-600'}`}>
                {FEATURE_FLAGS.USE_NEW_STRUCTURE ? '✅' : '❌'}
              </div>
              <div className="text-blue-700">Nova Estrutura</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl mb-2 ${FEATURE_FLAGS.USE_NEW_ADMIN_PAGES ? 'text-green-600' : 'text-red-600'}`}>
                {FEATURE_FLAGS.USE_NEW_ADMIN_PAGES ? '✅' : '❌'}
              </div>
              <div className="text-blue-700">Páginas Admin</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl mb-2 ${FEATURE_FLAGS.BRIDGE_PAGE ? 'text-green-600' : 'text-red-600'}`}>
                {FEATURE_FLAGS.BRIDGE_PAGE ? '✅' : '❌'}
              </div>
              <div className="text-blue-700">Bridge Page</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl mb-2 ${FEATURE_FLAGS.DUAL_ROUTING ? 'text-green-600' : 'text-red-600'}`}>
                {FEATURE_FLAGS.DUAL_ROUTING ? '✅' : '❌'}
              </div>
              <div className="text-blue-700">Dual Routing</div>
            </div>
          </div>
        </div>

        {/* Rotas por categoria */}
        {testRoutes.map(category => (
          <div key={category.category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.routes.map(route => (
                <RouteCard key={route.path} route={route} />
              ))}
            </div>
          </div>
        ))}

        {/* Navegação rápida */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Navegação Rápida
          </h3>
          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <>
                <Link to="/admin-new">
                  <Button variant="primary" size="sm">
                    Nova Estrutura Admin
                  </Button>
                </Link>
                <Link to="/bridge">
                  <Button variant="outline" size="sm">
                    Structure Bridge
                  </Button>
                </Link>
                <Link to="/admin-legacy">
                  <Button variant="outline" size="sm">
                    Sistema Legacy
                  </Button>
                </Link>
              </>
            )}
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard Principal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTest;