import { supabase } from './src/lib/supabase/index.js';

console.log('🔍 Verificando tabelas de História da Música...\n');

const tabelasHistoria = [
  'historia_periodos',
  'historia_compositores', 
  'historia_obras',
  'historia_generos',
  'historia_movimentos',
  'historia_instrumentos_evolucao',
  'historia_conceitos_teoricos',
  'historia_eventos_timeline',
  'historia_progresso_usuario',
  'historia_quiz'
];

for (const tabela of tabelasHistoria) {
  const { data, error, count } = await supabase
    .from(tabela)
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.log(`❌ ${tabela}: NÃO EXISTE`);
    console.log(`   Erro: ${error.message}\n`);
  } else {
    console.log(`✅ ${tabela}: existe (${count || 0} registros)`);
  }
}

console.log('\n✅ Verificação completa!');
process.exit(0);
