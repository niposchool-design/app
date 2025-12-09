# 🎵 PLANEJAMENTO: Página Detalhada de Instrumento

## 📋 Objetivo
Criar uma página **COMPLETA e DIDÁTICA** que mostre TODAS as informações ricas que temos sobre cada instrumento, usando o UUID para buscar dados de 10+ tabelas relacionadas.

## 🗂️ Tabelas que vamos integrar

### 1️⃣ **instrumentos** (Tabela Principal)
- Nome, categoria, descrição
- História completa
- Origem, família instrumental
- Material principal
- Técnica de produção de som
- Dificuldade de aprendizado
- **anatomia_partes** (JSON com partes do instrumento)
- **curiosidades** (JSON array - mas também tem tabela separada!)

### 2️⃣ **instrumento_curiosidades**
- Lista de curiosidades interessantes
- Campos: titulo, descricao, ordem_exibicao
- Usado para cards de "Você sabia?"

### 3️⃣ **instrumento_midias**
- Vídeos, imagens, áudios
- **tipo_midia**: 'video', 'imagem', 'audio'
- URL, título, descrição
- Usado para: Galeria de mídias + Player

### 4️⃣ **instrumento_sons**
- Sons específicos do instrumento
- Nome do som, descrição
- URL do arquivo de áudio
- Tipo de som (nota, técnica, exemplo)

### 5️⃣ **instrumento_sons_variacoes**
- Variações dos sons (som_id FK)
- Diferentes timbres, dinâmicas
- Para mostrar: "Ouça como soa em diferentes contextos"

### 6️⃣ **instrumento_tecnicas**
- Técnicas de execução
- Nome, descrição, nível (iniciante/intermediário/avançado)
- Video_url, imagem_url
- Ordem de aprendizado

### 7️⃣ **instrumento_performances**
- Performances famosas/importantes
- Artista, obra, link para vídeo
- Descrição do contexto

### 8️⃣ **instrumento_quiz**
- Perguntas e respostas sobre o instrumento
- Questão, opções (JSON), resposta_correta
- Nível de dificuldade
- Para gamificação do aprendizado

### 9️⃣ **instrumentos_relacionados**
- Outros instrumentos similares
- **tipo_relacao**: 'mesma_familia', 'som_similar', 'complementar'
- Descrição da relação

### 🔟 **instrumentos_fisicos**
- Instrumentos físicos disponíveis na escola
- Número de série, estado, localização
- Disponível para empréstimo?

## 🎨 Layout da Página

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Voltar à Biblioteca                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                      ┃
┃     [HERO SECTION]                                   ┃
┃     🎸 VIOLÃO                                        ┃
┃     Instrumento de Cordas • Nível: Intermediário    ┃
┃                                                      ┃
┃     História: [texto rico com imagem de fundo]      ┃
┃                                                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                      ┃
┃   [TABS NAVIGATION]                                  ┃
┃   📖 Visão Geral | 💡 Curiosidades | 🎬 Mídias |    ┃
┃   🔊 Sons | 🎯 Técnicas | 🎭 Performances |          ┃
┃   ❓ Quiz | 🔗 Relacionados                         ┃
┃                                                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                      ┃
┃   [CONTEÚDO DA TAB SELECIONADA]                     ┃
┃                                                      ┃
┃   📖 TAB: VISÃO GERAL                               ┃
┃   ├─ Card: Informações Básicas                      ┃
┃   │  • Origem: Brasil                               ┃
┃   │  • Família: Cordas dedilhadas                   ┃
┃   │  • Material: Madeira + cordas de nylon/aço      ┃
┃   │  • Técnica: Dedilhado, palhetada                ┃
┃   │                                                  ┃
┃   ├─ Card: Anatomia do Instrumento                  ┃
┃   │  [Diagrama interativo com anatomia_partes]      ┃
┃   │  • Corpo, braço, cavalete, rastilho...          ┃
┃   │                                                  ┃
┃   └─ Card: Disponibilidade na Escola                ┃
┃      🎸 3 violões disponíveis para empréstimo       ┃
┃      📍 Localização: Sala de Música 2               ┃
┃                                                      ┃
┃   💡 TAB: CURIOSIDADES                              ┃
┃   ├─ Card 1: "Você sabia?"                          ┃
┃   ├─ Card 2: "Fato histórico"                       ┃
┃   └─ Card 3: "Curiosidade técnica"                  ┃
┃                                                      ┃
┃   🎬 TAB: MÍDIAS                                    ┃
┃   ├─ Galeria de Imagens (grid)                      ┃
┃   ├─ Player de Vídeos (demonstrações)               ┃
┃   └─ Áudios de exemplo                              ┃
┃                                                      ┃
┃   🔊 TAB: SONS                                      ┃
┃   ├─ Lista de sons com player                       ┃
┃   │  ▶️ Nota Dó (grave)                            ┃
┃   │  ▶️ Nota Mi (agudo)                            ┃
┃   │  ▶️ Acorde de Ré maior                         ┃
┃   └─ Variações de timbre/dinâmica                   ┃
┃                                                      ┃
┃   🎯 TAB: TÉCNICAS                                  ┃
┃   ├─ Card: Técnica 1 (Iniciante)                    ┃
┃   │  Nome: Postura correta                          ┃
┃   │  Descrição: [...]                               ┃
┃   │  📹 Vídeo tutorial                              ┃
┃   ├─ Card: Técnica 2 (Intermediário)                ┃
┃   └─ Card: Técnica 3 (Avançado)                     ┃
┃                                                      ┃
┃   🎭 TAB: PERFORMANCES                              ┃
┃   ├─ Performance 1                                   ┃
┃   │  Artista: João Gilberto                         ┃
┃   │  Obra: Chega de Saudade                         ┃
┃   │  📹 [Link para vídeo]                           ┃
┃   └─ Performance 2                                   ┃
┃                                                      ┃
┃   ❓ TAB: QUIZ                                      ┃
┃   ├─ Pergunta 1: [Múltipla escolha]                 ┃
┃   ├─ Pergunta 2: [Verdadeiro/Falso]                 ┃
┃   └─ Resultado: X/Y corretas                        ┃
┃                                                      ┃
┃   🔗 TAB: RELACIONADOS                              ┃
┃   ├─ Card: Violão Clássico                          ┃
┃   │  Relação: Mesma família                         ┃
┃   ├─ Card: Guitarra                                 ┃
┃   │  Relação: Som similar                           ┃
┃   └─ Card: Ukulele                                  ┃
┃      Relação: Técnica similar                       ┃
┃                                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 🔧 Implementação Técnica

### Query Master (Supabase)
```typescript
async function getInstrumentoCompleto(uuid: string) {
  // Query otimizada que busca tudo em paralelo
  const [
    instrumento,
    curiosidades,
    midias,
    sons,
    tecnicas,
    performances,
    quiz,
    relacionados,
    fisicos
  ] = await Promise.all([
    supabase.from('instrumentos').select('*').eq('id', uuid).single(),
    supabase.from('instrumento_curiosidades').select('*').eq('instrumento_id', uuid),
    supabase.from('instrumento_midias').select('*').eq('instrumento_id', uuid),
    supabase.from('instrumento_sons').select('*, variacoes:instrumento_sons_variacoes(*)').eq('instrumento_id', uuid),
    supabase.from('instrumento_tecnicas').select('*').eq('instrumento_id', uuid).order('ordem_aprendizado'),
    supabase.from('instrumento_performances').select('*').eq('instrumento_id', uuid),
    supabase.from('instrumento_quiz').select('*').eq('instrumento_id', uuid),
    supabase.from('instrumentos_relacionados').select('*, relacionado:instrumentos(*)').eq('instrumento_id', uuid),
    supabase.from('instrumentos_fisicos').select('*').eq('instrumento_id', uuid).eq('disponivel', true)
  ])
  
  return {
    ...instrumento.data,
    curiosidades: curiosidades.data,
    midias: midias.data,
    sons: sons.data,
    tecnicas: tecnicas.data,
    performances: performances.data,
    quiz: quiz.data,
    relacionados: relacionados.data,
    fisicos: fisicos.data
  }
}
```

### Rota
```
/aluno/instrumentos/:id
```

### Componentes
- `InstrumentoDetalhadoPage.tsx` (página principal)
- `InstrumentoHero.tsx` (seção hero)
- `InstrumentoTabs.tsx` (navegação por tabs)
- `CuriosidadesTab.tsx`
- `MidiasTab.tsx` (com players de áudio/vídeo)
- `SonsTab.tsx` (lista de sons com players)
- `TecnicasTab.tsx` (cards com vídeos)
- `PerformancesTab.tsx`
- `QuizTab.tsx` (interativo com gamificação)
- `RelacionadosTab.tsx`

## 🎯 Próximos Passos

1. ✅ Execute o SQL de investigação
2. ⏳ Me envie os resultados para ver os dados reais
3. ⏳ Criar a query otimizada `getInstrumentoCompleto()`
4. ⏳ Implementar página com tabs
5. ⏳ Conectar BibliotecaPage com link para página detalhada

**Aguardando você executar o SQL para vermos os dados reais!** 🚀
