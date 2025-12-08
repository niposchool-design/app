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

console.log('🔍 DESCOBRINDO ESTRUTURA DE historia_periodos E alpha_submissoes\n');

// 1. historia_periodos
console.log('📊 HISTORIA_PERIODOS');
console.log('═'.repeat(80));

const { data: periodos, error: periodosError } = await supabase
  .from('historia_periodos')
  .select('*')
  .limit(1);

if (periodos && periodos[0]) {
  console.log('✅ Colunas encontradas:');
  Object.keys(periodos[0]).sort().forEach(col => {
    const valor = periodos[0][col];
    console.log(`  - ${col}: ${JSON.stringify(valor)}`);
  });
} else {
  console.log(`❌ Erro ou vazio: ${periodosError?.message || 'Sem dados'}`);
}

// 2. alpha_submissoes (vazia)
console.log('\n📊 ALPHA_SUBMISSOES');
console.log('═'.repeat(80));

// Tentar descobrir via error de insert
const { error: submissoesError } = await supabase
  .from('alpha_submissoes')
  .insert({});

console.log('Erro ao inserir (para descobrir colunas requeridas):');
console.log(`  ${submissoesError?.message || 'Sem erro'}`);
console.log(`  Detalhes: ${submissoesError?.details || 'N/A'}`);
console.log(`  Hint: ${submissoesError?.hint || 'N/A'}`);

// 3. Pegar sample de alpha_desafios para ver relação com metodologia
console.log('\n📊 ALPHA_DESAFIOS (sample para ver metodologia_id)');
console.log('═'.repeat(80));

const { data: desafios } = await supabase
  .from('alpha_desafios')
  .select('id, titulo, metodologia_id')
  .limit(3);

if (desafios) {
  console.log('Primeiros 3 desafios:');
  desafios.forEach(d => {
    console.log(`  - ${d.titulo}: metodologia_id = ${d.metodologia_id ?? 'NULL ⚠️'}`);
  });
}

// 4. Ver IDs das metodologias
console.log('\n📊 METODOLOGIAS (IDs disponíveis)');
console.log('═'.repeat(80));

const { data: metodologias } = await supabase
  .from('alpha_metodologias')
  .select('id, nome')
  .limit(9);

if (metodologias) {
  console.log('IDs de metodologias:');
  metodologias.forEach(m => {
    console.log(`  - ${m.id}: ${m.nome}`);
  });
}

console.log('\n✅ Análise completa!\n');
