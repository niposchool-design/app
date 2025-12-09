# 🧹 LIMPEZA E REORGANIZAÇÃO - NIPO SCHOOL

**Data**: 08/12/2025  
**Objetivo**: Voltar à estrutura correta conforme documentação oficial

---

## 📋 SITUAÇÃO ATUAL

### ❌ Problemas Identificados:

1. **Criamos tabelas que não existem na documentação**:
   - `user_badges` - Não está no banco real
   - `aulas_agendadas` - Conceito errado (app não tem agendamento individual)
   - Tabelas de `aula_materiais`, `aula_presencas`, `aula_avaliacoes` - Não fazem parte

2. **Confusão entre duas tabelas diferentes**:
   - `aulas` (currículo/módulos) - ✅ EXISTE no banco
   - `aulas_agendadas` (agendamento individual) - ❌ NÃO EXISTE (criamos por engano)

3. **Documentos criados fora da estrutura real**:
   - CRIAR_TABELAS_AULAS.sql
   - CRIAR_AULAS_AGENDADAS.sql
   - CRIAR_TABELA_USER_BADGES.sql
   - POPULAR_DADOS_EXEMPLO.sql
   - CORRECAO_PROFESSOR_ID.md
   - GUIA_EXECUTAR_SQLS.md
   - CHECK_AULAS_STRUCTURE.sql

---

## ✅ ESTRUTURA REAL DO BANCO (Conforme Documentação)

### 🎯 Tabelas Principais:

#### 1. **AUTENTICAÇÃO E PERFIL**
```
auth.users (Supabase nativo)
└─ profiles (perfil completo do usuário)
   - total_points, current_streak, best_streak
   - lessons_completed, modules_completed
   - instrument, user_level
```

#### 2. **USUÁRIOS POR TIPO**
```
profiles
├─ alunos (FK para profiles.id)
├─ professores (FK para profiles.id)
└─ admins (via profiles ou tipo_usuario)
```

#### 3. **CONTEÚDO EDUCACIONAL**
```
modules (módulos do curso)
└─ lessons (aulas dos módulos)
   └─ user_progress (progresso do aluno nas aulas)
```

#### 4. **GAMIFICAÇÃO**
```
achievements (conquistas disponíveis)
└─ user_achievements (conquistas ganhas pelos usuários)
```

#### 5. **SISTEMA ALPHA**
```
alpha_metodologias (9 metodologias musicais)
alpha_desafios (41 desafios semanais)
alpha_badges (26 badges do sistema Alpha)
alpha_desafio_submissions (submissões de desafios)
```

#### 6. **INSTRUMENTOS**
```
instrumentos (69 instrumentos)
instrumento_fisicos (inventário físico)
```

#### 7. **HISTÓRIA DA MÚSICA**
```
historia_periodos (12 períodos)
historia_compositores (21 compositores)
historia_obras (obras dos compositores)
```

#### 8. **CURRÍCULO**
```
aulas (30 aulas do currículo - NÃO é agendamento!)
- numero, titulo, modulo_id
- data_programada, objetivo_didatico
- desafio_alpha, nivel, formato
- status, responsavel_id
```

---

## 🗑️ ARQUIVOS PARA DELETAR

### SQL Scripts Incorretos:
- ❌ sql_scripts/CRIAR_TABELAS_AULAS.sql
- ❌ sql_scripts/CRIAR_AULAS_AGENDADAS.sql
- ❌ sql_scripts/CRIAR_TABELA_USER_BADGES.sql
- ❌ sql_scripts/POPULAR_DADOS_EXEMPLO.sql
- ❌ sql_scripts/CHECK_AULAS_STRUCTURE.sql
- ❌ scripts/executar-sqls-completo.mjs

### Documentos Incorretos:
- ❌ docs/CORRECAO_PROFESSOR_ID.md
- ❌ docs/GUIA_EXECUTAR_SQLS.md
- ❌ docs/PLANO_ESTRUTURACAO_APP.md (baseado em premissa errada)
- ❌ docs/RELATORIO_FINAL_ESTRUTURACAO.md (baseado em premissa errada)

---

## ✅ ESTRUTURA CORRETA DO APP

### 📱 Funcionalidades Reais (Conforme Documentação):

#### **ÁREA DO ALUNO**:
1. ✅ Dashboard pessoal (total_points, current_streak)
2. ✅ Progresso em aulas (user_progress + lessons)
3. ✅ Conquistas (user_achievements + achievements)
4. ✅ Desafios Alpha (alpha_desafios + alpha_desafio_submissions)
5. ✅ Biblioteca de instrumentos
6. ✅ História da música
7. ✅ Portfolio (obras/criações do aluno)
8. ✅ QR Check-in (presença)

#### **ÁREA DO PROFESSOR**:
1. ✅ Gestão de aulas do currículo (tabela `aulas`)
2. ✅ Visualizar progresso dos alunos
3. ✅ Criar/gerenciar desafios
4. ✅ Feedback em submissões
5. ✅ Gerar QR codes para presença
6. ✅ Gestão de instrumentos físicos

#### **ÁREA DO ADMIN**:
1. ✅ Gestão completa de usuários
2. ✅ Configuração de módulos e aulas
3. ✅ Criação de conquistas
4. ✅ Relatórios completos
5. ✅ Auditoria do sistema

---

## 🎯 PÁGINAS QUE PRECISAM AJUSTE

### `/alunos/aulas` - MinhasAulasPage
**❌ Estado Atual**: Busca `aulas_agendadas` (não existe)
**✅ Deveria Ser**: Mostrar progresso nas aulas do currículo

```typescript
// ERRADO (atual):
.from('aulas_agendadas')

// CORRETO (deveria ser):
.from('user_progress')
.select(`
  *,
  lessons (
    id, title, description, video_url,
    modules (title)
  )
`)
.eq('user_id', user.id)
.order('started_at', { ascending: false })
```

### `/alunos/conquistas` - ConquistasPage
**❌ Estado Atual**: Tenta usar `user_badges` (não existe)
**✅ Deveria Ser**: Usar `user_achievements`

```typescript
// ERRADO (atual):
.from('user_badges')

// CORRETO:
.from('user_achievements')
.select(`
  *,
  achievements (
    id, name, description, badge_icon, 
    badge_color, points_reward, category
  )
`)
.eq('user_id', user.id)
```

---

## 🚀 PLANO DE AÇÃO

### FASE 1: LIMPEZA (5 min)
1. ✅ Deletar arquivos SQL incorretos
2. ✅ Deletar documentos baseados em premissa errada
3. ✅ Deletar scripts de automação que não funcionam

### FASE 2: CORREÇÃO DE PÁGINAS (15 min)
1. ✅ Corrigir MinhasAulasPage → usar user_progress
2. ✅ Corrigir ConquistasPage → usar user_achievements
3. ✅ Verificar outras páginas que podem estar erradas

### FASE 3: DOCUMENTAÇÃO CORRETA (10 min)
1. ✅ Criar guia de integração correto
2. ✅ Mapear todas as queries necessárias
3. ✅ Documentar estrutura real do banco

---

## 📊 TABELAS QUE REALMENTE EXISTEM

Conforme `mapa_copmleto_banco_de_dados.md`:

```
✅ auth.users (Supabase)
✅ profiles
✅ alunos
✅ professores
✅ modules
✅ lessons
✅ user_progress
✅ achievements
✅ user_achievements
✅ devotional_content
✅ alpha_metodologias
✅ alpha_desafios
✅ alpha_badges
✅ alpha_desafio_submissions
✅ instrumentos
✅ instrumento_fisicos
✅ historia_periodos
✅ historia_compositores
✅ historia_obras
✅ aulas (currículo)
```

---

## ⚠️ CONCEITOS ERRADOS A ABANDONAR

1. ❌ **"Aulas agendadas"** - App não tem agendamento individual
2. ❌ **"user_badges"** - Sistema usa `user_achievements`
3. ❌ **"Materiais de aula"** - Materiais estão em `lessons` (PDF, áudio, vídeo)
4. ❌ **"Presença em aulas"** - Sistema usa QR code + check-ins

---

## ✅ CONCEITOS CORRETOS

1. ✅ **Aulas = Currículo** - Tabela `aulas` é o planejamento pedagógico
2. ✅ **Progresso** - `user_progress` rastreia aluno em cada lesson
3. ✅ **Conquistas** - `user_achievements` + `achievements`
4. ✅ **Badges Alpha** - `alpha_badges` é sistema separado (26 badges)
5. ✅ **Desafios** - `alpha_desafios` + `alpha_desafio_submissions`

---

## 🎯 PRÓXIMO PASSO

Confirmar para executar limpeza completa e correção das páginas.
