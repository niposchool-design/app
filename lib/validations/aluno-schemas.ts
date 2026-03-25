import { z } from 'zod'

/**
 * Schema para submissão de portfólio
 */
export const submitPortfolioSchema = z.object({
  titulo: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
  
  tipo_obra: z.enum(['composicao', 'interpretacao', 'improvisacao', 'arranjo'], {
    error: 'Valor inválido',
  }),
  
  arquivo_url: z.string()
    .url('URL do arquivo inválida'),

  instrumento_id: z.string()
    .uuid('ID de instrumento inválido')
    .optional(),
})

export type SubmitPortfolioInput = z.infer<typeof submitPortfolioSchema>

/**
 * Schema para atualização de portfólio
 */
export const updatePortfolioSchema = z.object({
  titulo: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres')
    .optional(),

  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),

  arquivo_url: z.string()
    .url('URL do arquivo inválida')
    .optional(),
})

export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>

/**
 * Schema para atualização de item do portfólio
 */
export const updatePortfolioItemSchema = z.object({
  obraId: z.string()
    .uuid('ID da obra inválido'),

  titulo: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres')
    .optional(),

  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
})

export type UpdatePortfolioItemInput = z.infer<typeof updatePortfolioItemSchema>

/**
 * Schema para participação em desafio
 */
export const participarDesafioSchema = z.object({
  desafioId: z.string()
    .uuid('ID de desafio inválido'),
})

/**
 * Schema para submissão de desafio
 */
export const submeterDesafioSchema = z.object({
  desafioId: z.string()
    .uuid('ID de desafio inválido'),

  arquivo_url: z.string()
    .url('URL do arquivo inválida'),

  descricao_submissao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional(),
})

/**
 * Schema para conclusão de aula
 */
export const concluirAulaSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula inválido'),

  tempoEstudo: z.number()
    .int('Tempo de estudo deve ser inteiro')
    .positive('Tempo de estudo deve ser positivo')
    .max(480, 'Tempo de estudo não pode exceder 8 horas (480 minutos)')
    .optional(),
})

/**
 * Schema para comentário em aula
 */
export const comentarioAulaSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula inválido'),

  comentario: z.string()
    .min(3, 'Comentário deve ter no mínimo 3 caracteres')
    .max(500, 'Comentário deve ter no máximo 500 caracteres'),
})

/**
 * Schema para atualização de perfil
 */
export const atualizarPerfilSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),

  telefone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido')
    .optional(),

  avatar_url: z.string()
    .url('URL do avatar inválida')
    .optional(),

  data_nascimento: z.string()
    .datetime('Data de nascimento inválida')
    .optional(),

  instrumento_principal: z.string()
    .uuid('ID de instrumento inválido')
    .optional(),
})

export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>
