import React, { useState, useEffect } from 'react';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';
import { useAuth } from '../../../contexts/working-auth-context';

const AdminTeste = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});

  const testarConexao = async () => {
    setLoading(true);
    setResults({});
    setErrors({});
    
    console.log('🔍 INICIANDO TESTES DO BANCO DE DADOS');
    
    const testes = {};
    const erros = {};

    // ==========================================
    // TESTE 1: Verificar se Supabase está configurado
    // ==========================================
    try {
      console.log('📡 Teste 1: Verificando configuração do Supabase...');
      if (!supabase) {
        throw new Error('Supabase não está configurado');
      }
      testes.supabase_config = '✅ Supabase configurado';
      console.log('✅ Supabase configurado corretamente');
    } catch (err) {
      erros.supabase_config = `❌ ${err.message}`;
      console.error('❌ Erro na configuração:', err);
    }

    // ==========================================
    // TESTE 2: Verificar autenticação
    // ==========================================
    try {
      console.log('👤 Teste 2: Verificando autenticação...');
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) throw authError;
      
      testes.auth = {
        user_id: currentUser?.id || 'Não logado',
        email: currentUser?.email || 'N/A',
        status: currentUser ? '✅ Autenticado' : '❌ Não autenticado'
      };
      console.log('✅ Usuário autenticado:', currentUser?.email);
    } catch (err) {
      erros.auth = `❌ ${err.message}`;
      console.error('❌ Erro de autenticação:', err);
    }

    // ==========================================
    // TESTE 3: Consulta simples - contar registros
    // ==========================================
    try {
      console.log('🔢 Teste 3: Contando registros na tabela profiles...');
      const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      
      testes.count_profiles = `✅ Total de registros: ${count}`;
      console.log(`✅ Total de profiles: ${count}`);
    } catch (err) {
      erros.count_profiles = `❌ ${err.message}`;
      console.error('❌ Erro ao contar profiles:', err);
    }

    // ==========================================
    // TESTE 4: Buscar TODOS os profiles (sem filtro)
    // ==========================================
    try {
      console.log('👥 Teste 4: Buscando todos os profiles...');
      const { data: allProfiles, error: allError } = await supabase
        .from('profiles')
        .select('*')
        .limit(20); // Limitar para não sobrecarregar
      
      if (allError) throw allError;
      
      testes.all_profiles = {
        status: '✅ Consulta realizada',
        total: allProfiles?.length || 0,
        primeiros_3: allProfiles?.slice(0, 3).map(p => ({
          id: p.id,
          email: p.email,
          full_name: p.full_name,
          tipo_usuario: p.tipo_usuario,
          instrument: p.instrument
        })) || []
      };
      console.log('✅ Todos os profiles:', allProfiles);
    } catch (err) {
      erros.all_profiles = `❌ ${err.message}`;
      console.error('❌ Erro ao buscar todos os profiles:', err);
    }

    // ==========================================
    // TESTE 5: Buscar apenas alunos
    // ==========================================
    try {
      console.log('👨‍🎓 Teste 5: Buscando apenas alunos...');
      const { data: alunos, error: alunosError } = await supabase
        .from('profiles')
        .select('*')
        .eq('tipo_usuario', 'aluno');
      
      if (alunosError) throw alunosError;
      
      testes.alunos = {
        status: '✅ Consulta realizada',
        total: alunos?.length || 0,
        lista: alunos?.map(a => ({
          nome: a.nome || a.full_name,
          email: a.email,
          instrumento: a.instrument,
          joined_at: a.joined_at
        })) || []
      };
      console.log('✅ Alunos encontrados:', alunos);
    } catch (err) {
      erros.alunos = `❌ ${err.message}`;
      console.error('❌ Erro ao buscar alunos:', err);
    }

    // ==========================================
    // TESTE 6: Buscar apenas professores
    // ==========================================
    try {
      console.log('👨‍🏫 Teste 6: Buscando apenas professores...');
      const { data: professores, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('tipo_usuario', 'professor');
      
      if (profError) throw profError;
      
      testes.professores = {
        status: '✅ Consulta realizada',
        total: professores?.length || 0,
        lista: professores?.map(p => ({
          nome: p.nome || p.full_name,
          email: p.email,
          instrumento: p.instrument,
          joined_at: p.joined_at
        })) || []
      };
      console.log('✅ Professores encontrados:', professores);
    } catch (err) {
      erros.professores = `❌ ${err.message}`;
      console.error('❌ Erro ao buscar professores:', err);
    }

    // ==========================================
    // TESTE 7: Verificar RLS (Row Level Security)
    // ==========================================
    try {
      console.log('🔒 Teste 7: Verificando RLS...');
      
      // Tentar uma consulta que pode falhar por RLS
      const { data: rlsTest, error: rlsError } = await supabase
        .from('profiles')
        .select('id, email, tipo_usuario')
        .limit(1);
      
      if (rlsError) {
        if (rlsError.message.includes('RLS') || rlsError.message.includes('policy')) {
          testes.rls = '⚠️ RLS ativo - pode estar bloqueando consultas';
        } else {
          throw rlsError;
        }
      } else {
        testes.rls = '✅ RLS permite consultas ou está desabilitado';
      }
      
      console.log('✅ Teste RLS concluído');
    } catch (err) {
      erros.rls = `❌ Possível problema de RLS: ${err.message}`;
      console.error('❌ Erro de RLS:', err);
    }

    // ==========================================
    // TESTE 8: Verificar estrutura da tabela
    // ==========================================
    try {
      console.log('🏗️ Teste 8: Verificando estrutura da tabela...');
      
      // Pegar um registro para ver as colunas disponíveis
      const { data: estrutura, error: estError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (estError) throw estError;
      
      if (estrutura && estrutura.length > 0) {
        testes.estrutura = {
          status: '✅ Estrutura obtida',
          colunas: Object.keys(estrutura[0]),
          exemplo: estrutura[0]
        };
      } else {
        testes.estrutura = '⚠️ Tabela existe mas está vazia';
      }
      
      console.log('✅ Estrutura da tabela:', estrutura);
    } catch (err) {
      erros.estrutura = `❌ ${err.message}`;
      console.error('❌ Erro ao verificar estrutura:', err);
    }

    setResults(testes);
    setErrors(erros);
    setLoading(false);
    
    console.log('🏁 TESTES CONCLUÍDOS');
    console.log('📊 Resultados:', testes);
    console.log('❌ Erros:', erros);
  };

  useEffect(() => {
    console.log('🚀 AdminTeste carregado');
    console.log('👤 User:', user);
    console.log('👤 UserProfile:', userProfile);
  }, [user, userProfile]);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1>🔧 Admin Teste - Debug do Banco de Dados</h1>
      <p>Esta página testa a conexão e consultas ao Supabase</p>
      
      <hr />
      
      <h2>Informações do Usuário Atual:</h2>
      <pre style={{ background: '#fff', padding: '10px', border: '1px solid #ddd' }}>
        {JSON.stringify({
          user_id: user?.id,
          email: user?.email,
          userProfile: userProfile
        }, null, 2)}
      </pre>
      
      <button 
        onClick={testarConexao} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          background: loading ? '#ccc' : '#007bff', 
          color: 'white', 
          border: 'none', 
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? '🔄 Testando...' : '🚀 Executar Testes'}
      </button>

      {Object.keys(errors).length > 0 && (
        <>
          <h2 style={{ color: 'red' }}>❌ Erros Encontrados:</h2>
          <pre style={{ background: '#ffe6e6', padding: '10px', border: '1px solid #ff0000' }}>
            {JSON.stringify(errors, null, 2)}
          </pre>
        </>
      )}

      {Object.keys(results).length > 0 && (
        <>
          <h2 style={{ color: 'green' }}>✅ Resultados dos Testes:</h2>
          <pre style={{ background: '#e6ffe6', padding: '10px', border: '1px solid #00ff00' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </>
      )}

      <hr />
      
      <h3>📋 Como interpretar os resultados:</h3>
      <ul>
        <li><strong>supabase_config:</strong> Verifica se o Supabase está configurado</li>
        <li><strong>auth:</strong> Verifica se o usuário está autenticado</li>
        <li><strong>count_profiles:</strong> Conta quantos registros existem</li>
        <li><strong>all_profiles:</strong> Busca todos os perfis (máximo 20)</li>
        <li><strong>alunos:</strong> Busca apenas usuários com tipo_usuario = 'aluno'</li>
        <li><strong>professores:</strong> Busca apenas usuários com tipo_usuario = 'professor'</li>
        <li><strong>rls:</strong> Verifica se Row Level Security está bloqueando</li>
        <li><strong>estrutura:</strong> Mostra as colunas disponíveis na tabela</li>
      </ul>
    </div>
  );
};

export default AdminTeste;