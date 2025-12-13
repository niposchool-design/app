'use client'

import OrientalDashboardLayout from '@/components/layouts/OrientalDashboardLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrientalDashboardLayout role="admin">
      {children}
    </OrientalDashboardLayout>
  )
}
