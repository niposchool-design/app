'use client'

import OrientalDashboardLayout from '@/components/layouts/OrientalDashboardLayout'

export default function ProfessorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrientalDashboardLayout role="professor">
      {children}
    </OrientalDashboardLayout>
  )
}
