-- Descobrir estrutura real das tabelas Alpha
SELECT table_name, column_name, data_type 
FROM information_schema.columns
WHERE table_name IN ('alpha_desafios', 'alpha_metodologias', 'alpha_badges', 'alpha_competencias')
  AND table_schema = 'public'
ORDER BY table_name, ordinal_position;



| table_name         | column_name             | data_type                |
| ------------------ | ----------------------- | ------------------------ |
| alpha_badges       | id                      | uuid                     |
| alpha_badges       | codigo                  | character varying        |
| alpha_badges       | nome                    | character varying        |
| alpha_badges       | descricao               | text                     |
| alpha_badges       | descricao_conquista     | text                     |
| alpha_badges       | icone                   | character varying        |
| alpha_badges       | imagem_url              | text                     |
| alpha_badges       | categoria               | character varying        |
| alpha_badges       | pilar_alpha             | integer                  |
| alpha_badges       | raridade                | character varying        |
| alpha_badges       | valor_xp_bonus          | integer                  |
| alpha_badges       | cor_tematica            | character varying        |
| alpha_badges       | criterio_desbloqueio    | jsonb                    |
| alpha_badges       | recompensas             | jsonb                    |
| alpha_badges       | visivel                 | boolean                  |
| alpha_badges       | secreto                 | boolean                  |
| alpha_badges       | criado_em               | timestamp with time zone |
| alpha_badges       | atualizado_em           | timestamp with time zone |
| alpha_competencias | id                      | uuid                     |
| alpha_competencias | metodologia_id          | uuid                     |
| alpha_competencias | codigo                  | character varying        |
| alpha_competencias | nome                    | character varying        |
| alpha_competencias | descricao               | text                     |
| alpha_competencias | categoria               | character varying        |
| alpha_competencias | nivel_complexidade      | integer                  |
| alpha_competencias | pre_requisitos          | ARRAY                    |
| alpha_competencias | ordem                   | integer                  |
| alpha_competencias | ativo                   | boolean                  |
| alpha_competencias | created_at              | timestamp with time zone |
| alpha_desafios     | id                      | uuid                     |
| alpha_desafios     | codigo                  | character varying        |
| alpha_desafios     | titulo                  | character varying        |
| alpha_desafios     | descricao               | text                     |
| alpha_desafios     | subtitulo               | character varying        |
| alpha_desafios     | objetivos               | ARRAY                    |
| alpha_desafios     | tipo                    | character varying        |
| alpha_desafios     | tipo_desafio            | character varying        |
| alpha_desafios     | categoria               | character varying        |
| alpha_desafios     | dificuldade             | integer                  |
| alpha_desafios     | metodologia_id          | uuid                     |
| alpha_desafios     | pontos_base             | integer                  |
| alpha_desafios     | pontos_recompensa       | integer                  |
| alpha_desafios     | pontos_bonus            | integer                  |
| alpha_desafios     | badge_id                | uuid                     |
| alpha_desafios     | criterios_conclusao     | jsonb                    |
| alpha_desafios     | criterios_avaliacao     | jsonb                    |
| alpha_desafios     | recursos_necessarios    | jsonb                    |
| alpha_desafios     | prazo_dias              | integer                  |
| alpha_desafios     | data_inicio             | timestamp with time zone |
| alpha_desafios     | data_fim                | timestamp with time zone |
| alpha_desafios     | dias_bonus_velocidade   | integer                  |
| alpha_desafios     | imagem_url              | text                     |
| alpha_desafios     | icone                   | character varying        |
| alpha_desafios     | cor_tematica            | character varying        |
| alpha_desafios     | ordem                   | integer                  |
| alpha_desafios     | ordem_exibicao          | integer                  |
| alpha_desafios     | ativo                   | boolean                  |
| alpha_desafios     | visivel_para            | character varying        |
| alpha_desafios     | limite_participantes    | integer                  |
| alpha_desafios     | total_participantes     | integer                  |
| alpha_desafios     | total_concluintes       | integer                  |
| alpha_desafios     | created_at              | timestamp with time zone |
| alpha_desafios     | updated_at              | timestamp with time zone |
| alpha_metodologias | id                      | uuid                     |
| alpha_metodologias | codigo                  | character varying        |
| alpha_metodologias | nome                    | character varying        |
| alpha_metodologias | criador                 | character varying        |
| alpha_metodologias | pais_origem             | character varying        |
| alpha_metodologias | periodo                 | character varying        |
| alpha_metodologias | descricao_curta         | text                     |
| alpha_metodologias | descricao_completa      | text                     |
| alpha_metodologias | principios_fundamentais | ARRAY                    |
| alpha_metodologias | filosofia               | text                     |
| alpha_metodologias | publico_alvo            | text                     |
| alpha_metodologias | instrumentos_principais | ARRAY                    |
| alpha_metodologias | metodologia_ensino      | text                     |
| alpha_metodologias | pontos_fortes           | ARRAY                    |
| alpha_metodologias | limitacoes              | ARRAY                    |
| alpha_metodologias | aplicacao_brasil        | text                     |
| alpha_metodologias | nivel_dificuldade       | integer                  |
| alpha_metodologias | idade_minima            | integer                  |
| alpha_metodologias | recursos_necessarios    | ARRAY                    |
| alpha_metodologias | cor_tema                | character varying        |
| alpha_metodologias | icone                   | character varying        |
| alpha_metodologias | ordem_apresentacao      | integer                  |
| alpha_metodologias | ativo                   | boolean                  |
| alpha_metodologias | created_at              | timestamp with time zone |
| alpha_metodologias | updated_at              | timestamp with time zone |