/**
 * ⚙️ CONFIGURAÇÕES PAGE - NIPO SCHOOL EVOLUTION
 * 
 * Página de configurações com design japonês completo
 * Features: Perfil, Notificações, Preferências, Segurança
 */

import React, { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Moon, 
  Sun, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'
import { NipoInput } from '../../../components/shared/NipoInput'

export function ConfiguracoesPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('pt-BR')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    conquistas: true,
    aulas: true
  })

  const handleSave = () => {
    // Implementar salvamento
    console.log('Configurações salvas!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Japonês */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ⚙️ <span className="bg-gradient-to-r from-cherry-600 to-sakura-600 bg-clip-text text-transparent">
              Configurações
            </span>
          </h1>
          <p className="text-gray-600">個人設定 - Personalize sua experiência</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Perfil do Usuário */}
          <NipoCard title="👤 Perfil do Usuário">
            <NipoCardBody>
              <div className="space-y-4">
                <NipoInput
                  label="Nome Completo"
                  placeholder="Digite seu nome"
                  leftIcon={<User className="w-4 h-4" />}
                />
                <NipoInput
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                />
                <div className="relative">
                  <NipoInput
                    label="Nova Senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite nova senha"
                    leftIcon={<Shield className="w-4 h-4" />}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>

          {/* Aparência */}
          <NipoCard title="🎨 Aparência">
            <NipoCardBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Tema
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        theme === 'light' 
                          ? 'border-cherry-500 bg-cherry-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm">Claro</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        theme === 'dark' 
                          ? 'border-cherry-500 bg-cherry-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm">Escuro</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Idioma
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cherry-500 focus:border-transparent"
                  >
                    <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                    <option value="en-US">🇺🇸 English (US)</option>
                    <option value="ja-JP">🇯🇵 日本語 (Japanese)</option>
                  </select>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>

          {/* Notificações */}
          <NipoCard title="🔔 Notificações">
            <NipoCardBody>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email', icon: '📧' },
                  { key: 'push', label: 'Push Notifications', icon: '📱' },
                  { key: 'conquistas', label: 'Conquistas', icon: '🏆' },
                  { key: 'aulas', label: 'Lembretes de Aulas', icon: '🎵' }
                ].map(({ key, label, icon }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {icon} {label}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) => setNotifications(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cherry-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherry-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </NipoCardBody>
          </NipoCard>

          {/* Segurança */}
          <NipoCard title="🔒 Segurança">
            <NipoCardBody>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Conta Segura</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Sua conta está protegida e atualizada.
                  </p>
                </div>

                <div className="space-y-3">
                  <NipoButton variant="outline" fullWidth>
                    📲 Configurar 2FA
                  </NipoButton>
                  <NipoButton variant="outline" fullWidth>
                    📝 Gerenciar Sessões
                  </NipoButton>
                  <NipoButton variant="outline" fullWidth>
                    📊 Ver Atividades
                  </NipoButton>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>

        </div>

        {/* Botão de Salvar */}
        <div className="text-center">
          <NipoButton 
            onClick={handleSave}
            size="lg"
            className="px-12"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Configurações
          </NipoButton>
        </div>

        {/* Filosofia Japonesa */}
        <div className="text-center p-6 bg-gradient-to-r from-cherry-100 to-sakura-100 rounded-2xl">
          <p className="text-gray-700 italic">
            "改善 (Kaizen) - A melhoria contínua começa com pequenos ajustes"
          </p>
        </div>

      </div>
    </div>
  )
}

export default ConfiguracoesPage