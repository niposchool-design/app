// Script simples para testar dados - CommonJS
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://ywvjccrdvfzgrrqzlxha.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testarDadosSimples() {
  console.log('🧪 TESTE SIMPLES - DADOS DO NIPO SCHOOL');
  console.log('==========================================\n');
  
  try {
    console.log('🔄 Conectando com o banco...');
    
    const { data: usuarios, error } = await supabase
      .from('profiles')
      .select('id, email, nome, full_name, tipo_usuario, last_active');
    
    if (error) {
      console.error('❌ ERRO:', error.message);
      return;
    }
    
    console.log('✅ Conexão OK!\n');
    console.log(`📊 TOTAL DE USUÁRIOS: ${usuarios.length}\n`);
    
    // Contar professores
    const professores = usuarios.filter(u => u.tipo_usuario === 'professor');
    console.log(`👨‍🏫 PROFESSORES: ${professores.length}`);
    professores.forEach((prof, i) => {
      console.log(`   ${i+1}. ${prof.nome || prof.full_name || 'Sem nome'} (${prof.email})`);
    });
    
    // Contar alunos
    const alunos = usuarios.filter(u => u.tipo_usuario === 'aluno');
    console.log(`\n🎓 ALUNOS: ${alunos.length}`);
    alunos.forEach((aluno, i) => {
      console.log(`   ${i+1}. ${aluno.nome || aluno.full_name || 'Sem nome'} (${aluno.email})`);
    });
    
    // Outros tipos
    const outros = usuarios.filter(u => !['professor', 'aluno'].includes(u.tipo_usuario));
    if (outros.length > 0) {
      console.log(`\n❓ OUTROS TIPOS: ${outros.length}`);
      outros.forEach((user, i) => {
        console.log(`   ${i+1}. ${user.nome || user.full_name || 'Sem nome'} - Tipo: ${user.tipo_usuario || 'não definido'}`);
      });
    }
    
    console.log('\n✅ Teste concluído!');
    
  } catch (error) {
    console.error('💥 ERRO:', error.message);
  }
}

testarDadosSimples();