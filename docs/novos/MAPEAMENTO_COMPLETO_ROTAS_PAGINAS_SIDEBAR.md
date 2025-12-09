# 📋 MAPEAMENTO COMPLETO: Rotas, Páginas e Sidebar

**Data:** 6 de dezembro de 2025  
**Projeto:** Nipo School  
**Versão:** 1.0

---

## 📑 Índice
1. [Visão Geral](#visão-geral)
2. [Rotas Públicas](#rotas-públicas)
3. [Rotas Aluno](#rotas-aluno)
4. [Rotas Professor](#rotas-professor)
5. [Rotas Admin](#rotas-admin)
6. [Rotas Compartilhadas](#rotas-compartilhadas)
7. [Análise de Consistência](#análise-de-consistência)
8. [Recomendações](#recomendações)

---

## 🎯 Visão Geral

Este documento mapeia **todas as rotas**, **páginas implementadas** e **itens do sidebar** para cada nível de usuário no Nipo School. O objetivo é identificar inconsistências, páginas faltantes e garantir uma navegação completa e coerente.

### Status Atual
- ✅ **Rotas Implementadas:** 35+
- ✅ **Páginas Criadas:** 25+
- ⚠️ **Inconsistências Identificadas:** 8
- 🔧 **Páginas a Criar:** 5

---

## 🌐 ROTAS PÚBLICAS

### Landing & Autenticação (SEM Layout - Design Torii Portal)

| Rota | Arquivo | Status | Descrição |
|------|---------|--------|-----------|
| `/` | `LandingPage.tsx` | ✅ COMPLETO | Landing page com portal Torii |
| `/login` | `LoginPage.tsx` | ✅ COMPLETO | Login com portal Torii |
| `/signup` | `SignUpPage.tsx` | ✅ COMPLETO | Cadastro com portal Torii |
| `/password-reset` | `PasswordResetPage.tsx` | ✅ COMPLETO | Recuperação de senha |

### Páginas de Teste/Debug (COM PublicLayout)

| Rota | Arquivo | Status | Descrição |
|------|---------|--------|-----------|
| `/nav` | `NavigationPage.tsx` | ✅ TESTE | Página de navegação |
| `/showcase` | `ComponentShowcase.tsx` | ✅ TESTE | Showcase de componentes |
| `/teste` | `TestePage.tsx` | ✅ TESTE | Página de testes gerais |
| `/debug/auth` | `DebugAuthPage.tsx` | ✅ DEBUG | Debug de autenticação |

---

## 👨‍🎓 ROTAS ALUNO

### Sidebar Aluno (8 itens principais + 2 comuns)

```typescript
// Items no Sidebar
[
  { name: 'Dashboard', path: '/alunos', icon: Home },                    // ✅
  { name: 'Portfólio', path: '/alunos/portfolio', icon: Briefcase },     // ✅
  { name: 'Conquistas', path: '/alunos/conquistas', icon: Trophy },      // ✅
  { name: 'Desafios', path: '/alunos/desafios', icon: Award },           // ✅
  { name: 'Instrumentos', path: '/alunos/instrumentos', icon: Music },   // ✅
  { name: 'Minhas Aulas', path: '/alunos/aulas', icon: Calendar },      // ✅
  { name: 'Progresso', path: '/alunos/progresso', icon: TrendingUp },   // ✅
  { name: 'História da Música', path: '/historia-musica', icon: BookOpen }, // ⚠️ COMPARTILHADO
  // Comuns
  { name: 'Ajuda', path: '/ajuda', icon: HelpCircle },                   // ✅
  { name: 'Configurações', path: '/configuracoes', icon: Settings },     // ✅
]
```

### Rotas & Páginas Aluno

| Rota | Arquivo | No Sidebar? | Status | Observações |
|------|---------|-------------|--------|-------------|
| **DASHBOARD** |
| `/alunos` | `AlunoDashboard.tsx` | ✅ SIM | ✅ COMPLETO | Dashboard principal |
| **PORTFÓLIO** |
| `/alunos/portfolio` | `PortfolioListPage.tsx` | ✅ SIM | ✅ COMPLETO | Lista de portfólios |
| `/alunos/portfolio/criar` | `PortfolioCreatePage.tsx` | ❌ NÃO | ✅ COMPLETO | Criar novo portfólio |
| `/alunos/portfolio/:id` | `PortfolioDetailPage.tsx` | ❌ NÃO | ✅ COMPLETO | Detalhes do portfólio |
| **CONQUISTAS** |
| `/alunos/conquistas` | `ConquistasPage.tsx` | ✅ SIM | ✅ COMPLETO | Lista de conquistas |
| `/alunos/conquistas/:id` | `ConquistaDetailPage.tsx` | ❌ NÃO | ✅ COMPLETO | Detalhes da conquista |
| **DESAFIOS** |
| `/alunos/desafios` | `DesafiosListPage.tsx` | ✅ SIM | ✅ COMPLETO | Lista de desafios |
| `/alunos/desafios/:id` | `DesafioDetailPage.tsx` | ❌ NÃO | ✅ COMPLETO | Detalhes do desafio |
| **INSTRUMENTOS** |
| `/alunos/instrumentos` | `InstrumentosPage.tsx` | ✅ SIM | ✅ COMPLETO | Lista de instrumentos |
| `/alunos/instrumentos/:id` | `InstrumentoDetailPage.tsx` | ❌ NÃO | ✅ COMPLETO | Detalhes do instrumento |
| **AULAS** |
| `/alunos/aulas` | `MinhasAulasPage.tsx` | ✅ SIM | ✅ COMPLETO | Minhas aulas |
| **PROGRESSO** |
| `/alunos/progresso` | `ProgressoPage.tsx` | ✅ SIM | ✅ COMPLETO | Acompanhamento de progresso |
| **PERFIL** |
| `/alunos/perfil` | `PerfilPage.tsx` | ❌ NÃO | ⚠️ EXISTE | **🔴 FALTA NO SIDEBAR** |

### ❌ Problemas Identificados - ALUNO

1. **❌ Perfil não está no Sidebar**
   - Rota existe: `/alunos/perfil`
   - Página existe: `PerfilPage.tsx`
   - **FALTA:** Adicionar no sidebar ou ter acesso via menu de usuário

2. **⚠️ História da Música - Rota Inconsistente**
   - Sidebar aponta: `/historia-musica`
   - Não é específico de aluno, mas está no sidebar do aluno
   - **SUGESTÃO:** Criar `/alunos/historia-musica` ou manter compartilhado

---

## 👨‍🏫 ROTAS PROFESSOR

### Sidebar Professor (4 itens principais + 2 comuns)

```typescript
// Items no Sidebar
[
  { name: 'Dashboard', path: '/professores', icon: Home },              // ✅
  { name: 'Turmas', path: '/professores/turmas', icon: Users },         // ✅
  { name: 'Conteúdos', path: '/professores/conteudos', icon: Library }, // ✅
  { name: 'Avaliações', path: '/professores/avaliacoes', icon: Award }, // ✅
  // Comuns
  { name: 'Ajuda', path: '/ajuda', icon: HelpCircle },                  // ✅
  { name: 'Configurações', path: '/configuracoes', icon: Settings },    // ✅
]
```

### Rotas & Páginas Professor

| Rota | Arquivo | No Sidebar? | Status | Observações |
|------|---------|-------------|--------|-------------|
| **DASHBOARD** |
| `/professores` | `ProfessorDashboard.tsx` | ✅ SIM | ✅ COMPLETO | Dashboard principal |
| **TURMAS** |
| `/professores/turmas` | `TurmasPage.tsx` | ✅ SIM | ✅ COMPLETO | Gestão de turmas |
| **CONTEÚDOS** |
| `/professores/conteudos` | `ConteudosPage.tsx` | ✅ SIM | ✅ COMPLETO | Lista de conteúdos |
| `/professores/novo` | `NovoConteudoPage.tsx` | ❌ NÃO | ✅ COMPLETO | Criar novo conteúdo |
| **AVALIAÇÕES** |
| `/professores/avaliacoes` | `AvaliacoesPage.tsx` | ✅ SIM | ✅ COMPLETO | Gestão de avaliações |

### ❌ Problemas Identificados - PROFESSOR

1. **⚠️ Faltam Rotas de Detalhes**
   - **FALTA:** `/professores/turmas/:id` - Detalhes da turma
   - **FALTA:** `/professores/conteudos/:id` - Editar conteúdo
   - **FALTA:** `/professores/avaliacoes/:id` - Detalhes da avaliação
   - **FALTA:** `/professores/alunos/:id` - Perfil do aluno

2. **⚠️ Funcionalidades Ausentes**
   - Página de perfil do professor
   - Calendário de aulas
   - Relatórios de turma
   - Mensagens/Comunicação com alunos

---

## 👨‍💼 ROTAS ADMIN

### Sidebar Admin (3 itens principais + 2 comuns)

```typescript
// Items no Sidebar
[
  { name: 'Dashboard', path: '/admin', icon: Home },                    // ✅
  { name: 'Banco de Dados', path: '/admin/database', icon: Users },     // ✅
  { name: 'Diagnóstico', path: '/admin/diagnostic', icon: Music },      // ✅
  // Comuns
  { name: 'Ajuda', path: '/ajuda', icon: HelpCircle },                  // ✅
  { name: 'Configurações', path: '/configuracoes', icon: Settings },    // ✅
]
```

### Rotas & Páginas Admin

| Rota | Arquivo | No Sidebar? | Status | Observações |
|------|---------|-------------|--------|-------------|
| **DASHBOARD** |
| `/admin` | `AdminDashboard.tsx` | ✅ SIM | ✅ COMPLETO | Dashboard administrativo |
| **BANCO DE DADOS** |
| `/admin/database` | `DatabaseAdminPage.tsx` | ✅ SIM | ✅ COMPLETO | Gestão do banco de dados |
| **DIAGNÓSTICO** |
| `/admin/diagnostic` | `SystemDiagnosticPage.tsx` | ✅ SIM | ✅ COMPLETO | Diagnóstico do sistema |

### ❌ Problemas Identificados - ADMIN

1. **⚠️ Funcionalidades Limitadas**
   - **FALTA:** Gestão de usuários (CRUD completo)
   - **FALTA:** Gestão de professores
   - **FALTA:** Gestão de alunos
   - **FALTA:** Gestão de turmas
   - **FALTA:** Relatórios e analytics
   - **FALTA:** Logs do sistema
   - **FALTA:** Configurações globais

2. **⚠️ Ícones Inadequados**
   - "Banco de Dados" usando ícone `Users` (deveria ser Database)
   - "Diagnóstico" usando ícone `Music` (deveria ser Activity ou Shield)

---

## 🔄 ROTAS COMPARTILHADAS

Rotas acessíveis por todos os usuários autenticados:

| Rota | Arquivo | Quem Acessa | Status | No Sidebar? |
|------|---------|-------------|--------|-------------|
| `/dashboard` | `RoleBasedRedirect` | Todos | ✅ REDIRECT | ❌ NÃO |
| `/configuracoes` | `ConfiguracoesPage.tsx` | Todos | ✅ COMPLETO | ✅ SIM (todos) |
| `/notificacoes` | `NotificacoesPage.tsx` | Todos | ✅ COMPLETO | ❌ NÃO |
| `/ajuda` | `AjudaPage.tsx` | Todos | ✅ COMPLETO | ✅ SIM (todos) |
| `/instrumentos` | `InstrumentosPage.tsx` | Todos | ✅ COMPLETO | ⚠️ DUPLICADO |
| `/historia-musica` | `HistoriaMusicaHome.tsx` | Todos | ✅ COMPLETO | ✅ SIM (aluno) |
| `/system` | `SystemDashboardPage.tsx` | Todos? | ⚠️ TESTE | ❌ NÃO |

### ❌ Problemas Identificados - COMPARTILHADAS

1. **❌ Duplicação de Rotas de Instrumentos**
   - `/instrumentos` (compartilhada)
   - `/alunos/instrumentos` (específica do aluno)
   - **DECISÃO NECESSÁRIA:** Manter apenas uma ou diferenciar funcionalidade

2. **⚠️ Notificações Ausente do Sidebar**
   - Rota existe e funciona
   - **SUGESTÃO:** Adicionar ícone de sino no header com badge de contador

3. **⚠️ História da Música**
   - Apenas no sidebar do aluno
   - **PERGUNTA:** Professores também acessam? Admin?

---

## 📊 ANÁLISE DE CONSISTÊNCIA

### ✅ Pontos Fortes

1. **Estrutura Clara por Níveis**
   - Rotas bem organizadas por prefixo (`/alunos`, `/professores`, `/admin`)
   - Proteção de rotas implementada com `RoleProtectedRoute`

2. **Páginas de Detalhes Implementadas**
   - Sistema de navegação lista → detalhes funciona bem
   - Alunos têm todas as páginas de detalhes necessárias

3. **Autenticação Visual Completa**
   - Landing, Login e Signup com design Torii Portal consistente
   - Experiência visual unificada

### ⚠️ Inconsistências Identificadas

| # | Problema | Severidade | Impacto |
|---|----------|------------|---------|
| 1 | Perfil do aluno não está no sidebar | 🟡 MÉDIA | Dificulta acesso ao perfil |
| 2 | Duplicação `/instrumentos` vs `/alunos/instrumentos` | 🔴 ALTA | Confusão na navegação |
| 3 | Professor sem páginas de detalhes (turma, conteúdo, avaliação) | 🔴 ALTA | Funcionalidade incompleta |
| 4 | Admin com funcionalidades muito limitadas | 🟡 MÉDIA | Gestão manual necessária |
| 5 | Notificações sem acesso via sidebar | 🟢 BAIXA | Funciona, mas dificulta acesso |
| 6 | História da Música apenas para aluno | 🟡 MÉDIA | Professores podem precisar |
| 7 | Falta calendário/agenda para professor | 🟡 MÉDIA | Organização de aulas |
| 8 | Ícones inadequados no admin | 🟢 BAIXA | Apenas visual |

---

## 🎯 RECOMENDAÇÕES

### 🔴 PRIORIDADE ALTA (Implementar Primeiro)

1. **Resolver Duplicação de Instrumentos**
   ```typescript
   // OPÇÃO A: Manter apenas /instrumentos (compartilhada)
   // - Remover /alunos/instrumentos
   // - Atualizar sidebar do aluno
   
   // OPÇÃO B: Diferenciar funcionalidade
   // - /instrumentos → Catálogo geral (todos)
   // - /alunos/instrumentos → Meus instrumentos (aluno)
   ```

2. **Criar Páginas de Detalhes para Professor**
   ```
   CRIAR:
   - /professores/turmas/:id → TurmaDetailPage.tsx
   - /professores/conteudos/:id/editar → EditarConteudoPage.tsx
   - /professores/avaliacoes/:id → AvaliacaoDetailPage.tsx
   - /professores/alunos/:id → AlunoPerfilPage.tsx
   ```

3. **Adicionar Perfil ao Sidebar do Aluno**
   ```typescript
   // Adicionar antes dos itens comuns
   { name: 'Meu Perfil', path: '/alunos/perfil', icon: User }
   ```

### 🟡 PRIORIDADE MÉDIA (Melhorias)

4. **Expandir Funcionalidades Admin**
   ```
   CRIAR:
   - /admin/usuarios → Gestão de todos os usuários
   - /admin/professores → Gestão específica de professores
   - /admin/alunos → Gestão específica de alunos
   - /admin/turmas → Gestão de turmas
   - /admin/relatorios → Analytics e relatórios
   - /admin/logs → Logs do sistema
   - /admin/configuracoes → Configurações globais
   ```

5. **Melhorar Acesso a Notificações**
   ```typescript
   // No Header.tsx - Adicionar sino com badge
   <button className="relative">
     <Bell className="w-6 h-6" />
     {unreadCount > 0 && (
       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5">
         {unreadCount}
       </span>
     )}
   </button>
   ```

6. **Criar Calendário para Professor**
   ```
   CRIAR:
   - /professores/calendario → CalendarioPage.tsx
   - Visualização mensal/semanal de aulas
   - Integração com turmas
   ```

### 🟢 PRIORIDADE BAIXA (Polimento)

7. **Corrigir Ícones do Admin**
   ```typescript
   // No Sidebar.tsx - Seção Admin
   { name: 'Banco de Dados', path: '/admin/database', icon: Database },
   { name: 'Diagnóstico', path: '/admin/diagnostic', icon: Activity },
   ```

8. **Padronizar História da Música**
   ```
   DECIDIR:
   - Manter apenas para aluno? (atual)
   - OU disponibilizar para professor também?
   - OU criar versão específica para cada nível?
   ```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Correções Críticas
- [ ] Decidir sobre duplicação de Instrumentos
- [ ] Criar `TurmaDetailPage.tsx` para professores
- [ ] Criar `EditarConteudoPage.tsx` para professores
- [ ] Criar `AvaliacaoDetailPage.tsx` para professores
- [ ] Adicionar Perfil ao sidebar do aluno

### Fase 2: Expansão de Funcionalidades
- [ ] Criar páginas de gestão no Admin
- [ ] Implementar calendário para professor
- [ ] Criar componente de notificações no header
- [ ] Adicionar perfil do aluno visualizado por professor

### Fase 3: Polimento
- [ ] Corrigir ícones do admin
- [ ] Padronizar acesso à História da Música
- [ ] Adicionar animações de transição
- [ ] Implementar breadcrumbs

---

## 📈 ESTATÍSTICAS FINAIS

### Rotas por Nível
- **Públicas:** 8 rotas
- **Aluno:** 13 rotas (8 principais + 5 detalhes)
- **Professor:** 5 rotas
- **Admin:** 3 rotas
- **Compartilhadas:** 7 rotas
- **TOTAL:** 36 rotas

### Páginas Criadas
- **Aluno:** 14 páginas ✅
- **Professor:** 5 páginas ⚠️ (faltam detalhes)
- **Admin:** 3 páginas ⚠️ (muito limitado)
- **Compartilhadas:** 10 páginas ✅
- **TOTAL:** 32 páginas

### Cobertura do Sidebar
- **Aluno:** 100% (10/10 itens implementados)
- **Professor:** 100% (6/6 itens implementados) ⚠️ mas faltam rotas
- **Admin:** 100% (5/5 itens implementados) ⚠️ mas limitado

---

## 🎨 PRÓXIMOS PASSOS SUGERIDOS

1. **Resolver inconsistências críticas** (Instrumentos, Perfil)
2. **Completar funcionalidades de Professor** (páginas de detalhes)
3. **Expandir Admin** (gestão completa)
4. **Melhorar UX** (notificações, calendário)
5. **Testes de navegação** completos em cada nível

---

**Documento criado em:** 6 de dezembro de 2025  
**Responsável:** GitHub Copilot  
**Revisão necessária:** Sim - decisões de arquitetura pendentes
