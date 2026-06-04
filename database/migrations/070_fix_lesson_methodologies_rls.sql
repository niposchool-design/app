-- =============================================
-- Migration: 070_fix_lesson_methodologies_rls.sql
-- =============================================
-- core.lesson_methodologies estava com RLS totalmente aberta:
--   "Anyone can read..."     SELECT  qual=true            (ignora tenant)
--   "Authenticated manage..." ALL    qual=true/check=true (qualquer aluno escreve!)
-- Alinha ao padrão das demais tabelas de conteúdo curricular:
--   content_select  -> leitura por tenant (authenticated)
--   content_write   -> escrita só admin/professor (mesma expressão das outras 30+ tabelas)

alter table core.lesson_methodologies enable row level security;

drop policy if exists "Anyone can read lesson methodologies" on core.lesson_methodologies;
drop policy if exists "Authenticated manage lesson methodologies" on core.lesson_methodologies;

create policy content_select on core.lesson_methodologies
  for select to authenticated
  using (tenant_id = (select internal.fn_tenant_id()));

create policy content_write on core.lesson_methodologies
  for all to authenticated
  using (
    tenant_id = (select internal.fn_tenant_id())
    and (select (internal.fn_has_role('admin') or internal.fn_has_role('teacher')))
  )
  with check (
    tenant_id = (select internal.fn_tenant_id())
    and (select (internal.fn_has_role('admin') or internal.fn_has_role('teacher')))
  );
