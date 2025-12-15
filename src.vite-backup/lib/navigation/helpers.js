/**
 * 🧭 HELPERS DE NAVEGAÇÃO - NIPO SCHOOL
 * ====================================
 * Navegação tipo-segura e extração de parâmetros
 * Mantém 100% de compatibilidade com sistema existente
 */
import { ROUTES } from '../constants/routes';
import { routeValidators } from '../types/validation';
/**
 * Helpers de navegação tipo-seguros
 * Centraliza a criação de URLs para evitar erros de digitação
 */
export const navigate = {
    // ========================================
    // ALUNO - Navegação
    // ========================================
    toAchievement: (id) => {
        if (!routeValidators.isValidAchievementId(id)) {
            console.warn('Invalid achievement ID:', id);
            return ROUTES.ALUNO.ACHIEVEMENTS.INDEX;
        }
        return ROUTES.ALUNO.ACHIEVEMENTS.DETAIL(id);
    },
    toPortfolio: (slug) => {
        if (!routeValidators.isValidPortfolioSlug(slug)) {
            console.warn('Invalid portfolio slug:', slug);
            return ROUTES.ALUNO.PORTFOLIO.INDEX;
        }
        return ROUTES.ALUNO.PORTFOLIO.DETAIL(slug);
    },
    toChallenge: (codigo) => {
        if (!routeValidators.isValidChallengeCode(codigo)) {
            console.warn('Invalid challenge code:', codigo);
            return ROUTES.ALUNO.CHALLENGES.INDEX;
        }
        return ROUTES.ALUNO.CHALLENGES.DETAIL(codigo);
    },
    toInstrument: (slug) => {
        if (!routeValidators.isValidInstrumentoSlug(slug)) {
            console.warn('Invalid instrument slug:', slug);
            return ROUTES.ALUNO.INSTRUMENTS.INDEX;
        }
        return ROUTES.ALUNO.INSTRUMENTS.DETAIL(slug);
    },
    // ========================================
    // PROFESSOR - Navegação
    // ========================================
    toClass: (id) => {
        if (!routeValidators.isValidTurmaId(id)) {
            console.warn('Invalid class ID:', id);
            return ROUTES.PROFESSOR.CLASSES;
        }
        return ROUTES.PROFESSOR.CLASS_DETAIL(id);
    },
    toSubmission: (id) => {
        if (!routeValidators.isValidSubmissaoId(id)) {
            console.warn('Invalid submission ID:', id);
            return ROUTES.PROFESSOR.SUBMISSIONS;
        }
        return ROUTES.PROFESSOR.SUBMISSION_DETAIL(id);
    },
    // ========================================
    // ADMIN - Navegação
    // ========================================
    toUserEdit: (id) => {
        if (!routeValidators.isValidUsuarioId(id)) {
            console.warn('Invalid user ID:', id);
            return ROUTES.ADMIN.USERS;
        }
        return ROUTES.ADMIN.USER_EDIT(id);
    },
    // ========================================
    // HISTÓRIA DA MÚSICA - Navegação
    // ========================================
    toPeriodo: (id) => {
        // Por enquanto aceita tanto UUID quanto slug
        return `/app/historia/periodos/${id}`;
    },
    toCompositor: (id) => {
        return `/app/historia/compositores/${id}`;
    },
    toObra: (id) => {
        return `/app/historia/obras/${id}`;
    },
    toTimeline: () => '/app/historia/timeline',
    toGeneros: () => '/app/historia/generos',
    toTeoria: () => '/app/historia/teoria',
};
/**
 * Extração de parâmetros de rotas
 * Útil para componentes que precisam identificar o contexto atual
 */
export const extractParam = {
    // Extrai ID de conquista da URL atual
    achievementId: (pathname) => {
        const match = pathname.match(/\/conquistas\/([^/]+)/);
        const id = match ? match[1] : null;
        return id && routeValidators.isValidAchievementId(id) ? id : null;
    },
    // Extrai slug de portfólio da URL atual  
    portfolioSlug: (pathname) => {
        const match = pathname.match(/\/portfolio\/([^/]+)/);
        const slug = match ? match[1] : null;
        return slug && routeValidators.isValidPortfolioSlug(slug) ? slug : null;
    },
    // Extrai código de desafio da URL atual
    challengeCode: (pathname) => {
        const match = pathname.match(/\/desafios\/([^/]+)/);
        const code = match ? match[1] : null;
        return code && routeValidators.isValidChallengeCode(code) ? code : null;
    },
    // Extrai slug de instrumento da URL atual
    instrumentSlug: (pathname) => {
        const match = pathname.match(/\/instrumentos\/([^/]+)/);
        const slug = match ? match[1] : null;
        return slug && routeValidators.isValidInstrumentoSlug(slug) ? slug : null;
    },
    // Extrai ID de turma da URL atual
    classId: (pathname) => {
        const match = pathname.match(/\/turmas\/([^/]+)/);
        const id = match ? match[1] : null;
        return id && routeValidators.isValidTurmaId(id) ? id : null;
    },
    // Extrai ID de usuário da URL atual
    userId: (pathname) => {
        const match = pathname.match(/\/usuarios\/([^/]+)/);
        const id = match ? match[1] : null;
        return id && routeValidators.isValidUsuarioId(id) ? id : null;
    },
    // Extrai qualquer parâmetro de uma rota específica
    anyParam: (pathname, routePattern) => {
        // Converte padrão como "/portfolio/:slug" em regex
        const regexPattern = routePattern.replace(/:[\w]+/g, '([^/]+)');
        const match = pathname.match(new RegExp(regexPattern));
        return match ? match[1] : null;
    }
};
/**
 * Validação de contexto de rota
 * Verifica se estamos na seção correta da aplicação
 */
export const routeContext = {
    // Verifica se estamos na área do aluno
    isInAlunoArea: (pathname) => {
        return pathname.startsWith('/app/aluno');
    },
    // Verifica se estamos na área do professor
    isInProfessorArea: (pathname) => {
        return pathname.startsWith('/app/professor');
    },
    // Verifica se estamos na área do admin
    isInAdminArea: (pathname) => {
        return pathname.startsWith('/app/admin');
    },
    // Verifica se estamos no módulo História da Música
    isInHistoriaArea: (pathname) => {
        return pathname.startsWith('/app/historia');
    },
    // Verifica se estamos em área protegida
    isInProtectedArea: (pathname) => {
        return pathname.startsWith('/app');
    },
    // Verifica se estamos em área pública
    isInPublicArea: (pathname) => {
        const publicRoutes = ['/', '/sobre', '/contato', '/login', '/signup'];
        return publicRoutes.includes(pathname) || !pathname.startsWith('/app');
    },
    // Obtém a seção atual da aplicação
    getCurrentSection: (pathname) => {
        if (routeContext.isInAlunoArea(pathname))
            return 'aluno';
        if (routeContext.isInProfessorArea(pathname))
            return 'professor';
        if (routeContext.isInAdminArea(pathname))
            return 'admin';
        if (routeContext.isInHistoriaArea(pathname))
            return 'historia';
        if (routeContext.isInProtectedArea(pathname))
            return 'shared';
        return 'public';
    }
};
/**
 * Utilitários para construção de URLs com query params
 */
export const urlBuilder = {
    // Adiciona query params a uma URL
    withParams: (baseUrl, params) => {
        const url = new URL(baseUrl, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        });
        return url.pathname + url.search;
    },
    // Constrói URL de paginação
    withPagination: (baseUrl, page, limit) => {
        const params = { page };
        if (limit)
            params.limit = limit;
        return urlBuilder.withParams(baseUrl, params);
    },
    // Constrói URL com filtros
    withFilters: (baseUrl, filters) => {
        const cleanFilters = Object.entries(filters)
            .filter(([_, value]) => value !== undefined && value !== null && value !== '')
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        return urlBuilder.withParams(baseUrl, cleanFilters);
    }
};
/**
 * Hook personalizado para navegação (para usar em componentes)
 */
export function createNavigationHelpers(currentPath) {
    return {
        // Obtém seção atual
        section: routeContext.getCurrentSection(currentPath),
        // Verifica se é uma rota específica
        isRoute: (route) => currentPath === route,
        // Verifica se está em uma seção
        isInSection: (section) => currentPath.includes(section),
        // Extrai parâmetros da rota atual
        params: {
            achievementId: extractParam.achievementId(currentPath),
            portfolioSlug: extractParam.portfolioSlug(currentPath),
            challengeCode: extractParam.challengeCode(currentPath),
            instrumentSlug: extractParam.instrumentSlug(currentPath),
            classId: extractParam.classId(currentPath),
            userId: extractParam.userId(currentPath),
        }
    };
}
/**
 * Testes de navegação
 */
export function testNavigationHelpers() {
    console.log('🧪 Testando helpers de navegação...');
    try {
        // Testa extração de parâmetros
        const testCases = [
            {
                path: '/app/aluno/conquistas/123e4567-e89b-12d3-a456-426614174000',
                extractor: extractParam.achievementId,
                expected: '123e4567-e89b-12d3-a456-426614174000'
            },
            {
                path: '/app/aluno/portfolio/meu-portfolio-2024',
                extractor: extractParam.portfolioSlug,
                expected: 'meu-portfolio-2024'
            },
            {
                path: '/app/aluno/desafios/ALF-001',
                extractor: extractParam.challengeCode,
                expected: 'ALF-001'
            }
        ];
        for (const test of testCases) {
            const result = test.extractor(test.path);
            if (result !== test.expected) {
                console.error(`Navigation test failed: ${test.path} -> expected ${test.expected}, got ${result}`);
                return false;
            }
        }
        console.log('✅ Todos os testes de navegação passaram!');
        return true;
    }
    catch (error) {
        console.error('❌ Erro nos testes de navegação:', error);
        return false;
    }
}
