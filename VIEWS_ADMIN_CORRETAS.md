# 🏗️ VIEWS ADMIN BASEADAS NA ESTRUTURA REAL

## 🔍 **ANÁLISE CONCLUÍDA:**
✅ **Estrutura real descoberta** - Agora posso criar views sem erros!

### **📋 CAMPOS REAIS DESCOBERTOS:**

**PROFESSORES:**
- `id, formacao, biografia, especialidades (ARRAY), ativo, criado_em`

**ALUNOS:**
- `id, instrumento, nivel, turma, data_ingresso, ativo, criado_em, instrumento_id, turma_principal_id`

**PROFILES:**
- `id, email, full_name, dob, instrument, voted_logo, has_voted, avatar_url, church_name, user_level, total_points, bio, phone, city, state, joined_at, last_active, current_streak, best_streak, lessons_completed, modules_completed, theme_preference, notification_enabled, sound_enabled, tipo_usuario, nome`

---

## 🏗️ **VIEWS CORRETAS PARA CRIAR:**

### **1. VIEW ADMIN_PROFESSORES**
```sql
CREATE OR REPLACE VIEW admin_professores AS
SELECT 
    p.id,
    prof.nome,
    prof.email,
    prof.full_name,
    prof.phone,
    p.formacao,
    p.biografia,
    p.especialidades,
    p.ativo,
    p.criado_em,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.current_streak,
    prof.lessons_completed,
    prof.modules_completed,
    prof.joined_at,
    -- Status de atividade baseado no last_active
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    -- Contagem de turmas (se a tabela existir)
    COALESCE(
        (SELECT COUNT(*) FROM turmas t WHERE t.professor_id = p.id), 
        0
    ) as total_turmas,
    -- Contagem de alunos via turmas
    COALESCE(
        (SELECT COUNT(DISTINCT ta.aluno_id) 
         FROM turmas t 
         JOIN turma_alunos ta ON t.id = ta.turma_id 
         WHERE t.professor_id = p.id), 
        0
    ) as total_alunos,
    -- Contagem de conteúdos
    COALESCE(
        (SELECT COUNT(*) FROM professores_conteudos pc WHERE pc.criado_por = p.id), 
        0
    ) as total_conteudos
FROM professores p
LEFT JOIN profiles prof ON p.id = prof.id
WHERE p.ativo = true
ORDER BY p.criado_em DESC;
```

### **2. VIEW ADMIN_ALUNOS**
```sql
CREATE OR REPLACE VIEW admin_alunos AS
SELECT 
    a.id,
    prof.nome,
    prof.email,
    prof.full_name,
    prof.phone,
    a.instrumento,
    a.nivel,
    a.turma,
    a.data_ingresso,
    a.ativo,
    a.criado_em,
    a.instrumento_id,
    a.turma_principal_id,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.current_streak,
    prof.best_streak,
    prof.lessons_completed,
    prof.modules_completed,
    prof.voted_logo,
    prof.has_voted,
    prof.joined_at,
    prof.dob,
    prof.city,
    prof.state,
    -- Status de atividade baseado no last_active
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    -- Turmas do aluno
    COALESCE(
        (SELECT COUNT(*) FROM turma_alunos ta WHERE ta.aluno_id = a.id), 
        0
    ) as total_turmas_matriculado,
    -- Calcular idade aproximada
    CASE 
        WHEN prof.dob IS NOT NULL THEN 
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, prof.dob))
        ELSE NULL
    END as idade,
    -- Status de perfil completo
    CASE 
        WHEN prof.nome IS NOT NULL 
         AND prof.email IS NOT NULL 
         AND prof.phone IS NOT NULL 
         AND a.instrumento IS NOT NULL 
        THEN true
        ELSE false
    END as perfil_completo
FROM alunos a
LEFT JOIN profiles prof ON a.id = prof.id
WHERE a.ativo = true
ORDER BY a.criado_em DESC;
```

### **3. VIEW ADMIN_USUARIOS_COMPLETOS**
```sql
CREATE OR REPLACE VIEW admin_usuarios_completos AS
SELECT 
    prof.id,
    prof.nome,
    prof.email,
    prof.full_name,
    prof.phone,
    prof.tipo_usuario,
    prof.joined_at,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.current_streak,
    prof.best_streak,
    prof.lessons_completed,
    prof.modules_completed,
    prof.voted_logo,
    prof.has_voted,
    prof.dob,
    prof.city,
    prof.state,
    -- Status de atividade
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    -- Verificar se existe nas tabelas específicas
    EXISTS(SELECT 1 FROM professores WHERE id = prof.id) as e_professor,
    EXISTS(SELECT 1 FROM alunos WHERE id = prof.id) as e_aluno,
    EXISTS(SELECT 1 FROM admins WHERE id = prof.id) as e_admin
FROM profiles prof
ORDER BY prof.joined_at DESC;
```

---

## 🚀 **EXECUTE NO SUPABASE:**

1. **Copie cada CREATE VIEW** acima
2. **Execute uma por vez** no SQL Editor
3. **Teste com:** `SELECT COUNT(*) FROM admin_professores;`
| count |
| ----- |
| 4     |
4. **Confirme funcionamento:** `SELECT * FROM admin_alunos LIMIT 3;`


View running queries


Public schema tables overview

1
SELECT * FROM admin_alunos LIMIT 3;

Results

Chart

Export

Source

Primary database

Role
postgres

Run
CTRL

ERROR:  42P01: relation "admin_alunos" does not exist
LINE 1: SELECT * FROM admin_alunos LIMIT 3;
                      ^

**Agora as views usam apenas campos que existem realmente!** ✅