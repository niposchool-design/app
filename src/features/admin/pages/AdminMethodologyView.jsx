import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Share, 
  Users, 
  BookOpen, 
  Clock, 
  Target,
  TrendingUp,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Activity,
  Sparkles
} from 'lucide-react';
import NipoHeader from '../../../shared/components/UI/NipoHeader';
import AlphaPrinciplesDetail from '../components/AlphaPrinciplesDetail';
import MethodologyDetailTemplate from '../components/MethodologyDetailTemplate';

const AdminMethodologyView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [methodology, setMethodology] = useState(null);
  
  // Estatísticas administrativas simuladas
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completionRate: 0,
    avgProgress: 0,
    teachersUsing: 0
  });

  useEffect(() => {
    // Base completa de dados administrativos para todos os capítulos (incluindo 0)
    const adminData = {
      0: {
        id: 0,
        title: 'Princípios Alpha',
        subtitle: 'Eixo Transversal do Currículo Nipo School',
        description: 'O DNA metodológico que permeia todo o currículo da Nipo School, inspirando cada módulo, oficina e projeto. Mais que um método, é um jeito de viver a música: com protagonismo, desafio, colaboração, tecnologia, feedback e celebração.',
        status: 'Ativo',
        difficulty: 'Fundamental',
        totalLessons: 8,
        estimatedDuration: '2-3 semanas',
        keyFeatures: [
          'Desafios Semanais e Registro Digital',
          'Aprendizagem Ativa e Protagonismo',
          'Peer Learning (Aprendizagem entre Pares)',
          'Integração App + Aula Presencial',
          'Projetos e Dinâmicas Coletivas',
          'Acompanhamento Individualizado',
          'Feedback e Celebração Constante',
          'Espiritualidade, Valores e Cultura Japonesa-Brasileira'
        ],
        targetAudience: 'Todos os educadores e alunos',
        country: 'Brasil',
        author: 'Fundadores Alpha School / Nipo School',
        year: '2023-2024',
        lastUpdated: '2024-06-01',
        version: '4.0',
        category: 'Fundamentos',
        isFoundational: true
      },
      1: {
        id: 1,
        title: 'Orff Schulwerk',
        subtitle: 'Música Elementar através do Movimento',
        description: 'Metodologia alemã baseada em movimento, ritmo e improvisação usando instrumentos de percussão.',
        status: 'Ativo',
        difficulty: 'Fundamental',
        totalLessons: 12,
        estimatedDuration: '4-6 semanas',
        keyFeatures: [
          'Educação musical elementar',
          'Integração música-movimento-linguagem',
          'Instrumentarium Orff',
          'Improvisação e criatividade'
        ],
        targetAudience: 'Crianças pequenas até adultos',
        country: 'Alemanha',
        author: 'Carl Orff',
        year: '1924-1980',
        lastUpdated: '2024-01-15',
        version: '2.1',
        category: 'Metodologias Tradicionais'
      },
      2: {
        id: 2,
        title: 'Método Suzuki',
        subtitle: 'Educação do Talento pela Língua Materna',
        description: 'Abordagem japonesa que ensina música da mesma forma que as crianças aprendem sua língua materna.',
        status: 'Ativo',
        difficulty: 'Fundamental a Avançado',
        totalLessons: 15,
        estimatedDuration: '6-8 semanas',
        keyFeatures: [
          'Aprendizagem pela escuta',
          'Envolvimento dos pais',
          'Início precoce',
          'Repertório padronizado'
        ],
        targetAudience: 'Crianças pequenas até adultos',
        country: 'Japão',
        author: 'Shinichi Suzuki',
        year: '1898-1998',
        lastUpdated: '2024-01-20',
        version: '1.8',
        category: 'Metodologias Tradicionais'
      },
      3: {
        id: 3,
        title: 'Método Kodály',
        subtitle: 'Sistema Húngaro de Educação Musical',
        description: 'Metodologia húngara focada no desenvolvimento da musicalidade através do canto e da leitura musical.',
        status: 'Ativo',
        difficulty: 'Fundamental a Avançado',
        totalLessons: 16,
        estimatedDuration: '7-9 semanas',
        keyFeatures: [
          'Solfejo relativo',
          'Manossolfa',
          'Repertório folclórico nacional',
          'Desenvolvimento da audição interna'
        ],
        targetAudience: 'Crianças e adolescentes',
        country: 'Hungria',
        author: 'Zoltán Kodály',
        year: '1882-1967',
        lastUpdated: '2024-02-01',
        version: '2.0',
        category: 'Metodologias Tradicionais'
      },
      4: {
        id: 4,
        title: 'Musical Futures',
        subtitle: 'Aprendizagem Musical Informal',
        description: 'Abordagem britânica que integra práticas de aprendizagem musical informal no ensino formal.',
        status: 'Ativo',
        difficulty: 'Intermediário',
        totalLessons: 10,
        estimatedDuration: '5-6 semanas',
        keyFeatures: [
          'Aprendizagem por imitação',
          'Música popular contemporânea',
          'Formação de bandas',
          'Tecnologia musical'
        ],
        targetAudience: 'Adolescentes e jovens adultos',
        country: 'Reino Unido',
        author: 'Paul Hamlyn Foundation',
        year: '2003',
        lastUpdated: '2024-02-05',
        version: '1.5',
        category: 'Metodologias Contemporâneas'
      },
      5: {
        id: 5,
        title: 'Dalcroze Euritmia',
        subtitle: 'Movimento e Expressão Corporal',
        description: 'Método suíço que desenvolve a musicalidade através do movimento corporal e da euritmia.',
        status: 'Ativo',
        difficulty: 'Fundamental a Intermediário',
        totalLessons: 14,
        estimatedDuration: '6-7 semanas',
        keyFeatures: [
          'Euritmia corporal',
          'Desenvolvimento rítmico',
          'Improvisação musical',
          'Coordenação motora'
        ],
        targetAudience: 'Todas as idades',
        country: 'Suíça',
        author: 'Émile Jaques-Dalcroze',
        year: '1865-1950',
        lastUpdated: '2024-02-10',
        version: '1.9',
        category: 'Metodologias Tradicionais'
      },
      6: {
        id: 6,
        title: 'Gordon Music Learning Theory',
        subtitle: 'Teoria da Aprendizagem Musical',
        description: 'Sistema americano baseado na compreensão de como o cérebro aprende música de forma natural.',
        status: 'Ativo',
        difficulty: 'Intermediário a Avançado',
        totalLessons: 18,
        estimatedDuration: '8-10 semanas',
        keyFeatures: [
          'Audiação musical',
          'Padrões tonais e rítmicos',
          'Sequência de aprendizagem',
          'Desenvolvimento gradual'
        ],
        targetAudience: 'Bebês até adultos',
        country: 'Estados Unidos',
        author: 'Edwin E. Gordon',
        year: '1927-2015',
        lastUpdated: '2024-02-15',
        version: '2.3',
        category: 'Metodologias Contemporâneas'
      },
      7: {
        id: 7,
        title: 'Montessori Music',
        subtitle: 'Educação Musical Sensorial',
        description: 'Adaptação dos princípios montessorianos para a educação musical, enfatizando a exploração sensorial.',
        status: 'Ativo',
        difficulty: 'Fundamental',
        totalLessons: 11,
        estimatedDuration: '4-5 semanas',
        keyFeatures: [
          'Materiais sensoriais',
          'Aprendizagem autodidata',
          'Ambiente preparado',
          'Desenvolvimento integral'
        ],
        targetAudience: 'Primeira infância',
        country: 'Itália',
        author: 'Maria Montessori',
        year: '1870-1952',
        lastUpdated: '2024-03-01',
        version: '1.6',
        category: 'Metodologias Alternativas'
      },
      8: {
        id: 8,
        title: 'Waldorf-Steiner Music',
        subtitle: 'Educação Musical Antroposófica',
        description: 'Abordagem austríaca baseada na antroposofia, com foco no desenvolvimento integral do ser humano.',
        status: 'Ativo',
        difficulty: 'Fundamental a Intermediário',
        totalLessons: 13,
        estimatedDuration: '5-6 semanas',
        keyFeatures: [
          'Desenvolvimento por setênios',
          'Música pentatônica',
          'Instrumentos naturais',
          'Integração com outras artes'
        ],
        targetAudience: 'Crianças e adolescentes',
        country: 'Áustria',
        author: 'Rudolf Steiner',
        year: '1861-1925',
        lastUpdated: '2024-03-05',
        version: '1.7',
        category: 'Metodologias Alternativas'
      },
      9: {
        id: 9,
        title: 'Laban Movement',
        subtitle: 'Movimento e Dança na Educação Musical',
        description: 'Sistema húngaro de análise do movimento aplicado à educação musical e expressão corporal.',
        status: 'Ativo',
        difficulty: 'Intermediário',
        totalLessons: 12,
        estimatedDuration: '5-6 semanas',
        keyFeatures: [
          'Análise do movimento',
          'Expressão corporal',
          'Qualidades de movimento',
          'Integração música-dança'
        ],
        targetAudience: 'Adolescentes e adultos',
        country: 'Hungria',
        author: 'Rudolf Laban',
        year: '1879-1958',
        lastUpdated: '2024-03-10',
        version: '1.4',
        category: 'Metodologias Contemporâneas'
      },
      10: {
        id: 10,
        title: 'PRESTO Project',
        subtitle: 'Ensino Digital e Tecnologia Musical',
        description: 'Projeto europeu focado na integração de tecnologias digitais no ensino musical.',
        status: 'Em Desenvolvimento',
        difficulty: 'Avançado',
        totalLessons: 8,
        estimatedDuration: '4-5 semanas',
        keyFeatures: [
          'Tecnologia educacional',
          'Plataformas digitais',
          'Ensino à distância',
          'Inovação pedagógica'
        ],
        targetAudience: 'Professores e estudantes avançados',
        country: 'União Europeia',
        author: 'Consórcio PRESTO',
        year: '2018-2022',
        lastUpdated: '2024-03-15',
        version: '0.9',
        category: 'Inovação & Tecnologia'
      },
      11: {
        id: 11,
        title: 'Experiências Brasileiras',
        subtitle: 'Inovações Nacionais em Educação Musical',
        description: 'Compilação das principais experiências inovadoras em educação musical desenvolvidas no Brasil.',
        status: 'Ativo',
        difficulty: 'Intermediário',
        totalLessons: 15,
        estimatedDuration: '6-7 semanas',
        keyFeatures: [
          'Cultura musical brasileira',
          'Metodologias nacionais',
          'Projetos sociais',
          'Diversidade regional'
        ],
        targetAudience: 'Professores brasileiros',
        country: 'Brasil',
        author: 'Diversos educadores',
        year: '1990-2024',
        lastUpdated: '2024-03-20',
        version: '2.5',
        category: 'Inovação & Tecnologia'
      },
      12: {
        id: 12,
        title: 'Referenciais Internacionais',
        subtitle: 'Propostas de Futuro para Educação Musical',
        description: 'Análise comparativa dos principais referenciais internacionais e tendências futuras.',
        status: 'Em Revisão',
        difficulty: 'Avançado',
        totalLessons: 20,
        estimatedDuration: '8-10 semanas',
        keyFeatures: [
          'Análise comparativa',
          'Tendências globais',
          'Pesquisas recentes',
          'Projeções futuras'
        ],
        targetAudience: 'Pesquisadores e gestores',
        country: 'Internacional',
        author: 'Comitê Internacional',
        year: '2020-2024',
        lastUpdated: '2024-04-01',
        version: '1.2',
        category: 'Implementação & Prática'
      },
      13: {
        id: 13,
        title: 'Proposta Curricular Recomendada',
        subtitle: 'Roadmap para Implementação',
        description: 'Proposta estruturada de currículo musical com roadmap detalhado para implementação institucional.',
        status: 'Ativo',
        difficulty: 'Avançado',
        totalLessons: 25,
        estimatedDuration: '10-12 semanas',
        keyFeatures: [
          'Estrutura curricular',
          'Cronograma de implementação',
          'Recursos necessários',
          'Avaliação contínua'
        ],
        targetAudience: 'Gestores educacionais',
        country: 'Brasil',
        author: 'Equipe Nipo School',
        year: '2024',
        lastUpdated: '2024-04-05',
        version: '3.0',
        category: 'Implementação & Prática'
      },
      14: {
        id: 14,
        title: 'Modelos de Sequência Didática',
        subtitle: 'Exemplos Práticos e Materiais Prontos',
        description: 'Coleção de sequências didáticas prontas com materiais de apoio para aplicação imediata.',
        status: 'Ativo',
        difficulty: 'Intermediário',
        totalLessons: 22,
        estimatedDuration: '9-10 semanas',
        keyFeatures: [
          'Planos de aula prontos',
          'Materiais didáticos',
          'Atividades práticas',
          'Avaliação integrada'
        ],
        targetAudience: 'Professores de música',
        country: 'Brasil',
        author: 'Equipe Pedagógica',
        year: '2024',
        lastUpdated: '2024-04-10',
        version: '2.8',
        category: 'Implementação & Prática'
      },
      15: {
        id: 15,
        title: 'Avaliação, Portfólio e Impacto',
        subtitle: 'Sistemas de Avaliação Musical',
        description: 'Metodologias de avaliação, criação de portfólios musicais e medição de impacto educacional.',
        status: 'Ativo',
        difficulty: 'Avançado',
        totalLessons: 18,
        estimatedDuration: '7-8 semanas',
        keyFeatures: [
          'Sistemas de avaliação',
          'Portfólio musical',
          'Métricas de impacto',
          'Acompanhamento longitudinal'
        ],
        targetAudience: 'Avaliadores e pesquisadores',
        country: 'Brasil',
        author: 'Núcleo de Avaliação',
        year: '2024',
        lastUpdated: '2024-04-15',
        version: '1.9',
        category: 'Implementação & Prática'
      },
      16: {
        id: 16,
        title: 'Documentos Institucionais',
        subtitle: 'Fichas, Modelos e Materiais para Editais',
        description: 'Conjunto completo de documentos, fichas técnicas e modelos para projetos institucionais.',
        status: 'Ativo',
        difficulty: 'Intermediário a Avançado',
        totalLessons: 16,
        estimatedDuration: '6-7 semanas',
        keyFeatures: [
          'Modelos de projeto',
          'Fichas técnicas',
          'Documentação legal',
          'Templates para editais'
        ],
        targetAudience: 'Gestores e coordenadores',
        country: 'Brasil',
        author: 'Departamento Legal',
        year: '2024',
        lastUpdated: '2024-05-01',
        version: '2.1',
        category: 'Implementação & Prática'
      }
    };

    // Estatísticas simuladas realísticas para todos os capítulos (incluindo 0)
    const statsData = {
      0: { totalStudents: 487, activeStudents: 465, completionRate: 95, avgProgress: 92, teachersUsing: 58 },
      1: { totalStudents: 156, activeStudents: 142, completionRate: 78, avgProgress: 65, teachersUsing: 12 },
      2: { totalStudents: 203, activeStudents: 189, completionRate: 82, avgProgress: 71, teachersUsing: 18 },
      3: { totalStudents: 134, activeStudents: 121, completionRate: 75, avgProgress: 68, teachersUsing: 15 },
      4: { totalStudents: 89, activeStudents: 78, completionRate: 85, avgProgress: 72, teachersUsing: 8 },
      5: { totalStudents: 167, activeStudents: 152, completionRate: 73, avgProgress: 64, teachersUsing: 14 },
      6: { totalStudents: 95, activeStudents: 84, completionRate: 79, avgProgress: 69, teachersUsing: 11 },
      7: { totalStudents: 112, activeStudents: 101, completionRate: 81, avgProgress: 74, teachersUsing: 9 },
      8: { totalStudents: 87, activeStudents: 79, completionRate: 76, avgProgress: 67, teachersUsing: 7 },
      9: { totalStudents: 76, activeStudents: 68, completionRate: 88, avgProgress: 79, teachersUsing: 6 },
      10: { totalStudents: 45, activeStudents: 38, completionRate: 65, avgProgress: 52, teachersUsing: 4 },
      11: { totalStudents: 198, activeStudents: 176, completionRate: 83, avgProgress: 75, teachersUsing: 22 },
      12: { totalStudents: 67, activeStudents: 58, completionRate: 71, avgProgress: 61, teachersUsing: 8 },
      13: { totalStudents: 142, activeStudents: 128, completionRate: 77, avgProgress: 69, teachersUsing: 16 },
      14: { totalStudents: 289, activeStudents: 267, completionRate: 86, avgProgress: 78, teachersUsing: 35 },
      15: { totalStudents: 93, activeStudents: 84, completionRate: 74, avgProgress: 66, teachersUsing: 12 },
      16: { totalStudents: 127, activeStudents: 115, completionRate: 80, avgProgress: 71, teachersUsing: 14 },
      17: { totalStudents: 245, activeStudents: 223, completionRate: 89, avgProgress: 82, teachersUsing: 28 },
      18: { totalStudents: 156, activeStudents: 141, completionRate: 78, avgProgress: 70, teachersUsing: 19 },
      19: { totalStudents: 78, activeStudents: 69, completionRate: 72, avgProgress: 63, teachersUsing: 9 },
      20: { totalStudents: 312, activeStudents: 298, completionRate: 91, avgProgress: 85, teachersUsing: 42 },
      21: { totalStudents: 34, activeStudents: 28, completionRate: 58, avgProgress: 45, teachersUsing: 3 },
      22: { totalStudents: 52, activeStudents: 46, completionRate: 67, avgProgress: 54, teachersUsing: 5 },
      23: { totalStudents: 187, activeStudents: 169, completionRate: 84, avgProgress: 76, teachersUsing: 21 }
    };

    setTimeout(() => {
      const data = adminData[parseInt(chapterId)];
      const statsInfo = statsData[parseInt(chapterId)] || {
        totalStudents: Math.floor(Math.random() * 200) + 50,
        activeStudents: Math.floor(Math.random() * 180) + 40,
        completionRate: Math.floor(Math.random() * 30) + 60,
        avgProgress: Math.floor(Math.random() * 40) + 45,
        teachersUsing: Math.floor(Math.random() * 20) + 5
      };
      
      if (data) {
        setMethodology(data);
        setStats(statsInfo);
      } else {
        // Para capítulos não definidos, criar dados genéricos
        setMethodology({
          id: parseInt(chapterId),
          title: `Capítulo ${chapterId}`,
          subtitle: 'Conteúdo em Desenvolvimento',
          description: 'Este capítulo está sendo desenvolvido e em breve terá conteúdo completo disponível.',
          status: 'Em Desenvolvimento',
          difficulty: 'A definir',
          totalLessons: 0,
          estimatedDuration: 'A definir',
          keyFeatures: ['Conteúdo em preparação'],
          targetAudience: 'A definir',
          country: 'Brasil',
          author: 'Equipe Nipo School',
          year: '2024',
          lastUpdated: new Date().toISOString().split('T')[0],
          version: '0.1',
          category: 'Em Desenvolvimento'
        });
        setStats(statsInfo);
      }
      setLoading(false);
    }, 500);
  }, [chapterId]);

  // Função para determinar cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Em Desenvolvimento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Revisão':
        return 'bg-blue-100 text-blue-800';
      case 'Em Pesquisa':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para determinar cor da categoria
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Metodologias Tradicionais':
        return 'bg-blue-500';
      case 'Metodologias Contemporâneas':
        return 'bg-green-500';
      case 'Metodologias Alternativas':
        return 'bg-purple-500';
      case 'Inovação & Tecnologia':
        return 'bg-orange-500';
      case 'Implementação & Prática':
        return 'bg-red-500';
      case 'Fundamentos':
        return 'bg-indigo-500';
      case 'Pesquisa & Desenvolvimento':
        return 'bg-pink-500';
      case 'Metodologias Especializadas':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados administrativos...</p>
        </div>
      </div>
    );
  }

  if (!methodology) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Dados administrativos não encontrados</p>
          <button 
            onClick={() => navigate('/admin/curriculum')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar ao Currículo Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NipoHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Cabeçalho Responsivo */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/admin/curriculum')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Currículo</span>
            </button>
            
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                {methodology.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Capítulo {methodology.id} • {methodology.subtitle}
              </p>
            </div>
          </div>
          
          {/* Tags e Ações */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(methodology.status)}`}>
                {methodology.status}
              </span>
              {methodology.category && (
                <span className={`px-3 py-1 ${getCategoryColor(methodology.category)} text-white rounded-full text-sm font-medium`}>
                  {methodology.category}
                </span>
              )}
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {methodology.difficulty}
              </span>
            </div>
            
            <button
              onClick={() => navigate(`/admin/curriculum/edit/${chapterId}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto"
            >
              <Edit className="w-4 h-4" />
              <span>Editar</span>
            </button>
          </div>
        </div>

        {/* Banner especial para Princípios Alpha */}
        {methodology.id === 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Capítulo Fundamental</h3>
                  <p className="text-white text-opacity-90">Base metodológica de todo o currículo</p>
                </div>
              </div>
              <p className="text-white text-opacity-95 leading-relaxed">
                Este é o DNA da Nipo School! Os Princípios Alpha permeiam todos os outros capítulos, 
                fornecendo a base filosófica e metodológica que une tradição e inovação, 
                presencial e digital, individual e coletivo.
              </p>
            </div>
          </div>
        )}

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aulas</p>
                <p className="text-xl font-bold text-gray-800">{methodology.totalLessons}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alunos</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-xl font-bold text-gray-800">{stats.activeStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conclusão</p>
                <p className="text-xl font-bold text-gray-800">{stats.completionRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Professores</p>
                <p className="text-xl font-bold text-gray-800">{stats.teachersUsing}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-center">Ver Alunos</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-center">Relatórios</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-center">Preview</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Share className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-center">Compartilhar</span>
            </button>
          </div>
        </div>

        {/* Layout Principal - Coluna Única */}
        <div className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Informações da Metodologia
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">País</p>
                <p className="font-semibold text-sm">{methodology.country}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Criador</p>
                <p className="font-semibold text-sm">{methodology.author}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Período</p>
                <p className="font-semibold text-sm">{methodology.year}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Duração</p>
                <p className="font-semibold text-sm">{methodology.estimatedDuration}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-700">{methodology.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Características Principais</h3>
                {methodology.id === 0 ? (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4">
                    <p className="text-sm text-indigo-700 font-medium mb-4">Os 8 Pilares dos Princípios Alpha:</p>
                    <div className="grid grid-cols-1 gap-3">
                      {methodology.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <span className="text-gray-800 font-medium">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {methodology.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-800 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Público-alvo</h3>
                  <p className="text-gray-700 text-sm">{methodology.targetAudience}</p>
                </div>
                {methodology.category && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Categoria</h3>
                    <span className={`inline-block px-2 py-1 ${getCategoryColor(methodology.category)} text-white rounded text-sm`}>
                      {methodology.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Componente especial para Princípios Alpha */}
          {methodology.id === 0 && (
            <AlphaPrinciplesDetail />
          )}

          {/* Template detalhado para outras metodologias */}
          {methodology.id !== 0 && (
            <MethodologyDetailTemplate methodology={methodology} />
          )}

          {/* Informações Técnicas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
              <Settings className="w-5 h-5 text-gray-500" />
              Informações Técnicas
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Versão</p>
                <p className="text-lg font-bold text-gray-800">v{methodology.version}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Atualização</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(methodology.lastUpdated).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Sistema</p>
                <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                  <CheckCircle className="w-3 h-3" />
                  Ativo
                </span>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Progresso</p>
                <p className="text-lg font-bold text-purple-600">{stats.avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMethodologyView;