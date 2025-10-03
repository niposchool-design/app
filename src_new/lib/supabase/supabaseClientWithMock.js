// 🔧 SUPABASE CLIENT COM FALLBACK PARA MOCK
// src/shared/lib/supabase/supabaseClientWithMock.js

import { createClient } from '@supabase/supabase-js';
import { mockSupabaseQuery, shouldUseMockData, mockProfiles } from '../../services/mockDataService.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

let realSupabaseClient = null;
let connectionTested = false;
let shouldUseMock = false;

// Tentar criar cliente real
if (supabaseUrl && supabaseAnonKey) {
  try {
    realSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      db: {
        schema: 'public'
      }
    });
  } catch (error) {
    console.warn('⚠️ Erro ao criar cliente Supabase real:', error);
    shouldUseMock = true;
  }
} else {
  console.warn('⚠️ Variáveis de ambiente Supabase não configuradas');
  shouldUseMock = true;
}

// Função para testar conectividade
const testConnection = async () => {
  if (connectionTested) return !shouldUseMock;
  
  if (!realSupabaseClient || shouldUseMock) {
    connectionTested = true;
    shouldUseMock = true;
    return false;
  }
  
  try {
    console.log('🔍 Testando conectividade com Supabase...');
    
    const { error } = await realSupabaseClient
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.warn('⚠️ Erro de conectividade Supabase:', error.message);
      shouldUseMock = true;
      connectionTested = true;
      return false;
    }
    
    console.log('✅ Conectividade Supabase OK');
    shouldUseMock = false;
    connectionTested = true;
    return true;
    
  } catch (error) {
    console.warn('⚠️ Falha na conectividade Supabase:', error);
    shouldUseMock = true;
    connectionTested = true;
    return false;
  }
};

// Cliente híbrido que tenta real primeiro, depois fallback para mock
export const supabase = {
  from: (tableName) => {
    return {
      select: (columns, options) => {
        const queryBuilder = {
          eq: (column, value) => {
            const subQueryBuilder = {
              order: async (orderColumn, orderOptions) => {
                // Tentar conexão real primeiro
                if (!connectionTested) {
                  await testConnection();
                }
                
                if (!shouldUseMock && realSupabaseClient) {
                  try {
                    console.log(`🔄 Tentando consulta real: ${tableName}`);
                    const result = await realSupabaseClient
                      .from(tableName)
                      .select(columns, options)
                      .eq(column, value)
                      .order(orderColumn, orderOptions);
                    
                    if (!result.error) {
                      console.log(`✅ Consulta real bem-sucedida: ${result.data?.length} registros`);
                      return result;
                    } else {
                      console.warn('⚠️ Erro na consulta real, usando mock:', result.error);
                    }
                  } catch (error) {
                    console.warn('⚠️ Erro na consulta real, usando mock:', error);
                  }
                }
                
                // Fallback para mock
                console.log(`🎭 Usando dados mockados para: ${tableName}`);
                return mockSupabaseQuery.from(tableName).select(columns).eq(column, value).order(orderColumn, orderOptions);
              }
            };
            
            return subQueryBuilder;
          },
          
          // Implementar método .not() que estava faltando
          not: (column, operator, value) => {
            return {
              then: async (callback) => {
                console.log(`🎭 MOCK: Usando .not() para ${tableName}`);
                
                // Tentar conexão real primeiro
                if (!connectionTested) {
                  await testConnection();
                }
                
                if (!shouldUseMock && realSupabaseClient) {
                  try {
                    const result = await realSupabaseClient
                      .from(tableName)
                      .select(columns, options)
                      .not(column, operator, value);
                    
                    if (!result.error) {
                      console.log(`✅ Consulta .not() real bem-sucedida`);
                      return callback(result);
                    } else {
                      console.warn('⚠️ Erro na consulta .not() real, usando mock');
                    }
                  } catch (error) {
                    console.warn('⚠️ Erro na consulta .not() real, usando mock:', error);
                  }
                }
                
                // Mock fallback - filtrar dados que não são null
                const filteredData = mockProfiles.filter(item => {
                  if (operator === 'is' && value === null) {
                    return item[column] !== null && item[column] !== undefined;
                  }
                  return true;
                });
                
                return callback({
                  data: filteredData,
                  error: null
                });
              }
            };
          }
        };
        
        // Se for consulta com count/head (para testes de conectividade)
        if (options?.count === 'exact' && options?.head === true) {
          return {
            then: async (callback) => {
              if (!connectionTested) {
                await testConnection();
              }
              
              if (!shouldUseMock && realSupabaseClient) {
                try {
                  const result = await realSupabaseClient
                    .from(tableName)
                    .select(columns, options);
                  
                  if (!result.error) {
                    return callback(result);
                  }
                } catch (error) {
                  console.warn('⚠️ Erro na consulta de contagem, usando mock');
                }
              }
              
              // Mock fallback
              return callback({
                data: null,
                error: null,
                count: tableName === 'profiles' ? 8 : 0
              });
            }
          };
        }
        
        return queryBuilder;
      }
    };
  },
  
  // Propriedades extras para compatibilidade
  supabaseUrl: supabaseUrl,
  auth: realSupabaseClient?.auth,
  
  // Função utilitária para forçar reset da conexão
  resetConnection: () => {
    connectionTested = false;
    shouldUseMock = false;
  },
  
  // Função para verificar se está usando mock
  isUsingMock: () => shouldUseMock
};

// Log inicial
console.log('🚀 Supabase Client Híbrido inicializado');
console.log('🔗 URL configurada:', supabaseUrl ? '✅' : '❌');
console.log('🔑 Key configurada:', supabaseAnonKey ? '✅' : '❌');

export default supabase;