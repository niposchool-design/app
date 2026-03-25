import { z } from 'zod'

/**
 * Categorias válidas para pontos
 */
export const pointsCategories = [
  'aula_concluida',
  'evidencia_enviada',
  'autoavaliacao',
  'portfolio_completo',
  'desafio_concluido',
  'participacao',
  'conquista',
] as const

/**
 * Schema para adicionar pontos
 */
export const addPointsSchema = z.object({
  userId: z.string()
    .uuid('ID de usuário inválido'),

  points: z.number()
    .int('Pontos devem ser inteiros')
    .positive('Pontos devem ser positivos')
    .max(1000, 'Máximo de 1000 pontos por operação'),

  category: z.enum(pointsCategories, {
    error: 'Valor inválido',
  }),

  description: z.string()
    .min(3, 'Descrição deve ter no mínimo 3 caracteres')
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),
})

export type AddPointsInput = z.infer<typeof addPointsSchema>

/**
 * Schema para conceder conquista
 */
export const grantAchievementSchema = z.object({
  userId: z.string()
    .uuid('ID de usuário inválido'),

  achievementId: z.string()
    .uuid('ID de conquista inválido'),
})

export type GrantAchievementInput = z.infer<typeof grantAchievementSchema>

/**
 * Schema para aula concluída (pontos automáticos)
 */
export const aulaConcluidaPointsSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula inválido'),
})

/**
 * Schema para evidência enviada (pontos automáticos)
 */
export const evidenciaEnviadaPointsSchema = z.object({
  evidenciaId: z.string()
    .uuid('ID de evidência inválido'),
})

/**
 * Schema para portfólio completo (pontos automáticos)
 */
export const portfolioCompletoPointsSchema = z.object({
  portfolioId: z.string()
    .uuid('ID de portfólio inválido'),
})
