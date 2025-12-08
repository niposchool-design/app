import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

console.log('🔍 DESCOBRINDO COLUNAS DAS TABELAS COM ERRO\n');

const tabelasComErro = [
  'alpha_desafios',
  'alpha_competencias', 
  'alpha_submissoes',
  'historia_periodos',
  'historia_movimentos_artisticos',
  'portfolios',
  'portfolio_evidencias'
];

for (const tabela of tabelasComErro) {
  console.log(`\n📊 ${tabela.toUpperCase()}`);
  console.log('═'.repeat(80));
  
  const { data, error } = await supabase
    .from(tabela)
    .select('*')
    .limit(1);
  
  if (data && data[0]) {
    console.log('✅ Colunas encontradas:');
    Object.keys(data[0]).sort().forEach(col => {
      const valor = data[0][col];
      const tipo = typeof valor;
      console.log(`  - ${col} (${tipo})`);
    });
  } else if (data && data.length === 0) {
    console.log('  ⚠️  Tabela vazia, buscando qualquer registro...');
    
    // Tentar pegar de outra forma
    const { data: anyData } = await supabase
      .from(tabela)
      .select('*')
      .limit(1)
      .maybeSingle();
      
    console.log('  (Não foi possível determinar colunas - tabela vazia)');
  } else {
    console.log(`  ❌ Erro: ${error?.message}`);
  }
  
  const { count } = await supabase
    .from(tabela)
    .select('*', { count: 'exact', head: true });
  
  console.log(`\n  📈 Total de registros: ${count ?? 0}`);
}

console.log('\n\n🎯 RESUMO EXECUTIVO DAS DESCOBERTAS:');
console.log('═'.repeat(80));

// Alpha Challenges
console.log('\n📌 ALPHA CHALLENGES:');
const { count: metodologias } = await supabase.from('alpha_metodologias').select('*', { count: 'exact', head: true });
const { count: desafios } = await supabase.from('alpha_desafios').select('*', { count: 'exact', head: true });
const { count: badges } = await supabase.from('alpha_badges').select('*', { count: 'exact', head: true });
const { count: competencias } = await supabase.from('alpha_competencias').select('*', { count: 'exact', head: true });
console.log(`  Metodologias: ${metodologias}`);
console.log(`  Desafios: ${desafios}`);
console.log(`  Badges: ${badges}`);
console.log(`  Competências: ${competencias}`);

// História
console.log('\n📌 HISTÓRIA DA MÚSICA:');
const { count: periodos } = await supabase.from('historia_periodos').select('*', { count: 'exact', head: true });
const { count: compositores } = await supabase.from('historia_compositores').select('*', { count: 'exact', head: true });
const { count: obras } = await supabase.from('historia_obras').select('*', { count: 'exact', head: true });
const { count: generos } = await supabase.from('historia_generos').select('*', { count: 'exact', head: true });
console.log(`  Períodos: ${periodos}`);
console.log(`  Compositores: ${compositores} ← JÁ POPULADO!`);
console.log(`  Obras: ${obras}`);
console.log(`  Gêneros: ${generos}`);

// Outros
console.log('\n📌 OUTROS SISTEMAS:');
const { count: instrumentos } = await supabase.from('instrumentos').select('*', { count: 'exact', head: true });
const { count: modulos } = await supabase.from('modulos').select('*', { count: 'exact', head: true });
const { count: portfolios } = await supabase.from('portfolios').select('*', { count: 'exact', head: true });
console.log(`  Instrumentos: ${instrumentos}`);
console.log(`  Módulos: ${modulos}`);
console.log(`  Portfólios: ${portfolios}`);

console.log('\n✅ Análise completa!\n');
