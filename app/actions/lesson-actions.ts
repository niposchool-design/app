'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { validateAction } from '@/lib/validations/validate-action'
import {
  createLessonSchema,
  updateLessonSchema,
  toggleChecklistSchema,
  createLessonCommentSchema,
  updateLessonStatusSchema,
  createMaterialSchema,
  updateMaterialSchema,
  createActivitySchema,
  updateActivitySchema,
  createCriteriaSchema,
  updateCriteriaSchema,
  addLessonTagSchema,
  removeLessonTagSchema,
} from '@/lib/validations/unified-schemas'
import { successResponse, unauthorizedError, databaseError, validationError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { onLessonComplete } from '@/app/actions/alpha-engine-actions'

export async function createLesson(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createLessonSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('lessons')
      .insert({
        ...validation.data,
        tenant_id: ctx.tenantId,
        teacher_id: ctx.userId,
        status: 'draft',
      })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(data, 'Aula criada com sucesso')
  } catch (e) {
    return databaseError('Erro ao criar aula')
  }
}

export async function updateLesson(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(updateLessonSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const { lesson_id, ...updateData } = validation.data

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lessons')
      .update(updateData)
      .eq('id', lesson_id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    revalidatePath(`/lessons/${lesson_id}`)
    return successResponse(null, 'Aula atualizada com sucesso')
  } catch (e) {
    return databaseError('Erro ao atualizar aula')
  }
}

export async function completeLesson(lessonId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await (ctx.supabase as any).rpc('rpc_complete_lesson', {
      p_lesson_id: lessonId,
      p_notes: null,
    })

    if (error) return databaseError(error.message)

    // Gamification: award points + check achievements (fire-and-forget)
    ;(ctx.supabase as any).rpc('rpc_award_points', {
      p_user_id: ctx.userId,
      p_points: 50,  // Alinhado ao curriculum pedagógico (50pts/aula)
      p_source: 'lesson',
      p_action: 'complete',
      p_description: 'Aula concluída',
      p_reference_type: 'lesson',
      p_reference_id: lessonId,
    }).then(() => (ctx.supabase as any).rpc('rpc_check_achievements', { p_user_id: ctx.userId }))

    // Alpha Engine: auto-generate reinforcement items (fire-and-forget)
    onLessonComplete(lessonId).catch(() => {})

    revalidatePath('/lessons')
    revalidatePath(`/lessons/${lessonId}`)
    revalidatePath('/progress')
    revalidatePath('/achievements')
    return successResponse(null, 'Aula marcada como concluída')
  } catch (e) {
    return databaseError('Erro ao completar aula')
  }
}

export async function toggleLessonFavorite(lessonId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data: existing } = await ctx.supabase
      .from('lesson_favorites')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('student_id', ctx.userId)
      .maybeSingle()

    if (existing) {
      const { error } = await ctx.supabase
        .from('lesson_favorites')
        .delete()
        .eq('id', existing.id)
      if (error) return databaseError(error.message)
      revalidatePath(`/lessons/${lessonId}`)
      return successResponse({ favorited: false }, 'Removido dos favoritos')
    } else {
      const { error } = await ctx.supabase
        .from('lesson_favorites')
        .insert({ tenant_id: ctx.tenantId, lesson_id: lessonId, student_id: ctx.userId })
      if (error) return databaseError(error.message)
      revalidatePath(`/lessons/${lessonId}`)
      return successResponse({ favorited: true }, 'Adicionado aos favoritos')
    }
  } catch (e) {
    return databaseError('Erro ao alterar favorito')
  }
}

export async function toggleChecklist(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(toggleChecklistSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_checklists')
      .update({ is_done: validation.data.is_done, updated_at: new Date().toISOString() })
      .eq('id', validation.data.checklist_id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Checklist atualizado')
  } catch (e) {
    return databaseError('Erro ao atualizar checklist')
  }
}

export async function createLessonComment(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createLessonCommentSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('lesson_comments')
      .insert({
        tenant_id: ctx.tenantId,
        lesson_id: validation.data.lesson_id,
        user_id: ctx.userId,
        content: validation.data.content,
        parent_id: validation.data.parent_id ?? null,
      })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(data, 'Comentario adicionado')
  } catch (e) {
    return databaseError('Erro ao adicionar comentario')
  }
}

export async function deleteLessonComment(commentId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_comments')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', commentId)
      .eq('user_id', ctx.userId)

    if (error) return databaseError(error.message)
    return successResponse(null, 'Comentario removido')
  } catch (e) {
    return databaseError('Erro ao remover comentario')
  }
}

export async function updateLessonStatus(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(updateLessonStatusSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lessons')
      .update({ status: validation.data.status, updated_at: new Date().toISOString() })
      .eq('id', validation.data.lesson_id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    revalidatePath('/lessons/kanban')
    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(null, 'Status atualizado')
  } catch (e) {
    return databaseError('Erro ao atualizar status')
  }
}

// =============================================
// Materials CRUD
// =============================================

export async function createMaterial(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createMaterialSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('lesson_materials' as any)
      .insert({ ...validation.data, tenant_id: ctx.tenantId })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(data, 'Material adicionado')
  } catch (e) {
    return databaseError('Erro ao adicionar material')
  }
}

export async function updateMaterial(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(updateMaterialSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const { id, ...updateData } = validation.data

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_materials' as any)
      .update(updateData)
      .eq('id', id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Material atualizado')
  } catch (e) {
    return databaseError('Erro ao atualizar material')
  }
}

export async function deleteMaterial(materialId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_materials' as any)
      .delete()
      .eq('id', materialId)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Material removido')
  } catch (e) {
    return databaseError('Erro ao remover material')
  }
}

// =============================================
// Activities CRUD
// =============================================

export async function createActivity(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createActivitySchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('lesson_activities' as any)
      .insert({ ...validation.data, tenant_id: ctx.tenantId })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(data, 'Atividade adicionada')
  } catch (e) {
    return databaseError('Erro ao adicionar atividade')
  }
}

export async function updateActivity(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(updateActivitySchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const { id, ...updateData } = validation.data

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_activities' as any)
      .update(updateData)
      .eq('id', id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Atividade atualizada')
  } catch (e) {
    return databaseError('Erro ao atualizar atividade')
  }
}

export async function deleteActivity(activityId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_activities' as any)
      .delete()
      .eq('id', activityId)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Atividade removida')
  } catch (e) {
    return databaseError('Erro ao remover atividade')
  }
}

// =============================================
// Evaluation Criteria CRUD
// =============================================

export async function createCriteria(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createCriteriaSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('evaluation_criteria' as any)
      .insert({ ...validation.data, tenant_id: ctx.tenantId })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(data, 'Criterio adicionado')
  } catch (e) {
    return databaseError('Erro ao adicionar criterio')
  }
}

export async function updateCriteria(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(updateCriteriaSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const { id, ...updateData } = validation.data

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('evaluation_criteria' as any)
      .update(updateData)
      .eq('id', id)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Criterio atualizado')
  } catch (e) {
    return databaseError('Erro ao atualizar criterio')
  }
}

export async function deleteCriteria(criteriaId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('evaluation_criteria' as any)
      .delete()
      .eq('id', criteriaId)

    if (error) return databaseError(error.message)

    revalidatePath('/lessons')
    return successResponse(null, 'Criterio removido')
  } catch (e) {
    return databaseError('Erro ao remover criterio')
  }
}

// =============================================
// Lesson Tags
// =============================================

export async function addLessonTag(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(addLessonTagSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { data, error } = await ctx.supabase
      .from('lesson_tags' as any)
      .insert({
        tenant_id: ctx.tenantId,
        lesson_id: validation.data.lesson_id,
        tag: validation.data.tag,
      })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/lessons/${validation.data.lesson_id}`)
    return successResponse(data, 'Tag adicionada')
  } catch (e) {
    return databaseError('Erro ao adicionar tag')
  }
}

export async function removeLessonTag(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(removeLessonTagSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('lesson_tags' as any)
      .delete()
      .eq('id', validation.data.id)

    if (error) return databaseError(error.message)

    return successResponse(null, 'Tag removida')
  } catch (e) {
    return databaseError('Erro ao remover tag')
  }
}
