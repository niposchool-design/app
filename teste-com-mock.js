// Script ALTERNATIVO - Simula dados se não conseguir conectar
// Execute no CONSOLE DO NAVEGADOR (F12) na página http://localhost:3000

console.log('🧪 ======= TESTE COM DADOS SIMULADOS =======');

// Dados de exemplo para simular o banco (caso não consiga conectar)
const dadosSimulados = {
  professores: [
    {
      id: '1',
      email: 'professor1@exemplo.com',
      nome: 'João Silva',
      tipo_usuario: 'professor',
      instrument: 'Piano',
      phone: '(11) 99999-1111',
      city: 'São Paulo',
      state: 'SP',
      last_active: '2025-09-25T10:00:00Z',
      joined_at: '2025-09-01T10:00:00Z'
    },
    {
      id: '2',
      email: 'maria.prof@exemplo.com',
      nome: 'Maria Santos',
      tipo_usuario: 'professor',
      instrument: 'Violão',
      phone: '(21) 88888-2222',
      city: 'Rio de Janeiro',
      state: 'RJ',
      last_active: '2025-09-20T15:30:00Z',
      joined_at: '2025-08-15T08:00:00Z'
    }
  ],
  alunos: [
    {
      id: '3',
      email: 'aluno1@exemplo.com',
      nome: 'Pedro Oliveira',
      tipo_usuario: 'aluno',
      instrument: 'Guitarra',
      phone: '(11) 77777-3333',
      city: 'São Paulo',
      state: 'SP',
      last_active: '2025-09-26T09:00:00Z',
      joined_at: '2025-09-10T14:00:00Z'
    },
    {
      id: '4',
      email: 'ana.aluna@exemplo.com',
      nome: 'Ana Costa',
      tipo_usuario: 'aluno',
      instrument: 'Piano',
      phone: null,
      city: 'Belo Horizonte',
      state: 'MG',
      last_active: '2025-09-24T16:45:00Z',
      joined_at: '2025-08-20T11:30:00Z'
    },
    {
      id: '5',
      email: 'carlos@exemplo.com',
      nome: 'Carlos Mendes',
      tipo_usuario: 'aluno',
      instrument: 'Bateria',
      phone: '(85) 66666-5555',
      city: 'Fortaleza',
      state: 'CE',
      last_active: null,
      joined_at: '2025-09-22T13:15:00Z'
    }
  ]
};

const analisarDados = (dados) => {
  const { professores, alunos } = dados;
  const todosUsuarios = [...professores, ...alunos];
  
  console.log('📊 ======= ANÁLISE DOS DADOS =======');
  console.log(`👥 Total de usuários: ${todosUsuarios.length}`);
  console.log(`👨‍🏫 Professores: ${professores.length}`);
  console.log(`🎓 Alunos: ${alunos.length}\n`);
  
  // Detalhes dos professores
  if (professores.length > 0) {
    console.log('👨‍🏫 ======= PROFESSORES =======');
    professores.forEach((prof, index) => {
      const ultimoAcesso = prof.last_active ? 
        new Date(prof.last_active).toLocaleDateString('pt-BR') : 
        'Nunca acessou';
        
      console.log(`${index + 1}. ${prof.nome}`);
      console.log(`   📧 ${prof.email}`);
      console.log(`   🎵 ${prof.instrument || 'Não informado'}`);
      console.log(`   📱 ${prof.phone || 'Não informado'}`);
      console.log(`   📍 ${prof.city || '?'}, ${prof.state || '?'}`);
      console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
      console.log(`   📅 Cadastrado: ${new Date(prof.joined_at).toLocaleDateString('pt-BR')}`);
      console.log('   ──────────────────────────────────');
    });
    console.log('');
  }
  
  // Detalhes dos alunos
  if (alunos.length > 0) {
    console.log('🎓 ======= ALUNOS =======');
    alunos.forEach((aluno, index) => {
      const ultimoAcesso = aluno.last_active ? 
        new Date(aluno.last_active).toLocaleDateString('pt-BR') : 
        'Nunca acessou';
        
      console.log(`${index + 1}. ${aluno.nome}`);
      console.log(`   📧 ${aluno.email}`);
      console.log(`   🎵 ${aluno.instrument || 'Não escolhido'}`);
      console.log(`   📱 ${aluno.phone || 'Não informado'}`);
      console.log(`   📍 ${aluno.city || '?'}, ${aluno.state || '?'}`);
      console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
      console.log(`   📅 Cadastrado: ${new Date(aluno.joined_at).toLocaleDateString('pt-BR')}`);
      console.log('   ──────────────────────────────────');
    });
    console.log('');
  }
  
  // Análise de instrumentos
  const instrumentos = todosUsuarios.reduce((acc, user) => {
    if (user.instrument) {
      acc[user.instrument] = (acc[user.instrument] || 0) + 1;
    }
    return acc;
  }, {});
  
  console.log('🎵 ======= INSTRUMENTOS =======');
  Object.entries(instrumentos)
    .sort(([,a], [,b]) => b - a)
    .forEach(([instrumento, quantidade], index) => {
      const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎵';
      console.log(`${emoji} ${instrumento}: ${quantidade} pessoa(s)`);
    });
  
  // Estatísticas de atividade
  console.log('\n📊 ======= ATIVIDADE =======');
  const agora = new Date();
  let ativosRecentes = 0;
  let nuncaAcessaram = 0;
  
  todosUsuarios.forEach(user => {
    if (!user.last_active) {
      nuncaAcessaram++;
    } else {
      const ultimoAcesso = new Date(user.last_active);
      const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
      if (diasSemAcesso <= 7) ativosRecentes++;
    }
  });
  
  console.log(`🟢 Ativos (últimos 7 dias): ${ativosRecentes}/${todosUsuarios.length}`);
  console.log(`🔴 Nunca acessaram: ${nuncaAcessaram}/${todosUsuarios.length}`);
  
  // Completude de perfis
  console.log('\n📋 ======= COMPLETUDE =======');
  const perfisCompletos = todosUsuarios.filter(u => 
    u.nome && u.phone && u.instrument && u.city && u.state
  ).length;
  
  const percentual = Math.round((perfisCompletos / todosUsuarios.length) * 100);
  console.log(`📊 Perfis completos: ${perfisCompletos}/${todosUsuarios.length} (${percentual}%)`);
  
  return dados;
};

// Função principal que tenta conectar, senão usa dados simulados
const executarTeste = async () => {
  console.log('🔄 Tentando conectar com banco real...');
  
  try {
    // Tentar conexão real primeiro
    const response = await fetch('https://ywvjccrdvfzgrrqzlxha.supabase.co/rest/v1/profiles?select=id,email,nome,tipo_usuario,instrument,phone,city,state,last_active,joined_at', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I'
      }
    });
    
    if (response.ok) {
      const usuarios = await response.json();
      console.log('✅ DADOS REAIS DO BANCO CARREGADOS!');
      console.log(`📊 ${usuarios.length} usuários encontrados\n`);
      
      const professores = usuarios.filter(u => u.tipo_usuario === 'professor');
      const alunos = usuarios.filter(u => u.tipo_usuario === 'aluno');
      
      return analisarDados({ professores, alunos });
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Falha na conexão:', error.message);
    console.log('🔄 Usando dados simulados para demonstração...\n');
    
    console.log('⚠️  ATENÇÃO: Estes são dados de EXEMPLO');
    console.log('📝 Para ver dados reais, resolva a conexão com Supabase\n');
    
    return analisarDados(dadosSimulados);
  }
};

// Executar teste
executarTeste().then(resultado => {
  console.log('\n✅ ======= TESTE CONCLUÍDO =======');
  console.log('💾 Dados salvos em: window.dadosNipoSchool');
  window.dadosNipoSchool = resultado;
});