// Script para verificar e popular dados de teste no banco
import { supabase } from '../shared/lib/supabase/supabaseClient.js';

const testarEPopularDados = async () => {
  console.log('🔍 Verificando dados existentes...');
  
  try {
    // 1. Verificar instrumentos básicos
    const { data: instrumentos, error: errorInstrumentos } = await supabase
      .from('instrumentos')
      .select('*')
      .limit(5);
      
    console.log('📊 Instrumentos encontrados:', instrumentos?.length || 0);
    if (instrumentos?.length > 0) {
      console.log('🎵 Primeiro instrumento:', instrumentos[0]);
    }

    // 2. Verificar se existem dados nas tabelas relacionadas
    if (instrumentos?.length > 0) {
      const instrumentoId = instrumentos[0].id;
      
      // Verificar sons
      const { data: sons } = await supabase
        .from('instrumento_sons')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🎵 Sons encontrados:', sons?.length || 0);

      // Verificar mídias
      const { data: midias } = await supabase
        .from('instrumento_midias')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('📸 Mídias encontradas:', midias?.length || 0);

      // Verificar curiosidades
      const { data: curiosidades } = await supabase
        .from('instrumento_curiosidades')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('💡 Curiosidades encontradas:', curiosidades?.length || 0);

      // Verificar técnicas
      const { data: tecnicas } = await supabase
        .from('instrumento_tecnicas')
        .select('*')
        .eq('instrumento_id', instrumentoId);
        
      console.log('🎯 Técnicas encontradas:', tecnicas?.length || 0);

      // Se não há dados, vamos criar alguns exemplos
      if ((sons?.length || 0) === 0) {
        console.log('📝 Criando sons de exemplo...');
        
        const sonsExemplo = [
          {
            instrumento_id: instrumentoId,
            nota_musical: 'Dó Central',
            tecnica: 'Pizzicato',
            dinamica: 'Forte',
            artista_performer: 'Exemplo Artista',
            audio_url: null,
            duracao_segundos: 3,
            nivel: 'iniciante',
            ativo: true
          },
          {
            instrumento_id: instrumentoId,
            nota_musical: 'Sol',
            tecnica: 'Arco',
            dinamica: 'Piano',
            artista_performer: 'Outro Artista',
            audio_url: null,
            duracao_segundos: 5,
            nivel: 'intermediario',
            ativo: true
          }
        ];

        const { error: errorSons } = await supabase
          .from('instrumento_sons')
          .insert(sonsExemplo);

        if (errorSons) {
          console.error('❌ Erro ao inserir sons:', errorSons);
        } else {
          console.log('✅ Sons de exemplo criados!');
        }
      }

      if ((curiosidades?.length || 0) === 0) {
        console.log('📝 Criando curiosidades de exemplo...');
        
        const curiosidadesExemplo = [
          {
            instrumento_id: instrumentoId,
            titulo: 'Origem Histórica',
            conteudo: 'Este instrumento tem uma rica história que remonta a séculos passados.',
            categoria: 'História',
            fonte: 'Enciclopédia Musical',
            ativo: true
          },
          {
            instrumento_id: instrumentoId,
            titulo: 'Curiosidade Técnica',
            conteudo: 'Uma técnica especial permite criar sons únicos com este instrumento.',
            categoria: 'Técnica',
            fonte: 'Manual Técnico',
            ativo: true
          }
        ];

        const { error: errorCuriosidades } = await supabase
          .from('instrumento_curiosidades')
          .insert(curiosidadesExemplo);

        if (errorCuriosidades) {
          console.error('❌ Erro ao inserir curiosidades:', errorCuriosidades);
        } else {
          console.log('✅ Curiosidades de exemplo criadas!');
        }
      }

      if ((midias?.length || 0) === 0) {
        console.log('📝 Criando mídias de exemplo...');
        
        const midiasExemplo = [
          {
            instrumento_id: instrumentoId,
            titulo: 'Demonstração Básica',
            descricao: 'Vídeo demonstrando técnicas básicas do instrumento.',
            tipo: 'video',
            categoria: 'Tutorial',
            nivel: 'iniciante',
            url: '#',
            visualizacoes: 0,
            ativo: true
          },
          {
            instrumento_id: instrumentoId,
            titulo: 'Galeria de Imagens',
            descricao: 'Imagens detalhadas do instrumento.',
            tipo: 'imagem',
            categoria: 'Referência',
            nivel: 'todos',
            url: '#',
            visualizacoes: 0,
            ativo: true
          }
        ];

        const { error: errorMidias } = await supabase
          .from('instrumento_midias')
          .insert(midiasExemplo);

        if (errorMidias) {
          console.error('❌ Erro ao inserir mídias:', errorMidias);
        } else {
          console.log('✅ Mídias de exemplo criadas!');
        }
      }

      if ((tecnicas?.length || 0) === 0) {
        console.log('📝 Criando técnicas de exemplo...');
        
        const tecnicasExemplo = [
          {
            instrumento_id: instrumentoId,
            nome: 'Postura Básica',
            descricao: 'Como segurar e posicionar o instrumento corretamente.',
            nivel: 'iniciante',
            tipo_tecnica: 'Fundamental',
            grupo_tecnico: 'Básico',
            ordem_aprendizado: 1,
            tempo_pratica_recomendado: 15,
            ativo: true
          },
          {
            instrumento_id: instrumentoId,
            nome: 'Técnica Avançada',
            descricao: 'Técnicas mais complexas para músicos experientes.',
            nivel: 'avancado',
            tipo_tecnica: 'Avançada',
            grupo_tecnico: 'Especializado',
            ordem_aprendizado: 10,
            tempo_pratica_recomendado: 30,
            ativo: true
          }
        ];

        const { error: errorTecnicas } = await supabase
          .from('instrumento_tecnicas')
          .insert(tecnicasExemplo);

        if (errorTecnicas) {
          console.error('❌ Erro ao inserir técnicas:', errorTecnicas);
        } else {
          console.log('✅ Técnicas de exemplo criadas!');
        }
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
};

// Executar teste
testarEPopularDados();