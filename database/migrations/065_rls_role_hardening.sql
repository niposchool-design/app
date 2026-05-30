-- =============================================================================
-- 065_rls_role_hardening.sql
-- Corrige Broken Access Control (OWASP A01 / R-024 / R-009): ~57 tabelas core
-- tinham policy unica "tenant_isolation" (FOR ALL, so-tenant) -> qualquer aluno
-- lia E escrevia tudo do tenant. Aqui separamos SELECT de escrita e gateamos
-- escrita por role/own. Padrao copiado de library_items/learning_paths.
-- Helpers: internal.fn_tenant_id(), internal.fn_has_role('admin'|'teacher'), auth.uid()
-- Colunas de dono confirmadas no banco vivo. RPCs de gamificacao sao SECURITY
-- DEFINER, entao escrita staff-only nas tabelas de pontos NAO quebra a pontuacao.
-- Idempotente (DROP POLICY IF EXISTS). Rollback comentado no fim.
-- =============================================================================

BEGIN;

-- ============ BALDE A: CONTEUDO COMPARTILHADO (SELECT tenant, escrita staff) ============

-- core.lessons (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lessons;
DROP POLICY IF EXISTS "content_select" ON core.lessons;
DROP POLICY IF EXISTS "content_write" ON core.lessons;
CREATE POLICY content_select ON core.lessons FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.lessons FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.lesson_activities (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_activities;
DROP POLICY IF EXISTS "content_select" ON core.lesson_activities;
DROP POLICY IF EXISTS "content_write" ON core.lesson_activities;
CREATE POLICY content_select ON core.lesson_activities FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.lesson_activities FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.lesson_materials (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_materials;
DROP POLICY IF EXISTS "content_select" ON core.lesson_materials;
DROP POLICY IF EXISTS "content_write" ON core.lesson_materials;
CREATE POLICY content_select ON core.lesson_materials FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.lesson_materials FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.lesson_checklists (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_checklists;
DROP POLICY IF EXISTS "content_select" ON core.lesson_checklists;
DROP POLICY IF EXISTS "content_write" ON core.lesson_checklists;
CREATE POLICY content_select ON core.lesson_checklists FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.lesson_checklists FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.lesson_tags (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_tags;
DROP POLICY IF EXISTS "content_select" ON core.lesson_tags;
DROP POLICY IF EXISTS "content_write" ON core.lesson_tags;
CREATE POLICY content_select ON core.lesson_tags FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.lesson_tags FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.courses (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.courses;
DROP POLICY IF EXISTS "content_select" ON core.courses;
DROP POLICY IF EXISTS "content_write" ON core.courses;
CREATE POLICY content_select ON core.courses FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.courses FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.modules (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.modules;
DROP POLICY IF EXISTS "content_select" ON core.modules;
DROP POLICY IF EXISTS "content_write" ON core.modules;
CREATE POLICY content_select ON core.modules FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.modules FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.challenges (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.challenges;
DROP POLICY IF EXISTS "content_select" ON core.challenges;
DROP POLICY IF EXISTS "content_write" ON core.challenges;
CREATE POLICY content_select ON core.challenges FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.challenges FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instruments (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instruments;
DROP POLICY IF EXISTS "content_select" ON core.instruments;
DROP POLICY IF EXISTS "content_write" ON core.instruments;
CREATE POLICY content_select ON core.instruments FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instruments FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_facts (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_facts;
DROP POLICY IF EXISTS "content_select" ON core.instrument_facts;
DROP POLICY IF EXISTS "content_write" ON core.instrument_facts;
CREATE POLICY content_select ON core.instrument_facts FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_facts FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_inventory (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_inventory;
DROP POLICY IF EXISTS "content_select" ON core.instrument_inventory;
DROP POLICY IF EXISTS "content_write" ON core.instrument_inventory;
CREATE POLICY content_select ON core.instrument_inventory FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_inventory FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_media (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_media;
DROP POLICY IF EXISTS "content_select" ON core.instrument_media;
DROP POLICY IF EXISTS "content_write" ON core.instrument_media;
CREATE POLICY content_select ON core.instrument_media FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_media FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_performances (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_performances;
DROP POLICY IF EXISTS "content_select" ON core.instrument_performances;
DROP POLICY IF EXISTS "content_write" ON core.instrument_performances;
CREATE POLICY content_select ON core.instrument_performances FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_performances FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_quizzes (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_quizzes;
DROP POLICY IF EXISTS "content_select" ON core.instrument_quizzes;
DROP POLICY IF EXISTS "content_write" ON core.instrument_quizzes;
CREATE POLICY content_select ON core.instrument_quizzes FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_quizzes FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_relations (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_relations;
DROP POLICY IF EXISTS "content_select" ON core.instrument_relations;
DROP POLICY IF EXISTS "content_write" ON core.instrument_relations;
CREATE POLICY content_select ON core.instrument_relations FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_relations FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_sounds (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_sounds;
DROP POLICY IF EXISTS "content_select" ON core.instrument_sounds;
DROP POLICY IF EXISTS "content_write" ON core.instrument_sounds;
CREATE POLICY content_select ON core.instrument_sounds FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_sounds FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.instrument_techniques (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.instrument_techniques;
DROP POLICY IF EXISTS "content_select" ON core.instrument_techniques;
DROP POLICY IF EXISTS "content_write" ON core.instrument_techniques;
CREATE POLICY content_select ON core.instrument_techniques FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.instrument_techniques FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.repertoire (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.repertoire;
DROP POLICY IF EXISTS "content_select" ON core.repertoire;
DROP POLICY IF EXISTS "content_write" ON core.repertoire;
CREATE POLICY content_select ON core.repertoire FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.repertoire FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.repertoire_categories (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.repertoire_categories;
DROP POLICY IF EXISTS "content_select" ON core.repertoire_categories;
DROP POLICY IF EXISTS "content_write" ON core.repertoire_categories;
CREATE POLICY content_select ON core.repertoire_categories FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.repertoire_categories FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.methodologies (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.methodologies;
DROP POLICY IF EXISTS "content_select" ON core.methodologies;
DROP POLICY IF EXISTS "content_write" ON core.methodologies;
CREATE POLICY content_select ON core.methodologies FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.methodologies FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.competencies (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.competencies;
DROP POLICY IF EXISTS "content_select" ON core.competencies;
DROP POLICY IF EXISTS "content_write" ON core.competencies;
CREATE POLICY content_select ON core.competencies FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.competencies FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.evaluation_criteria (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.evaluation_criteria;
DROP POLICY IF EXISTS "content_select" ON core.evaluation_criteria;
DROP POLICY IF EXISTS "content_write" ON core.evaluation_criteria;
CREATE POLICY content_select ON core.evaluation_criteria FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.evaluation_criteria FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.evaluation_rubrics (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.evaluation_rubrics;
DROP POLICY IF EXISTS "content_select" ON core.evaluation_rubrics;
DROP POLICY IF EXISTS "content_write" ON core.evaluation_rubrics;
CREATE POLICY content_select ON core.evaluation_rubrics FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.evaluation_rubrics FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.support_materials (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.support_materials;
DROP POLICY IF EXISTS "content_select" ON core.support_materials;
DROP POLICY IF EXISTS "content_write" ON core.support_materials;
CREATE POLICY content_select ON core.support_materials FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.support_materials FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.teaching_sequences (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.teaching_sequences;
DROP POLICY IF EXISTS "content_select" ON core.teaching_sequences;
DROP POLICY IF EXISTS "content_write" ON core.teaching_sequences;
CREATE POLICY content_select ON core.teaching_sequences FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.teaching_sequences FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.achievements (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.achievements;
DROP POLICY IF EXISTS "content_select" ON core.achievements;
DROP POLICY IF EXISTS "content_write" ON core.achievements;
CREATE POLICY content_select ON core.achievements FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.achievements FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.qr_codes (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.qr_codes;
DROP POLICY IF EXISTS "content_select" ON core.qr_codes;
DROP POLICY IF EXISTS "content_write" ON core.qr_codes;
CREATE POLICY content_select ON core.qr_codes FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.qr_codes FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_composers (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_composers;
DROP POLICY IF EXISTS "content_select" ON core.history_composers;
DROP POLICY IF EXISTS "content_write" ON core.history_composers;
CREATE POLICY content_select ON core.history_composers FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_composers FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_cultural_contexts (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_cultural_contexts;
DROP POLICY IF EXISTS "content_select" ON core.history_cultural_contexts;
DROP POLICY IF EXISTS "content_write" ON core.history_cultural_contexts;
CREATE POLICY content_select ON core.history_cultural_contexts FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_cultural_contexts FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_genres (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_genres;
DROP POLICY IF EXISTS "content_select" ON core.history_genres;
DROP POLICY IF EXISTS "content_write" ON core.history_genres;
CREATE POLICY content_select ON core.history_genres FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_genres FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_instrument_evolution (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_instrument_evolution;
DROP POLICY IF EXISTS "content_select" ON core.history_instrument_evolution;
DROP POLICY IF EXISTS "content_write" ON core.history_instrument_evolution;
CREATE POLICY content_select ON core.history_instrument_evolution FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_instrument_evolution FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_movements (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_movements;
DROP POLICY IF EXISTS "content_select" ON core.history_movements;
DROP POLICY IF EXISTS "content_write" ON core.history_movements;
CREATE POLICY content_select ON core.history_movements FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_movements FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_periods (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_periods;
DROP POLICY IF EXISTS "content_select" ON core.history_periods;
DROP POLICY IF EXISTS "content_write" ON core.history_periods;
CREATE POLICY content_select ON core.history_periods FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_periods FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_quizzes (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_quizzes;
DROP POLICY IF EXISTS "content_select" ON core.history_quizzes;
DROP POLICY IF EXISTS "content_write" ON core.history_quizzes;
CREATE POLICY content_select ON core.history_quizzes FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_quizzes FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_theory_concepts (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_theory_concepts;
DROP POLICY IF EXISTS "content_select" ON core.history_theory_concepts;
DROP POLICY IF EXISTS "content_write" ON core.history_theory_concepts;
CREATE POLICY content_select ON core.history_theory_concepts FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_theory_concepts FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_timeline_events (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_timeline_events;
DROP POLICY IF EXISTS "content_select" ON core.history_timeline_events;
DROP POLICY IF EXISTS "content_write" ON core.history_timeline_events;
CREATE POLICY content_select ON core.history_timeline_events FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_timeline_events FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.history_works (conteudo compartilhado)
DROP POLICY IF EXISTS "tenant_isolation" ON core.history_works;
DROP POLICY IF EXISTS "content_select" ON core.history_works;
DROP POLICY IF EXISTS "content_write" ON core.history_works;
CREATE POLICY content_select ON core.history_works FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY content_write ON core.history_works FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- ============ BALDE B1: PESSOAL escrita STAFF-ONLY (pontos/nota/presenca via RPC DEFINER) ============

-- core.points_log (dado pessoal; escrita staff/sistema; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.points_log;
DROP POLICY IF EXISTS "personal_select" ON core.points_log;
DROP POLICY IF EXISTS "personal_write" ON core.points_log;
CREATE POLICY personal_select ON core.points_log FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.points_log FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.user_progress (dado pessoal; escrita staff/sistema; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.user_progress;
DROP POLICY IF EXISTS "personal_select" ON core.user_progress;
DROP POLICY IF EXISTS "personal_write" ON core.user_progress;
CREATE POLICY personal_select ON core.user_progress FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.user_progress FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.user_achievements (dado pessoal; escrita staff/sistema; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.user_achievements;
DROP POLICY IF EXISTS "personal_select" ON core.user_achievements;
DROP POLICY IF EXISTS "personal_write" ON core.user_achievements;
CREATE POLICY personal_select ON core.user_achievements FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.user_achievements FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.lesson_progress (dado pessoal; escrita staff/sistema; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_progress;
DROP POLICY IF EXISTS "personal_select" ON core.lesson_progress;
DROP POLICY IF EXISTS "personal_write" ON core.lesson_progress;
CREATE POLICY personal_select ON core.lesson_progress FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.lesson_progress FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.attendance (dado pessoal; escrita staff/sistema; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.attendance;
DROP POLICY IF EXISTS "personal_select" ON core.attendance;
DROP POLICY IF EXISTS "personal_write" ON core.attendance;
CREATE POLICY personal_select ON core.attendance FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.attendance FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- core.enrollments (matricula; aluno ve a propria, staff ve todas; escrita staff; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.enrollments;
DROP POLICY IF EXISTS "personal_select" ON core.enrollments;
DROP POLICY IF EXISTS "personal_write" ON core.enrollments;
CREATE POLICY personal_select ON core.enrollments FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.enrollments FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher'))));

-- ============ BALDE B2: PESSOAL escrita OWN+STAFF (aluno cria o proprio) ============

-- core.portfolios (dado pessoal; escrita do proprio + staff; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.portfolios;
DROP POLICY IF EXISTS "personal_select" ON core.portfolios;
DROP POLICY IF EXISTS "personal_write" ON core.portfolios;
CREATE POLICY personal_select ON core.portfolios FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.portfolios FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.challenge_submissions (dado pessoal; escrita do proprio + staff; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.challenge_submissions;
DROP POLICY IF EXISTS "personal_select" ON core.challenge_submissions;
DROP POLICY IF EXISTS "personal_write" ON core.challenge_submissions;
CREATE POLICY personal_select ON core.challenge_submissions FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.challenge_submissions FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.practice_sessions (dado pessoal; escrita do proprio + staff; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.practice_sessions;
DROP POLICY IF EXISTS "personal_select" ON core.practice_sessions;
DROP POLICY IF EXISTS "personal_write" ON core.practice_sessions;
CREATE POLICY personal_select ON core.practice_sessions FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.practice_sessions FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.lesson_favorites (dado pessoal; escrita do proprio + staff; dono: student_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_favorites;
DROP POLICY IF EXISTS "personal_select" ON core.lesson_favorites;
DROP POLICY IF EXISTS "personal_write" ON core.lesson_favorites;
CREATE POLICY personal_select ON core.lesson_favorites FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.lesson_favorites FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (student_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.methodology_progress (dado pessoal; escrita do proprio + staff; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.methodology_progress;
DROP POLICY IF EXISTS "personal_select" ON core.methodology_progress;
DROP POLICY IF EXISTS "personal_write" ON core.methodology_progress;
CREATE POLICY personal_select ON core.methodology_progress FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.methodology_progress FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.student_learning_profiles (dado pessoal; escrita do proprio + staff; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.student_learning_profiles;
DROP POLICY IF EXISTS "personal_select" ON core.student_learning_profiles;
DROP POLICY IF EXISTS "personal_write" ON core.student_learning_profiles;
CREATE POLICY personal_select ON core.student_learning_profiles FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.student_learning_profiles FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.learning_recommendations (dado pessoal; escrita do proprio + staff; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.learning_recommendations;
DROP POLICY IF EXISTS "personal_select" ON core.learning_recommendations;
DROP POLICY IF EXISTS "personal_write" ON core.learning_recommendations;
CREATE POLICY personal_select ON core.learning_recommendations FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.learning_recommendations FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.qr_scans (dado pessoal; escrita do proprio + staff; dono: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.qr_scans;
DROP POLICY IF EXISTS "personal_select" ON core.qr_scans;
DROP POLICY IF EXISTS "personal_write" ON core.qr_scans;
CREATE POLICY personal_select ON core.qr_scans FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY personal_write ON core.qr_scans FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- core.portfolio_evidence (filho de portfolios via portfolio_id; sem coluna de dono direta)
DROP POLICY IF EXISTS "tenant_isolation" ON core.portfolio_evidence;
DROP POLICY IF EXISTS "pe_select" ON core.portfolio_evidence;
DROP POLICY IF EXISTS "pe_write" ON core.portfolio_evidence;
CREATE POLICY pe_select ON core.portfolio_evidence FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (EXISTS (SELECT 1 FROM core.portfolios p WHERE p.id = portfolio_evidence.portfolio_id AND p.student_id = (SELECT auth.uid())) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
CREATE POLICY pe_write ON core.portfolio_evidence FOR ALL TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (EXISTS (SELECT 1 FROM core.portfolios p WHERE p.id = portfolio_evidence.portfolio_id AND p.student_id = (SELECT auth.uid())) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (EXISTS (SELECT 1 FROM core.portfolios p WHERE p.id = portfolio_evidence.portfolio_id AND p.student_id = (SELECT auth.uid())) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));

-- ============ BALDE C: SOCIAL (SELECT tenant, escrita do autor + admin) ============

-- core.feed_posts (social; SELECT tenant, escrita do autor + admin; autor: author_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.feed_posts;
DROP POLICY IF EXISTS "social_select" ON core.feed_posts;
DROP POLICY IF EXISTS "social_insert" ON core.feed_posts;
DROP POLICY IF EXISTS "social_update" ON core.feed_posts;
DROP POLICY IF EXISTS "social_delete" ON core.feed_posts;
CREATE POLICY social_select ON core.feed_posts FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.feed_posts FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND author_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.feed_posts FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.feed_posts FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.feed_comments (social; SELECT tenant, escrita do autor + admin; autor: author_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.feed_comments;
DROP POLICY IF EXISTS "social_select" ON core.feed_comments;
DROP POLICY IF EXISTS "social_insert" ON core.feed_comments;
DROP POLICY IF EXISTS "social_update" ON core.feed_comments;
DROP POLICY IF EXISTS "social_delete" ON core.feed_comments;
CREATE POLICY social_select ON core.feed_comments FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.feed_comments FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND author_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.feed_comments FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.feed_comments FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.forum_topics (social; SELECT tenant, escrita do autor + admin; autor: author_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.forum_topics;
DROP POLICY IF EXISTS "social_select" ON core.forum_topics;
DROP POLICY IF EXISTS "social_insert" ON core.forum_topics;
DROP POLICY IF EXISTS "social_update" ON core.forum_topics;
DROP POLICY IF EXISTS "social_delete" ON core.forum_topics;
CREATE POLICY social_select ON core.forum_topics FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.forum_topics FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND author_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.forum_topics FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.forum_topics FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.forum_replies (social; SELECT tenant, escrita do autor + admin; autor: author_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.forum_replies;
DROP POLICY IF EXISTS "social_select" ON core.forum_replies;
DROP POLICY IF EXISTS "social_insert" ON core.forum_replies;
DROP POLICY IF EXISTS "social_update" ON core.forum_replies;
DROP POLICY IF EXISTS "social_delete" ON core.forum_replies;
CREATE POLICY social_select ON core.forum_replies FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.forum_replies FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND author_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.forum_replies FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.forum_replies FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (author_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.feed_likes (social; SELECT tenant, escrita do autor + admin; autor: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.feed_likes;
DROP POLICY IF EXISTS "social_select" ON core.feed_likes;
DROP POLICY IF EXISTS "social_insert" ON core.feed_likes;
DROP POLICY IF EXISTS "social_update" ON core.feed_likes;
DROP POLICY IF EXISTS "social_delete" ON core.feed_likes;
CREATE POLICY social_select ON core.feed_likes FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.feed_likes FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND user_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.feed_likes FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.feed_likes FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.forum_likes (social; SELECT tenant, escrita do autor + admin; autor: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.forum_likes;
DROP POLICY IF EXISTS "social_select" ON core.forum_likes;
DROP POLICY IF EXISTS "social_insert" ON core.forum_likes;
DROP POLICY IF EXISTS "social_update" ON core.forum_likes;
DROP POLICY IF EXISTS "social_delete" ON core.forum_likes;
CREATE POLICY social_select ON core.forum_likes FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.forum_likes FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND user_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.forum_likes FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.forum_likes FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- core.lesson_comments (social; SELECT tenant, escrita do autor + admin; autor: user_id)
DROP POLICY IF EXISTS "tenant_isolation" ON core.lesson_comments;
DROP POLICY IF EXISTS "social_select" ON core.lesson_comments;
DROP POLICY IF EXISTS "social_insert" ON core.lesson_comments;
DROP POLICY IF EXISTS "social_update" ON core.lesson_comments;
DROP POLICY IF EXISTS "social_delete" ON core.lesson_comments;
CREATE POLICY social_select ON core.lesson_comments FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()));
CREATE POLICY social_insert ON core.lesson_comments FOR INSERT TO authenticated
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND user_id = (SELECT auth.uid()));
CREATE POLICY social_update ON core.lesson_comments FOR UPDATE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))))
  WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));
CREATE POLICY social_delete ON core.lesson_comments FOR DELETE TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT internal.fn_has_role('admin'))));

-- ============ BALDE D: iam.profiles SELECT (PII de menores -> dono + staff) ============
DROP POLICY IF EXISTS "tenant_read" ON iam.profiles;
DROP POLICY IF EXISTS "profiles_select_own_staff" ON iam.profiles;
CREATE POLICY profiles_select_own_staff ON iam.profiles FOR SELECT TO authenticated
  USING (tenant_id = (SELECT internal.fn_tenant_id()) AND (user_id = (SELECT auth.uid()) OR (SELECT (internal.fn_has_role('admin') OR internal.fn_has_role('teacher')))));
-- mantidas intactas: own_update (UPDATE proprio) e admin_all (FOR ALL admin)

COMMIT;

-- ================== ROLLBACK (executar manualmente se precisar reverter) ==================
-- BEGIN;
-- Restaura a policy unica tenant_isolation (FOR ALL, so-tenant) e o tenant_read de profiles.
-- DROP POLICY IF EXISTS content_select ON core.lessons; DROP POLICY IF EXISTS content_write ON core.lessons; DROP POLICY IF EXISTS personal_select ON core.lessons; DROP POLICY IF EXISTS personal_write ON core.lessons; DROP POLICY IF EXISTS social_select ON core.lessons; DROP POLICY IF EXISTS social_insert ON core.lessons; DROP POLICY IF EXISTS social_update ON core.lessons; DROP POLICY IF EXISTS social_delete ON core.lessons; DROP POLICY IF EXISTS pe_select ON core.lessons; DROP POLICY IF EXISTS pe_write ON core.lessons; CREATE POLICY tenant_isolation ON core.lessons FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_activities; DROP POLICY IF EXISTS content_write ON core.lesson_activities; DROP POLICY IF EXISTS personal_select ON core.lesson_activities; DROP POLICY IF EXISTS personal_write ON core.lesson_activities; DROP POLICY IF EXISTS social_select ON core.lesson_activities; DROP POLICY IF EXISTS social_insert ON core.lesson_activities; DROP POLICY IF EXISTS social_update ON core.lesson_activities; DROP POLICY IF EXISTS social_delete ON core.lesson_activities; DROP POLICY IF EXISTS pe_select ON core.lesson_activities; DROP POLICY IF EXISTS pe_write ON core.lesson_activities; CREATE POLICY tenant_isolation ON core.lesson_activities FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_materials; DROP POLICY IF EXISTS content_write ON core.lesson_materials; DROP POLICY IF EXISTS personal_select ON core.lesson_materials; DROP POLICY IF EXISTS personal_write ON core.lesson_materials; DROP POLICY IF EXISTS social_select ON core.lesson_materials; DROP POLICY IF EXISTS social_insert ON core.lesson_materials; DROP POLICY IF EXISTS social_update ON core.lesson_materials; DROP POLICY IF EXISTS social_delete ON core.lesson_materials; DROP POLICY IF EXISTS pe_select ON core.lesson_materials; DROP POLICY IF EXISTS pe_write ON core.lesson_materials; CREATE POLICY tenant_isolation ON core.lesson_materials FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_checklists; DROP POLICY IF EXISTS content_write ON core.lesson_checklists; DROP POLICY IF EXISTS personal_select ON core.lesson_checklists; DROP POLICY IF EXISTS personal_write ON core.lesson_checklists; DROP POLICY IF EXISTS social_select ON core.lesson_checklists; DROP POLICY IF EXISTS social_insert ON core.lesson_checklists; DROP POLICY IF EXISTS social_update ON core.lesson_checklists; DROP POLICY IF EXISTS social_delete ON core.lesson_checklists; DROP POLICY IF EXISTS pe_select ON core.lesson_checklists; DROP POLICY IF EXISTS pe_write ON core.lesson_checklists; CREATE POLICY tenant_isolation ON core.lesson_checklists FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_tags; DROP POLICY IF EXISTS content_write ON core.lesson_tags; DROP POLICY IF EXISTS personal_select ON core.lesson_tags; DROP POLICY IF EXISTS personal_write ON core.lesson_tags; DROP POLICY IF EXISTS social_select ON core.lesson_tags; DROP POLICY IF EXISTS social_insert ON core.lesson_tags; DROP POLICY IF EXISTS social_update ON core.lesson_tags; DROP POLICY IF EXISTS social_delete ON core.lesson_tags; DROP POLICY IF EXISTS pe_select ON core.lesson_tags; DROP POLICY IF EXISTS pe_write ON core.lesson_tags; CREATE POLICY tenant_isolation ON core.lesson_tags FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.courses; DROP POLICY IF EXISTS content_write ON core.courses; DROP POLICY IF EXISTS personal_select ON core.courses; DROP POLICY IF EXISTS personal_write ON core.courses; DROP POLICY IF EXISTS social_select ON core.courses; DROP POLICY IF EXISTS social_insert ON core.courses; DROP POLICY IF EXISTS social_update ON core.courses; DROP POLICY IF EXISTS social_delete ON core.courses; DROP POLICY IF EXISTS pe_select ON core.courses; DROP POLICY IF EXISTS pe_write ON core.courses; CREATE POLICY tenant_isolation ON core.courses FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.modules; DROP POLICY IF EXISTS content_write ON core.modules; DROP POLICY IF EXISTS personal_select ON core.modules; DROP POLICY IF EXISTS personal_write ON core.modules; DROP POLICY IF EXISTS social_select ON core.modules; DROP POLICY IF EXISTS social_insert ON core.modules; DROP POLICY IF EXISTS social_update ON core.modules; DROP POLICY IF EXISTS social_delete ON core.modules; DROP POLICY IF EXISTS pe_select ON core.modules; DROP POLICY IF EXISTS pe_write ON core.modules; CREATE POLICY tenant_isolation ON core.modules FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.challenges; DROP POLICY IF EXISTS content_write ON core.challenges; DROP POLICY IF EXISTS personal_select ON core.challenges; DROP POLICY IF EXISTS personal_write ON core.challenges; DROP POLICY IF EXISTS social_select ON core.challenges; DROP POLICY IF EXISTS social_insert ON core.challenges; DROP POLICY IF EXISTS social_update ON core.challenges; DROP POLICY IF EXISTS social_delete ON core.challenges; DROP POLICY IF EXISTS pe_select ON core.challenges; DROP POLICY IF EXISTS pe_write ON core.challenges; CREATE POLICY tenant_isolation ON core.challenges FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instruments; DROP POLICY IF EXISTS content_write ON core.instruments; DROP POLICY IF EXISTS personal_select ON core.instruments; DROP POLICY IF EXISTS personal_write ON core.instruments; DROP POLICY IF EXISTS social_select ON core.instruments; DROP POLICY IF EXISTS social_insert ON core.instruments; DROP POLICY IF EXISTS social_update ON core.instruments; DROP POLICY IF EXISTS social_delete ON core.instruments; DROP POLICY IF EXISTS pe_select ON core.instruments; DROP POLICY IF EXISTS pe_write ON core.instruments; CREATE POLICY tenant_isolation ON core.instruments FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_facts; DROP POLICY IF EXISTS content_write ON core.instrument_facts; DROP POLICY IF EXISTS personal_select ON core.instrument_facts; DROP POLICY IF EXISTS personal_write ON core.instrument_facts; DROP POLICY IF EXISTS social_select ON core.instrument_facts; DROP POLICY IF EXISTS social_insert ON core.instrument_facts; DROP POLICY IF EXISTS social_update ON core.instrument_facts; DROP POLICY IF EXISTS social_delete ON core.instrument_facts; DROP POLICY IF EXISTS pe_select ON core.instrument_facts; DROP POLICY IF EXISTS pe_write ON core.instrument_facts; CREATE POLICY tenant_isolation ON core.instrument_facts FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_inventory; DROP POLICY IF EXISTS content_write ON core.instrument_inventory; DROP POLICY IF EXISTS personal_select ON core.instrument_inventory; DROP POLICY IF EXISTS personal_write ON core.instrument_inventory; DROP POLICY IF EXISTS social_select ON core.instrument_inventory; DROP POLICY IF EXISTS social_insert ON core.instrument_inventory; DROP POLICY IF EXISTS social_update ON core.instrument_inventory; DROP POLICY IF EXISTS social_delete ON core.instrument_inventory; DROP POLICY IF EXISTS pe_select ON core.instrument_inventory; DROP POLICY IF EXISTS pe_write ON core.instrument_inventory; CREATE POLICY tenant_isolation ON core.instrument_inventory FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_media; DROP POLICY IF EXISTS content_write ON core.instrument_media; DROP POLICY IF EXISTS personal_select ON core.instrument_media; DROP POLICY IF EXISTS personal_write ON core.instrument_media; DROP POLICY IF EXISTS social_select ON core.instrument_media; DROP POLICY IF EXISTS social_insert ON core.instrument_media; DROP POLICY IF EXISTS social_update ON core.instrument_media; DROP POLICY IF EXISTS social_delete ON core.instrument_media; DROP POLICY IF EXISTS pe_select ON core.instrument_media; DROP POLICY IF EXISTS pe_write ON core.instrument_media; CREATE POLICY tenant_isolation ON core.instrument_media FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_performances; DROP POLICY IF EXISTS content_write ON core.instrument_performances; DROP POLICY IF EXISTS personal_select ON core.instrument_performances; DROP POLICY IF EXISTS personal_write ON core.instrument_performances; DROP POLICY IF EXISTS social_select ON core.instrument_performances; DROP POLICY IF EXISTS social_insert ON core.instrument_performances; DROP POLICY IF EXISTS social_update ON core.instrument_performances; DROP POLICY IF EXISTS social_delete ON core.instrument_performances; DROP POLICY IF EXISTS pe_select ON core.instrument_performances; DROP POLICY IF EXISTS pe_write ON core.instrument_performances; CREATE POLICY tenant_isolation ON core.instrument_performances FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_quizzes; DROP POLICY IF EXISTS content_write ON core.instrument_quizzes; DROP POLICY IF EXISTS personal_select ON core.instrument_quizzes; DROP POLICY IF EXISTS personal_write ON core.instrument_quizzes; DROP POLICY IF EXISTS social_select ON core.instrument_quizzes; DROP POLICY IF EXISTS social_insert ON core.instrument_quizzes; DROP POLICY IF EXISTS social_update ON core.instrument_quizzes; DROP POLICY IF EXISTS social_delete ON core.instrument_quizzes; DROP POLICY IF EXISTS pe_select ON core.instrument_quizzes; DROP POLICY IF EXISTS pe_write ON core.instrument_quizzes; CREATE POLICY tenant_isolation ON core.instrument_quizzes FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_relations; DROP POLICY IF EXISTS content_write ON core.instrument_relations; DROP POLICY IF EXISTS personal_select ON core.instrument_relations; DROP POLICY IF EXISTS personal_write ON core.instrument_relations; DROP POLICY IF EXISTS social_select ON core.instrument_relations; DROP POLICY IF EXISTS social_insert ON core.instrument_relations; DROP POLICY IF EXISTS social_update ON core.instrument_relations; DROP POLICY IF EXISTS social_delete ON core.instrument_relations; DROP POLICY IF EXISTS pe_select ON core.instrument_relations; DROP POLICY IF EXISTS pe_write ON core.instrument_relations; CREATE POLICY tenant_isolation ON core.instrument_relations FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_sounds; DROP POLICY IF EXISTS content_write ON core.instrument_sounds; DROP POLICY IF EXISTS personal_select ON core.instrument_sounds; DROP POLICY IF EXISTS personal_write ON core.instrument_sounds; DROP POLICY IF EXISTS social_select ON core.instrument_sounds; DROP POLICY IF EXISTS social_insert ON core.instrument_sounds; DROP POLICY IF EXISTS social_update ON core.instrument_sounds; DROP POLICY IF EXISTS social_delete ON core.instrument_sounds; DROP POLICY IF EXISTS pe_select ON core.instrument_sounds; DROP POLICY IF EXISTS pe_write ON core.instrument_sounds; CREATE POLICY tenant_isolation ON core.instrument_sounds FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.instrument_techniques; DROP POLICY IF EXISTS content_write ON core.instrument_techniques; DROP POLICY IF EXISTS personal_select ON core.instrument_techniques; DROP POLICY IF EXISTS personal_write ON core.instrument_techniques; DROP POLICY IF EXISTS social_select ON core.instrument_techniques; DROP POLICY IF EXISTS social_insert ON core.instrument_techniques; DROP POLICY IF EXISTS social_update ON core.instrument_techniques; DROP POLICY IF EXISTS social_delete ON core.instrument_techniques; DROP POLICY IF EXISTS pe_select ON core.instrument_techniques; DROP POLICY IF EXISTS pe_write ON core.instrument_techniques; CREATE POLICY tenant_isolation ON core.instrument_techniques FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.repertoire; DROP POLICY IF EXISTS content_write ON core.repertoire; DROP POLICY IF EXISTS personal_select ON core.repertoire; DROP POLICY IF EXISTS personal_write ON core.repertoire; DROP POLICY IF EXISTS social_select ON core.repertoire; DROP POLICY IF EXISTS social_insert ON core.repertoire; DROP POLICY IF EXISTS social_update ON core.repertoire; DROP POLICY IF EXISTS social_delete ON core.repertoire; DROP POLICY IF EXISTS pe_select ON core.repertoire; DROP POLICY IF EXISTS pe_write ON core.repertoire; CREATE POLICY tenant_isolation ON core.repertoire FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.repertoire_categories; DROP POLICY IF EXISTS content_write ON core.repertoire_categories; DROP POLICY IF EXISTS personal_select ON core.repertoire_categories; DROP POLICY IF EXISTS personal_write ON core.repertoire_categories; DROP POLICY IF EXISTS social_select ON core.repertoire_categories; DROP POLICY IF EXISTS social_insert ON core.repertoire_categories; DROP POLICY IF EXISTS social_update ON core.repertoire_categories; DROP POLICY IF EXISTS social_delete ON core.repertoire_categories; DROP POLICY IF EXISTS pe_select ON core.repertoire_categories; DROP POLICY IF EXISTS pe_write ON core.repertoire_categories; CREATE POLICY tenant_isolation ON core.repertoire_categories FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.methodologies; DROP POLICY IF EXISTS content_write ON core.methodologies; DROP POLICY IF EXISTS personal_select ON core.methodologies; DROP POLICY IF EXISTS personal_write ON core.methodologies; DROP POLICY IF EXISTS social_select ON core.methodologies; DROP POLICY IF EXISTS social_insert ON core.methodologies; DROP POLICY IF EXISTS social_update ON core.methodologies; DROP POLICY IF EXISTS social_delete ON core.methodologies; DROP POLICY IF EXISTS pe_select ON core.methodologies; DROP POLICY IF EXISTS pe_write ON core.methodologies; CREATE POLICY tenant_isolation ON core.methodologies FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.competencies; DROP POLICY IF EXISTS content_write ON core.competencies; DROP POLICY IF EXISTS personal_select ON core.competencies; DROP POLICY IF EXISTS personal_write ON core.competencies; DROP POLICY IF EXISTS social_select ON core.competencies; DROP POLICY IF EXISTS social_insert ON core.competencies; DROP POLICY IF EXISTS social_update ON core.competencies; DROP POLICY IF EXISTS social_delete ON core.competencies; DROP POLICY IF EXISTS pe_select ON core.competencies; DROP POLICY IF EXISTS pe_write ON core.competencies; CREATE POLICY tenant_isolation ON core.competencies FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.evaluation_criteria; DROP POLICY IF EXISTS content_write ON core.evaluation_criteria; DROP POLICY IF EXISTS personal_select ON core.evaluation_criteria; DROP POLICY IF EXISTS personal_write ON core.evaluation_criteria; DROP POLICY IF EXISTS social_select ON core.evaluation_criteria; DROP POLICY IF EXISTS social_insert ON core.evaluation_criteria; DROP POLICY IF EXISTS social_update ON core.evaluation_criteria; DROP POLICY IF EXISTS social_delete ON core.evaluation_criteria; DROP POLICY IF EXISTS pe_select ON core.evaluation_criteria; DROP POLICY IF EXISTS pe_write ON core.evaluation_criteria; CREATE POLICY tenant_isolation ON core.evaluation_criteria FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.evaluation_rubrics; DROP POLICY IF EXISTS content_write ON core.evaluation_rubrics; DROP POLICY IF EXISTS personal_select ON core.evaluation_rubrics; DROP POLICY IF EXISTS personal_write ON core.evaluation_rubrics; DROP POLICY IF EXISTS social_select ON core.evaluation_rubrics; DROP POLICY IF EXISTS social_insert ON core.evaluation_rubrics; DROP POLICY IF EXISTS social_update ON core.evaluation_rubrics; DROP POLICY IF EXISTS social_delete ON core.evaluation_rubrics; DROP POLICY IF EXISTS pe_select ON core.evaluation_rubrics; DROP POLICY IF EXISTS pe_write ON core.evaluation_rubrics; CREATE POLICY tenant_isolation ON core.evaluation_rubrics FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.support_materials; DROP POLICY IF EXISTS content_write ON core.support_materials; DROP POLICY IF EXISTS personal_select ON core.support_materials; DROP POLICY IF EXISTS personal_write ON core.support_materials; DROP POLICY IF EXISTS social_select ON core.support_materials; DROP POLICY IF EXISTS social_insert ON core.support_materials; DROP POLICY IF EXISTS social_update ON core.support_materials; DROP POLICY IF EXISTS social_delete ON core.support_materials; DROP POLICY IF EXISTS pe_select ON core.support_materials; DROP POLICY IF EXISTS pe_write ON core.support_materials; CREATE POLICY tenant_isolation ON core.support_materials FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.teaching_sequences; DROP POLICY IF EXISTS content_write ON core.teaching_sequences; DROP POLICY IF EXISTS personal_select ON core.teaching_sequences; DROP POLICY IF EXISTS personal_write ON core.teaching_sequences; DROP POLICY IF EXISTS social_select ON core.teaching_sequences; DROP POLICY IF EXISTS social_insert ON core.teaching_sequences; DROP POLICY IF EXISTS social_update ON core.teaching_sequences; DROP POLICY IF EXISTS social_delete ON core.teaching_sequences; DROP POLICY IF EXISTS pe_select ON core.teaching_sequences; DROP POLICY IF EXISTS pe_write ON core.teaching_sequences; CREATE POLICY tenant_isolation ON core.teaching_sequences FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.achievements; DROP POLICY IF EXISTS content_write ON core.achievements; DROP POLICY IF EXISTS personal_select ON core.achievements; DROP POLICY IF EXISTS personal_write ON core.achievements; DROP POLICY IF EXISTS social_select ON core.achievements; DROP POLICY IF EXISTS social_insert ON core.achievements; DROP POLICY IF EXISTS social_update ON core.achievements; DROP POLICY IF EXISTS social_delete ON core.achievements; DROP POLICY IF EXISTS pe_select ON core.achievements; DROP POLICY IF EXISTS pe_write ON core.achievements; CREATE POLICY tenant_isolation ON core.achievements FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.qr_codes; DROP POLICY IF EXISTS content_write ON core.qr_codes; DROP POLICY IF EXISTS personal_select ON core.qr_codes; DROP POLICY IF EXISTS personal_write ON core.qr_codes; DROP POLICY IF EXISTS social_select ON core.qr_codes; DROP POLICY IF EXISTS social_insert ON core.qr_codes; DROP POLICY IF EXISTS social_update ON core.qr_codes; DROP POLICY IF EXISTS social_delete ON core.qr_codes; DROP POLICY IF EXISTS pe_select ON core.qr_codes; DROP POLICY IF EXISTS pe_write ON core.qr_codes; CREATE POLICY tenant_isolation ON core.qr_codes FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_composers; DROP POLICY IF EXISTS content_write ON core.history_composers; DROP POLICY IF EXISTS personal_select ON core.history_composers; DROP POLICY IF EXISTS personal_write ON core.history_composers; DROP POLICY IF EXISTS social_select ON core.history_composers; DROP POLICY IF EXISTS social_insert ON core.history_composers; DROP POLICY IF EXISTS social_update ON core.history_composers; DROP POLICY IF EXISTS social_delete ON core.history_composers; DROP POLICY IF EXISTS pe_select ON core.history_composers; DROP POLICY IF EXISTS pe_write ON core.history_composers; CREATE POLICY tenant_isolation ON core.history_composers FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_cultural_contexts; DROP POLICY IF EXISTS content_write ON core.history_cultural_contexts; DROP POLICY IF EXISTS personal_select ON core.history_cultural_contexts; DROP POLICY IF EXISTS personal_write ON core.history_cultural_contexts; DROP POLICY IF EXISTS social_select ON core.history_cultural_contexts; DROP POLICY IF EXISTS social_insert ON core.history_cultural_contexts; DROP POLICY IF EXISTS social_update ON core.history_cultural_contexts; DROP POLICY IF EXISTS social_delete ON core.history_cultural_contexts; DROP POLICY IF EXISTS pe_select ON core.history_cultural_contexts; DROP POLICY IF EXISTS pe_write ON core.history_cultural_contexts; CREATE POLICY tenant_isolation ON core.history_cultural_contexts FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_genres; DROP POLICY IF EXISTS content_write ON core.history_genres; DROP POLICY IF EXISTS personal_select ON core.history_genres; DROP POLICY IF EXISTS personal_write ON core.history_genres; DROP POLICY IF EXISTS social_select ON core.history_genres; DROP POLICY IF EXISTS social_insert ON core.history_genres; DROP POLICY IF EXISTS social_update ON core.history_genres; DROP POLICY IF EXISTS social_delete ON core.history_genres; DROP POLICY IF EXISTS pe_select ON core.history_genres; DROP POLICY IF EXISTS pe_write ON core.history_genres; CREATE POLICY tenant_isolation ON core.history_genres FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_instrument_evolution; DROP POLICY IF EXISTS content_write ON core.history_instrument_evolution; DROP POLICY IF EXISTS personal_select ON core.history_instrument_evolution; DROP POLICY IF EXISTS personal_write ON core.history_instrument_evolution; DROP POLICY IF EXISTS social_select ON core.history_instrument_evolution; DROP POLICY IF EXISTS social_insert ON core.history_instrument_evolution; DROP POLICY IF EXISTS social_update ON core.history_instrument_evolution; DROP POLICY IF EXISTS social_delete ON core.history_instrument_evolution; DROP POLICY IF EXISTS pe_select ON core.history_instrument_evolution; DROP POLICY IF EXISTS pe_write ON core.history_instrument_evolution; CREATE POLICY tenant_isolation ON core.history_instrument_evolution FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_movements; DROP POLICY IF EXISTS content_write ON core.history_movements; DROP POLICY IF EXISTS personal_select ON core.history_movements; DROP POLICY IF EXISTS personal_write ON core.history_movements; DROP POLICY IF EXISTS social_select ON core.history_movements; DROP POLICY IF EXISTS social_insert ON core.history_movements; DROP POLICY IF EXISTS social_update ON core.history_movements; DROP POLICY IF EXISTS social_delete ON core.history_movements; DROP POLICY IF EXISTS pe_select ON core.history_movements; DROP POLICY IF EXISTS pe_write ON core.history_movements; CREATE POLICY tenant_isolation ON core.history_movements FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_periods; DROP POLICY IF EXISTS content_write ON core.history_periods; DROP POLICY IF EXISTS personal_select ON core.history_periods; DROP POLICY IF EXISTS personal_write ON core.history_periods; DROP POLICY IF EXISTS social_select ON core.history_periods; DROP POLICY IF EXISTS social_insert ON core.history_periods; DROP POLICY IF EXISTS social_update ON core.history_periods; DROP POLICY IF EXISTS social_delete ON core.history_periods; DROP POLICY IF EXISTS pe_select ON core.history_periods; DROP POLICY IF EXISTS pe_write ON core.history_periods; CREATE POLICY tenant_isolation ON core.history_periods FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_quizzes; DROP POLICY IF EXISTS content_write ON core.history_quizzes; DROP POLICY IF EXISTS personal_select ON core.history_quizzes; DROP POLICY IF EXISTS personal_write ON core.history_quizzes; DROP POLICY IF EXISTS social_select ON core.history_quizzes; DROP POLICY IF EXISTS social_insert ON core.history_quizzes; DROP POLICY IF EXISTS social_update ON core.history_quizzes; DROP POLICY IF EXISTS social_delete ON core.history_quizzes; DROP POLICY IF EXISTS pe_select ON core.history_quizzes; DROP POLICY IF EXISTS pe_write ON core.history_quizzes; CREATE POLICY tenant_isolation ON core.history_quizzes FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_theory_concepts; DROP POLICY IF EXISTS content_write ON core.history_theory_concepts; DROP POLICY IF EXISTS personal_select ON core.history_theory_concepts; DROP POLICY IF EXISTS personal_write ON core.history_theory_concepts; DROP POLICY IF EXISTS social_select ON core.history_theory_concepts; DROP POLICY IF EXISTS social_insert ON core.history_theory_concepts; DROP POLICY IF EXISTS social_update ON core.history_theory_concepts; DROP POLICY IF EXISTS social_delete ON core.history_theory_concepts; DROP POLICY IF EXISTS pe_select ON core.history_theory_concepts; DROP POLICY IF EXISTS pe_write ON core.history_theory_concepts; CREATE POLICY tenant_isolation ON core.history_theory_concepts FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_timeline_events; DROP POLICY IF EXISTS content_write ON core.history_timeline_events; DROP POLICY IF EXISTS personal_select ON core.history_timeline_events; DROP POLICY IF EXISTS personal_write ON core.history_timeline_events; DROP POLICY IF EXISTS social_select ON core.history_timeline_events; DROP POLICY IF EXISTS social_insert ON core.history_timeline_events; DROP POLICY IF EXISTS social_update ON core.history_timeline_events; DROP POLICY IF EXISTS social_delete ON core.history_timeline_events; DROP POLICY IF EXISTS pe_select ON core.history_timeline_events; DROP POLICY IF EXISTS pe_write ON core.history_timeline_events; CREATE POLICY tenant_isolation ON core.history_timeline_events FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.history_works; DROP POLICY IF EXISTS content_write ON core.history_works; DROP POLICY IF EXISTS personal_select ON core.history_works; DROP POLICY IF EXISTS personal_write ON core.history_works; DROP POLICY IF EXISTS social_select ON core.history_works; DROP POLICY IF EXISTS social_insert ON core.history_works; DROP POLICY IF EXISTS social_update ON core.history_works; DROP POLICY IF EXISTS social_delete ON core.history_works; DROP POLICY IF EXISTS pe_select ON core.history_works; DROP POLICY IF EXISTS pe_write ON core.history_works; CREATE POLICY tenant_isolation ON core.history_works FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.points_log; DROP POLICY IF EXISTS content_write ON core.points_log; DROP POLICY IF EXISTS personal_select ON core.points_log; DROP POLICY IF EXISTS personal_write ON core.points_log; DROP POLICY IF EXISTS social_select ON core.points_log; DROP POLICY IF EXISTS social_insert ON core.points_log; DROP POLICY IF EXISTS social_update ON core.points_log; DROP POLICY IF EXISTS social_delete ON core.points_log; DROP POLICY IF EXISTS pe_select ON core.points_log; DROP POLICY IF EXISTS pe_write ON core.points_log; CREATE POLICY tenant_isolation ON core.points_log FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.user_progress; DROP POLICY IF EXISTS content_write ON core.user_progress; DROP POLICY IF EXISTS personal_select ON core.user_progress; DROP POLICY IF EXISTS personal_write ON core.user_progress; DROP POLICY IF EXISTS social_select ON core.user_progress; DROP POLICY IF EXISTS social_insert ON core.user_progress; DROP POLICY IF EXISTS social_update ON core.user_progress; DROP POLICY IF EXISTS social_delete ON core.user_progress; DROP POLICY IF EXISTS pe_select ON core.user_progress; DROP POLICY IF EXISTS pe_write ON core.user_progress; CREATE POLICY tenant_isolation ON core.user_progress FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.user_achievements; DROP POLICY IF EXISTS content_write ON core.user_achievements; DROP POLICY IF EXISTS personal_select ON core.user_achievements; DROP POLICY IF EXISTS personal_write ON core.user_achievements; DROP POLICY IF EXISTS social_select ON core.user_achievements; DROP POLICY IF EXISTS social_insert ON core.user_achievements; DROP POLICY IF EXISTS social_update ON core.user_achievements; DROP POLICY IF EXISTS social_delete ON core.user_achievements; DROP POLICY IF EXISTS pe_select ON core.user_achievements; DROP POLICY IF EXISTS pe_write ON core.user_achievements; CREATE POLICY tenant_isolation ON core.user_achievements FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_progress; DROP POLICY IF EXISTS content_write ON core.lesson_progress; DROP POLICY IF EXISTS personal_select ON core.lesson_progress; DROP POLICY IF EXISTS personal_write ON core.lesson_progress; DROP POLICY IF EXISTS social_select ON core.lesson_progress; DROP POLICY IF EXISTS social_insert ON core.lesson_progress; DROP POLICY IF EXISTS social_update ON core.lesson_progress; DROP POLICY IF EXISTS social_delete ON core.lesson_progress; DROP POLICY IF EXISTS pe_select ON core.lesson_progress; DROP POLICY IF EXISTS pe_write ON core.lesson_progress; CREATE POLICY tenant_isolation ON core.lesson_progress FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.attendance; DROP POLICY IF EXISTS content_write ON core.attendance; DROP POLICY IF EXISTS personal_select ON core.attendance; DROP POLICY IF EXISTS personal_write ON core.attendance; DROP POLICY IF EXISTS social_select ON core.attendance; DROP POLICY IF EXISTS social_insert ON core.attendance; DROP POLICY IF EXISTS social_update ON core.attendance; DROP POLICY IF EXISTS social_delete ON core.attendance; DROP POLICY IF EXISTS pe_select ON core.attendance; DROP POLICY IF EXISTS pe_write ON core.attendance; CREATE POLICY tenant_isolation ON core.attendance FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.portfolios; DROP POLICY IF EXISTS content_write ON core.portfolios; DROP POLICY IF EXISTS personal_select ON core.portfolios; DROP POLICY IF EXISTS personal_write ON core.portfolios; DROP POLICY IF EXISTS social_select ON core.portfolios; DROP POLICY IF EXISTS social_insert ON core.portfolios; DROP POLICY IF EXISTS social_update ON core.portfolios; DROP POLICY IF EXISTS social_delete ON core.portfolios; DROP POLICY IF EXISTS pe_select ON core.portfolios; DROP POLICY IF EXISTS pe_write ON core.portfolios; CREATE POLICY tenant_isolation ON core.portfolios FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.challenge_submissions; DROP POLICY IF EXISTS content_write ON core.challenge_submissions; DROP POLICY IF EXISTS personal_select ON core.challenge_submissions; DROP POLICY IF EXISTS personal_write ON core.challenge_submissions; DROP POLICY IF EXISTS social_select ON core.challenge_submissions; DROP POLICY IF EXISTS social_insert ON core.challenge_submissions; DROP POLICY IF EXISTS social_update ON core.challenge_submissions; DROP POLICY IF EXISTS social_delete ON core.challenge_submissions; DROP POLICY IF EXISTS pe_select ON core.challenge_submissions; DROP POLICY IF EXISTS pe_write ON core.challenge_submissions; CREATE POLICY tenant_isolation ON core.challenge_submissions FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.practice_sessions; DROP POLICY IF EXISTS content_write ON core.practice_sessions; DROP POLICY IF EXISTS personal_select ON core.practice_sessions; DROP POLICY IF EXISTS personal_write ON core.practice_sessions; DROP POLICY IF EXISTS social_select ON core.practice_sessions; DROP POLICY IF EXISTS social_insert ON core.practice_sessions; DROP POLICY IF EXISTS social_update ON core.practice_sessions; DROP POLICY IF EXISTS social_delete ON core.practice_sessions; DROP POLICY IF EXISTS pe_select ON core.practice_sessions; DROP POLICY IF EXISTS pe_write ON core.practice_sessions; CREATE POLICY tenant_isolation ON core.practice_sessions FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_favorites; DROP POLICY IF EXISTS content_write ON core.lesson_favorites; DROP POLICY IF EXISTS personal_select ON core.lesson_favorites; DROP POLICY IF EXISTS personal_write ON core.lesson_favorites; DROP POLICY IF EXISTS social_select ON core.lesson_favorites; DROP POLICY IF EXISTS social_insert ON core.lesson_favorites; DROP POLICY IF EXISTS social_update ON core.lesson_favorites; DROP POLICY IF EXISTS social_delete ON core.lesson_favorites; DROP POLICY IF EXISTS pe_select ON core.lesson_favorites; DROP POLICY IF EXISTS pe_write ON core.lesson_favorites; CREATE POLICY tenant_isolation ON core.lesson_favorites FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.methodology_progress; DROP POLICY IF EXISTS content_write ON core.methodology_progress; DROP POLICY IF EXISTS personal_select ON core.methodology_progress; DROP POLICY IF EXISTS personal_write ON core.methodology_progress; DROP POLICY IF EXISTS social_select ON core.methodology_progress; DROP POLICY IF EXISTS social_insert ON core.methodology_progress; DROP POLICY IF EXISTS social_update ON core.methodology_progress; DROP POLICY IF EXISTS social_delete ON core.methodology_progress; DROP POLICY IF EXISTS pe_select ON core.methodology_progress; DROP POLICY IF EXISTS pe_write ON core.methodology_progress; CREATE POLICY tenant_isolation ON core.methodology_progress FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.student_learning_profiles; DROP POLICY IF EXISTS content_write ON core.student_learning_profiles; DROP POLICY IF EXISTS personal_select ON core.student_learning_profiles; DROP POLICY IF EXISTS personal_write ON core.student_learning_profiles; DROP POLICY IF EXISTS social_select ON core.student_learning_profiles; DROP POLICY IF EXISTS social_insert ON core.student_learning_profiles; DROP POLICY IF EXISTS social_update ON core.student_learning_profiles; DROP POLICY IF EXISTS social_delete ON core.student_learning_profiles; DROP POLICY IF EXISTS pe_select ON core.student_learning_profiles; DROP POLICY IF EXISTS pe_write ON core.student_learning_profiles; CREATE POLICY tenant_isolation ON core.student_learning_profiles FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.learning_recommendations; DROP POLICY IF EXISTS content_write ON core.learning_recommendations; DROP POLICY IF EXISTS personal_select ON core.learning_recommendations; DROP POLICY IF EXISTS personal_write ON core.learning_recommendations; DROP POLICY IF EXISTS social_select ON core.learning_recommendations; DROP POLICY IF EXISTS social_insert ON core.learning_recommendations; DROP POLICY IF EXISTS social_update ON core.learning_recommendations; DROP POLICY IF EXISTS social_delete ON core.learning_recommendations; DROP POLICY IF EXISTS pe_select ON core.learning_recommendations; DROP POLICY IF EXISTS pe_write ON core.learning_recommendations; CREATE POLICY tenant_isolation ON core.learning_recommendations FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.qr_scans; DROP POLICY IF EXISTS content_write ON core.qr_scans; DROP POLICY IF EXISTS personal_select ON core.qr_scans; DROP POLICY IF EXISTS personal_write ON core.qr_scans; DROP POLICY IF EXISTS social_select ON core.qr_scans; DROP POLICY IF EXISTS social_insert ON core.qr_scans; DROP POLICY IF EXISTS social_update ON core.qr_scans; DROP POLICY IF EXISTS social_delete ON core.qr_scans; DROP POLICY IF EXISTS pe_select ON core.qr_scans; DROP POLICY IF EXISTS pe_write ON core.qr_scans; CREATE POLICY tenant_isolation ON core.qr_scans FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.portfolio_evidence; DROP POLICY IF EXISTS content_write ON core.portfolio_evidence; DROP POLICY IF EXISTS personal_select ON core.portfolio_evidence; DROP POLICY IF EXISTS personal_write ON core.portfolio_evidence; DROP POLICY IF EXISTS social_select ON core.portfolio_evidence; DROP POLICY IF EXISTS social_insert ON core.portfolio_evidence; DROP POLICY IF EXISTS social_update ON core.portfolio_evidence; DROP POLICY IF EXISTS social_delete ON core.portfolio_evidence; DROP POLICY IF EXISTS pe_select ON core.portfolio_evidence; DROP POLICY IF EXISTS pe_write ON core.portfolio_evidence; CREATE POLICY tenant_isolation ON core.portfolio_evidence FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.feed_posts; DROP POLICY IF EXISTS content_write ON core.feed_posts; DROP POLICY IF EXISTS personal_select ON core.feed_posts; DROP POLICY IF EXISTS personal_write ON core.feed_posts; DROP POLICY IF EXISTS social_select ON core.feed_posts; DROP POLICY IF EXISTS social_insert ON core.feed_posts; DROP POLICY IF EXISTS social_update ON core.feed_posts; DROP POLICY IF EXISTS social_delete ON core.feed_posts; DROP POLICY IF EXISTS pe_select ON core.feed_posts; DROP POLICY IF EXISTS pe_write ON core.feed_posts; CREATE POLICY tenant_isolation ON core.feed_posts FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.feed_comments; DROP POLICY IF EXISTS content_write ON core.feed_comments; DROP POLICY IF EXISTS personal_select ON core.feed_comments; DROP POLICY IF EXISTS personal_write ON core.feed_comments; DROP POLICY IF EXISTS social_select ON core.feed_comments; DROP POLICY IF EXISTS social_insert ON core.feed_comments; DROP POLICY IF EXISTS social_update ON core.feed_comments; DROP POLICY IF EXISTS social_delete ON core.feed_comments; DROP POLICY IF EXISTS pe_select ON core.feed_comments; DROP POLICY IF EXISTS pe_write ON core.feed_comments; CREATE POLICY tenant_isolation ON core.feed_comments FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.forum_topics; DROP POLICY IF EXISTS content_write ON core.forum_topics; DROP POLICY IF EXISTS personal_select ON core.forum_topics; DROP POLICY IF EXISTS personal_write ON core.forum_topics; DROP POLICY IF EXISTS social_select ON core.forum_topics; DROP POLICY IF EXISTS social_insert ON core.forum_topics; DROP POLICY IF EXISTS social_update ON core.forum_topics; DROP POLICY IF EXISTS social_delete ON core.forum_topics; DROP POLICY IF EXISTS pe_select ON core.forum_topics; DROP POLICY IF EXISTS pe_write ON core.forum_topics; CREATE POLICY tenant_isolation ON core.forum_topics FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.forum_replies; DROP POLICY IF EXISTS content_write ON core.forum_replies; DROP POLICY IF EXISTS personal_select ON core.forum_replies; DROP POLICY IF EXISTS personal_write ON core.forum_replies; DROP POLICY IF EXISTS social_select ON core.forum_replies; DROP POLICY IF EXISTS social_insert ON core.forum_replies; DROP POLICY IF EXISTS social_update ON core.forum_replies; DROP POLICY IF EXISTS social_delete ON core.forum_replies; DROP POLICY IF EXISTS pe_select ON core.forum_replies; DROP POLICY IF EXISTS pe_write ON core.forum_replies; CREATE POLICY tenant_isolation ON core.forum_replies FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.feed_likes; DROP POLICY IF EXISTS content_write ON core.feed_likes; DROP POLICY IF EXISTS personal_select ON core.feed_likes; DROP POLICY IF EXISTS personal_write ON core.feed_likes; DROP POLICY IF EXISTS social_select ON core.feed_likes; DROP POLICY IF EXISTS social_insert ON core.feed_likes; DROP POLICY IF EXISTS social_update ON core.feed_likes; DROP POLICY IF EXISTS social_delete ON core.feed_likes; DROP POLICY IF EXISTS pe_select ON core.feed_likes; DROP POLICY IF EXISTS pe_write ON core.feed_likes; CREATE POLICY tenant_isolation ON core.feed_likes FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.forum_likes; DROP POLICY IF EXISTS content_write ON core.forum_likes; DROP POLICY IF EXISTS personal_select ON core.forum_likes; DROP POLICY IF EXISTS personal_write ON core.forum_likes; DROP POLICY IF EXISTS social_select ON core.forum_likes; DROP POLICY IF EXISTS social_insert ON core.forum_likes; DROP POLICY IF EXISTS social_update ON core.forum_likes; DROP POLICY IF EXISTS social_delete ON core.forum_likes; DROP POLICY IF EXISTS pe_select ON core.forum_likes; DROP POLICY IF EXISTS pe_write ON core.forum_likes; CREATE POLICY tenant_isolation ON core.forum_likes FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS content_select ON core.lesson_comments; DROP POLICY IF EXISTS content_write ON core.lesson_comments; DROP POLICY IF EXISTS personal_select ON core.lesson_comments; DROP POLICY IF EXISTS personal_write ON core.lesson_comments; DROP POLICY IF EXISTS social_select ON core.lesson_comments; DROP POLICY IF EXISTS social_insert ON core.lesson_comments; DROP POLICY IF EXISTS social_update ON core.lesson_comments; DROP POLICY IF EXISTS social_delete ON core.lesson_comments; DROP POLICY IF EXISTS pe_select ON core.lesson_comments; DROP POLICY IF EXISTS pe_write ON core.lesson_comments; CREATE POLICY tenant_isolation ON core.lesson_comments FOR ALL TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id())) WITH CHECK (tenant_id = (SELECT internal.fn_tenant_id()));
-- DROP POLICY IF EXISTS profiles_select_own_staff ON iam.profiles; CREATE POLICY tenant_read ON iam.profiles FOR SELECT TO authenticated USING (tenant_id = (SELECT internal.fn_tenant_id()));
-- COMMIT;
