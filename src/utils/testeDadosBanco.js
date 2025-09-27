// testeDadosBanco.js - Script para testar dados de professores e alunos
import { supabase } from '../shared/lib/supabase/supabaseClient';

export const testarDadosProfessoresEAlunos = async () => {
  console.log('🧪 ======= TESTE COMPLETO DE DADOS DO BANCO =======');
  console.log('Data/Hora:', new Date().toLocaleString('pt-BR'));
  
  try {
    // ===== TESTE 1: CONEXÃO BÁSICA =====
    console.log('\n🔍 TESTE 1: Verificando conexão...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error('❌ Erro de conexão:', connectionError);
      return;
    }
    console.log('✅ Conexão OK');

    // ===== TESTE 2: TODOS OS USUÁRIOS =====
    console.log('\n👥 TESTE 2: Verificando todos os usuários...');
    const { data: allUsers, error: allUsersError } = await supabase
      .from('profiles')
      .select('id, email, nome, full_name, tipo_usuario, joined_at, last_active')
      .order('joined_at', { ascending: false });

    if (allUsersError) {
      console.error('❌ Erro ao buscar usuários:', allUsersError);
    } else {
      console.log(`📊 Total de usuários: ${allUsers.length}`);
      
      // Contar por tipo
      const tipoContagem = allUsers.reduce((acc, user) => {
        acc[user.tipo_usuario] = (acc[user.tipo_usuario] || 0) + 1;
        return acc;
      }, {});
      console.log('📈 Por tipo:', tipoContagem);
      
      // Mostrar alguns exemplos
      console.log('\n📋 Primeiros 5 usuários:');
      allUsers.slice(0, 5).forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.nome || user.full_name || 'Sem nome'} (${user.tipo_usuario}) - ${user.email}`);
      });
    }

    // ===== TESTE 3: PROFESSORES DETALHADOS =====
    console.log('\n👨‍🏫 TESTE 3: Dados específicos dos PROFESSORES...');
    const { data: professores, error: profError } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        nome,
        full_name,
        instrument,
        phone,
        city,
        state,
        bio,
        avatar_url,
        last_active,
        joined_at,
        tipo_usuario,
        total_points
      `)
      .eq('tipo_usuario', 'professor')
      .order('joined_at', { ascending: false });

    if (profError) {
      console.error('❌ Erro ao buscar professores:', profError);
    } else {
      console.log(`👨‍🏫 Total de professores: ${professores.length}`);
      
      if (professores.length > 0) {
        console.log('\n📊 ESTATÍSTICAS DOS PROFESSORES:');
        
        // Status de atividade
        const agora = new Date();
        const statusCount = { ativo: 0, moderado: 0, inativo: 0, nunca_ativo: 0 };
        
        professores.forEach(prof => {
          if (!prof.last_active) {
            statusCount.nunca_ativo++;
          } else {
            const ultimoAcesso = new Date(prof.last_active);
            const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
            
            if (diasSemAcesso <= 7) statusCount.ativo++;
            else if (diasSemAcesso <= 30) statusCount.moderado++;
            else statusCount.inativo++;
          }
        });
        
        console.log('🟢 Status de atividade:', statusCount);
        
        // Instrumentos
        const instrumentos = professores.reduce((acc, prof) => {
          const inst = prof.instrument || 'Não especificado';
          acc[inst] = (acc[inst] || 0) + 1;
          return acc;
        }, {});
        console.log('🎵 Por instrumento:', instrumentos);
        
        // Completude dos perfis
        const completos = professores.filter(p => p.nome && p.instrument && p.bio && p.phone).length;
        console.log(`📋 Perfis completos: ${completos}/${professores.length} (${Math.round(completos/professores.length*100)}%)`);
        
        console.log('\n👨‍🏫 DETALHES DOS PROFESSORES:');
        professores.forEach((prof, index) => {
          const ultimoAcesso = prof.last_active ? 
            `Último acesso: ${new Date(prof.last_active).toLocaleDateString('pt-BR')}` : 
            'Nunca acessou';
          
          console.log(`  ${index + 1}. ${prof.nome || prof.full_name || 'Sem nome'}`);
          console.log(`     📧 ${prof.email}`);
          console.log(`     🎵 ${prof.instrument || 'Instrumento não informado'}`);
          console.log(`     📱 ${prof.phone || 'Telefone não informado'}`);
          console.log(`     📍 ${prof.city && prof.state ? `${prof.city}, ${prof.state}` : 'Localização não informada'}`);
          console.log(`     🕐 ${ultimoAcesso}`);
          console.log(`     📝 Bio: ${prof.bio ? prof.bio.substring(0, 50) + '...' : 'Sem biografia'}`);
          console.log('');
        });
      }
    }

    // ===== TESTE 4: ALUNOS DETALHADOS =====
    console.log('\n🎓 TESTE 4: Dados específicos dos ALUNOS...');
    const { data: alunos, error: alunosError } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        nome,
        full_name,
        instrument,
        phone,
        city,
        state,
        bio,
        avatar_url,
        last_active,
        joined_at,
        tipo_usuario,
        total_points,
        current_streak,
        lessons_completed,
        modules_completed
      `)
      .eq('tipo_usuario', 'aluno')
      .order('joined_at', { ascending: false });

    if (alunosError) {
      console.error('❌ Erro ao buscar alunos:', alunosError);
    } else {
      console.log(`🎓 Total de alunos: ${alunos.length}`);
      
      if (alunos.length > 0) {
        console.log('\n📊 ESTATÍSTICAS DOS ALUNOS:');
        
        // Status de atividade
        const alunoStatusCount = { ativo: 0, moderado: 0, inativo: 0, nunca_ativo: 0 };
        
        alunos.forEach(aluno => {
          if (!aluno.last_active) {
            alunoStatusCount.nunca_ativo++;
          } else {
            const ultimoAcesso = new Date(aluno.last_active);
            const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
            
            if (diasSemAcesso <= 3) alunoStatusCount.ativo++;
            else if (diasSemAcesso <= 14) alunoStatusCount.moderado++;
            else alunoStatusCount.inativo++;
          }
        });
        
        console.log('🟢 Status de atividade:', alunoStatusCount);
        
        // Instrumentos preferidos
        const instrumentosAlunos = alunos.reduce((acc, aluno) => {
          const inst = aluno.instrument || 'Não especificado';
          acc[inst] = (acc[inst] || 0) + 1;
          return acc;
        }, {});
        console.log('🎵 Instrumentos preferidos:', instrumentosAlunos);
        
        // Pontuação e progresso
        const totalPontos = alunos.reduce((sum, a) => sum + (a.total_points || 0), 0);
        const mediaPontos = alunos.length ? Math.round(totalPontos / alunos.length) : 0;
        const totalAulas = alunos.reduce((sum, a) => sum + (a.lessons_completed || 0), 0);
        const totalModulos = alunos.reduce((sum, a) => sum + (a.modules_completed || 0), 0);
        
        console.log(`🏆 Pontuação média: ${mediaPontos} pontos`);
        console.log(`📚 Total de aulas concluídas: ${totalAulas}`);
        console.log(`📖 Total de módulos concluídos: ${totalModulos}`);
        
        console.log('\n🎓 DETALHES DOS ALUNOS:');
        alunos.forEach((aluno, index) => {
          const ultimoAcesso = aluno.last_active ? 
            `Último acesso: ${new Date(aluno.last_active).toLocaleDateString('pt-BR')}` : 
            'Nunca acessou';
          
          console.log(`  ${index + 1}. ${aluno.nome || aluno.full_name || 'Sem nome'}`);
          console.log(`     📧 ${aluno.email}`);
          console.log(`     🎵 ${aluno.instrument || 'Instrumento não escolhido'}`);
          console.log(`     📱 ${aluno.phone || 'Telefone não informado'}`);
          console.log(`     📍 ${aluno.city && aluno.state ? `${aluno.city}, ${aluno.state}` : 'Localização não informada'}`);
          console.log(`     🏆 ${aluno.total_points || 0} pontos | 🔥 ${aluno.current_streak || 0} sequência`);
          console.log(`     📚 ${aluno.lessons_completed || 0} aulas | 📖 ${aluno.modules_completed || 0} módulos`);
          console.log(`     🕐 ${ultimoAcesso}`);
          console.log('');
        });
      }
    }

    // ===== TESTE 5: TABELAS COMPLEMENTARES =====
    console.log('\n🗃️ TESTE 5: Verificando tabelas complementares...');
    
    const tabelasParaTeste = ['professores', 'turmas', 'aulas', 'modulos'];
    
    for (const tabela of tabelasParaTeste) {
      try {
        const { count, error } = await supabase
          .from(tabela)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❓ Tabela '${tabela}': Não encontrada ou sem acesso`);
        } else {
          console.log(`✅ Tabela '${tabela}': ${count} registros`);
        }
      } catch (err) {
        console.log(`❓ Tabela '${tabela}': Erro - ${err.message}`);
      }
    }

    console.log('\n✅ ======= TESTE CONCLUÍDO =======');
    return {
      totalUsuarios: allUsers?.length || 0,
      totalProfessores: professores?.length || 0,
      totalAlunos: alunos?.length || 0,
      dadosCompletos: { professores, alunos }
    };

  } catch (error) {
    console.error('💥 ERRO GERAL NO TESTE:', error);
    return null;
  }
};

// Função para ser executada no console do browser
export const executarTeste = () => {
  console.log('🚀 Iniciando teste de dados...');
  return testarDadosProfessoresEAlunos();
};