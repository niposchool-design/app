/**
 * 🦶 FOOTER - Rodapé do Site
 * 
 * Footer para páginas públicas
 * - Links importantes
 * - Redes sociais
 * - Copyright
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Music } from 'lucide-react'
import { ROUTES } from '@/lib/constants/routes'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo-icon.svg" 
                alt="Nipo School" 
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold">Nipo School</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Sistema Oriental de Ensino Musical. Aprenda música com disciplina 
              japonesa e tecnologia de ponta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">YouTube</span>
                🎥
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Plataforma</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.LOGIN} className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to={ROUTES.SIGNUP} className="text-gray-400 hover:text-white transition-colors">Cadastro</Link></li>
              <li><a href="#recursos" className="text-gray-400 hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Benefícios</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Suporte</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              <li>
                <a href="mailto:contato@niposchool.com.br" className="text-gray-400 hover:text-white transition-colors">
                  contato@niposchool.com.br
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Nipo School. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
