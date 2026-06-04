-- =============================================
-- Migration: 071_academic_views.sql
-- =============================================
-- Views públicas que faltavam para o domínio acadêmico (currículo).
-- security_invoker=true (respeita content_select para authenticated).

create or replace view public.v_methodologies
with (security_invoker = true) as
  select id, tenant_id, code, name, description, philosophy, key_principles, icon_name, is_active, created_at
  from core.methodologies;

create or replace view public.v_competencies
with (security_invoker = true) as
  select c.id, c.tenant_id, c.methodology_id, c.name, c.description, c.order_index, c.created_at,
         m.name as methodology_name, m.code as methodology_code
  from core.competencies c
  left join core.methodologies m on m.id = c.methodology_id;

create or replace view public.v_modules
with (security_invoker = true) as
  select id, tenant_id, name, description, order_index, is_active, created_at
  from core.modules;

create or replace view public.v_repertoire_categories
with (security_invoker = true) as
  select id, tenant_id, name, description, order_index, is_active, created_at
  from core.repertoire_categories;

notify pgrst, 'reload schema';
