/**
 * 🔧 PÁGINA DE ADMINISTRAÇÃO DO BANCO - NIPO SCHOOL
 * 
 * Interface para testar, monitorar e gerenciar o banco de dados
 */

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'
import {
  testDatabaseHealth,
  testBasicConnection,
  testTablesAccess,
  testInstrumentosFeatures,
  testTurmasFeatures,
  populateTestData
} from '../../../services/database/connectionTest'
import {
  Database,
  Server,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Loader2,
  RefreshCw,
  Plus,
  Table,
  Users,
  Music
} from 'lucide-react'

interface ConnectionTestResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

interface DatabaseHealthState {
  connected: boolean
  tablesAccessible: boolean
  authWorking: boolean
  realTimeWorking: boolean
  errors: string[]
  results: Record<string, any>
}

export default function DatabaseAdminPage() {
  const [loading, setLoading] = useState(false)
  const [health, setHealth] = useState<DatabaseHealthState | null>(null)
  const [testResults, setTestResults] = useState<Record<string, ConnectionTestResult>>({})
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Executar teste completo de saúde
  const runHealthCheck = async () => {
    setLoading(true)
    try {
      const result = await testDatabaseHealth()
      setHealth(result)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Erro no teste de saúde:', error)
    } finally {
      setLoading(false)
    }
  }

  // Executar teste específico
  const runSpecificTest = async (testName: string, testFunction: () => Promise<ConnectionTestResult>) => {
    setLoading(true)
    try {
      const result = await testFunction()
      setTestResults(prev => ({
        ...prev,
        [testName]: result
      }))
    } catch (error) {
      console.error(`Erro no teste ${testName}:`, error)
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          message: 'Erro na execução do teste',
          error: String(error)
        }
      }))
    } finally {
      setLoading(false)
    }
  }

  // Popular dados de teste
  const populateData = async () => {
    setLoading(true)
    try {
      const result = await populateTestData()
      setTestResults(prev => ({
        ...prev,
        populate: result
      }))
      // Atualizar teste de saúde após popular
      setTimeout(runHealthCheck, 1000)
    } catch (error) {
      console.error('Erro ao popular dados:', error)
    } finally {
      setLoading(false)
    }
  }

  // Executar teste inicial
  useEffect(() => {
    runHealthCheck()
  }, [])

  const StatusIcon = ({ success }: { success: boolean }) => (
    success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )
  )

  const ResultCard = ({ title, result, icon: Icon }: { 
    title: string
    result?: ConnectionTestResult
    icon: any 
  }) => (
    <Card className="border-l-4 border-l-purple-400">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {result && <StatusIcon success={result.success} />}
        </div>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant={result.success ? 'default' : 'destructive'}>
                {result.success ? 'Sucesso' : 'Erro'}
              </Badge>
              <span className="text-sm text-gray-600">{result.message}</span>
            </div>
            
            {result.data && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <pre className="text-xs overflow-auto max-h-32">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
            
            {result.error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-red-700 text-sm">{result.error}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Teste não executado</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🔧 Administração do Banco
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor e teste das conexões e funcionalidades do banco de dados
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {lastUpdate && (
              <span className="text-sm text-gray-500">
                Última atualização: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button 
              onClick={runHealthCheck}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Testar Saúde
            </Button>
          </div>
        </div>

        {/* Status Geral */}
        {health && (
          <Card className={`border-l-4 ${
            health.connected && health.tablesAccessible ? 'border-l-green-400' : 'border-l-red-400'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6" />
                  Status Geral do Banco
                </CardTitle>
                <Badge variant={
                  health.connected && health.tablesAccessible ? 'default' : 'destructive'
                }>
                  {health.connected && health.tablesAccessible ? 'Saudável' : 'Problemas'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <StatusIcon success={health.connected} />
                  <span className="text-sm">Conexão</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon success={health.tablesAccessible} />
                  <span className="text-sm">Tabelas</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon success={health.authWorking} />
                  <span className="text-sm">Autenticação</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon success={health.realTimeWorking} />
                  <span className="text-sm">Real-time</span>
                </div>
              </div>
              
              {health.errors.length > 0 && (
                <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Erros Encontrados:</h4>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    {health.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs de Testes */}
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connection">Conexão</TabsTrigger>
            <TabsTrigger value="tables">Tabelas</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="populate">Dados</TabsTrigger>
          </TabsList>

          {/* Teste de Conexão */}
          <TabsContent value="connection" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Testes de Conexão</h2>
              <Button
                onClick={() => runSpecificTest('connection', testBasicConnection)}
                disabled={loading}
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Testar Conexão
              </Button>
            </div>
            
            <ResultCard
              title="Conexão Básica"
              result={testResults.connection}
              icon={Server}
            />
          </TabsContent>

          {/* Teste de Tabelas */}
          <TabsContent value="tables" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Acesso às Tabelas</h2>
              <Button
                onClick={() => runSpecificTest('tables', testTablesAccess)}
                disabled={loading}
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Testar Tabelas
              </Button>
            </div>
            
            <ResultCard
              title="Acesso às Tabelas Principais"
              result={testResults.tables}
              icon={Table}
            />
          </TabsContent>

          {/* Teste de Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Funcionalidades Específicas</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Sistema de Instrumentos</h3>
                  <Button
                    onClick={() => runSpecificTest('instrumentos', testInstrumentosFeatures)}
                    disabled={loading}
                    size="sm"
                    variant="secondary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Testar
                  </Button>
                </div>
                <ResultCard
                  title="Biblioteca de Instrumentos"
                  result={testResults.instrumentos}
                  icon={Music}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Sistema de Turmas</h3>
                  <Button
                    onClick={() => runSpecificTest('turmas', testTurmasFeatures)}
                    disabled={loading}
                    size="sm"
                    variant="secondary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Testar
                  </Button>
                </div>
                <ResultCard
                  title="Turmas e Matrículas"
                  result={testResults.turmas}
                  icon={Users}
                />
              </div>
            </div>
          </TabsContent>

          {/* Popular Dados */}
          <TabsContent value="populate" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Dados de Teste</h2>
              <Button
                onClick={populateData}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Popular Dados
              </Button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Atenção!</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Esta função irá criar dados de teste no banco. 
                    Use apenas em ambiente de desenvolvimento.
                  </p>
                </div>
              </div>
            </div>
            
            <ResultCard
              title="População de Dados de Teste"
              result={testResults.populate}
              icon={Plus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}