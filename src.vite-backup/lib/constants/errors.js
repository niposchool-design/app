/**
 * 🚨 CONSTANTES DE ERRO - NIPO SCHOOL
 *
 * Erros padronizados para toda a aplicação
 */
export const CommonErrors = {
    // Autenticação
    AUTH_REQUIRED: new Error('Usuário deve estar autenticado'),
    INSUFFICIENT_PERMISSIONS: new Error('Permissões insuficientes'),
    // Dados
    INVALID_DATA: new Error('Dados inválidos'),
    NOT_FOUND: new Error('Recurso não encontrado'),
    ALREADY_EXISTS: new Error('Recurso já existe'),
    // Rede
    NETWORK_ERROR: new Error('Erro de conexão'),
    SERVER_ERROR: new Error('Erro interno do servidor'),
    // Validação
    VALIDATION_ERROR: new Error('Erro de validação'),
    REQUIRED_FIELD: (field) => new Error(`Campo obrigatório: ${field}`),
    // Supabase específicos
    SUPABASE_ERROR: (message) => new Error(`Erro Supabase: ${message}`),
    RLS_ERROR: new Error('Erro de política de segurança'),
};
