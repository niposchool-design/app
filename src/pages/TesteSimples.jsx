import React, { useState, useEffect } from 'react';
import { supabase } from '../shared/lib/supabase/supabaseClient';

const TesteSimples = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const testarDados = async () => {
      try {
        console.log('🔄 Iniciando teste de dados...');
        
        // Teste básico de conexão
        const { data: allUsers, error } = await supabase
          .from('profiles')
          .select('id, email, nome, full_name, tipo_usuario, last_active, joined_at');
        
        if (error) {
          throw error;
        }
        
        console.log('✅ Dados carregados:', allUsers);
        
        // Separar por tipo
        const professores = allUsers.filter(user => user.tipo_usuario === 'professor');
        const alunos = allUsers.filter(user => user.tipo_usuario === 'aluno');
        
        console.log(`👨‍🏫 Professores encontrados: ${professores.length}`);
        console.log(`🎓 Alunos encontrados: ${alunos.length}`);
        
        professores.forEach((prof, index) => {
          console.log(`Professor ${index + 1}:`, {
            nome: prof.nome || prof.full_name,
            email: prof.email,
            ultimoAcesso: prof.last_active
          });
        });
        
        alunos.forEach((aluno, index) => {
          console.log(`Aluno ${index + 1}:`, {
            nome: aluno.nome || aluno.full_name,
            email: aluno.email,
            ultimoAcesso: aluno.last_active
          });
        });
        
        setDados({
          total: allUsers.length,
          professores: professores.length,
          alunos: alunos.length,
          listaProfessores: professores,
          listaAlunos: alunos
        });
        
      } catch (error) {
        console.error('❌ Erro ao testar dados:', error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    testarDados();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Testando dados do banco...</h2>
          <p className="text-gray-600 mt-2">Abra o console (F12) para ver os logs detalhados</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-600">Erro ao conectar com o banco</h2>
          <p className="text-gray-600 mt-2">{erro}</p>
          <p className="text-sm text-gray-500 mt-4">Verifique o console para mais detalhes</p>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Nenhum dado encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🧪 Teste de Dados - Nipo School</h1>
        
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">{dados.total}</h3>
            <p>Total de Usuários</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">{dados.professores}</h3>
            <p>Professores</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">{dados.alunos}</h3>
            <p>Alunos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professores */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600">👨‍🏫 Professores</h2>
            {dados.listaProfessores.length === 0 ? (
              <p className="text-gray-500">Nenhum professor encontrado</p>
            ) : (
              <div className="space-y-4">
                {dados.listaProfessores.map((prof, index) => (
                  <div key={prof.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-semibold">{prof.nome || prof.full_name || 'Nome não informado'}</h3>
                    <p className="text-sm text-gray-600">{prof.email}</p>
                    <p className="text-xs text-gray-500">
                      Último acesso: {prof.last_active ? new Date(prof.last_active).toLocaleDateString('pt-BR') : 'Nunca acessou'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alunos */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">🎓 Alunos</h2>
            {dados.listaAlunos.length === 0 ? (
              <p className="text-gray-500">Nenhum aluno encontrado</p>
            ) : (
              <div className="space-y-4">
                {dados.listaAlunos.map((aluno, index) => (
                  <div key={aluno.id} className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-semibold">{aluno.nome || aluno.full_name || 'Nome não informado'}</h3>
                    <p className="text-sm text-gray-600">{aluno.email}</p>
                    <p className="text-xs text-gray-500">
                      Último acesso: {aluno.last_active ? new Date(aluno.last_active).toLocaleDateString('pt-BR') : 'Nunca acessou'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">📋 Dados sendo exibidos:</h3>
          <p className="text-yellow-700 text-sm">
            Estes dados estão vindo diretamente da tabela 'profiles' no Supabase. 
            Todos os logs detalhados estão no Console (F12). Os dados são filtrados por 'tipo_usuario'.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TesteSimples;