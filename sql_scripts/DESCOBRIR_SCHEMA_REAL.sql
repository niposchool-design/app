-- ======================================
-- DESCOBRIR ESTRUTURA REAL DAS TABELAS
-- ======================================

-- 1. Colunas da tabela historia_compositores
SELECT 
  'HISTORIA_COMPOSITORES' as tabela,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'historia_compositores'
ORDER BY ordinal_position;


| tabela                | column_name          | data_type                | is_nullable | column_default    |
| --------------------- | -------------------- | ------------------------ | ----------- | ----------------- |
| HISTORIA_COMPOSITORES | id                   | uuid                     | NO          | gen_random_uuid() |
| HISTORIA_COMPOSITORES | nome_completo        | character varying        | NO          | null              |
| HISTORIA_COMPOSITORES | nome_artistico       | character varying        | YES         | null              |
| HISTORIA_COMPOSITORES | data_nascimento      | date                     | YES         | null              |
| HISTORIA_COMPOSITORES | data_falecimento     | date                     | YES         | null              |
| HISTORIA_COMPOSITORES | pais_nascimento      | character varying        | YES         | null              |
| HISTORIA_COMPOSITORES | cidade_nascimento    | character varying        | YES         | null              |
| HISTORIA_COMPOSITORES | periodo_id           | uuid                     | YES         | null              |
| HISTORIA_COMPOSITORES | biografia_curta      | text                     | YES         | null              |
| HISTORIA_COMPOSITORES | biografia_completa   | text                     | YES         | null              |
| HISTORIA_COMPOSITORES | principais_obras     | ARRAY                    | YES         | null              |
| HISTORIA_COMPOSITORES | estilo_musical       | character varying        | YES         | null              |
| HISTORIA_COMPOSITORES | instrumentos_tocados | ARRAY                    | YES         | null              |
| HISTORIA_COMPOSITORES | curiosidades         | jsonb                    | YES         | null              |
| HISTORIA_COMPOSITORES | foto_url             | text                     | YES         | null              |
| HISTORIA_COMPOSITORES | audio_assinatura_url | text                     | YES         | null              |
| HISTORIA_COMPOSITORES | nivel_importancia    | integer                  | YES         | 1                 |
| HISTORIA_COMPOSITORES | tags                 | ARRAY                    | YES         | null              |
| HISTORIA_COMPOSITORES | ativo                | boolean                  | YES         | true              |
| HISTORIA_COMPOSITORES | created_at           | timestamp with time zone | YES         | now()             |




-- 2. Colunas da tabela instrumentos
SELECT 
  'INSTRUMENTOS' as tabela,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'instrumentos'
ORDER BY ordinal_position;


| tabela       | column_name             | data_type                   | is_nullable | column_default                 |
| ------------ | ----------------------- | --------------------------- | ----------- | ------------------------------ |
| INSTRUMENTOS | id                      | uuid                        | NO          | gen_random_uuid()              |
| INSTRUMENTOS | nome                    | character varying           | NO          | null                           |
| INSTRUMENTOS | categoria               | character varying           | YES         | null                           |
| INSTRUMENTOS | descricao               | text                        | YES         | null                           |
| INSTRUMENTOS | imagem_url              | text                        | YES         | null                           |
| INSTRUMENTOS | ativo                   | boolean                     | YES         | true                           |
| INSTRUMENTOS | ordem_exibicao          | integer                     | YES         | 0                              |
| INSTRUMENTOS | criado_em               | timestamp without time zone | YES         | CURRENT_TIMESTAMP              |
| INSTRUMENTOS | historia                | text                        | YES         | null                           |
| INSTRUMENTOS | origem                  | character varying           | YES         | null                           |
| INSTRUMENTOS | familia_instrumental    | character varying           | YES         | null                           |
| INSTRUMENTOS | material_principal      | text                        | YES         | null                           |
| INSTRUMENTOS | tecnica_producao_som    | text                        | YES         | null                           |
| INSTRUMENTOS | dificuldade_aprendizado | character varying           | YES         | 'iniciante'::character varying |
| INSTRUMENTOS | anatomia_partes         | jsonb                       | YES         | '{}'::jsonb                    |
| INSTRUMENTOS | curiosidades            | jsonb                       | YES         | '[]'::jsonb                    |


-- 3. Colunas da tabela modulos
SELECT 
  'MODULOS' as tabela,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'modulos'
ORDER BY ordinal_position;

| tabela  | column_name | data_type                   | is_nullable | column_default    |
| ------- | ----------- | --------------------------- | ----------- | ----------------- |
| MODULOS | id          | uuid                        | NO          | gen_random_uuid() |
| MODULOS | nome        | text                        | NO          | null              |
| MODULOS | descricao   | text                        | YES         | null              |
| MODULOS | ordem       | integer                     | YES         | null              |
| MODULOS | ativo       | boolean                     | YES         | true              |
| MODULOS | created_at  | timestamp without time zone | YES         | now()             |


-- 4. Verificar se conquistas existe (vimos que NÃO existe)
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name LIKE '%conquista%'
ORDER BY table_name;

Success. No rows returned





-- 5. Verificar tabelas de portfolio
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name LIKE '%portfolio%'
ORDER BY table_name;

| table_name           | num_colunas |
| -------------------- | ----------- |
| portfolio_evidencias | 21          |
| portfolios           | 17          |


-- 6. Todas as colunas de portfolio_evidencias (vimos que EXISTE!)
SELECT 
  'PORTFOLIO_EVIDENCIAS' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'portfolio_evidencias'
ORDER BY ordinal_position;

| tabela               | column_name        | data_type                | is_nullable |
| -------------------- | ------------------ | ------------------------ | ----------- |
| PORTFOLIO_EVIDENCIAS | id                 | uuid                     | NO          |
| PORTFOLIO_EVIDENCIAS | portfolio_id       | uuid                     | YES         |
| PORTFOLIO_EVIDENCIAS | titulo             | character varying        | NO          |
| PORTFOLIO_EVIDENCIAS | descricao          | text                     | YES         |
| PORTFOLIO_EVIDENCIAS | tipo_evidencia     | character varying        | NO          |
| PORTFOLIO_EVIDENCIAS | arquivo_url        | text                     | YES         |
| PORTFOLIO_EVIDENCIAS | arquivo_tipo       | character varying        | YES         |
| PORTFOLIO_EVIDENCIAS | arquivo_tamanho    | bigint                   | YES         |
| PORTFOLIO_EVIDENCIAS | conteudo_texto     | text                     | YES         |
| PORTFOLIO_EVIDENCIAS | link_externo       | text                     | YES         |
| PORTFOLIO_EVIDENCIAS | metadata           | jsonb                    | YES         |
| PORTFOLIO_EVIDENCIAS | ordem              | integer                  | YES         |
| PORTFOLIO_EVIDENCIAS | data_criacao       | timestamp with time zone | YES         |
| PORTFOLIO_EVIDENCIAS | data_evento        | date                     | YES         |
| PORTFOLIO_EVIDENCIAS | aprovado           | boolean                  | YES         |
| PORTFOLIO_EVIDENCIAS | aprovado_por       | uuid                     | YES         |
| PORTFOLIO_EVIDENCIAS | data_aprovacao     | timestamp with time zone | YES         |
| PORTFOLIO_EVIDENCIAS | feedback_professor | text                     | YES         |
| PORTFOLIO_EVIDENCIAS | autoavaliacao      | jsonb                    | YES         |
| PORTFOLIO_EVIDENCIAS | created_at         | timestamp with time zone | YES         |
| PORTFOLIO_EVIDENCIAS | updated_at         | timestamp with time zone | YES         |


-- 7. Todas as colunas de portfolios
SELECT 
  'PORTFOLIOS' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'portfolios'
ORDER BY ordinal_position;

| tabela     | column_name        | data_type                | is_nullable |
| ---------- | ------------------ | ------------------------ | ----------- |
| PORTFOLIOS | id                 | uuid                     | NO          |
| PORTFOLIOS | user_id            | uuid                     | YES         |
| PORTFOLIOS | titulo             | character varying        | NO          |
| PORTFOLIOS | descricao          | text                     | YES         |
| PORTFOLIOS | tipo               | character varying        | YES         |
| PORTFOLIOS | status             | character varying        | YES         |
| PORTFOLIOS | visibilidade       | character varying        | YES         |
| PORTFOLIOS | data_inicio        | date                     | YES         |
| PORTFOLIOS | data_fim           | date                     | YES         |
| PORTFOLIOS | metodologia_id     | uuid                     | YES         |
| PORTFOLIOS | competencia_id     | uuid                     | YES         |
| PORTFOLIOS | tags               | ARRAY                    | YES         |
| PORTFOLIOS | objetivos          | ARRAY                    | YES         |
| PORTFOLIOS | reflexoes_iniciais | text                     | YES         |
| PORTFOLIOS | reflexoes_finais   | text                     | YES         |
| PORTFOLIOS | created_at         | timestamp with time zone | YES         |
| PORTFOLIOS | updated_at         | timestamp with time zone | YES         |

