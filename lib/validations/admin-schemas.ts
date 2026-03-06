import { z } from 'zod'

/**
 * Schema para criaÃ§Ã£o de usuÃ¡rio
 */
export const createUserSchema = z.object({
  email: z.string()
    .email('Email invÃ¡lido')
    .min(5, 'Email muito curto'),
  
  nome_completo: z.string()
    .min(3, 'Nome deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  tipo_usuario: z.enum(['admin', 'professor', 'aluno'], {
    error: 'Valor inválido',
  }),
  
  senha: z.string()
    .min(8, 'Senha deve ter no mÃ­nimo 8 caracteres')
    .max(100, 'Senha muito longa'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

/**
 * Schema para atualizaÃ§Ã£o de role de usuÃ¡rio
 */
export const updateUserRoleSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  
  novoTipo: z.enum(['admin', 'professor', 'aluno'], {
    error: 'Valor inválido',
  }),
})

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>

/**
 * Schema para criaÃ§Ã£o de instrumento
 */
export const createInstrumentoSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter no mÃ­nimo 2 caracteres')
    .max(100, 'Nome muito longo'),
  
  categoria: z.enum(['cordas', 'sopro', 'percussao', 'teclado', 'outros'], {
    error: 'Valor inválido',
  }),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o muito curta')
    .max(500, 'DescriÃ§Ã£o muito longa')
    .optional(),
  
  dificuldade: z.enum(['iniciante', 'intermediario', 'avancado'])
    .optional()
    .default('iniciante'),
})

export type CreateInstrumentoInput = z.infer<typeof createInstrumentoSchema>

/**
 * Schema para criaÃ§Ã£o de conquista (achievement)
 */
export const createAchievementSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o muito curta')
    .max(500, 'DescriÃ§Ã£o muito longa'),
  
  icone: z.string()
    .max(50, 'Nome do Ã­cone muito longo')
    .optional(),
  
  xp_requerido: z.number()
    .int('XP deve ser inteiro')
    .positive('XP deve ser positivo')
    .default(100),
  
  tipo: z.enum(['bronze', 'prata', 'ouro', 'platina'], {
    error: 'Valor inválido',
  }),
})

export type CreateAchievementInput = z.infer<typeof createAchievementSchema>

/**
 * Schema para atualizaÃ§Ã£o de status de usuÃ¡rio
 */
export const toggleUserStatusSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  ativo: z.boolean(),
})

export type ToggleUserStatusInput = z.infer<typeof toggleUserStatusSchema>

/**
 * Schema para criaÃ§Ã£o de perÃ­odo histÃ³rico
 */
export const createPeriodoHistoriaSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  inicio: z.number()
    .int('Ano de inÃ­cio deve ser inteiro')
    .min(1000, 'Ano muito antigo')
    .max(2100, 'Ano muito no futuro'),
  
  fim: z.number()
    .int('Ano de fim deve ser inteiro')
    .min(1000, 'Ano muito antigo')
    .max(2100, 'Ano muito no futuro'),
  
  descricao: z.string()
    .min(20, 'DescriÃ§Ã£o muito curta')
    .max(2000, 'DescriÃ§Ã£o muito longa'),
  
  ordem: z.number()
    .int('Ordem deve ser inteira')
    .positive('Ordem deve ser positiva')
    .optional(),
}).refine(
  (data) => data.fim > data.inicio,
  { message: 'Ano de fim deve ser maior que ano de inÃ­cio' }
)

export type CreatePeriodoHistoriaInput = z.infer<typeof createPeriodoHistoriaSchema>
