/**
 * 🔍 VALIDADORES DE ROTAS - NIPO SCHOOL
 * ====================================
 * Validação tipo-segura de parâmetros de rota
 * Mantém compatibilidade com sistema existente
 */

/**
 * Valida se string é UUID válido
 */
export function isValidUUID(id: string): boolean {
  if (!id || typeof id !== 'string') {
    return false
  }
  
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidPattern.test(id)
}

/**
 * Valida se string é slug válido
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false
  }
  
  // Slug: apenas letras minúsculas, números e hífens
  const slugPattern = /^[a-z0-9-]+$/
  return slugPattern.test(slug) && slug.length > 0 && slug.length <= 100
}

/**
 * Valida código de desafio (formato: ALF-001, MAT-015)
 */
export function isValidChallengeCode(codigo: string): boolean {
  if (!codigo || typeof codigo !== 'string') {
    return false
  }
  
  // Formato: 3 letras maiúsculas + hífen + 3 números
  const codePattern = /^[A-Z]{3}-\d{3}$/
  return codePattern.test(codigo)
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

/**
 * Valida se parâmetro é número positivo
 */
export function isValidPositiveNumber(value: string | number): boolean {
  const num = typeof value === 'string' ? parseInt(value, 10) : value
  return !isNaN(num) && num > 0
}

/**
 * Tipos de parâmetros de rota para TypeScript
 */
export type RouteParams = {
  // SLUGS (recursos identificáveis por humanos)
  portfolioSlug: string        // "meu-portfolio-2024"
  instrumentoSlug: string      // "clarinete-bb"
  desafioCodigo: string       // "ALF-001"
  periodoSlug: string         // "barroco"
  compositorSlug: string      // "johann-sebastian-bach"
  obraSlug: string           // "aria-na-corda-sol"
  
  // UUIDs (identificadores técnicos)
  conquistaId: string         // "123e4567-e89b-12d3-a456-426614174000"
  turmaId: string            // "123e4567-e89b-12d3-a456-426614174000"
  usuarioId: string          // "123e4567-e89b-12d3-a456-426614174000"
  submissaoId: string        // "123e4567-e89b-12d3-a456-426614174000"
  
  // QUERY PARAMS
  page?: number              // ?page=1
  filter?: string            // ?filter=pendente
  sort?: 'asc' | 'desc'      // ?sort=desc
  modal?: string             // ?modal=conquista&id=xxx
}

/**
 * Validadores específicos por tipo de parâmetro
 */
export const routeValidators = {
  // Validadores para UUIDs
  isValidAchievementId: (id: string) => isValidUUID(id),
  isValidTurmaId: (id: string) => isValidUUID(id),
  isValidUsuarioId: (id: string) => isValidUUID(id),
  isValidSubmissaoId: (id: string) => isValidUUID(id),
  
  // Validadores para slugs
  isValidPortfolioSlug: (slug: string) => isValidSlug(slug),
  isValidInstrumentoSlug: (slug: string) => isValidSlug(slug),
  isValidPeriodoSlug: (slug: string) => isValidSlug(slug),
  isValidCompositorSlug: (slug: string) => isValidSlug(slug),
  isValidObraSlug: (slug: string) => isValidSlug(slug),
  
  // Validadores específicos
  isValidChallengeCode: (codigo: string) => isValidChallengeCode(codigo),
  isValidEmail: (email: string) => isValidEmail(email),
  isValidPage: (page: string | number) => isValidPositiveNumber(page),
}

/**
 * Helper para extrair tipo de ID/slug de uma string
 */
export function identifyParamType(param: string): 'uuid' | 'slug' | 'code' | 'unknown' {
  if (isValidUUID(param)) return 'uuid'
  if (isValidChallengeCode(param)) return 'code'
  if (isValidSlug(param)) return 'slug'
  return 'unknown'
}

/**
 * Sanitiza parâmetro removendo caracteres perigosos
 */
export function sanitizeParam(param: string): string {
  if (!param || typeof param !== 'string') {
    return ''
  }
  
  // Remove caracteres potencialmente perigosos
  return param
    .trim()
    .replace(/[<>'"]/g, '') // Remove caracteres HTML perigosos
    .slice(0, 200) // Limita tamanho máximo
}

/**
 * Testes de validação
 */
export const validationTests = {
  uuids: [
    { input: '123e4567-e89b-12d3-a456-426614174000', expected: true },
    { input: 'invalid-uuid', expected: false },
    { input: '', expected: false },
  ],
  slugs: [
    { input: 'meu-portfolio-2024', expected: true },
    { input: 'Portfólio com Acentos', expected: false },
    { input: 'valid-slug', expected: true },
    { input: 'invalid_slug_with_underscores', expected: false },
  ],
  codes: [
    { input: 'ALF-001', expected: true },
    { input: 'MAT-999', expected: true },
    { input: 'invalid-code', expected: false },
    { input: 'ABC-12', expected: false },
  ]
}

/**
 * Executa todos os testes de validação
 */
export function runValidationTests(): boolean {
  console.log('🧪 Executando testes de validação...')
  
  try {
    // Testa UUIDs
    for (const test of validationTests.uuids) {
      const result = isValidUUID(test.input)
      if (result !== test.expected) {
        console.error(`UUID test failed: "${test.input}" -> expected ${test.expected}, got ${result}`)
        return false
      }
    }
    
    // Testa slugs
    for (const test of validationTests.slugs) {
      const result = isValidSlug(test.input)
      if (result !== test.expected) {
        console.error(`Slug test failed: "${test.input}" -> expected ${test.expected}, got ${result}`)
        return false
      }
    }
    
    // Testa códigos
    for (const test of validationTests.codes) {
      const result = isValidChallengeCode(test.input)
      if (result !== test.expected) {
        console.error(`Code test failed: "${test.input}" -> expected ${test.expected}, got ${result}`)
        return false
      }
    }
    
    console.log('✅ Todos os testes de validação passaram!')
    return true
  } catch (error) {
    console.error('❌ Erro nos testes de validação:', error)
    return false
  }
}