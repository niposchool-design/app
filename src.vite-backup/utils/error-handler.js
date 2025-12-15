/**
 * 🚨 ERROR HANDLER - NIPO SCHOOL
 *
 * Sistema de tratamento de erros conforme documento backend
 */
export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const CommonErrors = {
    // Auth errors
    UNAUTHORIZED: 'Usuário não autenticado',
    FORBIDDEN: 'Acesso negado',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    AUTH_REQUIRED: 'Autenticação necessária',
    // User errors
    USER_NOT_FOUND: 'Usuário não encontrado',
    EMAIL_ALREADY_EXISTS: 'Email já está em uso',
    // Achievement errors
    ACHIEVEMENT_NOT_FOUND: 'Conquista não encontrada',
    ACHIEVEMENT_ALREADY_UNLOCKED: 'Conquista já desbloqueada',
    // Portfolio errors
    PORTFOLIO_NOT_FOUND: 'Portfólio não encontrado',
    PORTFOLIO_ACCESS_DENIED: 'Acesso ao portfólio negado',
    // Desafio errors
    DESAFIO_NOT_FOUND: 'Desafio não encontrado',
    DESAFIO_ALREADY_SUBMITTED: 'Desafio já submetido',
    DESAFIO_INACTIVE: 'Desafio não está ativo',
    // Generic errors
    INTERNAL_ERROR: 'Erro interno do servidor',
    VALIDATION_ERROR: 'Erro de validação',
    NOT_FOUND: 'Recurso não encontrado'
};
export function handleError(error) {
    console.error('Error occurred:', error);
    // Supabase errors
    if (error?.code) {
        switch (error.code) {
            case 'PGRST116':
                return { message: CommonErrors.NOT_FOUND, code: 'NOT_FOUND' };
            case '23505':
                return { message: CommonErrors.EMAIL_ALREADY_EXISTS, code: 'DUPLICATE_KEY' };
            case '42501':
                return { message: CommonErrors.FORBIDDEN, code: 'FORBIDDEN' };
            default:
                return { message: error.message || CommonErrors.INTERNAL_ERROR, code: error.code };
        }
    }
    // Custom AppError
    if (error instanceof AppError) {
        return { message: error.message, code: 'APP_ERROR' };
    }
    // Generic error
    return {
        message: error?.message || CommonErrors.INTERNAL_ERROR,
        code: 'UNKNOWN_ERROR'
    };
}
