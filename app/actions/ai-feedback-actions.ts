'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { successResponse, unauthorizedError, forbiddenError, databaseError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { checkPermission } from '@/lib/auth/check-permission'
import { generateJSON, type AICallContext } from '@/lib/ai/ai-client'
import { SYSTEM_BASE, INJECTION_GUARD, FEEDBACK_PROMPT } from '@/lib/ai/prompts'
import { sanitizeForPrompt } from '@/lib/ai/sanitize'

interface FeedbackResult {
  strengths: string[]
  improvements: string[]
  next_step: string
  encouragement: string
  suggested_grade: number
}

/**
 * Generate AI feedback for a challenge submission.
 * Called automatically after submitChallenge (fire-and-forget),
 * saves to ai_generated_content + optionally updates submission.
 */
export async function generateChallengeFeedback(
  submissionId: string,
  challengeId: string
): Promise<void> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return

    // Get challenge + submission data
    const [challengeRes, submissionRes] = await Promise.all([
      (ctx.supabase as any).from('v_challenges').select('*').eq('id', challengeId).single(),
      (ctx.supabase as any).from('challenge_submissions').select('*').eq('id', submissionId).single(),
    ])

    const challenge = challengeRes.data as any
    const submission = submissionRes.data as any
    if (!challenge || !submission) return

    // Only auto-feedback if submission has text response
    if (!submission.response?.trim()) return

    const feedbackContext = `
## Desafio: ${challenge.title}
Dificuldade: ${challenge.difficulty}/5 | Pontos: ${challenge.base_points}
Descrição: ${challenge.description || 'N/A'}
Objetivos: ${challenge.objectives || 'N/A'}

## Resposta do Aluno:
<ALUNO_INPUT>
${sanitizeForPrompt(submission.response)}
</ALUNO_INPUT>
${submission.file_url ? '\n(O aluno também enviou um arquivo anexo)' : ''}
`.trim()

    const aiCtx: AICallContext = { tenantId: ctx.tenantId, userId: ctx.userId, actionName: 'generateChallengeFeedback' }
    const result = await generateJSON<FeedbackResult>({
      system: SYSTEM_BASE + INJECTION_GUARD,
      prompt: `${feedbackContext}\n\n${FEEDBACK_PROMPT}`,
      model: 'smart', // Use GPT-4o for better feedback quality
      maxTokens: 2000,
    }, aiCtx)

    if (!result?.strengths) return

    // Build formatted feedback text
    const feedbackText = formatFeedback(result)

    // Save to ai_generated_content
    await (ctx.supabase as any).from('ai_generated_content').insert({
      tenant_id: ctx.tenantId,
      challenge_id: challengeId,
      content_type: 'feedback',
      title: `Feedback AI: ${challenge.title}`,
      content: feedbackText,
      metadata: {
        submission_id: submissionId,
        student_id: submission.student_id,
        strengths: result.strengths,
        improvements: result.improvements,
        next_step: result.next_step,
        suggested_grade: result.suggested_grade,
      },
      ai_model: 'gpt-4o',
      status: 'active',
      created_by: ctx.userId,
    })

    // Update submission with AI feedback (teacher can override later)
    await (ctx.supabase as any)
      .from('challenge_submissions')
      .update({
        ai_feedback: feedbackText,
        ai_suggested_grade: result.suggested_grade,
      })
      .eq('id', submissionId)

    revalidatePath(`/challenges/${challengeId}`)
    revalidatePath('/evaluate')
  } catch (e) {
    console.error('Challenge AI feedback error:', e)
  }
}

/**
 * Generate AI feedback for a portfolio submission.
 * Fire-and-forget, saves feedback to ai_generated_content.
 */
export async function generatePortfolioFeedback(
  portfolioId: string
): Promise<void> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return

    // Get portfolio data
    const { data: portfolioRaw } = await (ctx.supabase as any)
      .from('v_portfolios')
      .select('*')
      .eq('id', portfolioId)
      .single()
    const portfolio = portfolioRaw as any
    if (!portfolio) return

    // Only auto-feedback if has description
    if (!portfolio.description?.trim()) return

    const feedbackContext = `
## Trabalho do Portfólio
Tipo: ${portfolio.work_type}
<ALUNO_INPUT>
Título: ${sanitizeForPrompt(portfolio.title)}
${portfolio.description ? `Descrição do aluno:\n${sanitizeForPrompt(portfolio.description)}` : ''}
</ALUNO_INPUT>
${portfolio.file_url ? '\n(O aluno enviou arquivo de evidência)' : ''}
${portfolio.video_url ? '\n(O aluno enviou vídeo)' : ''}
${portfolio.audio_url ? '\n(O aluno enviou áudio)' : ''}
`.trim()

    const aiCtx: AICallContext = { tenantId: ctx.tenantId, userId: ctx.userId, actionName: 'generatePortfolioFeedback' }
    const result = await generateJSON<FeedbackResult>({
      system: SYSTEM_BASE + INJECTION_GUARD,
      prompt: `${feedbackContext}\n\n${FEEDBACK_PROMPT}`,
      model: 'smart',
      maxTokens: 2000,
    }, aiCtx)

    if (!result?.strengths) return

    const feedbackText = formatFeedback(result)

    // Save to ai_generated_content
    await (ctx.supabase as any).from('ai_generated_content').insert({
      tenant_id: ctx.tenantId,
      content_type: 'feedback',
      title: `Feedback AI: ${portfolio.title}`,
      content: feedbackText,
      metadata: {
        portfolio_id: portfolioId,
        student_id: portfolio.student_id,
        work_type: portfolio.work_type,
        strengths: result.strengths,
        improvements: result.improvements,
        next_step: result.next_step,
        suggested_grade: result.suggested_grade,
      },
      ai_model: 'gpt-4o',
      status: 'active',
      created_by: ctx.userId,
    })

    revalidatePath('/portfolio')
    revalidatePath(`/portfolio/${portfolioId}`)
  } catch (e) {
    console.error('Portfolio AI feedback error:', e)
  }
}

/**
 * Manually request AI feedback for any submission (teacher action)
 */
export async function requestAIFeedback(
  type: 'challenge' | 'portfolio',
  id: string,
  challengeId?: string
): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const canFeedback = await checkPermission('lessons.create')
    if (!canFeedback) return forbiddenError('Permissão lessons.create necessária')

    if (type === 'challenge' && challengeId) {
      await generateChallengeFeedback(id, challengeId)
    } else if (type === 'portfolio') {
      await generatePortfolioFeedback(id)
    }

    return successResponse(null, 'Feedback AI gerado com sucesso')
  } catch (e) {
    return databaseError('Erro ao gerar feedback AI')
  }
}

/**
 * Format feedback result into readable markdown
 */
function formatFeedback(result: FeedbackResult): string {
  const lines: string[] = []

  if (result.strengths?.length) {
    lines.push('**Pontos fortes:**')
    result.strengths.forEach(s => lines.push(`- ${s}`))
    lines.push('')
  }

  if (result.improvements?.length) {
    lines.push('**Sugestoes de melhoria:**')
    result.improvements.forEach(s => lines.push(`- ${s}`))
    lines.push('')
  }

  if (result.next_step) {
    lines.push(`**Proximo passo:** ${result.next_step}`)
    lines.push('')
  }

  if (result.encouragement) {
    lines.push(`> ${result.encouragement}`)
  }

  return lines.join('\n')
}
