/**
 * 🏗️ PUBLIC LAYOUT - Layout para Páginas Públicas
 * 
 * Layout usado para páginas não autenticadas:
 * - Landing page
 * - Sobre
 * - Contato
 * - Login/Registro
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}
