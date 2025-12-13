'use client'

import OrientalDashboardLayout from '@/components/layouts/OrientalDashboardLayout'

export default function AlunoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrientalDashboardLayout role="aluno">
      {children}
    </OrientalDashboardLayout>
  )
}
