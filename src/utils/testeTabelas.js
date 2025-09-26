// 🔍 SCRIPT DE TESTE - VALIDAÇÃO DE TABELAS SUPABASE
// Este arquivo ajuda a identificar quais tabelas realmente existem

import { supabase } from '../shared/lib/supabase/supabaseClient';

export async function testarTabelasExistentes() {
  console.log('🔍 INICIANDO TESTE DE TABELAS EXISTENTES...\n');
  
  const tabelasParaTestar = [
    // Tabelas documentadas como existentes
    { nome: 'profiles', esperado: true },
    { nome: 'modules', esperado: true },
    { nome: 'lessons', esperado: true },
    { nome: 'user_progress', esperado: true },
    { nome: 'achievements', esperado: true },
    { nome: 'achievements_progress', esperado: true },
    { nome: 'devotional_posts', esperado: true },
    { nome: 'user_devotional_progress', esperado: true },
    
    // Tabelas sendo consultadas mas duvidosas
    { nome: 'user_roles', esperado: false },
    { nome: 'aulas', esperado: false },
    { nome: 'instrumentos', esperado: false },
    { nome: 'turmas', esperado: false },
    { nome: 'alunos', esperado: false },
    { nome: 'professores', esperado: false },
    
    // Outras tabelas mencionadas no código
    { nome: 'instrumento_curiosidades', esperado: false },
    { nome: 'instrumento_midias', esperado: false },
    { nome: 'instrumentos_fisicos', esperado: false },
    { nome: 'cessoes_instrumentos', esperado: false },
    { nome: 'manutencoes_instrumentos', esperado: false },
    { nome: 'matriculas', esperado: false },
    { nome: 'professores_conteudos', esperado: false }
  ];

  const resultados = {
    existentes: [],
    inexistentes: [],
    erros: []
  };

  for (const tabela of tabelasParaTestar) {
    try {
      console.log(`🔍 Testando tabela: ${tabela.nome}...`);
      
      // Tenta fazer uma consulta simples
      const { data, error, count } = await supabase
        .from(tabela.nome)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${tabela.nome}: ${error.message}`);
        resultados.inexistentes.push({
          nome: tabela.nome,
          erro: error.message,
          esperado: tabela.esperado
        });
      } else {
        console.log(`✅ ${tabela.nome}: ${count || 0} registros`);
        resultados.existentes.push({
          nome: tabela.nome,
          registros: count || 0,
          esperado: tabela.esperado
        });
      }
    } catch (err) {
      console.log(`💥 ${tabela.nome}: Erro inesperado - ${err.message}`);
      resultados.erros.push({
        nome: tabela.nome,
        erro: err.message,
        esperado: tabela.esperado
      });
    }
  }

  console.log('\n📊 RESUMO DOS TESTES:');
  console.log(`✅ Tabelas existentes: ${resultados.existentes.length}`);
  console.log(`❌ Tabelas inexistentes: ${resultados.inexistentes.length}`);
  console.log(`💥 Erros inesperados: ${resultados.erros.length}`);

  return resultados;
}

export async function analisarEstruturaDados() {
  console.log('\n🔬 ANALISANDO ESTRUTURA DOS DADOS EXISTENTES...\n');
  
  const tabelasExistentes = ['profiles', 'modules', 'lessons', 'user_progress', 'achievements'];
  
  for (const tabela of tabelasExistentes) {
    try {
      console.log(`📋 Analisando estrutura de: ${tabela}`);
      
      const { data, error } = await supabase
        .from(tabela)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Erro ao analisar ${tabela}: ${error.message}`);
        continue;
      }

      if (data && data.length > 0) {
        const campos = Object.keys(data[0]);
        console.log(`   Campos (${campos.length}): ${campos.join(', ')}`);
        
        // Mostrar exemplo de dados
        console.log('   Exemplo:', JSON.stringify(data[0], null, 2));
      } else {
        console.log(`   Tabela vazia: ${tabela}`);
      }
      
      console.log(''); // Linha em branco
    } catch (err) {
      console.log(`💥 Erro inesperado ao analisar ${tabela}: ${err.message}\n`);
    }
  }
}

// Função principal para executar todos os testes
export async function executarAnaliseCompleta() {
  try {
    const resultados = await testarTabelasExistentes();
    await analisarEstruturaDados();
    
    console.log('\n🎯 CONCLUSÕES:');
    
    // Tabelas que existem mas não eram esperadas
    const surpresas = resultados.existentes.filter(t => !t.esperado);
    if (surpresas.length > 0) {
      console.log('🎉 Surpresas positivas (existem mas não esperávamos):');
      surpresas.forEach(t => console.log(`   ✅ ${t.nome} (${t.registros} registros)`));
    }
    
    // Tabelas que não existem mas eram esperadas
    const decepções = resultados.inexistentes.filter(t => t.esperado);
    if (decepções.length > 0) {
      console.log('😞 Tabelas esperadas mas inexistentes:');
      decepções.forEach(t => console.log(`   ❌ ${t.nome}: ${t.erro}`));
    }
    
    // Tabelas que não existem conforme esperado
    const confirmadas = resultados.inexistentes.filter(t => !t.esperado);
    if (confirmadas.length > 0) {
      console.log('✅ Confirmações (não existem conforme esperado):');
      confirmadas.forEach(t => console.log(`   ❌ ${t.nome}`));
    }
    
    return resultados;
    
  } catch (err) {
    console.error('💥 Erro ao executar análise completa:', err);
    throw err;
  }
}