/**
 * 🚀 SCRIPT DE RESGATE - CRIAÇÃO DE TABELAS FALTANTES
 * Executa os scripts SQL para criar Portfolio e Gamificação
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🚀 INICIANDO CRIAÇÃO DE TABELAS FALTANTES...\n')

async function executarSQL(nomeArquivo, descricao) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📄 ${descricao}`)
  console.log('='.repeat(60))
  
  try {
    const caminhoSQL = join(__dirname, '..', 'sql_scripts', nomeArquivo)
    const sql = readFileSync(caminhoSQL, 'utf-8')
    
    console.log(`📖 Lendo arquivo: ${nomeArquivo}`)
    console.log(`📝 Tamanho: ${(sql.length / 1024).toFixed(2)} KB`)
    
    // Supabase client não suporta múltiplos comandos SQL de uma vez
    // Precisamos usar a API REST diretamente ou executar via Dashboard
    console.log(`\n⚠️  ATENÇÃO: Execute este SQL manualmente no Dashboard Supabase:`)
    console.log(`📍 https://supabase.com/dashboard/project/eehidnwlwrzqzgytbfsd/editor`)
    console.log(`\n📋 Arquivo: sql_scripts/${nomeArquivo}`)
    console.log(`\n✨ Ou copie e cole o conteúdo abaixo:\n`)
    console.log('─'.repeat(60))
    console.log(sql.substring(0, 500) + '...\n')
    
    return { sucesso: true, manual: true }
  } catch (error) {
    console.error(`❌ Erro ao ler arquivo:`, error.message)
    return { sucesso: false, erro: error.message }
  }
}

async function verificarTabela(nomeTabela) {
  try {
    const { data, error } = await supabase
      .from(nomeTabela)
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      if (error.message.includes('does not exist')) {
        return { existe: false }
      }
      throw error
    }
    
    return { existe: true }
  } catch (err) {
    return { existe: false, erro: err.message }
  }
}

async function main() {
  console.log('🔍 Verificando tabelas existentes...\n')
  
  // Verificar Portfolio
  const portfolioItems = await verificarTabela('portfolio_items')
  const portfolios = await verificarTabela('portfolios')
  const portfolioEvidencias = await verificarTabela('portfolio_evidencias')
  
  // Verificar Gamificação
  const conquistas = await verificarTabela('conquistas')
  const gamificationUsuarios = await verificarTabela('gamification_usuarios')
  const gamificationBadges = await verificarTabela('gamification_badges')
  
  console.log('📊 STATUS DAS TABELAS:')
  console.log('─'.repeat(60))
  console.log(`Portfolio Items:         ${portfolioItems.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log(`Portfolios:              ${portfolios.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log(`Portfolio Evidencias:    ${portfolioEvidencias.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log(`Conquistas:              ${conquistas.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log(`Gamification Usuarios:   ${gamificationUsuarios.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log(`Gamification Badges:     ${gamificationBadges.existe ? '✅ EXISTE' : '❌ FALTANDO'}`)
  console.log('─'.repeat(60))
  
  // Se alguma tabela está faltando, mostrar instruções
  const faltamTabelas = !portfolios.existe || !gamificationUsuarios.existe
  
  if (faltamTabelas) {
    console.log('\n📝 TABELAS FALTANTES DETECTADAS!')
    console.log('\n🔧 PRÓXIMOS PASSOS:')
    console.log('\n1️⃣  Acesse o Dashboard do Supabase:')
    console.log('   https://supabase.com/dashboard/project/eehidnwlwrzqzgytbfsd/editor')
    console.log('\n2️⃣  Vá para SQL Editor')
    console.log('\n3️⃣  Execute os seguintes scripts na ordem:\n')
    
    if (!portfolios.existe) {
      console.log('   📄 sql_scripts/create_portfolio_system.sql')
      await executarSQL('create_portfolio_system.sql', 'SISTEMA DE PORTFÓLIO')
    }
    
    if (!gamificationUsuarios.existe) {
      console.log('   📄 sql_scripts/create-gamification-tables.sql')
      await executarSQL('create-gamification-tables.sql', 'SISTEMA DE GAMIFICAÇÃO')
    }
    
    console.log('\n4️⃣  Após executar, rode este script novamente para verificar')
    
  } else {
    console.log('\n✅ TODAS AS TABELAS NECESSÁRIAS JÁ EXISTEM!')
    console.log('\n📊 Próxima etapa: Popular dados')
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('🎯 SCRIPT FINALIZADO')
  console.log('='.repeat(60) + '\n')
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('\n❌ Erro fatal:', err)
    process.exit(1)
  })
