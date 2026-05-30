-- =============================================
-- RASCUNHO — NÃO APLICADO — requer aprovação
-- =============================================
-- Migration 066 (DRAFT): Integração Alpha <-> Trilha <-> Nível
--
-- ATENÇÃO (regras da empresa):
--   * Este arquivo é um RASCUNHO. NÃO foi aplicado em nenhum banco.
--   * NÃO aplicar em produção (tqlwkgiytdikumtcnizf) sem OK explícito do usuário.
--   * Aplicar primeiro em ambiente de teste/local (eehidnwlwrzqzgytbfsd).
--   * Todo o conteúdo é ADITIVO e idempotente. Defaults preservam o comportamento atual:
--       - alpha_queue.learning_path_step_id começa NULL  -> nada muda no Alpha
--       - learning_path_steps.mastery_required = false    -> gate de domínio desligado
--       - learning_paths.completion_criteria = 'all_steps' -> conclusão como hoje
--   * Antes de aplicar, GUARDAR a definição atual de public.v_alpha_queue (migration 050)
--     para permitir reversão da view.
--
-- Justificativa de cada bloco: ver docs/arquitetura/PROPOSTA_INTEGRACAO_ALPHA_TRILHA_NIVEL.md
-- Convenções seguidas: schema core, IF NOT EXISTS, índices idx_*, views v_*,
--   security_invoker = true, RLS via internal.fn_tenant_id() / internal.fn_has_role().
-- =============================================


-- =============================================
-- GAP (a) — Ponte Alpha -> Trilha
-- =============================================

-- 1. Coluna de ligação alpha_queue -> learning_path_step
--    Quando preenchida, o item da fila representa o próximo passo da trilha ativa.
--    NULL (default) = item gerado por IA, comportamento atual.
ALTER TABLE core.alpha_queue
    ADD COLUMN IF NOT EXISTS learning_path_step_id uuid
    REFERENCES core.learning_path_steps(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_alpha_queue_path_step
    ON core.alpha_queue(learning_path_step_id)
    WHERE learning_path_step_id IS NOT NULL;

COMMENT ON COLUMN core.alpha_queue.learning_path_step_id IS
    'Passo de trilha que originou este item da fila (NULL = item gerado por IA).';


-- =============================================
-- GAP (c) — Gate de domínio configurável (default DESLIGADO)
-- =============================================

-- 2. Critério de domínio por PASSO de trilha.
--    Default mastery_required = false => completeStep ignora o gate (fluxo atual).
ALTER TABLE core.learning_path_steps
    ADD COLUMN IF NOT EXISTS mastery_required boolean NOT NULL DEFAULT false;

ALTER TABLE core.learning_path_steps
    ADD COLUMN IF NOT EXISTS mastery_min_score numeric(5,2);

-- mastery_source: de onde vem a nota usada no gate.
--   'none'      = sem nota (passo nunca bloqueia por nota)
--   'challenge' = core.challenge_submissions.grade do reference_id
--   'portfolio' = core.portfolios.grade do reference_id
--   'lesson'    = aula (sem nota hoje; reservado)
ALTER TABLE core.learning_path_steps
    ADD COLUMN IF NOT EXISTS mastery_source varchar(20) NOT NULL DEFAULT 'none';

-- CHECK idempotente para mastery_source (cria só se ainda não existir).
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_lps_mastery_source'
    ) THEN
        ALTER TABLE core.learning_path_steps
            ADD CONSTRAINT chk_lps_mastery_source
            CHECK (mastery_source IN ('none', 'challenge', 'portfolio', 'lesson'));
    END IF;
END $$;

COMMENT ON COLUMN core.learning_path_steps.mastery_required IS
    'Se true, completeStep exige nota mínima antes de concluir o passo. Default false = fluxo soft atual.';
COMMENT ON COLUMN core.learning_path_steps.mastery_min_score IS
    'Nota mínima para liberar o passo (escala conforme mastery_source). NULL = sem mínimo.';
COMMENT ON COLUMN core.learning_path_steps.mastery_source IS
    'Fonte da nota do gate: none | challenge | portfolio | lesson.';


-- 3. Critério de conclusão por TRILHA.
--    Default 'all_steps' => fecha quando todos os passos concluídos (regra atual).
ALTER TABLE core.learning_paths
    ADD COLUMN IF NOT EXISTS completion_criteria varchar(20) NOT NULL DEFAULT 'all_steps';

ALTER TABLE core.learning_paths
    ADD COLUMN IF NOT EXISTS completion_min_percent integer;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_lp_completion_criteria'
    ) THEN
        ALTER TABLE core.learning_paths
            ADD CONSTRAINT chk_lp_completion_criteria
            CHECK (completion_criteria IN ('all_steps', 'percent', 'capstone'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_lp_completion_min_percent'
    ) THEN
        ALTER TABLE core.learning_paths
            ADD CONSTRAINT chk_lp_completion_min_percent
            CHECK (completion_min_percent IS NULL OR completion_min_percent BETWEEN 1 AND 100);
    END IF;
END $$;

COMMENT ON COLUMN core.learning_paths.completion_criteria IS
    'Critério de conclusão da trilha: all_steps (default, regra atual) | percent | capstone.';
COMMENT ON COLUMN core.learning_paths.completion_min_percent IS
    'Percentual mínimo de passos para concluir quando completion_criteria = percent (1..100).';


-- =============================================
-- GAP (b) — Níveis de currículo (ano <-> nível) ligados à progressão
-- =============================================

-- 4. core.curriculum_levels — espelho relacional de lib/lessons/constants.ts.
--    Read-only para o app na fase inicial; constants.ts segue como fonte do front.
CREATE TABLE IF NOT EXISTS core.curriculum_levels (
    id                              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id                       uuid NOT NULL REFERENCES iam.tenants(id) ON DELETE CASCADE,
    year                            integer NOT NULL CHECK (year IN (1, 2)),
    slug                            varchar(40) NOT NULL,   -- 'iniciante', 'retomada', ...
    label                           text NOT NULL,
    order_index                     integer NOT NULL DEFAULT 0,
    lesson_number_min               integer,                -- faixa de aulas (referência)
    lesson_number_max               integer,
    prerequisite_lessons_completed  integer NOT NULL DEFAULT 0, -- régua de constants.ts
    emoji                           varchar(8),
    color                           varchar(20),
    is_active                       boolean NOT NULL DEFAULT true,
    created_at                      timestamptz NOT NULL DEFAULT now(),
    UNIQUE(tenant_id, year, slug)
);

CREATE INDEX IF NOT EXISTS idx_curriculum_levels_tenant ON core.curriculum_levels(tenant_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_levels_year ON core.curriculum_levels(tenant_id, year, order_index);

-- 5. (opcional) ligar uma TRILHA a um nível de currículo:
--    concluir a trilha promove o aluno àquele nível.
ALTER TABLE core.learning_paths
    ADD COLUMN IF NOT EXISTS curriculum_level_id uuid
    REFERENCES core.curriculum_levels(id) ON DELETE SET NULL;

COMMENT ON COLUMN core.learning_paths.curriculum_level_id IS
    'Nível de currículo que esta trilha representa; concluir a trilha registra esse nível.';

-- 6. core.user_curriculum_level — nível pedagógico atingido por aluno.
--    Dimensão PARALELA a user_progress.level (gamificação por pontos) — NÃO a substitui.
CREATE TABLE IF NOT EXISTS core.user_curriculum_level (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           uuid NOT NULL REFERENCES iam.tenants(id) ON DELETE CASCADE,
    user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    curriculum_level_id uuid NOT NULL REFERENCES core.curriculum_levels(id) ON DELETE CASCADE,
    reached_at          timestamptz NOT NULL DEFAULT now(),
    source              varchar(20) NOT NULL DEFAULT 'lessons', -- 'lessons' | 'path' | 'manual'
    UNIQUE(user_id, curriculum_level_id)
);

CREATE INDEX IF NOT EXISTS idx_user_curr_level_user ON core.user_curriculum_level(user_id);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_ucl_source'
    ) THEN
        ALTER TABLE core.user_curriculum_level
            ADD CONSTRAINT chk_ucl_source
            CHECK (source IN ('lessons', 'path', 'manual'));
    END IF;
END $$;


-- =============================================
-- RLS (mesmo padrão das migrations 050/052)
-- =============================================

-- curriculum_levels: todos do tenant leem; admin/teacher escrevem.
ALTER TABLE core.curriculum_levels ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='core' AND tablename='curriculum_levels' AND policyname='tenant_read_curriculum_levels') THEN
        CREATE POLICY tenant_read_curriculum_levels ON core.curriculum_levels
            FOR SELECT TO authenticated
            USING (tenant_id = (SELECT internal.fn_tenant_id()));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='core' AND tablename='curriculum_levels' AND policyname='admin_teacher_write_curriculum_levels') THEN
        CREATE POLICY admin_teacher_write_curriculum_levels ON core.curriculum_levels
            FOR ALL TO authenticated
            USING (
                tenant_id = (SELECT internal.fn_tenant_id())
                AND (SELECT internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))
            )
            WITH CHECK (
                tenant_id = (SELECT internal.fn_tenant_id())
                AND (SELECT internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))
            );
    END IF;
END $$;

-- user_curriculum_level: aluno lê o próprio; admin/teacher gerenciam tudo.
ALTER TABLE core.user_curriculum_level ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='core' AND tablename='user_curriculum_level' AND policyname='own_read_curriculum_level') THEN
        CREATE POLICY own_read_curriculum_level ON core.user_curriculum_level
            FOR SELECT TO authenticated
            USING (tenant_id = (SELECT internal.fn_tenant_id()) AND user_id = auth.uid());
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='core' AND tablename='user_curriculum_level' AND policyname='admin_teacher_all_curriculum_level') THEN
        CREATE POLICY admin_teacher_all_curriculum_level ON core.user_curriculum_level
            FOR ALL TO authenticated
            USING (
                tenant_id = (SELECT internal.fn_tenant_id())
                AND (SELECT internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))
            )
            WITH CHECK (
                tenant_id = (SELECT internal.fn_tenant_id())
            );
    END IF;
END $$;


-- =============================================
-- Passthrough views (apenas onde o app precisa gravar via PostgREST)
-- =============================================
-- curriculum_levels: leitura é suficiente via view enriquecida -> sem passthrough de escrita
--   (admin gerencia por seed/migration; evita expor escrita sem necessidade).
-- user_curriculum_level: o registro é feito por RPC server-side; expomos passthrough de
--   leitura/escrita restrita por RLS para flexibilidade do server action, seguindo 050.

CREATE OR REPLACE VIEW public.user_curriculum_level
WITH (security_invoker = true)
AS SELECT * FROM core.user_curriculum_level;

GRANT SELECT, INSERT, UPDATE ON public.user_curriculum_level TO authenticated;


-- =============================================
-- Enriched views (v_*)
-- =============================================

-- 7. v_curriculum_levels — leitura dos níveis de currículo.
CREATE OR REPLACE VIEW public.v_curriculum_levels
WITH (security_invoker = true)
AS
SELECT
    cl.id,
    cl.tenant_id,
    cl.year,
    cl.slug,
    cl.label,
    cl.order_index,
    cl.lesson_number_min,
    cl.lesson_number_max,
    cl.prerequisite_lessons_completed,
    cl.emoji,
    cl.color,
    cl.is_active,
    cl.created_at
FROM core.curriculum_levels cl;

GRANT SELECT ON public.v_curriculum_levels TO authenticated;

-- 8. v_user_curriculum_level — nível pedagógico atingido, enriquecido.
CREATE OR REPLACE VIEW public.v_user_curriculum_level
WITH (security_invoker = true)
AS
SELECT
    ucl.id,
    ucl.tenant_id,
    ucl.user_id,
    ucl.curriculum_level_id,
    ucl.reached_at,
    ucl.source,
    cl.year,
    cl.slug,
    cl.label,
    cl.order_index,
    cl.emoji,
    cl.color
FROM core.user_curriculum_level ucl
JOIN core.curriculum_levels cl ON cl.id = ucl.curriculum_level_id;

GRANT SELECT ON public.v_user_curriculum_level TO authenticated;

-- 9. v_alpha_queue — RECRIADA de forma ADITIVA (mantém TODAS as colunas da migration 050
--    e acrescenta o vínculo com a trilha). Reversão: restaurar a definição da 050.
CREATE OR REPLACE VIEW public.v_alpha_queue
WITH (security_invoker = true)
AS
SELECT
    q.id,
    q.tenant_id,
    q.user_id,
    q.source_type,
    q.source_id,
    q.item_type,
    q.title,
    q.description,
    q.content,
    q.difficulty,
    q.points_reward,
    q.priority,
    q.status,
    q.expires_at,
    q.completed_at,
    q.created_at,
    q.learning_path_step_id,                                   -- NOVO
    CASE WHEN q.source_type = 'lesson' THEN l.title END AS lesson_title,
    CASE WHEN q.source_type = 'lesson' THEN l.number END AS lesson_number,
    CASE WHEN q.source_type = 'challenge' THEN ch.title END AS challenge_title,
    s.title AS path_step_title,                                -- NOVO
    s.path_id AS path_id,                                      -- NOVO
    lp.title AS path_title                                     -- NOVO
FROM core.alpha_queue q
LEFT JOIN core.lessons l ON q.source_type = 'lesson' AND l.id = q.source_id
LEFT JOIN core.challenges ch ON q.source_type = 'challenge' AND ch.id = q.source_id
LEFT JOIN core.learning_path_steps s ON s.id = q.learning_path_step_id
LEFT JOIN core.learning_paths lp ON lp.id = s.path_id;

GRANT SELECT ON public.v_alpha_queue TO authenticated;


-- =============================================
-- RPC — recálculo NÃO-BLOQUEANTE do nível de currículo
-- =============================================
-- Registra o nível de currículo mais alto cujo pré-requisito de aulas concluídas o
-- aluno já atingiu. Idempotente (ON CONFLICT DO NOTHING). NÃO mexe em user_progress.level.
-- SECURITY DEFINER + tenant fixado pelo claim, no padrão dos demais RPCs do projeto.
CREATE OR REPLACE FUNCTION public.rpc_recalc_curriculum_level(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core, public
AS $$
DECLARE
    v_tenant_id uuid := (SELECT internal.fn_tenant_id());
    v_completed integer;
    v_level     record;
BEGIN
    -- Total de aulas concluídas pelo aluno no tenant.
    SELECT count(*) INTO v_completed
    FROM core.lesson_progress lpx
    WHERE lpx.student_id = p_user_id
      AND lpx.is_completed = true;

    -- Para cada nível cujo pré-requisito é satisfeito, registrar (idempotente).
    FOR v_level IN
        SELECT id
        FROM core.curriculum_levels
        WHERE tenant_id = v_tenant_id
          AND is_active = true
          AND prerequisite_lessons_completed <= v_completed
    LOOP
        INSERT INTO core.user_curriculum_level (tenant_id, user_id, curriculum_level_id, source)
        VALUES (v_tenant_id, p_user_id, v_level.id, 'lessons')
        ON CONFLICT (user_id, curriculum_level_id) DO NOTHING;
    END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.rpc_recalc_curriculum_level(uuid) TO authenticated;


-- =============================================
-- SEED — níveis de currículo (espelho de lib/lessons/constants.ts)
-- Idempotente via ON CONFLICT. Tenant Nipo School: 00000000-0000-0000-0000-000000000001
-- =============================================
-- Ano 1 (2025) — 4 níveis
INSERT INTO core.curriculum_levels
    (tenant_id, year, slug, label, order_index, lesson_number_min, lesson_number_max, prerequisite_lessons_completed, emoji, color)
VALUES
    ('00000000-0000-0000-0000-000000000001', 1, 'iniciante',     'Iniciante',     1, 0,  6,  0,  '🌱', 'green'),
    ('00000000-0000-0000-0000-000000000001', 1, 'intermediario', 'Intermediário', 2, 7,  12, 5,  '🌿', 'yellow'),
    ('00000000-0000-0000-0000-000000000001', 1, 'avancado',      'Avançado',      3, 13, 20, 10, '🌳', 'red'),
    ('00000000-0000-0000-0000-000000000001', 1, 'showFinal',     'Show Final',    4, 25, 29, 20, '🎭', 'blue')
ON CONFLICT (tenant_id, year, slug) DO NOTHING;

-- Ano 2 (2026) — 7 níveis
INSERT INTO core.curriculum_levels
    (tenant_id, year, slug, label, order_index, lesson_number_min, lesson_number_max, prerequisite_lessons_completed, emoji, color)
VALUES
    ('00000000-0000-0000-0000-000000000001', 2, 'retomada',        'Retomada',        1, 30, 35, 25, '🔄', 'green'),
    ('00000000-0000-0000-0000-000000000001', 2, 'aprofundamento',  'Aprofundamento',  2, 36, 41, 30, '🎯', 'yellow'),
    ('00000000-0000-0000-0000-000000000001', 2, 'criacao',         'Criação',         3, 42, 47, 36, '💡', 'orange'),
    ('00000000-0000-0000-0000-000000000001', 2, 'cultura',         'Cultura',         4, 48, 53, 42, '🌍', 'purple'),
    ('00000000-0000-0000-0000-000000000001', 2, 'performance',     'Performance',     5, 54, 59, 48, '🎤', 'red'),
    ('00000000-0000-0000-0000-000000000001', 2, 'projetos',        'Projetos',        6, 60, 65, 54, '🎬', 'amber'),
    ('00000000-0000-0000-0000-000000000001', 2, 'formatura',       'Formatura',       7, 66, 69, 60, '🎓', 'blue')
ON CONFLICT (tenant_id, year, slug) DO NOTHING;


-- =============================================
-- Recarregar cache de schema do PostgREST
-- =============================================
NOTIFY pgrst, 'reload schema';

-- =============================================
-- FIM DO RASCUNHO 066 — NÃO APLICADO
-- =============================================
