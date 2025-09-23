import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

export const useInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);

      // Carregar instrumentos da tabela real - TESTE SEM FILTROS
      const { data: instrumentosData, error: instrumentosError } = await supabase
        .from('instrumentos')
        .select('*')
        .order('nome');

      // Se não há dados, vamos tentar uma query ainda mais simples
      if (!instrumentosData || instrumentosData.length === 0) {
        const { data: testData, error: testError } = await supabase
          .from('instrumentos')
          .select('id, nome, categoria')
          .limit(10);
        
        if (testError) {
          console.warn('Tabela instrumentos pode não existir ou estar vazia:', testError);
        }
      }

      if (instrumentosError) {
        console.warn('⚠️ Tabela instrumentos com problema, usando dados mock:', instrumentosError);
        
        // FALLBACK: Usar dados mock ricos
        const mockInstrumentos = [
          { 
            id: 1, 
            nome: 'Violão', 
            categoria: 'corda', 
            ativo: true,
            descricao: 'O violão é um dos instrumentos mais versáteis e populares do mundo.',
            historia: 'Com origem no século XVI, o violão evoluiu para se tornar fundamental na música popular.',
            fabricante: 'Yamaha, Fender, Taylor'
          },
          { 
            id: 2, 
            nome: 'Piano', 
            categoria: 'teclado', 
            ativo: true,
            descricao: 'O piano é conhecido como o rei dos instrumentos musicais.',
            historia: 'Criado por Bartolomeo Cristofori em 1700, revolucionou a música clássica.',
            fabricante: 'Steinway, Yamaha, Roland'
          },
          { 
            id: 3, 
            nome: 'Flauta', 
            categoria: 'sopro', 
            ativo: true,
            descricao: 'A flauta é um dos instrumentos mais antigos da humanidade.',
            historia: 'Com mais de 40.000 anos, a flauta atravessa todas as culturas musicais.',
            fabricante: 'Pearl, Yamaha, Gemeinhardt'
          },
          { 
            id: 4, 
            nome: 'Violino', 
            categoria: 'corda', 
            ativo: true,
            descricao: 'O violino é o menor e mais agudo dos instrumentos de corda.',
            historia: 'Desenvolvido no século XVI na Itália, tornou-se essencial na música clássica.',
            fabricante: 'Stradivarius, Guarneri, Suzuki'
          },
          { 
            id: 5, 
            nome: 'Bateria', 
            categoria: 'percussao', 
            ativo: true,
            descricao: 'A bateria é o coração rítmico de qualquer banda.',
            historia: 'Criada no início do século XX, combina vários instrumentos de percussão.',
            fabricante: 'Pearl, DW, Tama'
          }
        ];
        
        const mockFormatados = mockInstrumentos.map(item => ({
          id: item.id,
          nome: item.nome,
          categoria: item.categoria,
          categoria_id: item.categoria,
          descricao: item.descricao,
          historia: item.historia,
          nivel_recomendado: 'iniciante',
          disponivel: true,
          imagem_url: `https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=${encodeURIComponent(item.nome)}`,
          audio_demo_url: null,
          materiais: [
            `Método básico de ${item.nome}`,
            'Partituras essenciais',
            'Exercícios técnicos',
            'Repertório popular',
            'Técnicas avançadas'
          ],
          fabricante: item.fabricante,
          nivel_dificuldade: 'Iniciante',
          created_at: new Date().toISOString()
        }));
        
        console.log('📋 Instrumentos carregados (mock):', mockFormatados.length);
        setInstrumentos(mockFormatados);
        
        // Mock categorias também
        const mockCategorias = [
          { nome: 'corda', icone: 'Music' },
          { nome: 'teclado', icone: 'BookOpen' },
          { nome: 'sopro', icone: 'Volume2' },
          { nome: 'percussao', icone: 'Clock' }
        ];
        setCategorias(mockCategorias);
        return;
      }

      // Transformar dados para o formato esperado pelo componente
      const instrumentosFormatados = instrumentosData?.map(item => ({
        id: item.id,
        nome: item.nome,
        categoria: item.categoria,
        categoria_id: item.categoria, // Para compatibilidade
        descricao: item.descricao || `Aprenda a tocar ${item.nome} - Explore as técnicas e estilos deste instrumento maravilhoso.`,
        nivel_recomendado: item.nivel_recomendado || 'iniciante',
        disponivel: item.ativo !== false,
        imagem_url: item.imagem_url || `https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=${encodeURIComponent(item.nome)}`,
        audio_demo_url: item.audio_demo_url || null,
        historia: item.historia || `O ${item.nome} é um instrumento com rica tradição musical...`,
        materiais: item.materiais || [
          `Método básico de ${item.nome}`,
          'Partituras essenciais',
          'Exercícios técnicos',
          'Repertório popular'
        ],
        fabricante: item.fabricante || 'Diversos fabricantes',
        nivel_dificuldade: item.nivel_dificuldade || 'Iniciante',
        created_at: item.created_at
      })) || [];

      console.log('✅ Instrumentos carregados do banco:', instrumentosFormatados.length);
      setInstrumentos(instrumentosFormatados);

      // Extrair categorias únicas
      const categoriasUnicas = [...new Set(instrumentosData?.map(item => item.categoria) || [])];
      const categoriasFormatadas = categoriasUnicas.map(cat => ({
        nome: cat,
        icone: getIconeCategoria(cat)
      }));

      setCategorias(categoriasFormatadas);

    } catch (error) {
      console.error('Erro ao carregar instrumentos:', error);
      setInstrumentos([]);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para obter ícones das categorias
  const getIconeCategoria = (categoria) => {
    const icones = {
      'corda': 'Music',
      'sopro': 'Volume2',
      'percussao': 'Clock',
      'teclado': 'BookOpen',
      'vocal': 'Users',
      'teoria': 'Star',
      'outros': 'Award'
    };
    return icones[categoria] || 'Music';
  };

  // Funções de filtro
  const filtrarInstrumentos = {
    categoria: (instrumentos, categoria) => {
      return instrumentos.filter(instrumento => 
        instrumento.categoria === categoria
      );
    },

    disponibilidade: (instrumentos, disponivel) => {
      return instrumentos.filter(instrumento => 
        disponivel === 'todos' || instrumento.disponivel === (disponivel === 'disponivel')
      );
    },

    busca: (instrumentos, termo) => {
      const termoLower = termo.toLowerCase();
      return instrumentos.filter(instrumento => 
        instrumento.nome.toLowerCase().includes(termoLower) ||
        (instrumento.descricao && instrumento.descricao.toLowerCase().includes(termoLower))
      );
    }
  };

  // Estatísticas
  const calcularEstatisticas = () => {
    return {
      total: instrumentos.length,
      por_categoria: categorias.map(cat => ({
        categoria: cat.nome,
        total: instrumentos.filter(inst => inst.categoria === cat.nome).length
      })),
      disponiveis: instrumentos.filter(inst => inst.disponivel).length
    };
  };

  return {
    instrumentos,
    categorias,
    loading,
    filtrarInstrumentos,
    calcularEstatisticas,
    recarregar: carregarDados,
    refreshInstrumentos: carregarDados
  };
};