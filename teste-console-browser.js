// Script para executar no CONSOLE DO NAVEGADOR (F12)
// Copie e cole este código no console da página http://localhost:3000

console.log('🧪 ======= TESTE DE DADOS - NIPO SCHOOL =======');
console.log('📅 Data/Hora:', new Date().toLocaleString('pt-BR'));
console.log('🔗 Conectando com Supabase via navegador...\n');

// Função de teste que usa o Supabase do próprio app
const testarDadosNoBrowser = async () => {
  try {
    // Verificar se há acesso ao Supabase global
    if (typeof window === 'undefined') {
      console.error('❌ Este script deve ser executado no console do navegador!');
      return;
    }

    // Tentar acessar o Supabase do contexto do app
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js');
    
    const supabaseUrl = 'https://ywvjccrdvfzgrrqzlxha.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I';
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('🔍 TESTE 1: Verificando conexão...');
    
    const { data: usuarios, error } = await supabase
      .from('profiles')
      .select('id, email, nome, full_name, tipo_usuario, last_active, instrument, phone, city, state, joined_at');
    
    if (error) {
      console.error('❌ Erro ao buscar dados:', error);
      return;
    }
    
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`📊 Total de usuários encontrados: ${usuarios.length}\n`);
    
    // Análise por tipo
    const professores = usuarios.filter(u => u.tipo_usuario === 'professor');
    const alunos = usuarios.filter(u => u.tipo_usuario === 'aluno');
    const outros = usuarios.filter(u => !['professor', 'aluno'].includes(u.tipo_usuario));
    
    console.log('📈 RESUMO POR TIPO:');
    console.log(`👨‍🏫 Professores: ${professores.length}`);
    console.log(`🎓 Alunos: ${alunos.length}`);
    console.log(`❓ Outros: ${outros.length}\n`);
    
    // Detalhes dos Professores
    if (professores.length > 0) {
      console.log('👨‍🏫 ======= PROFESSORES =======');
      professores.forEach((prof, index) => {
        const nome = prof.nome || prof.full_name || 'Nome não informado';
        const ultimoAcesso = prof.last_active ? 
          new Date(prof.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. ${nome}`);
        console.log(`   📧 ${prof.email}`);
        console.log(`   🎵 Instrumento: ${prof.instrument || 'Não informado'}`);
        console.log(`   📱 Telefone: ${prof.phone || 'Não informado'}`);
        console.log(`   📍 ${prof.city || 'Cidade não informada'}, ${prof.state || 'Estado não informado'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastro: ${new Date(prof.joined_at).toLocaleDateString('pt-BR')}`);
        console.log('   ──────────────────────────────────────');
      });
      console.log('');
    }
    
    // Detalhes dos Alunos
    if (alunos.length > 0) {
      console.log('🎓 ======= ALUNOS =======');
      alunos.forEach((aluno, index) => {
        const nome = aluno.nome || aluno.full_name || 'Nome não informado';
        const ultimoAcesso = aluno.last_active ? 
          new Date(aluno.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. ${nome}`);
        console.log(`   📧 ${aluno.email}`);
        console.log(`   🎵 Instrumento: ${aluno.instrument || 'Não escolhido'}`);
        console.log(`   📱 Telefone: ${aluno.phone || 'Não informado'}`);
        console.log(`   📍 ${aluno.city || 'Cidade não informada'}, ${aluno.state || 'Estado não informado'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastro: ${new Date(aluno.joined_at).toLocaleDateString('pt-BR')}`);
        console.log('   ──────────────────────────────────────');
      });
      console.log('');
    }
    
    // Análise de Instrumentos
    console.log('🎵 ======= ANÁLISE DE INSTRUMENTOS =======');
    const instrumentos = usuarios.reduce((acc, user) => {
      if (user.instrument) {
        acc[user.instrument] = (acc[user.instrument] || 0) + 1;
      }
      return acc;
    }, {});
    
    if (Object.keys(instrumentos).length > 0) {
      console.log('🎼 Instrumentos populares:');
      Object.entries(instrumentos)
        .sort(([,a], [,b]) => b - a)
        .forEach(([instrumento, quantidade], index) => {
          console.log(`   ${index + 1}. ${instrumento}: ${quantidade} pessoa(s)`);
        });
    } else {
      console.log('❓ Nenhum instrumento foi informado pelos usuários');
    }
    
    // Estatísticas de Atividade
    console.log('\n📊 ======= ESTATÍSTICAS DE ATIVIDADE =======');
    const agora = new Date();
    
    const usuariosAtivos = usuarios.filter(u => {
      if (!u.last_active) return false;
      const ultimoAcesso = new Date(u.last_active);
      const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
      return diasSemAcesso <= 30;
    });
    
    const usuariosNovos = usuarios.filter(u => {
      if (!u.joined_at) return false;
      const cadastro = new Date(u.joined_at);
      const diasDesdeCadastro = (agora - cadastro) / (1000 * 60 * 60 * 24);
      return diasDesdeCadastro <= 7;
    });
    
    console.log(`🟢 Usuários ativos (últimos 30 dias): ${usuariosAtivos.length}/${usuarios.length}`);
    console.log(`🆕 Usuários novos (últimos 7 dias): ${usuariosNovos.length}/${usuarios.length}`);
    
    // Completude de Perfis
    console.log('\n📋 ======= COMPLETUDE DE PERFIS =======');
    const perfisCompletos = usuarios.filter(u => 
      u.nome && u.phone && u.instrument && u.city && u.state
    ).length;
    
    const percentualCompleto = usuarios.length > 0 ? 
      Math.round((perfisCompletos / usuarios.length) * 100) : 0;
    
    console.log(`📊 Perfis completos: ${perfisCompletos}/${usuarios.length} (${percentualCompleto}%)`);
    
    console.log('\n✅ ======= TESTE CONCLUÍDO =======');
    console.log('📋 Dados exibidos acima mostram o estado atual do banco de dados');
    console.log('🔄 Execute novamente este script para dados atualizados');
    
    // Retornar dados para análise
    return {
      total: usuarios.length,
      professores: professores.length,
      alunos: alunos.length,
      dadosCompletos: { professores, alunos, outros },
      instrumentos,
      estatisticas: {
        ativos: usuariosAtivos.length,
        novos: usuariosNovos.length,
        perfisCompletos: perfisCompletos
      }
    };
    
  } catch (error) {
    console.error('💥 ERRO GERAL:', error);
  }
};

// Executar o teste
console.log('🚀 Iniciando análise...');
testarDadosNoBrowser().then(resultado => {
  if (resultado) {
    console.log('\n🎯 Resultado salvo na variável:', resultado);
  }
});