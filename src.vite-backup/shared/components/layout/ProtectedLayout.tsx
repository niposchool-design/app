/**
 * 🏗️ PROTECTED LAYOUT - Layout para Páginas Autenticadas
 * 
 * Layout usado para páginas que requerem autenticação:
 * - Dashboards (Aluno, Professor, Admin)
 * - Todas as páginas protegidas por role
 */

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs'
import { Menu } from 'lucide-react'

export const ProtectedLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex-1">
              <Breadcrumbs />
            </div>

            {/* User menu placeholder */}
            <div className="flex items-center gap-4">
              {/* Aqui virá o UserMenu no futuro */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
