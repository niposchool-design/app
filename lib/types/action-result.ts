/**
 * Tipo padronizado para retorno de Server Actions
 * 
 * Uso:
 * - success=true: Operação bem-sucedida, retorna data
 * - success=false: Operação falhou, retorna error e code opcional
 */
export type ActionResult<T = any> = 
  | { success: true; data: T; message?: string; error?: never; code?: never }
  | { success: false; error: string; code?: string; data?: never; message?: never }

/**
 * Códigos de erro padronizados
 */
export enum ErrorCode {
  // Validação
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Autenticação/Autorização
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  
  // Banco de dados
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  
  // Negócio
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  
  // Sistema
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}
