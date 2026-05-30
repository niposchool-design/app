-- =============================================
-- Migration: 068_instrument_thumbnail.sql
-- =============================================
-- Separa as duas imagens do instrumento:
--   image_url      -> foto colorida (header da página de detalhe)
--   thumbnail_url  -> macro detalhado (card da lista de instrumentos)
-- Aditivo e seguro. Recria v_instruments preservando security_invoker=true.

alter table core.instruments add column if not exists thumbnail_url text;

create or replace view public.v_instruments
with (security_invoker = true) as
 SELECT id,
    tenant_id,
    name,
    family,
    category,
    description,
    detailed_description,
    origin,
    difficulty_level,
    recommended_age_range,
    image_url,
    video_url,
    audio_url,
    popularity,
    display_order,
    is_active,
    created_at,
    updated_at,
    ( SELECT count(*) AS count
           FROM core.instrument_media im
          WHERE im.instrument_id = i.id) AS media_count,
    ( SELECT count(*) AS count
           FROM core.instrument_sounds s
          WHERE s.instrument_id = i.id) AS sounds_count,
    i.thumbnail_url
   FROM core.instruments i
  WHERE is_active = true;

notify pgrst, 'reload schema';
