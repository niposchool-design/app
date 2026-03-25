import { z } from 'zod'

/**
 * Schema para criação de aula
 */
export const createAulaSchema = z.object({
  titulo: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),

  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),

  conteudo: z.string()
    .min(50, 'Conteúdo deve ter no mínimo 50 caracteres'),

  nivel: z.enum(['iniciante', 'intermediario', 'avancado'], {
    error: 'Valor inválido',
  }),

  duracao_minutos: z.number()
    .int('Duração deve ser um número inteiro')
    .positive('Duração deve ser positiva')
    .max(480, 'Duração máxima é 8 horas (480 minutos)'),

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
 * Schema para atualização de aula
 */
export const updateAulaSchema = z.object({
  aulaId: z.string().uuid('ID de aula inválido'),

  titulo: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres')
    .optional(),

  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional(),

  conteudo: z.string()
    .min(50, 'Conteúdo deve ter no mínimo 50 caracteres')
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
 * Schema para avaliação de portfólio
 */
export const avaliarPortfolioSchema = z.object({
  portfolioId: z.string()
    .uuid('ID de portfólio inválido'),

  nota: z.number()
    .min(0, 'Nota mínima é 0')
    .max(10, 'Nota máxima é 10'),

  feedback: z.string()
    .min(10, 'Feedback deve ter no mínimo 10 caracteres')
    .max(1000, 'Feedback deve ter no máximo 1000 caracteres'),

  status: z.enum(['aprovado', 'reprovado', 'revisao'], {
    error: 'Valor inválido',
  }),
})

export type AvaliarPortfolioInput = z.infer<typeof avaliarPortfolioSchema>

/**
 * Schema para avaliação de desafio
 */
export const avaliarDesafioSchema = z.object({
  submissaoId: z.string()
    .uuid('ID de submissão inválido'),

  nota: z.number()
    .min(0, 'Nota mínima é 0')
    .max(10, 'Nota máxima é 10'),

  feedback: z.string()
    .min(10, 'Feedback deve ter no mínimo 10 caracteres')
    .max(1000, 'Feedback deve ter no máximo 1000 caracteres'),

  aprovado: z.boolean(),
})

export type AvaliarDesafioInput = z.infer<typeof avaliarDesafioSchema>

/**
 * Schema para criação de turma
 */
export const createTurmaSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  sala: z.string()
    .max(50, 'Nome da sala muito longo')
    .optional(),

  horario_padrao: z.string()
    .max(100, 'Horário muito longo')
    .optional(),

  capacidade_maxima: z.number()
    .int('Capacidade deve ser inteira')
    .positive('Capacidade deve ser positiva')
    .max(100, 'Capacidade máxima é 100 alunos')
    .default(20),

  nivel: z.enum(['iniciante', 'intermediario', 'avancado'], {
    error: 'Valor inválido',
  }),

  ano_letivo: z.number()
    .int('Ano letivo deve ser inteiro')
    .min(2020, 'Ano letivo inválido')
    .max(2100, 'Ano letivo inválido'),

  semestre: z.union([z.literal(1), z.literal(2)]),
})

export type CreateTurmaInput = z.infer<typeof createTurmaSchema>

/**
 * Schema para matrícula de aluno em turma
 */
export const matricularAlunoSchema = z.object({
  turmaId: z.string().uuid('ID de turma inválido'),
  alunoId: z.string().uuid('ID de aluno inválido'),
})

export type MatricularAlunoInput = z.infer<typeof matricularAlunoSchema>
