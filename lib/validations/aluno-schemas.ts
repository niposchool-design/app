import { z } from 'zod'

/**
 * Schema para submissÃ£o de portfÃ³lio
 */
export const submitPortfolioSchema = z.object({
  titulo: z.string()
    .min(3, 'TÃ­tulo deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'TÃ­tulo deve ter no mÃ¡ximo 100 caracteres'),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(1000, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 1000 caracteres'),
  
  tipo_obra: z.enum(['composicao', 'interpretacao', 'improvisacao', 'arranjo'], {
    error: 'Valor inválido',
  }),
  
  arquivo_url: z.string()
    .url('URL do arquivo invÃ¡lida'),
  
  instrumento_id: z.string()
    .uuid('ID de instrumento invÃ¡lido')
    .optional(),
})

export type SubmitPortfolioInput = z.infer<typeof submitPortfolioSchema>

/**
 * Schema para atualizaÃ§Ã£o de portfÃ³lio
 */
export const updatePortfolioSchema = z.object({
  titulo: z.string()
    .min(3, 'TÃ­tulo deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'TÃ­tulo deve ter no mÃ¡ximo 100 caracteres')
    .optional(),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(1000, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 1000 caracteres')
    .optional(),
  
  arquivo_url: z.string()
    .url('URL do arquivo invÃ¡lida')
    .optional(),
})

export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>

/**
 * Schema para atualizaÃ§Ã£o de item do portfÃ³lio
 */
export const updatePortfolioItemSchema = z.object({
  obraId: z.string()
    .uuid('ID da obra invÃ¡lido'),
  
  titulo: z.string()
    .min(3, 'TÃ­tulo deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'TÃ­tulo deve ter no mÃ¡ximo 100 caracteres')
    .optional(),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(1000, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 1000 caracteres')
    .optional(),
})

export type UpdatePortfolioItemInput = z.infer<typeof updatePortfolioItemSchema>

/**
 * Schema para participaÃ§Ã£o em desafio
 */
export const participarDesafioSchema = z.object({
  desafioId: z.string()
    .uuid('ID de desafio invÃ¡lido'),
})

/**
 * Schema para submissÃ£o de desafio
 */
export const submeterDesafioSchema = z.object({
  desafioId: z.string()
    .uuid('ID de desafio invÃ¡lido'),
  
  arquivo_url: z.string()
    .url('URL do arquivo invÃ¡lida'),
  
  descricao_submissao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(500, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 500 caracteres')
    .optional(),
})

/**
 * Schema para conclusÃ£o de aula
 */
export const concluirAulaSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula invÃ¡lido'),
  
  tempoEstudo: z.number()
    .int('Tempo de estudo deve ser inteiro')
    .positive('Tempo de estudo deve ser positivo')
    .max(480, 'Tempo de estudo nÃ£o pode exceder 8 horas (480 minutos)')
    .optional(),
})

/**
 * Schema para comentÃ¡rio em aula
 */
export const comentarioAulaSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula invÃ¡lido'),
  
  comentario: z.string()
    .min(3, 'ComentÃ¡rio deve ter no mÃ­nimo 3 caracteres')
    .max(500, 'ComentÃ¡rio deve ter no mÃ¡ximo 500 caracteres'),
})

/**
 * Schema para atualizaÃ§Ã£o de perfil
 */
export const atualizarPerfilSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'Nome deve ter no mÃ¡ximo 100 caracteres')
    .optional(),
  
  telefone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone invÃ¡lido')
    .optional(),
  
  avatar_url: z.string()
    .url('URL do avatar invÃ¡lida')
    .optional(),
  
  data_nascimento: z.string()
    .datetime('Data de nascimento invÃ¡lida')
    .optional(),
  
  instrumento_principal: z.string()
    .uuid('ID de instrumento invÃ¡lido')
    .optional(),
})

export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>
