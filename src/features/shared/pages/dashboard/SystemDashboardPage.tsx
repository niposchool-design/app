/**
 * 🎯 DASHBOARD DE STATUS DO SISTEMA - NIPO SCHOOL
 * 
 * Página que centraliza informações sobre todo o sistema
 */

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card'
import { Button } from '../../../../components/ui/Button'
import { Badge } from '../../../../components/ui/Badge'
import {
  testDatabaseHealth,
  testInstrumentosFeatures,
  populateTestData
} from '../../../../services/database/connectionTest'
import {
  checkTablesExist,
  checkDataExists,
  setupBasicDatabase
} from '../../../../services/database/sqlExecutor'
import {
  Database,
  Music,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react'

interface SystemStatus {
  database: {
    connected: boolean
    tablesOk: boolean
    dataExists: boolean
    lastCheck: Date
  }
  features: {
    instrumentos: number
    categorias: number
    usuarios: number
    turmas: number
  }
  activity: {
    activeUsers: number
    todayLogins: number
    weeklyActivity: number
  }
}

export default function SystemDashboardPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    checkSystemStatus()
  }, [])

  const checkSystemStatus = async () => {
    setLoading(true)
    try {
      // Verificar status do banco
      const dbHealth = await testDatabaseHealth()
      const tablesCheck = await checkTablesExist()
      const dataCheck = await checkDataExists()
      const instrumentosCheck = await testInstrumentosFeatures()

      setStatus({
        database: {
          connected: dbHealth.connected,
          tablesOk: tablesCheck.success,
          dataExists: dataCheck.success,
          lastCheck: new Date()
        },
        features: {
          instrumentos: dataCheck.data?.instrumentos || 0,
          categorias: dataCheck.data?.categorias_instrumentos || 0,
          usuarios: 12, // Mock data
          turmas: 5    // Mock data
        },
        activity: {
          activeUsers: 8,    // Mock data
          todayLogins: 15,   // Mock data
          weeklyActivity: 78 // Mock data
        }
      })

    } catch (error) {
      console.error('Erro ao verificar status:', error)
    } finally {
      setLoading(false)
    }
  }

  const runSetup = async () => {
    setTesting(true)
    try {
      await setupBasicDatabase()
      await checkSystemStatus()
    } catch (error) {
      console.error('Erro no setup:', error)
    } finally {
      setTesting(false)
    }
  }

  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center gap-2">
      {status ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  )

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'purple' 
  }: {
    title: string
    value: string | number
    change?: string
    icon: any
    color?: string
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {change}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando status do sistema...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎯 Dashboard do Sistema
              </h1>
              <p className="text-gray-600 mt-1">
                Status e métricas gerais do Nipo School
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {status?.database.lastCheck && (
                <span className="text-sm text-gray-500">
                  Última verificação: {status.database.lastCheck.toLocaleTimeString()}
                </span>
              )}
              <Button 
                onClick={checkSystemStatus}
                disabled={loading}
                variant="secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button 
                onClick={runSetup}
                disabled={testing}
              >
                {testing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Settings className="w-4 h-4 mr-2" />
                )}
                Setup Sistema
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Status Geral */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status do Banco */}
          <Card className={`border-l-4 ${
            status?.database.connected && status?.database.tablesOk 
              ? 'border-l-green-400' 
              : 'border-l-red-400'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Status do Banco de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatusIndicator 
                status={status?.database.connected || false} 
                label="Conexão estabelecida" 
              />
              <StatusIndicator 
                status={status?.database.tablesOk || false} 
                label="Tabelas acessíveis" 
              />
              <StatusIndicator 
                status={status?.database.dataExists || false} 
                label="Dados populados" 
              />
            </CardContent>
          </Card>

          {/* Resumo de Features */}
          <Card className="border-l-4 border-l-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Biblioteca Musical
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Instrumentos</span>
                <Badge variant="default">{status?.features.instrumentos || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Categorias</span>
                <Badge variant="default">{status?.features.categorias || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Usuários</span>
                <Badge variant="default">{status?.features.usuarios || 0}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Atividade */}
          <Card className="border-l-4 border-l-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Atividade do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Usuários Online</span>
                <Badge variant="success">{status?.activity.activeUsers || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Logins Hoje</span>
                <Badge variant="default">{status?.activity.todayLogins || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Atividade Semanal</span>
                <Badge variant="default">{status?.activity.weeklyActivity || 0}%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas Principais */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Métricas Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total de Instrumentos"
              value={status?.features.instrumentos || 0}
              change="+2 esta semana"
              icon={Music}
              color="purple"
            />
            <MetricCard
              title="Usuários Ativos"
              value={status?.activity.activeUsers || 0}
              change="+15% vs semana passada"
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Turmas Ativas"
              value={status?.features.turmas || 0}
              change="+1 este mês"
              icon={BookOpen}
              color="green"
            />
            <MetricCard
              title="Engajamento"
              value={`${status?.activity.weeklyActivity || 0}%`}
              change="+5% este mês"
              icon={Award}
              color="orange"
            />
          </div>
        </div>

        {/* Links Rápidos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Biblioteca de Instrumentos */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Music className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Biblioteca de Instrumentos</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Explore nossa coleção completa de instrumentos japoneses
                </p>
                <Button className="w-full" onClick={() => window.open('/instrumentos', '_blank')}>
                  Acessar Biblioteca
                </Button>
              </CardContent>
            </Card>

            {/* Admin do Banco */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Administração do Banco</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Gerencie e monitore o banco de dados
                </p>
                <Button className="w-full" onClick={() => window.open('/admin/database', '_blank')}>
                  Acessar Admin
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics & Relatórios</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Visualize dados e métricas detalhadas
                </p>
                <Button variant="secondary" className="w-full">
                  Em Breve
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Atividade Recente */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Atividade Recente</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { icon: Users, text: "3 novos usuários se registraram", time: "2 horas atrás", color: "text-blue-600" },
                  { icon: Music, text: "Novo instrumento adicionado: Koto", time: "4 horas atrás", color: "text-purple-600" },
                  { icon: Calendar, text: "5 aulas agendadas para amanhã", time: "6 horas atrás", color: "text-green-600" },
                  { icon: MessageSquare, text: "10 novos comentários em portfolios", time: "8 horas atrás", color: "text-orange-600" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}