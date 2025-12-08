-- ======================================
-- DESCOBRIR ESTRUTURA DE TABELAS DE USUÁRIOS
-- ======================================

-- 1. Verificar estrutura da tabela alunos
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'alunos'
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


-- 2. Ver dados de exemplo (se houver)
SELECT * FROM alunos LIMIT 3;

| id                                   | instrumento | nivel    | turma | data_ingresso | ativo | criado_em                  | instrumento_id                       | turma_principal_id |
| ------------------------------------ | ----------- | -------- | ----- | ------------- | ----- | -------------------------- | ------------------------------------ | ------------------ |
| 840f99c4-7479-4098-9c2e-474a695178f0 | trompete    | beginner | null  | 2025-05-27    | true  | 2025-05-27 18:56:17.453178 | 509d6a26-159a-4976-aa46-83f914f930aa | null               |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | violoncelo  | beginner | null  | 2025-05-27    | true  | 2025-05-27 20:38:51.625846 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null               |
| a57eeb22-a246-4243-8e32-98297c6f3bad | teclado     | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:08:47.91411  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null               |


-- 3. Verificar tabela profiles (comum em Supabase)
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;


| column_name          | data_type                |
| -------------------- | ------------------------ |
| id                   | uuid                     |
| email                | text                     |
| full_name            | text                     |
| dob                  | date                     |
| instrument           | text                     |
| voted_logo           | uuid                     |
| has_voted            | boolean                  |
| avatar_url           | text                     |
| church_name          | text                     |
| user_level           | text                     |
| total_points         | integer                  |
| bio                  | text                     |
| phone                | text                     |
| city                 | text                     |
| state                | text                     |
| joined_at            | timestamp with time zone |
| last_active          | timestamp with time zone |
| current_streak       | integer                  |
| best_streak          | integer                  |
| lessons_completed    | integer                  |
| modules_completed    | integer                  |
| theme_preference     | text                     |
| notification_enabled | boolean                  |
| sound_enabled        | boolean                  |
| tipo_usuario         | text                     |
| nome                 | text                     |


-- 4. Ver dados de profiles
SELECT * FROM profiles LIMIT 3;


| id                                   | email                            | full_name                 | dob        | instrument | voted_logo                           | has_voted | avatar_url | church_name | user_level | total_points | bio  | phone | city | state | joined_at                     | last_active                   | current_streak | best_streak | lessons_completed | modules_completed | theme_preference | notification_enabled | sound_enabled | tipo_usuario | nome                      |
| ------------------------------------ | -------------------------------- | ------------------------- | ---------- | ---------- | ------------------------------------ | --------- | ---------- | ----------- | ---------- | ------------ | ---- | ----- | ---- | ----- | ----------------------------- | ----------------------------- | -------------- | ----------- | ----------------- | ----------------- | ---------------- | -------------------- | ------------- | ------------ | ------------------------- |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | priscilasouza.musica@gmail.com   | Priscila Souza            | 1981-11-17 | violoncelo | null                                 | false     | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-30 13:18:26.529455+00 | 2025-06-01 19:37:19.513029+00 | 0              | 0           | 0                 | 0                 | light            | true                 | true          | professor    | null                      |
| a57eeb22-a246-4243-8e32-98297c6f3bad | nicollymellodecamargo2@gmail.com | Nicolly Mello de Camargo  | 2013-06-07 | teclado    | 5735bc8c-c8d6-4430-865b-e23b3a1f4fc8 | true      | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-05-27 22:08:48.914966+00 | 2025-06-04 16:02:04.541869+00 | 0              | 0           | 0                 | 0                 | light            | true                 | true          | aluno        | Nicolly Mello de Camargo  |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | junior_sax@hotmail.com           | Gilberto Junior           | 1978-09-06 | piano      | 6dc8695b-f6af-4bbc-b933-6ff94d0424b6 | true      | null       | null        | beginner   | 0            | null | null  | null | null  | 2025-06-09 16:00:40.395572+00 | 2025-06-09 16:07:25.454873+00 | 0              | 0           | 0                 | 0                 | light            | true                 | true          | professor    | Gilberto Junior           |


-- 5. Verificar auth.users (Supabase Auth)
SELECT 
  id, 
  email,
  raw_user_meta_data,
  created_at
FROM auth.users 
LIMIT 3;

| id                                   | email                         | raw_user_meta_data                                                                                                                  | created_at                    |
| ------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 46e25388-417a-4d84-9f3d-fb59c804304d | rabelodamanivalda@gmail.com   | {"sub":"46e25388-417a-4d84-9f3d-fb59c804304d","email":"rabelodamanivalda@gmail.com","email_verified":true,"phone_verified":false}   | 2025-06-21 16:48:50.607924+00 |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | monicaquagliarelo@gmail.com   | {"sub":"1dc09e87-282c-47a9-b0b8-6f84d79f300c","email":"monicaquagliarelo@gmail.com","email_verified":true,"phone_verified":false}   | 2025-06-09 20:11:56.983797+00 |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | larissa.nunesds0505@gmail.com | {"sub":"07f4a049-faf4-4852-8512-6ef64f2966ff","email":"larissa.nunesds0505@gmail.com","email_verified":true,"phone_verified":false} | 2025-06-11 00:50:26.879006+00 |



-- 6. Verificar se há relação entre tabelas
SELECT 
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name IN ('alunos', 'profiles', 'alpha_submissoes')
ORDER BY tc.table_name;


| table_name | column_name        | foreign_table_name | foreign_column_name |
| ---------- | ------------------ | ------------------ | ------------------- |
| alunos     | instrumento_id     | instrumentos       | id                  |
| alunos     | turma_principal_id | turmas             | id                  |
| alunos     | id                 | profiles           | id                  |