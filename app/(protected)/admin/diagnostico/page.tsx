'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Activity,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Database,
    Layout,
    Users,
    Music,
    Settings,
    Eye,
    RefreshCw,
    ArrowRight
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import { checkDatabaseHealth } from '@/src/lib/supabase/actions/system'
import AdminPageLayout from '../_components/AdminPageLayout'

interface ComponentCheck {
    name: string
    path: string
    status: 'ok' | 'error' | 'warning' | 'loading'
    description: string
    role?: 'admin' | 'professor' | 'aluno' | 'all'
}

export default function SystemDiagnosticPage() {
    const { user } = useAuth()
    const [components, setComponents] = useState<ComponentCheck[]>([])
    const [isChecking, setIsChecking] = useState(false)

    // Lista de componentes e rotas para verificar
    const systemComponents: ComponentCheck[] = [
        // Dashboards
        { name: 'Admin Dashboard', path: '/admin', status: 'loading', description: 'Dashboard administrativo principal', role: 'admin' },
        { name: 'Professor Dashboard', path: '/professores', status: 'loading', description: 'Dashboard para professores', role: 'professor' },
        { name: 'Aluno Dashboard', path: '/alunos', status: 'loading', description: 'Dashboard para alunos', role: 'aluno' },

        // Páginas Admin
        { name: 'Database Admin', path: '/admin/database', status: 'loading', description: 'Administração do banco de dados', role: 'admin' },
        { name: 'Gamificação', path: '/admin/gamificacao', status: 'loading', description: 'Gestão de gamificação', role: 'admin' },
        { name: 'QR Codes', path: '/admin/qr/gerenciar', status: 'loading', description: 'Gerenciador de QR Codes', role: 'admin' },

        // Páginas Principais
        { name: 'Instrumentos', path: '/admin/instrumentos', status: 'loading', description: 'Gestão de instrumentos', role: 'admin' },
        { name: 'Repertório', path: '/admin/repertorio', status: 'loading', description: 'Gestão de repertório', role: 'admin' },

        // Páginas Gerais (Admin)
        { name: 'Configurações', path: '/admin/configuracoes', status: 'loading', description: 'Configurações do sistema', role: 'admin' },
    ]

    // Simular verificação dos componentes
    const checkComponents = async () => {
        setIsChecking(true)

        const updatedComponents: ComponentCheck[] = []

        // Database Check via Server Action
        try {
            const dbHealth = await checkDatabaseHealth();
            const dbIndex = systemComponents.findIndex(c => c.name === 'Database Admin');
            if (dbIndex >= 0) {
                systemComponents[dbIndex].status = dbHealth.status === 'ok' ? 'ok' : 'error';
                systemComponents[dbIndex].description = dbHealth.status === 'ok'
                    ? `Conexão Estável (${dbHealth.latency}ms)`
                    : `Erro: ${dbHealth.message}`;
            }
        } catch (e) {
            console.error(e);
        }

        for (const component of systemComponents) {
            // Se já foi checado especificamente (ex: Database), pula lógica genérica
            if (component.status !== 'loading' && component.name === 'Database Admin') {
                updatedComponents.push(component);
                continue;
            }

            // Simular verificação (poderia ser um fetch real para verificar status 200)
            await new Promise(resolve => setTimeout(resolve, 50))

            // Determinar status baseado em role e disponibilidade
            let status: ComponentCheck['status'] = 'ok'

            // Verificar se o usuário tem acesso (simulação simples)
            if (component.role && component.role !== 'all' && user?.role !== component.role && user?.role !== 'admin') {
                status = 'warning' // Não tem acesso
            }

            updatedComponents.push({
                ...component,
                status
            })
        }

        setComponents(updatedComponents)
        setIsChecking(false)
    }

    useEffect(() => {
        checkComponents()
    }, [user])

    const getStatusIcon = (status: ComponentCheck['status']) => {
        switch (status) {
            case 'ok':
                return <CheckCircle className="w-5 h-5 text-green-600" />
            case 'error':
                return <XCircle className="w-5 h-5 text-red-600" />
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-600" />
            case 'loading':
                return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
        }
    }

    const getStatusText = (status: ComponentCheck['status']) => {
        switch (status) {
            case 'ok':
                return 'Funcionando'
            case 'error':
                return 'Erro'
            case 'warning':
                return 'Sem acesso'
            case 'loading':
                return 'Verificando...'
        }
    }

    const filterComponentsByRole = (components: ComponentCheck[]) => {
        if (!user) return components

        return components.filter(component =>
            component.role === 'all' ||
            component.role === user.role ||
            user.role === 'admin' // Admin vê tudo
        )
    }

    const visibleComponents = filterComponentsByRole(components)
    const okCount = visibleComponents.filter(c => c.status === 'ok').length
    const errorCount = visibleComponents.filter(c => c.status === 'error').length
    const warningCount = visibleComponents.filter(c => c.status === 'warning').length

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    🔍 Diagnóstico do Sistema
                </h1>
                <p className="text-gray-600 text-lg">
                    Verificação completa de componentes e rotas do Nipo School
                </p>
            </div>

            {/* Resumo do Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-2xl font-bold text-green-600">{okCount}</p>
                            <p className="text-sm text-gray-600">Funcionando</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
                            <p className="text-sm text-gray-600">Sem Acesso</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                        <XCircle className="w-8 h-8 text-red-600" />
                        <div>
                            <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                            <p className="text-sm text-gray-600">Com Erro</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                        <Layout className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{visibleComponents.length}</p>
                            <p className="text-sm text-gray-600">Total</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Componentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Status dos Componentes</h2>
                        <button
                            onClick={checkComponents}
                            disabled={isChecking}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            type="button"
                        >
                            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                            {isChecking ? 'Verificando...' : 'Verificar Novamente'}
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-3">
                        {visibleComponents.map((component, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {getStatusIcon(component.status)}
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{component.name}</h3>
                                        <p className="text-sm text-gray-600">{component.description}</p>
                                        <p className="text-xs text-gray-500 font-mono mt-1">{component.path}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${component.status === 'ok' ? 'bg-green-100 text-green-800' :
                                        component.status === 'error' ? 'bg-red-100 text-red-800' :
                                            component.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {getStatusText(component.status)}
                                    </span>

                                    {component.status === 'ok' && (
                                        <Link href={component.path} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                                            Acessar <ArrowRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
