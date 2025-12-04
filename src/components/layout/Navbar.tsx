/**
 * 🧭 NAVBAR - Barra de Navegação Pública EVOLUTION
 * 
 * Navbar japonês para páginas públicas:
 * - Logo inteligente
 * - Theme toggle zen
 * - Mobile-first responsivo
 * - Filosofia japonesa integrada
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ROUTES } from '../../lib/constants/routes'
import { NipoButton } from '../shared/NipoButton'
import { NipoLogo, NipoLogoMobile } from '../nipo/NipoLogo' // 🎌 NOVO
import { ThemeToggle } from '../nipo/ThemeToggle' // 🌙 NOVO
import { useTheme } from '../../contexts/ThemeContext' // 🎯 NOVO

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark } = useTheme() // 🌙 Dark mode state

  const navLinks = [
    { name: 'Início', path: ROUTES.HOME },
    { name: 'Sobre', path: ROUTES.SOBRE },
    { name: 'Contato', path: ROUTES.CONTATO },
  ]

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-300
      ${isDark 
        ? 'bg-nipo-zen-900/95 border-nipo-zen-700' 
        : 'bg-white/95 border-nipo-zen-200'
      }
      backdrop-blur-md border-b
      shadow-zen
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🎌 Logo Inteligente */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            {/* Desktop Logo */}
            <div className="hidden sm:block">
              <NipoLogo variant="full" size="md" />
            </div>
            {/* Mobile Logo */}
            <div className="block sm:hidden">
              <NipoLogoMobile />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  font-zen font-medium transition-all duration-300
                  ${isDark 
                    ? 'text-nipo-zen-300 hover:text-white' 
                    : 'text-nipo-zen-600 hover:text-nipo-zen-900'
                  }
                  hover:scale-105 active:scale-95
                  relative after:absolute after:bottom-[-4px] after:left-0 
                  after:w-0 after:h-0.5 after:bg-nipo-primary 
                  hover:after:w-full after:transition-all after:duration-300
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={ROUTES.LOGIN}>
              <NipoButton variant="ghost">Entrar</NipoButton>
            </Link>
            <Link to={ROUTES.SIGNUP}>
              <NipoButton>Cadastrar</NipoButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 hover:text-[var(--color-indigo)] px-4 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t">
                <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
                  <NipoButton variant="ghost" fullWidth>Entrar</NipoButton>
                </Link>
                <Link to={ROUTES.SIGNUP} onClick={() => setMobileMenuOpen(false)}>
                  <NipoButton fullWidth>Cadastrar</NipoButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
