# 🔧 QUERY COMPLETA CORRIGIDA - SEM OS "..."

## ❌ **ERRO:** 
```
syntax error at or near ".."
```

**CAUSA:** Você copiou o exemplo com "..." que não é SQL válido.

## ✅ **QUERY COMPLETA CORRETA:**

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
    CASE 
        WHEN prof.last_active IS NULL THEN 'nunca_ativo'
        WHEN prof.last_active >= CURRENT_DATE - INTERVAL '7 days' THEN 'ativo'
        ELSE 'inativo'
    END as status_atividade,
    CASE 
        WHEN prof.nome IS NOT NULL AND a.instrumento IS NOT NULL 
        THEN true ELSE false
    END as perfil_completo
FROM alunos a
LEFT JOIN profiles prof ON a.id = prof.id
WHERE a.ativo = true
ORDER BY a.criado_em DESC;
```

## 🧪 **APÓS EXECUTAR, TESTE:**

```sql
SELECT COUNT(*) FROM admin_alunos;

| count |
| ----- |
| 21    |
```

```sql
SELECT id, nome, email, instrumento FROM admin_alunos LIMIT 3;

| id                                   | nome                       | email                        | instrumento |
| ------------------------------------ | -------------------------- | ---------------------------- | ----------- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | Karen Cavalcante Pelegrino | cavalcante.karen@hotmail.com | null        |
| 46e25388-417a-4d84-9f3d-fb59c804304d | Nivalda rabelo Dama        | rabelodamanivalda@gmail.com  | null        |
| ae514bfc-c915-473d-bb40-de3b0323e79e | José Miguel de Oliveira    | jomigas30@gmail.com          | null        |
```

---

**Copie e cole ESTA query completa (sem os "...")!** ✅