# 🗄️ Estrutura Real do Banco de Dados - Descoberta via MCP

> Documentação gerada em: 2025
> 
> Esta é a estrutura REAL do banco Supabase do Nipo School, descoberta via MCP Server.

---

## 📊 Schema: `public`

### Tabelas Principais

#### 1. `profiles`
Perfil completo dos usuários (alunos, professores, admins)

| Coluna | Tipo | Nullable | Default | Check/FK |
|--------|------|----------|---------|----------|
| `id` | uuid | NOT NULL | - | PK, FK → auth.users.id |
| `email` | text | YES | - | UNIQUE |
| `nome` | text | YES | - | - |
| `telefone` | text | YES | - | - |
| `avatar_url` | text | YES | - | - |
| `data_nascimento` | date | YES | - | - |
| **`tipo_usuario`** | text | YES | - | CHECK: 'admin', 'professor', 'aluno' |
| `ativo` | boolean | YES | true | - |
| `created_at` | timestamptz | YES | now() | - |
| `updated_at` | timestamptz | YES | now() | - |

**Observações:**
- Campo `tipo_usuario` é a fonte de verdade para identificar o papel do usuário
- FK para `auth.users` garante integridade com autenticação Supabase
- RLS desabilitado (rls_enabled: false)

---

#### 2. `user_roles`
Papéis/funções dos usuários (duplicação de controle)

| Coluna | Tipo | Nullable | Default | Check/FK |
|--------|------|----------|---------|----------|
| `id` | uuid | NOT NULL | gen_random_uuid() | PK |
| `user_id` | uuid | YES | - | FK → auth.users.id |
| **`role_type`** | text | NOT NULL | - | CHECK: 'admin', 'professor', 'aluno' |
| `is_active` | boolean | YES | true | - |
| `created_at` | timestamptz | YES | now() | - |
| `updated_at` | timestamptz | YES | now() | - |

**Observações:**
- Parece redundante com `profiles.tipo_usuario`
- Pode ser usado para múltiplos papéis por usuário (ex: professor + admin)
- RLS desabilitado

---

#### 3. `aulas`
Aulas agendadas, em andamento ou concluídas

| Coluna | Tipo | Nullable | Default | Check/FK |
|--------|------|----------|---------|----------|
| `id` | uuid | NOT NULL | gen_random_uuid() | PK |
| `titulo` | text | NOT NULL | - | - |
| `descricao` | text | YES | - | - |
| `professor_id` | uuid | YES | - | FK → auth.users.id |
| `data` | timestamptz | NOT NULL | - | - |
| `duracao_minutos` | integer | YES | 60 | - |
| **`status`** | text | YES | 'agendada' | CHECK: 'agendada', 'em_andamento', 'concluida', 'cancelada' |
| `sala` | text | YES | - | - |
| `instrumento` | text | YES | - | - |
| **`nivel`** | text | YES | - | CHECK: 'iniciante', 'intermediario', 'avancado' |
| `max_alunos` | integer | YES | 10 | - |
| `ativo` | boolean | YES | true | - |
| `created_at` | timestamptz | YES | now() | - |
| `updated_at` | timestamptz | YES | now() | - |

**Observações:**
- `status` controla lifecycle da aula
- `nivel` define complexidade (iniciante/intermediário/avançado)
- FK para `auth.users` no `professor_id`
- RLS desabilitado

---

## 🔍 Views Públicas (14 encontradas)

Views descobertas no schema `public` (principalmente relacionadas a finanças):

- `anexos`
- `centros_custo`
- `contas_financeiras`
- `formas_pagamento`
- `fornecedores`
- `lancamentos`
- `parcelas`
- (+ 7 outras views)

> ⚠️ **Nota**: As views parecem ser principalmente do sistema financeiro. Precisamos explorar se existem views específicas para área pedagógica.

---

## 🏗️ Outros Schemas Descobertos

### Schema `finance` (16 tabelas)
- Sistema financeiro completo
- Tabelas: contas, lançamentos, parcelas, etc.

### Schema `integration` (7 tabelas)
- Integrações com sistemas externos

### Schema `legacy` (5 tabelas)
- Dados legados (migração)

### Schema `auth` (22 tabelas)
- Tabelas do Supabase Auth
- Gerenciadas automaticamente

---

## 📝 Queries Implementadas

### Dashboard Admin (`lib/supabase/queries/admin.ts`)

```typescript
// Contagens usando profiles.tipo_usuario (campo real)
- getAdminDashboardStats()
  - totalAlunos (profiles.tipo_usuario = 'aluno')
  - totalProfessores (profiles.tipo_usuario = 'professor')
  - totalAulas (aulas.ativo = true, status != 'cancelada')
  - aulasHoje (aulas filtradas por data de hoje)

// Listas usando profiles.tipo_usuario
- getProfessores(filters)
- getAlunos(filters)
- getProfessorById(userId)
- getAlunoById(userId)
- getAulasAgendadas(limit)
```

**Mudança importante:**
- ✅ Antes: Usava `user_roles.role_type` (menos confiável)
- ✅ Agora: Usa `profiles.tipo_usuario` (campo direto na tabela principal)

---

## 🔐 Row Level Security (RLS)

**Status atual:** RLS **desabilitado** em todas as tabelas (`rls_enabled: false`)

⚠️ **Ação recomendada:** Implementar RLS para produção!

---

## 🎯 Próximos Passos

1. ✅ Estrutura base mapeada
2. ⏳ Explorar views em detalhes (definições SQL)
3. ⏳ Verificar relacionamentos em outros schemas
4. ⏳ Identificar tabelas de currículo/pedagogia
5. ⏳ Mapear tabelas de instrumentos/matérias
6. ⏳ Criar queries para área de professores
7. ⏳ Criar queries para área de alunos
8. ⏳ Implementar RLS policies

---

## 🚀 Como foi descoberto

```bash
# Via MCP Server (@supabase/mcp-server-supabase)
# Configurado em: %APPDATA%/Claude/claude_desktop_config.json

Tools usados:
- mcp_supabase_list_tables (schema: public)
- mcp_supabase_execute_sql (information_schema.columns)
- mcp_supabase_execute_sql (information_schema.tables)
```

---

**Conclusão:** Banco já possui estrutura básica funcional. Foco agora deve ser:
1. Conectar frontend às tabelas/views existentes
2. Explorar schemas `finance`, `integration`, `legacy`
3. Identificar dados pedagógicos (currículo, progressão, etc.)
