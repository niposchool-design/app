// Script para testar consultas diretamente no Supabase
import { createClient } from '@supabase/supabase-js';

// Use suas credenciais do Supabase aqui
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'SUA_CHAVE_DO_SUPABASE';
const supabase = createClient(supabaseUrl, supabaseKey);

const testarConsultas = async () => {
  console.log('🔍 Testando consultas no banco...');
  
  try {
    // 1. Listar todas as tabelas disponíveis
    console.log('\n📋 Verificando tabela instrumentos:');
    const { data: instrumentos, error: errorInstrumentos } = await supabase
      .from('instrumentos')
      .select('*')
      .limit(3);
    
    if (errorInstrumentos) {
      console.error('❌ Erro na tabela instrumentos:', errorInstrumentos.message);
    } else {
      console.log('✅ Instrumentos encontrados:', instrumentos?.length || 0);
      if (instrumentos?.length > 0) {
        console.log('📝 Primeiro instrumento:', instrumentos[0]);
        const instrumentoId = instrumentos[0].id;
        
        // 2. Testar tabelas relacionadas
        const tabelas = [
          'instrumento_sons',
          'instrumento_midias', 
          'instrumento_curiosidades',
          'instrumento_tecnicas',
          'professor_instrumentos'
        ];
        
        for (const tabela of tabelas) {
          console.log(`\n🔍 Testando tabela: ${tabela}`);
          const { data, error } = await supabase
            .from(tabela)
            .select('*')
            .eq('instrumento_id', instrumentoId)
            .limit(3);
            
          if (error) {
            console.error(`❌ Erro na tabela ${tabela}:`, error.message);
          } else {
            console.log(`✅ ${tabela}: ${data?.length || 0} registros`);
            if (data?.length > 0) {
              console.log(`📝 Primeiro registro:`, data[0]);
            }
          }
        }
        
        // 3. Testar consulta de professores com join
        console.log(`\n🔍 Testando consulta de professores com join:`);
        const { data: professores, error: errorProfs } = await supabase
          .from('professor_instrumentos')
          .select(`
            professores:professor_id (
              id,
              nome_completo,
              email
            )
          `)
          .eq('instrumento_id', instrumentoId);
          
        if (errorProfs) {
          console.error(`❌ Erro na consulta de professores:`, errorProfs.message);
        } else {
          console.log(`✅ Professores: ${professores?.length || 0} encontrados`);
          if (professores?.length > 0) {
            console.log(`📝 Primeiro professor:`, professores[0]);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
};

// Para usar este script:
// 1. Substitua as credenciais do Supabase acima
// 2. Execute: node teste-banco.js
// 3. Ou copie e execute no console do navegador

export { testarConsultas };