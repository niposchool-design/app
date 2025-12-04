/**
 * 🔍 TESTE DE CONEXÃO - NIPO SCHOOL DATABASE
 * 
 * Serviço para testar todas as conexões e funcionalidades do banco
 */

import { supabase } from '../../lib/supabase/client'
import { 
  checkTablesExist,
  checkDataExists,
  createBasicCategories,
  createBasicInstruments,
  setupBasicDatabase
} from './sqlExecutor'

// Tipos para teste
interface ConnectionTestResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

interface DatabaseHealth {
  connected: boolean
  tablesAccessible: boolean
  authWorking: boolean
  realTimeWorking: boolean
  errors: string[]
  results: Record<string, any>
}

/**
 * Teste completo de saúde do banco de dados
 */
export async function testDatabaseHealth(): Promise<DatabaseHealth> {
  const health: DatabaseHealth = {
    connected: false,
    tablesAccessible: false,
    authWorking: false,
    realTimeWorking: false,
    errors: [],
    results: {}
  }

  try {
    // 1. Teste de conexão básica
    console.log('🔍 Testando conexão básica...')
    const connectionTest = await testBasicConnection()
    health.connected = connectionTest.success
    health.results.connection = connectionTest

    if (!connectionTest.success) {
      health.errors.push('Falha na conexão básica')
      return health
    }

    // 2. Teste de acesso às tabelas
    console.log('📋 Testando acesso às tabelas...')
    const tablesTest = await testTablesAccess()
    health.tablesAccessible = tablesTest.success
    health.results.tables = tablesTest

    // 3. Teste de autenticação
    console.log('🔐 Testando sistema de autenticação...')
    const authTest = await testAuthentication()
    health.authWorking = authTest.success
    health.results.auth = authTest

    // 4. Teste de real-time
    console.log('⚡ Testando recursos real-time...')
    const realtimeTest = await testRealTimeFeatures()
    health.realTimeWorking = realtimeTest.success
    health.results.realtime = realtimeTest

    console.log('✅ Teste de saúde do banco concluído!')
    return health

  } catch (error) {
    console.error('❌ Erro durante teste de saúde:', error)
    health.errors.push(`Erro geral: ${error}`)
    return health
  }
}

/**
 * Teste de conexão básica
 */
export async function testBasicConnection(): Promise<ConnectionTestResult> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (error) {
      return {
        success: false,
        message: 'Erro na conexão básica',
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Conexão básica estabelecida com sucesso',
      data: data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha na conexão básica',
      error: String(error)
    }
  }
}

/**
 * Teste de acesso às tabelas principais
 */
export async function testTablesAccess(): Promise<ConnectionTestResult> {
  try {
    const result = await checkTablesExist()
    return {
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.error
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha no teste de tabelas',
      error: String(error)
    }
  }
}

/**
 * Teste do sistema de autenticação
 */
export async function testAuthentication(): Promise<ConnectionTestResult> {
  try {
    // Verificar sessão atual
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      return {
        success: false,
        message: 'Erro ao verificar sessão',
        error: sessionError.message
      }
    }

    // Verificar usuário atual
    const { data: user, error: userError } = await supabase.auth.getUser()

    return {
      success: true,
      message: 'Sistema de autenticação funcionando',
      data: {
        hasSession: !!session?.session,
        hasUser: !!user?.user,
        sessionInfo: session?.session ? {
          userId: session.session.user.id,
          email: session.session.user.email
        } : null
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha no teste de autenticação',
      error: String(error)
    }
  }
}

/**
 * Teste de recursos real-time
 */
export async function testRealTimeFeatures(): Promise<ConnectionTestResult> {
  try {
    // Criar um canal de teste
    const channel = supabase.channel('test-channel')
    
    let subscribed = false
    
    // Tentar se inscrever
    const subscription = channel
      .on('presence', { event: 'sync' }, () => {
        subscribed = true
      })
      .subscribe()

    // Aguardar um momento para conexão
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Limpar
    await supabase.removeChannel(channel)

    return {
      success: true,
      message: 'Recursos real-time disponíveis',
      data: {
        channelCreated: !!channel,
        subscriptionCreated: !!subscription
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha no teste real-time',
      error: String(error)
    }
  }
}

/**
 * Teste específico de instrumentos
 */
export async function testInstrumentosFeatures(): Promise<ConnectionTestResult> {
  try {
    const dataResult = await checkDataExists()
    return {
      success: dataResult.success,
      message: dataResult.message,
      data: dataResult.data,
      error: dataResult.error
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha no teste de instrumentos',
      error: String(error)
    }
  }
}

/**
 * Teste de turmas e matrículas
 */
export async function testTurmasFeatures(): Promise<ConnectionTestResult> {
  try {
    // Buscar turmas
    const { data: turmas, error: turmasError } = await supabase
      .from('turmas')
      .select(`
        *,
        professor:profiles!turmas_professor_id_fkey(nome, email),
        matriculas:matriculas(count)
      `)
      .limit(10)

    if (turmasError) {
      return {
        success: false,
        message: 'Erro ao buscar turmas',
        error: turmasError.message
      }
    }

    // Buscar matrículas
    const { data: matriculas, error: matriculasError } = await supabase
      .from('matriculas')
      .select(`
        *,
        aluno:profiles!matriculas_aluno_id_fkey(nome, email),
        turma:turmas(nome, nivel)
      `)
      .limit(10)

    return {
      success: true,
      message: 'Sistema de turmas funcionando',
      data: {
        turmasCount: turmas?.length || 0,
        matriculasCount: matriculas?.length || 0,
        turmas: turmas,
        matriculas: matriculas
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha no teste de turmas',
      error: String(error)
    }
  }
}

/**
 * Popular dados de teste
 */
export async function populateTestData(): Promise<ConnectionTestResult> {
  try {
    console.log('🌱 Populando dados de teste...')
    
    const results = await setupBasicDatabase()
    
    const success = results.every(r => r.success)
    const messages = results.map(r => r.message).join('; ')
    
    return {
      success,
      message: success ? 'Dados populados com sucesso' : 'Alguns erros durante população',
      data: results
    }
  } catch (error) {
    return {
      success: false,
      message: 'Falha ao popular dados de teste',
      error: String(error)
    }
  }
}

export default {
  testDatabaseHealth,
  testBasicConnection,
  testTablesAccess,
  testAuthentication,
  testRealTimeFeatures,
  testInstrumentosFeatures,
  testTurmasFeatures,
  populateTestData
}