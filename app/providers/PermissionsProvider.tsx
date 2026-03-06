'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './AuthProvider'
import { loadUserRBAC } from '@/app/actions/rbac-actions'
import type {
  PermissionsContextType,
  NavigationGroup,
  NavigationItem,
} from '@/lib/types/rbac'

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

/**
 * Agrupa itens de navegação por group_name.
 * Itens sem grupo ficam em um grupo com título vazio (flat).
 */
function groupNavigation(items: NavigationItem[]): NavigationGroup[] {
  const groups = new Map<string, NavigationGroup>()
  const ungrouped: NavigationItem[] = []

  for (const item of items) {
    if (item.group_name) {
      if (!groups.has(item.group_name)) {
        groups.set(item.group_name, {
          title: item.group_name,
          order: item.group_order,
          items: [],
        })
      }
      groups.get(item.group_name)!.items.push(item)
    } else {
      ungrouped.push(item)
    }
  }

  const result: NavigationGroup[] = []

  if (ungrouped.length > 0) {
    result.push({ title: '', order: -1, items: ungrouped })
  }

  result.push(
    ...Array.from(groups.values()).sort((a, b) => a.order - b.order)
  )

  return result
}

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['rbac', user?.id],
    queryFn: async () => {
      const result = await loadUserRBAC()
      if ('error' in result) throw new Error(result.error)
      return result.data
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const value = useMemo<PermissionsContextType>(() => {
    const permissions = data?.permissions || []
    const navigation = data?.navigation || []
    const permissionSet = new Set(permissions)

    return {
      role: data?.role || null,
      permissions,
      navigation,
      navigationGroups: groupNavigation(navigation),
      loading: isLoading,
      hasPermission: (slug: string) => permissionSet.has(slug),
      hasAnyPermission: (...slugs: string[]) =>
        slugs.some((s) => permissionSet.has(s)),
      hasAllPermissions: (...slugs: string[]) =>
        slugs.every((s) => permissionSet.has(s)),
    }
  }, [data, isLoading])

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  )
}

export function usePermissions() {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error('usePermissions must be used within PermissionsProvider')
  }
  return context
}
