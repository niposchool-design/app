# 🏗️ CRIAÇÃO DAS VIEWS ADMIN FALTANTES

## 🎯 **PROBLEMA RESOLVIDO:**
- ✅ **view_admin_dashboard** existe e funciona (dados reais confirmados)
- ❌ **admin_professores** e **admin_alunos** não existem (páginas admin falham)

---

## 📋 **VIEWS PARA CRIAR NO SUPABASE:**

### **1. VIEW ADMIN_PROFESSORES**
```sql
CREATE OR REPLACE VIEW admin_professores AS
SELECT 
    p.id,
    prof.nome as nome,
    prof.email,
    prof.full_name,
    prof.telefone,
    p.especialidade,
    p.biografia,
    p.nivel_ensino,
    p.experiencia_anos,
    p.ativo,
    p.data_contratacao,
    p.salario,
    p.criado_em,
    p.atualizado_em,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    -- Contagem de turmas
    COALESCE(
        (SELECT COUNT(*) FROM turmas t WHERE t.professor_id = p.id AND t.ativa = true), 
        0
    ) as total_turmas,
    -- Contagem de alunos
    COALESCE(
        (SELECT COUNT(DISTINCT ta.aluno_id) 
         FROM turmas t 
         JOIN turma_alunos ta ON t.id = ta.turma_id 
         WHERE t.professor_id = p.id AND t.ativa = true AND ta.ativo = true), 
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
    prof.nome as nome,
    prof.email,
    prof.full_name,
    prof.telefone,
    a.instrumento_principal,
    a.nivel_atual,
    a.data_nascimento,
    a.responsavel_nome,
    a.responsavel_telefone,
    a.responsavel_email,
    a.endereco,
    a.observacoes,
    a.ativo,
    a.criado_em,
    a.atualizado_em,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.streak_atual,
    prof.voted_logo,
    -- Status de atividade
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    -- Turmas do aluno
    COALESCE(
        (SELECT COUNT(*) FROM turma_alunos ta 
         JOIN turmas t ON ta.turma_id = t.id 
         WHERE ta.aluno_id = a.id AND ta.ativo = true AND t.ativa = true), 
        0
    ) as total_turmas,
    -- Aulas completadas
    COALESCE(
        (SELECT COUNT(*) FROM progresso_aluno pa WHERE pa.aluno_id = a.id AND pa.completado = true), 
        0
    ) as aulas_completadas
FROM alunos a
LEFT JOIN profiles prof ON a.id = prof.id
WHERE a.ativo = true
ORDER BY a.criado_em DESC;
```

### **3. VIEW ADMIN_USUARIOS_COMPLETOS (BONUS)**
```sql
CREATE OR REPLACE VIEW admin_usuarios_completos AS
SELECT 
    prof.id,
    prof.nome,
    prof.email,
    prof.full_name,
    prof.telefone,
    -- Determinar tipo de usuário real
    COALESCE(
        prof.tipo_usuario,
        CASE 
            WHEN EXISTS(SELECT 1 FROM admins WHERE id = prof.id) THEN 'admin'
            WHEN EXISTS(SELECT 1 FROM professores WHERE id = prof.id) THEN 'professor'
            WHEN EXISTS(SELECT 1 FROM alunos WHERE id = prof.id) THEN 'aluno'
            ELSE 'indefinido'
        END
    ) as tipo_usuario,
    prof.joined_at,
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.streak_atual,
    -- Status de atividade
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade
FROM profiles prof
ORDER BY prof.joined_at DESC;
```

---

## 🚀 **EXECUTE NO SUPABASE SQL EDITOR:**

1. **Copie e cole** cada CREATE VIEW acima
2. **Execute uma por vez**
3. **Confirme criação** com: `SELECT COUNT(*) FROM admin_professores;`
4. **Teste dados** com: `SELECT * FROM admin_alunos LIMIT 5;`

---

**Após criar, me confirme que funcionou para atualizar as páginas admin!** ✅