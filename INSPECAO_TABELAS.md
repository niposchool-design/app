# 🔍 INSPEÇÃO DAS TABELAS REAIS ANTES DE CRIAR VIEWS

## 🎯 **OBJETIVO:**
Verificar a estrutura real das tabelas para criar views sem erros de campos inexistentes.

---

## 📋 **QUERIES PARA EXECUTAR NO SUPABASE:**

### **1. ESTRUTURA DA TABELA PROFESSORES**
```sql
-- Ver todas as colunas da tabela professores
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'professores' AND table_schema = 'public'
ORDER BY ordinal_position;

| column_name    | data_type                   | is_nullable | column_default |
| -------------- | --------------------------- | ----------- | -------------- |
| id             | uuid                        | NO          | null           |
| formacao       | text                        | YES         | null           |
| biografia      | text                        | YES         | null           |
| especialidades | ARRAY                       | YES         | null           |
| ativo          | boolean                     | YES         | true           |
| criado_em      | timestamp without time zone | YES         | now()          |
```

### **2. ESTRUTURA DA TABELA ALUNOS**  
```sql
-- Ver todas as colunas da tabela alunos
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'alunos' AND table_schema = 'public'
ORDER BY ordinal_position;

| column_name        | data_type                   | is_nullable | column_default |
| ------------------ | --------------------------- | ----------- | -------------- |
| id                 | uuid                        | NO          | null           |
| instrumento        | text                        | YES         | null           |
| nivel              | text                        | YES         | null           |
| turma              | text                        | YES         | null           |
| data_ingresso      | date                        | YES         | CURRENT_DATE   |
| ativo              | boolean                     | YES         | true           |
| criado_em          | timestamp without time zone | YES         | now()          |
| instrumento_id     | uuid                        | YES         | null           |
| turma_principal_id | uuid                        | YES         | null           |
```

### **3. ESTRUTURA DA TABELA PROFILES**
```sql
-- Ver todas as colunas da tabela profiles
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

| column_name          | data_type                | is_nullable | column_default   |
| -------------------- | ------------------------ | ----------- | ---------------- |
| id                   | uuid                     | NO          | null             |
| email                | text                     | YES         | null             |
| full_name            | text                     | YES         | null             |
| dob                  | date                     | YES         | null             |
| instrument           | text                     | YES         | null             |
| voted_logo           | uuid                     | YES         | null             |
| has_voted            | boolean                  | YES         | false            |
| avatar_url           | text                     | YES         | null             |
| church_name          | text                     | YES         | null             |
| user_level           | text                     | YES         | 'beginner'::text |
| total_points         | integer                  | YES         | 0                |
| bio                  | text                     | YES         | null             |
| phone                | text                     | YES         | null             |
| city                 | text                     | YES         | null             |
| state                | text                     | YES         | null             |
| joined_at            | timestamp with time zone | YES         | now()            |
| last_active          | timestamp with time zone | YES         | now()            |
| current_streak       | integer                  | YES         | 0                |
| best_streak          | integer                  | YES         | 0                |
| lessons_completed    | integer                  | YES         | 0                |
| modules_completed    | integer                  | YES         | 0                |
| theme_preference     | text                     | YES         | 'light'::text    |
| notification_enabled | boolean                  | YES         | true             |
| sound_enabled        | boolean                  | YES         | true             |
| tipo_usuario         | text                     | YES         | null             |
| nome                 | text                     | YES         | null             |
```

### **4. VERIFICAR TABELAS RELACIONADAS**
```sql
-- Ver quais tabelas existem relacionadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('turmas', 'turma_alunos', 'professores_conteudos', 'progresso_aluno', 'admins')
ORDER BY table_name;

| table_name            |
| --------------------- |
| admins                |
| professores_conteudos |
| turma_alunos          |
| turmas                |
```

### **5. AMOSTRAS DE DADOS REAIS**
```sql
-- Ver dados reais para entender a estrutura
SELECT * FROM professores LIMIT 3;

| id                                   | formacao | biografia | especialidades | ativo | criado_em                  |
| ------------------------------------ | -------- | --------- | -------------- | ----- | -------------------------- |
| 8483907a-5521-43b1-b824-5068b02a2872 | null     | null      | ["bateria"]    | true  | 2025-05-27 22:55:28.357311 |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | null     | null      | ["violino"]    | true  | 2025-05-29 18:30:33.11142  |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | null     |           | null           | true  | 2025-06-09 16:00:40.395572 |

```

```sql
SELECT * FROM alunos LIMIT 3;

| id                                   | instrumento | nivel    | turma | data_ingresso | ativo | criado_em                  | instrumento_id                       | turma_principal_id |
| ------------------------------------ | ----------- | -------- | ----- | ------------- | ----- | -------------------------- | ------------------------------------ | ------------------ |
| 840f99c4-7479-4098-9c2e-474a695178f0 | trompete    | beginner | null  | 2025-05-27    | true  | 2025-05-27 18:56:17.453178 | 509d6a26-159a-4976-aa46-83f914f930aa | null               |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | violoncelo  | beginner | null  | 2025-05-27    | true  | 2025-05-27 20:38:51.625846 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null               |
| a57eeb22-a246-4243-8e32-98297c6f3bad | teclado     | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:08:47.91411  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null               |

```

```sql  
SELECT * FROM profiles 
WHERE id IN (SELECT id FROM professores LIMIT 2)
   OR id IN (SELECT id FROM alunos LIMIT 2)
LIMIT 4;

| id                                   | email                             | full_name                 | dob        | instrument | voted_logo                           | has_voted | avatar_url | church_name | user_level | total_points | bio  | phone | city | state | joined_at                     | last_active                   | current_streak | best_streak | lessons_completed | modules_completed | theme_preference | notification_enabled | sound_enabled | tipo_usuario | nome                      |
| ------------------------------------ | --------------------------------- | ------------------------- | ---------- | ---------- | ------------------------------------ | --------- | ---------- | ----------- | ---------- | ------------ | ---- | ----- | ---- | ----- | ----------------------------- | ----------------------------- | -------------- | ----------- | ----------------- | ----------------- | ---------------- | -------------------- | ------------- | ------------ | ------------------------- |
| 840f99c4-7479-4098-9c2e-474a695178f0 | jcarlos0710@gmail.com             | Jose Carlos Oliveira      | 1972-10-07 | trompete   | e4e9a1f4-6542-4ebe-9b1c-6f4e58da4e91 | true      | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-27 18:56:18.455489+00 | 2025-06-01 19:07:59.81548+00  | 0              | 0           | 0                 | 0                 | light            | true                 | true          | aluno        | Jose Carlos Oliveira      |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | silasdiego49@gmail.com            | Silas Diego da Conceição  | 1991-09-08 | violino    | null                                 | false     | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-29 18:30:34.111767+00 | 2025-06-01 19:07:59.81548+00  | 0              | 0           | 0                 | 0                 | light            | true                 | true          | professor    | Silas Diego da Conceição  |
| 8483907a-5521-43b1-b824-5068b02a2872 | mkgomes.r1499@gmail.com           | Mike Rodrigues Gomes      | 1993-01-29 | bateria    | null                                 | false     | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-27 22:55:29.358563+00 | 2025-06-01 19:07:59.81548+00  | 0              | 0           | 0                 | 0                 | light            | true                 | true          | professor    | Mike Rodrigues Gomes      |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | giovannamellodecamargo2@gmail.com | Giovanna Mello de Camargo | 2003-12-03 | violoncelo | null                                 | false     | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-27 20:38:52.629168+00 | 2025-06-01 19:08:08.556287+00 | 0              | 0           | 0                 | 0                 | light            | true                 | true          | aluno        | Giovanna Mello de Camargo |
```

---

## 🎯 **PRÓXIMOS PASSOS:**

1. **Execute todas as queries acima** no Supabase SQL Editor
2. **Copie e cole** todos os resultados aqui
3. **Com a estrutura real** criarei views 100% compatíveis
4. **Sem erros de campo** inexistente

---

**Execute essas queries primeiro e me envie todos os resultados!** 🔍