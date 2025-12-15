
# Plano de Refatoração e Padronização do Admin Nipo School

Este documento serve como guia mestre para a finalização dos módulos administrativos do Nipo School, garantindo profundidade ("início, meio e fim") em cada funcionalidade.

## Estrutura Atual de Navegação (Sidebar)

### 1. Gestão Escolar
- [x] **Dashboard (`/admin`)**
  - Status: *Completo*.
  - A Fazer: Cards integrados com dados reais do Supabase (totalizadores). Ações rápidas funcionais.
- [x] **Alunos (`/admin/alunos`)**
  - Status: *Completo*.
  - A Fazer: Listagem com filtros e busca rápida. Página de detalhes rica com turmas e edição inline implementada.
- [x] **Professores (`/admin/professores`)**
  - Status: *Completo*.
  - A Fazer: Listagem visual rica. Página de perfil com edição inline e listagem de turmas ministradas.
- [x] **Turmas & Matrículas (`/admin/turmas`)**
  - Status: *Completo*.
  - A Fazer: Busca de alunos matriculados agora é server-side. CRUD de turmas migrado para Server Actions.

### 2. Acadêmico & Conteúdo
- [ ] **Aulas (`/admin/aulas`)**
  - Status: *Parcial*.
  - A Fazer: Kanban funcional (Persistência?), Detalhes da Aula (Conteúdo Rico), Vinculação com Materiais e Vídeos.
- [x] **Instrumentos (`/admin/instrumentos`)**
  - Status: *Completo*.
  - A Fazer: Edição com Abas (Mídia, Curiosidades) funcional.
- [x] **Repertório (`/admin/repertorio`)**
  - Status: *Completo*.
  - A Fazer: CRUD migrado para Server Actions. Delete implementado.
- [x] **História da Música (`/admin/historia`)**
  - Status: *Completo*.
  - A Fazer: CRUD de Períodos completo com Server Actions. Listagem otimizada (Server Component).

### 3. Engajamento
- [x] **Gamificação & XP (`/admin/gamificacao`)**
  - Status: *Completo*.
  - A Fazer: CRUD de Conquistas (Badges) funcional com pré-visualização. Níveis e Desafios mockados.

### 4. Sistema
- [x] **QR Codes (`/admin/qr/gerenciar`)**
  - Status: *Completo*.
  - A Fazer: Gerador funcional com opções de download e ativação.
- [x] **Diagnóstico (`/admin/diagnostico`)**
  - Status: *Completo*.
  - A Fazer: Health Check real do banco de dados (Supabase) integrado.
- [x] **Configurações (`/admin/configuracoes`)**
  - Status: *Completo*.
  - A Fazer: Adicionados campos de "Dados da Instituição" e visual premium.
- [x] **Ajuda (`/admin/ajuda`)**
  - Status: *Completo*.
  - A Fazer: Central de ajuda com FAQ interativo e busca.

---

## Log de Execução

- **2025-12-14**: Início da auditoria metódica.
- **Foco Atual**: Módulo **GAMIFICAÇÃO** (Engajamento).
    - Motivo: As aulas estão prontas e geram XP, mas não há onde visualizar ou gerenciar os níveis e conquistas que dão sentido a esse XP.

## Módulo: Gestão de Aulas (Audit)
1. **Listagem (`/admin/aulas`)**:
   - [x] Trocar visualização mock por dados reais do `getTodasAulas`.
   - [x] Implementar filtros de Status/Módulo funcionais.
2. **Detalhes (`/admin/aulas/[id]`)**:
   - [x] Criar página robusta de detalhes (exibindo Materiais, Links, Roteiro).
3. **Novo/Editar (`/admin/aulas/nova`)**:
   - [x] Criar formulário completo de Aula (Título, Descrição, Módulo, Ordem, Conteúdo Rico).
4. **Funcionalidades**:
   - [x] Mudar status (Rascunho -> Publicado) via Kanban ou Detalhe.

## Módulo: Gamificação (Audit)
1. **Página Principal (`/admin/gamificacao`)**:
   - [x] Criar visualização de Níveis (Tabela com XP necessário - *Mock funcional*).
   - [x] Criar visualização de Conquistas (Badges, critérios - *Dados Reais*).
2. **CRUD**:
   - [x] Editar Níveis de XP (Adiado: Pendente tabela no banco).
   - [x] Criar/Editar/Excluir Badges (Conquistas) - *Completo*.
3. **Integração**:
   - [x] Garantir que os tipos do Supabase (Nivel, Conquista) existam e sejam usados.

---

## Próximo Foco Sugerido
**Gestão Escolar > Turmas & Matrículas (`/admin/turmas`)**
Garantir que o fluxo de matricular aluno na turma busque da base real e atualize as vagas corretamente.

---
