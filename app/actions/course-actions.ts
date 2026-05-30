'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { validateAction } from '@/lib/validations/validate-action'
import { createCourseSchema, enrollStudentSchema, unenrollStudentSchema, recordAttendanceSchema } from '@/lib/validations/unified-schemas'
import { successResponse, unauthorizedError, forbiddenError, databaseError, validationError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { checkPermission } from '@/lib/auth/check-permission'

export async function createCourse(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(createCourseSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    if (!(await checkPermission('courses.create'))) return forbiddenError('Permissao courses.create necessaria')

    const { data, error } = await ctx.supabase
      .from('courses')
      .insert({ ...validation.data, tenant_id: ctx.tenantId, teacher_id: ctx.userId })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath('/courses')
    return successResponse(data, 'Turma criada com sucesso')
  } catch (e) {
    return databaseError('Erro ao criar turma')
  }
}

export async function enrollStudent(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(enrollStudentSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    if (!(await checkPermission('enrollments.manage'))) return forbiddenError('Permissao enrollments.manage necessaria')

    const { data, error } = await ctx.supabase
      .from('enrollments')
      .insert({ ...validation.data, tenant_id: ctx.tenantId, status: 'active' })
      .select('id')
      .single()

    if (error) return databaseError(error.message)

    revalidatePath(`/courses/${validation.data.course_id}`)
    return successResponse(data, 'Aluno matriculado com sucesso')
  } catch (e) {
    return databaseError('Erro ao matricular aluno')
  }
}

export async function unenrollStudent(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(unenrollStudentSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('enrollments')
      .delete()
      .eq('id', validation.data.enrollment_id)

    if (error) return databaseError(error.message)

    revalidatePath('/settings/enrollments')
    return successResponse(null, 'Matrícula cancelada com sucesso')
  } catch (e) {
    return databaseError('Erro ao cancelar matrícula')
  }
}

export async function recordAttendance(rawData: any): Promise<ActionResult> {
  try {
    const validation = await validateAction(recordAttendanceSchema, rawData)
    if (!validation.success) return validationError(validation.error)

    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    if (!(await checkPermission('attendance.manage'))) return forbiddenError('Permissao attendance.manage necessaria')

    const records = validation.data.records.map((r: any) => ({
      tenant_id: ctx.tenantId,
      course_id: validation.data.course_id,
      student_id: r.student_id,
      date: validation.data.date,
      is_present: r.is_present,
      justification: r.justification,
    }))

    // Delete existing records then insert (views don't support ON CONFLICT)
    for (const rec of records) {
      await ctx.supabase
        .from('attendance')
        .delete()
        .eq('course_id', rec.course_id)
        .eq('student_id', rec.student_id)
        .eq('date', rec.date)
    }

    const { error } = await ctx.supabase
      .from('attendance')
      .insert(records)

    if (error) return databaseError(error.message)

    revalidatePath(`/courses/${validation.data.course_id}/attendance`)
    return successResponse(null, 'Frequência registrada com sucesso')
  } catch (e) {
    return databaseError('Erro ao registrar frequência')
  }
}
