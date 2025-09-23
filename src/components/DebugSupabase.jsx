import React, { useState } from 'react';
import { supabase } from '../src/shared/lib/supabase/supabaseClient';

const DebugSupabase = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testando conexão...\n');
    
    try {
      // Teste 1: Verificar sessão do usuário
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      setResult(prev => prev + `Sessão: ${session?.session?.user?.email || 'Não logado'}\n`);
      
      if (sessionError) {
        setResult(prev => prev + `Erro de sessão: ${sessionError.message}\n`);
      }

      // Teste 2: Tentar ler dados da tabela instrumentos (sem RLS)
      const { data: instrumentos, error: instrumentosError } = await supabase
        .from('instrumentos')
        .select('id, nome, categoria')
        .limit(3);
      
      if (instrumentosError) {
        setResult(prev => prev + `❌ Erro instrumentos: ${instrumentosError.message}\n`);
      } else {
        setResult(prev => prev + `✅ Instrumentos (${instrumentos?.length}): ${JSON.stringify(instrumentos, null, 2)}\n`);
      }

      // Teste 3: Verificar perfil do usuário
      if (session?.session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.session.user.id)
          .single();

        if (profileError) {
          setResult(prev => prev + `❌ Erro profile: ${profileError.message}\n`);
        } else {
          setResult(prev => prev + `✅ Profile: ${profile?.full_name} (${profile?.tipo_usuario})\n`);
        }
      }

    } catch (error) {
      setResult(prev => prev + `❌ Erro geral: ${error.message}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-md z-50">
      <h3 className="font-bold mb-2">🔍 Debug Supabase</h3>
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-2"
      >
        {loading ? 'Testando...' : 'Testar Conexão'}
      </button>
      <pre className="text-xs bg-gray-100 p-2 rounded max-h-40 overflow-y-auto whitespace-pre-wrap">
        {result || 'Clique em "Testar Conexão" para verificar...'}
      </pre>
    </div>
  );
};

export default DebugSupabase;