import { z } from 'zod'

/**
 * Schema para criaÃ§Ã£o de aula
 */
export const createAulaSchema = z.object({
  titulo: z.string()
    .min(3, 'TÃ­tulo deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'TÃ­tulo deve ter no mÃ¡ximo 100 caracteres'),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(500, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 500 caracteres'),
  
  conteudo: z.string()
    .min(50, 'ConteÃºdo deve ter no mÃ­nimo 50 caracteres'),
  
  nivel: z.enum(['iniciante', 'intermediario', 'avancado'], {
    error: 'Valor inválido',
  }),
  
  duracao_minutos: z.number()
    .int('DuraÃ§Ã£o deve ser um nÃºmero inteiro')
    .positive('DuraÃ§Ã£o deve ser positiva')
    .max(480, 'DuraÃ§Ã£o mÃ¡xima Ã© 8 horas (480 minutos)'),
  
  xp_ganho: z.number()
    .int('XP deve ser inteiro')
    .positive('XP deve ser positivo')
    .optional()
    .default(50),
  
  ordem: z.number()
    .int('Ordem deve ser inteira')
    .positive('Ordem deve ser positiva')
    .optional(),
})

export type CreateAulaInput = z.infer<typeof createAulaSchema>

/**
 * Schema para atualizaÃ§Ã£o de aula
 */
export const updateAulaSchema = z.object({
  aulaId: z.string().uuid('ID de aula invÃ¡lido'),
  
  titulo: z.string()
    .min(3, 'TÃ­tulo deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'TÃ­tulo deve ter no mÃ¡ximo 100 caracteres')
    .optional(),
  
  descricao: z.string()
    .min(10, 'DescriÃ§Ã£o deve ter no mÃ­nimo 10 caracteres')
    .max(500, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 500 caracteres')
    .optional(),
  
  conteudo: z.string()
    .min(50, 'ConteÃºdo deve ter no mÃ­nimo 50 caracteres')
    .optional(),
  
  nivel: z.enum(['iniciante', 'intermediario', 'avancado'])
    .optional(),
  
  duracao_minutos: z.number()
    .int().positive().max(480)
    .optional(),
  
  xp_ganho: z.number()
    .int().positive()
    .optional(),
  
  status: z.enum(['rascunho', 'publicada', 'arquivada'])
    .optional(),
})

export type UpdateAulaInput = z.infer<typeof updateAulaSchema>

/**
 * Schema para avaliaÃ§Ã£o de portfÃ³lio
 */
export const avaliarPortfolioSchema = z.object({
  portfolioId: z.string()
    .uuid('ID de portfÃ³lio invÃ¡lido'),
  
  nota: z.number()
    .min(0, 'Nota mÃ­nima Ã© 0')
    .max(10, 'Nota mÃ¡xima Ã© 10'),
  
  feedback: z.string()
    .min(10, 'Feedback deve ter no mÃ­nimo 10 caracteres')
    .max(1000, 'Feedback deve ter no mÃ¡ximo 1000 caracteres'),
  
  status: z.enum(['aprovado', 'reprovado', 'revisao'], {
    error: 'Valor inválido',
  }),
})

export type AvaliarPortfolioInput = z.infer<typeof avaliarPortfolioSchema>

/**
 * Schema para avaliaÃ§Ã£o de desafio
 */
export const avaliarDesafioSchema = z.object({
  submissaoId: z.string()
    .uuid('ID de submissÃ£o invÃ¡lido'),
  
  nota: z.number()
    .min(0, 'Nota mÃ­nima Ã© 0')
    .max(10, 'Nota mÃ¡xima Ã© 10'),
  
  feedback: z.string()
    .min(10, 'Feedback deve ter no mÃ­nimo 10 caracteres')
    .max(1000, 'Feedback deve ter no mÃ¡ximo 1000 caracteres'),
  
  aprovado: z.boolean(),
})

export type AvaliarDesafioInput = z.infer<typeof avaliarDesafioSchema>

/**
 * Schema para criaÃ§Ã£o de turma
 */
export const createTurmaSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mÃ­nimo 3 caracteres')
    .max(100, 'Nome deve ter no mÃ¡ximo 100 caracteres'),
  
  sala: z.string()
    .max(50, 'Nome da sala muito longo')
    .optional(),
  
  horario_padrao: z.string()
    .max(100, 'HorÃ¡rio muito longo')
    .optional(),
  
  capacidade_maxima: z.number()
    .int('Capacidade deve ser inteira')
    .positive('Capacidade deve ser positiva')
    .max(100, 'Capacidade mÃ¡xima Ã© 100 alunos')
    .default(20),
  
  nivel: z.enum(['iniciante', 'intermediario', 'avancado'], {
    error: 'Valor inválido',
  }),
  
  ano_letivo: z.number()
    .int('Ano letivo deve ser inteiro')
    .min(2020, 'Ano letivo invÃ¡lido')
    .max(2100, 'Ano letivo invÃ¡lido'),
  
  semestre: z.union([z.literal(1), z.literal(2)]),
})

export type CreateTurmaInput = z.infer<typeof createTurmaSchema>

/**
 * Schema para matrÃ­cula de aluno em turma
 */
export const matricularAlunoSchema = z.object({
  turmaId: z.string().uuid('ID de turma invÃ¡lido'),
  alunoId: z.string().uuid('ID de aluno invÃ¡lido'),
})

export type MatricularAlunoInput = z.infer<typeof matricularAlunoSchema>
