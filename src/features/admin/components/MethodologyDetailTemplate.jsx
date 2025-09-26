import React, { useState } from 'react';
import { 
  Star, 
  BookOpen, 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  Heart, 
  Globe, 
  Lightbulb, 
  Music, 
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const MethodologyDetailTemplate = ({ methodology }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Função para gerar integração Alpha específica por metodologia
  const getAlphaIntegration = (methodologyId) => {
    const integrations = {
      1: { // Orff Schulwerk
        challenge: 'Criar composições rítmicas com instrumentos Orff',
        peerLearning: 'Grupos colaborativos de improvisação musical',
        technology: 'Gravação de performances com instrumentos Orff'
      },
      2: { // Suzuki
        challenge: 'Escuta diária e registro de progresso no app',
        peerLearning: 'Masterclasses e apresentações entre alunos',
        technology: 'Acompanhamento parental através da plataforma'
      },
      3: { // Kodály
        challenge: 'Desafios semanais de solfejo e manossolfa',
        peerLearning: 'Coros colaborativos e ensino mútuo',
        technology: 'Apps de treino auditivo e solfejo digital'
      },
      4: { // Musical Futures
        challenge: 'Formação de bandas e composição original',
        peerLearning: 'Aprendizagem entre pares através de imitação',
        technology: 'Gravação e produção musical colaborativa'
      },
      5: { // Dalcroze
        challenge: 'Improvisação corporal gravada em vídeo',
        peerLearning: 'Dinâmicas de movimento em grupos',
        technology: 'Análise de movimento com feedback digital'
      },
      6: { // Gordon
        challenge: 'Desenvolvimento da audiação através de exercícios',
        peerLearning: 'Reconhecimento de padrões em grupos',
        technology: 'Plataformas de treino de audiação personalizada'
      },
      7: { // Montessori
        challenge: 'Exploração autodidata de materiais musicais',
        peerLearning: 'Ensino mútuo através de descobertas',
        technology: 'Documentação digital das descobertas musicais'
      },
      8: { // Waldorf
        challenge: 'Criação de instrumentos artesanais',
        peerLearning: 'Celebrações sazonais comunitárias',
        technology: 'Registro digital de festivais e apresentações'
      },
      9: { // Laban
        challenge: 'Análise e criação de sequências de movimento',
        peerLearning: 'Improvisação coletiva e feedback corporal',
        technology: 'Análise de movimento com ferramentas digitais'
      },
      10: { // PRESTO
        challenge: 'Projetos musicais com tecnologia avançada',
        peerLearning: 'Colaboração online entre diferentes países',
        technology: 'Plataformas educacionais musicais inovadoras'
      },
      11: { // Experiências Brasileiras
        challenge: 'Projetos comunitários com música brasileira',
        peerLearning: 'Intercâmbio entre diferentes regiões',
        technology: 'Mapeamento digital da diversidade musical nacional'
      },
      12: { // Referenciais Internacionais
        challenge: 'Análise comparativa de tendências globais',
        peerLearning: 'Comunidades internacionais de educadores',
        technology: 'Plataformas globais de compartilhamento'
      },
      13: { // Proposta Curricular
        challenge: 'Desenvolvimento curricular colaborativo',
        peerLearning: 'Grupos de implementação institucional',
        technology: 'Sistemas de gestão curricular digital'
      },
      14: { // Modelos de Sequência Didática
        challenge: 'Criação e adaptação de planos de aula estruturados',
        peerLearning: 'Comunidades de educadores compartilhando práticas',
        technology: 'Plataformas colaborativas de desenvolvimento de materiais'
      },
      15: { // Avaliação e Portfolio
        challenge: 'Desenvolvimento de instrumentos de avaliação inovadores',
        peerLearning: 'Grupos de pesquisa sobre avaliação educacional',
        technology: 'Sistemas digitais de portfolio e análise de dados'
      },
      16: { // Documentos Institucionais
        challenge: 'Criação de documentação técnica eficiente',
        peerLearning: 'Redes de gestores compartilhando boas práticas',
        technology: 'Sistemas integrados de gestão documental'
      },
      17: { // Capacitação Docente
        challenge: 'Programas de desenvolvimento profissional estruturados',
        peerLearning: 'Comunidades de prática e mentoria entre educadores',
        technology: 'Plataformas de educação continuada e certificação'
      },
      18: { // Adaptação ONGs/Igrejas
        challenge: 'Projetos musicais adaptados para contextos comunitários',
        peerLearning: 'Redes de organizações compartilhando experiências',
        technology: 'Recursos digitais de baixo custo para educação comunitária'
      },
      19: { // Comunicação e Engajamento
        challenge: 'Campanhas de engajamento e comunicação estratégica',
        peerLearning: 'Comunidades de comunicadores educacionais',
        technology: 'Ferramentas digitais de comunicação e engajamento'
      }
    };

    return integrations[methodologyId] || {
      challenge: 'Conteúdo em desenvolvimento',
      peerLearning: 'Atividades colaborativas em planejamento',
      technology: 'Recursos digitais em preparação'
    };
  };

  // Função para gerar conteúdo baseado na metodologia
  const getMethodologyContent = () => {
    switch (methodology.id) {
      case 1: // Orff Schulwerk
        return {
          principles: [
            {
              title: 'Música Elementar',
              description: 'Integração natural de música, movimento, dança e linguagem como uma unidade',
              icon: Music,
              color: 'bg-blue-500'
            },
            {
              title: 'Instrumentarium Orff',
              description: 'Uso de instrumentos de percussão e xilofones especialmente desenvolvidos',
              icon: Award,
              color: 'bg-green-500'
            },
            {
              title: 'Improvisação Criativa',
              description: 'Desenvolvimento da criatividade através da improvisação musical livre',
              icon: Zap,
              color: 'bg-purple-500'
            },
            {
              title: 'Aprendizagem Corporal',
              description: 'Vivência musical através do movimento corporal e expressão física',
              icon: Users,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Jogos rítmicos com instrumentos de percussão',
            'Composição coletiva usando escalas pentatônicas',
            'Integração de música com movimento corporal',
            'Desenvolvimento gradual da leitura musical'
          ],
          resources: [
            'Instrumentos Orff (xilofones, metalofones)',
            'Material rítmico diversificado',
            'Repertório folclórico tradicional',
            'Partituras adaptadas para iniciantes'
          ]
        };
      
      case 2: // Método Suzuki
        return {
          principles: [
            {
              title: 'Língua Materna Musical',
              description: 'Aprender música como se aprende a falar - naturalmente e por imitação',
              icon: BookOpen,
              color: 'bg-red-500'
            },
            {
              title: 'Início Precoce',
              description: 'Começar o aprendizado musical na primeira infância',
              icon: Star,
              color: 'bg-blue-500'
            },
            {
              title: 'Envolvimento Parental',
              description: 'Participação ativa dos pais no processo de aprendizagem',
              icon: Heart,
              color: 'bg-pink-500'
            },
            {
              title: 'Repertório Padronizado',
              description: 'Sequência gradual e progressiva de peças musicais',
              icon: TrendingUp,
              color: 'bg-green-500'
            }
          ],
          practicalApplications: [
            'Escuta diária do repertório antes de tocar',
            'Aulas individuais com participação dos pais',
            'Revisão constante de peças já aprendidas',
            'Participação em grupos e masterclasses'
          ],
          resources: [
            'CDs de áudio do repertório Suzuki',
            'Métodos específicos por instrumento',
            'Guias para pais e professores',
            'Partituras progressivamente organizadas'
          ]
        };

      case 3: // Método Kodály
        return {
          principles: [
            {
              title: 'Solfejo Relativo',
              description: 'Sistema de leitura musical baseado em graus da escala com dó móvel',
              icon: Music,
              color: 'bg-red-500'
            },
            {
              title: 'Manossolfa',
              description: 'Uso de sinais manuais para representar alturas musicais',
              icon: Users,
              color: 'bg-blue-500'
            },
            {
              title: 'Repertório Folclórico',
              description: 'Base no folclore nacional como material musical fundamental',
              icon: Heart,
              color: 'bg-green-500'
            },
            {
              title: 'Audição Interna',
              description: 'Desenvolvimento da capacidade de "ouvir" música mentalmente',
              icon: Lightbulb,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Ensino de solfejo através de canções folclóricas',
            'Uso sistemático de sinais manuais (manossolfa)',
            'Desenvolvimento gradual da leitura musical',
            'Prática coral como base da educação musical'
          ],
          resources: [
            'Repertório folclórico húngaro e nacional',
            'Cartazes com sinais de manossolfa',
            'Exercícios de solfejo gradual',
            'Partituras adaptadas por níveis'
          ]
        };

      case 5: // Dalcroze Euritmia
        return {
          principles: [
            {
              title: 'Euritmia Corporal',
              description: 'Expressão musical através do movimento corporal consciente e expressivo',
              icon: Users,
              color: 'bg-purple-500'
            },
            {
              title: 'Desenvolvimento Rítmico',
              description: 'Vivência do ritmo através da coordenação motora e temporal',
              icon: Target,
              color: 'bg-blue-500'
            },
            {
              title: 'Improvisação Musical',
              description: 'Criação espontânea através da integração corpo-mente-música',
              icon: Zap,
              color: 'bg-green-500'
            },
            {
              title: 'Coordenação Motora',
              description: 'Desenvolvimento da consciência corporal e espacial através da música',
              icon: TrendingUp,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Exercícios de coordenação rítmica com movimento',
            'Improvisação corporal sobre estruturas musicais',
            'Desenvolvimento da percepção temporal através do corpo',
            'Integração de movimento com elementos harmônicos'
          ],
          resources: [
            'Espaço amplo para movimento corporal',
            'Piano ou teclado para acompanhamento',
            'Objetos para exploração rítmica (lenços, bolas)',
            'Repertório musical diversificado para movimento'
          ]
        };

      case 6: // Gordon Music Learning Theory
        return {
          principles: [
            {
              title: 'Audiação Musical',
              description: 'Capacidade de ouvir e compreender música mentalmente quando ela não está fisicamente presente',
              icon: Lightbulb,
              color: 'bg-indigo-500'
            },
            {
              title: 'Padrões Tonais e Rítmicos',
              description: 'Aprendizagem através de padrões musicais sequenciais e organizados',
              icon: Target,
              color: 'bg-blue-500'
            },
            {
              title: 'Sequência de Aprendizagem',
              description: 'Progressão estruturada do simples ao complexo, seguindo etapas naturais',
              icon: TrendingUp,
              color: 'bg-green-500'
            },
            {
              title: 'Desenvolvimento Gradual',
              description: 'Construção progressiva da compreensão musical desde bebês até adultos',
              icon: Users,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Ensino de padrões tonais através da respiração e canto',
            'Desenvolvimento rítmico através de padrões corporais',
            'Sequências de aprendizagem estruturadas por idade',
            'Avaliação contínua da audiação musical dos alunos'
          ],
          resources: [
            'Sequências de padrões tonais e rítmicos',
            'Materiais específicos por faixa etária',
            'Instrumentos harmônicos (piano, violão)',
            'Sistemas de avaliação da audiação musical'
          ]
        };

      case 7: // Montessori Music
        return {
          principles: [
            {
              title: 'Materiais Sensoriais',
              description: 'Objetos musicais concretos que desenvolvem percepção auditiva e tátil',
              icon: BookOpen,
              color: 'bg-pink-500'
            },
            {
              title: 'Aprendizagem Autodidata',
              description: 'Criança como protagonista de sua própria descoberta musical',
              icon: Star,
              color: 'bg-yellow-500'
            },
            {
              title: 'Ambiente Preparado',
              description: 'Espaço organizado especificamente para exploração musical livre',
              icon: Heart,
              color: 'bg-red-500'
            },
            {
              title: 'Desenvolvimento Integral',
              description: 'Música como ferramenta para desenvolvimento cognitivo, motor e social',
              icon: Users,
              color: 'bg-green-500'
            }
          ],
          practicalApplications: [
            'Exploração livre de instrumentos musicais variados',
            'Materiais sensoriais para discriminação auditiva',
            'Atividades de vida prática integradas com música',
            'Desenvolvimento da ordem e sequência através da música'
          ],
          resources: [
            'Caixas de sons e materiais auditivos graduados',
            'Instrumentos musicais de qualidade em miniatura',
            'Sinos musicais afinados e campainhas',
            'Ambiente organizado com cantos musicais específicos'
          ]
        };

      case 8: // Waldorf-Steiner Music
        return {
          principles: [
            {
              title: 'Desenvolvimento por Setênios',
              description: 'Adaptação musical conforme fases de desenvolvimento de 7 em 7 anos',
              icon: TrendingUp,
              color: 'bg-indigo-500'
            },
            {
              title: 'Música Pentatônica',
              description: 'Uso de escalas pentatônicas para desenvolvimento harmônico natural',
              icon: Music,
              color: 'bg-blue-500'
            },
            {
              title: 'Instrumentos Naturais',
              description: 'Preferência por instrumentos feitos com materiais naturais e orgânicos',
              icon: Heart,
              color: 'bg-green-500'
            },
            {
              title: 'Integração com Artes',
              description: 'Música integrada com euritmia, pintura, teatro e outras expressões artísticas',
              icon: Users,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Cantos e rondas tradicionais na primeira infância',
            'Introdução gradual de instrumentos conforme idade',
            'Euritmia como expressão do movimento musical',
            'Festivais sazonais com música e celebração'
          ],
          resources: [
            'Flautas pentatônicas e diatônicas de madeira',
            'Liras e instrumentos de cordas naturais',
            'Repertório de canções tradicionais e sazonais',
            'Materiais para construção de instrumentos artesanais'
          ]
        };

      case 9: // Laban Movement
        return {
          principles: [
            {
              title: 'Análise do Movimento',
              description: 'Estudo sistemático das qualidades e dinâmicas do movimento corporal',
              icon: Target,
              color: 'bg-red-500'
            },
            {
              title: 'Expressão Corporal',
              description: 'Desenvolvimento da expressividade através da consciência corporal',
              icon: Users,
              color: 'bg-orange-500'
            },
            {
              title: 'Qualidades de Movimento',
              description: 'Exploração de peso, espaço, tempo e fluência no movimento musical',
              icon: Zap,
              color: 'bg-yellow-500'
            },
            {
              title: 'Integração Música-Dança',
              description: 'União orgânica entre expressão musical e movimento coreográfico',
              icon: Music,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Exercícios de consciência corporal com música',
            'Improvisação de movimento sobre diferentes estilos musicais',
            'Análise de qualidades expressivas em peças musicais',
            'Criação coreográfica colaborativa com base musical'
          ],
          resources: [
            'Espaço amplo com piso adequado para dança',
            'Sistema de som de qualidade para diferentes repertórios',
            'Objetos e materiais para exploração do movimento',
            'Espelhos para consciência corporal e visual'
          ]
        };

      case 10: // PRESTO Project
        return {
          principles: [
            {
              title: 'Tecnologia Educacional',
              description: 'Integração inovadora de ferramentas digitais no ensino musical',
              icon: Zap,
              color: 'bg-blue-500'
            },
            {
              title: 'Plataformas Digitais',
              description: 'Uso de ambientes virtuais para aprendizagem musical colaborativa',
              icon: Globe,
              color: 'bg-green-500'
            },
            {
              title: 'Ensino à Distância',
              description: 'Metodologias específicas para educação musical online e híbrida',
              icon: BookOpen,
              color: 'bg-purple-500'
            },
            {
              title: 'Inovação Pedagógica',
              description: 'Desenvolvimento de novas abordagens educacionais com base tecnológica',
              icon: Lightbulb,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Uso de aplicativos musicais educacionais interativos',
            'Gravação e edição digital de performances musicais',
            'Colaboração musical online entre diferentes países',
            'Gamificação do aprendizado musical através de tecnologia'
          ],
          resources: [
            'Tablets e dispositivos móveis para educação musical',
            'Software de produção e edição musical educacional',
            'Plataformas de videoconferência para aulas remotas',
            'Aplicativos específicos desenvolvidos pelo projeto PRESTO'
          ]
        };

      case 12: // Referenciais Internacionais
        return {
          principles: [
            {
              title: 'Análise Comparativa',
              description: 'Estudo sistemático das principais abordagens pedagógicas musicais mundiais',
              icon: Globe,
              color: 'bg-indigo-500'
            },
            {
              title: 'Tendências Globais',
              description: 'Identificação de movimentos e inovações na educação musical internacional',
              icon: TrendingUp,
              color: 'bg-blue-500'
            },
            {
              title: 'Pesquisas Recentes',
              description: 'Incorporação de descobertas científicas atuais sobre aprendizagem musical',
              icon: Lightbulb,
              color: 'bg-green-500'
            },
            {
              title: 'Projeções Futuras',
              description: 'Antecipação de desenvolvimentos futuros na educação musical global',
              icon: Target,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Análise crítica de diferentes metodologias musicais',
            'Adaptação de práticas internacionais ao contexto local',
            'Desenvolvimento de sínteses metodológicas inovadoras',
            'Participação em redes internacionais de educação musical'
          ],
          resources: [
            'Bibliografia internacional especializada',
            'Acesso a pesquisas e publicações acadêmicas',
            'Conexões com educadores musicais internacionais',
            'Plataformas de troca de experiências globais'
          ]
        };

      case 13: // Proposta Curricular Recomendada
        return {
          principles: [
            {
              title: 'Estrutura Curricular',
              description: 'Organização sistemática e progressiva dos conteúdos musicais educacionais',
              icon: BookOpen,
              color: 'bg-blue-500'
            },
            {
              title: 'Cronograma de Implementação',
              description: 'Planejamento temporal detalhado para implantação curricular efetiva',
              icon: Target,
              color: 'bg-green-500'
            },
            {
              title: 'Recursos Necessários',
              description: 'Identificação completa de materiais, espaços e profissionais requeridos',
              icon: Star,
              color: 'bg-orange-500'
            },
            {
              title: 'Avaliação Contínua',
              description: 'Sistema integrado de acompanhamento e aprimoramento curricular constante',
              icon: TrendingUp,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Desenvolvimento de currículos musicais institucionais',
            'Planejamento de implementação gradual e sustentável',
            'Capacitação de equipes para nova proposta curricular',
            'Monitoramento e ajustes contínuos do programa'
          ],
          resources: [
            'Documentos curriculares detalhados e organizados',
            'Cronogramas e ferramentas de gestão de projetos',
            'Materiais de capacitação para educadores',
            'Sistemas de avaliação e acompanhamento curricular'
          ]
        };

      case 14: // Modelos de Sequência Didática
        return {
          principles: [
            {
              title: 'Planos de Aula Estruturados',
              description: 'Templates organizados e testados para implementação imediata',
              icon: BookOpen,
              color: 'bg-green-500'
            },
            {
              title: 'Sequências Progressivas',
              description: 'Desenvolvimento gradual e estruturado das competências musicais',
              icon: TrendingUp,
              color: 'bg-blue-500'
            },
            {
              title: 'Materiais Prontos',
              description: 'Recursos pedagógicos completos e organizados por níveis',
              icon: Star,
              color: 'bg-purple-500'
            },
            {
              title: 'Exemplos Práticos',
              description: 'Cases reais de aplicação e resultados obtidos',
              icon: Target,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Implementação direta de planos de aula validados',
            'Adaptação de sequências conforme contexto específico',
            'Desenvolvimento de novas sequências baseadas nos modelos',
            'Compartilhamento de práticas exitosas entre educadores'
          ],
          resources: [
            'Banco de planos de aula organizados por temas',
            'Materiais de apoio (áudios, vídeos, partituras)',
            'Guias de adaptação e personalização',
            'Plataforma de compartilhamento entre educadores'
          ]
        };

      case 15: // Avaliação, Portfolio e Impacto
        return {
          principles: [
            {
              title: 'Avaliação Formativa',
              description: 'Metodologias diversificadas para avaliação holística do desenvolvimento',
              icon: Target,
              color: 'bg-blue-500'
            },
            {
              title: 'Portfolio Digital',
              description: 'Documentação sistemática do percurso e evolução musical',
              icon: BookOpen,
              color: 'bg-green-500'
            },
            {
              title: 'Métricas de Impacto',
              description: 'Indicadores quantitativos e qualitativos dos resultados',
              icon: TrendingUp,
              color: 'bg-purple-500'
            },
            {
              title: 'Acompanhamento Longitudinal',
              description: 'Monitoramento do desenvolvimento ao longo do tempo',
              icon: Clock,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Desenvolvimento de instrumentos de avaliação musical',
            'Criação e manutenção de portfolios digitais',
            'Coleta e análise de dados de impacto educacional',
            'Acompanhamento individualizado de estudantes'
          ],
          resources: [
            'Ferramentas digitais para portfolios',
            'Instrumentos validados de avaliação musical',
            'Sistemas de coleta e análise de dados',
            'Plataformas para acompanhamento longitudinal'
          ]
        };

      case 16: // Documentos Institucionais
        return {
          principles: [
            {
              title: 'Documentação Padronizada',
              description: 'Modelos e templates para formalização institucional',
              icon: BookOpen,
              color: 'bg-blue-500'
            },
            {
              title: 'Conformidade Legal',
              description: 'Adequação às normas e regulamentações vigentes',
              icon: Shield,
              color: 'bg-green-500'
            },
            {
              title: 'Gestão de Projetos',
              description: 'Ferramentas para elaboração e gestão de projetos educacionais',
              icon: Target,
              color: 'bg-purple-500'
            },
            {
              title: 'Materiais para Editais',
              description: 'Templates específicos para participação em editais',
              icon: Award,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Elaboração de projetos pedagógicos institucionais',
            'Criação de fichas técnicas detalhadas',
            'Desenvolvimento de propostas para editais',
            'Documentação de processos e resultados'
          ],
          resources: [
            'Templates de projetos pedagógicos',
            'Modelos de fichas técnicas',
            'Documentos para editais específicos',
            'Sistemas de gestão documental'
          ]
        };

      case 17: // Capacitação Docente
        return {
          principles: [
            {
              title: 'Formação Pedagógica',
              description: 'Desenvolvimento de competências pedagógicas específicas',
              icon: Users,
              color: 'bg-blue-500'
            },
            {
              title: 'Atualização Metodológica',
              description: 'Contato constante com inovações educacionais',
              icon: TrendingUp,
              color: 'bg-green-500'
            },
            {
              title: 'Certificação Profissional',
              description: 'Sistemas de validação e reconhecimento de competências',
              icon: Award,
              color: 'bg-purple-500'
            },
            {
              title: 'Mentoria Especializada',
              description: 'Acompanhamento personalizado por educadores experientes',
              icon: Heart,
              color: 'bg-orange-500'
            }
          ],
          practicalApplications: [
            'Cursos de formação continuada para educadores musicais',
            'Workshops práticos com novas metodologias',
            'Programas de mentoria entre educadores',
            'Certificações em diferentes abordagens pedagógicas'
          ],
          resources: [
            'Plataforma de educação continuada online',
            'Biblioteca de recursos pedagógicos especializados',
            'Rede de mentores e educadores experientes',
            'Sistemas de certificação profissional'
          ]
        };

      case 18: // Adaptação para ONGs e Igrejas
        return {
          principles: [
            {
              title: 'Adaptação Contextual',
              description: 'Flexibilização para diferentes contextos comunitários',
              icon: Users,
              color: 'bg-green-500'
            },
            {
              title: 'Recursos Otimizados',
              description: 'Estratégias eficazes com orçamento reduzido',
              icon: Target,
              color: 'bg-blue-500'
            },
            {
              title: 'Voluntariado Qualificado',
              description: 'Capacitação de voluntários para educação musical',
              icon: Heart,
              color: 'bg-red-500'
            },
            {
              title: 'Impacto Social',
              description: 'Maximização dos benefícios sociais comunitários',
              icon: TrendingUp,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Programas musicais adaptados para espaços alternativos',
            'Capacitação de líderes comunitários',
            'Desenvolvimento de projetos de baixo custo',
            'Integração com atividades comunitárias existentes'
          ],
          resources: [
            'Manuais de adaptação específicos',
            'Materiais de baixo custo',
            'Rede de apoio entre organizações',
            'Orientações para captação de recursos'
          ]
        };

      case 19: // Comunicação e Engajamento
        return {
          principles: [
            {
              title: 'Comunicação Estratégica',
              description: 'Desenvolvimento de comunicação efetiva sobre projetos educacionais',
              icon: Globe,
              color: 'bg-blue-500'
            },
            {
              title: 'Engajamento Familiar',
              description: 'Integração das famílias no processo educativo',
              icon: Heart,
              color: 'bg-red-500'
            },
            {
              title: 'Marketing Educacional',
              description: 'Promoção estratégica de programas musicais',
              icon: TrendingUp,
              color: 'bg-green-500'
            },
            {
              title: 'Redes Sociais Educativas',
              description: 'Uso consciente de plataformas digitais educacionais',
              icon: Users,
              color: 'bg-purple-500'
            }
          ],
          practicalApplications: [
            'Desenvolvimento de estratégias de comunicação institucional',
            'Criação de conteúdo educativo para redes sociais',
            'Organização de eventos de engajamento familiar',
            'Campanhas de divulgação de programas musicais'
          ],
          resources: [
            'Ferramentas de gestão de redes sociais educacionais',
            'Templates para materiais de comunicação',
            'Guias de engajamento familiar',
            'Plataformas para criação de conteúdo educativo'
          ]
        };

      // Capítulos não documentados (apenas padrão)
      default:
        return {
          principles: [
            {
              title: 'Em Desenvolvimento',
              description: 'Este capítulo está em desenvolvimento. Documentação detalhada será disponibilizada em breve.',
              icon: Star,
              color: 'bg-gray-500'
            }
          ],
          practicalApplications: [
            'Conteúdo em preparação'
          ],
          resources: [
            'Recursos serão disponibilizados conforme desenvolvimento'
          ]
        };
    }
  };

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: Star },
    { id: 'principles', name: 'Princípios', icon: Lightbulb },
    { id: 'practice', name: 'Prática', icon: Target },
    { id: 'resources', name: 'Recursos', icon: BookOpen }
  ];

  const content = getMethodologyContent();
  const alphaIntegration = getAlphaIntegration(methodology.id);

  return (
    <div className="space-y-8">
      {/* Navegação por Abas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white border-b-2 border-indigo-500'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {methodology.title}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              {methodology.subtitle}
            </p>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{methodology.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Origem</p>
                <p className="font-semibold text-gray-800">{methodology.country}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Criador</p>
                <p className="font-semibold text-gray-800">{methodology.author}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Período</p>
                <p className="font-semibold text-gray-800">{methodology.year}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Público-alvo</p>
                <p className="font-semibold text-gray-800">{methodology.targetAudience}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'principles' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Princípios Metodológicos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.principles.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${principle.color} text-white rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {principle.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Aplicações Práticas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.practicalApplications.map((application, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{application}</p>
                </div>
              ))}
            </div>

            {/* Integração com Princípios Alpha */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3 text-center">🎯 Integração Alpha</h3>
              <p className="text-center mb-4">
                Esta metodologia se integra aos Princípios Alpha através de:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <p className="font-medium">Desafios Semanais</p>
                  <p className="text-xs mt-1">{alphaIntegration.challenge}</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <p className="font-medium">Peer Learning</p>
                  <p className="text-xs mt-1">{alphaIntegration.peerLearning}</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <p className="font-medium">Tecnologia</p>
                  <p className="text-xs mt-1">{alphaIntegration.technology}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Recursos e Materiais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Materiais Necessários</h3>
                {content.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">{resource}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Recursos Digitais</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">📱 App Nipo School</h4>
                    <p className="text-sm text-gray-600">Desafios específicos desta metodologia</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">📚 Biblioteca Digital</h4>
                    <p className="text-sm text-gray-600">PDFs, vídeos e áudios especializados</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">🎵 Repertório Online</h4>
                    <p className="text-sm text-gray-600">Músicas e exercícios específicos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MethodologyDetailTemplate;