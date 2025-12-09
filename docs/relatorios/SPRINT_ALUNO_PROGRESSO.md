# 🚀 Sprint Área Aluno - Progresso Atualizado

**Data**: Janeiro 2025  
**Objetivo**: Completar 100% da Área do Aluno com dados reais do Supabase  
**Status Geral**: 🟢 33% Concluído (4/12 páginas)

---

## ✅ PÁGINAS 100% MIGRADAS (4/12)

### 1. ConquistasPage.tsx ✅
- **Hook**: `useGamification()`
- **Rota**: `/app/aluno/conquistas`
- **Funcionalidades**:
  - ✅ Lista badges conquistados
  - ✅ Lista conquistas gerais
  - ✅ Exibe total de pontos do perfil
  - ✅ Loading e error states
- **Campos Mapeados**:
  - `perfil.total_pontos` → Total de pontos
  - `badges[]` → Cards de badges
  - `conquistas[]` → Lista de conquistas
- **Status**: PRODUÇÃO ✅

### 2. PortfolioListPage.tsx ✅
- **Hook**: `usePortfolio()`
- **Rota**: `/app/aluno/portfolio`
- **Funcionalidades**:
  - ✅ Lista todos portfolios do usuário
  - ✅ Filtros por visibilidade
  - ✅ Stats (total, públicos, privados)
  - ✅ Loading e error states
- **Campos Mapeados**:
  - `titulo` → `title`
  - `descricao` → `description`
  - `visibilidade` → `visibility` ('privado'/'turma'/'publico')
- **Status**: PRODUÇÃO ✅

### 3. DesafiosListPage.tsx ✅
- **Hook**: `useDesafios()`
- **Rota**: `/app/aluno/desafios`
- **Funcionalidades**:
  - ✅ Lista desafios disponíveis
  - ✅ Mostra status (disponível/em andamento/concluído)
  - ✅ Stats de progresso
  - ✅ Loading e error states
- **Campos Mapeados**:
  - `dificuldade` (1-5) → 'iniciante'/'intermediario'/'avancado'
  - `pontos_base` → pontos
  - `metodologia.nome` → instrumento
  - `minha_submissao.status` → status do desafio
- **Status**: PRODUÇÃO ✅

### 4. InstrumentosPage.tsx ✅
- **Hook**: `useInstrumentos()`
- **Rota**: `/app/aluno/instrumentos`
- **Funcionalidades**:
  - ✅ Lista biblioteca de instrumentos
  - ✅ Busca por nome/história/origem
  - ✅ Filtro por categoria
  - ✅ URLs baseadas em slug
  - ✅ Loading e error states
- **Campos Mapeados**:
  - `nome` → Título + geração de slug
  - `imagem_url` → Imagem do card
  - `historia` → Descrição principal
  - `origem` → Info cultural
  - `classificacao` → Tipo de instrumento
  - `categoria.nome` → Filtro e badge
- **Geração de Slug**: `nome.toLowerCase().replace(/\s+/g, '-')`
- **Status**: PRODUÇÃO ✅

---

## ⏳ PÁGINAS PENDENTES (8/12)

### 5. ProgressoPage.tsx ⏳
- **Hooks Necessários**: `useGamification()`, `useDesafios()`, `usePortfolio()`
- **Rota**: `/app/aluno/progresso`
- **Features**:
  - Dashboard de progresso geral
  - Gráficos de pontos ao longo do tempo
  - Desafios completados vs pendentes
  - Portfolios ativos
  - Badges recentes
- **Complexidade**: ALTA (combina múltiplos hooks)

### 6. MinhasAulasPage.tsx ⏳
- **Hooks Necessários**: `useAulas()`, `useTurmas()`
- **Rota**: `/app/aluno/aulas`
- **Features**:
  - Lista aulas por turma
  - Informações de presença
  - Data e horário das aulas
  - Professor responsável
  - Status de presença (presente/ausente/justificado)
- **Complexidade**: MÉDIA

### 7. PerfilPage.tsx ⏳
- **Hooks Necessários**: `useAuth()` (contexts/AuthContext), `useGamification()`
- **Rota**: `/app/aluno/perfil`
- **Features**:
  - Informações pessoais (profiles table)
  - Avatar e nome
  - Nível e pontos totais
  - Estatísticas gerais
  - Edição de perfil
- **Complexidade**: MÉDIA (precisa hook para atualizar profiles)

### 8. PortfolioDetailPage.tsx ⏳
- **Hooks Necessários**: `usePortfolio()` - método `getPortfolioById(id)`
- **Rota**: `/app/aluno/portfolio/:id`
- **Features**:
  - Detalhes completos do portfolio
  - Lista de evidências
  - Tags e objetivos
  - Reflexões iniciais e finais
  - Opções de editar/deletar
- **Complexidade**: MÉDIA

### 9. DesafioDetailPage.tsx ⏳
- **Hooks Necessários**: `useDesafios()` - método `getDesafioById(id)`
- **Rota**: `/app/aluno/desafios/:id`
- **Features**:
  - Descrição completa do desafio
  - Critérios de avaliação
  - Recursos e referências
  - Form para submeter solução
  - Status da submissão (se existir)
  - Feedback do professor
- **Complexidade**: ALTA (form de submissão)

### 10. InstrumentoDetailPage.tsx ⏳
- **Hooks Necessários**: `useInstrumentos()` - método `getInstrumentoBySlug(slug)`
- **Rota**: `/app/aluno/instrumentos/:slug`
- **Features**:
  - História completa do instrumento
  - Galeria de imagens
  - Áudio de exemplo
  - Vídeo demonstração
  - Curiosidades e uso tradicional/moderno
  - Técnicas básicas
  - Informações pedagógicas (nível, idade recomendada)
- **Complexidade**: MÉDIA (rich media content)

### 11. PortfolioCreatePage.tsx ⏳
- **Hooks Necessários**: `usePortfolio()` - método `createPortfolio(data)`
- **Rota**: `/app/aluno/portfolio/novo`
- **Features**:
  - Form completo de criação
  - Campos: título, descrição, tipo, visibilidade
  - Tags e objetivos (array input)
  - Reflexões iniciais
  - Validação de campos
  - Navegação após criação
- **Complexidade**: MÉDIA (form complexo)

### 12. ConquistaDetailPage.tsx ⏳
- **Hooks Necessários**: `useGamification()` - filtrar conquista específica
- **Rota**: `/app/aluno/conquistas/:id`
- **Features**:
  - Detalhes da conquista/badge
  - Data de conquista
  - Descrição completa
  - Metadata da conquista
  - Badge visual grande
  - Botão de compartilhar (futuro)
- **Complexidade**: BAIXA

---

## 📊 ESTATÍSTICAS DO SPRINT

### Hooks Criados
- ✅ useGamification (210 linhas)
- ✅ usePortfolio (230 linhas)
- ✅ useDesafios (260 linhas)
- ✅ useTurmas (170 linhas)
- ✅ useAulas (100 linhas em useTurmas.ts)
- ✅ useInstrumentos (145 linhas)
- **Total**: 6 hooks / ~1,115 linhas

### Páginas Migradas
- ✅ ConquistasPage (100%)
- ✅ PortfolioListPage (100%)
- ✅ DesafiosListPage (100%)
- ✅ InstrumentosPage (100%)
- ⏳ 8 páginas pendentes
- **Progresso**: 4/12 = 33%

### Próximos Passos (Ordem Recomendada)

1. **MinhasAulasPage** - Hook já existe (useAulas), implementação simples
2. **PerfilPage** - Combinar AuthContext + useGamification
3. **InstrumentoDetailPage** - Usar getInstrumentoBySlug(), layout rich media
4. **PortfolioDetailPage** - Usar getPortfolioById(), adicionar evidências
5. **ConquistaDetailPage** - Mais simples, filtrar de useGamification
6. **DesafioDetailPage** - Usar getDesafioById(), form de submissão
7. **PortfolioCreatePage** - Form complexo, validações
8. **ProgressoPage** - Dashboard completo, combina múltiplos hooks

---

## 🎯 METAS IMEDIATAS

### Sprint Atual: Completar Páginas Simples (5-7)
- [ ] MinhasAulasPage
- [ ] PerfilPage  
- [ ] InstrumentoDetailPage
- [ ] ConquistaDetailPage

### Sprint Seguinte: Páginas Complexas (8-10)
- [ ] PortfolioDetailPage
- [ ] DesafioDetailPage
- [ ] PortfolioCreatePage

### Sprint Final: Dashboard
- [ ] ProgressoPage (dashboard completo)

### Após 100% Aluno
- [ ] Atualizar router.tsx com todas as 12 rotas
- [ ] Testar navegação completa
- [ ] Validar loading/error states
- [ ] Iniciar área do Professor

---

## 📝 PADRÃO DE MIGRAÇÃO ESTABELECIDO

```typescript
// 1. Importar hook
import { useHook } from '../hooks'

// 2. Usar hook no componente
const { data, loading, error } = useHook()

// 3. Loading state
if (loading) {
  return <LoadingSpinner />
}

// 4. Error state
if (error) {
  return <ErrorMessage error={error} />
}

// 5. Mapear dados se necessário
const dadosFormatados = data.map(item => ({
  campoUI: item.campo_banco
}))

// 6. Renderizar com dadosFormatados
return <ComponenteUI dados={dadosFormatados} />
```

---

## 🔗 ROTAS DA ÁREA ALUNO

```typescript
ALUNO: {
  INDEX: '/app/aluno',
  PROFILE: '/app/aluno/perfil', // ⏳
  
  ACHIEVEMENTS: {
    INDEX: '/app/aluno/conquistas', // ✅
    DETAIL: (id) => `/app/aluno/conquistas/${id}`, // ⏳
  },
  
  PORTFOLIO: {
    INDEX: '/app/aluno/portfolio', // ✅
    CREATE: '/app/aluno/portfolio/novo', // ⏳
    DETAIL: (id) => `/app/aluno/portfolio/${id}`, // ⏳
    EDIT: (id) => `/app/aluno/portfolio/${id}/editar`, // ⏳
  },
  
  CHALLENGES: {
    INDEX: '/app/aluno/desafios', // ✅
    DETAIL: (id) => `/app/aluno/desafios/${id}`, // ⏳
  },
  
  INSTRUMENTS: {
    INDEX: '/app/aluno/instrumentos', // ✅
    DETAIL: (slug) => `/app/aluno/instrumentos/${slug}`, // ⏳
  },
  
  CLASSES: '/app/aluno/aulas', // ⏳
  PROGRESS: '/app/aluno/progresso', // ⏳
}
```

**Legenda**:
- ✅ Página migrada com dados reais
- ⏳ Página pendente de migração

---

**Última atualização**: Agora  
**Responsável**: GitHub Copilot  
**Próxima ação**: Migrar MinhasAulasPage (hook já existe, implementação simples)
