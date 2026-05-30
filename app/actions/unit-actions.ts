'use server'

import { revalidatePath } from 'next/cache'
import { validateAction } from '@/lib/validations/validate-action'
import {
  createUnitSchema,
  updateUnitSchema,
  toggleUnitActiveSchema,
} from '@/lib/validations/rbac-schemas'
import {
  successResponse,
  errorResponse,
  validationError,
  unauthorizedError,
  forbiddenError,
  databaseError,
} from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'
import { checkPermission } from '@/lib/auth/check-permission'

// Reuse getAuthContext from rbac-admin-actions (admin-only)
import { createClient } from '@/lib/supabase/server'

async function getAuthContext() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return null

  const claims = JSON.parse(atob(session.access_token.split('.')[1]))
  const tenantId: string | null = claims.tenant_id || null
  const userRoles: string[] = claims.user_roles || []

  if (!tenantId) return null
  if (!userRoles.includes('admin')) return null

  return { supabase, userId: user.id, tenantId }
}

/**
 * List all units in the tenant.
 */
export async function listUnits(): Promise<ActionResult> {
  const ctx = await getAuthContext()
  if (!ctx) return unauthorizedError('Acesso restrito a administradores')

  const { data, error } = await ctx.supabase
    .from('units')
    .select('*')
    .eq('tenant_id', ctx.tenantId)
    .order('name')

  if (error) return databaseError(error.message)
  return successResponse(data || [])
}

/**
 * Create a new unit.
 */
export async function createUnit(rawData: unknown): Promise<ActionResult> {
  const ctx = await getAuthContext()
  if (!ctx) return unauthorizedError('Acesso restrito a administradores')

  if (!(await checkPermission('settings.manage'))) return forbiddenError('Permissao settings.manage necessaria')

  const validation = await validateAction(createUnitSchema, rawData)
  if (!validation.success) return validationError(validation.error)

  const { name, slug, address, city, state, phone } = validation.data

  const { error } = await ctx.supabase
    .from('units')
    .insert({
      tenant_id: ctx.tenantId,
      name,
      slug,
      address: address || null,
      city: city || null,
      state: state || null,
      phone: phone || null,
    })

  if (error) return databaseError(error.message)

  revalidatePath('/settings/school')
  return successResponse(null, 'Unidade criada com sucesso')
}

/**
 * Update an existing unit.
 */
export async function updateUnit(rawData: unknown): Promise<ActionResult> {
  const ctx = await getAuthContext()
  if (!ctx) return unauthorizedError('Acesso restrito a administradores')

  if (!(await checkPermission('settings.manage'))) return forbiddenError('Permissao settings.manage necessaria')

  const validation = await validateAction(updateUnitSchema, rawData)
  if (!validation.success) return validationError(validation.error)

  const { unitId, name, address, city, state, phone } = validation.data

  const { error } = await ctx.supabase
    .from('units')
    .update({
      name,
      address: address || null,
      city: city || null,
      state: state || null,
      phone: phone || null,
    })
    .eq('id', unitId)
    .eq('tenant_id', ctx.tenantId)

  if (error) return databaseError(error.message)

  revalidatePath('/settings/school')
  return successResponse(null, 'Unidade atualizada com sucesso')
}

/**
 * Toggle unit active status.
 */
export async function toggleUnitActive(rawData: unknown): Promise<ActionResult> {
  const ctx = await getAuthContext()
  if (!ctx) return unauthorizedError('Acesso restrito a administradores')

  if (!(await checkPermission('settings.manage'))) return forbiddenError('Permissao settings.manage necessaria')

  const validation = await validateAction(toggleUnitActiveSchema, rawData)
  if (!validation.success) return validationError(validation.error)

  const { unitId, isActive } = validation.data

  const { error } = await ctx.supabase
    .from('units')
    .update({ is_active: isActive })
    .eq('id', unitId)
    .eq('tenant_id', ctx.tenantId)

  if (error) return databaseError(error.message)

  revalidatePath('/settings/school')
  return successResponse(null, isActive ? 'Unidade ativada' : 'Unidade desativada')
}
