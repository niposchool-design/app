#!/usr/bin/env node

// Script para testar dados do Supabase diretamente no terminal
// Execute com: node testar-dados.js

import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase (usando as mesmas variáveis do projeto)
const supabaseUrl = 'https://ywvjccrdvfzgrrqzlxha.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dmpjY3JkdmZ6Z3JycXpseGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTcwNzcsImV4cCI6MjA0MTQ5MzA3N30.iRNWIoKQ4bOm7_FZ93w7HWAhVwGrABR8CpWoSz3Qx_I';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🧪 ======= TESTE DE DADOS - NIPO SCHOOL =======');
console.log(`📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}`);
console.log('🔗 Conectando com Supabase...\n');

async function testarDados() {
  try {
    // ===== TESTE 1: CONEXÃO =====
    console.log('🔍 TESTE 1: Verificando conexão...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error('❌ Erro de conexão:', connectionError.message);
      return;
    }
    console.log('✅ Conexão com Supabase estabelecida com sucesso!\n');

    // ===== TESTE 2: TODOS OS USUÁRIOS =====
    console.log('👥 TESTE 2: Buscando todos os usuários...');
    const { data: allUsers, error: allUsersError } = await supabase
      .from('profiles')
      .select('id, email, nome, full_name, tipo_usuario, joined_at, last_active, instrument, phone, city, state')
      .order('joined_at', { ascending: false });

    if (allUsersError) {
      console.error('❌ Erro ao buscar usuários:', allUsersError.message);
      return;
    }

    console.log(`📊 Total de usuários encontrados: ${allUsers.length}`);
    
    // Contar por tipo
    const tipoContagem = allUsers.reduce((acc, user) => {
      const tipo = user.tipo_usuario || 'não_definido';
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📈 Contagem por tipo:');
    Object.entries(tipoContagem).forEach(([tipo, quantidade]) => {
      console.log(`   ${tipo}: ${quantidade} usuário(s)`);
    });
    console.log('');

    // ===== TESTE 3: PROFESSORES =====
    console.log('👨‍🏫 TESTE 3: Analisando PROFESSORES...');
    const professores = allUsers.filter(user => user.tipo_usuario === 'professor');
    console.log(`📊 Total de professores: ${professores.length}`);

    if (professores.length > 0) {
      console.log('\n📋 LISTA DE PROFESSORES:');
      console.log('═══════════════════════════════════════════════════════════');
      
      professores.forEach((prof, index) => {
        const nome = prof.nome || prof.full_name || 'Nome não informado';
        const ultimoAcesso = prof.last_active ? 
          new Date(prof.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. ${nome}`);
        console.log(`   📧 Email: ${prof.email}`);
        console.log(`   🎵 Instrumento: ${prof.instrument || 'Não informado'}`);
        console.log(`   📱 Telefone: ${prof.phone || 'Não informado'}`);
        console.log(`   📍 Local: ${prof.city && prof.state ? `${prof.city}, ${prof.state}` : 'Não informado'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastrado em: ${new Date(prof.joined_at).toLocaleDateString('pt-BR')}`);
        console.log('   ───────────────────────────────────────────────────────');
      });

      // Estatísticas dos professores
      console.log('\n📊 ESTATÍSTICAS DOS PROFESSORES:');
      const profAtivos = professores.filter(p => {
        if (!p.last_active) return false;
        const ultimoAcesso = new Date(p.last_active);
        const agora = new Date();
        const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
        return diasSemAcesso <= 30;
      }).length;

      const profComInstrumento = professores.filter(p => p.instrument).length;
      const profComTelefone = professores.filter(p => p.phone).length;

      console.log(`🟢 Ativos (acessaram nos últimos 30 dias): ${profAtivos}`);
      console.log(`🎵 Com instrumento informado: ${profComInstrumento}`);
      console.log(`📱 Com telefone informado: ${profComTelefone}`);
    }

    // ===== TESTE 4: ALUNOS =====
    console.log('\n🎓 TESTE 4: Analisando ALUNOS...');
    const alunos = allUsers.filter(user => user.tipo_usuario === 'aluno');
    console.log(`📊 Total de alunos: ${alunos.length}`);

    if (alunos.length > 0) {
      console.log('\n📋 LISTA DE ALUNOS:');
      console.log('═══════════════════════════════════════════════════════════');
      
      alunos.forEach((aluno, index) => {
        const nome = aluno.nome || aluno.full_name || 'Nome não informado';
        const ultimoAcesso = aluno.last_active ? 
          new Date(aluno.last_active).toLocaleDateString('pt-BR') : 
          'Nunca acessou';
        
        console.log(`${index + 1}. ${nome}`);
        console.log(`   📧 Email: ${aluno.email}`);
        console.log(`   🎵 Instrumento: ${aluno.instrument || 'Não escolhido'}`);
        console.log(`   📱 Telefone: ${aluno.phone || 'Não informado'}`);
        console.log(`   📍 Local: ${aluno.city && aluno.state ? `${aluno.city}, ${aluno.state}` : 'Não informado'}`);
        console.log(`   🕐 Último acesso: ${ultimoAcesso}`);
        console.log(`   📅 Cadastrado em: ${new Date(aluno.joined_at).toLocaleDateString('pt-BR')}`);
        console.log('   ───────────────────────────────────────────────────────');
      });

      // Estatísticas dos alunos
      console.log('\n📊 ESTATÍSTICAS DOS ALUNOS:');
      const alunosAtivos = alunos.filter(a => {
        if (!a.last_active) return false;
        const ultimoAcesso = new Date(a.last_active);
        const agora = new Date();
        const diasSemAcesso = (agora - ultimoAcesso) / (1000 * 60 * 60 * 24);
        return diasSemAcesso <= 7; // Alunos: consideramos ativo se acessou nos últimos 7 dias
      }).length;

      const alunosComInstrumento = alunos.filter(a => a.instrument).length;
      const alunosComTelefone = alunos.filter(a => a.phone).length;

      console.log(`🟢 Ativos (acessaram nos últimos 7 dias): ${alunosAtivos}`);
      console.log(`🎵 Com instrumento escolhido: ${alunosComInstrumento}`);
      console.log(`📱 Com telefone informado: ${alunosComTelefone}`);
    }

    // ===== TESTE 5: INSTRUMENTOS POPULARES =====
    console.log('\n🎵 TESTE 5: Instrumentos mais populares...');
    const instrumentosCount = allUsers.reduce((acc, user) => {
      if (user.instrument) {
        acc[user.instrument] = (acc[user.instrument] || 0) + 1;
      }
      return acc;
    }, {});

    if (Object.keys(instrumentosCount).length > 0) {
      console.log('🎼 Ranking de instrumentos:');
      const instrumentosOrdenados = Object.entries(instrumentosCount)
        .sort(([,a], [,b]) => b - a);
      
      instrumentosOrdenados.forEach(([instrumento, quantidade], index) => {
        console.log(`   ${index + 1}. ${instrumento}: ${quantidade} usuário(s)`);
      });
    } else {
      console.log('❓ Nenhum instrumento informado pelos usuários');
    }

    // ===== RESUMO FINAL =====
    console.log('\n🏁 ======= RESUMO FINAL =======');
    console.log(`📊 Total de usuários: ${allUsers.length}`);
    console.log(`👨‍🏫 Professores: ${professores.length}`);
    console.log(`🎓 Alunos: ${alunos.length}`);
    console.log(`🎵 Instrumentos únicos: ${Object.keys(instrumentosCount).length}`);
    console.log(`✅ Teste concluído com sucesso!`);
    
  } catch (error) {
    console.error('💥 ERRO GERAL:', error.message);
    console.error('📋 Detalhes:', error);
  }
}

// Executar o teste
testarDados();