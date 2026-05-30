'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { validateAction } from '@/lib/validations/validate-action'
import { submitPortfolioSchema, evaluatePortfolioSchema } from '@/lib/validations/unified-schemas'
import { successResponse, unauthorizedError, databaseError, validationError, forbiddenError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { generatePortfolioFeedback } from '@/app/actions/ai-feedback-actions'
import { checkPermission } from '@/lib/auth/check-permission'

export async function submitPortfolioV2(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(submitPortfolioSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('portfolios')
      .insert({
        ...validation.data,
        tenant_id: ctx.tenantId,
        student_id: ctx.userId,
        status: 'submitted',
      })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    // Gamification: award points for portfolio submission (fire-and-forget)
    ;(ctx.supabase as any).rpc('rpc_award_points', {
      p_user_id: ctx.userId,
      p_points: 100,  // Alinhado ao curriculum pedagógico (100pts/portfólio)
      p_source: 'portfolio',
      p_action: 'submit',
      p_description: 'Portfólio submetido',
      p_reference_type: 'portfolio',
      p_reference_id: data.id,
    }).then(() => (ctx.supabase as any).rpc('rpc_check_achievements', { p_user_id: ctx.userId }))

    // AI Feedback: auto-generate feedback if has description (fire-and-forget)
    generatePortfolioFeedback(data.id).catch(() => {})

    revalidatePath('/portfolio')
    revalidatePath('/progress')
    revalidatePath('/achievements')
    return successResponse(data, 'Trabalho enviado ao portfólio')
  } catch (e) {
    return databaseError('Erro ao enviar portfólio')
  }
}

export async function evaluatePortfolioV2(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(evaluatePortfolioSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    if (!(await checkPermission('portfolios.grade'))) return forbiddenError('Permissao portfolios.grade necessaria')

    const { error } = await ctx.supabase
      .from('portfolios')
      .update({
        grade: validation.data.grade,
        feedback: validation.data.feedback,
        status: 'evaluated',
        evaluated_by: ctx.userId,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', validation.data.portfolio_id)

    if (error) return databaseError(error.message)

    revalidatePath('/portfolio')
    revalidatePath(`/portfolio/${validation.data.portfolio_id}`)
    revalidatePath('/evaluate')
    return successResponse(null, 'Portfólio avaliado com sucesso')
  } catch (e) {
    return databaseError('Erro ao avaliar portfólio')
  }
}
