// services/redirectService.js - Sistema inteligente de redirecionamento

/**
 * Rotas específicas que não devem sofrer redirect automático
 */
const SPECIFIC_ROUTES = [
  '/professores',
  '/admin', 
  '/alunos',
  '/modulos', 
  '/conquistas',
  '/devocional',
  '/perfil',
  '/vote', 
  '/instrumentos'
];

/**
 * Dashboard padrão por tipo de usuário 
 */
const DASHBOARD_ROUTES = {
  admin: '/admin',               // ✅ Admin vai para dashboard completo
  professor: '/professores',     // ✅ Professor vai para área de professores
  pastor: '/professores',        // ✅ Pastor usa área de professor  
  aluno: '/alunos'              // ✅ Aluno vai para dashboard de alunos
};

/**
 * Rotas públicas (sem autenticação necessária)
 */
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/signup',
  '/about',
  '/contact'
];

/**
 * Hierarquia de permissões por tipo de usuário
 */
const ROUTE_PERMISSIONS = {
  admin: {
    allowed: ['*'], // Admin tem acesso a TUDO
    dashboard: '/admin'
  },
  professor: {
    allowed: [
      '/professores',
      '/alunos',
      '/modulos',
      '/conquistas',
      '/devocional',
      '/perfil',
      '/instrumentos'
    ],
    dashboard: '/professores'
  },
  pastor: {
    allowed: [
      '/professores', 
      '/alunos',
      '/modulos',
      '/conquistas',
      '/devocional',
      '/perfil',
      '/instrumentos'
    ],
    dashboard: '/professores'
  },
  aluno: {
    allowed: [
      '/alunos',
      '/modulos',
      '/conquistas', 
      '/devocional',
      '/perfil',
      '/instrumentos'
    ],
    dashboard: '/alunos'
  }
};

/**
 * Verifica se o usuário tem permissão para acessar uma rota
 */
const hasRoutePermission = (userType, route) => {
  if (!userType || !ROUTE_PERMISSIONS[userType]) return false;
  
  const permissions = ROUTE_PERMISSIONS[userType].allowed;
  
  // Admin tem acesso total
  if (permissions.includes('*')) return true;
  
  // Verificar rotas específicas
  return permissions.some(allowedRoute => 
    route === allowedRoute || route.startsWith(allowedRoute + '/')
  );
};

/**
 * Função principal de redirecionamento inteligente
 */
export const getSmartRedirect = (userProfile, currentPath, options = {}) => {
  const { force = false, debugMode = false } = options;
  
  if (debugMode) {
    console.log('🔍 SmartRedirect Debug:', {
      userType: userProfile?.tipo_usuario,
      currentPath,
      hasVoted: userProfile?.has_voted,
      force
    });
  }

  // Validação inicial
  if (!userProfile) {
    return {
      shouldRedirect: true,
      targetPath: '/login',
      reason: 'Usuário não autenticado'
    };
  }

  const userType = userProfile.tipo_usuario;
  const hasVoted = userProfile.has_voted;

  // ===== LÓGICA DE VOTAÇÃO =====
  // Se não votou, redirecionar para votação (exceto se já estiver lá)
  if (!hasVoted && currentPath !== '/vote') {
    return {
      shouldRedirect: true,
      targetPath: '/vote',
      reason: 'Usuário precisa votar primeiro'
    };
  }

  // Se já votou e está na página de voto, redirecionar para dashboard
  if (hasVoted && currentPath === '/vote') {
    const dashboardPath = DASHBOARD_ROUTES[userType] || '/alunos';
    return {
      shouldRedirect: true,
      targetPath: dashboardPath,
      reason: 'Usuário já votou, redirecionando para dashboard'
    };
  }

  // ===== LÓGICA DE ROTAS PÚBLICAS =====
  if (PUBLIC_ROUTES.includes(currentPath)) {
    // Se está em rota pública mas autenticado e já votou, redirecionar para dashboard
    if (hasVoted) {
      const dashboardPath = DASHBOARD_ROUTES[userType] || '/alunos';
      return {
        shouldRedirect: true,
        targetPath: dashboardPath,
        reason: 'Usuário autenticado em rota pública'
      };
    }
  }

  // ===== LÓGICA DE PERMISSÕES =====
  if (!PUBLIC_ROUTES.includes(currentPath) && currentPath !== '/vote') {
    // Verificar se tem permissão para a rota atual
    if (!hasRoutePermission(userType, currentPath)) {
      const dashboardPath = DASHBOARD_ROUTES[userType] || '/alunos';
      return {
        shouldRedirect: true,
        targetPath: dashboardPath,
        reason: `Usuário ${userType} sem permissão para ${currentPath}`
      };
    }
  }

  // ===== FORÇAR REDIRECIONAMENTO =====
  if (force) {
    const dashboardPath = DASHBOARD_ROUTES[userType] || '/alunos';
    return {
      shouldRedirect: true,
      targetPath: dashboardPath,
      reason: 'Redirecionamento forçado'
    };
  }

  // ===== NENHUM REDIRECIONAMENTO NECESSÁRIO =====
  return {
    shouldRedirect: false,
    targetPath: currentPath,
    reason: 'Usuário na rota correta'
  };
};

/**
 * Obter dashboard padrão por tipo de usuário
 */
export const getDefaultDashboard = (userType) => {
  return DASHBOARD_ROUTES[userType] || '/alunos';
};

/**
 * Verificar se rota é pública
 */
export const isPublicRoute = (route) => {
  return PUBLIC_ROUTES.includes(route);
};

/**
 * Obter todas as rotas permitidas para um tipo de usuário
 */
export const getAllowedRoutes = (userType) => {
  return ROUTE_PERMISSIONS[userType]?.allowed || [];
};