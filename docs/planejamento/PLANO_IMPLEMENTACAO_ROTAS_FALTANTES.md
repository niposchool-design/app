# 🚀 PLANO DE IMPLEMENTAÇÃO - ROTAS FALTANTES
*Implementar features documentadas mas não implementadas | 8 de Dezembro de 2025*

---

## 🎯 OBJETIVO

**Implementar as rotas e features documentadas** que ainda não existem no app, garantindo que a aplicação atenda 100% da documentação.

---

## 📊 SITUAÇÃO ATUAL

### ✅ O que ESTÁ implementado
- Sistema de Conquistas completo
- Sistema de Portfólio completo
- Sistema de Desafios completo
- Sistema de História da Música
- Dashboards (Admin, Professor, Aluno)
- Sistema de Progresso
- Autenticação básica

### ❌ O que FALTA implementar (18 rotas documentadas)

#### **Rotas Públicas** (3 rotas)
1. `/verify-email` - Verificação de email
2. `/confirmacao` - Redirect para verify-email
3. `/confirm-email` - Redirect para verify-email

#### **Rotas Protegidas Básicas** (4 rotas)
4. `/vote` - Sistema de votação (logo/features)
5. `/scanner` - Scanner QR Code (presença)
6. `/scanner-publico` - Scanner público (testes)
7. `/scanner-rapido` - Scanner em modal

#### **Rotas Admin** (8 rotas)
8. `/admin/kanban` - Kanban de aulas
9. `/admin/aulas` - Lista de aulas
10. `/admin/aulas/:id` - Detalhes da aula
11. `/admin/aulas/editar/:id` - Editar aula
12. `/admin/professores` - Gestão de professores
13. `/admin/alunos` - Gestão de alunos
14. `/admin/qr-manager` - Gerenciador QR Code
15. `/admin/qr-display/:aulaId` - Exibição QR (tela cheia)

#### **Rotas Professores** (2 rotas)
16. `/professores/conteudos/:id` - Detalhes do conteúdo
17. `/professores/estatisticas` - Estatísticas do professor

#### **Rotas Alunos** (1 rota)
18. `/modulos` - Módulos de estudo

---

## 🔧 CORREÇÕES DE PATHS (NÃO remover, CORRIGIR)

### Paths a Corrigir
1. `/professores/novo` → `/professores/conteudos/novo` (manter ambos ou padronizar)
2. `/alunos/instrumentos/:id` → também disponibilizar em `/instrumentos/:id` (rota pública)
3. `/alunos/perfil` → também criar `/perfil` (atalho geral)

---

## 📋 PLANO DE IMPLEMENTAÇÃO POR FASES

### 🟢 FASE 1 - AUTENTICAÇÃO (Prioridade ALTA)
**Prazo**: 1-2 dias  
**Rotas**: 3

#### 1.1. Verificação de Email
```typescript
// src/features/auth/pages/VerifyEmailPage.tsx
- Página de verificação de email
- Reenvio de email
- Feedback visual
- Redirect após verificação
```

#### 1.2. Redirects de Confirmação
```typescript
// src/app/router.tsx
{
  path: '/confirmacao',
  element: <Navigate to="/verify-email" replace />
},
{
  path: '/confirm-email',
  element: <Navigate to="/verify-email" replace />
}
```

**Arquivos a criar**:
- `src/features/auth/pages/VerifyEmailPage.tsx`

---

### 🟡 FASE 2 - SISTEMA DE VOTAÇÃO (Prioridade MÉDIA)
**Prazo**: 2-3 dias  
**Rota**: 1

#### 2.1. Sistema de Votação
```typescript
// src/features/shared/pages/VotePage.tsx
- Votação de logo
- Votação de features
- Visualização de resultados
- Controle: um voto por usuário
```

**Banco de dados**:
```sql
-- Tabela já existe: profiles.has_voted, profiles.voted_logo
-- Criar se necessário:
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id),
  vote_type text, -- 'logo', 'feature'
  vote_value text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, vote_type)
);
```

**Arquivos a criar**:
- `src/features/shared/pages/VotePage.tsx`
- `src/features/shared/components/VoteCard.tsx`

---

### 🔵 FASE 3 - SISTEMA QR CODE (Prioridade MÉDIA-ALTA)
**Prazo**: 3-5 dias  
**Rotas**: 4

#### 3.1. Scanner de Presença
```typescript
// src/features/shared/pages/ScannerPage.tsx
- Scanner QR via câmera
- Registro de presença
- Histórico de scans
- Feedback visual/sonoro
```

#### 3.2. Scanner Público
```typescript
// src/features/shared/pages/ScannerPublicoPage.tsx
- Scanner sem autenticação (testes)
- Exibição de informações do QR
```

#### 3.3. Scanner em Modal
```typescript
// src/features/shared/components/ScannerModal.tsx
- Modal reutilizável
- Integração rápida
- Callback de sucesso
```

#### 3.4. QR Manager (Admin)
```typescript
// src/features/admin/pages/QRManagerPage.tsx
- Gerar QR codes
- Listar QR codes
- Associar a aulas/instrumentos
- Estatísticas de scans
```

#### 3.5. QR Display (Admin)
```typescript
// src/features/admin/pages/QRDisplayPage.tsx
- Tela cheia com QR
- Auto-refresh
- Timer de exibição
- Ideal para projetar
```

**Banco de dados**:
```sql
-- Tabelas já existem:
-- qr_codes (id, tipo, referencia_id, codigo, ativo, created_at)
-- qr_scans (id, qr_code_id, user_id, scanned_at)
```

**Dependências**:
- ✅ `qrcode@1.5.4` (já instalado)
- ✅ `jsqr@1.4.0` (já instalado)
- ✅ `react-qr-scanner@1.0.0-alpha.11` (já instalado)

**Arquivos a criar**:
- `src/features/shared/pages/ScannerPage.tsx`
- `src/features/shared/pages/ScannerPublicoPage.tsx`
- `src/features/shared/components/ScannerModal.tsx`
- `src/features/admin/pages/QRManagerPage.tsx`
- `src/features/admin/pages/QRDisplayPage.tsx`

---

### 🔴 FASE 4 - GESTÃO ADMIN (Prioridade ALTA)
**Prazo**: 5-7 dias  
**Rotas**: 8

#### 4.1. Kanban de Aulas
```typescript
// src/features/admin/pages/AulasKanbanPage.tsx
- Board Kanban (Planejada, Em Andamento, Concluída)
- Drag & Drop
- Filtros (responsável, data, nível)
- Cards com informações resumidas
```

#### 4.2. Gestão de Aulas
```typescript
// src/features/admin/pages/AulasListPage.tsx
- Lista completa de aulas
- Filtros e busca
- Ações rápidas (editar, excluir, duplicar)
- Paginação

// src/features/admin/pages/AulaDetailPage.tsx
- Detalhes completos da aula
- Atividades, materiais, checklist
- Feedbacks recebidos
- Estatísticas de participação

// src/features/admin/pages/AulaEditPage.tsx
- Formulário completo de edição
- Validações
- Preview de mudanças
- Histórico de alterações
```

#### 4.3. Gestão de Professores
```typescript
// src/features/admin/pages/ProfessoresListPage.tsx
- Lista de professores
- Filtros (ativo, especialidade)
- Estatísticas por professor
- Ações (editar, desativar)
```

#### 4.4. Gestão de Alunos
```typescript
// src/features/admin/pages/AlunosListPage.tsx
- Lista de alunos
- Filtros (instrumento, nível, turma)
- Estatísticas por aluno
- Ações (editar, transferir turma)
```

**Banco de dados**:
```sql
-- Tabelas já existem:
-- aulas (30 aulas planejadas)
-- professores
-- alunos
-- turmas
-- matriculas
```

**Componentes auxiliares**:
- Kanban Board (DnD)
- Data Table reutilizável
- Filtros avançados

**Arquivos a criar**:
- `src/features/admin/pages/AulasKanbanPage.tsx`
- `src/features/admin/pages/AulasListPage.tsx`
- `src/features/admin/pages/AulaDetailPage.tsx`
- `src/features/admin/pages/AulaEditPage.tsx`
- `src/features/admin/pages/ProfessoresListPage.tsx`
- `src/features/admin/pages/AlunosListPage.tsx`
- `src/features/admin/components/KanbanBoard.tsx`
- `src/features/admin/components/DataTable.tsx`

---

### 🟣 FASE 5 - ÁREA DOS PROFESSORES (Prioridade MÉDIA)
**Prazo**: 2-3 dias  
**Rotas**: 2

#### 5.1. Detalhes do Conteúdo
```typescript
// src/features/professores/pages/ConteudoDetailPage.tsx
- Visualização completa do conteúdo
- Estatísticas de uso
- Comentários/feedbacks
- Editar/Excluir
```

#### 5.2. Estatísticas do Professor
```typescript
// src/features/professores/pages/EstatisticasPage.tsx
- Visão geral (aulas dadas, alunos atendidos)
- Gráficos de engajamento
- Performance dos conteúdos
- Evolução no tempo
```

**Banco de dados**:
```sql
-- Tabelas já existem:
-- professores_conteudos
-- aulas (com responsavel_id)
```

**Arquivos a criar**:
- `src/features/professores/pages/ConteudoDetailPage.tsx`
- `src/features/professores/pages/EstatisticasPage.tsx`
- `src/features/professores/components/StatsCard.tsx`
- `src/features/professores/components/EngagementChart.tsx`

---

### 🟢 FASE 6 - SISTEMA DE MÓDULOS (Prioridade BAIXA)
**Prazo**: 3-4 dias  
**Rota**: 1

#### 6.1. Módulos de Estudo
```typescript
// src/features/alunos/pages/ModulosPage.tsx
- Lista de módulos disponíveis
- Progresso por módulo
- Lessons dentro de cada módulo
- Bloqueio por pré-requisitos
```

**Banco de dados**:
```sql
-- Tabelas já existem:
-- modules
-- lessons
-- user_progress
```

**Arquivos a criar**:
- `src/features/alunos/pages/ModulosPage.tsx`
- `src/features/alunos/components/ModuleCard.tsx`
- `src/features/alunos/components/LessonList.tsx`

---

## 🔧 CORREÇÕES DE PATHS

### Criar Rotas Duplicadas/Alternativas

```typescript
// src/app/router.tsx

// 1. Instrumentos - criar rota pública também
{
  path: '/instrumentos/:id',
  element: <InstrumentoDetailPage /> // Mesmo componente
},

// 2. Perfil - criar atalho geral
{
  path: '/perfil',
  element: (
    <ProtectedRoute>
      <RoleBasedRedirect 
        routes={{
          aluno: '/alunos/perfil',
          professor: '/professores/perfil',
          admin: '/admin/perfil'
        }}
      />
    </ProtectedRoute>
  )
},

// 3. Novo Conteúdo - padronizar ambos
{
  path: '/professores/conteudos/novo',
  element: <Navigate to="/professores/novo" replace />
}
```

---

## 📦 DEPENDÊNCIAS NECESSÁRIAS

### Já Instaladas ✅
- `qrcode@1.5.4` - Geração QR
- `jsqr@1.4.0` - Leitura QR
- `react-qr-scanner@1.0.0-alpha.11` - Scanner React

### A Instalar (Opcional) 📦
```bash
# Para Kanban Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable

# Para Charts (estatísticas)
npm install recharts
# ou
npm install chart.js react-chartjs-2
```

---

## 🎯 CRONOGRAMA SUGERIDO

| Fase | Prazo | Rotas | Status |
|------|-------|-------|--------|
| FASE 1 - Autenticação | 1-2 dias | 3 | 📋 Planejado |
| FASE 2 - Votação | 2-3 dias | 1 | 📋 Planejado |
| FASE 3 - QR Code | 3-5 dias | 4 | 📋 Planejado |
| FASE 4 - Admin | 5-7 dias | 8 | 📋 Planejado |
| FASE 5 - Professores | 2-3 dias | 2 | 📋 Planejado |
| FASE 6 - Módulos | 3-4 dias | 1 | 📋 Planejado |
| **TOTAL** | **16-24 dias** | **19 rotas** | - |

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Por cada rota implementada:

- [ ] Criar componente de página
- [ ] Adicionar rota em `router.tsx`
- [ ] Adicionar constante em `routes.ts` (se necessário)
- [ ] Implementar proteção/permissão adequada
- [ ] Criar componentes auxiliares
- [ ] Integrar com Supabase (queries)
- [ ] Adicionar validações
- [ ] Implementar loading states
- [ ] Implementar error handling
- [ ] Testar funcionalidade
- [ ] Adicionar ao menu/navegação (se aplicável)
- [ ] Atualizar documentação

---

## 🔄 PRÓXIMOS PASSOS IMEDIATOS

1. ✅ **Priorizar fases** com stakeholders
2. ✅ **Iniciar FASE 1** (Autenticação) - mais simples
3. ✅ **Validar design** de cada página antes de implementar
4. ✅ **Criar branches** por fase (ex: `feature/fase-1-auth`)
5. ✅ **Implementar incrementalmente** - uma rota por vez
6. ✅ **Testar cada feature** antes de avançar

---

## 📝 OBSERVAÇÕES IMPORTANTES

### Não Remover da Documentação ✅
- Todas as rotas documentadas **devem ser implementadas**
- Documentação é o **guia do que deve existir**
- App deve **atingir 100% da documentação**

### Paths Duplicados São OK ✅
- `/instrumentos/:id` E `/alunos/instrumentos/:id` - ambos válidos
- `/perfil` E `/alunos/perfil` - redirecionamento inteligente
- Facilita navegação de diferentes contextos

### Banco de Dados ✅
- Maioria das tabelas **já existe** (68 tabelas)
- Poucas tabelas precisam ser criadas (ex: `votes`)
- Focar em **usar** tabelas existentes

---

**Data**: 8 de Dezembro de 2025  
**Status**: 📋 Planejamento Completo  
**Próximo**: Iniciar FASE 1 - Autenticação

**Referências**:
- [Análise de Discrepâncias](../analises/RELATORIO_DISCREPANCIAS_DOCS_VS_APP.md)
- [Documentação Completa](../DOCUMENTACAO_COMPLETA_NIPO_SCHOOL.md)
- [Rotas Definidas](../../src/lib/constants/routes.ts)
