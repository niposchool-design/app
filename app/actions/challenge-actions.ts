'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { validateAction } from '@/lib/validations/validate-action'
import { submitChallengeSchema, evaluateSubmissionSchema } from '@/lib/validations/unified-schemas'
import { successResponse, unauthorizedError, forbiddenError, databaseError, validationError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { onChallengeComplete } from '@/app/actions/alpha-engine-actions'
import { generateChallengeFeedback } from '@/app/actions/ai-feedback-actions'
import { checkPermission } from '@/lib/auth/check-permission'

export async function submitChallenge(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(submitChallengeSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('challenge_submissions')
      .insert({
        tenant_id: ctx.tenantId,
        challenge_id: validation.data.challenge_id,
        student_id: ctx.userId,
        response: validation.data.response,
        file_url: validation.data.file_url,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    // Gamification: award points for submitting (fire-and-forget)
    ;(ctx.supabase as any).rpc('rpc_award_points', {
      p_user_id: ctx.userId,
      p_points: 15,
      p_source: 'challenge',
      p_action: 'submit',
      p_description: 'Desafio submetido',
      p_reference_type: 'challenge_submission',
      p_reference_id: data.id,
    }).then(() => (ctx.supabase as any).rpc('rpc_check_achievements', { p_user_id: ctx.userId }))

    // Alpha Engine: generate reinforcement exercises (fire-and-forget)
    onChallengeComplete(validation.data.challenge_id).catch(() => {})

    // AI Feedback: auto-generate feedback if text response (fire-and-forget)
    generateChallengeFeedback(data.id, validation.data.challenge_id).catch(() => {})

    revalidatePath('/challenges')
    revalidatePath(`/challenges/${validation.data.challenge_id}`)
    revalidatePath('/progress')
    revalidatePath('/achievements')
    return successResponse(data, 'Submissão enviada com sucesso')
  } catch (e) {
    return databaseError('Erro ao submeter desafio')
  }
}

export async function evaluateSubmission(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(evaluateSubmissionSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    if (!(await checkPermission('challenges.grade'))) return forbiddenError('Permissao challenges.grade necessaria')

    const { error } = await ctx.supabase
      .from('challenge_submissions')
      .update({
        grade: validation.data.grade,
        feedback: validation.data.feedback,
        status: validation.data.status,
        evaluated_by: ctx.userId,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', validation.data.submission_id)

    if (error) return databaseError(error.message)

    revalidatePath('/evaluate')
    revalidatePath(`/evaluate/${validation.data.submission_id}`)
    return successResponse(null, 'Avaliação salva com sucesso')
  } catch (e) {
    return databaseError('Erro ao avaliar submissão')
  }
}
