# 📄 INVENTÁRIO COMPLETO DE PÁGINAS - NIPO SCHOOL

**Data**: 2025-01-21  
**Status**: Mapeamento Completo Atualizado  
**Total de Páginas**: 37 páginas principais + componentes auxiliares

---

## 🎯 RESUMO EXECUTIVO

### Estatísticas Gerais
- **Total de Páginas Mapeadas**: 37
- **Páginas Públicas**: 7
- **Páginas de Aluno**: 13
- **Páginas de Professor**: 5
- **Páginas de Admin**: 3
- **Páginas Compartilhadas**: 9
- **Dashboards**: 4
- **Páginas com Rota Configurada**: 35
- **Páginas sem Rota (órfãs)**: 2

### Distribuição por Status
- ✅ **Implementadas (funcionais)**: ~28 páginas (76%)
- 🚧 **Placeholders ("Em Construção")**: ~6 páginas (16%)
- ⚠️ **Com Problemas Conhecidos**: 3 páginas (8%)

---

## 📂 PÁGINAS POR CATEGORIA

### 1️⃣ PÁGINAS PÚBLICAS (7 páginas)

#### 1.1 Landing & Navegação
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 1 | **LandingPage** | `features/shared/pages/LandingPage.tsx` | `/` | ✅ Funcional | Página inicial pública, sem layout Navbar/Footer |
| 2 | **NavigationPage** | `features/shared/pages/NavigationPage.tsx` | `/nav` | ✅ Funcional | Portal de navegação com links para todas as seções |
| 3 | **ComponentShowcase** | `features/shared/pages/ComponentShowcase.tsx` | `/showcase` | ✅ Funcional | 🎌 Showcase do Design System Nipo |
| 4 | **TestePage** | `features/shared/pages/TestePage.tsx` | `/teste` | ✅ Funcional | 🧪 Página de testes gerais |
| 5 | **NotFoundPage** | `features/shared/pages/NotFoundPage.tsx` | `*` (404) | ✅ Funcional | Página de erro 404 |

#### 1.2 Autenticação
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 6 | **LoginPage** | `features/shared/pages/auth/LoginPage.tsx` | `/login` | ✅ Funcional | Portal Torii, sem layout |
| 7 | **SignUpPage** | `features/shared/pages/auth/SignUpPage.tsx` | `/signup` | ✅ Funcional | Cadastro de novos usuários |
| 8 | **PasswordResetPage** | `features/shared/pages/auth/PasswordResetPage.tsx` | `/password-reset` | ✅ Funcional | Recuperação de senha |

---

### 2️⃣ PÁGINAS DE ALUNO (13 páginas)

#### 2.1 Dashboard & Perfil
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 9 | **AlunoDashboard** | `features/alunos/pages/AlunoDashboard.tsx` | `/alunos` | ✅ Funcional | Dashboard principal do aluno |
| 10 | **PerfilPage** | `features/alunos/pages/PerfilPage.tsx` | `/alunos/perfil` | ✅ Funcional | Perfil do aluno |
| 11 | **ProgressoPage** | `features/alunos/pages/ProgressoPage.tsx` | `/alunos/progresso` | ✅ Funcional | Visualização de progresso acadêmico |

#### 2.2 Sistema Alpha Challenges
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 12 | **DesafiosListPage** | `features/alunos/pages/DesafiosListPage.tsx` | `/alunos/desafios` | ⚠️ **PROBLEMA** | Não renderiza (mostra "Em Construção"), 41 desafios no banco |
| 13 | **DesafioDetailPage** | `features/alunos/pages/DesafioDetailPage.tsx` | `/alunos/desafios/:id` | 🚧 Placeholder | Página de detalhes de desafio específico |

#### 2.3 Portfólio
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 14 | **PortfolioListPage** | `features/alunos/pages/PortfolioListPage.tsx` | `/alunos/portfolio` | ✅ Funcional | Lista de trabalhos do portfólio |
| 15 | **PortfolioDetailPage** | `features/alunos/pages/PortfolioDetailPage.tsx` | `/alunos/portfolio/:id` | 🚧 Placeholder | Visualização de item específico |
| 16 | **PortfolioCreatePage** | `features/alunos/pages/PortfolioCreatePage.tsx` | `/alunos/portfolio/criar` | 🚧 Placeholder | Criação de novo item no portfólio |

#### 2.4 Conquistas & Badges
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 17 | **ConquistasPage** | `features/alunos/pages/ConquistasPage.tsx` | `/alunos/conquistas` | ✅ Funcional | Lista de conquistas e badges (26 badges no banco) |
| 18 | **ConquistaDetailPage** | `features/alunos/pages/ConquistaDetailPage.tsx` | `/alunos/conquistas/:id` | 🚧 Placeholder | Detalhes de conquista específica |

#### 2.5 Instrumentos
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 19 | **InstrumentosPage (Aluno)** | `features/alunos/pages/InstrumentosPage.tsx` | `/alunos/instrumentos` | ⚠️ Duplicado | Existe versão shared (69 instrumentos no banco) |
| 20 | **InstrumentoDetailPage** | `features/alunos/pages/InstrumentoDetailPage.tsx` | `/alunos/instrumentos/:id` | 🚧 Placeholder | Detalhes de instrumento específico |

#### 2.6 Aulas
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 21 | **MinhasAulasPage** | `features/alunos/pages/MinhasAulasPage.tsx` | `/alunos/aulas` | 🚧 Placeholder | Cronograma de aulas do aluno |

---

### 3️⃣ PÁGINAS DE PROFESSOR (5 páginas)

#### 3.1 Dashboard & Gestão
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 22 | **ProfessorDashboard** | `features/professores/pages/ProfessorDashboard.tsx` | `/professores` | ✅ Funcional | Dashboard principal do professor |
| 23 | **TurmasPage** | `features/professores/pages/TurmasPage.tsx` | `/professores/turmas` | ✅ Funcional | Gestão de turmas |
| 24 | **ConteudosPage** | `features/professores/pages/ConteudosPage.tsx` | `/professores/conteudos` | ✅ Funcional | Gestão de conteúdos pedagógicos |
| 25 | **NovoConteudoPage** | `features/professores/pages/NovoConteudoPage.tsx` | `/professores/novo` | ✅ Funcional | Criação de novo conteúdo |
| 26 | **AvaliacoesPage** | `features/professores/pages/AvaliacoesPage.tsx` | `/professores/avaliacoes` | ✅ Funcional | Sistema de avaliações |

---

### 4️⃣ PÁGINAS DE ADMIN (3 páginas)

#### 4.1 Dashboard & Ferramentas
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 27 | **AdminDashboard** | `features/admin/pages/AdminDashboard.tsx` | `/admin` | ✅ Funcional | Dashboard administrativo |
| 28 | **DatabaseAdminPage** | `features/admin/pages/DatabaseAdminPage.tsx` | `/admin/database` | ✅ Funcional | Gestão do banco de dados |
| 29 | **SystemDiagnosticPage** | `features/admin/pages/SystemDiagnosticPage.tsx` | `/admin/diagnostic` | ✅ Funcional | Diagnóstico do sistema |

---

### 5️⃣ PÁGINAS COMPARTILHADAS (9 páginas)

#### 5.1 Configurações & Ajuda
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 30 | **ConfiguracoesPage** | `features/shared/pages/ConfiguracoesPage.tsx` | `/configuracoes` | ✅ Funcional | Configurações do usuário |
| 31 | **NotificacoesPage** | `features/shared/pages/NotificacoesPage.tsx` | `/notificacoes` | ✅ Funcional | Central de notificações |
| 32 | **AjudaPage** | `features/shared/pages/AjudaPage.tsx` | `/ajuda` | ✅ Funcional | Central de ajuda |
| 33 | **PerfilPage (Shared)** | `features/shared/pages/PerfilPage.tsx` | ❌ Sem rota | ❓ Órfã | Duplicado com alunos/PerfilPage |

#### 5.2 Instrumentos (Shared)
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 34 | **InstrumentosPage (Shared)** | `features/shared/pages/instrumentos/InstrumentosPage.tsx` | `/instrumentos` | ✅ Funcional | Catálogo geral de 69 instrumentos |

#### 5.3 História da Música
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 35 | **HistoriaMusicaHome** | `features/historia-musica/pages/HistoriaMusicaHome.tsx` | `/historia-musica` | ⚠️ Incompleto | 12 períodos, 21 compositores no banco, precisa integração |

#### 5.4 Dashboards Técnicos
| # | Página | Arquivo | Rota | Status | Notas |
|---|--------|---------|------|--------|-------|
| 36 | **SystemDashboardPage** | `features/shared/pages/dashboard/SystemDashboardPage.tsx` | `/system` | ✅ Funcional | Dashboard técnico do sistema |
| 37 | **DebugAuthPage** | `features/shared/pages/debug/DebugAuthPage.tsx` | `/debug/auth` | ✅ Funcional | Ferramenta de debug de autenticação |

---

## 🔍 ANÁLISE DETALHADA

### ✅ Páginas Totalmente Funcionais (28 páginas - 76%)

#### Grupo 1: Autenticação & Navegação (6 páginas)
1. LandingPage - Portal inicial
2. NavigationPage - Hub de navegação
3. LoginPage - Autenticação
4. SignUpPage - Cadastro
5. PasswordResetPage - Recuperação
6. NotFoundPage - Erro 404

#### Grupo 2: Dashboards Principais (3 páginas)
7. AlunoDashboard - Dashboard do aluno
8. ProfessorDashboard - Dashboard do professor
9. AdminDashboard - Dashboard admin

#### Grupo 3: Área do Professor (5 páginas)
10. TurmasPage - Gestão de turmas
11. ConteudosPage - Gestão de conteúdos
12. NovoConteudoPage - Criar conteúdo
13. AvaliacoesPage - Sistema de avaliações

#### Grupo 4: Área do Aluno (4 páginas)
14. ProgressoPage - Progresso acadêmico
15. PerfilPage (Aluno) - Perfil pessoal
16. ConquistasPage - Badges e conquistas
17. PortfolioListPage - Lista de trabalhos

#### Grupo 5: Páginas Compartilhadas (6 páginas)
18. ConfiguracoesPage - Configurações
19. NotificacoesPage - Notificações
20. AjudaPage - Central de ajuda
21. InstrumentosPage (Shared) - Catálogo de instrumentos
22. ComponentShowcase - Design System
23. TestePage - Testes gerais

#### Grupo 6: Admin & Debug (4 páginas)
24. DatabaseAdminPage - Admin do banco
25. SystemDiagnosticPage - Diagnóstico
26. SystemDashboardPage - Dashboard técnico
27. DebugAuthPage - Debug de auth

---

### 🚧 Páginas Placeholder/Em Construção (6 páginas - 16%)

| # | Página | Status Atual | Dados no Banco | Próximas Ações |
|---|--------|--------------|----------------|----------------|
| 1 | **DesafioDetailPage** | Placeholder | 41 desafios | Implementar visualização detalhada |
| 2 | **PortfolioDetailPage** | Placeholder | 0 portfólios | Criar CRUD de portfólio |
| 3 | **PortfolioCreatePage** | Placeholder | 0 portfólios | Implementar formulário de criação |
| 4 | **ConquistaDetailPage** | Placeholder | 26 badges | Mostrar detalhes da conquista |
| 5 | **InstrumentoDetailPage** | Placeholder | 69 instrumentos | Página de instrumento individual |
| 6 | **MinhasAulasPage** | Placeholder | 0 aulas | Sistema de cronograma |

---

### ⚠️ Páginas com Problemas Conhecidos (3 páginas - 8%)

#### 1. DesafiosListPage ⚠️ CRÍTICO
- **Arquivo**: `features/alunos/pages/DesafiosListPage.tsx`
- **Rota**: `/alunos/desafios`
- **Problema**: Componente não renderiza (mostra "Em Construção")
- **Dados Disponíveis**: 
  - 41 desafios no banco
  - 9 metodologias vinculadas
  - 4 submissões de exemplo
- **Debug Realizado**:
  - ✅ Auth funcional (user = tgjphotos@gmail.com, role='aluno')
  - ✅ Sidebar renderiza corretamente
  - ❌ Nenhum console.log da página aparece
  - ❌ RoleProtectedRoute logs também ausentes
- **Hipóteses**:
  1. Cache do navegador
  2. Problema de build/bundle
  3. Error boundary capturando erro silenciosamente
  4. Router carregando arquivo errado
- **Próxima Ação**: Hard refresh, verificar se file-level console.log aparece

#### 2. InstrumentosPage (Aluno) ⚠️ DUPLICAÇÃO
- **Arquivo**: `features/alunos/pages/InstrumentosPage.tsx`
- **Problema**: Existe versão duplicada em `features/shared/`
- **Rota Configurada**: `/alunos/instrumentos` → InstrumentosPage (shared)
- **Status**: Import comentado no router
- **Solução Recomendada**: 
  - Manter apenas versão shared
  - Deletar versão duplicada em alunos/
  - OU especializar versão aluno com progresso pessoal

#### 3. HistoriaMusicaHome ⚠️ INTEGRAÇÃO INCOMPLETA
- **Arquivo**: `features/historia-musica/pages/HistoriaMusicaHome.tsx`
- **Rota**: `/historia-musica`
- **Dados Disponíveis**:
  - 12 períodos históricos
  - 21 compositores
  - Obras musicais
- **Problema**: Integração com Supabase incompleta
- **Status**: Hooks implementados (`useHistoriaMusica`, `useAudioPlayer`) mas sem conexão real
- **Próxima Ação**: Conectar hooks com queries Supabase reais

---

### ❓ Páginas Órfãs (sem rota configurada - 2)

| # | Página | Arquivo | Motivo | Ação Recomendada |
|---|--------|---------|--------|-------------------|
| 1 | **PerfilPage (Shared)** | `features/shared/pages/PerfilPage.tsx` | Duplicado com alunos/PerfilPage | Deletar ou especializar |
| 2 | **_EmConstrucao** | `features/alunos/pages/_EmConstrucao.tsx` | Componente auxiliar, não é página | Manter como componente utilitário |

---

## 📊 MAPEAMENTO ROTA → PÁGINA

### Rotas Públicas (sem autenticação)
```
/                    → LandingPage
/nav                 → NavigationPage
/showcase            → ComponentShowcase
/teste               → TestePage
/login               → LoginPage
/signup              → SignUpPage
/password-reset      → PasswordResetPage
*                    → NotFoundPage
```

### Rotas de Aluno (role='aluno')
```
/alunos                      → AlunoDashboard
/alunos/perfil               → PerfilPage
/alunos/progresso            → ProgressoPage
/alunos/conquistas           → ConquistasPage
/alunos/conquistas/:id       → ConquistaDetailPage
/alunos/portfolio            → PortfolioListPage
/alunos/portfolio/criar      → PortfolioCreatePage
/alunos/portfolio/:id        → PortfolioDetailPage
/alunos/desafios             → DesafiosListPage ⚠️
/alunos/desafios/:id         → DesafioDetailPage
/alunos/instrumentos         → InstrumentosPage (shared)
/alunos/instrumentos/:id     → InstrumentoDetailPage
/alunos/aulas                → MinhasAulasPage
```

### Rotas de Professor (role='professor')
```
/professores              → ProfessorDashboard
/professores/conteudos    → ConteudosPage
/professores/novo         → NovoConteudoPage
/professores/turmas       → TurmasPage
/professores/avaliacoes   → AvaliacoesPage
```

### Rotas de Admin (role='admin')
```
/admin               → AdminDashboard
/admin/database      → DatabaseAdminPage
/admin/diagnostic    → SystemDiagnosticPage
```

### Rotas Compartilhadas (authenticated)
```
/dashboard           → RoleBasedRedirect (redireciona para dashboard específico)
/instrumentos        → InstrumentosPage (shared)
/historia-musica     → HistoriaMusicaHome
/system              → SystemDashboardPage
/configuracoes       → ConfiguracoesPage
/notificacoes        → NotificacoesPage
/ajuda               → AjudaPage
/debug/auth          → DebugAuthPage
```

---

## 🗂️ ESTRUTURA DE DIRETÓRIOS

```
src/features/
├── alunos/pages/                    # 13 páginas
│   ├── AlunoDashboard.tsx           ✅
│   ├── PerfilPage.tsx               ✅
│   ├── ProgressoPage.tsx            ✅
│   ├── ConquistasPage.tsx           ✅
│   ├── ConquistaDetailPage.tsx      🚧
│   ├── PortfolioListPage.tsx        ✅
│   ├── PortfolioDetailPage.tsx      🚧
│   ├── PortfolioCreatePage.tsx      🚧
│   ├── DesafiosListPage.tsx         ⚠️
│   ├── DesafioDetailPage.tsx        🚧
│   ├── InstrumentosPage.tsx         ⚠️ (duplicado)
│   ├── InstrumentoDetailPage.tsx    🚧
│   ├── MinhasAulasPage.tsx          🚧
│   └── _EmConstrucao.tsx            (componente auxiliar)
│
├── professores/pages/               # 5 páginas
│   ├── ProfessorDashboard.tsx       ✅
│   ├── TurmasPage.tsx               ✅
│   ├── ConteudosPage.tsx            ✅
│   ├── NovoConteudoPage.tsx         ✅
│   └── AvaliacoesPage.tsx           ✅
│
├── admin/pages/                     # 3 páginas
│   ├── AdminDashboard.tsx           ✅
│   ├── DatabaseAdminPage.tsx        ✅
│   └── SystemDiagnosticPage.tsx     ✅
│
├── shared/pages/                    # 12 páginas
│   ├── LandingPage.tsx              ✅
│   ├── NavigationPage.tsx           ✅
│   ├── NotFoundPage.tsx             ✅
│   ├── ComponentShowcase.tsx        ✅
│   ├── TestePage.tsx                ✅
│   ├── ConfiguracoesPage.tsx        ✅
│   ├── NotificacoesPage.tsx         ✅
│   ├── AjudaPage.tsx                ✅
│   ├── PerfilPage.tsx               ❓ (órfã)
│   ├── auth/
│   │   ├── LoginPage.tsx            ✅
│   │   ├── SignUpPage.tsx           ✅
│   │   └── PasswordResetPage.tsx    ✅
│   ├── instrumentos/
│   │   └── InstrumentosPage.tsx     ✅
│   ├── dashboard/
│   │   └── SystemDashboardPage.tsx  ✅
│   └── debug/
│       └── DebugAuthPage.tsx        ✅
│
└── historia-musica/pages/           # 1 página
    └── HistoriaMusicaHome.tsx       ⚠️
```

---

## 📈 DADOS DO BANCO DISPONÍVEIS

### Alpha Challenges System
- **alpha_desafios**: 41 registros (todos vinculados a metodologias)
- **alpha_metodologias**: 9 registros (Suzuki: 13, Berklee: 9, Kodály: 7, Waldorf: 4, Orff: 3, Dalcroze: 2, Gordon: 1, Willems: 1, Montessori: 1)
- **alpha_badges**: 26 conquistas disponíveis
- **alpha_submissoes**: 4 exemplos (1 pendente, 3 aprovadas, 270 pts total)
- **alpha_competencias**: Dados disponíveis

### História da Música
- **historia_periodos**: 12 períodos históricos
- **historia_compositores**: 21 compositores
- **historia_obras**: Obras musicais cadastradas

### Instrumentos
- **instrumentos**: 69 instrumentos cadastrados

### Usuários
- **profiles**: Sistema de perfis com tipo_usuario (aluno/professor/admin)

---

## 🎯 PRIORIDADES DE DESENVOLVIMENTO

### 🔴 ALTA PRIORIDADE (Crítico)
1. **Corrigir DesafiosListPage** - Página não renderiza (41 desafios esperando)
2. **Implementar DesafioDetailPage** - Visualização individual de desafios
3. **Conectar HistoriaMusicaHome** - Integrar com dados reais do banco

### 🟡 MÉDIA PRIORIDADE (Importantes)
4. **Sistema de Portfólio Completo**:
   - PortfolioCreatePage (CRUD completo)
   - PortfolioDetailPage (visualização/edição)
5. **InstrumentoDetailPage** - Página individual de instrumento
6. **ConquistaDetailPage** - Detalhes de badges/conquistas
7. **Resolver duplicação InstrumentosPage** - Decidir: shared ou aluno?

### 🟢 BAIXA PRIORIDADE (Futuro)
8. **MinhasAulasPage** - Sistema de cronograma
9. **Decidir destino PerfilPage (Shared)** - Deletar ou especializar
10. **Otimizações de Performance** - Lazy loading, code splitting

---

## 🛠️ DEPENDÊNCIAS TÉCNICAS

### Páginas que Dependem de APIs Externas
- **HistoriaMusicaHome**: Spotify/YouTube API para áudio
- **InstrumentosPage**: Potencial integração com catálogos externos

### Páginas que Precisam de Storage
- **PortfolioCreatePage**: Upload de arquivos (áudio, vídeo, imagens)
- **DesafioDetailPage**: Upload de evidências

### Páginas com Dependências Internas
- **ConquistasPage** → Requer alpha_badges + user_badges (não existe ainda)
- **ProgressoPage** → Requer métricas de submissões e conclusões
- **MinhasAulasPage** → Requer tabela de aulas (não implementada)

---

## 📋 CHECKLIST DE VALIDAÇÃO

### Para Cada Página Nova/Modificada:
- [ ] Rota configurada em `router.tsx`
- [ ] Proteção de rota adequada (RoleProtectedRoute)
- [ ] Link no Sidebar (se aplicável)
- [ ] Integração com Supabase
- [ ] Tratamento de loading/error states
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Testes de navegação
- [ ] Console.logs de debug removidos (produção)
- [ ] Documentação atualizada

---

## 🔗 DOCUMENTOS RELACIONADOS

1. **MAPEAMENTO_SIDEBAR_ROTAS_COMPLETO.md** - Mapeamento de todos os links do sidebar
2. **VERIFICACAO_FINAL_STATUS.md** - Status geral do projeto
3. **ESTRUTURA_BACKEND_COMPLETA.md** - Estrutura do banco de dados
4. **RELATORIO_HISTORIA_MUSICA_IMPLEMENTADO.md** - Detalhes do módulo de história

---

## 📝 NOTAS IMPORTANTES

### Padrões de Nomenclatura
- **Páginas de Lista**: `[Entidade]ListPage.tsx` ou `[Entidade]Page.tsx`
- **Páginas de Detalhe**: `[Entidade]DetailPage.tsx`
- **Páginas de Criação**: `[Entidade]CreatePage.tsx`
- **Dashboards**: `[Role]Dashboard.tsx`

### Convenções de Export
- Maioria usa **named export**: `export const NomePage = () => {}`
- Algumas usam **default export**: `export default function NomePage() {}`
- Manter consistência por feature (todas pages de alunos usam named export)

### Estrutura de Componentes Auxiliares
- Cada feature tem pasta `components/` com componentes específicos
- Componentes genéricos ficam em `src/components/`
- Design System em `src/components/nipo/` e `src/components/ui/`

---

**Última Atualização**: 2025-01-21  
**Responsável**: GitHub Copilot  
**Próxima Revisão**: Após implementação das prioridades críticas
