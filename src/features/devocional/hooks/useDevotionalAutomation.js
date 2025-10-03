import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase/supabase';

/**
 * Hook para gerenciar a automação dos devocionais semanais
 * Responsável por criar automaticamente novos devocionais baseados na semana
 */
export const useDevotionalAutomation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Templates de devocionais por categoria para automação
  const devotionalTemplates = [
    {
      category: 'inspiracao',
      theme: 'Inspiração Musical',
      templates: [
        {
          title: 'A Partitura da Vida',
          bible_verse: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.',
          bible_reference: 'Jeremias 29:11',
          content: `Assim como uma música tem sua partitura cuidadosamente escrita, nossa vida tem um propósito divino cuidadosamente planejado. Cada nota, cada pausa, cada crescendo em nossa jornada musical da vida tem seu lugar e seu tempo.

Quando praticamos um instrumento, às vezes não entendemos por que certas passagens são difíceis, mas sabemos que o compositor tinha uma visão completa da obra. Da mesma forma, podemos confiar que Deus tem uma visão completa de nossa história.

Hoje, ao estudar música, lembre-se de que você está aprendendo não apenas técnicas e teorias, mas desenvolvendo disciplina, paciência e perseverança - qualidades que se refletem em todas as áreas da vida.`,
          reflection: 'Que "notas" difíceis em minha vida posso ver hoje com uma perspectiva de crescimento?',
          prayer: 'Senhor, ajuda-me a confiar em Tua partitura para minha vida, mesmo quando não entendo todas as "notas difíceis". Que minha música reflita Tua glória. Amém.',
          music_theme: '🎼 Harmonia da Confiança',
          music_content: 'Escolha uma música que transmita paz e esperança. Pratique-a com intenção, pensando em como cada nota contribui para a beleza do todo.'
        },
        {
          title: 'O Ritmo da Perseverança',
          bible_verse: 'E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não houvermos desfalecido.',
          bible_reference: 'Gálatas 6:9',
          content: `No estudo musical, o ritmo é fundamental. Sem ele, mesmo a mais bela melodia perde seu impacto. A perseverança é como o ritmo em nossa vida espiritual e educacional - ela mantém tudo no compasso certo.

Aprender um instrumento exige prática diária, repetição, e sim, às vezes pode ser cansativo. Mas cada pequeno progresso, cada técnica dominada, cada música aprendida é um passo em direção ao objetivo maior.

Não desistam dos seus sonhos musicais, mesmo quando parecem difíceis. O tempo de Deus é perfeito, e Ele recompensa aqueles que perseveram com dedicação e amor.`,
          reflection: 'Onde preciso aplicar mais perseverança em meus estudos musicais hoje?',
          prayer: 'Deus, dá-me forças para continuar praticando e estudando, mesmo quando for desafiador. Que eu veja cada dificuldade como uma oportunidade de crescer. Amém.',
          music_theme: '🥁 Batida Constante',
          music_content: 'Pratique exercícios de ritmo com metrônomo. Comece devagar e aumente gradualmente, lembrando que a consistência é mais importante que a velocidade.'
        }
      ]
    },
    {
      category: 'gratidao',
      theme: 'Gratidão e Louvor',
      templates: [
        {
          title: 'Sinfonia de Gratidão',
          bible_verse: 'Cantai ao Senhor com ações de graças; entoai louvores com harpa ao nosso Deus.',
          bible_reference: 'Salmos 147:7',
          content: `A gratidão é como uma sinfonia que ressoa em nosso coração. Quando somos gratos, nossa música interior se torna mais rica, mais bela, mais harmoniosa.

Cada oportunidade de estudar música é um presente. Cada professor que nos ensina, cada colega que pratica conosco, cada instrumento que tocamos - tudo isso merece nossa gratidão.

Hoje, ao praticar, ao estudar, ao fazer música, faça-o com um coração grato. Permita que essa gratidão transforme sua prática em um ato de adoração.`,
          reflection: 'Por quais aspectos de minha jornada musical posso ser grato hoje?',
          prayer: 'Pai, obrigado por cada dom musical que me deste. Que minha música seja sempre um reflexo da gratidão que sinto. Amém.',
          music_theme: '🎵 Melodia de Gratidão',
          music_content: 'Escolha uma música de louvor e pratique-a dedicando cada frase musical a algo pelo qual você é grato.'
        }
      ]
    },
    {
      category: 'servico',
      theme: 'Música e Serviço',
      templates: [
        {
          title: 'Instrumentos de Bênção',
          bible_verse: 'Cada um administre aos outros o dom como recebeu, como bons despenseiros da multiforme graça de Deus.',
          bible_reference: '1 Pedro 4:10',
          content: `Nossa habilidade musical não é apenas para nosso próprio prazer - é um presente que podemos compartilhar com outros. Quando usamos nossos talentos musicais para servir, nos tornamos canais da graça divina.

Seja tocando na igreja, ensinando uma criança, participando de um coral, ou simplesmente trazendo alegria através da música, estamos cumprindo um propósito maior.

Hoje, pense em como você pode usar sua música para abençoar alguém. Talvez seja uma canção para um amigo triste, uma apresentação para a família, ou uma participação especial na comunidade.`,
          reflection: 'Como posso usar meus dons musicais para servir outras pessoas esta semana?',
          prayer: 'Senhor, que minha música seja sempre um instrumento de bênção. Mostra-me oportunidades de usar meus talentos para servir e edificar outros. Amém.',
          music_theme: '🤝 Música Compartilhada',
          music_content: 'Ensine uma música simples a alguém ou toque algo especial para uma pessoa querida. Observe como a música pode ser uma ponte de amor e conexão.'
        }
      ]
    }
  ];

  // Função para obter o início da semana atual
  const getWeekStart = (date = new Date()) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Função para verificar se já existe devocional para a semana atual
  const checkWeeklyDevotional = async () => {
    try {
      const weekStart = getWeekStart();
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const { data: existingDevotionals } = await supabase
        .from('devotional_content')
        .select('id, published_date, title')
        .gte('published_date', weekStart.toISOString().split('T')[0])
        .lte('published_date', weekEnd.toISOString().split('T')[0])
        .eq('is_active', true);

      return existingDevotionals || [];
    } catch (error) {
      console.error('Erro ao verificar devocionais da semana:', error);
      setError('Erro ao verificar devocionais existentes');
      return [];
    }
  };

  // Função para criar devocional semanal automaticamente
  const createWeeklyDevotional = async (forceCreate = false) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Verificar se já existe devocional para esta semana
      const existingDevotionals = await checkWeeklyDevotional();
      
      if (existingDevotionals.length > 0 && !forceCreate) {
        return {
          success: true,
          message: 'Devocional da semana já existe',
          devotional: existingDevotionals[0]
        };
      }

      // Selecionar template aleatório
      const categoryTemplates = devotionalTemplates[Math.floor(Math.random() * devotionalTemplates.length)];
      const template = categoryTemplates.templates[Math.floor(Math.random() * categoryTemplates.templates.length)];

      // Calcular data para segunda-feira da semana atual
      const weekStart = getWeekStart();
      
      // Criar novo devocional baseado no template
      const newDevotional = {
        title: template.title,
        bible_verse: template.bible_verse,
        bible_reference: template.bible_reference,
        content: template.content,
        reflection: template.reflection,
        prayer: template.prayer,
        music_theme: template.music_theme,
        music_content: template.music_content,
        category: categoryTemplates.category,
        published_date: weekStart.toISOString().split('T')[0],
        is_active: true,
        created_at: new Date().toISOString(),
        // Adicionar metadados para automação
        is_automated: true,
        automation_week: `${weekStart.getFullYear()}-W${Math.ceil((weekStart - new Date(weekStart.getFullYear(), 0, 1)) / 604800000)}`
      };

      const { data, error } = await supabase
        .from('devotional_content')
        .insert([newDevotional])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Devocional semanal criado com sucesso',
        devotional: data
      };

    } catch (error) {
      console.error('Erro ao criar devocional semanal:', error);
      setError('Erro ao criar devocional automático');
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para agendar criação de devocional para próxima semana
  const scheduleNextWeekDevotional = async () => {
    try {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekStart = getWeekStart(nextWeek);

      // Verificar se já existe devocional agendado
      const { data: scheduled } = await supabase
        .from('devotional_content')
        .select('id')
        .eq('published_date', nextWeekStart.toISOString().split('T')[0])
        .eq('is_active', true);

      if (scheduled && scheduled.length > 0) {
        return { success: true, message: 'Devocional já agendado para próxima semana' };
      }

      // Criar devocional para próxima semana
      const categoryTemplates = devotionalTemplates[Math.floor(Math.random() * devotionalTemplates.length)];
      const template = categoryTemplates.templates[Math.floor(Math.random() * categoryTemplates.templates.length)];

      const scheduledDevotional = {
        title: template.title,
        bible_verse: template.bible_verse,
        bible_reference: template.bible_reference,
        content: template.content,
        reflection: template.reflection,
        prayer: template.prayer,
        music_theme: template.music_theme,
        music_content: template.music_content,
        category: categoryTemplates.category,
        published_date: nextWeekStart.toISOString().split('T')[0],
        is_active: true,
        is_automated: true,
        automation_week: `${nextWeekStart.getFullYear()}-W${Math.ceil((nextWeekStart - new Date(nextWeekStart.getFullYear(), 0, 1)) / 604800000)}`
      };

      const { data, error } = await supabase
        .from('devotional_content')
        .insert([scheduledDevotional])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Devocional agendado para próxima semana',
        devotional: data
      };

    } catch (error) {
      console.error('Erro ao agendar devocional:', error);
      return { success: false, error: error.message };
    }
  };

  // Auto-execução na inicialização
  useEffect(() => {
    const initializeWeeklyDevotional = async () => {
      await createWeeklyDevotional();
    };

    initializeWeeklyDevotional();
  }, []);

  return {
    isProcessing,
    error,
    createWeeklyDevotional,
    scheduleNextWeekDevotional,
    checkWeeklyDevotional,
    devotionalTemplates
  };
};