import { z } from 'zod'

// ========================================
// User Management
// ========================================

export const assignUserRoleSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  roleSlug: z.enum(['student', 'teacher', 'admin'], {
    error: 'Valor inválido',
  }),
})

export const removeUserRoleSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  roleSlug: z.enum(['student', 'teacher', 'admin'], {
    error: 'Valor inválido',
  }),
})

export const toggleUserActiveSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  isActive: z.boolean(),
})

export const inviteUserSchema = z.object({
  email: z.string().email('Email invÃ¡lido'),
  roleSlug: z.enum(['student', 'teacher', 'admin'], {
    error: 'Valor inválido',
  }),
})

export const createStudentSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter no mÃ­nimo 3 caracteres'),
  email: z.string().email('Email invÃ¡lido'),
  password: z.string().min(6, 'Senha deve ter no mÃ­nimo 6 caracteres'),
  phone: z.string().optional(),
  instrumentId: z.string().uuid().optional(),
  roleSlug: z.enum(['student', 'teacher'], {
    error: 'Valor inválido',
  }).default('student'),
})

// ========================================
// Role Management
// ========================================

export const updateRoleSchema = z.object({
  roleId: z.string().uuid('ID de role invÃ¡lido'),
  display_name: z.string().min(1).max(100).optional(),
  kanji: z.string().max(10).optional(),
  kanji_meaning: z.string().max(100).optional(),
  primary_color: z.string().max(30).optional(),
  secondary_color: z.string().max(30).optional(),
  gradient: z.string().max(60).optional(),
  pattern: z.string().max(30).optional(),
  icon_name: z.string().max(30).optional(),
})

// ========================================
// Role Permissions
// ========================================

export const saveRolePermissionsSchema = z.object({
  roleId: z.string().uuid('ID de role invÃ¡lido'),
  permissionIds: z.array(z.string().uuid()),
})

// ========================================
// Role Navigation
// ========================================

export const roleNavigationItemSchema = z.object({
  navigationItemId: z.string().uuid(),
  labelOverride: z.string().max(100).nullable().optional(),
  groupName: z.string().max(100).nullable().optional(),
  groupOrder: z.number().int().min(0).default(0),
  itemOrder: z.number().int().min(0).default(0),
})

export const saveRoleNavigationSchema = z.object({
  roleId: z.string().uuid('ID de role invÃ¡lido'),
  items: z.array(roleNavigationItemSchema),
})

// ========================================
// Unit Management
// ========================================

export const createUnitSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mÃ­nimo 2 caracteres'),
  slug: z.string().min(2, 'Slug deve ter no mÃ­nimo 2 caracteres').regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minÃºsculas, nÃºmeros e hÃ­fens'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional(),
})

export const updateUnitSchema = z.object({
  unitId: z.string().uuid('ID de unidade invÃ¡lido'),
  name: z.string().min(2, 'Nome deve ter no mÃ­nimo 2 caracteres'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional(),
})

export const toggleUnitActiveSchema = z.object({
  unitId: z.string().uuid('ID de unidade invÃ¡lido'),
  isActive: z.boolean(),
})

// ========================================
// Profile Edit
// ========================================

export const updateProfileSchema = z.object({
  userId: z.string().uuid('ID de usuÃ¡rio invÃ¡lido'),
  fullName: z.string().min(3, 'Nome deve ter no mÃ­nimo 3 caracteres'),
  displayName: z.string().optional(),
  phone: z.string().optional(),
  unitId: z.string().uuid().optional().nullable(),
  instrumentIds: z.array(z.string().uuid()).default([]),
})

// ========================================
// Types
// ========================================

export type AssignUserRoleInput = z.infer<typeof assignUserRoleSchema>
export type RemoveUserRoleInput = z.infer<typeof removeUserRoleSchema>
export type ToggleUserActiveInput = z.infer<typeof toggleUserActiveSchema>
export type InviteUserInput = z.infer<typeof inviteUserSchema>
export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>
export type SaveRolePermissionsInput = z.infer<typeof saveRolePermissionsSchema>
export type SaveRoleNavigationInput = z.infer<typeof saveRoleNavigationSchema>
export type CreateUnitInput = z.infer<typeof createUnitSchema>
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>
export type ToggleUnitActiveInput = z.infer<typeof toggleUnitActiveSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
