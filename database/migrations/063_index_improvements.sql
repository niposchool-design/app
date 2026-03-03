-- =============================================
-- Migration 063: Index Improvements
-- =============================================
-- Adds composite indexes for common query patterns
-- identified through view definitions and page queries.
-- All indexes are IF NOT EXISTS for idempotency.

BEGIN;

-- Lessons by module and status (lesson list page filtering)
CREATE INDEX IF NOT EXISTS idx_lessons_module_status
  ON core.lessons(tenant_id, module_id, status)
  WHERE deleted_at IS NULL;

-- AI content by lesson and type (lesson detail page)
CREATE INDEX IF NOT EXISTS idx_ai_content_lesson_type
  ON core.ai_generated_content(lesson_id, content_type, status);

-- Enrollments by student (student dashboard, progress)
CREATE INDEX IF NOT EXISTS idx_enrollments_student_status
  ON core.enrollments(student_id, status);

-- Practice sessions by student and date (practice diary)
CREATE INDEX IF NOT EXISTS idx_practice_student_date
  ON core.practice_sessions(student_id, session_date DESC);

-- AI usage log: daily aggregate (superadmin dashboard)
CREATE INDEX IF NOT EXISTS idx_ai_usage_tenant_day
  ON core.ai_usage_log(tenant_id, (created_at::date));

-- Audit events: recent by tenant (superadmin audit tab)
CREATE INDEX IF NOT EXISTS idx_audit_events_tenant_recent
  ON core.audit_events(tenant_id, created_at DESC);

-- Feature flags: lookup by tenant + key (feature check)
CREATE INDEX IF NOT EXISTS idx_feature_flags_lookup
  ON core.feature_flags(tenant_id, flag_key);

-- Forum topics: active by tenant (community page)
CREATE INDEX IF NOT EXISTS idx_forum_topics_active
  ON core.forum_topics(tenant_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- Feed posts: recent by tenant (feed page)
CREATE INDEX IF NOT EXISTS idx_feed_posts_recent
  ON core.feed_posts(tenant_id, created_at DESC)
  WHERE deleted_at IS NULL;

NOTIFY pgrst, 'reload schema';

COMMIT;
