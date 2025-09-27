// Script para executar no CONSOLE DO NAVEGADOR (F12)
// Este script usa a conexão Supabase que já existe no projeto
// Execute na página http://localhost:3000

console.log('🧪 ======= TESTE DE DADOS - NIPO SCHOOL =======');
console.log('📅 Data/Hora:', new Date().toLocaleString('pt-BR'));
console.log('🔗 Usando conexão Supabase do projeto...\n');

// Função que testa usando a instância Supabase já configurada
const testarDadosComConexaoLocal = async () => {
  try {
    // Primeiro, vamos tentar acessar o supabase que já está no projeto
    // Vamos fazer uma requisição direta para a API REST do Supabase
    
    const supabaseUrl = 'https://ywvjccrdvfzgrrqzlxha.supabase.co/rest/v1';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I';
    
    console.log('🔍 Testando conexão direta com API REST...');
    
    const response = await fetch(`${supabaseUrl}/profiles?select=id,email,nome,full_name,tipo_usuario,last_active,instrument,phone,city,state,joined_at`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const usuarios = await response.json();
    
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
      console.log('👨‍🏫 ======= DETALHES DOS PROFESSORES =======');
      professores.forEach((prof, index) => {
        const nome = prof.nome || prof.full_name || 'Nome não informado';
        const ultimoAcesso = prof.last_active ? 
          new Date(prof.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. 👨‍🏫 ${nome}`);
        console.log(`   📧 Email: ${prof.email}`);
        console.log(`   🎵 Instrumento: ${prof.instrument || '❓ Não informado'}`);
        console.log(`   📱 Telefone: ${prof.phone || '❓ Não informado'}`);
        console.log(`   📍 Localização: ${prof.city || '❓'}, ${prof.state || '❓'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastrado em: ${prof.joined_at ? new Date(prof.joined_at).toLocaleDateString('pt-BR') : '❓'}`);
        console.log(`   🆔 ID: ${prof.id}`);
        console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });
      console.log('');
    } else {
      console.log('❌ Nenhum professor encontrado no banco de dados');
    }
    
    // Detalhes dos Alunos  
    if (alunos.length > 0) {
      console.log('🎓 ======= DETALHES DOS ALUNOS =======');
      alunos.forEach((aluno, index) => {
        const nome = aluno.nome || aluno.full_name || 'Nome não informado';
        const ultimoAcesso = aluno.last_active ? 
          new Date(aluno.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. 🎓 ${nome}`);
        console.log(`   📧 Email: ${aluno.email}`);
        console.log(`   🎵 Instrumento: ${aluno.instrument || '❓ Não escolhido'}`);
        console.log(`   📱 Telefone: ${aluno.phone || '❓ Não informado'}`);
        console.log(`   📍 Localização: ${aluno.city || '❓'}, ${aluno.state || '❓'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastrado em: ${aluno.joined_at ? new Date(aluno.joined_at).toLocaleDateString('pt-BR') : '❓'}`);
        console.log(`   🆔 ID: ${aluno.id}`);
        console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });
      console.log('');
    } else {
      console.log('❌ Nenhum aluno encontrado no banco de dados');
    }
    
    // Outros usuários
    if (outros.length > 0) {
      console.log('❓ ======= OUTROS USUÁRIOS =======');
      outros.forEach((user, index) => {
        const nome = user.nome || user.full_name || 'Nome não informado';
        console.log(`${index + 1}. ${nome} - Tipo: ${user.tipo_usuario || 'não definido'} (${user.email})`);
      });
      console.log('');
    }
    
    // Análise de Instrumentos
    console.log('🎵 ======= ANÁLISE DE INSTRUMENTOS =======');
    const instrumentos = usuarios.reduce((acc, user) => {
      if (user.instrument && user.instrument.trim() !== '') {
        const inst = user.instrument.trim();
        acc[inst] = (acc[inst] || 0) + 1;
      }
      return acc;
    }, {});
    
    if (Object.keys(instrumentos).length > 0) {
      console.log('🎼 Instrumentos informados pelos usuários:');
      const instrumentosOrdenados = Object.entries(instrumentos)
        .sort(([,a], [,b]) => b - a);
        
      instrumentosOrdenados.forEach(([instrumento, quantidade], index) => {
        const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎵';
        console.log(`   ${emoji} ${instrumento}: ${quantidade} pessoa(s)`);
      });
    } else {
      console.log('❓ Nenhum usuário informou seu instrumento ainda');
    }
    
    // Estatísticas de Atividade
    console.log('\n📊 ======= ESTATÍSTICAS DE ATIVIDADE =======');
    const agora = new Date();
    
    let ativosUltimos7dias = 0;
    let ativosUltimos30dias = 0;
    let nuncaAcessaram = 0;
    
    usuarios.forEach(user => {
      if (!user.last_active) {
        nuncaAcessaram++;
        return;
      }
      
      const ultimoAcesso = new Date(user.last_active);
      const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
      
      if (diasSemAcesso <= 7) ativosUltimos7dias++;
      if (diasSemAcesso <= 30) ativosUltimos30dias++;
    });
    
    console.log(`🟢 Ativos (últimos 7 dias): ${ativosUltimos7dias}/${usuarios.length}`);
    console.log(`🟡 Ativos (últimos 30 dias): ${ativosUltimos30dias}/${usuarios.length}`);
    console.log(`🔴 Nunca acessaram: ${nuncaAcessaram}/${usuarios.length}`);
    
    // Usuários novos
    const usuariosNovos = usuarios.filter(u => {
      if (!u.joined_at) return false;
      const cadastro = new Date(u.joined_at);
      const diasDesdeCadastro = (agora - cadastro) / (1000 * 60 * 60 * 24);
      return diasDesdeCadastro <= 7;
    }).length;
    
    console.log(`🆕 Novos usuários (últimos 7 dias): ${usuariosNovos}/${usuarios.length}`);
    
    // Completude de Perfis
    console.log('\n📋 ======= COMPLETUDE DE PERFIS =======');
    
    let perfisCompletos = 0;
    let perfisComNome = 0;
    let perfisComTelefone = 0;
    let perfisComInstrumento = 0;
    let perfisComLocalizacao = 0;
    
    usuarios.forEach(user => {
      if (user.nome || user.full_name) perfisComNome++;
      if (user.phone) perfisComTelefone++;
      if (user.instrument) perfisComInstrumento++;
      if (user.city && user.state) perfisComLocalizacao++;
      
      if ((user.nome || user.full_name) && user.phone && user.instrument && user.city && user.state) {
        perfisCompletos++;
      }
    });
    
    const percentualCompleto = usuarios.length > 0 ? Math.round((perfisCompletos / usuarios.length) * 100) : 0;
    const percentualNome = usuarios.length > 0 ? Math.round((perfisComNome / usuarios.length) * 100) : 0;
    const percentualTelefone = usuarios.length > 0 ? Math.round((perfisComTelefone / usuarios.length) * 100) : 0;
    const percentualInstrumento = usuarios.length > 0 ? Math.round((perfisComInstrumento / usuarios.length) * 100) : 0;
    const percentualLocalizacao = usuarios.length > 0 ? Math.round((perfisComLocalizacao / usuarios.length) * 100) : 0;
    
    console.log(`📊 Perfis 100% completos: ${perfisCompletos}/${usuarios.length} (${percentualCompleto}%)`);
    console.log(`👤 Com nome: ${perfisComNome}/${usuarios.length} (${percentualNome}%)`);
    console.log(`📱 Com telefone: ${perfisComTelefone}/${usuarios.length} (${percentualTelefone}%)`);
    console.log(`🎵 Com instrumento: ${perfisComInstrumento}/${usuarios.length} (${percentualInstrumento}%)`);
    console.log(`📍 Com localização: ${perfisComLocalizacao}/${usuarios.length} (${percentualLocalizacao}%)`);
    
    console.log('\n✅ ======= TESTE CONCLUÍDO COM SUCESSO! =======');
    console.log('📊 Todos os dados foram extraídos diretamente do banco Supabase');
    console.log('🔄 Execute este script novamente para dados atualizados');
    console.log('💾 Os dados completos estão disponíveis na variável retornada');
    
    // Retornar dados estruturados
    return {
      resumo: {
        total: usuarios.length,
        professores: professores.length,
        alunos: alunos.length,
        outros: outros.length
      },
      dados: {
        professores,
        alunos,
        outros
      },
      instrumentos,
      atividade: {
        ativosUltimos7dias,
        ativosUltimos30dias,
        nuncaAcessaram,
        usuariosNovos
      },
      completude: {
        perfisCompletos,
        percentualCompleto,
        comNome: perfisComNome,
        comTelefone: perfisComTelefone,
        comInstrumento: perfisComInstrumento,
        comLocalizacao: perfisComLocalizacao
      }
    };
    
  } catch (error) {
    console.error('💥 ERRO ao acessar o banco de dados:');
    console.error('🔍 Detalhes do erro:', error);
    console.error('📋 Possíveis causas:');
    console.error('   - Problema de conectividade com o Supabase');
    console.error('   - Chave de API incorreta ou expirada');
    console.error('   - Tabela "profiles" não existe ou sem permissão');
    console.error('   - Configuração de CORS do Supabase');
    
    return null;
  }
};

// Executar o teste
console.log('🚀 Iniciando análise dos dados...');
testarDadosComConexaoLocal().then(resultado => {
  if (resultado) {
    console.log('\n🎯 ======= DADOS SALVOS EM VARIÁVEL =======');
    console.log('📊 Acesse os dados completos com: resultado');
    console.log('👥 Professores: resultado.dados.professores');
    console.log('🎓 Alunos: resultado.dados.alunos');
    console.log('📈 Estatísticas: resultado.resumo');
    
    // Disponibilizar globalmente
    window.dadosTeste = resultado;
    console.log('🌐 Dados também disponíveis em: window.dadosTeste');
  } else {
    console.log('❌ Teste falhou - verifique os erros acima');
  }
}).catch(error => {
  console.error('💥 ERRO GERAL:', error);
});