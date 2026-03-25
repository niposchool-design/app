import { z } from 'zod'

/**
 * Schema para criação de usuário
 */
export const createUserSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email muito curto'),
  
  nome_completo: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  tipo_usuario: z.enum(['admin', 'professor', 'aluno'], {
    error: 'Valor inválido',
  }),
  
  senha: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(100, 'Senha muito longa'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

/**
 * Schema para atualização de role de usuário
 */
export const updateUserRoleSchema = z.object({
  userId: z.string().uuid('ID de usuário inválido'),
  
  novoTipo: z.enum(['admin', 'professor', 'aluno'], {
    error: 'Valor inválido',
  }),
})

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>

/**
 * Schema para criação de instrumento
 */
export const createInstrumentoSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome muito longo'),
  
  categoria: z.enum(['cordas', 'sopro', 'percussao', 'teclado', 'outros'], {
    error: 'Valor inválido',
  }),
  
  descricao: z.string()
    .min(10, 'Descrição muito curta')
    .max(500, 'Descrição muito longa')
    .optional(),
  
  dificuldade: z.enum(['iniciante', 'intermediario', 'avancado'])
    .optional()
    .default('iniciante'),
})

export type CreateInstrumentoInput = z.infer<typeof createInstrumentoSchema>

/**
 * Schema para criação de conquista (achievement)
 */
export const createAchievementSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),

  descricao: z.string()
    .min(10, 'Descrição muito curta')
    .max(500, 'Descrição muito longa'),

  icone: z.string()
    .max(50, 'Nome do ícone muito longo')
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
 * Schema para atualização de status de usuário
 */
export const toggleUserStatusSchema = z.object({
  userId: z.string().uuid('ID de usuário inválido'),
  ativo: z.boolean(),
})

export type ToggleUserStatusInput = z.infer<typeof toggleUserStatusSchema>

/**
 * Schema para criação de período histórico
 */
export const createPeriodoHistoriaSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),

  inicio: z.number()
    .int('Ano de início deve ser inteiro')
    .min(1000, 'Ano muito antigo')
    .max(2100, 'Ano muito no futuro'),

  fim: z.number()
    .int('Ano de fim deve ser inteiro')
    .min(1000, 'Ano muito antigo')
    .max(2100, 'Ano muito no futuro'),

  descricao: z.string()
    .min(20, 'Descrição muito curta')
    .max(2000, 'Descrição muito longa'),

  ordem: z.number()
    .int('Ordem deve ser inteira')
    .positive('Ordem deve ser positiva')
    .optional(),
}).refine(
  (data) => data.fim > data.inicio,
  { message: 'Ano de fim deve ser maior que ano de início' }
)

export type CreatePeriodoHistoriaInput = z.infer<typeof createPeriodoHistoriaSchema>
