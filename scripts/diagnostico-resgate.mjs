/**
 * 🔍 DIAGNÓSTICO COMPLETO - RESGATE DE FUNCIONALIDADES
 * Script para verificar o estado atual das tabelas e dados no Supabase
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🔍 INICIANDO DIAGNÓSTICO DO BANCO DE DADOS...\n')

// Função auxiliar para executar queries e mostrar resultados
async function checkTable(tableName, query = '*') {
  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select(query, { count: 'exact', head: false })

    if (error) {
      console.log(`❌ Tabela "${tableName}": ERRO - ${error.message}`)
      return { exists: false, count: 0, data: null }
    }

    console.log(`✅ Tabela "${tableName}": ${count || 0} registros`)
    return { exists: true, count: count || 0, data }
  } catch (err) {
    console.log(`❌ Tabela "${tableName}": NÃO EXISTE OU ERRO - ${err.message}`)
    return { exists: false, count: 0, data: null }
  }
}

async function runDiagnostic() {
  console.log('=' .repeat(60))
  console.log('1️⃣  SISTEMA ALPHA CHALLENGES')
  console.log('=' .repeat(60))
  
  const alphaMetodologias = await checkTable('alpha_metodologias')
  if (alphaMetodologias.count > 0) {
    const codigos = alphaMetodologias.data.map(m => m.codigo).join(', ')
    console.log(`   📋 Códigos: ${codigos}`)
  }
  
  const alphaDesafios = await checkTable('alpha_desafios')
  const alphaCompetencias = await checkTable('alpha_competencias')
  const alphaSubmissoes = await checkTable('alpha_submissoes')
  const alphaProgresso = await checkTable('alpha_progresso')

  console.log('\n' + '=' .repeat(60))
  console.log('2️⃣  HISTÓRIA DA MÚSICA')
  console.log('=' .repeat(60))
  
  await checkTable('historia_periodos')
  await checkTable('historia_compositores')
  await checkTable('historia_obras')
  await checkTable('historia_eventos')
  await checkTable('historia_movimentos')
  await checkTable('historia_instrumentos_historicos')

  console.log('\n' + '=' .repeat(60))
  console.log('3️⃣  INSTRUMENTOS E REPERTÓRIO')
  console.log('=' .repeat(60))
  
  const instrumentos = await checkTable('instrumentos')
  if (instrumentos.count > 0 && instrumentos.data) {
    const familias = [...new Set(instrumentos.data.map(i => i.familia))].join(', ')
    console.log(`   🎼 Famílias: ${familias}`)
  }
  
  await checkTable('tecnicas_instrumentos')
  await checkTable('repertorio')

  console.log('\n' + '=' .repeat(60))
  console.log('4️⃣  GAMIFICAÇÃO E CONQUISTAS')
  console.log('=' .repeat(60))
  
  const conquistas = await checkTable('conquistas')
  if (conquistas.count > 0 && conquistas.data) {
    const tipos = [...new Set(conquistas.data.map(c => c.tipo))].join(', ')
    console.log(`   🏆 Tipos: ${tipos}`)
  }
  
  await checkTable('aluno_conquistas')
  await checkTable('badges')
  await checkTable('pontos_aluno')

  console.log('\n' + '=' .repeat(60))
  console.log('5️⃣  PORTFÓLIO E EVIDÊNCIAS')
  console.log('=' .repeat(60))
  
  const portfolioItems = await checkTable('portfolio_items')
  if (portfolioItems.count > 0 && portfolioItems.data) {
    const status = portfolioItems.data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, {})
    console.log(`   📊 Status: ${JSON.stringify(status)}`)
  }
  
  await checkTable('evidencias')
  await checkTable('avaliacoes_portfolio')

  console.log('\n' + '=' .repeat(60))
  console.log('6️⃣  CURADORIA (MÓDULOS E TRILHAS)')
  console.log('=' .repeat(60))
  
  const modulos = await checkTable('modulos')
  if (modulos.count > 0 && modulos.data) {
    const publicados = modulos.data.filter(m => m.publicado).length
    console.log(`   📚 Publicados: ${publicados}/${modulos.count}`)
  }
  
  const trilhas = await checkTable('trilhas')
  await checkTable('atividades')
  await checkTable('recursos')

  console.log('\n' + '=' .repeat(60))
  console.log('7️⃣  USUÁRIOS E PERFIS')
  console.log('=' .repeat(60))
  
  await checkTable('profiles')
  await checkTable('alunos')
  await checkTable('professores')

  console.log('\n' + '=' .repeat(60))
  console.log('8️⃣  RESUMO FINAL')
  console.log('=' .repeat(60))
  
  const resumo = {
    'Alpha Metodologias': alphaMetodologias.count,
    'Alpha Desafios': alphaDesafios.count,
    'Instrumentos': instrumentos.count,
    'Conquistas': conquistas.count,
    'Portfólio Items': portfolioItems.count,
    'Módulos': modulos.count,
    'Trilhas': trilhas.count,
  }

  console.log('\n📊 ESTATÍSTICAS GERAIS:')
  Object.entries(resumo).forEach(([nome, count]) => {
    const status = count > 0 ? '✅' : '⚠️ '
    console.log(`   ${status} ${nome}: ${count}`)
  })

  console.log('\n' + '=' .repeat(60))
  console.log('🎯 DIAGNÓSTICO CONCLUÍDO')
  console.log('=' .repeat(60))
  
  // Recomendações
  console.log('\n💡 RECOMENDAÇÕES:')
  if (alphaMetodologias.count === 0) {
    console.log('   ⚠️  Popular tabela alpha_metodologias (8 metodologias pedagógicas)')
  }
  if (alphaDesafios.count === 0) {
    console.log('   ⚠️  Criar desafios Alpha baseados nas metodologias')
  }
  if (instrumentos.count < 20) {
    console.log('   ⚠️  Expandir biblioteca de instrumentos (meta: 50+)')
  }
  if (conquistas.count < 20) {
    console.log('   ⚠️  Criar mais conquistas para gamificação')
  }
  if (modulos.count === 0) {
    console.log('   ⚠️  Popular módulos de curadoria pedagógica')
  }
}

// Executar diagnóstico
runDiagnostic()
  .then(() => {
    console.log('\n✅ Diagnóstico finalizado com sucesso!')
    process.exit(0)
  })
  .catch(err => {
    console.error('\n❌ Erro durante diagnóstico:', err)
    process.exit(1)
  })
