-- =============================================
-- DESCOBRIR ESTRUTURA COMPLETA DO BANCO
-- Execute no SQL Editor do Supabase
-- =============================================

-- 1. LISTAR TODAS AS TABELAS DO SCHEMA PUBLIC
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;


| table_name                      | table_type |
| ------------------------------- | ---------- |
| achievements                    | BASE TABLE |
| achievements_educacionais       | BASE TABLE |
| achievements_progress           | BASE TABLE |
| adaptacoes_espacos_alternativos | BASE TABLE |
| admin_alunos                    | VIEW       |
| admin_professores               | VIEW       |
| admin_usuarios_completos        | VIEW       |
| admins                          | BASE TABLE |
| alpha_aluno_badges              | BASE TABLE |
| alpha_aluno_desafios            | BASE TABLE |
| alpha_aula_progresso            | BASE TABLE |
| alpha_badges                    | BASE TABLE |
| alpha_celebracoes               | BASE TABLE |
| alpha_competencias              | BASE TABLE |
| alpha_desafios                  | BASE TABLE |
| alpha_estudante_badges          | BASE TABLE |
| alpha_mentorias                 | BASE TABLE |
| alpha_metodologias              | BASE TABLE |
| alpha_niveis                    | BASE TABLE |
| alpha_progresso                 | BASE TABLE |
| alpha_progresso_estudante       | BASE TABLE |
| alpha_projetos_coletivos        | BASE TABLE |
| alpha_ranking                   | BASE TABLE |
| alpha_submissoes                | BASE TABLE |
| alpha_xp_historico              | BASE TABLE |
| alunos                          | BASE TABLE |
| audit_activities                | BASE TABLE |
| aula_atividades                 | BASE TABLE |
| aula_avaliacoes                 | BASE TABLE |
| aula_checklist                  | BASE TABLE |
| aula_criterios_avaliacao        | BASE TABLE |
| aula_desafio_alpha              | BASE TABLE |
| aula_desafios                   | BASE TABLE |
| aula_feedback                   | BASE TABLE |
| aula_feedbacks                  | BASE TABLE |
| aula_materiais                  | BASE TABLE |
| aula_permissoes                 | BASE TABLE |
| aula_presencas                  | BASE TABLE |
| aula_registros                  | BASE TABLE |
| aula_status_log                 | BASE TABLE |
| aula_tags                       | BASE TABLE |
| aulas                           | BASE TABLE |
| autoavaliacoes                  | BASE TABLE |
| avaliacoes_rubricas             | BASE TABLE |
| capacitacao_docente             | BASE TABLE |
| cessoes_instrumentos            | BASE TABLE |
| comunicacao_engajamento         | BASE TABLE |
| desafios_alpha                  | BASE TABLE |
| desafios_alpha_respostas        | BASE TABLE |
| devotional_content              | BASE TABLE |
| documentos_institucionais       | BASE TABLE |
| experiencias_brasileiras        | BASE TABLE |
| feedback_pares                  | BASE TABLE |
| forum_likes                     | BASE TABLE |
| forum_perguntas                 | BASE TABLE |
| forum_respostas                 | BASE TABLE |
| historia_compositores           | BASE TABLE |
| historia_conceitos_teoricos     | BASE TABLE |
| historia_contexto_cultural      | BASE TABLE |
| historia_eventos_timeline       | BASE TABLE |
| historia_generos                | BASE TABLE |
| historia_instrumentos_evolucao  | BASE TABLE |
| historia_movimentos             | BASE TABLE |
| historia_movimentos_artisticos  | BASE TABLE |
| historia_obras                  | BASE TABLE |
| historia_periodos               | BASE TABLE |
| historia_playlists              | BASE TABLE |
| historia_progresso_usuario      | BASE TABLE |
| historia_quiz                   | BASE TABLE |
| historia_quiz_respostas         | BASE TABLE |
| historia_timeline               | BASE TABLE |
| historico_instrumentos          | BASE TABLE |
| hook_cache                      | BASE TABLE |
| indicadores_impacto             | BASE TABLE |
| instrumento_curiosidades        | BASE TABLE |
| instrumento_midias              | BASE TABLE |
| instrumento_performances        | BASE TABLE |
| instrumento_quiz                | BASE TABLE |
| instrumento_sons                | BASE TABLE |
| instrumento_sons_variacoes      | BASE TABLE |
| instrumento_tecnicas            | BASE TABLE |
| instrumentos                    | BASE TABLE |
| instrumentos_alunos             | BASE TABLE |
| instrumentos_fisicos            | BASE TABLE |
| instrumentos_relacionados       | BASE TABLE |
| lessons                         | BASE TABLE |
| logos                           | BASE TABLE |
| manutencoes_instrumentos        | BASE TABLE |
| materiais_apoio                 | BASE TABLE |
| matriculas                      | BASE TABLE |
| metodologias_ensino             | BASE TABLE |
| migration_log                   | BASE TABLE |
| modules                         | BASE TABLE |
| modulos                         | BASE TABLE |
| permission_templates            | BASE TABLE |
| permissions                     | BASE TABLE |
| portfolio_evidencias            | BASE TABLE |
| portfolios                      | BASE TABLE |
| presencas                       | BASE TABLE |
| professor_instrumentos          | BASE TABLE |




-- 2. ESTRUTURA DA TABELA PROFILES
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
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



-- 3. ESTRUTURA DA TABELA TURMAS
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'turmas'
ORDER BY ordinal_position;


| column_name         | data_type                   | is_nullable | column_default                  |
| ------------------- | --------------------------- | ----------- | ------------------------------- |
| id                  | uuid                        | NO          | gen_random_uuid()               |
| nome                | character varying           | NO          | null                            |
| descricao           | text                        | YES         | null                            |
| professor_id        | uuid                        | NO          | null                            |
| instrumento_id      | uuid                        | NO          | null                            |
| nivel               | character varying           | NO          | 'iniciante'::character varying  |
| max_alunos          | integer                     | YES         | 10                              |
| min_alunos          | integer                     | YES         | 3                               |
| valor_mensalidade   | numeric                     | YES         | null                            |
| horarios            | jsonb                       | YES         | '[]'::jsonb                     |
| status              | character varying           | YES         | 'planejada'::character varying  |
| data_inicio         | date                        | YES         | null                            |
| data_fim            | date                        | YES         | null                            |
| observacoes         | text                        | YES         | null                            |
| modalidade          | character varying           | YES         | 'presencial'::character varying |
| local               | character varying           | YES         | null                            |
| material_necessario | text                        | YES         | null                            |
| pre_requisitos      | text                        | YES         | null                            |
| ativo               | boolean                     | YES         | true                            |
| criado_em           | timestamp without time zone | YES         | CURRENT_TIMESTAMP               |
| atualizado_em       | timestamp without time zone | YES         | CURRENT_TIMESTAMP               |




-- 4. ESTRUTURA DA TABELA INSTRUMENTOS
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'instrumentos'
ORDER BY ordinal_position;


| column_name             | data_type                   | is_nullable | column_default                 |
| ----------------------- | --------------------------- | ----------- | ------------------------------ |
| id                      | uuid                        | NO          | gen_random_uuid()              |
| nome                    | character varying           | NO          | null                           |
| categoria               | character varying           | YES         | null                           |
| descricao               | text                        | YES         | null                           |
| imagem_url              | text                        | YES         | null                           |
| ativo                   | boolean                     | YES         | true                           |
| ordem_exibicao          | integer                     | YES         | 0                              |
| criado_em               | timestamp without time zone | YES         | CURRENT_TIMESTAMP              |
| historia                | text                        | YES         | null                           |
| origem                  | character varying           | YES         | null                           |
| familia_instrumental    | character varying           | YES         | null                           |
| material_principal      | text                        | YES         | null                           |
| tecnica_producao_som    | text                        | YES         | null                           |
| dificuldade_aprendizado | character varying           | YES         | 'iniciante'::character varying |
| anatomia_partes         | jsonb                       | YES         | '{}'::jsonb                    |
| curiosidades            | jsonb                       | YES         | '[]'::jsonb                    |



-- 5. ESTRUTURA DA TABELA AULAS
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'aulas'
ORDER BY ordinal_position;


| column_name       | data_type                   | is_nullable | column_default    |
| ----------------- | --------------------------- | ----------- | ----------------- |
| id                | uuid                        | NO          | gen_random_uuid() |
| numero            | integer                     | NO          | null              |
| titulo            | text                        | NO          | null              |
| modulo_id         | uuid                        | YES         | null              |
| data_programada   | date                        | NO          | null              |
| objetivo_didatico | text                        | YES         | null              |
| resumo_atividades | text                        | YES         | null              |
| desafio_alpha     | text                        | YES         | null              |
| nivel             | text                        | YES         | null              |
| formato           | text                        | YES         | null              |
| status            | text                        | YES         | 'A Fazer'::text   |
| criado_em         | timestamp without time zone | YES         | now()             |
| responsavel_id    | uuid                        | YES         | null              |
| detalhes_aula     | jsonb                       | YES         | null              |



-- 6. ESTRUTURA DA TABELA REPERTORIO
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'repertorio'
ORDER BY ordinal_position;


nada

-- 7. CONTAR REGISTROS EM CADA TABELA
SELECT 
    'profiles' as tabela,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE role = 'admin') as admins,
    COUNT(*) FILTER (WHERE role = 'professor') as professores,
    COUNT(*) FILTER (WHERE role = 'aluno') as alunos
FROM profiles

UNION ALL

SELECT 
    'turmas' as tabela,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE ativo = true) as ativos,
    NULL,
    NULL
FROM turmas

UNION ALL

SELECT 
    'instrumentos' as tabela,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE ativo = true) as ativos,
    NULL,
    NULL
FROM instrumentos

UNION ALL

SELECT 
    'aulas' as tabela,
    COUNT(*) as total,
    NULL,
    NULL,
    NULL
FROM aulas

UNION ALL

SELECT 
    'repertorio' as tabela,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE ativo = true) as ativos,
    NULL,
    NULL
FROM repertorio;

Error: Failed to run sql query: ERROR: 42703: column "role" does not exist LINE 4: COUNT(*) FILTER (WHERE role = 'admin') as admins, ^ HINT: Perhaps you meant to reference the column "profiles.nome".





-- 8. VERIFICAR POLÍTICAS RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

| schemaname | tablename                      | policyname                                           | permissive | roles                | cmd    |
| ---------- | ------------------------------ | ---------------------------------------------------- | ---------- | -------------------- | ------ |
| public     | achievements                   | Achievements are viewable by everyone                | PERMISSIVE | {public}             | SELECT |
| public     | achievements                   | Anyone can view public achievements                  | PERMISSIVE | {public}             | SELECT |
| public     | achievements_progress          | achievements_progress_simple                         | PERMISSIVE | {public}             | ALL    |
| public     | admins                         | admins_simple_access                                 | PERMISSIVE | {public}             | ALL    |
| public     | alpha_badges                   | Permitir leitura de badges                           | PERMISSIVE | {anon,authenticated} | SELECT |
| public     | alpha_badges                   | alpha_badges_select_all                              | PERMISSIVE | {public}             | SELECT |
| public     | alpha_competencias             | Competências são visíveis para todos                 | PERMISSIVE | {public}             | SELECT |
| public     | alpha_competencias             | Permitir leitura de competências                     | PERMISSIVE | {anon,authenticated} | SELECT |
| public     | alpha_desafios                 | Permitir leitura de desafios ativos                  | PERMISSIVE | {anon,authenticated} | SELECT |
| public     | alpha_metodologias             | Metodologias são visíveis para todos                 | PERMISSIVE | {public}             | SELECT |
| public     | alpha_metodologias             | Permitir leitura de metodologias                     | PERMISSIVE | {anon,authenticated} | SELECT |
| public     | alpha_progresso                | Sistema pode gerenciar progresso                     | PERMISSIVE | {public}             | ALL    |
| public     | alpha_progresso                | Usuários veem seu próprio progresso                  | PERMISSIVE | {public}             | SELECT |
| public     | alpha_submissoes               | Admin gerencia todas submissoes alpha                | PERMISSIVE | {authenticated}      | ALL    |
| public     | alpha_submissoes               | Admin vê todas submissoes                            | PERMISSIVE | {authenticated}      | ALL    |
| public     | alpha_submissoes               | Aluno cria próprias submissoes alpha                 | PERMISSIVE | {authenticated}      | INSERT |
| public     | alpha_submissoes               | Aluno vê próprias submissoes                         | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Aluno vê próprias submissoes alpha                   | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Alunos atualizam próprias submissões                 | PERMISSIVE | {authenticated}      | UPDATE |
| public     | alpha_submissoes               | Alunos criam submissões                              | PERMISSIVE | {authenticated}      | INSERT |
| public     | alpha_submissoes               | Alunos veem próprias submissões                      | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Professor avalia submissoes de seus alunos           | PERMISSIVE | {authenticated}      | UPDATE |
| public     | alpha_submissoes               | Professor vê submissoes de alunos                    | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Professor vê submissoes de seus alunos               | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Professores avaliam submissões                       | PERMISSIVE | {authenticated}      | UPDATE |
| public     | alpha_submissoes               | Professores veem todas submissões                    | PERMISSIVE | {authenticated}      | SELECT |
| public     | alpha_submissoes               | Usuários podem atualizar suas submissões             | PERMISSIVE | {public}             | UPDATE |
| public     | alpha_submissoes               | Usuários veem suas próprias submissões               | PERMISSIVE | {public}             | SELECT |
| public     | alunos                         | Admins veem todos alunos                             | PERMISSIVE | {authenticated}      | ALL    |
| public     | alunos                         | Alunos veem próprios dados                           | PERMISSIVE | {authenticated}      | SELECT |
| public     | alunos                         | Professores veem seus alunos                         | PERMISSIVE | {authenticated}      | SELECT |
| public     | audit_activities               | admin_full_access_audit                              | PERMISSIVE | {authenticated}      | ALL    |
| public     | audit_activities               | audit_activities_simple                              | PERMISSIVE | {public}             | SELECT |
| public     | aula_atividades                | Acesso via aula                                      | PERMISSIVE | {authenticated}      | SELECT |
| public     | aula_atividades                | aula_atividades_access                               | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_checklist                 | aula_checklist_access                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_criterios_avaliacao       | aula_criterios_avaliacao_access                      | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_desafio_alpha             | aula_desafio_alpha_access                            | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_desafios                  | alunos_podem_ver_desafios_aulas                      | PERMISSIVE | {authenticated}      | SELECT |
| public     | aula_desafios                  | aula_desafios_access                                 | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_feedback                  | aula_feedback_access                                 | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_feedbacks                 | aula_feedbacks_access                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_materiais                 | alunos_podem_ver_materiais_aulas                     | PERMISSIVE | {authenticated}      | SELECT |
| public     | aula_materiais                 | aula_materiais_access                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_permissoes                | aula_permissoes_admin                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_registros                 | aula_registros_access                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_status_log                | aula_status_log_staff                                | PERMISSIVE | {authenticated}      | ALL    |
| public     | aula_tags                      | aula_tags_read                                       | PERMISSIVE | {authenticated}      | SELECT |
| public     | aulas                          | Admin gerencia todas aulas                           | PERMISSIVE | {authenticated}      | ALL    |
| public     | aulas                          | Professor vê suas aulas                              | PERMISSIVE | {authenticated}      | ALL    |
| public     | aulas                          | alunos_podem_ver_aulas                               | PERMISSIVE | {authenticated}      | SELECT |
| public     | aulas                          | aulas_modify_staff                                   | PERMISSIVE | {authenticated}      | ALL    |
| public     | aulas                          | aulas_read_all                                       | PERMISSIVE | {authenticated}      | SELECT |
| public     | autoavaliacoes                 | Usuários podem atualizar suas autoavaliações         | PERMISSIVE | {public}             | UPDATE |
| public     | autoavaliacoes                 | Usuários podem criar autoavaliações                  | PERMISSIVE | {public}             | INSERT |
| public     | autoavaliacoes                 | Usuários veem suas autoavaliações                    | PERMISSIVE | {public}             | SELECT |
| public     | avaliacoes_rubricas            | Usuários veem avaliações de suas evidências          | PERMISSIVE | {public}             | SELECT |
| public     | cessoes_instrumentos           | cessoes_instrumentos_access                          | PERMISSIVE | {authenticated}      | ALL    |
| public     | devotional_content             | Anyone can view published devotionals                | PERMISSIVE | {public}             | SELECT |
| public     | devotional_content             | Published devotional content is viewable by everyone | PERMISSIVE | {public}             | SELECT |
| public     | feedback_pares                 | Usuários podem dar feedback                          | PERMISSIVE | {public}             | INSERT |
| public     | feedback_pares                 | Usuários veem feedback relacionado a eles            | PERMISSIVE | {public}             | SELECT |
| public     | historia_compositores          | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_conceitos_teoricos    | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_contexto_cultural     | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_eventos_timeline      | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_generos               | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_instrumentos_evolucao | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_movimentos            | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_obras                 | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_periodos              | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_playlists             | Criador gerencia suas playlists                      | PERMISSIVE | {public}             | ALL    |
| public     | historia_playlists             | Playlists publicadas são públicas                    | PERMISSIVE | {public}             | SELECT |
| public     | historia_progresso_usuario     | Usuário gerencia seu progresso                       | PERMISSIVE | {public}             | ALL    |
| public     | historia_progresso_usuario     | Usuário vê apenas seu progresso                      | PERMISSIVE | {public}             | SELECT |
| public     | historia_quiz                  | Conteúdo público - leitura                           | PERMISSIVE | {public}             | SELECT |
| public     | historia_quiz_respostas        | Usuário insere suas respostas                        | PERMISSIVE | {public}             | INSERT |
| public     | historia_quiz_respostas        | Usuário vê apenas suas respostas                     | PERMISSIVE | {public}             | SELECT |
| public     | historico_instrumentos         | historico_instrumentos_access                        | PERMISSIVE | {authenticated}      | ALL    |
| public     | hook_cache                     | users_own_cache                                      | PERMISSIVE | {authenticated}      | ALL    |
| public     | indicadores_impacto            | Usuários podem registrar indicadores                 | PERMISSIVE | {public}             | INSERT |
| public     | indicadores_impacto            | Usuários veem seus indicadores                       | PERMISSIVE | {public}             | SELECT |
| public     | instrumento_curiosidades       | instrumento_curiosidades_read                        | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_midias             | instrumento_midias_read                              | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_performances       | instrumento_performances_read                        | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_quiz               | instrumento_quiz_read                                | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_sons               | instrumento_sons_read                                | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_sons_variacoes     | instrumento_sons_variacoes_read                      | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumento_tecnicas           | instrumento_tecnicas_read                            | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumentos                   | Admin gerencia instrumentos                          | PERMISSIVE | {authenticated}      | ALL    |
| public     | instrumentos                   | Todos veem instrumentos ativos                       | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumentos                   | instrumentos_modify_staff                            | PERMISSIVE | {authenticated}      | ALL    |
| public     | instrumentos                   | instrumentos_read_all                                | PERMISSIVE | {authenticated}      | SELECT |
| public     | instrumentos_alunos            | instrumentos_alunos_access                           | PERMISSIVE | {authenticated}      | ALL    |
| public     | instrumentos_fisicos           | instrumentos_fisicos_access                          | PERMISSIVE | {authenticated}      | ALL    |
| public     | instrumentos_relacionados      | instrumentos_relacionados_read                       | PERMISSIVE | {authenticated}      | SELECT |
| public     | lessons                        | Anyone can view lessons from active modules          | PERMISSIVE | {public}             | SELECT |
| public     | lessons                        | Authenticated users can manage lessons               | PERMISSIVE | {public}             | ALL    |
| public     | lessons                        | Lessons are viewable by everyone                     | PERMISSIVE | {public}             | SELECT |
| public     | lessons                        | Only admins can modify lessons                       | PERMISSIVE | {public}             | ALL    |


-- 9. VERIFICAR SE RLS ESTÁ HABILITADO
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'turmas', 'instrumentos', 'aulas', 'repertorio')
ORDER BY tablename;

| schemaname | tablename    | rowsecurity |
| ---------- | ------------ | ----------- |
| public     | aulas        | true        |
| public     | instrumentos | false       |
| public     | profiles     | true        |
| public     | turmas       | true        |



-- 10. BUSCAR QUALQUER TABELA COM "BIBLIOTECA" NO NOME
SELECT 
    table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE '%biblioteca%';

Success. No rows returned



