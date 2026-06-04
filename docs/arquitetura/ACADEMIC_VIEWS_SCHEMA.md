---
created: 2026-06-04
tags: [niposchool, academico, views, referencia]
type: referencia
---

# Schema das views do Acadêmico (colunas)

Referência para religar as páginas. Todas são views públicas `v_*` (PostgREST),
acessíveis via `supabase.from('v_...')`. Use `(supabase as any).from(...)` se o
tipo não existir em database.types.

## HISTÓRIA (todas as views já existem)
- **v_history_periods**: id, tenant_id, name, description, start_year, end_year, theme_color, cover_image_url, chronological_order, is_active, created_at, composer_count, work_count
- **v_history_composers**: id, tenant_id, full_name, artistic_name, period_id, birth_country, birth_date, death_date, biography, photo_url, importance_level, is_active, created_at, period_name, work_count
- **v_history_works**: id, tenant_id, title, original_title, composer_id, period_id, composition_year, work_type, genre, difficulty_level, popularity, audio_url, video_url, score_url, is_active, created_at, composer_name, composer_artistic_name, period_name
- **v_history_genres**: id, tenant_id, name, slug, origin_period_id, origin_decade, origin_country, description, musical_characteristics, related_genres, main_composers, representative_works, cultural_influences, image_url, theme_color, is_active, created_at, origin_period_name
- **v_history_movements**: id, tenant_id, name, description, start_year, end_year, main_locations, manifesto, characteristics, composers, iconic_works, historical_context, legacy, image_url, is_active, created_at
- **v_history_timeline_events**: id, tenant_id, year, month, day, title, event_type, category, description, composer_id, work_id, period_id, image_url, importance, is_active, created_at, composer_name, composer_artistic_name, work_title, period_name
- **v_history_quizzes**: id, tenant_id, title, period_id, difficulty_level, question_type, question, options (jsonb), correct_answer, explanation, audio_url, image_url, tags, points, is_active, created_at, period_name
- **v_history_theory_concepts**: id, tenant_id, name, category, simple_definition, technical_definition, origin_period_id, audio_examples, diagram_url, difficulty_level, prerequisites, exercises, tags, is_active, created_at, origin_period_name
- **v_history_cultural_contexts**: id, tenant_id, period_id, title, context_type, description, impact_on_music, start_year, end_year, images_url, is_active, created_at, period_name
- **v_history_instrument_evolution**: id, tenant_id, instrument_id, period_id, historical_version, approximate_year, inventor, technical_description, differences_from_modern, image_url, audio_url, curiosities, is_active, created_at, instrument_name, instrument_family, period_name

Contagens: periods 23, composers 40, works 26, genres 32, movements 24, timeline 4, quizzes 18, theory 10, contexts 16, evolution 8.

## REPERTÓRIO
- **v_repertoire**: id, tenant_id, title, composer, arranger, category_id, key_signature, tempo, estimated_duration, difficulty_level, required_instruments, min_participants, sheet_music_url, chord_chart_url, lyrics_url, playback_url, tutorial_video_url, is_public, requires_approval, tags, notes, is_active, created_at, updated_at, category_name
- **v_repertoire_categories**: id, tenant_id, name, description, order_index, is_active, created_at
Contagens: repertoire 19, categories 8. (sheet_music_url/playback_url/tutorial_video_url podem estar vazios/placeholder — renderizar só se houver, sem quebrar.)

## CURRÍCULO / BIBLIOTECA
- **v_library_items**: id, tenant_id, title, description, category, subcategory, file_type, file_url, content (markdown), tags, is_featured, order_index, uploaded_by, created_at, updated_at, uploaded_by_name, uploaded_by_avatar  (65 itens)
- **v_methodologies**: id, tenant_id, code, name, description, philosophy, key_principles, icon_name, is_active, created_at  (9)
- **v_competencies**: id, tenant_id, methodology_id, name, description, order_index, created_at, methodology_name, methodology_code  (9)
- **v_modules**: id, tenant_id, name, description, order_index, is_active, created_at  (11)
- **v_teaching_sequences**: id, tenant_id, title, methodology_id, age_range, duration_weeks, objectives, week_number, main_activity, circle_activity, game_dynamic, required_materials, notes, created_by, created_at, methodology_name, methodology_code, creator_name  (3)
- **v_support_materials**: id, tenant_id, title, material_type, category, description, file_url, module_id, methodology_id, instrument_id, difficulty_level, tags, file_size_mb, duration_seconds, author, license, download_count, view_count, is_active, created_at, module_name, methodology_name, instrument_name  (19)
- **v_learning_paths** / **v_learning_path_steps**: trilhas (já usadas pela página de currículo).
