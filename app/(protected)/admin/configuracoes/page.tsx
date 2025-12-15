'use client'

import React, { useState } from 'react'
import {
    Settings,
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
import AdminPageLayout from '../_components/AdminPageLayout'

export default function ConfiguracoesPage() {
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
        console.log('Configurações salvas!')
        alert('Configurações salvas com sucesso!')
    }

    return (
        <AdminPageLayout
            title="Configurações do Sistema"
            subtitle="Gerencie preferências e configurações da plataforma"
            icon={Settings}
            actions={
                <button onClick={handleSave} className="admin-btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                </button>
            }
        >
            <div className="space-y-6">
                {/* Conteúdo das configurações */}
                <div className="grid md:grid-cols-2 gap-6">

                {/* Dados da Escola */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span>🏫</span> Dados da Instituição
                        </h3>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Escola</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                defaultValue="Nipo School"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contato</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                defaultValue="contato@niposchool.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                defaultValue="Rua Japão, 123 - Liberdade, SP"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status do Sistema</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white">
                                <option value="ativo">✅ Ativo</option>
                                <option value="manutencao">⚠️ Manutenção</option>
                                <option value="ferias">🏖️ Modo Férias</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Perfil do Usuário */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">👤 Perfil do Usuário</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                    placeholder="Digite seu nome"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                    placeholder="Digite nova senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aparência */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">🎨 Aparência</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Palette className="w-4 h-4 inline mr-2" />
                                Tema
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${theme === 'light'
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <Sun className="w-5 h-5 mb-1 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Claro</span>
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${theme === 'dark'
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <Moon className="w-5 h-5 mb-1 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Escuro</span>
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white"
                            >
                                <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                                <option value="en-US">🇺🇸 English (US)</option>
                                <option value="ja-JP">🇯🇵 日本語 (Japanese)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notificações */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">🔔 Notificações</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {[
                            { key: 'email', label: 'Email', icon: '📧' },
                            { key: 'push', label: 'Push Notifications', icon: '📱' },
                            { key: 'conquistas', label: 'Conquistas', icon: '🏆' },
                            { key: 'aulas', label: 'Lembretes de Aulas', icon: '🎵' }
                        ].map(({ key, label, icon }) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <span>{icon}</span> {label}
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
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-red-300 peer-checked:bg-red-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Segurança */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">🔒 Segurança</h3>
                    </div>
                    <div className="p-6 space-y-4">
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
                            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                📲 Configurar 2FA
                            </button>
                            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                📝 Gerenciar Sessões
                            </button>
                            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                📊 Ver Atividades
                            </button>
                        </div>
                    </div>
                </div>

            </div> {/* Fecha o grid md:grid-cols-2 gap-6 */}

            {/* Botão de Salvar */}
            <div className="text-center">
                <button
                    onClick={handleSave}
                    className="px-12 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition-all font-semibold flex items-center justify-center mx-auto gap-2"
                >
                    <Save className="w-5 h-5" />
                    Salvar Configurações
                </button>
            </div>

            {/* Filosofia Japonesa */}
            <div className="text-center p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
                <p className="text-gray-700 italic font-serif">
                    "改善 (Kaizen) - A melhoria contínua começa com pequenos ajustes"
                </p>
            </div>

        </div> {/* Fecha space-y-6 */}
        </AdminPageLayout>
    );
}
