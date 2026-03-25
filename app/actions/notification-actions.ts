'use server'

import { revalidatePath } from 'next/cache'
import { getActionContext } from '@/lib/utils/action-context'
import { successResponse, unauthorizedError, databaseError } from '@/lib/utils/action-response'
import type { ActionResult } from '@/lib/types/action-result'

/**
 * Fetch unread notifications count for the current user.
 */
export async function getUnreadNotificationCount(): Promise<ActionResult<number>> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { count, error } = await ctx.supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', ctx.userId)
      .eq('is_read', false)

    if (error) return databaseError(error.message)

    return successResponse(count || 0)
  } catch {
    return databaseError('Erro ao buscar notificações')
  }
}

/**
 * Fetch paginated notifications for current user.
 */
export async function getNotifications(page: number = 1, limit: number = 20): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await ctx.supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', ctx.userId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) return databaseError(error.message)

    return successResponse({ notifications: data || [], total: count || 0, page, limit })
  } catch {
    return databaseError('Erro ao buscar notificações')
  }
}

/**
 * Mark a single notification as read.
 */
export async function markNotificationRead(notificationId: string): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .eq('user_id', ctx.userId)

    if (error) return databaseError(error.message)

    revalidatePath('/notifications')
    return successResponse(null, 'Notificação marcada como lida')
  } catch {
    return databaseError('Erro ao atualizar notificação')
  }
}

/**
 * Mark ALL notifications as read.
 */
export async function markAllNotificationsRead(): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', ctx.userId)
      .eq('is_read', false)

    if (error) return databaseError(error.message)

    revalidatePath('/notifications')
    return successResponse(null, 'Todas as notificações marcadas como lidas')
  } catch {
    return databaseError('Erro ao atualizar notificações')
  }
}

/**
 * Create a notification for a user (server-side utility).
 * Typically called from other actions, not directly from client.
 */
export async function createNotification(params: {
  userId: string
  title: string
  message: string
  notificationType: string
  referenceType?: string
  referenceId?: string
}): Promise<ActionResult> {
  try {
    const ctx = await getActionContext()
    if (!ctx) return unauthorizedError()

    const { error } = await ctx.supabase
      .from('notifications')
      .insert({
        tenant_id: ctx.tenantId,
        user_id: params.userId,
        title: params.title,
        message: params.message,
        notification_type: params.notificationType,
        reference_type: params.referenceType || null,
        reference_id: params.referenceId || null,
        is_read: false,
      })

    if (error) return databaseError(error.message)

    return successResponse(null, 'Notificação criada')
  } catch {
    return databaseError('Erro ao criar notificação')
  }
}
