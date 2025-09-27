# 🚨 CORREÇÃO DA VIEW ADMIN_ALUNOS

## ❌ **PROBLEMA IDENTIFICADO:**
A view `admin_alunos` deu erro ao ser criada. Possíveis causas:
- Campo inexistente na consulta
- Problema na estrutura SQL
- Tabela relacionada não existe

## 🔧 **VIEW ADMIN_ALUNOS SIMPLIFICADA:**

Execute esta versão corrigida no Supabase:

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

## ✅ **TESTE A VIEW:**

Depois de criar, teste com:

```sql
SELECT COUNT(*) FROM admin_alunos;
```

```sql
SELECT * FROM admin_alunos LIMIT 3;
```

---

**Execute essa versão simplificada e me confirme se funcionou!** 🎯