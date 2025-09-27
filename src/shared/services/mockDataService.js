// 🚀 MOCK SERVICE - Dados simulados para Admin
// src/shared/services/mockDataService.js

const mockProfiles = [
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
    last_active: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    joined_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    joined_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 dias atrás
    joined_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date().toISOString(), // Hoje
    joined_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Ontem
    joined_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    joined_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
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
    bio: 'Drummer amador, quer aprender técnicas profissionais.',
    avatar_url: null,
    last_active: null, // Nunca acessou
    joined_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
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
    last_active: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    joined_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    total_points: 410,
    current_streak: 5,
    lessons_completed: 20,
    modules_completed: 4
  }
];

// Simulação da API do Supabase
export const mockSupabaseQuery = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        order: (orderColumn, options) => {
          console.log(`🎭 MOCK: Buscando ${table} onde ${column} = ${value}`);
          
          let filteredData = [...mockProfiles];
          
          // Filtrar por valor
          if (value) {
            filteredData = filteredData.filter(item => item[column] === value);
          }
          
          // Ordenar
          if (orderColumn) {
            filteredData.sort((a, b) => {
              const aVal = a[orderColumn];
              const bVal = b[orderColumn];
              
              if (!aVal) return 1;
              if (!bVal) return -1;
              
              if (options?.ascending === false) {
                return bVal > aVal ? 1 : -1;
              } else {
                return aVal > bVal ? 1 : -1;
              }
            });
          }
          
          console.log(`✅ MOCK: Retornando ${filteredData.length} registros`);
          
          // Simular delay de rede
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                data: filteredData,
                error: null
              });
            }, 200 + Math.random() * 300); // 200-500ms delay
          });
        }
      }),
      
      // Para consultas sem filtro
      then: (callback) => {
        console.log(`🎭 MOCK: Buscando todos os ${table}`);
        
        const delay = 200 + Math.random() * 300;
        setTimeout(() => {
          callback({
            data: [...mockProfiles],
            error: null
          });
        }, delay);
      }
    }),
    
    // Para consultas com count
    select: (columns, options) => {
      if (options?.count === 'exact' && options?.head === true) {
        return {
          then: (callback) => {
            console.log(`🎭 MOCK: Contando registros em ${table}`);
            setTimeout(() => {
              callback({
                data: null,
                error: null,
                count: mockProfiles.length
              });
            }, 100);
          }
        };
      }
      
      return {
        eq: (column, value) => ({
          order: (orderColumn, options) => {
            // Lógica já implementada acima
            let filteredData = [...mockProfiles];
            if (value) {
              filteredData = filteredData.filter(item => item[column] === value);
            }
            
            if (orderColumn) {
              filteredData.sort((a, b) => {
                const aVal = a[orderColumn];
                const bVal = b[orderColumn];
                
                if (!aVal) return 1;
                if (!bVal) return -1;
                
                if (options?.ascending === false) {
                  return bVal > aVal ? 1 : -1;
                } else {
                  return aVal > bVal ? 1 : -1;
                }
              });
            }
            
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  data: filteredData,
                  error: null
                });
              }, 200 + Math.random() * 300);
            });
          }
        })
      };
    }
  })
};

// Função para detectar se deve usar mock
export const shouldUseMockData = () => {
  // Você pode adicionar lógica aqui para decidir quando usar mock
  // Por exemplo, baseado em variável de ambiente ou tentativa de conexão falhou
  return true; // Por enquanto, sempre usar mock
};

// Export individual dos dados
export { mockProfiles };

// Export principal
export default {
  mockProfiles,
  mockSupabaseQuery,
  shouldUseMockData
};