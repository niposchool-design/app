import { useState, useEffect } from 'react';

// Mapeamento dos IDs para nomes de arquivos
const fileMapping = {
  'orff-schulwerk': 'Capítulo1—Orff_Schulwerk.md',
  'metodo-suzuki': 'Capítulo2—Metodo_Suzuki.md', 
  'metodo-kodaly': 'Capítulo3—Metodo_Kodály.md',
  'musical-futures': 'Capítulo4—Musical_Futures.md',
  'dalcroze-euritmia': 'Capítulo5—Dalcroze_Euritmia.md',
  'gordon-music-learning-theory': 'Capítulo6—Gordon_Music_Learning_Theory.md',
  'waldorf-steiner': 'Capítulo7—Waldorf_Steiner.md',
  'berklee-contemporanea': 'Capítulo8—Berklee_Abordagem_Contemporanea.md',
  'lincoln-center': 'Capítulo9—LincolnCenterEducation.md',
  'presto-project': 'Capítulo10—PRESTO_Project_e_Ensino_Digital.md',
  'experiencias-brasileiras': 'Capítulo11—Experiencias_Brasileiras_Inovadoras.md'
};

export const useCurriculumContent = (methodId) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fileName = fileMapping[methodId];
        if (!fileName) {
          throw new Error('Metodologia não encontrada');
        }

        // Simular carregamento do arquivo MD
        // Em produção, isso seria uma chamada para carregar o arquivo real
        const mockContent = `
# ${fileName.replace('.md', '').replace(/Capítulo\d+—/, '').replace(/_/g, ' ')}

## 1. Introdução e Justificativa

Esta metodologia representa uma das abordagens mais importantes da educação musical mundial. 
Desenvolvida ao longo de décadas de pesquisa e prática, oferece ferramentas únicas para 
o desenvolvimento musical e humano dos estudantes.

## 2. História e Fundamentação Teórica

### 2.1 Origens e Filosofia
A metodologia surgiu em um contexto específico, respondendo às necessidades educacionais 
de sua época e região. Seus fundadores basearam-se em princípios pedagógicos sólidos 
e na observação cuidadosa do processo de aprendizagem musical.

### 2.2 Princípios Pedagógicos
- **Desenvolvimento gradual**: Progressão cuidadosa e estruturada
- **Experiência prática**: Aprendizagem através da vivência musical
- **Contexto cultural**: Valorização das tradições locais
- **Formação integral**: Música como parte do desenvolvimento humano

## 3. Aplicação Prática

### 3.1 Metodologia em Sala de Aula
A implementação desta abordagem requer preparação cuidadosa do ambiente, 
materiais adequados e formação específica dos educadores.

### 3.2 Recursos Necessários
- Instrumentos musicais apropriados
- Espaço físico adequado
- Material didático especializado
- Formação continuada dos professores

## 4. Contexto Brasileiro

### 4.1 Adaptações Necessárias
No Brasil, esta metodologia passa por adaptações importantes para 
contemplar nossa diversidade cultural e realidade socioeconômica.

### 4.2 Experiências de Sucesso
Diversos projetos brasileiros demonstram a eficácia desta abordagem 
quando adaptada adequadamente ao nosso contexto.

## 5. Críticas e Desafios

### 5.1 Limitações Identificadas
Como toda metodologia, apresenta limitações que devem ser 
reconhecidas e endereçadas na prática educacional.

### 5.2 Estratégias de Superação
Pesquisadores e educadores têm desenvolvido estratégias 
para superar as principais limitações identificadas.

## 6. Recursos e Bibliografia

### 6.1 Bibliografia Fundamental
- Obras principais dos criadores da metodologia
- Pesquisas contemporâneas
- Adaptações para diferentes contextos

### 6.2 Recursos Online
- Vídeos demonstrativos
- Materiais de apoio
- Comunidades de prática

---

*Este é um conteúdo simulado. O conteúdo real seria carregado do arquivo MD correspondente.*
        `;

        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setContent(mockContent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (methodId) {
      loadContent();
    }
  }, [methodId]);

  return { content, loading, error };
};

// Função para parsear o conteúdo MD em seções
export const parseMarkdownSections = (content) => {
  if (!content) return [];

  const sections = [];
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Nova seção
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: currentContent.join('\n').trim()
        });
      }
      
      currentSection = {
        title: line.replace('## ', '').trim(),
        level: 2
      };
      currentContent = [];
    } else if (line.startsWith('### ')) {
      // Subseção
      currentContent.push(line);
    } else {
      // Conteúdo normal
      currentContent.push(line);
    }
  }

  // Adicionar última seção
  if (currentSection) {
    sections.push({
      ...currentSection,
      content: currentContent.join('\n').trim()
    });
  }

  return sections;
};