-- =============================================
-- Migration: 069_instrument_detail_views.sql
-- =============================================
-- Views públicas para os dados ricos do instrumento (curiosidades, sons,
-- performances, quizzes, relacionados) — a página de detalhe estava ignorando.
-- security_invoker=true: respeita a RLS (content_select p/ authenticated).

create or replace view public.v_instrument_facts
with (security_invoker = true) as
  select id, instrument_id, title, description, image_url, order_index, created_at
  from core.instrument_facts;

create or replace view public.v_instrument_sounds
with (security_invoker = true) as
  select id, instrument_id, title, description, audio_url, sound_type, created_at
  from core.instrument_sounds;

create or replace view public.v_instrument_performances
with (security_invoker = true) as
  select id, instrument_id, artist, title, video_url, description, created_at
  from core.instrument_performances;

create or replace view public.v_instrument_quizzes
with (security_invoker = true) as
  select id, instrument_id, question_type::text as question_type, question,
         correct_answer, options, points, created_at
  from core.instrument_quizzes;

create or replace view public.v_instrument_relations
with (security_invoker = true) as
  select r.id, r.instrument_id, r.related_instrument_id, r.relation_type,
         ri.name as related_name, ri.family as related_family,
         ri.image_url as related_image_url, ri.thumbnail_url as related_thumbnail_url
  from core.instrument_relations r
  join core.instruments ri on ri.id = r.related_instrument_id;

notify pgrst, 'reload schema';
