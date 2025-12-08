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

console.log('🔍 VERIFICANDO TABELAS VAZIAS\n');

const tabelasParaVerificar = [
  'historia_compositores',
  'modulos', 
  'portfolios',
  'portfolio_evidencias'
];

for (const tabela of tabelasParaVerificar) {
  console.log(`\n📊 ${tabela.toUpperCase()}`);
  console.log('═'.repeat(80));
  
  // Tentar query direta
  const { data: sample, error: selectError } = await supabase
    .from(tabela)
    .select('*')
    .limit(1);
  
  if (sample && sample[0]) {
    console.log('Colunas encontradas (tabela com dados):');
    Object.keys(sample[0]).forEach(col => {
      console.log(`  - ${col}`);
    });
  } else if (sample && sample.length === 0) {
    console.log('  ⚠️  Tabela existe mas está VAZIA');
    
    // Tentar insert com objeto vazio para descobrir colunas requeridas
    const { error } = await supabase
      .from(tabela)
      .insert({})
      .select();
    
    if (error) {
      console.log(`  Mensagem de erro: ${error.message}`);
      console.log(`  Detalhes: ${error.details || 'N/A'}`);
      console.log(`  Hint: ${error.hint || 'N/A'}`);
    }
  } else {
    console.log(`  ❌ Não foi possível acessar: ${selectError?.message || 'Erro desconhecido'}`);
  }
  
  // Contar registros
  const { count } = await supabase
    .from(tabela)
    .select('*', { count: 'exact', head: true });
  
  console.log(`  Total de registros: ${count ?? 0}`);
}

console.log('\n✅ Verificação completa!\n');
