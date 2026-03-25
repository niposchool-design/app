-- =============================================
-- Migration 064: Notifications System
-- =============================================
-- Creates the notifications table and view for in-app notifications.
-- Also adds: methodology tracking per lesson, portfolio reflection type,
-- and updates gamification points to align with curriculum.

-- ── 1. Notifications Table ──
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL DEFAULT '',
  notification_type text NOT NULL DEFAULT 'system',
  reference_type text,
  reference_id uuid,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON notifications (user_id, is_read, created_at DESC)
  WHERE is_read = false;

CREATE INDEX IF NOT EXISTS idx_notifications_user_created
  ON notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_tenant
  ON notifications (tenant_id);

-- RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Users can create notifications in their own tenant
    tenant_id IN (
      SELECT (raw_app_meta_data->>'tenant_id')::uuid
      FROM auth.users
      WHERE id = auth.uid()
    )
  );

-- View for easy querying
CREATE OR REPLACE VIEW v_notifications AS
SELECT
  n.*,
  p.full_name AS user_name,
  p.avatar_url AS user_avatar
FROM notifications n
LEFT JOIN profiles p ON p.id = n.user_id;

-- ── 2. Lesson Methodologies Junction Table ──
-- Allows tagging each lesson with the pedagogical methodologies it uses.

DO $$ BEGIN
  CREATE TYPE metodologia_type AS ENUM (
    'orff', 'suzuki', 'kodaly', 'dalcroze', 'gordon',
    'berklee', 'presto', 'waldorf', 'musicalFutures',
    'brasileiras', 'alpha'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS lesson_methodologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  methodology metodologia_type NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lesson_id, methodology)
);

CREATE INDEX IF NOT EXISTS idx_lesson_methodologies_lesson
  ON lesson_methodologies (lesson_id);

ALTER TABLE lesson_methodologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view lesson methodologies"
  ON lesson_methodologies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers/admins can manage lesson methodologies"
  ON lesson_methodologies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('teacher', 'admin')
    )
  );

-- ── 3. Portfolio Reflection Type ──
-- Add 'reflection' as a valid portfolio type if the column allows it.
-- If portfolios.type is text, no change needed. If it's an enum, extend it.
DO $$ BEGIN
  ALTER TYPE portfolio_type ADD VALUE IF NOT EXISTS 'reflection';
EXCEPTION
  WHEN undefined_object THEN
    -- type doesn't exist, portfolios.type is text — no action needed
    NULL;
  WHEN duplicate_object THEN
    NULL;
END $$;

-- ── 4. Gamification Points Alignment ──
-- Update achievement point rewards to match curriculum values.
-- Curriculum: 50pts/aula, 30pts/evidência, 100pts/portfólio.
-- This updates existing achievements if they exist.
UPDATE achievements SET points_reward = 50
  WHERE category = 'progress' AND requirement_type = 'lessons_completed' AND requirement_value = 1
  AND points_reward < 50;

-- ── 5. Navigation: Add new pages ──
-- QR Scanner
INSERT INTO navigation_items (tenant_id, slug, label, href, icon_name, group_name, sort_order, is_active)
SELECT t.id, 'qr-scan', 'Escanear QR', '/qr/scan', 'qr-code', 'Ferramentas', 90, true
FROM tenants t
WHERE NOT EXISTS (SELECT 1 FROM navigation_items WHERE slug = 'qr-scan' AND tenant_id = t.id)
ON CONFLICT DO NOTHING;

-- Family Report
INSERT INTO navigation_items (tenant_id, slug, label, href, icon_name, group_name, sort_order, is_active)
SELECT t.id, 'family-report', 'Relatório Família', '/family-report', 'users', 'Meu Espaço', 85, true
FROM tenants t
WHERE NOT EXISTS (SELECT 1 FROM navigation_items WHERE slug = 'family-report' AND tenant_id = t.id)
ON CONFLICT DO NOTHING;

-- Portfolio Reflection
INSERT INTO navigation_items (tenant_id, slug, label, href, icon_name, group_name, sort_order, is_active)
SELECT t.id, 'portfolio-reflection', 'Reflexão Semanal', '/portfolio/reflection', 'sparkles', 'Meu Espaço', 65, true
FROM tenants t
WHERE NOT EXISTS (SELECT 1 FROM navigation_items WHERE slug = 'portfolio-reflection' AND tenant_id = t.id)
ON CONFLICT DO NOTHING;

-- ── 6. Helper RPC: Create notification ──
CREATE OR REPLACE FUNCTION rpc_create_notification(
  p_tenant_id uuid,
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'system',
  p_ref_type text DEFAULT NULL,
  p_ref_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO notifications (tenant_id, user_id, title, message, notification_type, reference_type, reference_id)
  VALUES (p_tenant_id, p_user_id, p_title, p_message, p_type, p_ref_type, p_ref_id)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;
