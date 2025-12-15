-- 🔍 MAPEAMENTO COMPLETO DO BANCO DE DADOS NIPO SCHOOL
-- Execute essas consultas no Supabase SQL Editor ou psql
-- Copie os resultados para documentação completa

-- ===================================================================
-- 📋 1. VISÃO GERAL - SCHEMAS E TABELAS
-- ===================================================================

-- 1.1 Listar todos os schemas
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
ORDER BY schema_name;


| schema_name      |
| ---------------- |
| auth             |
| extensions       |
| graphql          |
| graphql_public   |
| pg_temp_10       |
| pg_temp_11       |
| pg_temp_12       |
| pg_temp_13       |
| pg_temp_14       |
| pg_temp_15       |
| pg_temp_16       |
| pg_temp_17       |
| pg_temp_18       |
| pg_temp_19       |
| pg_temp_20       |
| pg_temp_21       |
| pg_temp_22       |
| pg_temp_23       |
| pg_temp_24       |
| pg_temp_6        |
| pg_temp_8        |
| pg_temp_9        |
| pg_toast_temp_10 |
| pg_toast_temp_11 |
| pg_toast_temp_12 |
| pg_toast_temp_13 |
| pg_toast_temp_14 |
| pg_toast_temp_15 |
| pg_toast_temp_16 |
| pg_toast_temp_17 |
| pg_toast_temp_18 |
| pg_toast_temp_19 |
| pg_toast_temp_20 |
| pg_toast_temp_21 |
| pg_toast_temp_22 |
| pg_toast_temp_23 |
| pg_toast_temp_24 |
| pg_toast_temp_6  |
| pg_toast_temp_8  |
| pg_toast_temp_9  |
| pgbouncer        |
| public           |
| realtime         |
| storage          |
| vault            |

-- 1.2 Listar todas as tabelas com detalhes
SELECT 
    t.table_schema,
    t.table_name,
    t.table_type,
    COALESCE(obj_description(c.oid), 'Sem descrição') as table_comment
FROM information_schema.tables t
LEFT JOIN pg_class c ON c.relname = t.table_name
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name;


| table_schema | table_name                 | table_type | table_comment                                                          |
| ------------ | -------------------------- | ---------- | ---------------------------------------------------------------------- |
| public       | achievements               | BASE TABLE | Sistema de conquistas/badges do Nipo School                            |
| public       | achievements_educacionais  | BASE TABLE | Sem descrição                                                          |
| public       | achievements_progress      | BASE TABLE | Sem descrição                                                          |
| public       | admins                     | BASE TABLE | Sem descrição                                                          |
| public       | alunos                     | BASE TABLE | Sem descrição                                                          |
| public       | audit_activities           | BASE TABLE | Sem descrição                                                          |
| public       | aula_atividades            | BASE TABLE | Sem descrição                                                          |
| public       | aula_checklist             | BASE TABLE | Sem descrição                                                          |
| public       | aula_criterios_avaliacao   | BASE TABLE | Sem descrição                                                          |
| public       | aula_desafio_alpha         | BASE TABLE | Sem descrição                                                          |
| public       | aula_desafios              | BASE TABLE | Sem descrição                                                          |
| public       | aula_feedback              | BASE TABLE | Sem descrição                                                          |
| public       | aula_feedbacks             | BASE TABLE | Sem descrição                                                          |
| public       | aula_materiais             | BASE TABLE | Sem descrição                                                          |
| public       | aula_permissoes            | BASE TABLE | Sem descrição                                                          |
| public       | aula_registros             | BASE TABLE | Sem descrição                                                          |
| public       | aula_status_log            | BASE TABLE | Sem descrição                                                          |
| public       | aula_tags                  | BASE TABLE | Sem descrição                                                          |
| public       | aulas                      | BASE TABLE | Sem descrição                                                          |
| public       | cessoes_instrumentos       | BASE TABLE | Sem descrição                                                          |
| public       | desafios_alpha             | BASE TABLE | Sem descrição                                                          |
| public       | desafios_alpha_respostas   | BASE TABLE | Sem descrição                                                          |
| public       | devotional_content         | BASE TABLE | Sem descrição                                                          |
| public       | forum_likes                | BASE TABLE | Sem descrição                                                          |
| public       | forum_perguntas            | BASE TABLE | Sem descrição                                                          |
| public       | forum_respostas            | BASE TABLE | Sem descrição                                                          |
| public       | historico_instrumentos     | BASE TABLE | Sem descrição                                                          |
| public       | hook_cache                 | BASE TABLE | Sem descrição                                                          |
| public       | instrumento_curiosidades   | BASE TABLE | Fatos interessantes e curiosidades sobre o instrumento                 |
| public       | instrumento_midias         | BASE TABLE | Galeria de mídias (imagens, vídeos, áudios, 3D) para cada instrumento  |
| public       | instrumento_performances   | BASE TABLE | Performances famosas que destacam o instrumento                        |
| public       | instrumento_quiz           | BASE TABLE | Perguntas interativas sobre o instrumento                              |
| public       | instrumento_sons           | BASE TABLE | Sons e samples específicos de cada instrumento com diferentes técnicas |
| public       | instrumento_sons_variacoes | BASE TABLE | Múltiplas variações de gravação para cada som                          |
| public       | instrumento_tecnicas       | BASE TABLE | Técnicas específicas de aprendizado progressivo                        |
| public       | instrumentos               | BASE TABLE | Sem descrição                                                          |
| public       | instrumentos_alunos        | BASE TABLE | Sem descrição                                                          |
| public       | instrumentos_fisicos       | BASE TABLE | Sem descrição                                                          |
| public       | instrumentos_relacionados  | BASE TABLE | Relacionamentos entre instrumentos (família, evolução, etc)            |
| public       | lessons                    | BASE TABLE | Tabela de aulas dos módulos do Nipo School                             |
| public       | logos                      | BASE TABLE | Sem descrição                                                          |
| public       | manutencoes_instrumentos   | BASE TABLE | Sem descrição                                                          |
| public       | materiais_apoio            | BASE TABLE | Sem descrição                                                          |
| public       | matriculas                 | BASE TABLE | Sem descrição                                                          |
| public       | metodologias_ensino        | BASE TABLE | Sem descrição                                                          |
| public       | migration_log              | BASE TABLE | Sem descrição                                                          |
| public       | modules                    | BASE TABLE | Tabela de módulos de aprendizado do Nipo School                        |
| public       | modulos                    | BASE TABLE | Sem descrição                                                          |
| public       | permission_templates       | BASE TABLE | Sem descrição                                                          |
| public       | permissions                | BASE TABLE | Sem descrição                                                          |
| public       | presencas                  | BASE TABLE | Sem descrição                                                          |
| public       | professor_instrumentos     | BASE TABLE | Sem descrição                                                          |
| public       | professores                | BASE TABLE | Sem descrição                                                          |
| public       | professores_categorias     | BASE TABLE | Sem descrição                                                          |
| public       | professores_conteudos      | BASE TABLE | Sem descrição                                                          |
| public       | profiles                   | BASE TABLE | Sem descrição                                                          |
| public       | qr_codes                   | BASE TABLE | Sem descrição                                                          |
| public       | qr_scans                   | BASE TABLE | Sem descrição                                                          |
| public       | repertorio_musical         | BASE TABLE | Sem descrição                                                          |
| public       | role_permissions           | BASE TABLE | Sem descrição                                                          |
| public       | roles                      | BASE TABLE | Sem descrição                                                          |
| public       | sequencias_didaticas       | BASE TABLE | Sem descrição                                                          |
| public       | trigger_logs               | BASE TABLE | Sem descrição                                                          |
| public       | turma_alunos               | BASE TABLE | Sem descrição                                                          |
| public       | turmas                     | BASE TABLE | Sem descrição                                                          |
| public       | user_achievements          | BASE TABLE | Conquistas ganhas pelos usuários                                       |
| public       | user_devotional_progress   | BASE TABLE | Sem descrição                                                          |
| public       | user_notifications         | BASE TABLE | Sem descrição                                                          |
| public       | user_points_log            | BASE TABLE | Sem descrição                                                          |
| public       | user_progress              | BASE TABLE | Sem descrição                                                          |
| public       | user_roles                 | BASE TABLE | Sem descrição                                                          |
| public       | usuarios                   | BASE TABLE | Sem descrição                                                          |

-- ===================================================================
-- 📊 2. ESTRUTURA DETALHADA DAS TABELAS
-- ===================================================================

-- 2.1 Todas as colunas de todas as tabelas
SELECT 
    t.table_name,
    c.column_name,
    c.ordinal_position,
    c.column_default,
    c.is_nullable,
    c.data_type,
    CASE 
        WHEN c.character_maximum_length IS NOT NULL 
        THEN c.data_type || '(' || c.character_maximum_length || ')'
        WHEN c.numeric_precision IS NOT NULL AND c.numeric_scale IS NOT NULL
        THEN c.data_type || '(' || c.numeric_precision || ',' || c.numeric_scale || ')'
        WHEN c.numeric_precision IS NOT NULL
        THEN c.data_type || '(' || c.numeric_precision || ')'
        ELSE c.data_type
    END as full_data_type,
    COALESCE(col_description(pgc.oid, c.ordinal_position), 'Sem descrição') as column_comment
FROM information_schema.tables t
JOIN information_schema.columns c ON c.table_name = t.table_name
LEFT JOIN pg_class pgc ON pgc.relname = t.table_name
WHERE t.table_schema = 'public' 
    AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;


| table_name                | column_name         | ordinal_position | column_default    | is_nullable | data_type                   | full_data_type              | column_comment                            |
| ------------------------- | ------------------- | ---------------- | ----------------- | ----------- | --------------------------- | --------------------------- | ----------------------------------------- |
| achievements              | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| achievements              | name                | 2                | null              | NO          | text                        | text                        | Nome único da conquista                   |
| achievements              | description         | 3                | null              | YES         | text                        | text                        | Descrição de como conquistar o badge      |
| achievements              | badge_icon          | 4                | null              | YES         | text                        | text                        | Ícone emoji ou classe CSS da conquista    |
| achievements              | badge_color         | 5                | '#E53E3E'::text   | YES         | text                        | text                        | Cor em hexadecimal do badge               |
| achievements              | points_reward       | 6                | 0                 | YES         | integer                     | integer(32,0)               | Pontos ganhos ao conquistar o badge       |
| achievements              | category            | 7                | null              | YES         | text                        | text                        | Categoria da conquista para organização   |
| achievements              | requirement_type    | 8                | null              | YES         | text                        | text                        | Tipo de requisito para ganhar a conquista |
| achievements              | requirement_value   | 9                | null              | YES         | integer                     | integer(32,0)               | Valor necessário para conquistar          |
| achievements              | is_active           | 10               | true              | YES         | boolean                     | boolean                     | Sem descrição                             |
| achievements              | created_at          | 11               | now()             | YES         | timestamp with time zone    | timestamp with time zone    | Sem descrição                             |
| achievements_educacionais | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| achievements_educacionais | nome                | 2                | null              | NO          | text                        | text                        | Sem descrição                             |
| achievements_educacionais | descricao           | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| achievements_educacionais | icone               | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| achievements_educacionais | categoria           | 5                | null              | YES         | text                        | text                        | Sem descrição                             |
| achievements_educacionais | tipo_criterio       | 6                | null              | YES         | text                        | text                        | Sem descrição                             |
| achievements_educacionais | meta_necessaria     | 7                | null              | YES         | integer                     | integer(32,0)               | Sem descrição                             |
| achievements_educacionais | pontos_recompensa   | 8                | 10                | YES         | integer                     | integer(32,0)               | Sem descrição                             |
| achievements_educacionais | created_at          | 9                | now()             | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| achievements_educacionais | ativo               | 10               | true              | YES         | boolean                     | boolean                     | Sem descrição                             |
| achievements_progress     | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| achievements_progress     | user_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| achievements_progress     | achievement_id      | 3                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| achievements_progress     | current_progress    | 4                | 0                 | YES         | integer                     | integer(32,0)               | Sem descrição                             |
| achievements_progress     | target_progress     | 5                | null              | NO          | integer                     | integer(32,0)               | Sem descrição                             |
| achievements_progress     | is_completed        | 6                | false             | YES         | boolean                     | boolean                     | Sem descrição                             |
| achievements_progress     | completed_at        | 7                | null              | YES         | timestamp with time zone    | timestamp with time zone    | Sem descrição                             |
| achievements_progress     | metadata            | 8                | '{}'::jsonb       | YES         | jsonb                       | jsonb                       | Sem descrição                             |
| achievements_progress     | created_at          | 9                | now()             | YES         | timestamp with time zone    | timestamp with time zone    | Sem descrição                             |
| achievements_progress     | updated_at          | 10               | now()             | YES         | timestamp with time zone    | timestamp with time zone    | Sem descrição                             |
| admins                    | id                  | 1                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| admins                    | ativo               | 2                | true              | YES         | boolean                     | boolean                     | Sem descrição                             |
| admins                    | nivel_acesso        | 3                | 'admin'::text     | YES         | text                        | text                        | Sem descrição                             |
| admins                    | permissoes          | 4                | '{}'::jsonb       | YES         | jsonb                       | jsonb                       | Sem descrição                             |
| admins                    | criado_em           | 5                | CURRENT_TIMESTAMP | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| admins                    | departamento        | 6                | null              | YES         | text                        | text                        | Sem descrição                             |
| admins                    | cargo               | 7                | null              | YES         | text                        | text                        | Sem descrição                             |
| alunos                    | id                  | 1                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| alunos                    | instrumento         | 2                | null              | YES         | text                        | text                        | Sem descrição                             |
| alunos                    | nivel               | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| alunos                    | turma               | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| alunos                    | data_ingresso       | 5                | CURRENT_DATE      | YES         | date                        | date                        | Sem descrição                             |
| alunos                    | ativo               | 6                | true              | YES         | boolean                     | boolean                     | Sem descrição                             |
| alunos                    | criado_em           | 7                | now()             | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| alunos                    | instrumento_id      | 8                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| alunos                    | turma_principal_id  | 9                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| audit_activities          | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| audit_activities          | user_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| audit_activities          | action              | 3                | null              | NO          | text                        | text                        | Sem descrição                             |
| audit_activities          | resource            | 4                | null              | NO          | text                        | text                        | Sem descrição                             |
| audit_activities          | resource_id         | 5                | null              | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | old_values          | 6                | null              | YES         | jsonb                       | jsonb                       | Sem descrição                             |
| audit_activities          | new_values          | 7                | null              | YES         | jsonb                       | jsonb                       | Sem descrição                             |
| audit_activities          | details             | 8                | '{}'::jsonb       | YES         | jsonb                       | jsonb                       | Sem descrição                             |
| audit_activities          | ip_address          | 9                | null              | YES         | inet                        | inet                        | Sem descrição                             |
| audit_activities          | user_agent          | 10               | null              | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | session_id          | 11               | null              | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | hook_name           | 12               | null              | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | component_name      | 13               | null              | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | severity            | 14               | 'info'::text      | YES         | text                        | text                        | Sem descrição                             |
| audit_activities          | created_at          | 15               | now()             | YES         | timestamp with time zone    | timestamp with time zone    | Sem descrição                             |
| aula_atividades           | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_atividades           | aula_id             | 2                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_atividades           | tipo                | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_atividades           | descricao           | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_checklist            | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_checklist            | aula_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| aula_checklist            | item                | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_checklist            | tipo                | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_checklist            | feito               | 5                | false             | YES         | boolean                     | boolean                     | Sem descrição                             |
| aula_criterios_avaliacao  | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_criterios_avaliacao  | aula_id             | 2                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_criterios_avaliacao  | criterio            | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_desafio_alpha        | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_desafio_alpha        | aula_id             | 2                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_desafio_alpha        | descricao           | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_desafios             | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_desafios             | aula_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| aula_desafios             | titulo              | 3                | null              | NO          | text                        | text                        | Sem descrição                             |
| aula_desafios             | descricao           | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_desafios             | publico_alvo        | 5                | 'aluno'::text     | YES         | text                        | text                        | Sem descrição                             |
| aula_desafios             | criterios_avaliacao | 6                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_desafios             | criado_em           | 7                | now()             | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| aula_feedback             | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_feedback             | aula_id             | 2                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_feedback             | professor_id        | 3                | null              | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_feedback             | texto               | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_feedback             | created_at          | 5                | CURRENT_TIMESTAMP | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| aula_feedbacks            | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_feedbacks            | aula_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| aula_feedbacks            | professor_id        | 3                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| aula_feedbacks            | texto               | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_feedbacks            | criado_em           | 5                | now()             | YES         | timestamp without time zone | timestamp without time zone | Sem descrição                             |
| aula_materiais            | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |
| aula_materiais            | aula_id             | 2                | null              | YES         | uuid                        | uuid                        | Sem descrição                             |
| aula_materiais            | tipo                | 3                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_materiais            | descricao           | 4                | null              | YES         | text                        | text                        | Sem descrição                             |
| aula_materiais            | url                 | 5                | null              | NO          | text                        | text                        | Sem descrição                             |
| aula_permissoes           | id                  | 1                | gen_random_uuid() | NO          | uuid                        | uuid                        | Sem descrição                             |

-- ===================================================================
-- 🔗 3. RELACIONAMENTOS E CONSTRAINTS
-- ===================================================================

-- 3.1 Chaves primárias
SELECT 
    tc.table_name,
    tc.constraint_name,
    kcu.column_name,
    tc.constraint_type
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
    AND tc.constraint_type = 'PRIMARY KEY'
ORDER BY tc.table_name;


| table_name                 | constraint_name                 | column_name   | constraint_type |
| -------------------------- | ------------------------------- | ------------- | --------------- |
| achievements               | achievements_pkey               | id            | PRIMARY KEY     |
| achievements_educacionais  | achievements_educacionais_pkey  | id            | PRIMARY KEY     |
| achievements_progress      | achievements_progress_pkey      | id            | PRIMARY KEY     |
| admins                     | admins_pkey                     | id            | PRIMARY KEY     |
| alunos                     | alunos_pkey                     | id            | PRIMARY KEY     |
| audit_activities           | audit_activities_pkey           | id            | PRIMARY KEY     |
| aula_atividades            | aula_atividades_pkey            | id            | PRIMARY KEY     |
| aula_checklist             | aula_checklist_pkey             | id            | PRIMARY KEY     |
| aula_criterios_avaliacao   | aula_criterios_avaliacao_pkey   | id            | PRIMARY KEY     |
| aula_desafio_alpha         | aula_desafio_alpha_pkey         | id            | PRIMARY KEY     |
| aula_desafios              | aula_desafios_pkey              | id            | PRIMARY KEY     |
| aula_feedback              | aula_feedback_pkey              | id            | PRIMARY KEY     |
| aula_feedbacks             | aula_feedbacks_pkey             | id            | PRIMARY KEY     |
| aula_materiais             | aula_materiais_pkey             | id            | PRIMARY KEY     |
| aula_permissoes            | aula_permissoes_pkey            | id            | PRIMARY KEY     |
| aula_registros             | aula_registros_pkey             | id            | PRIMARY KEY     |
| aula_status_log            | aula_status_log_pkey            | id            | PRIMARY KEY     |
| aula_tags                  | aula_tags_pkey                  | id            | PRIMARY KEY     |
| aulas                      | aulas_pkey                      | id            | PRIMARY KEY     |
| cessoes_instrumentos       | cessoes_instrumentos_pkey       | id            | PRIMARY KEY     |
| desafios_alpha             | desafios_alpha_pkey             | id            | PRIMARY KEY     |
| desafios_alpha_respostas   | desafios_alpha_respostas_pkey   | id            | PRIMARY KEY     |
| devotional_content         | devotional_content_pkey         | id            | PRIMARY KEY     |
| forum_likes                | forum_likes_pkey                | id            | PRIMARY KEY     |
| forum_perguntas            | forum_perguntas_pkey            | id            | PRIMARY KEY     |
| forum_respostas            | forum_respostas_pkey            | id            | PRIMARY KEY     |
| historico_instrumentos     | historico_instrumentos_pkey     | id            | PRIMARY KEY     |
| hook_cache                 | hook_cache_pkey                 | id            | PRIMARY KEY     |
| instrumento_curiosidades   | instrumento_curiosidades_pkey   | id            | PRIMARY KEY     |
| instrumento_midias         | instrumento_midias_pkey         | id            | PRIMARY KEY     |
| instrumento_performances   | instrumento_performances_pkey   | id            | PRIMARY KEY     |
| instrumento_quiz           | instrumento_quiz_pkey           | id            | PRIMARY KEY     |
| instrumento_sons           | instrumento_sons_pkey           | id            | PRIMARY KEY     |
| instrumento_sons_variacoes | instrumento_sons_variacoes_pkey | id            | PRIMARY KEY     |
| instrumento_tecnicas       | instrumento_tecnicas_pkey       | id            | PRIMARY KEY     |
| instrumentos               | instrumentos_pkey               | id            | PRIMARY KEY     |
| instrumentos_alunos        | instrumentos_alunos_pkey        | id            | PRIMARY KEY     |
| instrumentos_fisicos       | instrumentos_fisicos_pkey       | id            | PRIMARY KEY     |
| instrumentos_relacionados  | instrumentos_relacionados_pkey  | id            | PRIMARY KEY     |
| lessons                    | lessons_pkey                    | id            | PRIMARY KEY     |
| logos                      | logos_pkey                      | id            | PRIMARY KEY     |
| manutencoes_instrumentos   | manutencoes_instrumentos_pkey   | id            | PRIMARY KEY     |
| materiais_apoio            | materiais_apoio_pkey            | id            | PRIMARY KEY     |
| matriculas                 | matriculas_pkey                 | id            | PRIMARY KEY     |
| metodologias_ensino        | metodologias_ensino_pkey        | id            | PRIMARY KEY     |
| migration_log              | migration_log_pkey              | id            | PRIMARY KEY     |
| modules                    | modules_pkey                    | id            | PRIMARY KEY     |
| modulos                    | modulos_pkey                    | id            | PRIMARY KEY     |
| permission_templates       | permission_templates_pkey       | id            | PRIMARY KEY     |
| permissions                | permissions_pkey                | id            | PRIMARY KEY     |
| presencas                  | presencas_pkey                  | id            | PRIMARY KEY     |
| professor_instrumentos     | professor_instrumentos_pkey     | id            | PRIMARY KEY     |
| professores                | professores_pkey                | id            | PRIMARY KEY     |
| professores_categorias     | professores_categorias_pkey     | id            | PRIMARY KEY     |
| professores_conteudos      | professores_conteudos_pkey      | id            | PRIMARY KEY     |
| profiles                   | profiles_pkey                   | id            | PRIMARY KEY     |
| qr_codes                   | qr_codes_pkey                   | id            | PRIMARY KEY     |
| qr_scans                   | qr_scans_pkey                   | id            | PRIMARY KEY     |
| repertorio_musical         | repertorio_musical_pkey         | id            | PRIMARY KEY     |
| role_permissions           | role_permissions_pkey           | role_id       | PRIMARY KEY     |
| role_permissions           | role_permissions_pkey           | permission_id | PRIMARY KEY     |
| roles                      | roles_pkey                      | id            | PRIMARY KEY     |
| sequencias_didaticas       | sequencias_didaticas_pkey       | id            | PRIMARY KEY     |
| trigger_logs               | trigger_logs_pkey               | id            | PRIMARY KEY     |
| turma_alunos               | turma_alunos_pkey               | id            | PRIMARY KEY     |
| turmas                     | turmas_pkey                     | id            | PRIMARY KEY     |
| user_achievements          | user_achievements_pkey          | id            | PRIMARY KEY     |
| user_devotional_progress   | user_devotional_progress_pkey   | id            | PRIMARY KEY     |
| user_notifications         | user_notifications_pkey         | id            | PRIMARY KEY     |
| user_points_log            | user_points_log_pkey            | id            | PRIMARY KEY     |
| user_progress              | user_progress_pkey              | id            | PRIMARY KEY     |
| user_roles                 | user_roles_pkey                 | id            | PRIMARY KEY     |
| usuarios                   | usuarios_pkey                   | id            | PRIMARY KEY     |

-- 3.2 Chaves estrangeiras (relacionamentos)
SELECT 
    tc.table_name as source_table,
    kcu.column_name as source_column,
    ccu.table_name as target_table,
    ccu.column_name as target_column,
    tc.constraint_name,
    rc.update_rule,
    rc.delete_rule
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
LEFT JOIN information_schema.referential_constraints rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.table_schema = 'public'
    AND tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name, kcu.column_name;

| source_table               | source_column              | target_table           | target_column | constraint_name                                     | update_rule | delete_rule |
| -------------------------- | -------------------------- | ---------------------- | ------------- | --------------------------------------------------- | ----------- | ----------- |
| achievements_progress      | achievement_id             | achievements           | id            | achievements_progress_achievement_id_fkey           | NO ACTION   | CASCADE     |
| achievements_progress      | user_id                    | profiles               | id            | achievements_progress_user_id_fkey                  | NO ACTION   | CASCADE     |
| admins                     | id                         | profiles               | id            | admins_id_fkey                                      | NO ACTION   | CASCADE     |
| alunos                     | id                         | profiles               | id            | fk_aluno_profile                                    | NO ACTION   | CASCADE     |
| alunos                     | instrumento_id             | instrumentos           | id            | alunos_instrumento_id_fkey                          | NO ACTION   | NO ACTION   |
| alunos                     | turma_principal_id         | turmas                 | id            | alunos_turma_principal_id_fkey                      | NO ACTION   | NO ACTION   |
| audit_activities           | user_id                    | profiles               | id            | audit_activities_user_id_fkey                       | NO ACTION   | NO ACTION   |
| aula_atividades            | aula_id                    | aulas                  | id            | aula_atividades_aula_id_fkey                        | NO ACTION   | CASCADE     |
| aula_checklist             | aula_id                    | aulas                  | id            | aula_checklist_aula_id_fkey                         | NO ACTION   | CASCADE     |
| aula_criterios_avaliacao   | aula_id                    | aulas                  | id            | aula_criterios_avaliacao_aula_id_fkey               | NO ACTION   | CASCADE     |
| aula_desafio_alpha         | aula_id                    | aulas                  | id            | aula_desafio_alpha_aula_id_fkey                     | NO ACTION   | CASCADE     |
| aula_desafios              | aula_id                    | aulas                  | id            | aula_desafios_aula_id_fkey                          | NO ACTION   | CASCADE     |
| aula_feedback              | aula_id                    | aulas                  | id            | aula_feedback_aula_id_fkey                          | NO ACTION   | CASCADE     |
| aula_feedback              | professor_id               | profiles               | id            | aula_feedback_professor_id_fkey                     | NO ACTION   | NO ACTION   |
| aula_feedbacks             | aula_id                    | aulas                  | id            | aula_feedbacks_aula_id_fkey                         | NO ACTION   | CASCADE     |
| aula_materiais             | aula_id                    | aulas                  | id            | aula_materiais_aula_id_fkey                         | NO ACTION   | CASCADE     |
| aula_permissoes            | aula_id                    | aulas                  | id            | aula_permissoes_aula_id_fkey                        | NO ACTION   | CASCADE     |
| aula_registros             | aula_id                    | aulas                  | id            | aula_registros_aula_id_fkey                         | NO ACTION   | CASCADE     |
| aula_status_log            | alterado_por               | profiles               | id            | aula_status_log_alterado_por_fkey                   | NO ACTION   | NO ACTION   |
| aula_status_log            | aula_id                    | aulas                  | id            | aula_status_log_aula_id_fkey                        | NO ACTION   | CASCADE     |
| aula_tags                  | aula_id                    | aulas                  | id            | aula_tags_aula_id_fkey                              | NO ACTION   | CASCADE     |
| aulas                      | responsavel_id             | usuarios               | id            | aulas_responsavel_id_fkey                           | NO ACTION   | NO ACTION   |
| cessoes_instrumentos       | aluno_id                   | alunos                 | id            | cessoes_instrumentos_aluno_id_fkey                  | NO ACTION   | NO ACTION   |
| cessoes_instrumentos       | instrumento_fisico_id      | instrumentos_fisicos   | id            | cessoes_instrumentos_instrumento_fisico_id_fkey     | NO ACTION   | NO ACTION   |
| cessoes_instrumentos       | responsavel_devolucao      | professores            | id            | cessoes_instrumentos_responsavel_devolucao_fkey     | NO ACTION   | NO ACTION   |
| cessoes_instrumentos       | responsavel_entrega        | professores            | id            | cessoes_instrumentos_responsavel_entrega_fkey       | NO ACTION   | NO ACTION   |
| desafios_alpha             | modulo_relacionado_id      | modulos                | id            | desafios_alpha_modulo_relacionado_id_fkey           | NO ACTION   | NO ACTION   |
| desafios_alpha_respostas   | aluno_id                   | profiles               | id            | desafios_alpha_respostas_aluno_id_fkey              | NO ACTION   | NO ACTION   |
| desafios_alpha_respostas   | desafio_id                 | desafios_alpha         | id            | desafios_alpha_respostas_desafio_id_fkey            | NO ACTION   | CASCADE     |
| forum_likes                | resposta_id                | forum_respostas        | id            | forum_likes_resposta_id_fkey                        | NO ACTION   | CASCADE     |
| forum_likes                | user_id                    | profiles               | id            | forum_likes_user_id_fkey                            | NO ACTION   | NO ACTION   |
| forum_perguntas            | aluno_id                   | profiles               | id            | forum_perguntas_aluno_id_fkey                       | NO ACTION   | NO ACTION   |
| forum_perguntas            | modulo_id                  | modulos                | id            | forum_perguntas_modulo_id_fkey                      | NO ACTION   | NO ACTION   |
| forum_respostas            | pergunta_id                | forum_perguntas        | id            | forum_respostas_pergunta_id_fkey                    | NO ACTION   | CASCADE     |
| forum_respostas            | resposta_de_id             | profiles               | id            | forum_respostas_resposta_de_id_fkey                 | NO ACTION   | NO ACTION   |
| historico_instrumentos     | aluno_afetado_id           | alunos                 | id            | historico_instrumentos_aluno_afetado_id_fkey        | NO ACTION   | NO ACTION   |
| historico_instrumentos     | instrumento_fisico_id      | instrumentos_fisicos   | id            | historico_instrumentos_instrumento_fisico_id_fkey   | NO ACTION   | NO ACTION   |
| hook_cache                 | user_id                    | profiles               | id            | hook_cache_user_id_fkey                             | NO ACTION   | NO ACTION   |
| instrumento_curiosidades   | instrumento_id             | instrumentos           | id            | instrumento_curiosidades_instrumento_id_fkey        | NO ACTION   | CASCADE     |
| instrumento_midias         | instrumento_id             | instrumentos           | id            | instrumento_midias_instrumento_id_fkey              | NO ACTION   | CASCADE     |
| instrumento_performances   | instrumento_id             | instrumentos           | id            | instrumento_performances_instrumento_id_fkey        | NO ACTION   | CASCADE     |
| instrumento_quiz           | instrumento_id             | instrumentos           | id            | instrumento_quiz_instrumento_id_fkey                | NO ACTION   | CASCADE     |
| instrumento_sons           | instrumento_id             | instrumentos           | id            | instrumento_sons_instrumento_id_fkey                | NO ACTION   | CASCADE     |
| instrumento_sons_variacoes | som_id                     | instrumento_sons       | id            | instrumento_sons_variacoes_som_id_fkey              | NO ACTION   | CASCADE     |
| instrumento_tecnicas       | instrumento_id             | instrumentos           | id            | instrumento_tecnicas_instrumento_id_fkey            | NO ACTION   | CASCADE     |
| instrumentos_alunos        | aluno_id                   | alunos                 | id            | instrumentos_alunos_aluno_id_fkey                   | NO ACTION   | NO ACTION   |
| instrumentos_alunos        | instrumento_id             | instrumentos           | id            | instrumentos_alunos_instrumento_id_fkey             | NO ACTION   | NO ACTION   |
| instrumentos_fisicos       | instrumento_id             | instrumentos           | id            | instrumentos_fisicos_instrumento_id_fkey            | NO ACTION   | NO ACTION   |
| instrumentos_relacionados  | instrumento_id             | instrumentos           | id            | instrumentos_relacionados_instrumento_id_fkey       | NO ACTION   | CASCADE     |
| instrumentos_relacionados  | relacionado_id             | instrumentos           | id            | instrumentos_relacionados_relacionado_id_fkey       | NO ACTION   | CASCADE     |
| lessons                    | module_id                  | modules                | id            | lessons_module_id_fkey                              | NO ACTION   | CASCADE     |
| lessons                    | professor_responsavel_id   | profiles               | id            | lessons_professor_responsavel_id_fkey               | NO ACTION   | NO ACTION   |
| manutencoes_instrumentos   | instrumento_fisico_id      | instrumentos_fisicos   | id            | manutencoes_instrumentos_instrumento_fisico_id_fkey | NO ACTION   | NO ACTION   |
| materiais_apoio            | instrumento_relacionado_id | instrumentos           | id            | materiais_apoio_instrumento_relacionado_id_fkey     | NO ACTION   | NO ACTION   |
| materiais_apoio            | metodologia_relacionada_id | metodologias_ensino    | id            | materiais_apoio_metodologia_relacionada_id_fkey     | NO ACTION   | NO ACTION   |
| materiais_apoio            | modulo_relacionado_id      | modulos                | id            | materiais_apoio_modulo_relacionado_id_fkey          | NO ACTION   | NO ACTION   |
| matriculas                 | aluno_id                   | alunos                 | id            | matriculas_aluno_id_fkey                            | NO ACTION   | CASCADE     |
| matriculas                 | turma_id                   | turmas                 | id            | matriculas_turma_id_fkey                            | NO ACTION   | CASCADE     |
| presencas                  | matricula_id               | matriculas             | id            | presencas_matricula_id_fkey                         | NO ACTION   | CASCADE     |
| professor_instrumentos     | instrumento_id             | instrumentos           | id            | professor_instrumentos_instrumento_id_fkey          | NO ACTION   | CASCADE     |
| professor_instrumentos     | professor_id               | professores            | id            | professor_instrumentos_professor_id_fkey            | NO ACTION   | CASCADE     |
| professores                | id                         | profiles               | id            | fk_professor_profile                                | NO ACTION   | CASCADE     |
| professores_conteudos      | categoria_id               | professores_categorias | id            | professores_conteudos_categoria_id_fkey             | NO ACTION   | SET NULL    |
| qr_codes                   | aula_id                    | aulas                  | id            | qr_codes_aula_id_fkey                               | NO ACTION   | NO ACTION   |
| qr_codes                   | created_by                 | profiles               | id            | qr_codes_created_by_fkey                            | NO ACTION   | NO ACTION   |
| qr_codes                   | instrument_id              | instrumentos           | id            | qr_codes_instrument_id_fkey                         | NO ACTION   | NO ACTION   |
| qr_scans                   | qr_code_id                 | qr_codes               | id            | qr_scans_qr_code_id_fkey                            | NO ACTION   | CASCADE     |
| qr_scans                   | user_id                    | profiles               | id            | qr_scans_user_id_fkey                               | NO ACTION   | NO ACTION   |
| repertorio_musical         | instrumento_principal_id   | instrumentos           | id            | repertorio_musical_instrumento_principal_id_fkey    | NO ACTION   | NO ACTION   |
| repertorio_musical         | modulo_sugerido_id         | modulos                | id            | repertorio_musical_modulo_sugerido_id_fkey          | NO ACTION   | NO ACTION   |
| role_permissions           | permission_id              | permissions            | id            | role_permissions_permission_id_fkey                 | NO ACTION   | CASCADE     |
| role_permissions           | role_id                    | roles                  | id            | role_permissions_role_id_fkey                       | NO ACTION   | CASCADE     |
| sequencias_didaticas       | criado_por_id              | profiles               | id            | sequencias_didaticas_criado_por_id_fkey             | NO ACTION   | NO ACTION   |
| sequencias_didaticas       | metodologia_id             | metodologias_ensino    | id            | sequencias_didaticas_metodologia_id_fkey            | NO ACTION   | NO ACTION   |
| turma_alunos               | aluno_id                   | usuarios               | id            | turma_alunos_aluno_id_fkey                          | NO ACTION   | CASCADE     |
| turma_alunos               | turma_id                   | turmas                 | id            | turma_alunos_turma_id_fkey                          | NO ACTION   | CASCADE     |
| turmas                     | instrumento_id             | instrumentos           | id            | turmas_instrumento_id_fkey                          | NO ACTION   | CASCADE     |
| turmas                     | professor_id               | professores            | id            | turmas_professor_id_fkey                            | NO ACTION   | CASCADE     |
| user_achievements          | achievement_id             | achievements           | id            | user_achievements_achievement_id_fkey               | NO ACTION   | CASCADE     |
| user_devotional_progress   | devotional_id              | devotional_content     | id            | user_devotional_progress_devotional_id_fkey         | NO ACTION   | CASCADE     |
| user_notifications         | user_id                    | profiles               | id            | user_notifications_user_id_fkey                     | NO ACTION   | CASCADE     |
| user_points_log            | aula_id                    | aulas                  | id            | user_points_log_aula_id_fkey                        | NO ACTION   | NO ACTION   |
| user_points_log            | user_id                    | profiles               | id            | user_points_log_user_id_fkey                        | NO ACTION   | CASCADE     |
| user_progress              | lesson_id                  | lessons                | id            | user_progress_lesson_id_fkey                        | NO ACTION   | CASCADE     |
| user_roles                 | granted_by                 | profiles               | id            | user_roles_granted_by_fkey                          | NO ACTION   | NO ACTION   |
| user_roles                 | user_id                    | profiles               | id            | user_roles_user_id_fkey                             | NO ACTION   | CASCADE     |

-- 3.3 Outras constraints (unique, check, etc)
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.check_constraints cc
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
    AND tc.constraint_type IN ('UNIQUE', 'CHECK')
ORDER BY tc.table_name, tc.constraint_type;


| table_name                 | constraint_name                                     | constraint_type | column_name    | check_clause                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------- | --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| achievements               | 2200_17461_2_not_null                               | CHECK           | null           | name IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| achievements               | 2200_17461_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| achievements_educacionais  | 2200_79298_2_not_null                               | CHECK           | null           | nome IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| achievements_educacionais  | 2200_79298_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| achievements_progress      | 2200_17471_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| achievements_progress      | 2200_17471_5_not_null                               | CHECK           | null           | target_progress IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| achievements_progress      | achievements_progress_user_id_achievement_id_key    | UNIQUE          | achievement_id | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| achievements_progress      | achievements_progress_user_id_achievement_id_key    | UNIQUE          | user_id        | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| admins                     | 2200_17482_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| admins                     | admins_nivel_acesso_check                           | CHECK           | null           | ((nivel_acesso = ANY (ARRAY['admin'::text, 'super_admin'::text, 'moderador'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| alunos                     | 2200_17492_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| alunos                     | aluno_id_unique                                     | UNIQUE          | id             | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| audit_activities           | 2200_17500_4_not_null                               | CHECK           | null           | resource IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| audit_activities           | audit_activities_severity_check                     | CHECK           | null           | ((severity = ANY (ARRAY['info'::text, 'warning'::text, 'error'::text, 'critical'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| audit_activities           | 2200_17500_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| audit_activities           | 2200_17500_3_not_null                               | CHECK           | null           | action IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aula_atividades            | 2200_17510_2_not_null                               | CHECK           | null           | aula_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aula_atividades            | aula_atividades_tipo_check                          | CHECK           | null           | ((tipo = ANY (ARRAY['abertura'::text, 'principal'::text, 'alpha'::text, 'final'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| aula_atividades            | 2200_17510_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_checklist             | aula_checklist_tipo_check                           | CHECK           | null           | ((tipo = ANY (ARRAY['pre'::text, 'pos'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| aula_checklist             | 2200_17517_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_criterios_avaliacao   | 2200_17525_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_criterios_avaliacao   | 2200_17525_2_not_null                               | CHECK           | null           | aula_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aula_desafio_alpha         | 2200_17531_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_desafio_alpha         | 2200_17531_2_not_null                               | CHECK           | null           | aula_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aula_desafios              | aula_desafios_publico_alvo_check                    | CHECK           | null           | ((publico_alvo = ANY (ARRAY['aluno'::text, 'professor'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| aula_desafios              | 2200_17537_3_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aula_desafios              | 2200_17537_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_feedback              | 2200_17546_2_not_null                               | CHECK           | null           | aula_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aula_feedback              | 2200_17546_3_not_null                               | CHECK           | null           | professor_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| aula_feedback              | 2200_17546_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_feedbacks             | 2200_17553_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_materiais             | 2200_17560_5_not_null                               | CHECK           | null           | url IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| aula_materiais             | aula_materiais_tipo_check                           | CHECK           | null           | ((tipo = ANY (ARRAY['pdf'::text, 'vídeo'::text, 'partitura'::text, 'formulário'::text, 'slide'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| aula_materiais             | 2200_17560_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_permissoes            | 2200_17567_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_registros             | 2200_17573_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_registros             | aula_registros_tipo_check                           | CHECK           | null           | ((tipo = ANY (ARRAY['foto'::text, 'vídeo'::text, 'ata'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| aula_status_log            | aula_status_log_status_check                        | CHECK           | null           | ((status = ANY (ARRAY['a_fazer'::text, 'em_preparacao'::text, 'concluida'::text, 'revisao'::text, 'cancelada'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| aula_status_log            | 2200_17580_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_status_log            | 2200_17580_3_not_null                               | CHECK           | null           | status IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aula_tags                  | 2200_17588_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aula_tags                  | 2200_17588_2_not_null                               | CHECK           | null           | aula_id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aula_tags                  | aula_tags_tipo_check                                | CHECK           | null           | ((tipo = ANY (ARRAY['publico'::text, 'nivel'::text, 'formato'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| aulas                      | aulas_nivel_check                                   | CHECK           | null           | ((nivel = ANY (ARRAY['iniciante'::text, 'intermediario'::text, 'avancado'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| aulas                      | aulas_status_check                                  | CHECK           | null           | ((status = ANY (ARRAY['A Fazer'::text, 'Em Preparação'::text, 'Concluída'::text, 'Revisão'::text, 'Cancelada'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| aulas                      | 2200_17595_2_not_null                               | CHECK           | null           | numero IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aulas                      | 2200_17595_5_not_null                               | CHECK           | null           | data_programada IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| aulas                      | 2200_17595_3_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aulas                      | aulas_formato_check                                 | CHECK           | null           | ((formato = ANY (ARRAY['presencial'::text, 'online'::text, 'hibrido'::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| aulas                      | 2200_17595_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| cessoes_instrumentos       | 2200_17606_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| desafios_alpha             | 2200_79800_3_not_null                               | CHECK           | null           | descricao IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| desafios_alpha             | 2200_79800_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| desafios_alpha             | 2200_79800_2_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| desafios_alpha             | 2200_79800_5_not_null                               | CHECK           | null           | semana IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| desafios_alpha_respostas   | 2200_79838_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| devotional_content         | 2200_17618_3_not_null                               | CHECK           | null           | content IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| devotional_content         | 2200_17618_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| devotional_content         | 2200_17618_2_not_null                               | CHECK           | null           | title IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| forum_likes                | 2200_79092_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| forum_likes                | forum_likes_user_id_resposta_id_key                 | UNIQUE          | resposta_id    | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| forum_likes                | forum_likes_user_id_resposta_id_key                 | UNIQUE          | user_id        | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| forum_perguntas            | 2200_79006_4_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| forum_perguntas            | 2200_79006_5_not_null                               | CHECK           | null           | pergunta IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| forum_perguntas            | 2200_79006_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| forum_respostas            | 2200_79050_4_not_null                               | CHECK           | null           | resposta IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| forum_respostas            | 2200_79050_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| historico_instrumentos     | 2200_17627_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| hook_cache                 | 2200_17634_5_not_null                               | CHECK           | null           | data IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| hook_cache                 | 2200_17634_4_not_null                               | CHECK           | null           | hook_name IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| hook_cache                 | 2200_17634_2_not_null                               | CHECK           | null           | cache_key IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| hook_cache                 | 2200_17634_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| hook_cache                 | 2200_17634_6_not_null                               | CHECK           | null           | expires_at IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| hook_cache                 | hook_cache_cache_key_key                            | UNIQUE          | cache_key      | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| instrumento_curiosidades   | instrumento_curiosidades_categoria_check            | CHECK           | null           | (((categoria)::text = ANY (ARRAY[('historia'::character varying)::text, ('tecnica'::character varying)::text, ('cultural'::character varying)::text, ('ciencia'::character varying)::text, ('curiosa'::character varying)::text, ('interessante'::character varying)::text, ('factual'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| instrumento_curiosidades   | 2200_17643_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_curiosidades   | 2200_17643_3_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| instrumento_curiosidades   | 2200_17643_4_not_null                               | CHECK           | null           | conteudo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| instrumento_midias         | instrumento_midias_categoria_check                  | CHECK           | null           | (((categoria)::text = ANY (ARRAY[('demonstracao'::character varying)::text, ('tecnica'::character varying)::text, ('historia'::character varying)::text, ('performance'::character varying)::text, ('educativo'::character varying)::text, ('tutorial'::character varying)::text, ('exemplo'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| instrumento_midias         | 2200_17651_3_not_null                               | CHECK           | null           | tipo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| instrumento_midias         | instrumento_midias_tipo_check                       | CHECK           | null           | (((tipo)::text = ANY (ARRAY[('imagem'::character varying)::text, ('video'::character varying)::text, ('audio'::character varying)::text, ('3d'::character varying)::text, ('documento'::character varying)::text, ('interativo'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| instrumento_midias         | instrumento_midias_origem_check                     | CHECK           | null           | (((origem)::text = ANY (ARRAY[('url'::character varying)::text, ('upload'::character varying)::text, ('youtube'::character varying)::text, ('vimeo'::character varying)::text, ('local'::character varying)::text, ('cdn'::character varying)::text, ('externa'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| instrumento_midias         | 2200_17651_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_midias         | 2200_17651_4_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| instrumento_performances   | 2200_17667_3_not_null                               | CHECK           | null           | titulo IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| instrumento_performances   | 2200_17667_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_quiz           | 2200_17676_3_not_null                               | CHECK           | null           | pergunta IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| instrumento_quiz           | 2200_17676_4_not_null                               | CHECK           | null           | opcoes IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| instrumento_quiz           | instrumento_quiz_categoria_check                    | CHECK           | null           | (((categoria)::text = ANY (ARRAY[('historia'::character varying)::text, ('tecnica'::character varying)::text, ('auditiva'::character varying)::text, ('visual'::character varying)::text, ('teoria'::character varying)::text, ('pratica'::character varying)::text, ('geral'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| instrumento_quiz           | 2200_17676_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_quiz           | instrumento_quiz_tipo_pergunta_check                | CHECK           | null           | (((tipo_pergunta)::text = ANY (ARRAY[('multipla_escolha'::character varying)::text, ('verdadeiro_falso'::character varying)::text, ('auditiva'::character varying)::text, ('visual'::character varying)::text, ('ordenacao'::character varying)::text, ('associacao'::character varying)::text, ('completar'::character varying)::text, ('texto_livre'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| instrumento_sons           | 2200_17689_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_sons           | 2200_17689_6_not_null                               | CHECK           | null           | arquivo_audio IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| instrumento_sons           | instrumento_sons_dinamica_check                     | CHECK           | null           | (((dinamica)::text = ANY (ARRAY[('pp'::character varying)::text, ('p'::character varying)::text, ('mp'::character varying)::text, ('mf'::character varying)::text, ('f'::character varying)::text, ('ff'::character varying)::text, ('fff'::character varying)::text, ('pianissimo'::character varying)::text, ('piano'::character varying)::text, ('mezzoforte'::character varying)::text, ('forte'::character varying)::text, ('fortissimo'::character varying)::text, ('crescendo'::character varying)::text, ('decrescendo'::character varying)::text, ('diminuendo'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                   |
| instrumento_sons_variacoes | 2200_17697_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| instrumento_sons_variacoes | 2200_17697_3_not_null                               | CHECK           | null           | arquivo_audio IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| instrumento_sons_variacoes | instrumento_sons_variacoes_qualidade_gravacao_check | CHECK           | null           | (((qualidade_gravacao)::text = ANY (ARRAY[('baixa'::character varying)::text, ('media'::character varying)::text, ('alta'::character varying)::text, ('studio'::character varying)::text])))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| instrumento_tecnicas       | instrumento_tecnicas_tipo_tecnica_check             | CHECK           | null           | (((tipo_tecnica)::text = ANY (ARRAY[('respiracao'::character varying)::text, ('digitacao'::character varying)::text, ('arco'::character varying)::text, ('articulacao'::character varying)::text, ('ritmo'::character varying)::text, ('postura'::character varying)::text, ('afinacao'::character varying)::text, ('dinamica'::character varying)::text, ('ornamentacao'::character varying)::text, ('improviso'::character varying)::text, ('leitura'::character varying)::text, ('pedal'::character varying)::text, ('harmonia'::character varying)::text, ('tecnica'::character varying)::text, ('coordenacao'::character varying)::text, ('rudimento'::character varying)::text, ('velocidade'::character varying)::text, ('expressao'::character varying)::text, ('legato'::character varying)::text, ('tapping'::character varying)::text, ('palheta'::character varying)::text, ('harmonicos'::character varying)::text, ('timbre'::character varying)::text]))) |
| instrumento_tecnicas       | 2200_17705_1_not_null                               | CHECK           | null           | id IS NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

-- ===================================================================
-- 📇 4. ÍNDICES
-- ===================================================================

-- 4.1 Todos os índices
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;


| schemaname | tablename                  | indexname                                                   | indexdef                                                                                                                                                         |
| ---------- | -------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public     | achievements               | achievements_pkey                                           | CREATE UNIQUE INDEX achievements_pkey ON public.achievements USING btree (id)                                                                                    |
| public     | achievements               | idx_achievements_active                                     | CREATE INDEX idx_achievements_active ON public.achievements USING btree (is_active)                                                                              |
| public     | achievements               | idx_achievements_category                                   | CREATE INDEX idx_achievements_category ON public.achievements USING btree (category)                                                                             |
| public     | achievements               | idx_achievements_requirement_type                           | CREATE INDEX idx_achievements_requirement_type ON public.achievements USING btree (requirement_type)                                                             |
| public     | achievements_educacionais  | achievements_educacionais_pkey                              | CREATE UNIQUE INDEX achievements_educacionais_pkey ON public.achievements_educacionais USING btree (id)                                                          |
| public     | achievements_progress      | achievements_progress_pkey                                  | CREATE UNIQUE INDEX achievements_progress_pkey ON public.achievements_progress USING btree (id)                                                                  |
| public     | achievements_progress      | achievements_progress_user_id_achievement_id_key            | CREATE UNIQUE INDEX achievements_progress_user_id_achievement_id_key ON public.achievements_progress USING btree (user_id, achievement_id)                       |
| public     | achievements_progress      | idx_achievement_progress                                    | CREATE INDEX idx_achievement_progress ON public.achievements_progress USING btree (user_id, is_completed, updated_at DESC)                                       |
| public     | admins                     | admins_pkey                                                 | CREATE UNIQUE INDEX admins_pkey ON public.admins USING btree (id)                                                                                                |
| public     | alunos                     | aluno_id_unique                                             | CREATE UNIQUE INDEX aluno_id_unique ON public.alunos USING btree (id)                                                                                            |
| public     | alunos                     | alunos_pkey                                                 | CREATE UNIQUE INDEX alunos_pkey ON public.alunos USING btree (id)                                                                                                |
| public     | alunos                     | idx_alunos_instrumento                                      | CREATE INDEX idx_alunos_instrumento ON public.alunos USING btree (instrumento_id)                                                                                |
| public     | audit_activities           | audit_activities_pkey                                       | CREATE UNIQUE INDEX audit_activities_pkey ON public.audit_activities USING btree (id)                                                                            |
| public     | audit_activities           | idx_audit_action_time                                       | CREATE INDEX idx_audit_action_time ON public.audit_activities USING btree (action, created_at DESC)                                                              |
| public     | audit_activities           | idx_audit_resource                                          | CREATE INDEX idx_audit_resource ON public.audit_activities USING btree (resource, resource_id)                                                                   |
| public     | audit_activities           | idx_audit_severity                                          | CREATE INDEX idx_audit_severity ON public.audit_activities USING btree (severity, created_at DESC) WHERE (severity <> 'info'::text)                              |
| public     | audit_activities           | idx_audit_user_time                                         | CREATE INDEX idx_audit_user_time ON public.audit_activities USING btree (user_id, created_at DESC)                                                               |
| public     | aula_atividades            | aula_atividades_pkey                                        | CREATE UNIQUE INDEX aula_atividades_pkey ON public.aula_atividades USING btree (id)                                                                              |
| public     | aula_atividades            | idx_aula_atividades_aula_id                                 | CREATE INDEX idx_aula_atividades_aula_id ON public.aula_atividades USING btree (aula_id)                                                                         |
| public     | aula_checklist             | aula_checklist_pkey                                         | CREATE UNIQUE INDEX aula_checklist_pkey ON public.aula_checklist USING btree (id)                                                                                |
| public     | aula_checklist             | idx_aula_checklist_aula_id                                  | CREATE INDEX idx_aula_checklist_aula_id ON public.aula_checklist USING btree (aula_id)                                                                           |
| public     | aula_criterios_avaliacao   | aula_criterios_avaliacao_pkey                               | CREATE UNIQUE INDEX aula_criterios_avaliacao_pkey ON public.aula_criterios_avaliacao USING btree (id)                                                            |
| public     | aula_criterios_avaliacao   | idx_aula_criterios_aula_id                                  | CREATE INDEX idx_aula_criterios_aula_id ON public.aula_criterios_avaliacao USING btree (aula_id)                                                                 |
| public     | aula_desafio_alpha         | aula_desafio_alpha_pkey                                     | CREATE UNIQUE INDEX aula_desafio_alpha_pkey ON public.aula_desafio_alpha USING btree (id)                                                                        |
| public     | aula_desafio_alpha         | idx_aula_desafio_alpha_aula_id                              | CREATE INDEX idx_aula_desafio_alpha_aula_id ON public.aula_desafio_alpha USING btree (aula_id)                                                                   |
| public     | aula_desafios              | aula_desafios_pkey                                          | CREATE UNIQUE INDEX aula_desafios_pkey ON public.aula_desafios USING btree (id)                                                                                  |
| public     | aula_desafios              | idx_aula_desafios_aula_id                                   | CREATE INDEX idx_aula_desafios_aula_id ON public.aula_desafios USING btree (aula_id)                                                                             |
| public     | aula_feedback              | aula_feedback_pkey                                          | CREATE UNIQUE INDEX aula_feedback_pkey ON public.aula_feedback USING btree (id)                                                                                  |
| public     | aula_feedback              | idx_aula_feedback_aula_id                                   | CREATE INDEX idx_aula_feedback_aula_id ON public.aula_feedback USING btree (aula_id)                                                                             |
| public     | aula_feedbacks             | aula_feedbacks_pkey                                         | CREATE UNIQUE INDEX aula_feedbacks_pkey ON public.aula_feedbacks USING btree (id)                                                                                |
| public     | aula_feedbacks             | idx_aula_feedbacks_aula_id                                  | CREATE INDEX idx_aula_feedbacks_aula_id ON public.aula_feedbacks USING btree (aula_id)                                                                           |
| public     | aula_materiais             | aula_materiais_pkey                                         | CREATE UNIQUE INDEX aula_materiais_pkey ON public.aula_materiais USING btree (id)                                                                                |
| public     | aula_materiais             | idx_aula_materiais_aula_id                                  | CREATE INDEX idx_aula_materiais_aula_id ON public.aula_materiais USING btree (aula_id)                                                                           |
| public     | aula_permissoes            | aula_permissoes_pkey                                        | CREATE UNIQUE INDEX aula_permissoes_pkey ON public.aula_permissoes USING btree (id)                                                                              |
| public     | aula_permissoes            | idx_aula_permissoes_aula_id                                 | CREATE INDEX idx_aula_permissoes_aula_id ON public.aula_permissoes USING btree (aula_id)                                                                         |
| public     | aula_registros             | aula_registros_pkey                                         | CREATE UNIQUE INDEX aula_registros_pkey ON public.aula_registros USING btree (id)                                                                                |
| public     | aula_registros             | idx_aula_registros_aula_id                                  | CREATE INDEX idx_aula_registros_aula_id ON public.aula_registros USING btree (aula_id)                                                                           |
| public     | aula_status_log            | aula_status_log_pkey                                        | CREATE UNIQUE INDEX aula_status_log_pkey ON public.aula_status_log USING btree (id)                                                                              |
| public     | aula_status_log            | idx_aula_status_log_aula_id                                 | CREATE INDEX idx_aula_status_log_aula_id ON public.aula_status_log USING btree (aula_id)                                                                         |
| public     | aula_tags                  | aula_tags_pkey                                              | CREATE UNIQUE INDEX aula_tags_pkey ON public.aula_tags USING btree (id)                                                                                          |
| public     | aula_tags                  | idx_aula_tags_aula_id                                       | CREATE INDEX idx_aula_tags_aula_id ON public.aula_tags USING btree (aula_id)                                                                                     |
| public     | aulas                      | aulas_pkey                                                  | CREATE UNIQUE INDEX aulas_pkey ON public.aulas USING btree (id)                                                                                                  |
| public     | cessoes_instrumentos       | cessoes_instrumentos_pkey                                   | CREATE UNIQUE INDEX cessoes_instrumentos_pkey ON public.cessoes_instrumentos USING btree (id)                                                                    |
| public     | cessoes_instrumentos       | idx_cessoes_aluno_id                                        | CREATE INDEX idx_cessoes_aluno_id ON public.cessoes_instrumentos USING btree (aluno_id)                                                                          |
| public     | cessoes_instrumentos       | idx_cessoes_data_inicio                                     | CREATE INDEX idx_cessoes_data_inicio ON public.cessoes_instrumentos USING btree (data_inicio)                                                                    |
| public     | cessoes_instrumentos       | idx_cessoes_instrumento_fisico_id                           | CREATE INDEX idx_cessoes_instrumento_fisico_id ON public.cessoes_instrumentos USING btree (instrumento_fisico_id)                                                |
| public     | desafios_alpha             | desafios_alpha_pkey                                         | CREATE UNIQUE INDEX desafios_alpha_pkey ON public.desafios_alpha USING btree (id)                                                                                |
| public     | desafios_alpha_respostas   | desafios_alpha_respostas_pkey                               | CREATE UNIQUE INDEX desafios_alpha_respostas_pkey ON public.desafios_alpha_respostas USING btree (id)                                                            |
| public     | devotional_content         | devotional_content_pkey                                     | CREATE UNIQUE INDEX devotional_content_pkey ON public.devotional_content USING btree (id)                                                                        |
| public     | devotional_content         | idx_devotional_content_category                             | CREATE INDEX idx_devotional_content_category ON public.devotional_content USING btree (category)                                                                 |
| public     | devotional_content         | idx_devotional_content_published                            | CREATE INDEX idx_devotional_content_published ON public.devotional_content USING btree (is_published)                                                            |
| public     | devotional_content         | idx_devotional_content_published_date                       | CREATE INDEX idx_devotional_content_published_date ON public.devotional_content USING btree (published_date DESC)                                                |
| public     | forum_likes                | forum_likes_pkey                                            | CREATE UNIQUE INDEX forum_likes_pkey ON public.forum_likes USING btree (id)                                                                                      |
| public     | forum_likes                | forum_likes_user_id_resposta_id_key                         | CREATE UNIQUE INDEX forum_likes_user_id_resposta_id_key ON public.forum_likes USING btree (user_id, resposta_id)                                                 |
| public     | forum_perguntas            | forum_perguntas_pkey                                        | CREATE UNIQUE INDEX forum_perguntas_pkey ON public.forum_perguntas USING btree (id)                                                                              |
| public     | forum_perguntas            | idx_forum_perguntas_aluno                                   | CREATE INDEX idx_forum_perguntas_aluno ON public.forum_perguntas USING btree (aluno_id)                                                                          |
| public     | forum_perguntas            | idx_forum_perguntas_modulo                                  | CREATE INDEX idx_forum_perguntas_modulo ON public.forum_perguntas USING btree (modulo_id)                                                                        |
| public     | forum_perguntas            | idx_forum_perguntas_status                                  | CREATE INDEX idx_forum_perguntas_status ON public.forum_perguntas USING btree (status)                                                                           |
| public     | forum_respostas            | forum_respostas_pkey                                        | CREATE UNIQUE INDEX forum_respostas_pkey ON public.forum_respostas USING btree (id)                                                                              |
| public     | historico_instrumentos     | historico_instrumentos_pkey                                 | CREATE UNIQUE INDEX historico_instrumentos_pkey ON public.historico_instrumentos USING btree (id)                                                                |
| public     | historico_instrumentos     | idx_historico_instrumento_fisico_id                         | CREATE INDEX idx_historico_instrumento_fisico_id ON public.historico_instrumentos USING btree (instrumento_fisico_id)                                            |
| public     | hook_cache                 | hook_cache_cache_key_key                                    | CREATE UNIQUE INDEX hook_cache_cache_key_key ON public.hook_cache USING btree (cache_key)                                                                        |
| public     | hook_cache                 | hook_cache_pkey                                             | CREATE UNIQUE INDEX hook_cache_pkey ON public.hook_cache USING btree (id)                                                                                        |
| public     | hook_cache                 | idx_cache_cleanup                                           | CREATE INDEX idx_cache_cleanup ON public.hook_cache USING btree (expires_at)                                                                                     |
| public     | hook_cache                 | idx_cache_lookup                                            | CREATE INDEX idx_cache_lookup ON public.hook_cache USING btree (cache_key, expires_at)                                                                           |
| public     | hook_cache                 | idx_cache_user_hook                                         | CREATE INDEX idx_cache_user_hook ON public.hook_cache USING btree (user_id, hook_name)                                                                           |
| public     | instrumento_curiosidades   | idx_instrumento_curiosidades_categoria                      | CREATE INDEX idx_instrumento_curiosidades_categoria ON public.instrumento_curiosidades USING btree (categoria)                                                   |
| public     | instrumento_curiosidades   | idx_instrumento_curiosidades_instrumento                    | CREATE INDEX idx_instrumento_curiosidades_instrumento ON public.instrumento_curiosidades USING btree (instrumento_id)                                            |
| public     | instrumento_curiosidades   | instrumento_curiosidades_pkey                               | CREATE UNIQUE INDEX instrumento_curiosidades_pkey ON public.instrumento_curiosidades USING btree (id)                                                            |
| public     | instrumento_midias         | idx_instrumento_midias_categoria                            | CREATE INDEX idx_instrumento_midias_categoria ON public.instrumento_midias USING btree (categoria)                                                               |
| public     | instrumento_midias         | idx_instrumento_midias_instrumento                          | CREATE INDEX idx_instrumento_midias_instrumento ON public.instrumento_midias USING btree (instrumento_id)                                                        |
| public     | instrumento_midias         | idx_instrumento_midias_tipo                                 | CREATE INDEX idx_instrumento_midias_tipo ON public.instrumento_midias USING btree (tipo)                                                                         |
| public     | instrumento_midias         | instrumento_midias_pkey                                     | CREATE UNIQUE INDEX instrumento_midias_pkey ON public.instrumento_midias USING btree (id)                                                                        |
| public     | instrumento_performances   | idx_instrumento_performances_artista                        | CREATE INDEX idx_instrumento_performances_artista ON public.instrumento_performances USING btree (artista)                                                       |
| public     | instrumento_performances   | idx_instrumento_performances_instrumento                    | CREATE INDEX idx_instrumento_performances_instrumento ON public.instrumento_performances USING btree (instrumento_id)                                            |
| public     | instrumento_performances   | instrumento_performances_pkey                               | CREATE UNIQUE INDEX instrumento_performances_pkey ON public.instrumento_performances USING btree (id)                                                            |
| public     | instrumento_quiz           | idx_instrumento_quiz_instrumento                            | CREATE INDEX idx_instrumento_quiz_instrumento ON public.instrumento_quiz USING btree (instrumento_id)                                                            |
| public     | instrumento_quiz           | idx_instrumento_quiz_tipo                                   | CREATE INDEX idx_instrumento_quiz_tipo ON public.instrumento_quiz USING btree (tipo_pergunta)                                                                    |
| public     | instrumento_quiz           | instrumento_quiz_pkey                                       | CREATE UNIQUE INDEX instrumento_quiz_pkey ON public.instrumento_quiz USING btree (id)                                                                            |
| public     | instrumento_sons           | idx_instrumento_sons_instrumento                            | CREATE INDEX idx_instrumento_sons_instrumento ON public.instrumento_sons USING btree (instrumento_id)                                                            |
| public     | instrumento_sons           | idx_instrumento_sons_tecnica                                | CREATE INDEX idx_instrumento_sons_tecnica ON public.instrumento_sons USING btree (tecnica)                                                                       |
| public     | instrumento_sons           | instrumento_sons_pkey                                       | CREATE UNIQUE INDEX instrumento_sons_pkey ON public.instrumento_sons USING btree (id)                                                                            |
| public     | instrumento_sons_variacoes | instrumento_sons_variacoes_pkey                             | CREATE UNIQUE INDEX instrumento_sons_variacoes_pkey ON public.instrumento_sons_variacoes USING btree (id)                                                        |
| public     | instrumento_tecnicas       | idx_instrumento_tecnicas_instrumento                        | CREATE INDEX idx_instrumento_tecnicas_instrumento ON public.instrumento_tecnicas USING btree (instrumento_id)                                                    |
| public     | instrumento_tecnicas       | idx_instrumento_tecnicas_nivel                              | CREATE INDEX idx_instrumento_tecnicas_nivel ON public.instrumento_tecnicas USING btree (nivel)                                                                   |
| public     | instrumento_tecnicas       | idx_instrumento_tecnicas_tipo                               | CREATE INDEX idx_instrumento_tecnicas_tipo ON public.instrumento_tecnicas USING btree (tipo_tecnica)                                                             |
| public     | instrumento_tecnicas       | instrumento_tecnicas_pkey                                   | CREATE UNIQUE INDEX instrumento_tecnicas_pkey ON public.instrumento_tecnicas USING btree (id)                                                                    |
| public     | instrumentos               | idx_instrumentos_categoria                                  | CREATE INDEX idx_instrumentos_categoria ON public.instrumentos USING btree (categoria)                                                                           |
| public     | instrumentos               | instrumentos_nome_key                                       | CREATE UNIQUE INDEX instrumentos_nome_key ON public.instrumentos USING btree (nome)                                                                              |
| public     | instrumentos               | instrumentos_pkey                                           | CREATE UNIQUE INDEX instrumentos_pkey ON public.instrumentos USING btree (id)                                                                                    |
| public     | instrumentos_alunos        | instrumentos_alunos_pkey                                    | CREATE UNIQUE INDEX instrumentos_alunos_pkey ON public.instrumentos_alunos USING btree (id)                                                                      |
| public     | instrumentos_fisicos       | instrumentos_fisicos_codigo_patrimonio_key                  | CREATE UNIQUE INDEX instrumentos_fisicos_codigo_patrimonio_key ON public.instrumentos_fisicos USING btree (codigo_patrimonio)                                    |
| public     | instrumentos_fisicos       | instrumentos_fisicos_pkey                                   | CREATE UNIQUE INDEX instrumentos_fisicos_pkey ON public.instrumentos_fisicos USING btree (id)                                                                    |
| public     | instrumentos_relacionados  | idx_instrumentos_relacionados_instrumento                   | CREATE INDEX idx_instrumentos_relacionados_instrumento ON public.instrumentos_relacionados USING btree (instrumento_id)                                          |
| public     | instrumentos_relacionados  | idx_instrumentos_relacionados_tipo                          | CREATE INDEX idx_instrumentos_relacionados_tipo ON public.instrumentos_relacionados USING btree (tipo_relacao)                                                   |
| public     | instrumentos_relacionados  | instrumentos_relacionados_instrumento_id_relacionado_id_key | CREATE UNIQUE INDEX instrumentos_relacionados_instrumento_id_relacionado_id_key ON public.instrumentos_relacionados USING btree (instrumento_id, relacionado_id) |
| public     | instrumentos_relacionados  | instrumentos_relacionados_pkey                              | CREATE UNIQUE INDEX instrumentos_relacionados_pkey ON public.instrumentos_relacionados USING btree (id)                                                          |
| public     | lessons                    | idx_lessons_exercise                                        | CREATE INDEX idx_lessons_exercise ON public.lessons USING btree (has_exercise)                                                                                   |
| public     | lessons                    | idx_lessons_free                                            | CREATE INDEX idx_lessons_free ON public.lessons USING btree (is_free)                                                                                            |
| public     | lessons                    | idx_lessons_module_id                                       | CREATE INDEX idx_lessons_module_id ON public.lessons USING btree (module_id)                                                                                     |

-- ===================================================================
-- 👁️ 5. VIEWS
-- ===================================================================

-- 5.1 Todas as views
SELECT 
    table_name as view_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

| view_name                             | view_definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| admin_alunos                          |  SELECT a.id,
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
            WHEN (prof.last_active IS NULL) THEN 'nunca_ativo'::text
            WHEN (prof.last_active >= (CURRENT_DATE - '7 days'::interval)) THEN 'ativo'::text
            ELSE 'inativo'::text
        END AS status_atividade,
        CASE
            WHEN ((prof.nome IS NOT NULL) AND (a.instrumento IS NOT NULL)) THEN true
            ELSE false
        END AS perfil_completo
   FROM (alunos a
     LEFT JOIN profiles prof ON ((a.id = prof.id)))
  WHERE (a.ativo = true)
  ORDER BY a.criado_em DESC;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| admin_professores                     |  SELECT p.id,
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
        CASE
            WHEN (prof.last_active IS NULL) THEN 'nunca_ativo'::text
            WHEN (prof.last_active >= (CURRENT_DATE - '7 days'::interval)) THEN 'ativo'::text
            WHEN (prof.last_active >= (CURRENT_DATE - '30 days'::interval)) THEN 'moderado'::text
            ELSE 'inativo'::text
        END AS status_atividade,
    COALESCE(( SELECT count(*) AS count
           FROM turmas t
          WHERE (t.professor_id = p.id)), (0)::bigint) AS total_turmas,
    COALESCE(( SELECT count(DISTINCT ta.aluno_id) AS count
           FROM (turmas t
             JOIN turma_alunos ta ON ((t.id = ta.turma_id)))
          WHERE (t.professor_id = p.id)), (0)::bigint) AS total_alunos,
    COALESCE(( SELECT count(*) AS count
           FROM professores_conteudos pc
          WHERE (pc.criado_por = p.id)), (0)::bigint) AS total_conteudos
   FROM (professores p
     LEFT JOIN profiles prof ON ((p.id = prof.id)))
  WHERE (p.ativo = true)
  ORDER BY p.criado_em DESC;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| admin_usuarios_completos              |  SELECT prof.id,
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
        CASE
            WHEN (prof.last_active IS NULL) THEN 'nunca_ativo'::text
            WHEN (prof.last_active >= (CURRENT_DATE - '7 days'::interval)) THEN 'ativo'::text
            WHEN (prof.last_active >= (CURRENT_DATE - '30 days'::interval)) THEN 'moderado'::text
            ELSE 'inativo'::text
        END AS status_atividade,
    (EXISTS ( SELECT 1
           FROM professores
          WHERE (professores.id = prof.id))) AS e_professor,
    (EXISTS ( SELECT 1
           FROM alunos
          WHERE (alunos.id = prof.id))) AS e_aluno,
    (EXISTS ( SELECT 1
           FROM admins
          WHERE (admins.id = prof.id))) AS e_admin
   FROM profiles prof
  ORDER BY prof.joined_at DESC;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| professores_dashboard_stats           |  SELECT p.id AS professor_id,
    p.full_name AS professor_nome,
    count(pc.id) AS total_conteudos,
    count(pc.id) FILTER (WHERE (pc.tipo = 'video'::text)) AS total_videos,
    count(pc.id) FILTER (WHERE (pc.tipo = 'sacada'::text)) AS total_sacadas,
    count(pc.id) FILTER (WHERE (pc.tipo = 'devocional'::text)) AS total_devocionais,
    count(pc.id) FILTER (WHERE (pc.tipo = 'material'::text)) AS total_materiais,
    COALESCE(sum(pc.visualizacoes), (0)::bigint) AS total_visualizacoes,
    COALESCE(sum(pc.downloads), (0)::bigint) AS total_downloads,
    max(pc.criado_em) AS ultimo_conteudo_criado
   FROM (profiles p
     LEFT JOIN professores_conteudos pc ON (((pc.criado_por = p.id) AND (pc.ativo = true))))
  WHERE (p.tipo_usuario = ANY (ARRAY['professor'::text, 'pastor'::text, 'admin'::text]))
  GROUP BY p.id, p.full_name;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| view_admin_dashboard                  |  SELECT ( SELECT count(*) AS count
           FROM profiles) AS total_users,
    ( SELECT count(*) AS count
           FROM admins
          WHERE (admins.ativo = true)) AS total_admins,
    ( SELECT count(*) AS count
           FROM professores
          WHERE (professores.ativo = true)) AS total_professores,
    ( SELECT count(*) AS count
           FROM alunos
          WHERE (alunos.ativo = true)) AS total_alunos,
    ( SELECT count(*) AS count
           FROM aulas) AS total_aulas,
    ( SELECT count(*) AS count
           FROM instrumentos) AS total_instrumentos,
    ( SELECT count(*) AS count
           FROM professores_conteudos) AS total_conteudos,
    ( SELECT count(*) AS count
           FROM achievements) AS total_achievements,
    ( SELECT count(*) AS count
           FROM audit_activities
          WHERE (audit_activities.created_at >= (CURRENT_DATE - '7 days'::interval))) AS activities_week,
    ( SELECT count(*) AS count
           FROM qr_scans
          WHERE (qr_scans.scanned_at >= (CURRENT_DATE - '7 days'::interval))) AS qr_scans_week,
    ( SELECT count(*) AS count
           FROM user_points_log
          WHERE (user_points_log.created_at >= (CURRENT_DATE - '7 days'::interval))) AS points_awarded_week,
    ( SELECT count(*) AS count
           FROM hook_cache
          WHERE (hook_cache.expires_at > now())) AS active_cache_entries,
    ( SELECT COALESCE(avg(hook_cache.hit_count), (0)::numeric) AS "coalesce"
           FROM hook_cache) AS avg_cache_hits,
    ( SELECT count(*) AS count
           FROM user_notifications
          WHERE (user_notifications.is_read = false)) AS unread_notifications,
    ( SELECT jsonb_agg(jsonb_build_object('user_id', top.id, 'nome', top.nome, 'points', top.total_points) ORDER BY top.total_points DESC) AS jsonb_agg
           FROM ( SELECT profiles.id,
                    profiles.nome,
                    profiles.total_points
                   FROM profiles
                  WHERE (profiles.tipo_usuario = 'estudante'::text)
                  ORDER BY profiles.total_points DESC
                 LIMIT 5) top) AS top_students;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| view_attendance_analytics             |  SELECT a.id AS aula_id,
    a.numero,
    a.titulo,
    a.data_programada,
    a.status,
    ( SELECT count(*) AS count
           FROM alunos
          WHERE (alunos.ativo = true)) AS total_enrolled,
    0 AS total_present,
    0 AS confirmed_present,
    (0)::numeric AS attendance_percentage,
    ( SELECT count(*) AS count
           FROM qr_codes qr
          WHERE ((qr.aula_id = a.id) AND (qr.type = 'attendance'::text))) AS qr_codes_generated,
    ( SELECT count(*) AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE (qr.aula_id = a.id)) AS qr_scans_total,
    ( SELECT count(*) AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE ((qr.aula_id = a.id) AND (qs.result = 'success'::text))) AS qr_scans_success
   FROM aulas a;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| view_aulas_admin                      |  SELECT a.id,
    a.numero,
    a.titulo,
    a.status,
    a.objetivo_didatico,
    a.resumo_atividades,
    a.desafio_alpha,
    a.nivel,
    a.formato,
    a.data_programada,
    a.criado_em,
    m.nome AS modulo_nome,
    u.nome AS responsavel_nome
   FROM ((aulas a
     LEFT JOIN modulos m ON ((a.modulo_id = m.id)))
     LEFT JOIN usuarios u ON ((a.responsavel_id = u.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| view_aulas_aluno                      |  SELECT a.id,
    a.numero,
    a.titulo,
    a.data_programada,
    a.desafio_alpha
   FROM aulas a
  WHERE (a.status = 'liberada'::text);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| view_aulas_professor                  |  SELECT a.id,
    a.numero,
    a.titulo,
    a.status,
    a.objetivo_didatico,
    a.resumo_atividades,
    a.data_programada,
    a.desafio_alpha,
    m.nome AS modulo_nome
   FROM (aulas a
     LEFT JOIN modulos m ON ((a.modulo_id = m.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| view_placar_logos                     |  SELECT l.id,
    l.nome,
    l.descricao,
    l.url,
    l.ativo,
    COALESCE(count(p.voted_logo), (0)::bigint) AS votos,
    round(
        CASE
            WHEN (total_votes.total > 0) THEN (((count(p.voted_logo))::numeric / (total_votes.total)::numeric) * (100)::numeric)
            ELSE (0)::numeric
        END, 2) AS percentual
   FROM ((logos l
     LEFT JOIN profiles p ON ((l.id = p.voted_logo)))
     CROSS JOIN ( SELECT count(*) AS total
           FROM profiles
          WHERE (profiles.voted_logo IS NOT NULL)) total_votes)
  WHERE (l.ativo = true)
  GROUP BY l.id, l.nome, l.descricao, l.url, l.ativo, total_votes.total
  ORDER BY COALESCE(count(p.voted_logo), (0)::bigint) DESC, l.nome;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| view_professor_dashboard              |  SELECT p.id,
    COALESCE(( SELECT pr.nome
           FROM profiles pr
          WHERE (pr.id = p.id)), ( SELECT pr.full_name
           FROM profiles pr
          WHERE (pr.id = p.id)), ('Professor '::text || (p.id)::text)) AS nome,
    false AS admin_access,
    0 AS total_conteudos,
    0 AS total_videos,
    0 AS total_sacadas,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM qr_codes qr
          WHERE (qr.created_by = p.id)), 0) AS qr_codes_created,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM qr_codes qr
          WHERE ((qr.created_by = p.id) AND (qr.is_active = true))), 0) AS qr_codes_active,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE (qr.created_by = p.id)), 0) AS total_qr_scans,
    COALESCE(( SELECT (sum(qs.points_awarded))::integer AS sum
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE ((qr.created_by = p.id) AND (qs.result = 'success'::text))), 0) AS points_awarded_via_qr,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM audit_activities aa
          WHERE ((aa.user_id = p.id) AND (aa.created_at >= (CURRENT_DATE - '7 days'::interval)))), 0) AS recent_activities
   FROM professores p
  WHERE (p.ativo = true);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| view_qr_analytics                     |  SELECT qr.id,
    qr.code,
    qr.type,
    qr.created_by,
    p.nome AS creator_name,
    qr.aula_id,
    a.titulo AS aula_titulo,
    qr.expires_at,
    qr.max_scans,
    qr.current_scans,
    qr.is_active,
    count(qs.id) AS total_scans,
    count(
        CASE
            WHEN (qs.result = 'success'::text) THEN 1
            ELSE NULL::integer
        END) AS successful_scans,
    count(DISTINCT qs.user_id) AS unique_users,
    sum(qs.points_awarded) AS total_points_awarded,
    qr.created_at
   FROM (((qr_codes qr
     LEFT JOIN profiles p ON ((qr.created_by = p.id)))
     LEFT JOIN aulas a ON ((qr.aula_id = a.id)))
     LEFT JOIN qr_scans qs ON ((qr.id = qs.qr_code_id)))
  GROUP BY qr.id, p.nome, a.titulo;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| view_user_gamification                |  SELECT p.id,
    p.nome,
    p.full_name,
    p.total_points,
    p.current_streak,
    p.best_streak,
    p.lessons_completed,
    p.modules_completed,
    p.user_level,
    ( SELECT count(*) AS count
           FROM user_achievements ua
          WHERE (ua.user_id = p.id)) AS total_achievements,
    ( SELECT count(*) AS count
           FROM user_achievements ua
          WHERE ((ua.user_id = p.id) AND (ua.earned_at >= (CURRENT_DATE - '7 days'::interval)))) AS recent_achievements,
    ( SELECT count(*) AS count
           FROM user_points_log upl
          WHERE ((upl.user_id = p.id) AND (upl.created_at >= (CURRENT_DATE - '7 days'::interval)))) AS points_this_week,
    rank() OVER (ORDER BY p.total_points DESC) AS points_rank
   FROM profiles p
  WHERE (p.tipo_usuario = 'estudante'::text);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| vw_forum_stats                        |  SELECT fp.id,
    fp.titulo,
    fp.categoria,
    fp.status,
    fp.nivel_urgencia,
    p.nome AS aluno_nome,
    m.nome AS modulo_nome,
    count(fr.id) AS total_respostas,
    count(
        CASE
            WHEN (fr.eh_resposta_oficial = true) THEN 1
            ELSE NULL::integer
        END) AS respostas_oficiais,
    fp.visualizacoes,
    fp.created_at,
    fp.updated_at
   FROM (((forum_perguntas fp
     LEFT JOIN profiles p ON ((p.id = fp.aluno_id)))
     LEFT JOIN modulos m ON ((m.id = fp.modulo_id)))
     LEFT JOIN forum_respostas fr ON ((fr.pergunta_id = fp.id)))
  GROUP BY fp.id, fp.titulo, fp.categoria, fp.status, fp.nivel_urgencia, p.nome, m.nome, fp.visualizacoes, fp.created_at, fp.updated_at
  ORDER BY fp.updated_at DESC;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| vw_metodologias_stats                 |  SELECT me.id,
    me.nome,
    me.origem,
    me.descricao_resumo,
    me.faixa_etaria_ideal,
    me.principios_fundamentais,
    me.vantagens,
    me.aplicacao_brasileira,
    count(ma.id) AS materiais_relacionados,
    me.created_at
   FROM (metodologias_ensino me
     LEFT JOIN materiais_apoio ma ON ((ma.metodologia_relacionada_id = me.id)))
  WHERE (me.ativa = true)
  GROUP BY me.id, me.nome, me.origem, me.descricao_resumo, me.faixa_etaria_ideal, me.principios_fundamentais, me.vantagens, me.aplicacao_brasileira, me.created_at
  ORDER BY me.nome;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| vw_repertorio_stats                   |  SELECT rm.id,
    rm.titulo,
    rm.artista,
    rm.genero,
    rm.nivel,
    rm.instrumento_principal_id,
    i.nome AS instrumento_nome,
    rm.tags,
    rm.tempo_bpm,
    rm.tonalidade,
    rm.observacoes_professor,
    rm.created_at
   FROM (repertorio_musical rm
     LEFT JOIN instrumentos i ON ((i.id = rm.instrumento_principal_id)))
  WHERE (rm.ativo = true)
  ORDER BY rm.genero, rm.nivel, rm.titulo;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| vw_violin_ids                         |  SELECT instrumentos.id AS instrumento_id,
    instrumentos.nome
   FROM instrumentos
  WHERE ((lower((instrumentos.nome)::text) = 'violino'::text) OR (lower((instrumentos.nome)::text) = 'violin'::text) OR (lower((instrumentos.nome)::text) ~~ 'violino%'::text) OR (lower((instrumentos.nome)::text) ~~ 'violin%'::text));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| vw_violino_instrumento_sons           |  SELECT s.id,
    s.instrumento_id,
    s.nota_musical,
    s.tecnica,
    s.dinamica,
    s.arquivo_audio,
    s.waveform_data,
    s.bpm,
    s.tonalidade,
    s.artista_performer,
    s.created_at
   FROM instrumento_sons s
  WHERE (s.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| vw_violino_instrumento_sons_variacoes |  SELECT v.id,
    v.som_id,
    v.arquivo_audio,
    v.artista_performer,
    v.qualidade_gravacao,
    v.instrumento_usado,
    v.local_gravacao,
    v.ano_gravacao,
    v.duracao_segundos,
    v.created_at
   FROM (instrumento_sons_variacoes v
     JOIN instrumento_sons s ON ((s.id = v.som_id)))
  WHERE (s.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| vw_violino_instrumentos               |  SELECT i.id,
    i.nome,
    i.categoria,
    i.descricao,
    i.imagem_url,
    i.ativo,
    i.ordem_exibicao,
    i.criado_em,
    i.historia,
    i.origem,
    i.familia_instrumental,
    i.material_principal,
    i.tecnica_producao_som,
    i.dificuldade_aprendizado,
    i.anatomia_partes,
    i.curiosidades
   FROM (instrumentos i
     JOIN vw_violin_ids v ON ((v.instrumento_id = i.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| vw_violino_instrumentos_relacionados  |  SELECT r.id,
    r.instrumento_id,
    r.relacionado_id,
    r.tipo_relacao,
    r.descricao_relacao,
    r.similaridade_score,
    r.created_at,
    i.nome AS instrumento_nome,
    rel.nome AS relacionado_nome
   FROM ((instrumentos_relacionados r
     LEFT JOIN instrumentos i ON ((i.id = r.instrumento_id)))
     LEFT JOIN instrumentos rel ON ((rel.id = r.relacionado_id)))
  WHERE ((r.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids)) OR (r.relacionado_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| vw_violino_palestra                   |  WITH base AS (
         SELECT vw_violino_instrumentos.id,
            vw_violino_instrumentos.nome,
            vw_violino_instrumentos.categoria,
            vw_violino_instrumentos.descricao,
            vw_violino_instrumentos.imagem_url,
            vw_violino_instrumentos.ativo,
            vw_violino_instrumentos.ordem_exibicao,
            vw_violino_instrumentos.criado_em,
            vw_violino_instrumentos.historia,
            vw_violino_instrumentos.origem,
            vw_violino_instrumentos.familia_instrumental,
            vw_violino_instrumentos.material_principal,
            vw_violino_instrumentos.tecnica_producao_som,
            vw_violino_instrumentos.dificuldade_aprendizado,
            vw_violino_instrumentos.anatomia_partes,
            vw_violino_instrumentos.curiosidades
           FROM vw_violino_instrumentos
        )
 SELECT b.id AS instrumento_id,
    b.nome AS instrumento,
    b.descricao AS o_que_e,
    b.familia_instrumental AS familia,
    b.origem,
    b.material_principal AS material,
    b.tecnica_producao_som AS como_produz_som,
    b.dificuldade_aprendizado AS dificuldade,
        CASE
            WHEN ((pg_typeof(b.anatomia_partes))::text = ANY (ARRAY['json'::text, 'jsonb'::text])) THEN b.anatomia_partes
            ELSE NULL::jsonb
        END AS anatomia_partes,
    b.imagem_url,
    b.categoria,
    b.ativo,
    b.ordem_exibicao,
    b.criado_em,
    b.historia,
        CASE
            WHEN ((pg_typeof(b.curiosidades))::text = 'text[]'::text) THEN to_jsonb(b.curiosidades)
            ELSE
            CASE
                WHEN (jsonb_typeof(b.curiosidades) = 'array'::text) THEN b.curiosidades
                ELSE jsonb_build_array(b.curiosidades)
            END
        END AS curiosidades,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('arquivo_audio', s.arquivo_audio, 'artista', s.artista_performer, 'bpm', s.bpm, 'nota', s.nota_musical, 'tonalidade', s.tonalidade, 'tecnica', s.tecnica, 'dinamica', s.dinamica, 'created_at', s.created_at) ORDER BY s.created_at) AS jsonb_agg
           FROM instrumento_sons s
          WHERE (s.instrumento_id = b.id)), '[]'::jsonb) AS sons_exemplos,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('arquivo_audio', v.arquivo_audio, 'artista', v.artista_performer, 'ano_gravacao', v.ano_gravacao, 'local_gravacao', v.local_gravacao, 'duracao_segundos', v.duracao_segundos, 'instrumento_usado', v.instrumento_usado, 'qualidade_gravacao', v.qualidade_gravacao, 'created_at', v.created_at) ORDER BY v.created_at) AS jsonb_agg
           FROM (instrumento_sons_variacoes v
             JOIN instrumento_sons s ON ((s.id = v.som_id)))
          WHERE (s.instrumento_id = b.id)), '[]'::jsonb) AS sons_variacoes,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('relacionado_id', r.relacionado_id, 'relacionado_nome', rel.nome, 'tipo_relacao', r.tipo_relacao, 'descricao', r.descricao_relacao, 'similaridade', r.similaridade_score, 'created_at', r.created_at) ORDER BY r.created_at) AS jsonb_agg
           FROM (instrumentos_relacionados r
             LEFT JOIN instrumentos rel ON ((rel.id = r.relacionado_id)))
          WHERE (r.instrumento_id = b.id)), '[]'::jsonb) AS relacionados
   FROM base b; |

-- ===================================================================
-- ⚙️ 6. FUNCTIONS E TRIGGERS
-- ===================================================================

-- 6.1 Functions/Procedures
SELECT 
    routine_name,
    routine_type,
    data_type as return_type,
    routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;

| routine_name                   | routine_type | return_type  | routine_definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------ | ------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add_user_points                | FUNCTION     | boolean      | 
BEGIN
  UPDATE profiles 
  SET total_points = COALESCE(total_points, 0) + points,
      last_active = NOW()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| atualizar_status_aula          | FUNCTION     | trigger      | 
BEGIN
  IF (
    SELECT COUNT(*) = COUNT(*) FILTER (WHERE feito)
    FROM aula_checklist
    WHERE aula_id = NEW.aula_id AND tipo = 'pre'
  )
  THEN
    UPDATE aulas SET status = 'Em Preparação' WHERE id = NEW.aula_id;
  END IF;
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| award_points                   | FUNCTION     | jsonb        | 
BEGIN
  -- Insert points log
  INSERT INTO user_points_log (
    user_id, action, points_earned, source_type, source_id, notes
  ) VALUES (
    p_user_id, p_action, p_points, p_source_type, p_source_id, p_notes
  );
  
  -- Update total points
  UPDATE profiles 
  SET total_points = COALESCE(total_points, 0) + p_points
  WHERE id = p_user_id;
  
  -- Create notification
  INSERT INTO user_notifications (user_id, title, message, type, metadata)
  VALUES (
    p_user_id,
    '🏆 Pontos Ganhos!',
    'Você ganhou ' || p_points || ' pontos por: ' || p_action,
    'achievement',
    jsonb_build_object('points', p_points, 'action', p_action)
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'points_awarded', p_points,
    'new_total', (SELECT total_points FROM profiles WHERE id = p_user_id)
  );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| calculate_user_achievements    | FUNCTION     | jsonb        | 
DECLARE
  achievements_earned jsonb := '[]'::jsonb;
  achievement record;
  user_stats record;
BEGIN
  -- Get current user statistics
  SELECT 
    (SELECT COUNT(*) FROM presencas p 
     WHERE p.aluno_id = user_uuid 
     AND p.presente = true
     AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'presencas' AND column_name = 'aluno_id')
    ) as total_attendance,
    COALESCE(pr.total_points, 0) as total_points,
    COALESCE(pr.current_streak, 0) as current_streak,
    COALESCE(pr.lessons_completed, 0) as lessons_completed,
    COALESCE(pr.modules_completed, 0) as modules_completed
  INTO user_stats
  FROM profiles pr
  WHERE pr.id = user_uuid;
  
  -- Only process if achievements table exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'achievements') THEN
    -- Check all achievements
    FOR achievement IN 
      SELECT * FROM achievements WHERE is_active = true
    LOOP
      DECLARE
        should_award boolean := false;
        current_progress integer := 0;
        target_progress integer;
      BEGIN
        -- Parse criteria safely
        target_progress := 1; -- default
        
        -- Try to get target from criteria
        IF achievement.criteria IS NOT NULL THEN
          BEGIN
            target_progress := COALESCE((achievement.criteria->>'target')::integer, 1);
          EXCEPTION WHEN OTHERS THEN
            target_progress := 1;
          END;
        END IF;
        
        -- Check achievement criteria based on type
        CASE COALESCE(achievement.criteria->>'type', achievement.tipo, 'points_total')
          WHEN 'attendance_count' THEN
            current_progress := COALESCE(user_stats.total_attendance, 0);
            should_award := current_progress >= target_progress;
            
          WHEN 'points_total' THEN
            current_progress := user_stats.total_points;
            should_award := user_stats.total_points >= target_progress;
            
          WHEN 'streak_days' THEN
            current_progress := user_stats.current_streak;
            should_award := user_stats.current_streak >= target_progress;
            
          WHEN 'lessons_completed' THEN
            current_progress := user_stats.lessons_completed;
            should_award := user_stats.lessons_completed >= target_progress;
            
          WHEN 'modules_completed' THEN
            current_progress := user_stats.modules_completed;
            should_award := user_stats.modules_completed >= target_progress;
            
          ELSE
            -- Default to points
            current_progress := user_stats.total_points;
            should_award := user_stats.total_points >= target_progress;
        END CASE;
        
        -- Update or create achievement progress
        INSERT INTO achievements_progress (
          user_id, achievement_id, current_progress, target_progress, 
          is_completed, completed_at
        ) VALUES (
          user_uuid, achievement.id, current_progress, target_progress,
          should_award, CASE WHEN should_award THEN now() ELSE NULL END
        )
        ON CONFLICT (user_id, achievement_id) DO UPDATE SET
          current_progress = EXCLUDED.current_progress,
          is_completed = EXCLUDED.is_completed,
          completed_at = CASE 
            WHEN EXCLUDED.is_completed AND NOT achievements_progress.is_completed 
            THEN now() 
            ELSE achievements_progress.completed_at 
          END,
          updated_at = now();
        
        -- If newly earned, add to results
        IF should_award AND NOT EXISTS (
          SELECT 1 FROM user_achievements 
          WHERE user_id = user_uuid AND achievement_id = achievement.id
        ) THEN
          -- Award achievement
          INSERT INTO user_achievements (user_id, achievement_id, points_earned)
          VALUES (user_uuid, achievement.id, COALESCE(achievement.points_reward, 0));
          
          -- Add to return array
          achievements_earned := achievements_earned || jsonb_build_object(
            'id', achievement.id,
            'name', achievement.name,
            'description', achievement.description,
            'points_reward', COALESCE(achievement.points_reward, 0),
            'earned_at', now()
          );
          
          -- Award points if applicable
          IF COALESCE(achievement.points_reward, 0) > 0 THEN
            PERFORM award_points(
              user_uuid,
              achievement.points_reward,
              'achievement_earned',
              'achievement',
              achievement.id,
              'Conquista: ' || achievement.name
            );
          END IF;
        END IF;
      END;
    END LOOP;
  END IF;
  
  RETURN jsonb_build_object(
    'user_id', user_uuid,
    'achievements_earned', achievements_earned,
    'total_earned', jsonb_array_length(achievements_earned),
    'calculated_at', now()
  );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| check_achievements_trigger     | FUNCTION     | trigger      | 
BEGIN
  -- Notify async process to calculate achievements
  PERFORM pg_notify('calculate_achievements', NEW.user_id::text);
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| check_and_grant_achievements   | FUNCTION     | integer      | DECLARE
  achievement_record RECORD;
  user_stats RECORD;
  granted_count INTEGER := 0;
  user_progress_count INTEGER;
BEGIN
  -- Obter estatísticas atuais do usuário
  SELECT 
    COALESCE(p.lessons_completed, 0) as lessons_completed,
    COALESCE(p.modules_completed, 0) as modules_completed,
    COALESCE(p.current_streak, 0) as current_streak,
    COALESCE(p.total_points, 0) as total_points
  INTO user_stats
  FROM profiles p 
  WHERE p.id = target_user_id;
  
  -- Se não encontrou o perfil, retornar 0
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  -- Verificar cada conquista ativa
  FOR achievement_record IN 
    SELECT * FROM achievements WHERE is_active = true
  LOOP
    -- Verificar se usuário já tem esta conquista
    IF NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = target_user_id 
      AND achievement_id = achievement_record.id
    ) THEN
      -- Verificar se usuário atende aos requisitos
      CASE achievement_record.requirement_type
        WHEN 'lessons_completed' THEN
          IF user_stats.lessons_completed >= achievement_record.requirement_value THEN
            INSERT INTO user_achievements (user_id, achievement_id, points_earned)
            VALUES (target_user_id, achievement_record.id, achievement_record.points_reward);
            granted_count := granted_count + 1;
          END IF;
          
        WHEN 'modules_completed' THEN
          IF user_stats.modules_completed >= achievement_record.requirement_value THEN
            INSERT INTO user_achievements (user_id, achievement_id, points_earned)
            VALUES (target_user_id, achievement_record.id, achievement_record.points_reward);
            granted_count := granted_count + 1;
          END IF;
          
        WHEN 'days_streak' THEN
          IF user_stats.current_streak >= achievement_record.requirement_value THEN
            INSERT INTO user_achievements (user_id, achievement_id, points_earned)
            VALUES (target_user_id, achievement_record.id, achievement_record.points_reward);
            granted_count := granted_count + 1;
          END IF;
          
        WHEN 'total_points' THEN
          IF user_stats.total_points >= achievement_record.requirement_value THEN
            INSERT INTO user_achievements (user_id, achievement_id, points_earned)
            VALUES (target_user_id, achievement_record.id, achievement_record.points_reward);
            granted_count := granted_count + 1;
          END IF;
          
        -- Outras verificações podem ser adicionadas aqui
      END CASE;
    END IF;
  END LOOP;
  
  RETURN granted_count;
END;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| cleanup_expired_data           | FUNCTION     | void         | 
BEGIN
  -- Cleanup expired cache
  DELETE FROM hook_cache WHERE expires_at < now();
  
  -- Cleanup expired QR codes
  UPDATE qr_codes 
  SET is_active = false 
  WHERE expires_at < now() AND is_active = true;
  
  -- Cleanup old notifications (older than 30 days)
  DELETE FROM user_notifications 
  WHERE created_at < now() - interval '30 days' AND is_read = true;
  
  -- Log cleanup
  INSERT INTO audit_activities (user_id, action, resource, details)
  VALUES (
    NULL, 
    'system_cleanup', 
    'maintenance',
    jsonb_build_object(
      'cleanup_time', now(),
      'type', 'automated'
    )
  );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| column_exists                  | FUNCTION     | boolean      | 
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = $1 AND column_name = $2
  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| create_user_with_profile       | FUNCTION     | json         | 
DECLARE
    new_user_id uuid;
    created_profile record;
    result_json json;
BEGIN
    -- Validações básicas
    IF user_email IS NULL OR user_email = '' THEN
        RAISE EXCEPTION 'Email é obrigatório';
    END IF;
    
    IF user_password IS NULL OR LENGTH(user_password) < 6 THEN
        RAISE EXCEPTION 'Senha deve ter pelo menos 6 caracteres';
    END IF;
    
    IF user_full_name IS NULL OR LENGTH(TRIM(user_full_name)) < 2 THEN
        RAISE EXCEPTION 'Nome completo é obrigatório (mínimo 2 caracteres)';
    END IF;
    
    IF user_dob IS NULL THEN
        RAISE EXCEPTION 'Data de nascimento é obrigatória';
    END IF;
    
    IF user_instrument IS NULL OR user_instrument = '' THEN
        RAISE EXCEPTION 'Instrumento é obrigatório';
    END IF;
    
    -- Normalizar tipo de usuário
    IF user_tipo_usuario NOT IN ('aluno', 'professor', 'admin', 'pastor') THEN
        user_tipo_usuario := 'aluno';
    END IF;
    
    -- Verificar se email já existe
    IF EXISTS (SELECT 1 FROM public.profiles WHERE email = user_email) THEN
        RAISE EXCEPTION 'Este email já está cadastrado';
    END IF;
    
    -- Gerar ID único
    new_user_id := gen_random_uuid();
    
    -- APENAS CRIAR PERFIL (não mexer com auth.users por causa do RLS)
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        nome,
        dob,
        instrument,
        tipo_usuario,
        user_level,
        total_points,
        current_streak,
        best_streak,
        lessons_completed,
        modules_completed,
        theme_preference,
        notification_enabled,
        sound_enabled,
        has_voted,
        joined_at,
        last_active
    ) VALUES (
        new_user_id,
        user_email,
        TRIM(user_full_name),
        TRIM(user_full_name),
        user_dob,
        user_instrument,
        user_tipo_usuario,
        'beginner',
        0, 0, 0, 0, 0,
        'light',
        true,
        true,
        false,
        NOW(),
        NOW()
    )
    RETURNING * INTO created_profile;
    
    -- Resultado de sucesso (só perfil, auth.users será criado pelo Supabase)
    result_json := json_build_object(
        'success', true,
        'user_id', new_user_id,
        'email', user_email,
        'profile', row_to_json(created_profile),
        'message', 'Perfil criado com sucesso - usar Supabase Auth para criar usuário'
    );
    
    RETURN result_json;
    
EXCEPTION WHEN OTHERS THEN
    -- Em caso de erro, limpar dados parciais
    BEGIN
        DELETE FROM public.profiles WHERE email = user_email;
    EXCEPTION WHEN OTHERS THEN
        -- Ignorar erros de limpeza
    END;
    
    -- Retornar erro
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM,
        'sqlstate', SQLSTATE
    );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| detect_user_role               | FUNCTION     | jsonb        | 
DECLARE
  result jsonb;
BEGIN
  -- Tenta encontrar o papel de maior prioridade do usuário ativo
  SELECT jsonb_build_object(
      'role', rd.role,
      'level', rd.level,
      -- AQUI ESTÁ A MUDANÇA: Busca as permissões dinamicamente das novas tabelas
      'permissions', COALESCE(
          (SELECT array_agg(p.name) 
           FROM public.roles r
           JOIN public.role_permissions rp ON r.id = rp.role_id
           JOIN public.permissions p ON rp.permission_id = p.id
           WHERE r.name = rd.role), 
          '{}'::text[] -- Retorna um array vazio se não houver permissões
      ),
      'data', rd.data
  ) INTO result
  FROM (
      -- A lógica de hierarquia para encontrar o papel permanece a mesma
      SELECT 'admin'::text AS role, 4 AS level, to_jsonb(a.*) AS data FROM public.admins a WHERE a.id = user_uuid AND a.ativo = true
      UNION ALL
      SELECT 'professor'::text AS role, 2 AS level, to_jsonb(p.*) AS data FROM public.professores p WHERE p.id = user_uuid AND p.ativo = true
      UNION ALL
      SELECT 'aluno'::text AS role, 1 AS level, to_jsonb(al.*) AS data FROM public.alunos al WHERE al.id = user_uuid AND al.ativo = true
      ORDER BY level DESC
      LIMIT 1
  ) AS rd;

  -- Se não encontrar nenhum papel ativo, retorna um objeto nulo
  IF result IS NULL THEN
    RETURN jsonb_build_object('role', null, 'permissions', '{}'::text[]);
  END IF;

  RETURN result;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| emergency_signup               | FUNCTION     | json         | 
DECLARE
    new_user_id uuid;
    result_json json;
    hashed_password text;
BEGIN
    -- Gerar ID único
    new_user_id := gen_random_uuid();
    
    -- Validar dados de entrada
    IF user_email IS NULL OR user_email = '' THEN
        RAISE EXCEPTION 'Email é obrigatório';
    END IF;
    
    IF user_password IS NULL OR LENGTH(user_password) < 6 THEN
        RAISE EXCEPTION 'Senha deve ter pelo menos 6 caracteres';
    END IF;
    
    IF user_full_name IS NULL OR LENGTH(user_full_name) < 2 THEN
        RAISE EXCEPTION 'Nome completo é obrigatório';
    END IF;
    
    IF user_tipo_usuario NOT IN ('aluno', 'professor', 'admin', 'pastor') THEN
        user_tipo_usuario := 'aluno';
    END IF;
    
    -- Verificar se email já existe
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
        RAISE EXCEPTION 'Este email já está cadastrado';
    END IF;
    
    IF EXISTS (SELECT 1 FROM public.profiles WHERE email = user_email) THEN
        RAISE EXCEPTION 'Este email já está cadastrado no sistema';
    END IF;
    
    -- Hash da senha (método simplificado)
    hashed_password := crypt(user_password, gen_salt('bf'));
    
    -- Inserir na auth.users (SEM trigger)
    BEGIN
        -- Desabilitar trigger temporariamente para esta sessão
        SET session_replication_role = replica;
        
        INSERT INTO auth.users (
            id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_user_meta_data,
            created_at,
            updated_at,
            instance_id,
            aud,
            role
        ) VALUES (
            new_user_id,
            user_email,
            hashed_password,
            NOW(), -- Confirmar email automaticamente para emergência
            json_build_object(
                'full_name', user_full_name,
                'dob', user_dob::text,
                'instrument', user_instrument,
                'tipo_usuario', user_tipo_usuario
            )::jsonb,
            NOW(),
            NOW(),
            '00000000-0000-0000-0000-000000000000',
            'authenticated',
            'authenticated'
        );
        
        -- Reabilitar triggers
        SET session_replication_role = DEFAULT;
        
    EXCEPTION WHEN OTHERS THEN
        -- Reabilitar triggers em caso de erro
        SET session_replication_role = DEFAULT;
        RAISE EXCEPTION 'Erro ao criar usuário na tabela auth: %', SQLERRM;
    END;
    
    -- Inserir perfil diretamente
    BEGIN
        INSERT INTO public.profiles (
            id,
            email,
            full_name,
            nome,
            dob,
            instrument,
            tipo_usuario,
            user_level,
            total_points,
            current_streak,
            best_streak,
            lessons_completed,
            modules_completed,
            theme_preference,
            notification_enabled,
            sound_enabled,
            has_voted,
            joined_at,
            last_active
        ) VALUES (
            new_user_id,
            user_email,
            user_full_name,
            user_full_name,
            user_dob,
            user_instrument,
            user_tipo_usuario,
            'beginner',
            0, 0, 0, 0, 0,
            'light',
            true,
            true,
            false,
            NOW(),
            NOW()
        );
        
    EXCEPTION WHEN OTHERS THEN
        -- Se falhar, limpar usuário órfão
        DELETE FROM auth.users WHERE id = new_user_id;
        RAISE EXCEPTION 'Erro ao criar perfil: %', SQLERRM;
    END;
    
    -- Retornar resultado de sucesso
    result_json := json_build_object(
        'success', true,
        'user_id', new_user_id,
        'email', user_email,
        'message', 'Usuário criado com sucesso via RPC de emergência'
    );
    
    RETURN result_json;
    
EXCEPTION WHEN OTHERS THEN
    -- Log do erro
    RAISE LOG 'Erro na emergency_signup: %', SQLERRM;
    
    -- Retornar erro
    result_json := json_build_object(
        'success', false,
        'error', SQLERRM
    );
    
    RETURN result_json;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| find_professor_relation_column | FUNCTION     | text         | 
DECLARE
  relation_column text := NULL;
BEGIN
  -- Verificar se a tabela existe
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'professores_conteudos') THEN
    RETURN NULL;
  END IF;
  
  -- Procurar possíveis colunas de relacionamento
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professores_conteudos' AND column_name = 'professor_id') THEN
    relation_column := 'professor_id';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professores_conteudos' AND column_name = 'id_professor') THEN
    relation_column := 'id_professor';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professores_conteudos' AND column_name = 'user_id') THEN
    relation_column := 'user_id';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professores_conteudos' AND column_name = 'created_by') THEN
    relation_column := 'created_by';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professores_conteudos' AND column_name = 'autor_id') THEN
    relation_column := 'autor_id';
  END IF;
  
  RETURN relation_column;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| generate_qr_code               | FUNCTION     | jsonb        | 
DECLARE
  qr_code text;
  qr_id uuid;
BEGIN
  -- Verify permissions
  IF NOT has_permission(p_user_id, 'qr.generate') THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Sem permissão para gerar QR Codes'
    );
  END IF;
  
  -- Generate unique code
  qr_code := 'nipo_' || p_type || '_' || 
             COALESCE(p_aula_id::text, 'event') || '_' || 
             extract(epoch from now())::bigint || '_' || 
             substr(md5(random()::text), 1, 8);
  
  -- Insert QR code
  INSERT INTO qr_codes (
    code, type, created_by, aula_id, expires_at, max_scans
  ) VALUES (
    qr_code,
    p_type,
    p_user_id,
    p_aula_id,
    now() + (p_expiration_minutes || ' minutes')::interval,
    p_max_scans
  ) RETURNING id INTO qr_id;
  
  -- Log activity
  PERFORM log_activity(
    p_user_id,
    'qr_generate',
    'qr_codes',
    jsonb_build_object(
      'qr_id', qr_id,
      'type', p_type,
      'aula_id', p_aula_id,
      'expires_in_minutes', p_expiration_minutes
    ),
    'generateQRCode'
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'qr_id', qr_id,
    'qr_code', qr_code,
    'expires_at', now() + (p_expiration_minutes || ' minutes')::interval
  );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| gerar_qr_aula                  | FUNCTION     | text         | 
DECLARE
    qr_code TEXT;
    aula_id UUID;
BEGIN
    -- Buscar ID da aula pelo número
    SELECT id INTO aula_id FROM aulas WHERE numero = aula_numero;
    
    IF aula_id IS NULL THEN
        RAISE EXCEPTION 'Aula número % não encontrada', aula_numero;
    END IF;
    
    -- Gerar código único simples
    qr_code := 'NIPO_AULA_' || aula_numero || '_' || EXTRACT(EPOCH FROM NOW())::bigint;
    
    -- Salvar no detalhes_aula
    UPDATE aulas 
    SET detalhes_aula = COALESCE(detalhes_aula, '{}'::jsonb) || 
                       jsonb_build_object(
                           'qr_code', qr_code, 
                           'qr_gerado_em', NOW()::text,
                           'qr_ativo', true
                       )
    WHERE numero = aula_numero;
    
    RETURN qr_code;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| get_alunos_by_instrumento      | FUNCTION     | record       | 
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    pr.full_name::VARCHAR,
    pr.email::VARCHAR,
    a.nivel::VARCHAR,
    a.data_ingresso
  FROM alunos a
  JOIN profiles pr ON a.id = pr.id
  JOIN instrumentos i ON a.instrumento_id = i.id
  WHERE LOWER(i.nome) = LOWER(instrumento_nome)
    AND a.ativo = true;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| get_estatisticas_autor         | FUNCTION     | json         | 
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total', COUNT(*),
    'visiveis', COUNT(*) FILTER (WHERE visivel = true),
    'ocultos', COUNT(*) FILTER (WHERE visivel = false),
    'destaques', COUNT(*) FILTER (WHERE destaque = true),
    'visualizacoes', COALESCE(SUM(visualizacoes), 0),
    'downloads', COALESCE(SUM(downloads), 0),
    'por_tipo', json_build_object(
      'sacada', COUNT(*) FILTER (WHERE tipo = 'sacada'),
      'video', COUNT(*) FILTER (WHERE tipo = 'video'),
      'devocional', COUNT(*) FILTER (WHERE tipo = 'devocional'),
      'material', COUNT(*) FILTER (WHERE tipo = 'material')
    )
  ) INTO result
  FROM professores_conteudos
  WHERE criado_por = autor_id;
  
  RETURN result;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| get_estatisticas_gerais        | FUNCTION     | json         | 
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total', COUNT(*),
    'visiveis', COUNT(*) FILTER (WHERE visivel = true),
    'ocultos', COUNT(*) FILTER (WHERE visivel = false),
    'destaques', COUNT(*) FILTER (WHERE destaque = true),
    'visualizacoes', COALESCE(SUM(visualizacoes), 0),
    'downloads', COALESCE(SUM(downloads), 0),
    'por_tipo', json_build_object(
      'sacada', COUNT(*) FILTER (WHERE tipo = 'sacada'),
      'video', COUNT(*) FILTER (WHERE tipo = 'video'),
      'devocional', COUNT(*) FILTER (WHERE tipo = 'devocional'),
      'material', COUNT(*) FILTER (WHERE tipo = 'material')
    )
  ) INTO result
  FROM professores_conteudos;
  
  RETURN result;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| get_lessons_by_module          | FUNCTION     | USER-DEFINED | 
BEGIN
  RETURN QUERY
  SELECT l.* FROM lessons l
  JOIN modules m ON m.id = l.module_id
  WHERE l.module_id = module_uuid
    AND m.is_active = true
  ORDER BY l.order_index, l.created_at;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| get_modules_by_instrument      | FUNCTION     | USER-DEFINED | 
BEGIN
  RETURN QUERY
  SELECT * FROM modules
  WHERE is_active = true
    AND (instrument_category = instrument OR instrument_category = 'all')
  ORDER BY order_index, created_at;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| get_modules_by_level           | FUNCTION     | USER-DEFINED | 
BEGIN
  RETURN QUERY
  SELECT * FROM modules
  WHERE is_active = true
    AND (
      level_required = user_level OR
      (user_level = 'intermediate' AND level_required = 'beginner') OR
      (user_level = 'advanced' AND level_required IN ('beginner', 'intermediate'))
    )
  ORDER BY order_index, created_at;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| get_modules_stats              | FUNCTION     | json         | 
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_modules', COUNT(*),
    'active_modules', COUNT(*) FILTER (WHERE is_active = true),
    'premium_modules', COUNT(*) FILTER (WHERE is_premium = true),
    'by_instrument', json_object_agg(
      instrument_category, 
      COUNT(*) FILTER (WHERE is_active = true)
    ),
    'by_level', json_object_agg(
      level_required,
      COUNT(*) FILTER (WHERE is_active = true)
    )
  ) INTO stats
  FROM modules;
  
  RETURN COALESCE(stats, '{}');
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| get_professores_by_instrumento | FUNCTION     | record       | 
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    pr.full_name::VARCHAR,
    pr.email::VARCHAR,
    pi.nivel_ensino::VARCHAR,
    pi.anos_experiencia
  FROM professor_instrumentos pi
  JOIN professores p ON pi.professor_id = p.id
  JOIN profiles pr ON p.id = pr.id
  JOIN instrumentos i ON pi.instrumento_id = i.id
  WHERE LOWER(i.nome) = LOWER(instrumento_nome)
    AND pi.ativo = true
    AND p.ativo = true;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| get_user_profile               | FUNCTION     | json         | 
DECLARE
    user_profile record;
    result_json json;
BEGIN
    SELECT * INTO user_profile
    FROM public.profiles
    WHERE id = user_id;
    
    IF user_profile IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Perfil não encontrado'
        );
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'profile', row_to_json(user_profile)
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| get_user_stats                 | FUNCTION     | jsonb        | 
  SELECT jsonb_build_object(
      'total_points', p.total_points,
      'current_streak', p.current_streak,
      'best_streak', p.best_streak,
      'lessons_completed', p.lessons_completed,
      'modules_completed', p.modules_completed,
      'user_level', p.user_level,
      
      -- Contagem de conquistas
      'achievements_count', (
          SELECT COUNT(*) 
          FROM public.user_achievements ua 
          WHERE ua.user_id = p_user_id
      ),
      
      -- Posição no ranking
      'rank_position', (
          SELECT "rank"
          FROM (
              SELECT 
                  id, 
                  RANK() OVER (ORDER BY total_points DESC) as "rank"
              FROM public.profiles
          ) as ranking
          WHERE ranking.id = p_user_id
      )
  )
  FROM public.profiles p
  WHERE p.id = p_user_id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| get_vagas_disponiveis          | FUNCTION     | integer      | 
DECLARE
  max_alunos INTEGER;
  matriculados INTEGER;
BEGIN
  SELECT t.max_alunos INTO max_alunos
  FROM turmas t
  WHERE t.id = turma_uuid;
  
  SELECT COUNT(*) INTO matriculados
  FROM matriculas m
  WHERE m.turma_id = turma_uuid
    AND m.status IN ('ativa', 'pendente');
  
  RETURN GREATEST(0, COALESCE(max_alunos, 0) - COALESCE(matriculados, 0));
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| handle_new_user_signup         | FUNCTION     | uuid         | 
DECLARE
    new_user_id uuid;
    user_type text;
BEGIN
    -- 1. Extract user type from metadata, default to 'aluno'
    user_type := p_metadata->>'tipo_usuario';
    IF user_type IS NULL OR user_type NOT IN ('aluno', 'professor', 'admin') THEN
        user_type := 'aluno';
    END IF;

    -- 2. Create the user in the auth.users table
    -- This will automatically handle password hashing.
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token_encrypted)
    VALUES (
        '00000000-0000-0000-0000-000000000000', -- Default instance ID
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        p_email,
        crypt(p_password, gen_salt('bf')),
        now(),
        '',
        NULL,
        NULL,
        jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
        p_metadata,
        now(),
        now(),
        '',
        '',
        '',
        ''
    ) RETURNING id INTO new_user_id;

    -- 3. Create the corresponding public profile
    INSERT INTO public.profiles (id, full_name, email, dob, instrument, tipo_usuario, user_level)
    VALUES (
        new_user_id,
        p_metadata->>'full_name',
        p_email,
        (p_metadata->>'dob')::date,
        p_metadata->>'instrument',
        user_type,
        'beginner'
    );
    
    -- 4. Insert into the specific role table
    IF user_type = 'aluno' THEN
        INSERT INTO public.alunos (id, nome) VALUES (new_user_id, p_metadata->>'full_name');
    ELSIF user_type = 'professor' THEN
        INSERT INTO public.professores (id, nome) VALUES (new_user_id, p_metadata->>'full_name');
    ELSIF user_type = 'admin' THEN
        INSERT INTO public.admins (id, nome) VALUES (new_user_id, p_metadata->>'full_name');
    END IF;

    -- 5. Return the new user's ID
    RETURN new_user_id;

EXCEPTION 
    WHEN OTHERS THEN
        -- If any error occurs, re-raise the exception to ensure the transaction is rolled back.
        RAISE;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| has_permission                 | FUNCTION     | boolean      | 
DECLARE
  user_role jsonb;
  user_permissions text[];
BEGIN
  -- Get user role (from cache if available)
  SELECT detect_user_role(user_uuid) INTO user_role;
  
  IF user_role IS NULL OR user_role = '{}'::jsonb THEN
    RETURN false;
  END IF;
  
  -- Extract permissions array
  SELECT ARRAY(SELECT jsonb_array_elements_text(user_role->'permissions'))
  INTO user_permissions;
  
  -- Check for wildcard or specific permission
  RETURN '*' = ANY(user_permissions) 
    OR permission = ANY(user_permissions)
    OR EXISTS (
      SELECT 1 FROM unnest(user_permissions) as p
      WHERE permission LIKE replace(p, '*', '%')
    );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| incrementar_download           | FUNCTION     | void         | 
BEGIN
  UPDATE professores_conteudos 
  SET 
    downloads = COALESCE(downloads, 0) + 1,
    atualizado_em = NOW()
  WHERE id = conteudo_id;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| incrementar_visualizacao       | FUNCTION     | void         | 
BEGIN
  UPDATE professores_conteudos 
  SET 
    visualizacoes = COALESCE(visualizacoes, 0) + 1,
    atualizado_em = NOW()
  WHERE id = conteudo_id;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| inserir_em_tabela_especifica   | FUNCTION     | trigger      | 
DECLARE
  instrumento_uuid UUID;
  error_msg TEXT;
  user_tipo TEXT;
  instrument_name TEXT;
BEGIN
  -- Log de início
  INSERT INTO trigger_logs (user_id, trigger_name, event_type, message)
  VALUES (NEW.id, 'inserir_em_tabela_especifica', 'START', 
          'Iniciando inserção para usuário: ' || COALESCE(NEW.full_name, 'sem nome'));

  -- Extrair dados com segurança
  user_tipo := TRIM(LOWER(COALESCE(NEW.tipo_usuario, '')));
  instrument_name := TRIM(COALESCE(NEW.instrument, ''));

  -- Validações básicas
  IF user_tipo = '' OR user_tipo IS NULL THEN
    INSERT INTO trigger_logs (user_id, trigger_name, event_type, message, error_details)
    VALUES (NEW.id, 'inserir_em_tabela_especifica', 'WARNING', 
            'Tipo de usuário não definido', 
            'NEW.tipo_usuario = ' || COALESCE(NEW.tipo_usuario, 'NULL'));
    RETURN NEW; -- Não falha, apenas avisa
  END IF;

  BEGIN
    -- ==================== PROCESSAMENTO PARA ALUNOS ====================
    IF user_tipo = 'aluno' THEN
      
      -- Buscar instrumento com tolerância a variações
      IF instrument_name != '' THEN
        SELECT id INTO instrumento_uuid 
        FROM instrumentos 
        WHERE LOWER(TRIM(nome)) = LOWER(instrument_name)
           OR LOWER(TRIM(nome)) = LOWER(REPLACE(instrument_name, 'sax', 'saxofone'))
           OR LOWER(TRIM(nome)) = LOWER(REPLACE(instrument_name, 'saxofone', 'sax'))
        LIMIT 1;
        
        -- Se instrumento não existe, criar automaticamente
        IF instrumento_uuid IS NULL THEN
          INSERT INTO instrumentos (nome, categoria, ativo) 
          VALUES (INITCAP(TRIM(instrument_name)), 'outros', true)
          RETURNING id INTO instrumento_uuid;
          
          -- Log da criação do instrumento
          INSERT INTO trigger_logs (user_id, trigger_name, event_type, message)
          VALUES (NEW.id, 'inserir_em_tabela_especifica', 'INFO', 
                  'Novo instrumento criado: ' || instrument_name);
        END IF;
      END IF;
      
      -- Inserir na tabela alunos com validações
      INSERT INTO alunos (
        id, 
        ativo, 
        instrumento_id, 
        nivel, 
        data_ingresso, 
        criado_em
      ) VALUES (
        NEW.id, 
        true,
        instrumento_uuid, -- Pode ser NULL se não tem instrumento
        COALESCE(NULLIF(TRIM(NEW.user_level), ''), 'beginner'),
        COALESCE(NEW.joined_at::date, CURRENT_DATE),
        COALESCE(NEW.joined_at, CURRENT_TIMESTAMP)
      );
      
      -- Log de sucesso
      INSERT INTO trigger_logs (user_id, trigger_name, event_type, message)
      VALUES (NEW.id, 'inserir_em_tabela_especifica', 'SUCCESS', 
              'Aluno inserido com sucesso. Instrumento: ' || COALESCE(instrument_name, 'nenhum'));
    
    -- ==================== PROCESSAMENTO PARA PROFESSORES ====================
    ELSIF user_tipo IN ('professor', 'pastor') THEN
      
      -- Inserir na tabela professores
      INSERT INTO professores (id, ativo, biografia, criado_em) 
      VALUES (
        NEW.id, 
        true,
        COALESCE(NEW.bio, ''), -- Biografia pode ser vazia
        COALESCE(NEW.joined_at, CURRENT_TIMESTAMP)
      );
      
      -- Processar instrumento do professor (se existe)
      IF instrument_name != '' THEN
        SELECT id INTO instrumento_uuid 
        FROM instrumentos 
        WHERE LOWER(TRIM(nome)) = LOWER(instrument_name)
        LIMIT 1;
        
        -- Criar instrumento se não existe
        IF instrumento_uuid IS NULL THEN
          INSERT INTO instrumentos (nome, categoria, ativo) 
          VALUES (INITCAP(TRIM(instrument_name)), 'outros', true)
          RETURNING id INTO instrumento_uuid;
        END IF;
        
        -- Criar relacionamento professor-instrumento
        INSERT INTO professor_instrumentos (professor_id, instrumento_id, nivel_ensino, anos_experiencia)
        VALUES (NEW.id, instrumento_uuid, 'todos', 0)
        ON CONFLICT (professor_id, instrumento_id) DO NOTHING;
      END IF;
      
      -- Log de sucesso
      INSERT INTO trigger_logs (user_id, trigger_name, event_type, message)
      VALUES (NEW.id, 'inserir_em_tabela_especifica', 'SUCCESS', 
              'Professor inserido com sucesso');
    
    -- ==================== PROCESSAMENTO PARA ADMINS ====================
    ELSIF user_tipo = 'admin' THEN
      
      INSERT INTO admins (id, ativo, nivel_acesso, criado_em, cargo) 
      VALUES (
        NEW.id, 
        true,
        'admin',
        COALESCE(NEW.joined_at, CURRENT_TIMESTAMP),
        'Administrador'
      );
      
      -- Log de sucesso
      INSERT INTO trigger_logs (user_id, trigger_name, event_type, message)
      VALUES (NEW.id, 'inserir_em_tabela_especifica', 'SUCCESS', 
              'Admin inserido com sucesso');
    
    -- ==================== TIPO NÃO RECONHECIDO ====================
    ELSE
      INSERT INTO trigger_logs (user_id, trigger_name, event_type, message, error_details)
      VALUES (NEW.id, 'inserir_em_tabela_especifica', 'WARNING', 
              'Tipo de usuário não reconhecido: ' || user_tipo,
              'Tipos válidos: aluno, professor, pastor, admin');
    END IF;
    
  EXCEPTION
    WHEN OTHERS THEN
      -- Capturar qualquer erro e registrar
      error_msg := SQLERRM;
      
      INSERT INTO trigger_logs (user_id, trigger_name, event_type, message, error_details)
      VALUES (NEW.id, 'inserir_em_tabela_especifica', 'ERROR', 
              'Erro ao processar usuário tipo: ' || user_tipo,
              'ERRO: ' || error_msg || ' | DADOS: full_name=' || COALESCE(NEW.full_name, 'NULL') || 
              ', instrument=' || COALESCE(NEW.instrument, 'NULL'));
      
      -- IMPORTANTE: Não falhar o trigger principal
      -- O usuário ainda será criado em profiles, apenas não na tabela específica
      RAISE WARNING 'Erro na function inserir_em_tabela_especifica para usuário %: %', NEW.id, error_msg;
  END;
  
  RETURN NEW;
END;
 |
| invalidate_cache               | FUNCTION     | integer      | 
DECLARE
  deleted_count integer;
BEGIN
  IF p_cache_key IS NOT NULL THEN
    DELETE FROM hook_cache WHERE cache_key = p_cache_key;
  ELSIF p_user_id IS NOT NULL AND p_hook_name IS NOT NULL THEN
    DELETE FROM hook_cache WHERE user_id = p_user_id AND hook_name = p_hook_name;
  ELSIF p_user_id IS NOT NULL THEN
    DELETE FROM hook_cache WHERE user_id = p_user_id;
  ELSE
    -- Clear all expired cache
    DELETE FROM hook_cache WHERE expires_at < now();
  END IF;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| invalidate_user_cache          | FUNCTION     | trigger      | 
BEGIN
  -- Delete user-specific cache entries
  DELETE FROM hook_cache 
  WHERE user_id = COALESCE(NEW.id, OLD.id);
  
  RETURN COALESCE(NEW, OLD);
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| is_admin                       | FUNCTION     | boolean      | 
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE id = user_id AND ativo = true
  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| log_activity                   | FUNCTION     | uuid         | 
DECLARE
  audit_id uuid;
BEGIN
  INSERT INTO audit_activities (
    user_id, action, resource, details, hook_name, component_name
  ) VALUES (
    p_user_id, p_action, p_resource, p_details, p_hook_name, p_component_name
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| normalizar_instrumento         | FUNCTION     | text         | 
BEGIN
  -- Normalizar diferentes variações para os nomes corretos
  CASE LOWER(TRIM(instrumento_input))
    WHEN 'saxofone' THEN RETURN 'Saxofone';
    WHEN 'sax' THEN RETURN 'Saxofone';
    WHEN 'trompete' THEN RETURN 'Trompete';
    WHEN 'flauta' THEN RETURN 'Flauta';
    WHEN 'violoncelo' THEN RETURN 'Violoncelo';
    WHEN 'cello' THEN RETURN 'Violoncelo';
    WHEN 'bateria' THEN RETURN 'Bateria';
    WHEN 'drums' THEN RETURN 'Bateria';
    WHEN 'violino' THEN RETURN 'Violino';
    WHEN 'piano' THEN RETURN 'Piano';
    WHEN 'guitarra' THEN RETURN 'Guitarra';
    WHEN 'guitar' THEN RETURN 'Guitarra';
    WHEN 'baixo' THEN RETURN 'Baixo';
    WHEN 'bass' THEN RETURN 'Baixo';
    WHEN 'teclado' THEN RETURN 'Teclado';
    WHEN 'keyboard' THEN RETURN 'Teclado';
    WHEN 'violao' THEN RETURN 'Violão';
    WHEN 'violão' THEN RETURN 'Violão';
    WHEN 'voz' THEN RETURN 'Canto / Voz';
    WHEN 'canto' THEN RETURN 'Canto / Voz';
    WHEN 'vocal' THEN RETURN 'Canto / Voz';
    WHEN 'clarinete' THEN RETURN 'Clarinete';
    WHEN 'trombone' THEN RETURN 'Trombone';
    WHEN 'outro' THEN RETURN 'Outro';
    WHEN 'outros' THEN RETURN 'Outro';
    ELSE RETURN INITCAP(instrumento_input);
  END CASE;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| normalize_tags                 | FUNCTION     | trigger      | 
BEGIN
  IF NEW.tags IS NOT NULL THEN
    NEW.tags := ARRAY(
      SELECT DISTINCT LOWER(TRIM(tag))
      FROM unnest(NEW.tags) AS tag
      WHERE TRIM(tag) != ''
    );
  END IF;
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| process_qr_scan                | FUNCTION     | jsonb        | 
DECLARE
  qr_record record;
  points_awarded integer := 0;
  attendance_inserted boolean := false;
BEGIN
  -- Find QR code
  SELECT * INTO qr_record FROM qr_codes WHERE code = qr_code_text;
  
  -- Validate QR code
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'result', 'invalid', 'message', 'QR Code não encontrado');
  END IF;
  
  IF NOT qr_record.is_active THEN
    RETURN jsonb_build_object('success', false, 'result', 'inactive', 'message', 'QR Code desativado');
  END IF;
  
  IF qr_record.expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'result', 'expired', 'message', 'QR Code expirado');
  END IF;
  
  -- Check if already scanned
  IF EXISTS (SELECT 1 FROM qr_scans WHERE qr_code_id = qr_record.id AND user_id = user_uuid AND result = 'success') THEN
    RETURN jsonb_build_object('success', false, 'result', 'already_used', 'message', 'Você já escaneou este QR Code');
  END IF;
  
  -- Process successful scan
  BEGIN
    CASE qr_record.type
      WHEN 'attendance' THEN
        points_awarded := 10;
        
        -- Tentar inserir presença de forma adaptativa
        IF qr_record.aula_id IS NOT NULL THEN
          -- Tentar diferentes estruturas de presença
          BEGIN
            IF column_exists('presencas', 'aula_id') AND column_exists('presencas', 'presente') THEN
              INSERT INTO presencas (aluno_id, aula_id, presente, created_at)
              VALUES (user_uuid, qr_record.aula_id, true, now())
              ON CONFLICT (aluno_id, aula_id) DO UPDATE SET presente = true, created_at = now();
              attendance_inserted := true;
            ELSIF column_exists('presencas', 'id_aula') AND column_exists('presencas', 'presente') THEN
              EXECUTE 'INSERT INTO presencas (aluno_id, id_aula, presente, created_at) VALUES ($1, $2, true, now()) ON CONFLICT (aluno_id, id_aula) DO UPDATE SET presente = true, created_at = now()'
              USING user_uuid, qr_record.aula_id;
              attendance_inserted := true;
            ELSIF column_exists('presencas', 'aula_id') THEN
              INSERT INTO presencas (aluno_id, aula_id, created_at)
              VALUES (user_uuid, qr_record.aula_id, now())
              ON CONFLICT (aluno_id, aula_id) DO UPDATE SET created_at = now();
              attendance_inserted := true;
            END IF;
          EXCEPTION WHEN OTHERS THEN
            -- Se falhar, continuar sem inserir presença
            attendance_inserted := false;
          END;
        END IF;
        
      WHEN 'content_unlock' THEN
        points_awarded := 5;
      WHEN 'special_event' THEN
        points_awarded := 20;
      ELSE
        points_awarded := 1;
    END CASE;
    
    -- Record scan
    INSERT INTO qr_scans (qr_code_id, user_id, result, points_awarded, ip_address, user_agent, location_data)
    VALUES (qr_record.id, user_uuid, 'success', points_awarded, 
            (scan_metadata->>'ip_address')::inet, scan_metadata->>'user_agent', scan_metadata->'location');
    
    -- Update QR code scan count
    UPDATE qr_codes SET current_scans = current_scans + 1 WHERE id = qr_record.id;
    
    -- Award points
    IF points_awarded > 0 THEN
      PERFORM award_points(user_uuid, points_awarded, 'qr_scan_' || qr_record.type, 'qr_code', qr_record.id, 'QR: ' || qr_record.type);
    END IF;
    
    -- Log activity
    PERFORM log_activity(user_uuid, 'qr_scan', 'qr_codes', 
      jsonb_build_object('qr_type', qr_record.type, 'points_awarded', points_awarded, 'attendance_inserted', attendance_inserted),
      'useQRCode', 'QRScanner');
    
    RETURN jsonb_build_object(
      'success', true, 'result', 'success', 'message', 'QR Code escaneado com sucesso!',
      'points_awarded', points_awarded, 'qr_type', qr_record.type, 'aula_id', qr_record.aula_id,
      'attendance_recorded', attendance_inserted
    );
    
  EXCEPTION WHEN OTHERS THEN
    INSERT INTO qr_scans (qr_code_id, user_id, result) VALUES (qr_record.id, user_uuid, 'error');
    RETURN jsonb_build_object('success', false, 'result', 'error', 'message', 'Erro: ' || SQLERRM);
  END;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| show_table_structure           | FUNCTION     | record       | 
  SELECT 
    c.column_name::text,
    c.data_type::text,
    c.is_nullable::text,
    c.column_default::text
  FROM information_schema.columns c
  WHERE c.table_name = table_name_param
  ORDER BY c.ordinal_position;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| simple_create_profile          | FUNCTION     | json         | 
DECLARE
    created_profile record;
    result_json json;
BEGIN
    -- Verificar se perfil já existe
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id) THEN
        RAISE EXCEPTION 'Perfil já existe para este usuário';
    END IF;
    
    -- Criar apenas o perfil (usuário já foi criado pelo Supabase)
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        nome,
        dob,
        instrument,
        tipo_usuario,
        user_level,
        total_points,
        current_streak,
        best_streak,
        lessons_completed,
        modules_completed,
        theme_preference,
        notification_enabled,
        sound_enabled,
        has_voted,
        joined_at,
        last_active
    ) VALUES (
        profile_id,
        user_email,
        TRIM(user_full_name),
        TRIM(user_full_name),
        user_dob,
        user_instrument,
        user_tipo_usuario,
        'beginner',
        0, 0, 0, 0, 0,
        'light',
        true,
        true,
        false,
        NOW(),
        NOW()
    )
    RETURNING * INTO created_profile;
    
    result_json := json_build_object(
        'success', true,
        'profile', row_to_json(created_profile),
        'message', 'Perfil criado com sucesso'
    );
    
    RETURN result_json;
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| test_profile_creation          | FUNCTION     | json         | 
DECLARE
    test_result json;
BEGIN
    -- Simular inserção na auth.users para testar trigger
    INSERT INTO auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_email,
        crypt('test123456', gen_salt('bf')),
        NOW(),
        json_build_object(
            'full_name', user_name,
            'dob', user_dob,
            'instrument', user_instrument,
            'tipo_usuario', user_tipo
        )::jsonb,
        NOW(),
        NOW()
    );
    
    test_result := json_build_object(
        'success', true,
        'message', 'Usuário de teste criado com sucesso'
    );
    
    RETURN test_result;
    
EXCEPTION WHEN OTHERS THEN
    test_result := json_build_object(
        'success', false,
        'error', SQLERRM,
        'sqlstate', SQLSTATE
    );
    RETURN test_result;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| update_attendance_view         | FUNCTION     | void         | 
DECLARE
  aula_column text := NULL;
  date_column text := NULL;
  presente_column text := NULL;
  view_sql text;
BEGIN
  -- Descobrir coluna que liga com aula
  IF column_exists('presencas', 'aula_id') THEN
    aula_column := 'aula_id';
  ELSIF column_exists('presencas', 'id_aula') THEN
    aula_column := 'id_aula';
  ELSIF column_exists('presencas', 'lesson_id') THEN
    aula_column := 'lesson_id';
  END IF;
  
  -- Descobrir coluna de presença
  IF column_exists('presencas', 'presente') THEN
    presente_column := 'presente';
  ELSIF column_exists('presencas', 'attended') THEN
    presente_column := 'attended';
  ELSIF column_exists('presencas', 'status') THEN
    presente_column := 'status';
  END IF;
  
  -- Descobrir coluna de data
  IF column_exists('presencas', 'data_presenca') THEN
    date_column := 'data_presenca';
  ELSIF column_exists('presencas', 'created_at') THEN
    date_column := 'created_at';
  ELSIF column_exists('presencas', 'timestamp') THEN
    date_column := 'timestamp';
  END IF;
  
  -- Construir SQL da view dinamicamente
  view_sql := 'CREATE OR REPLACE VIEW view_attendance_analytics AS SELECT 
    a.id as aula_id,
    a.numero,
    a.titulo,
    a.data_programada,
    a.status,
    (SELECT COUNT(*) FROM alunos WHERE ativo = true) as total_enrolled,';
  
  -- Adicionar contagem de presença se possível
  IF aula_column IS NOT NULL THEN
    view_sql := view_sql || '
    (SELECT COUNT(*) FROM presencas p WHERE p.' || aula_column || ' = a.id) as total_present,';
    
    IF presente_column IS NOT NULL THEN
      view_sql := view_sql || '
      (SELECT COUNT(*) FROM presencas p WHERE p.' || aula_column || ' = a.id AND p.' || presente_column || ' = true) as confirmed_present,
      ROUND(
        (SELECT COUNT(*) FROM presencas p WHERE p.' || aula_column || ' = a.id AND p.' || presente_column || ' = true) * 100.0 / 
        NULLIF((SELECT COUNT(*) FROM alunos WHERE ativo = true), 0), 2
      ) as attendance_percentage,';
    ELSE
      view_sql := view_sql || '
      (SELECT COUNT(*) FROM presencas p WHERE p.' || aula_column || ' = a.id) as confirmed_present,
      ROUND(
        (SELECT COUNT(*) FROM presencas p WHERE p.' || aula_column || ' = a.id) * 100.0 / 
        NULLIF((SELECT COUNT(*) FROM alunos WHERE ativo = true), 0), 2
      ) as attendance_percentage,';
    END IF;
  ELSE
    view_sql := view_sql || '
    0 as total_present,
    0 as confirmed_present,
    0::decimal as attendance_percentage,';
  END IF;
  
  -- Adicionar QR stats
  view_sql := view_sql || '
    (SELECT COUNT(*) FROM qr_codes qr WHERE qr.aula_id = a.id AND qr.type = ''attendance'') as qr_codes_generated,
    (SELECT COUNT(*) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.aula_id = a.id) as qr_scans_total,
    (SELECT COUNT(*) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.aula_id = a.id AND qs.result = ''success'') as qr_scans_success
  FROM aulas a';
  
  -- Executar SQL
  EXECUTE view_sql;
  
  RAISE NOTICE 'View attendance atualizada com: aula_col=%, presente_col=%, date_col=%', 
    COALESCE(aula_column, 'NONE'), COALESCE(presente_column, 'NONE'), COALESCE(date_column, 'NONE');
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| update_atualizado_em_column    | FUNCTION     | trigger      | 
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| update_editado_em              | FUNCTION     | trigger      | 
BEGIN
    NEW.editado_em = now();
    RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| update_last_active             | FUNCTION     | trigger      | 
BEGIN
  NEW.last_active = NOW();
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| update_lessons_updated_at      | FUNCTION     | trigger      | 
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| update_matriculas_updated_at   | FUNCTION     | trigger      | 
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| update_module_lessons_count    | FUNCTION     | trigger      | 
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE modules 
    SET lessons_count = lessons_count + 1,
        updated_at = NOW()
    WHERE id = NEW.module_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE modules 
    SET lessons_count = GREATEST(lessons_count - 1, 0),
        updated_at = NOW()
    WHERE id = OLD.module_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| update_modules_updated_at      | FUNCTION     | trigger      | 
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| update_professor_view          | FUNCTION     | void         | 
DECLARE
  nome_source text := 'p.id::text';
  admin_source text := 'false';
  view_sql text;
BEGIN
  -- Descobrir fonte do nome
  IF column_exists('professores', 'nome') THEN
    nome_source := 'COALESCE(p.nome, ''Professor '' || p.id::text)';
  ELSIF column_exists('profiles', 'nome') THEN
    nome_source := 'COALESCE((SELECT pr.nome FROM profiles pr WHERE pr.id = p.id), ''Professor '' || p.id::text)';
  ELSIF column_exists('profiles', 'full_name') THEN
    nome_source := 'COALESCE((SELECT pr.full_name FROM profiles pr WHERE pr.id = p.id), ''Professor '' || p.id::text)';
  ELSE
    nome_source := '''Professor '' || p.id::text';
  END IF;
  
  -- Descobrir fonte do admin_access
  IF column_exists('professores', 'admin_access') THEN
    admin_source := 'COALESCE(p.admin_access, false)';
  END IF;
  
  -- Construir SQL da view
  view_sql := 'CREATE OR REPLACE VIEW view_professor_dashboard AS SELECT 
    p.id,
    ' || nome_source || ' as nome,
    ' || admin_source || ' as admin_access,';
  
  -- Adicionar conteúdo se tabela/view existir
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'professores_conteudos') THEN
    view_sql := view_sql || '
    (SELECT COUNT(*) FROM professores_conteudos pc WHERE pc.professor_id = p.id) as total_conteudos,';
  ELSE
    view_sql := view_sql || '
    0 as total_conteudos,';
  END IF;
  
  -- Continuar com QR stats
  view_sql := view_sql || '
    0 as total_videos,
    0 as total_sacadas,
    (SELECT COUNT(*) FROM qr_codes qr WHERE qr.created_by = p.id) as qr_codes_created,
    (SELECT COUNT(*) FROM qr_codes qr WHERE qr.created_by = p.id AND qr.is_active = true) as qr_codes_active,
    (SELECT COUNT(*) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.created_by = p.id) as total_qr_scans,
    (SELECT COALESCE(SUM(qs.points_awarded), 0) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.created_by = p.id AND qs.result = ''success'') as points_awarded_via_qr,
    (SELECT COUNT(*) FROM audit_activities aa WHERE aa.user_id = p.id AND aa.created_at >= CURRENT_DATE - INTERVAL ''7 days'') as recent_activities
  FROM professores p
  WHERE p.ativo = true';
  
  -- Executar SQL
  EXECUTE view_sql;
  
  RAISE NOTICE 'View professor atualizada com: nome_source=%, admin_source=%', 
    nome_source, admin_source;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| update_professor_view_fixed    | FUNCTION     | void         | 
DECLARE
  nome_source text := '''Professor '' || p.id::text';
  admin_source text := 'false';
  conteudo_count text := '0';
  relation_col text;
  view_sql text;
BEGIN
  -- Descobrir fonte do nome
  IF column_exists('professores', 'nome') THEN
    nome_source := 'COALESCE(p.nome, ''Professor '' || p.id::text)';
  ELSIF column_exists('profiles', 'nome') THEN
    nome_source := 'COALESCE((SELECT pr.nome FROM profiles pr WHERE pr.id = p.id), ''Professor '' || p.id::text)';
  ELSIF column_exists('profiles', 'full_name') THEN
    nome_source := 'COALESCE((SELECT pr.full_name FROM profiles pr WHERE pr.id = p.id), ''Professor '' || p.id::text)';
  END IF;
  
  -- Descobrir fonte do admin_access
  IF column_exists('professores', 'admin_access') THEN
    admin_source := 'COALESCE(p.admin_access, false)';
  END IF;
  
  -- Descobrir contagem de conteúdos
  relation_col := find_professor_relation_column();
  IF relation_col IS NOT NULL THEN
    conteudo_count := '(SELECT COUNT(*) FROM professores_conteudos pc WHERE pc.' || relation_col || ' = p.id)';
  END IF;
  
  -- Construir SQL da view
  view_sql := 'CREATE OR REPLACE VIEW view_professor_dashboard AS SELECT 
    p.id,
    ' || nome_source || ' as nome,
    ' || admin_source || ' as admin_access,
    ' || conteudo_count || ' as total_conteudos,
    0 as total_videos,
    0 as total_sacadas,
    (SELECT COUNT(*) FROM qr_codes qr WHERE qr.created_by = p.id) as qr_codes_created,
    (SELECT COUNT(*) FROM qr_codes qr WHERE qr.created_by = p.id AND qr.is_active = true) as qr_codes_active,
    (SELECT COUNT(*) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.created_by = p.id) as total_qr_scans,
    (SELECT COALESCE(SUM(qs.points_awarded), 0) FROM qr_scans qs JOIN qr_codes qr ON qs.qr_code_id = qr.id WHERE qr.created_by = p.id AND qs.result = ''success'') as points_awarded_via_qr,
    (SELECT COUNT(*) FROM audit_activities aa WHERE aa.user_id = p.id AND aa.created_at >= CURRENT_DATE - INTERVAL ''7 days'') as recent_activities
  FROM professores p
  WHERE p.ativo = true';
  
  -- Executar SQL
  EXECUTE view_sql;
  
  RAISE NOTICE 'View professor CORRIGIDA com:';
  RAISE NOTICE '  nome_source = %', nome_source;
  RAISE NOTICE '  admin_source = %', admin_source;
  RAISE NOTICE '  conteudo_count = %', conteudo_count;
  RAISE NOTICE '  relation_column = %', COALESCE(relation_col, 'NONE');
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| update_turmas_updated_at       | FUNCTION     | trigger      | 
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| update_user_streak             | FUNCTION     | boolean      | 
BEGIN
  UPDATE profiles 
  SET current_streak = new_streak,
      best_streak = GREATEST(COALESCE(best_streak, 0), new_streak),
      last_active = NOW()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

-- 6.2 Triggers
SELECT 
    t.trigger_name,
    t.event_manipulation,
    t.event_object_table,
    t.action_timing,
    t.action_statement
FROM information_schema.triggers t
WHERE t.trigger_schema = 'public'
ORDER BY t.event_object_table, t.trigger_name;


| trigger_name                               | event_manipulation | event_object_table    | action_timing | action_statement                                |
| ------------------------------------------ | ------------------ | --------------------- | ------------- | ----------------------------------------------- |
| trigger_invalidate_admin_cache             | DELETE             | admins                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_admin_cache             | INSERT             | admins                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_admin_cache             | UPDATE             | admins                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_aluno_cache             | DELETE             | alunos                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_aluno_cache             | INSERT             | alunos                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_aluno_cache             | UPDATE             | alunos                | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trg_checklist_pre                          | INSERT             | aula_checklist        | AFTER         | EXECUTE FUNCTION atualizar_status_aula()        |
| trg_checklist_pre                          | UPDATE             | aula_checklist        | AFTER         | EXECUTE FUNCTION atualizar_status_aula()        |
| trigger_update_lessons_count_delete        | DELETE             | lessons               | AFTER         | EXECUTE FUNCTION update_module_lessons_count()  |
| trigger_update_lessons_count_insert        | INSERT             | lessons               | AFTER         | EXECUTE FUNCTION update_module_lessons_count()  |
| trigger_update_lessons_updated_at          | UPDATE             | lessons               | BEFORE        | EXECUTE FUNCTION update_lessons_updated_at()    |
| trigger_update_matriculas_updated_at       | UPDATE             | matriculas            | BEFORE        | EXECUTE FUNCTION update_matriculas_updated_at() |
| trigger_update_modules_updated_at          | UPDATE             | modules               | BEFORE        | EXECUTE FUNCTION update_modules_updated_at()    |
| trigger_invalidate_professor_cache         | INSERT             | professores           | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_professor_cache         | DELETE             | professores           | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| trigger_invalidate_professor_cache         | UPDATE             | professores           | AFTER         | EXECUTE FUNCTION invalidate_user_cache()        |
| normalize_professores_conteudos_tags       | UPDATE             | professores_conteudos | BEFORE        | EXECUTE FUNCTION normalize_tags()               |
| normalize_professores_conteudos_tags       | INSERT             | professores_conteudos | BEFORE        | EXECUTE FUNCTION normalize_tags()               |
| trigger_update_editado_em                  | UPDATE             | professores_conteudos | BEFORE        | EXECUTE FUNCTION update_editado_em()            |
| update_professores_conteudos_atualizado_em | UPDATE             | professores_conteudos | BEFORE        | EXECUTE FUNCTION update_atualizado_em_column()  |
| trigger_inserir_tipo                       | INSERT             | profiles              | AFTER         | EXECUTE FUNCTION inserir_em_tabela_especifica() |
| trigger_update_last_active                 | UPDATE             | profiles              | BEFORE        | EXECUTE FUNCTION update_last_active()           |
| trigger_update_turmas_updated_at           | UPDATE             | turmas                | BEFORE        | EXECUTE FUNCTION update_turmas_updated_at()     |

-- ===================================================================
-- 📈 7. ESTATÍSTICAS E DADOS
-- ===================================================================

-- 7.1 Contagem de registros por tabela
SELECT 
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    n_live_tup as live_rows,
    n_dead_tup as dead_rows,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;


ERROR:  42703: column "tablename" does not exist
LINE 3:     tablename,
            ^
Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.

-- 7.2 Tamanho das tabelas
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;


| tablename                  | size   | size_bytes |
| -------------------------- | ------ | ---------- |
| instrumento_midias         | 224 kB | 229376     |
| aulas                      | 168 kB | 172032     |
| modules                    | 160 kB | 163840     |
| instrumento_tecnicas       | 152 kB | 155648     |
| lessons                    | 152 kB | 155648     |
| instrumento_sons           | 144 kB | 147456     |
| instrumento_quiz           | 128 kB | 131072     |
| profiles                   | 128 kB | 131072     |
| instrumento_performances   | 128 kB | 131072     |
| instrumentos               | 128 kB | 131072     |
| matriculas                 | 128 kB | 131072     |
| instrumento_curiosidades   | 112 kB | 114688     |
| instrumentos_relacionados  | 112 kB | 114688     |
| professores_conteudos      | 104 kB | 106496     |
| trigger_logs               | 96 kB  | 98304      |
| achievements               | 80 kB  | 81920      |
| turmas                     | 80 kB  | 81920      |
| user_roles                 | 80 kB  | 81920      |
| metodologias_ensino        | 80 kB  | 81920      |
| forum_perguntas            | 80 kB  | 81920      |
| professor_instrumentos     | 80 kB  | 81920      |
| user_progress              | 80 kB  | 81920      |
| user_points_log            | 64 kB  | 65536      |
| materiais_apoio            | 64 kB  | 65536      |
| repertorio_musical         | 64 kB  | 65536      |
| alunos                     | 64 kB  | 65536      |
| turma_alunos               | 56 kB  | 57344      |
| user_notifications         | 56 kB  | 57344      |
| user_devotional_progress   | 48 kB  | 49152      |
| user_achievements          | 48 kB  | 49152      |
| permissions                | 48 kB  | 49152      |
| professores_categorias     | 48 kB  | 49152      |
| usuarios                   | 48 kB  | 49152      |
| audit_activities           | 48 kB  | 49152      |
| instrumentos_fisicos       | 48 kB  | 49152      |
| roles                      | 48 kB  | 49152      |
| permission_templates       | 48 kB  | 49152      |
| hook_cache                 | 48 kB  | 49152      |
| professores                | 48 kB  | 49152      |
| qr_codes                   | 48 kB  | 49152      |
| devotional_content         | 40 kB  | 40960      |
| cessoes_instrumentos       | 40 kB  | 40960      |
| qr_scans                   | 40 kB  | 40960      |
| desafios_alpha             | 32 kB  | 32768      |
| admins                     | 32 kB  | 32768      |
| migration_log              | 32 kB  | 32768      |
| presencas                  | 32 kB  | 32768      |
| logos                      | 32 kB  | 32768      |
| modulos                    | 32 kB  | 32768      |
| achievements_progress      | 32 kB  | 32768      |
| achievements_educacionais  | 32 kB  | 32768      |
| sequencias_didaticas       | 32 kB  | 32768      |
| aula_feedback              | 24 kB  | 24576      |
| aula_atividades            | 24 kB  | 24576      |
| aula_registros             | 24 kB  | 24576      |
| aula_desafio_alpha         | 24 kB  | 24576      |
| aula_checklist             | 24 kB  | 24576      |
| historico_instrumentos     | 24 kB  | 24576      |
| aula_materiais             | 24 kB  | 24576      |
| aula_desafios              | 24 kB  | 24576      |
| aula_criterios_avaliacao   | 24 kB  | 24576      |
| aula_status_log            | 24 kB  | 24576      |
| manutencoes_instrumentos   | 24 kB  | 24576      |
| role_permissions           | 24 kB  | 24576      |
| aula_feedbacks             | 24 kB  | 24576      |
| aula_tags                  | 24 kB  | 24576      |
| instrumento_sons_variacoes | 16 kB  | 16384      |
| instrumentos_alunos        | 16 kB  | 16384      |
| forum_respostas            | 16 kB  | 16384      |
| forum_likes                | 16 kB  | 16384      |
| aula_permissoes            | 16 kB  | 16384      |
| desafios_alpha_respostas   | 16 kB  | 16384      |

-- ===================================================================
-- 🔍 8. AMOSTRAS DE DADOS (EXECUTE SEPARADAMENTE)
-- ===================================================================

-- 8.1 Para cada tabela que você encontrar, execute:
-- SELECT * FROM nome_da_tabela LIMIT 3;

-- Exemplo para as principais:
-- SELECT * FROM profiles LIMIT 3;
-- SELECT * FROM biblioteca_instrumentos LIMIT 3;
-- SELECT * FROM categorias_instrumentos LIMIT 3;
-- SELECT * FROM metodologias_ensino LIMIT 3;
-- SELECT * FROM progressos_aluno LIMIT 3;
-- SELECT * FROM aulas LIMIT 3;
-- SELECT * FROM turmas LIMIT 3;

-- ===================================================================
-- 🛡️ 9. POLÍTICAS RLS (ROW LEVEL SECURITY)
-- ===================================================================

-- 9.1 Verificar RLS habilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;


| schemaname | tablename                  | rowsecurity |
| ---------- | -------------------------- | ----------- |
| public     | achievements               | true        |
| public     | achievements_educacionais  | false       |
| public     | achievements_progress      | true        |
| public     | admins                     | true        |
| public     | alunos                     | true        |
| public     | audit_activities           | true        |
| public     | aula_atividades            | true        |
| public     | aula_checklist             | true        |
| public     | aula_criterios_avaliacao   | true        |
| public     | aula_desafio_alpha         | true        |
| public     | aula_desafios              | true        |
| public     | aula_feedback              | true        |
| public     | aula_feedbacks             | true        |
| public     | aula_materiais             | true        |
| public     | aula_permissoes            | true        |
| public     | aula_registros             | true        |
| public     | aula_status_log            | true        |
| public     | aula_tags                  | true        |
| public     | aulas                      | true        |
| public     | cessoes_instrumentos       | true        |
| public     | desafios_alpha             | false       |
| public     | desafios_alpha_respostas   | false       |
| public     | devotional_content         | true        |
| public     | forum_likes                | false       |
| public     | forum_perguntas            | false       |
| public     | forum_respostas            | false       |
| public     | historico_instrumentos     | true        |
| public     | hook_cache                 | true        |
| public     | instrumento_curiosidades   | true        |
| public     | instrumento_midias         | true        |
| public     | instrumento_performances   | true        |
| public     | instrumento_quiz           | true        |
| public     | instrumento_sons           | true        |
| public     | instrumento_sons_variacoes | true        |
| public     | instrumento_tecnicas       | true        |
| public     | instrumentos               | false       |
| public     | instrumentos_alunos        | false       |
| public     | instrumentos_fisicos       | true        |
| public     | instrumentos_relacionados  | true        |
| public     | lessons                    | true        |
| public     | logos                      | true        |
| public     | manutencoes_instrumentos   | true        |
| public     | materiais_apoio            | false       |
| public     | matriculas                 | true        |
| public     | metodologias_ensino        | false       |
| public     | migration_log              | true        |
| public     | modules                    | true        |
| public     | modulos                    | true        |
| public     | permission_templates       | true        |
| public     | permissions                | true        |
| public     | presencas                  | true        |
| public     | professor_instrumentos     | false       |
| public     | professores                | true        |
| public     | professores_categorias     | true        |
| public     | professores_conteudos      | true        |
| public     | profiles                   | true        |
| public     | qr_codes                   | true        |
| public     | qr_scans                   | true        |
| public     | repertorio_musical         | false       |
| public     | role_permissions           | true        |
| public     | roles                      | true        |
| public     | sequencias_didaticas       | false       |
| public     | trigger_logs               | true        |
| public     | turma_alunos               | true        |
| public     | turmas                     | true        |
| public     | user_achievements          | true        |
| public     | user_devotional_progress   | true        |
| public     | user_notifications         | true        |
| public     | user_points_log            | true        |
| public     | user_progress              | true        |
| public     | user_roles                 | true        |
| public     | usuarios                   | true        |

-- 9.2 Políticas RLS existentes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


| schemaname | tablename                  | policyname                                           | permissive | roles           | cmd    | qual                                                                                                                                                                                                                                                                                                                                       | with_check                                                                                                                                                             |
| ---------- | -------------------------- | ---------------------------------------------------- | ---------- | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public     | achievements               | Achievements are viewable by everyone                | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | achievements               | Anyone can view public achievements                  | PERMISSIVE | {public}        | SELECT | (is_active = true)                                                                                                                                                                                                                                                                                                                         | null                                                                                                                                                                   |
| public     | achievements_progress      | achievements_progress_simple                         | PERMISSIVE | {public}        | ALL    | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | admins                     | admins_simple_access                                 | PERMISSIVE | {public}        | ALL    | (id = auth.uid())                                                                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | alunos                     | estudantes_own_data                                  | PERMISSIVE | {authenticated} | ALL    | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | audit_activities           | admin_full_access_audit                              | PERMISSIVE | {authenticated} | ALL    | ((detect_user_role(auth.uid()) ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | audit_activities           | audit_activities_simple                              | PERMISSIVE | {public}        | SELECT | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | aula_atividades            | aula_atividades_access                               | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_checklist             | aula_checklist_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | aula_criterios_avaliacao   | aula_criterios_avaliacao_access                      | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | aula_desafio_alpha         | aula_desafio_alpha_access                            | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_desafios              | aula_desafios_access                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_feedback              | aula_feedback_access                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_feedbacks             | aula_feedbacks_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_materiais             | aula_materiais_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_permissoes            | aula_permissoes_admin                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | aula_registros             | aula_registros_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       | null                                                                                                                                                                   |
| public     | aula_status_log            | aula_status_log_staff                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | aula_tags                  | aula_tags_read                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | aulas                      | aulas_modify_staff                                   | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | aulas                      | aulas_read_all                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | cessoes_instrumentos       | cessoes_instrumentos_access                          | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           | null                                                                                                                                                                   |
| public     | devotional_content         | Anyone can view published devotionals                | PERMISSIVE | {public}        | SELECT | (is_published = true)                                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | devotional_content         | Published devotional content is viewable by everyone | PERMISSIVE | {public}        | SELECT | (is_published = true)                                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | historico_instrumentos     | historico_instrumentos_access                        | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | hook_cache                 | users_own_cache                                      | PERMISSIVE | {authenticated} | ALL    | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | instrumento_curiosidades   | instrumento_curiosidades_read                        | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_midias         | instrumento_midias_read                              | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_performances   | instrumento_performances_read                        | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_quiz           | instrumento_quiz_read                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_sons           | instrumento_sons_read                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_sons_variacoes | instrumento_sons_variacoes_read                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumento_tecnicas       | instrumento_tecnicas_read                            | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumentos               | instrumentos_modify_staff                            | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | instrumentos               | instrumentos_read_all                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumentos_alunos        | instrumentos_alunos_access                           | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           | null                                                                                                                                                                   |
| public     | instrumentos_fisicos       | instrumentos_fisicos_access                          | PERMISSIVE | {authenticated} | ALL    | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | instrumentos_relacionados  | instrumentos_relacionados_read                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | lessons                    | Anyone can view lessons from active modules          | PERMISSIVE | {public}        | SELECT | (EXISTS ( SELECT 1
   FROM modules
  WHERE ((modules.id = lessons.module_id) AND (modules.is_active = true))))                                                                                                                                                                                                                             | null                                                                                                                                                                   |
| public     | lessons                    | Authenticated users can manage lessons               | PERMISSIVE | {public}        | ALL    | (auth.role() = 'authenticated'::text)                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | lessons                    | Lessons are viewable by everyone                     | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | lessons                    | Only admins can modify lessons                       | PERMISSIVE | {public}        | ALL    | ((auth.jwt() ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                                            | null                                                                                                                                                                   |
| public     | logos                      | logos_modify_admin                                   | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           | null                                                                                                                                                                   |
| public     | logos                      | logos_read_all                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | manutencoes_instrumentos   | manutencoes_instrumentos_access                      | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | matriculas                 | matriculas_access                                    | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           | null                                                                                                                                                                   |
| public     | migration_log              | migration_log_admin_only                             | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           | null                                                                                                                                                                   |
| public     | modules                    | Anyone can view active modules                       | PERMISSIVE | {public}        | SELECT | (is_active = true)                                                                                                                                                                                                                                                                                                                         | null                                                                                                                                                                   |
| public     | modules                    | Authenticated users can manage modules               | PERMISSIVE | {public}        | ALL    | (auth.role() = 'authenticated'::text)                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | modules                    | Modules are viewable by everyone                     | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | modules                    | Only admins can modify modules                       | PERMISSIVE | {public}        | ALL    | ((auth.jwt() ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                                            | null                                                                                                                                                                   |
| public     | modules                    | modules_modify_staff                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | modules                    | modules_read_all                                     | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | modulos                    | modulos_modify_staff                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | modulos                    | modulos_read_all                                     | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | permission_templates       | permission_templates_admin_only                      | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           | null                                                                                                                                                                   |
| public     | permissions                | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       | is_admin(auth.uid())                                                                                                                                                   |
| public     | permissions                | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | presencas                  | presencas_access                                     | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM matriculas m
  WHERE ((m.id = presencas.matricula_id) AND (m.aluno_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true))))) | null                                                                                                                                                                   |
| public     | professor_instrumentos     | professor_instrumentos_access                        | PERMISSIVE | {authenticated} | ALL    | ((professor_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))))                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | professores                | professores_own_data                                 | PERMISSIVE | {authenticated} | ALL    | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | professores_categorias     | Todos podem ver categorias                           | PERMISSIVE | {public}        | SELECT | (ativo = true)                                                                                                                                                                                                                                                                                                                             | null                                                                                                                                                                   |
| public     | professores_conteudos      | Admins_podem_deletar                                 | PERMISSIVE | {public}        | DELETE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['pastor'::text, 'admin'::text])))))                                                                                                                                                                                        | null                                                                                                                                                                   |
| public     | professores_conteudos      | Autores podem atualizar próprios conteúdos           | PERMISSIVE | {public}        | UPDATE | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  | null                                                                                                                                                                   |
| public     | professores_conteudos      | Autores podem deletar próprios conteúdos             | PERMISSIVE | {public}        | DELETE | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  | null                                                                                                                                                                   |
| public     | professores_conteudos      | Autores podem ver próprios conteúdos                 | PERMISSIVE | {public}        | SELECT | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  | null                                                                                                                                                                   |
| public     | professores_conteudos      | Conteudos_visivel_para_todos                         | PERMISSIVE | {public}        | SELECT | ((visivel = true) AND (ativo = true))                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | professores_conteudos      | Professores podem criar conteúdos                    | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = criado_por)                                                                                                                                              |
| public     | professores_conteudos      | Professores_podem_criar                              | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['professor'::text, 'pastor'::text, 'admin'::text]))))) |
| public     | professores_conteudos      | Todos podem ver conteúdos visíveis                   | PERMISSIVE | {public}        | SELECT | ((visivel = true) AND (ativo = true))                                                                                                                                                                                                                                                                                                      | null                                                                                                                                                                   |
| public     | professores_conteudos      | Usuarios_editam_proprio_conteudo                     | PERMISSIVE | {public}        | UPDATE | ((criado_por = auth.uid()) OR (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['pastor'::text, 'admin'::text]))))))                                                                                                                                                         | null                                                                                                                                                                   |
| public     | profiles                   | profiles_insert_service_simple                       | PERMISSIVE | {service_role}  | INSERT | null                                                                                                                                                                                                                                                                                                                                       | true                                                                                                                                                                   |
| public     | profiles                   | profiles_insert_simple                               | PERMISSIVE | {authenticated} | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = id)                                                                                                                                                      |
| public     | profiles                   | profiles_select_simple                               | PERMISSIVE | {authenticated} | SELECT | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | profiles                   | profiles_update_simple                               | PERMISSIVE | {authenticated} | UPDATE | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          | (auth.uid() = id)                                                                                                                                                      |
| public     | qr_codes                   | admin_full_access_qr                                 | PERMISSIVE | {authenticated} | ALL    | ((detect_user_role(auth.uid()) ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                          | null                                                                                                                                                                   |
| public     | qr_codes                   | professor_qr_codes                                   | PERMISSIVE | {authenticated} | ALL    | ((created_by = auth.uid()) OR has_permission(auth.uid(), 'qr.generate'::text))                                                                                                                                                                                                                                                             | null                                                                                                                                                                   |
| public     | qr_scans                   | users_scan_qr                                        | PERMISSIVE | {authenticated} | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (user_id = auth.uid())                                                                                                                                                 |
| public     | role_permissions           | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       | is_admin(auth.uid())                                                                                                                                                   |
| public     | role_permissions           | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | roles                      | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       | is_admin(auth.uid())                                                                                                                                                   |
| public     | roles                      | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | trigger_logs               | trigger_logs_admin_only                              | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           | null                                                                                                                                                                   |
| public     | turma_alunos               | turma_alunos_access                                  | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           | null                                                                                                                                                                   |
| public     | turmas                     | turmas_modify_staff                                  | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      | null                                                                                                                                                                   |
| public     | turmas                     | turmas_read_all                                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       | null                                                                                                                                                                   |
| public     | user_achievements          | Users can insert own achievements                    | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = user_id)                                                                                                                                                 |
| public     | user_achievements          | Users can insert their own achievements              | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = user_id)                                                                                                                                                 |
| public     | user_achievements          | Users can view own achievements                      | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_achievements          | Users can view their own achievements                | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_devotional_progress   | Users can insert own devotional progress             | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = user_id)                                                                                                                                                 |
| public     | user_devotional_progress   | Users can insert their own devotional progress       | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = user_id)                                                                                                                                                 |
| public     | user_devotional_progress   | Users can update their own devotional progress       | PERMISSIVE | {public}        | UPDATE | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_devotional_progress   | Users can view own devotional progress               | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_devotional_progress   | Users can view their own devotional progress         | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_notifications         | users_own_notifications                              | PERMISSIVE | {authenticated} | ALL    | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_points_log            | users_own_points                                     | PERMISSIVE | {authenticated} | SELECT | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_progress              | Users can insert their own progress                  | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       | (auth.uid() = user_id)                                                                                                                                                 |
| public     | user_progress              | Users can update their own progress                  | PERMISSIVE | {public}        | UPDATE | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |
| public     | user_progress              | Users can view their own progress                    | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     | null                                                                                                                                                                   |

-- ===================================================================
-- 🔐 10. PERMISSÕES E ROLES
-- ===================================================================

-- 10.1 Roles existentes
SELECT 
    rolname,
    rolsuper,
    rolcreaterole,
    rolcreatedb,
    rolcanlogin,
    rolreplication
FROM pg_roles
WHERE rolname NOT LIKE 'pg_%'
ORDER BY rolname;

| rolname                    | rolsuper | rolcreaterole | rolcreatedb | rolcanlogin | rolreplication |
| -------------------------- | -------- | ------------- | ----------- | ----------- | -------------- |
| anon                       | false    | false         | false       | false       | false          |
| authenticated              | false    | false         | false       | false       | false          |
| authenticator              | false    | false         | false       | true        | false          |
| dashboard_user             | false    | true          | true        | false       | true           |
| postgres                   | false    | true          | true        | true        | true           |
| service_role               | false    | false         | false       | false       | false          |
| supabase_admin             | true     | true          | true        | true        | true           |
| supabase_auth_admin        | false    | true          | false       | true        | false          |
| supabase_read_only_user    | false    | false         | false       | true        | false          |
| supabase_realtime_admin    | false    | false         | false       | false       | false          |
| supabase_replication_admin | false    | false         | false       | true        | true           |
| supabase_storage_admin     | false    | true          | false       | true        | false          |

-- 10.2 Permissões em tabelas
SELECT 
    table_schema,
    table_name,
    grantee,
    privilege_type,
    is_grantable
FROM information_schema.table_privileges
WHERE table_schema = 'public'
ORDER BY table_name, grantee;


| table_schema | table_name                | grantee       | privilege_type | is_grantable |
| ------------ | ------------------------- | ------------- | -------------- | ------------ |
| public       | achievements              | anon          | TRUNCATE       | NO           |
| public       | achievements              | anon          | INSERT         | NO           |
| public       | achievements              | anon          | UPDATE         | NO           |
| public       | achievements              | anon          | TRIGGER        | NO           |
| public       | achievements              | anon          | REFERENCES     | NO           |
| public       | achievements              | anon          | SELECT         | NO           |
| public       | achievements              | anon          | DELETE         | NO           |
| public       | achievements              | authenticated | TRUNCATE       | NO           |
| public       | achievements              | authenticated | TRIGGER        | NO           |
| public       | achievements              | authenticated | INSERT         | NO           |
| public       | achievements              | authenticated | SELECT         | NO           |
| public       | achievements              | authenticated | DELETE         | NO           |
| public       | achievements              | authenticated | REFERENCES     | NO           |
| public       | achievements              | authenticated | UPDATE         | NO           |
| public       | achievements              | postgres      | REFERENCES     | YES          |
| public       | achievements              | postgres      | TRUNCATE       | YES          |
| public       | achievements              | postgres      | DELETE         | YES          |
| public       | achievements              | postgres      | UPDATE         | YES          |
| public       | achievements              | postgres      | SELECT         | YES          |
| public       | achievements              | postgres      | TRIGGER        | YES          |
| public       | achievements              | postgres      | INSERT         | YES          |
| public       | achievements              | service_role  | REFERENCES     | NO           |
| public       | achievements              | service_role  | SELECT         | NO           |
| public       | achievements              | service_role  | UPDATE         | NO           |
| public       | achievements              | service_role  | DELETE         | NO           |
| public       | achievements              | service_role  | TRIGGER        | NO           |
| public       | achievements              | service_role  | TRUNCATE       | NO           |
| public       | achievements              | service_role  | INSERT         | NO           |
| public       | achievements_educacionais | anon          | INSERT         | NO           |
| public       | achievements_educacionais | anon          | SELECT         | NO           |
| public       | achievements_educacionais | anon          | TRUNCATE       | NO           |
| public       | achievements_educacionais | anon          | REFERENCES     | NO           |
| public       | achievements_educacionais | anon          | TRIGGER        | NO           |
| public       | achievements_educacionais | anon          | UPDATE         | NO           |
| public       | achievements_educacionais | anon          | DELETE         | NO           |
| public       | achievements_educacionais | authenticated | TRUNCATE       | NO           |
| public       | achievements_educacionais | authenticated | INSERT         | NO           |
| public       | achievements_educacionais | authenticated | REFERENCES     | NO           |
| public       | achievements_educacionais | authenticated | TRIGGER        | NO           |
| public       | achievements_educacionais | authenticated | DELETE         | NO           |
| public       | achievements_educacionais | authenticated | UPDATE         | NO           |
| public       | achievements_educacionais | authenticated | SELECT         | NO           |
| public       | achievements_educacionais | postgres      | REFERENCES     | YES          |
| public       | achievements_educacionais | postgres      | TRIGGER        | YES          |
| public       | achievements_educacionais | postgres      | TRUNCATE       | YES          |
| public       | achievements_educacionais | postgres      | INSERT         | YES          |
| public       | achievements_educacionais | postgres      | DELETE         | YES          |
| public       | achievements_educacionais | postgres      | UPDATE         | YES          |
| public       | achievements_educacionais | postgres      | SELECT         | YES          |
| public       | achievements_educacionais | service_role  | INSERT         | NO           |
| public       | achievements_educacionais | service_role  | REFERENCES     | NO           |
| public       | achievements_educacionais | service_role  | DELETE         | NO           |
| public       | achievements_educacionais | service_role  | UPDATE         | NO           |
| public       | achievements_educacionais | service_role  | TRIGGER        | NO           |
| public       | achievements_educacionais | service_role  | SELECT         | NO           |
| public       | achievements_educacionais | service_role  | TRUNCATE       | NO           |
| public       | achievements_progress     | anon          | TRIGGER        | NO           |
| public       | achievements_progress     | anon          | INSERT         | NO           |
| public       | achievements_progress     | anon          | REFERENCES     | NO           |
| public       | achievements_progress     | anon          | UPDATE         | NO           |
| public       | achievements_progress     | anon          | DELETE         | NO           |
| public       | achievements_progress     | anon          | SELECT         | NO           |
| public       | achievements_progress     | anon          | TRUNCATE       | NO           |
| public       | achievements_progress     | authenticated | TRIGGER        | NO           |
| public       | achievements_progress     | authenticated | INSERT         | NO           |
| public       | achievements_progress     | authenticated | REFERENCES     | NO           |
| public       | achievements_progress     | authenticated | DELETE         | NO           |
| public       | achievements_progress     | authenticated | TRUNCATE       | NO           |
| public       | achievements_progress     | authenticated | SELECT         | NO           |
| public       | achievements_progress     | authenticated | UPDATE         | NO           |
| public       | achievements_progress     | postgres      | INSERT         | YES          |
| public       | achievements_progress     | postgres      | REFERENCES     | YES          |
| public       | achievements_progress     | postgres      | TRUNCATE       | YES          |
| public       | achievements_progress     | postgres      | SELECT         | YES          |
| public       | achievements_progress     | postgres      | UPDATE         | YES          |
| public       | achievements_progress     | postgres      | TRIGGER        | YES          |
| public       | achievements_progress     | postgres      | DELETE         | YES          |
| public       | achievements_progress     | service_role  | INSERT         | NO           |
| public       | achievements_progress     | service_role  | SELECT         | NO           |
| public       | achievements_progress     | service_role  | UPDATE         | NO           |
| public       | achievements_progress     | service_role  | DELETE         | NO           |
| public       | achievements_progress     | service_role  | TRUNCATE       | NO           |
| public       | achievements_progress     | service_role  | REFERENCES     | NO           |
| public       | achievements_progress     | service_role  | TRIGGER        | NO           |
| public       | admin_alunos              | anon          | INSERT         | NO           |
| public       | admin_alunos              | anon          | REFERENCES     | NO           |
| public       | admin_alunos              | anon          | TRIGGER        | NO           |
| public       | admin_alunos              | anon          | SELECT         | NO           |
| public       | admin_alunos              | anon          | UPDATE         | NO           |
| public       | admin_alunos              | anon          | DELETE         | NO           |
| public       | admin_alunos              | anon          | TRUNCATE       | NO           |
| public       | admin_alunos              | authenticated | INSERT         | NO           |
| public       | admin_alunos              | authenticated | DELETE         | NO           |
| public       | admin_alunos              | authenticated | TRUNCATE       | NO           |
| public       | admin_alunos              | authenticated | SELECT         | NO           |
| public       | admin_alunos              | authenticated | UPDATE         | NO           |
| public       | admin_alunos              | authenticated | REFERENCES     | NO           |
| public       | admin_alunos              | authenticated | TRIGGER        | NO           |
| public       | admin_alunos              | postgres      | INSERT         | YES          |
| public       | admin_alunos              | postgres      | DELETE         | YES          | 