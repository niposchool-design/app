# 🚨 SOLUÇÃO URGENTE - VIEW ADMIN_ALUNOS SIMPLIFICADA

## ❌ **ERRO ATUAL:**
```
supabase.from(...).select(...).order is not a function
```

**CAUSA:** A view `admin_alunos` não existe no banco, então o Supabase retorna objeto sem métodos.

## ✅ **SOLUÇÃO IMEDIATA:**

Execute esta query **SIMPLIFICADA** no Supabase SQL Editor:

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
    prof.last_active,
    prof.total_points,
    prof.user_level,
    prof.current_streak,
    prof.lessons_completed,
    prof.voted_logo,
    prof.has_voted,
    prof.joined_at,
    prof.dob,
    prof.city,
    prof.state,
    -- Status de atividade simples
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        ELSE 'inativo'
    END as status_atividade,
    -- Perfil completo simples  
    CASE 
        WHEN prof.nome IS NOT NULL AND a.instrumento IS NOT NULL 
        THEN true ELSE false
    END as perfil_completo
FROM alunos a
LEFT JOIN profiles prof ON a.id = prof.id
WHERE a.ativo = true
ORDER BY a.criado_em DESC;
```

## 🧪 **TESTE APÓS CRIAR:**

```sql
-- Verificar se foi criada
SELECT COUNT(*) FROM admin_alunos;

-- Ver os dados
SELECT * FROM admin_alunos LIMIT 3;
```

---

**Execute essa query AGORA e me confirme se funcionou!** ⚡