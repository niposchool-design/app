'use client'

import OrientalDashboardLayout from '@/components/layouts/OrientalDashboardLayout'
import AdminHeader from './_components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrientalDashboardLayout role="admin">
      <AdminHeader />
      {children}
    </OrientalDashboardLayout>
  )
}
