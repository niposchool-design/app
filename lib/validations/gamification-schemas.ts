import { z } from 'zod'

/**
 * Categorias vÃ¡lidas para pontos
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
    .uuid('ID de usuÃ¡rio invÃ¡lido'),
  
  points: z.number()
    .int('Pontos devem ser inteiros')
    .positive('Pontos devem ser positivos')
    .max(1000, 'MÃ¡ximo de 1000 pontos por operaÃ§Ã£o'),
  
  category: z.enum(pointsCategories, {
    error: 'Valor inválido',
  }),
  
  description: z.string()
    .min(3, 'DescriÃ§Ã£o deve ter no mÃ­nimo 3 caracteres')
    .max(200, 'DescriÃ§Ã£o deve ter no mÃ¡ximo 200 caracteres'),
})

export type AddPointsInput = z.infer<typeof addPointsSchema>

/**
 * Schema para conceder conquista
 */
export const grantAchievementSchema = z.object({
  userId: z.string()
    .uuid('ID de usuÃ¡rio invÃ¡lido'),
  
  achievementId: z.string()
    .uuid('ID de conquista invÃ¡lido'),
})

export type GrantAchievementInput = z.infer<typeof grantAchievementSchema>

/**
 * Schema para aula concluÃ­da (pontos automÃ¡ticos)
 */
export const aulaConcluidaPointsSchema = z.object({
  aulaId: z.string()
    .uuid('ID de aula invÃ¡lido'),
})

/**
 * Schema para evidÃªncia enviada (pontos automÃ¡ticos)
 */
export const evidenciaEnviadaPointsSchema = z.object({
  evidenciaId: z.string()
    .uuid('ID de evidÃªncia invÃ¡lido'),
})

/**
 * Schema para portfÃ³lio completo (pontos automÃ¡ticos)
 */
export const portfolioCompletoPointsSchema = z.object({
  portfolioId: z.string()
    .uuid('ID de portfÃ³lio invÃ¡lido'),
})
