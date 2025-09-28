// TestDevotionalQuery.jsx - Componente para testar se o erro foi corrigido
import React, { useEffect, useState } from 'react';
import { supabase } from '../../shared/lib/supabase/supabaseClient';
import { useAuth } from '../../shared/contexts/AuthContext';

const TestDevotionalQuery = () => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState({ loading: true, error: null, success: false });

  useEffect(() => {
    const testQuery = async () => {
      if (!user) {
        setTestResult({ loading: false, error: 'Usuário não autenticado', success: false });
        return;
      }

      try {
        console.log('🧪 Testando query user_devotional_progress...');
        
        // Teste 1: Verificar se a tabela existe
        const { data: tableCheck, error: tableError } = await supabase
          .from('user_devotional_progress')
          .select('count(*)', { count: 'exact', head: true });

        if (tableError) {
          throw new Error(`Tabela não encontrada: ${tableError.message}`);
        }

        console.log('✅ Tabela user_devotional_progress existe');

        // Teste 2: Verificar query específica que estava falhando
        const { data, error } = await supabase
          .from('user_devotional_progress')
          .select('devotional_id, read_at, is_favorite, personal_notes')
          .eq('user_id', user.id);

        if (error) {
          throw new Error(`Erro na query: ${error.message}`);
        }

        console.log('✅ Query funciona! Registros encontrados:', data?.length || 0);
        
        setTestResult({ 
          loading: false, 
          error: null, 
          success: true, 
          data: data,
          count: data?.length || 0
        });

      } catch (err) {
        console.error('❌ Erro no teste:', err);
        setTestResult({ 
          loading: false, 
          error: err.message, 
          success: false 
        });
      }
    };

    testQuery();
  }, [user]);

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">⚠️ Usuário não autenticado - Faça login para testar</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🧪 Teste: user_devotional_progress</h2>
      
      {testResult.loading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">⏳ Testando conexão com o banco...</p>
        </div>
      )}

      {testResult.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-800">❌ Erro Detectado:</h3>
          <p className="text-red-700">{testResult.error}</p>
        </div>
      )}

      {testResult.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-800">✅ Teste Bem-sucedido!</h3>
          <p className="text-green-700">
            Query funcionou corretamente. Registros encontrados: {testResult.count}
          </p>
          {testResult.data && testResult.data.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium">Dados encontrados:</h4>
              <pre className="text-xs bg-green-100 p-2 rounded mt-1">
                {JSON.stringify(testResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Usuário ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default TestDevotionalQuery;