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

console.log('🔍 DESCOBRINDO ESTRUTURA REAL DO BANCO DE DADOS\n');

// 1. Estrutura de historia_compositores
console.log('📊 TABELA: historia_compositores');
console.log('═'.repeat(80));

const { data: compositoresSchema } = await supabase
  .from('historia_compositores')
  .select('*')
  .limit(1);

if (compositoresSchema && compositoresSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(compositoresSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
} else {
  console.log('  Tabela vazia - consultando information_schema...');
}

// 2. Estrutura de instrumentos
console.log('\n📊 TABELA: instrumentos');
console.log('═'.repeat(80));

const { data: instrumentosSchema } = await supabase
  .from('instrumentos')
  .select('*')
  .limit(1);

if (instrumentosSchema && instrumentosSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(instrumentosSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
}

// 3. Estrutura de modulos
console.log('\n📊 TABELA: modulos');
console.log('═'.repeat(80));

const { data: modulosSchema } = await supabase
  .from('modulos')
  .select('*')
  .limit(1);

if (modulosSchema && modulosSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(modulosSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
}

// 4. Estrutura de portfolios
console.log('\n📊 TABELA: portfolios');
console.log('═'.repeat(80));

const { data: portfoliosSchema } = await supabase
  .from('portfolios')
  .select('*')
  .limit(1);

if (portfoliosSchema && portfoliosSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(portfoliosSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
}

// 5. Estrutura de portfolio_evidencias
console.log('\n📊 TABELA: portfolio_evidencias');
console.log('═'.repeat(80));

const { data: evidenciasSchema } = await supabase
  .from('portfolio_evidencias')
  .select('*')
  .limit(1);

if (evidenciasSchema && evidenciasSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(evidenciasSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
}

// 6. Testar se conquistas existe
console.log('\n📊 TABELA: conquistas (testando se existe)');
console.log('═'.repeat(80));

try {
  const { data: conquistasTest, error } = await supabase
    .from('conquistas')
    .select('*')
    .limit(1);
  
  if (error) {
    console.log(`  ❌ Tabela NÃO existe: ${error.message}`);
  } else {
    console.log('  ✅ Tabela existe!');
    if (conquistasTest && conquistasTest[0]) {
      console.log('Colunas encontradas:');
      Object.keys(conquistasTest[0]).forEach(col => {
        console.log(`  - ${col}`);
      });
    }
  }
} catch (e) {
  console.log(`  ❌ Erro ao acessar: ${e.message}`);
}

// 7. Buscar todas as tabelas alpha_badges (vimos que existe!)
console.log('\n📊 TABELA: alpha_badges');
console.log('═'.repeat(80));

const { data: badgesSchema } = await supabase
  .from('alpha_badges')
  .select('*')
  .limit(1);

if (badgesSchema && badgesSchema[0]) {
  console.log('Colunas encontradas:');
  Object.keys(badgesSchema[0]).forEach(col => {
    console.log(`  - ${col}`);
  });
}

console.log('\n✅ Análise de estrutura completa!\n');
