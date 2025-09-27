// 🏠 TESTE LOCAL - Nipo School (Sem dependência do Supabase)
// Execute no CONSOLE DO NAVEGADOR (F12) na página http://localhost:3000

console.log('🏠 ======= TESTE LOCAL - NIPO SCHOOL =======');
console.log('📅 Data/Hora:', new Date().toLocaleString('pt-BR'));
console.log('💡 Testando sem depender do Supabase externo...\n');

// Dados estruturados como estariam no banco real
const bancoDadosLocal = {
  profiles: [
    // Professores
    {
      id: 'prof-001',
      email: 'joao.silva@niposchool.com',
      nome: 'João Silva',
      full_name: 'João Carlos Silva',
      tipo_usuario: 'professor',
      instrument: 'Piano',
      phone: '(11) 99999-1111',
      city: 'São Paulo',
      state: 'SP',
      bio: 'Professor de piano com 15 anos de experiência. Especialista em música clássica e popular.',
      avatar_url: null,
      last_active: '2025-09-25T14:30:00Z',
      joined_at: '2025-08-15T10:00:00Z',
      total_points: 850
    },
    {
      id: 'prof-002', 
      email: 'maria.santos@niposchool.com',
      nome: 'Maria Santos',
      full_name: 'Maria Fernanda Santos',
      tipo_usuario: 'professor',
      instrument: 'Violão',
      phone: '(21) 88888-2222',
      city: 'Rio de Janeiro',
      state: 'RJ',
      bio: 'Professora de violão e guitarra. Formada em música popular brasileira.',
      avatar_url: null,
      last_active: '2025-09-24T09:15:00Z',
      joined_at: '2025-08-01T08:30:00Z',
      total_points: 720
    },
    {
      id: 'prof-003',
      email: 'carlos.mendes@niposchool.com', 
      nome: 'Carlos Mendes',
      full_name: 'Carlos Eduardo Mendes',
      tipo_usuario: 'professor',
      instrument: 'Bateria',
      phone: '(85) 77777-3333',
      city: 'Fortaleza',
      state: 'CE',
      bio: 'Baterista profissional e professor. 20 anos de experiência em bandas e ensino.',
      avatar_url: null,
      last_active: '2025-09-20T16:45:00Z',
      joined_at: '2025-07-20T14:20:00Z',
      total_points: 950
    },
    
    // Alunos
    {
      id: 'aluno-001',
      email: 'ana.costa@email.com',
      nome: 'Ana Costa',
      full_name: 'Ana Paula Costa',
      tipo_usuario: 'aluno',
      instrument: 'Piano', 
      phone: '(11) 96666-4444',
      city: 'São Paulo',
      state: 'SP',
      bio: null,
      avatar_url: null,
      last_active: '2025-09-26T08:20:00Z',
      joined_at: '2025-09-10T11:15:00Z',
      total_points: 245,
      current_streak: 7,
      lessons_completed: 12,
      modules_completed: 2
    },
    {
      id: 'aluno-002',
      email: 'pedro.oliveira@gmail.com',
      nome: 'Pedro Oliveira',
      full_name: 'Pedro Henrique Oliveira',
      tipo_usuario: 'aluno',
      instrument: 'Guitarra',
      phone: '(11) 95555-5555', 
      city: 'São Paulo',
      state: 'SP',
      bio: 'Estudante iniciante, apaixonado por rock.',
      avatar_url: null,
      last_active: '2025-09-25T19:30:00Z',
      joined_at: '2025-09-05T16:40:00Z',
      total_points: 180,
      current_streak: 3,
      lessons_completed: 8,
      modules_completed: 1
    },
    {
      id: 'aluno-003',
      email: 'julia.ferreira@outlook.com',
      nome: 'Julia Ferreira',
      full_name: 'Julia Maria Ferreira',
      tipo_usuario: 'aluno',
      instrument: 'Violão',
      phone: null,
      city: 'Belo Horizonte',
      state: 'MG',
      bio: null,
      avatar_url: null,
      last_active: '2025-09-23T12:10:00Z',
      joined_at: '2025-08-28T09:25:00Z',
      total_points: 320,
      current_streak: 0,
      lessons_completed: 15,
      modules_completed: 3
    },
    {
      id: 'aluno-004',
      email: 'rodrigo.lima@email.com',
      nome: 'Rodrigo Lima',
      full_name: 'Rodrigo Augusto Lima',
      tipo_usuario: 'aluno',
      instrument: 'Bateria',
      phone: '(85) 94444-6666',
      city: 'Fortaleza', 
      state: 'CE',
      bio: 'Drummmer amador, quer aprender técnicas profissionais.',
      avatar_url: null,
      last_active: null, // Nunca acessou
      joined_at: '2025-09-22T13:50:00Z',
      total_points: 0,
      current_streak: 0,
      lessons_completed: 0,
      modules_completed: 0
    },
    {
      id: 'aluno-005',
      email: 'camila.rodrigues@gmail.com',
      nome: 'Camila Rodrigues',
      full_name: 'Camila Beatriz Rodrigues',
      tipo_usuario: 'aluno',
      instrument: 'Piano',
      phone: '(21) 93333-7777',
      city: 'Rio de Janeiro',
      state: 'RJ',
      bio: 'Já toco um pouco, quero me aperfeiçoar.',
      avatar_url: null,
      last_active: '2025-09-24T20:15:00Z',
      joined_at: '2025-09-12T15:30:00Z',
      total_points: 410,
      current_streak: 5,
      lessons_completed: 20,
      modules_completed: 4
    }
  ]
};

// Função para simular consulta ao banco
const consultarBancoDados = (filtros = {}) => {
  let dados = [...bancoDadosLocal.profiles];
  
  // Aplicar filtros
  if (filtros.tipo_usuario) {
    dados = dados.filter(user => user.tipo_usuario === filtros.tipo_usuario);
  }
  
  if (filtros.limit) {
    dados = dados.slice(0, filtros.limit);
  }
  
  return dados;
};

// Análise completa dos dados
const analisarDadosCompletos = () => {
  console.log('📊 ======= ANÁLISE COMPLETA DOS DADOS =======');
  
  const todosUsuarios = consultarBancoDados();
  const professores = consultarBancoDados({ tipo_usuario: 'professor' });
  const alunos = consultarBancoDados({ tipo_usuario: 'aluno' });
  
  console.log(`👥 Total de usuários: ${todosUsuarios.length}`);
  console.log(`👨‍🏫 Professores: ${professores.length}`);
  console.log(`🎓 Alunos: ${alunos.length}\n`);
  
  // ===== ANÁLISE DOS PROFESSORES =====
  if (professores.length > 0) {
    console.log('👨‍🏫 ======= DETALHES DOS PROFESSORES =======');
    professores.forEach((prof, index) => {
      const ultimoAcesso = prof.last_active ? 
        new Date(prof.last_active).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }) : 'Nunca acessou';
        
      const cadastro = new Date(prof.joined_at).toLocaleDateString('pt-BR');
      
      console.log(`${index + 1}. 👨‍🏫 ${prof.nome} (${prof.full_name})`);
      console.log(`   📧 Email: ${prof.email}`);
      console.log(`   🎵 Instrumento: ${prof.instrument}`);
      console.log(`   📱 Telefone: ${prof.phone}`);
      console.log(`   📍 Localização: ${prof.city}, ${prof.state}`);
      console.log(`   🏆 Pontuação: ${prof.total_points} pontos`);
      console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
      console.log(`   📅 Cadastrado em: ${cadastro}`);
      if (prof.bio) {
        console.log(`   📝 Bio: ${prof.bio}`);
      }
      console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
    console.log('');
    
    // Estatísticas dos professores
    const profAtivos = professores.filter(p => {
      if (!p.last_active) return false;
      const ultimoAcesso = new Date(p.last_active);
      const agora = new Date();
      const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
      return diasSemAcesso <= 7;
    }).length;
    
    const mediaPontosProfessores = Math.round(
      professores.reduce((sum, p) => sum + p.total_points, 0) / professores.length
    );
    
    console.log(`📊 ESTATÍSTICAS DOS PROFESSORES:`);
    console.log(`🟢 Ativos (últimos 7 dias): ${profAtivos}/${professores.length}`);
    console.log(`🏆 Pontuação média: ${mediaPontosProfessores} pontos`);
    console.log(`📱 Com telefone: ${professores.filter(p => p.phone).length}/${professores.length}`);
    console.log('');
  }
  
  // ===== ANÁLISE DOS ALUNOS =====
  if (alunos.length > 0) {
    console.log('🎓 ======= DETALHES DOS ALUNOS =======');
    alunos.forEach((aluno, index) => {
      const ultimoAcesso = aluno.last_active ? 
        new Date(aluno.last_active).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }) : 'Nunca acessou';
        
      const cadastro = new Date(aluno.joined_at).toLocaleDateString('pt-BR');
      
      console.log(`${index + 1}. 🎓 ${aluno.nome} (${aluno.full_name})`);
      console.log(`   📧 Email: ${aluno.email}`);
      console.log(`   🎵 Instrumento: ${aluno.instrument}`);
      console.log(`   📱 Telefone: ${aluno.phone || 'Não informado'}`);
      console.log(`   📍 Localização: ${aluno.city}, ${aluno.state}`);
      console.log(`   🏆 Pontuação: ${aluno.total_points} pontos`);
      console.log(`   🔥 Sequência: ${aluno.current_streak} dias`);
      console.log(`   📚 Aulas concluídas: ${aluno.lessons_completed}`);
      console.log(`   📖 Módulos concluídos: ${aluno.modules_completed}`);
      console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
      console.log(`   📅 Cadastrado em: ${cadastro}`);
      if (aluno.bio) {
        console.log(`   📝 Bio: ${aluno.bio}`);
      }
      console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
    console.log('');
    
    // Estatísticas dos alunos
    const alunosAtivos = alunos.filter(a => {
      if (!a.last_active) return false;
      const ultimoAcesso = new Date(a.last_active);
      const agora = new Date();
      const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
      return diasSemAcesso <= 3; // Alunos: 3 dias para ser considerado ativo
    }).length;
    
    const totalPontos = alunos.reduce((sum, a) => sum + a.total_points, 0);
    const totalAulas = alunos.reduce((sum, a) => sum + a.lessons_completed, 0);
    const totalModulos = alunos.reduce((sum, a) => sum + a.modules_completed, 0);
    const mediaSequencia = Math.round(
      alunos.reduce((sum, a) => sum + a.current_streak, 0) / alunos.length
    );
    
    console.log(`📊 ESTATÍSTICAS DOS ALUNOS:`);
    console.log(`🟢 Ativos (últimos 3 dias): ${alunosAtivos}/${alunos.length}`);
    console.log(`🏆 Total de pontos: ${totalPontos} pontos`);
    console.log(`📚 Total de aulas concluídas: ${totalAulas}`);
    console.log(`📖 Total de módulos concluídos: ${totalModulos}`);
    console.log(`🔥 Sequência média: ${mediaSequencia} dias`);
    console.log(`📱 Com telefone: ${alunos.filter(a => a.phone).length}/${alunos.length}`);
    console.log('');
  }
  
  // ===== ANÁLISE DE INSTRUMENTOS =====
  console.log('🎵 ======= ANÁLISE DE INSTRUMENTOS =======');
  const instrumentos = todosUsuarios.reduce((acc, user) => {
    if (user.instrument) {
      acc[user.instrument] = (acc[user.instrument] || 0) + 1;
    }
    return acc;
  }, {});
  
  const instrumentosOrdenados = Object.entries(instrumentos)
    .sort(([,a], [,b]) => b - a);
    
  instrumentosOrdenados.forEach(([instrumento, quantidade], index) => {
    const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎵';
    console.log(`${emoji} ${instrumento}: ${quantidade} pessoa(s)`);
  });
  
  // ===== ANÁLISE GEOGRÁFICA =====
  console.log('\n📍 ======= ANÁLISE GEOGRÁFICA =======');
  const estados = todosUsuarios.reduce((acc, user) => {
    if (user.state) {
      acc[user.state] = (acc[user.state] || 0) + 1;
    }
    return acc;
  }, {});
  
  Object.entries(estados)
    .sort(([,a], [,b]) => b - a)
    .forEach(([estado, quantidade]) => {
      console.log(`📍 ${estado}: ${quantidade} usuário(s)`);
    });
  
  // ===== RESUMO FINAL =====
  console.log('\n✅ ======= RESUMO FINAL =======');
  console.log(`👥 Total de usuários: ${todosUsuarios.length}`);
  console.log(`👨‍🏫 Professores: ${professores.length}`);
  console.log(`🎓 Alunos: ${alunos.length}`);
  console.log(`🎵 Instrumentos diferentes: ${Object.keys(instrumentos).length}`);
  console.log(`📍 Estados representados: ${Object.keys(estados).length}`);
  
  // Usuários mais ativos
  const maisAtivos = todosUsuarios
    .filter(u => u.last_active)
    .sort((a, b) => new Date(b.last_active) - new Date(a.last_active))
    .slice(0, 3);
    
  console.log('\n🏆 TOP 3 USUÁRIOS MAIS ATIVOS:');
  maisAtivos.forEach((user, index) => {
    const ultimoAcesso = new Date(user.last_active).toLocaleDateString('pt-BR');
    console.log(`${index + 1}. ${user.nome} (${user.tipo_usuario}) - ${ultimoAcesso}`);
  });
  
  return {
    resumo: {
      total: todosUsuarios.length,
      professores: professores.length,
      alunos: alunos.length,
      instrumentos: Object.keys(instrumentos).length,
      estados: Object.keys(estados).length
    },
    dados: {
      professores,
      alunos,
      todosUsuarios
    },
    estatisticas: {
      instrumentos,
      estados,
      maisAtivos
    }
  };
};

// Executar análise
console.log('🚀 Iniciando análise dos dados locais...');
const resultado = analisarDadosCompletos();

console.log('\n🎯 ======= DADOS SALVOS =======');
console.log('💾 Resultado completo salvo em: window.nipoSchoolData');
window.nipoSchoolData = resultado;

console.log('📊 Acesso rápido:');
console.log('• window.nipoSchoolData.resumo - Números gerais');
console.log('• window.nipoSchoolData.dados.professores - Lista de professores');
console.log('• window.nipoSchoolData.dados.alunos - Lista de alunos');
console.log('• window.nipoSchoolData.estatisticas - Análises detalhadas');

console.log('\n💡 PRÓXIMOS PASSOS:');
console.log('1. ✅ Estes dados simulam a estrutura real do seu banco');
console.log('2. 🔧 Quando o Supabase voltar, terá dados similares');
console.log('3. 📊 Use estes dados para testar as interfaces admin');
console.log('4. 🎯 Estrutura: profiles table com todos estes campos');