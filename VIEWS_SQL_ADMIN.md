# � VERIFICAÇÃO E CONSULTA DE VIEWS EXISTENTES - ADMIN

## 🎯 **PROBLEMA IDENTIFICADO:**

As páginas admin fazem consultas como:
```javascript
.from('profiles').select('*').eq('tipo_usuario', 'professor')
```

**MAS** `tipo_usuario` não existe na tabela `profiles` - está nos metadados do `auth.users`!

## 🔍 **PRIMEIRO: VERIFICAR VIEWS EXISTENTES**

Execute estas consultas no **SQL Editor do Supabase** para ver quais views já existem:

### **1. Listar todas as views do schema público:**
```sql
SELECT 
    schemaname,
    viewname,
    definition
FROM pg_views 
WHERE schemaname = 'public'
ORDER BY viewname;


| schemaname | viewname                              | definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public     | professores_dashboard_stats           |  SELECT p.id AS professor_id,
    p.full_name AS professor_nome,
    count(pc.id) AS total_conteudos,
    count(pc.id) FILTER (WHERE (pc.tipo = 'video'::text)) AS total_videos,
    count(pc.id) FILTER (WHERE (pc.tipo = 'sacada'::text)) AS total_sacadas,
    count(pc.id) FILTER (WHERE (pc.tipo = 'devocional'::text)) AS total_devocionais,
    count(pc.id) FILTER (WHERE (pc.tipo = 'material'::text)) AS total_materiais,
    COALESCE(sum(pc.visualizacoes), (0)::bigint) AS total_visualizacoes,
    COALESCE(sum(pc.downloads), (0)::bigint) AS total_downloads,
    max(pc.criado_em) AS ultimo_conteudo_criado
   FROM (profiles p
     LEFT JOIN professores_conteudos pc ON (((pc.criado_por = p.id) AND (pc.ativo = true))))
  WHERE (p.tipo_usuario = ANY (ARRAY['professor'::text, 'pastor'::text, 'admin'::text]))
  GROUP BY p.id, p.full_name;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| public     | view_admin_dashboard                  |  SELECT ( SELECT count(*) AS count
           FROM profiles) AS total_users,
    ( SELECT count(*) AS count
           FROM admins
          WHERE (admins.ativo = true)) AS total_admins,
    ( SELECT count(*) AS count
           FROM professores
          WHERE (professores.ativo = true)) AS total_professores,
    ( SELECT count(*) AS count
           FROM alunos
          WHERE (alunos.ativo = true)) AS total_alunos,
    ( SELECT count(*) AS count
           FROM aulas) AS total_aulas,
    ( SELECT count(*) AS count
           FROM instrumentos) AS total_instrumentos,
    ( SELECT count(*) AS count
           FROM professores_conteudos) AS total_conteudos,
    ( SELECT count(*) AS count
           FROM achievements) AS total_achievements,
    ( SELECT count(*) AS count
           FROM audit_activities
          WHERE (audit_activities.created_at >= (CURRENT_DATE - '7 days'::interval))) AS activities_week,
    ( SELECT count(*) AS count
           FROM qr_scans
          WHERE (qr_scans.scanned_at >= (CURRENT_DATE - '7 days'::interval))) AS qr_scans_week,
    ( SELECT count(*) AS count
           FROM user_points_log
          WHERE (user_points_log.created_at >= (CURRENT_DATE - '7 days'::interval))) AS points_awarded_week,
    ( SELECT count(*) AS count
           FROM hook_cache
          WHERE (hook_cache.expires_at > now())) AS active_cache_entries,
    ( SELECT COALESCE(avg(hook_cache.hit_count), (0)::numeric) AS "coalesce"
           FROM hook_cache) AS avg_cache_hits,
    ( SELECT count(*) AS count
           FROM user_notifications
          WHERE (user_notifications.is_read = false)) AS unread_notifications,
    ( SELECT jsonb_agg(jsonb_build_object('user_id', top.id, 'nome', top.nome, 'points', top.total_points) ORDER BY top.total_points DESC) AS jsonb_agg
           FROM ( SELECT profiles.id,
                    profiles.nome,
                    profiles.total_points
                   FROM profiles
                  WHERE (profiles.tipo_usuario = 'estudante'::text)
                  ORDER BY profiles.total_points DESC
                 LIMIT 5) top) AS top_students;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| public     | view_attendance_analytics             |  SELECT a.id AS aula_id,
    a.numero,
    a.titulo,
    a.data_programada,
    a.status,
    ( SELECT count(*) AS count
           FROM alunos
          WHERE (alunos.ativo = true)) AS total_enrolled,
    0 AS total_present,
    0 AS confirmed_present,
    (0)::numeric AS attendance_percentage,
    ( SELECT count(*) AS count
           FROM qr_codes qr
          WHERE ((qr.aula_id = a.id) AND (qr.type = 'attendance'::text))) AS qr_codes_generated,
    ( SELECT count(*) AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE (qr.aula_id = a.id)) AS qr_scans_total,
    ( SELECT count(*) AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE ((qr.aula_id = a.id) AND (qs.result = 'success'::text))) AS qr_scans_success
   FROM aulas a;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| public     | view_aulas_admin                      |  SELECT a.id,
    a.numero,
    a.titulo,
    a.status,
    a.objetivo_didatico,
    a.resumo_atividades,
    a.desafio_alpha,
    a.nivel,
    a.formato,
    a.data_programada,
    a.criado_em,
    m.nome AS modulo_nome,
    u.nome AS responsavel_nome
   FROM ((aulas a
     LEFT JOIN modulos m ON ((a.modulo_id = m.id)))
     LEFT JOIN usuarios u ON ((a.responsavel_id = u.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| public     | view_aulas_aluno                      |  SELECT a.id,
    a.numero,
    a.titulo,
    a.data_programada,
    a.desafio_alpha
   FROM aulas a
  WHERE (a.status = 'liberada'::text);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| public     | view_aulas_professor                  |  SELECT a.id,
    a.numero,
    a.titulo,
    a.status,
    a.objetivo_didatico,
    a.resumo_atividades,
    a.data_programada,
    a.desafio_alpha,
    m.nome AS modulo_nome
   FROM (aulas a
     LEFT JOIN modulos m ON ((a.modulo_id = m.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| public     | view_placar_logos                     |  SELECT l.id,
    l.nome,
    l.descricao,
    l.url,
    l.ativo,
    COALESCE(count(p.voted_logo), (0)::bigint) AS votos,
    round(
        CASE
            WHEN (total_votes.total > 0) THEN (((count(p.voted_logo))::numeric / (total_votes.total)::numeric) * (100)::numeric)
            ELSE (0)::numeric
        END, 2) AS percentual
   FROM ((logos l
     LEFT JOIN profiles p ON ((l.id = p.voted_logo)))
     CROSS JOIN ( SELECT count(*) AS total
           FROM profiles
          WHERE (profiles.voted_logo IS NOT NULL)) total_votes)
  WHERE (l.ativo = true)
  GROUP BY l.id, l.nome, l.descricao, l.url, l.ativo, total_votes.total
  ORDER BY COALESCE(count(p.voted_logo), (0)::bigint) DESC, l.nome;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| public     | view_professor_dashboard              |  SELECT p.id,
    COALESCE(( SELECT pr.nome
           FROM profiles pr
          WHERE (pr.id = p.id)), ( SELECT pr.full_name
           FROM profiles pr
          WHERE (pr.id = p.id)), ('Professor '::text || (p.id)::text)) AS nome,
    false AS admin_access,
    0 AS total_conteudos,
    0 AS total_videos,
    0 AS total_sacadas,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM qr_codes qr
          WHERE (qr.created_by = p.id)), 0) AS qr_codes_created,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM qr_codes qr
          WHERE ((qr.created_by = p.id) AND (qr.is_active = true))), 0) AS qr_codes_active,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE (qr.created_by = p.id)), 0) AS total_qr_scans,
    COALESCE(( SELECT (sum(qs.points_awarded))::integer AS sum
           FROM (qr_scans qs
             JOIN qr_codes qr ON ((qs.qr_code_id = qr.id)))
          WHERE ((qr.created_by = p.id) AND (qs.result = 'success'::text))), 0) AS points_awarded_via_qr,
    COALESCE(( SELECT (count(*))::integer AS count
           FROM audit_activities aa
          WHERE ((aa.user_id = p.id) AND (aa.created_at >= (CURRENT_DATE - '7 days'::interval)))), 0) AS recent_activities
   FROM professores p
  WHERE (p.ativo = true);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| public     | view_qr_analytics                     |  SELECT qr.id,
    qr.code,
    qr.type,
    qr.created_by,
    p.nome AS creator_name,
    qr.aula_id,
    a.titulo AS aula_titulo,
    qr.expires_at,
    qr.max_scans,
    qr.current_scans,
    qr.is_active,
    count(qs.id) AS total_scans,
    count(
        CASE
            WHEN (qs.result = 'success'::text) THEN 1
            ELSE NULL::integer
        END) AS successful_scans,
    count(DISTINCT qs.user_id) AS unique_users,
    sum(qs.points_awarded) AS total_points_awarded,
    qr.created_at
   FROM (((qr_codes qr
     LEFT JOIN profiles p ON ((qr.created_by = p.id)))
     LEFT JOIN aulas a ON ((qr.aula_id = a.id)))
     LEFT JOIN qr_scans qs ON ((qr.id = qs.qr_code_id)))
  GROUP BY qr.id, p.nome, a.titulo;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| public     | view_user_gamification                |  SELECT p.id,
    p.nome,
    p.full_name,
    p.total_points,
    p.current_streak,
    p.best_streak,
    p.lessons_completed,
    p.modules_completed,
    p.user_level,
    ( SELECT count(*) AS count
           FROM user_achievements ua
          WHERE (ua.user_id = p.id)) AS total_achievements,
    ( SELECT count(*) AS count
           FROM user_achievements ua
          WHERE ((ua.user_id = p.id) AND (ua.earned_at >= (CURRENT_DATE - '7 days'::interval)))) AS recent_achievements,
    ( SELECT count(*) AS count
           FROM user_points_log upl
          WHERE ((upl.user_id = p.id) AND (upl.created_at >= (CURRENT_DATE - '7 days'::interval)))) AS points_this_week,
    rank() OVER (ORDER BY p.total_points DESC) AS points_rank
   FROM profiles p
  WHERE (p.tipo_usuario = 'estudante'::text);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| public     | vw_forum_stats                        |  SELECT fp.id,
    fp.titulo,
    fp.categoria,
    fp.status,
    fp.nivel_urgencia,
    p.nome AS aluno_nome,
    m.nome AS modulo_nome,
    count(fr.id) AS total_respostas,
    count(
        CASE
            WHEN (fr.eh_resposta_oficial = true) THEN 1
            ELSE NULL::integer
        END) AS respostas_oficiais,
    fp.visualizacoes,
    fp.created_at,
    fp.updated_at
   FROM (((forum_perguntas fp
     LEFT JOIN profiles p ON ((p.id = fp.aluno_id)))
     LEFT JOIN modulos m ON ((m.id = fp.modulo_id)))
     LEFT JOIN forum_respostas fr ON ((fr.pergunta_id = fp.id)))
  GROUP BY fp.id, fp.titulo, fp.categoria, fp.status, fp.nivel_urgencia, p.nome, m.nome, fp.visualizacoes, fp.created_at, fp.updated_at
  ORDER BY fp.updated_at DESC;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| public     | vw_metodologias_stats                 |  SELECT me.id,
    me.nome,
    me.origem,
    me.descricao_resumo,
    me.faixa_etaria_ideal,
    me.principios_fundamentais,
    me.vantagens,
    me.aplicacao_brasileira,
    count(ma.id) AS materiais_relacionados,
    me.created_at
   FROM (metodologias_ensino me
     LEFT JOIN materiais_apoio ma ON ((ma.metodologia_relacionada_id = me.id)))
  WHERE (me.ativa = true)
  GROUP BY me.id, me.nome, me.origem, me.descricao_resumo, me.faixa_etaria_ideal, me.principios_fundamentais, me.vantagens, me.aplicacao_brasileira, me.created_at
  ORDER BY me.nome;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| public     | vw_repertorio_stats                   |  SELECT rm.id,
    rm.titulo,
    rm.artista,
    rm.genero,
    rm.nivel,
    rm.instrumento_principal_id,
    i.nome AS instrumento_nome,
    rm.tags,
    rm.tempo_bpm,
    rm.tonalidade,
    rm.observacoes_professor,
    rm.created_at
   FROM (repertorio_musical rm
     LEFT JOIN instrumentos i ON ((i.id = rm.instrumento_principal_id)))
  WHERE (rm.ativo = true)
  ORDER BY rm.genero, rm.nivel, rm.titulo;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| public     | vw_violin_ids                         |  SELECT instrumentos.id AS instrumento_id,
    instrumentos.nome
   FROM instrumentos
  WHERE ((lower((instrumentos.nome)::text) = 'violino'::text) OR (lower((instrumentos.nome)::text) = 'violin'::text) OR (lower((instrumentos.nome)::text) ~~ 'violino%'::text) OR (lower((instrumentos.nome)::text) ~~ 'violin%'::text));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| public     | vw_violino_instrumento_sons           |  SELECT s.id,
    s.instrumento_id,
    s.nota_musical,
    s.tecnica,
    s.dinamica,
    s.arquivo_audio,
    s.waveform_data,
    s.bpm,
    s.tonalidade,
    s.artista_performer,
    s.created_at
   FROM instrumento_sons s
  WHERE (s.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| public     | vw_violino_instrumento_sons_variacoes |  SELECT v.id,
    v.som_id,
    v.arquivo_audio,
    v.artista_performer,
    v.qualidade_gravacao,
    v.instrumento_usado,
    v.local_gravacao,
    v.ano_gravacao,
    v.duracao_segundos,
    v.created_at
   FROM (instrumento_sons_variacoes v
     JOIN instrumento_sons s ON ((s.id = v.som_id)))
  WHERE (s.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| public     | vw_violino_instrumentos               |  SELECT i.id,
    i.nome,
    i.categoria,
    i.descricao,
    i.imagem_url,
    i.ativo,
    i.ordem_exibicao,
    i.criado_em,
    i.historia,
    i.origem,
    i.familia_instrumental,
    i.material_principal,
    i.tecnica_producao_som,
    i.dificuldade_aprendizado,
    i.anatomia_partes,
    i.curiosidades
   FROM (instrumentos i
     JOIN vw_violin_ids v ON ((v.instrumento_id = i.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| public     | vw_violino_instrumentos_relacionados  |  SELECT r.id,
    r.instrumento_id,
    r.relacionado_id,
    r.tipo_relacao,
    r.descricao_relacao,
    r.similaridade_score,
    r.created_at,
    i.nome AS instrumento_nome,
    rel.nome AS relacionado_nome
   FROM ((instrumentos_relacionados r
     LEFT JOIN instrumentos i ON ((i.id = r.instrumento_id)))
     LEFT JOIN instrumentos rel ON ((rel.id = r.relacionado_id)))
  WHERE ((r.instrumento_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids)) OR (r.relacionado_id IN ( SELECT vw_violin_ids.instrumento_id
           FROM vw_violin_ids)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| public     | vw_violino_palestra                   |  WITH base AS (
         SELECT vw_violino_instrumentos.id,
            vw_violino_instrumentos.nome,
            vw_violino_instrumentos.categoria,
            vw_violino_instrumentos.descricao,
            vw_violino_instrumentos.imagem_url,
            vw_violino_instrumentos.ativo,
            vw_violino_instrumentos.ordem_exibicao,
            vw_violino_instrumentos.criado_em,
            vw_violino_instrumentos.historia,
            vw_violino_instrumentos.origem,
            vw_violino_instrumentos.familia_instrumental,
            vw_violino_instrumentos.material_principal,
            vw_violino_instrumentos.tecnica_producao_som,
            vw_violino_instrumentos.dificuldade_aprendizado,
            vw_violino_instrumentos.anatomia_partes,
            vw_violino_instrumentos.curiosidades
           FROM vw_violino_instrumentos
        )
 SELECT b.id AS instrumento_id,
    b.nome AS instrumento,
    b.descricao AS o_que_e,
    b.familia_instrumental AS familia,
    b.origem,
    b.material_principal AS material,
    b.tecnica_producao_som AS como_produz_som,
    b.dificuldade_aprendizado AS dificuldade,
        CASE
            WHEN ((pg_typeof(b.anatomia_partes))::text = ANY (ARRAY['json'::text, 'jsonb'::text])) THEN b.anatomia_partes
            ELSE NULL::jsonb
        END AS anatomia_partes,
    b.imagem_url,
    b.categoria,
    b.ativo,
    b.ordem_exibicao,
    b.criado_em,
    b.historia,
        CASE
            WHEN ((pg_typeof(b.curiosidades))::text = 'text[]'::text) THEN to_jsonb(b.curiosidades)
            ELSE
            CASE
                WHEN (jsonb_typeof(b.curiosidades) = 'array'::text) THEN b.curiosidades
                ELSE jsonb_build_array(b.curiosidades)
            END
        END AS curiosidades,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('arquivo_audio', s.arquivo_audio, 'artista', s.artista_performer, 'bpm', s.bpm, 'nota', s.nota_musical, 'tonalidade', s.tonalidade, 'tecnica', s.tecnica, 'dinamica', s.dinamica, 'created_at', s.created_at) ORDER BY s.created_at) AS jsonb_agg
           FROM instrumento_sons s
          WHERE (s.instrumento_id = b.id)), '[]'::jsonb) AS sons_exemplos,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('arquivo_audio', v.arquivo_audio, 'artista', v.artista_performer, 'ano_gravacao', v.ano_gravacao, 'local_gravacao', v.local_gravacao, 'duracao_segundos', v.duracao_segundos, 'instrumento_usado', v.instrumento_usado, 'qualidade_gravacao', v.qualidade_gravacao, 'created_at', v.created_at) ORDER BY v.created_at) AS jsonb_agg
           FROM (instrumento_sons_variacoes v
             JOIN instrumento_sons s ON ((s.id = v.som_id)))
          WHERE (s.instrumento_id = b.id)), '[]'::jsonb) AS sons_variacoes,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('relacionado_id', r.relacionado_id, 'relacionado_nome', rel.nome, 'tipo_relacao', r.tipo_relacao, 'descricao', r.descricao_relacao, 'similaridade', r.similaridade_score, 'created_at', r.created_at) ORDER BY r.created_at) AS jsonb_agg
           FROM (instrumentos_relacionados r
             LEFT JOIN instrumentos rel ON ((rel.id = r.relacionado_id)))
          WHERE (r.instrumento_id = b.id)), '[]'::jsonb) AS relacionados
   FROM base b; |
```

### **2. Verificar views específicas do admin:**
```sql
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'VIEW'
  AND table_name LIKE '%admin%'
ORDER BY table_name;

| table_name           | table_type |
| -------------------- | ---------- |
| view_admin_dashboard | VIEW       |
| view_aulas_admin     | VIEW       |
```

### **3. Verificar se views específicas existem:**
```sql
-- Verificar view admin_professores
SELECT EXISTS (
    SELECT 1 FROM information_schema.views 
    WHERE table_schema = 'public' 
    AND table_name = 'admin_professores'
) as admin_professores_existe;

| admin_professores_existe |
| ------------------------ |
| false                    |

-- Verificar view admin_alunos
SELECT EXISTS (
    SELECT 1 FROM information_schema.views 
    WHERE table_schema = 'public' 
    AND table_name = 'admin_alunos'
) as admin_alunos_existe;

| admin_alunos_existe |
| ------------------- |
| false               |

-- Verificar view admin_usuarios_completos
SELECT EXISTS (
    SELECT 1 FROM information_schema.views 
    WHERE table_schema = 'public' 
    AND table_name = 'admin_usuarios_completos'
) as admin_usuarios_completos_existe;

| admin_usuarios_completos_existe |
| ------------------------------- |
| false                           |
```

### **4. Verificar estrutura das views existentes:**
```sql
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('admin_professores', 'admin_alunos', 'admin_usuarios_completos')
ORDER BY table_name, ordinal_position;


nada
```

## 📊 **SE AS VIEWS JÁ EXISTIREM - CONSULTAS DE TESTE:**

### **Teste 1: View admin_professores**
```sql
-- Ver estrutura
\d admin_professores

-- Testar dados
SELECT 
    id,
    email,
    nome,
    instrument,
    status_atividade,
    professor_desde,
    total_points,
    last_active
FROM admin_professores 
LIMIT 5;

ERROR:  42P01: relation "admin_professores" does not exist
LINE 10: FROM admin_professores 
              ^

-- Contar registros
SELECT COUNT(*) as total_professores FROM admin_professores;

ERROR:  42P01: relation "admin_professores" does not exist
LINE 1: SELECT COUNT(*) as total_professores FROM admin_professores;
                                                  ^
Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.

```

### **Teste 2: View admin_alunos**
```sql
-- Ver estrutura  
\d admin_alunos

-- Testar dados
SELECT 
    id,
    email,
    nome,
    instrument,
    instrumento_nome,
    status_atividade,
    idade,
    total_points,
    current_streak,
    lessons_completed
FROM admin_alunos 
LIMIT 5;


ERROR:  42P01: relation "admin_alunos" does not exist
LINE 12: FROM admin_alunos 
              ^

-- Contar registros
SELECT COUNT(*) as total_alunos FROM admin_alunos;
```

ERROR:  42P01: relation "admin_alunos" does not exist
LINE 1: SELECT COUNT(*) as total_alunos FROM admin_alunos;
                                             ^
Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.

### **Teste 3: View admin_usuarios_completos**
```sql
-- Ver estrutura
\d admin_usuarios_completos

-- Testar dados
SELECT 
    id,
    email,
    tipo_usuario,
    tipo_efetivo,
    full_name,
    instrument,
    status_atividade,
    last_active
FROM admin_usuarios_completos 
LIMIT 10;

ERROR:  42P01: relation "admin_usuarios_completos" does not exist
LINE 10: FROM admin_usuarios_completos 
              ^

-- Contar por tipo
SELECT 
    tipo_efetivo,
    COUNT(*) as quantidade
FROM admin_usuarios_completos 
GROUP BY tipo_efetivo;


ERROR:  42P01: relation "admin_usuarios_completos" does not exist
LINE 4: FROM admin_usuarios_completos 
             ^
Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.
```

## 🚀 **COMO PROCEDER:**

### **1. Execute as consultas de verificação:**
```sql
-- Verificar se as views existem
SELECT 
    'admin_professores' as view_name,
    EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_professores'
    ) as exists
UNION ALL
SELECT 
    'admin_alunos' as view_name,
    EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_alunos'
    ) as exists
UNION ALL
SELECT 
    'admin_usuarios_completos' as view_name,
    EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_usuarios_completos'
    ) as exists;
```sql
-- Esta consulta mostra todas as views
SELECT viewname FROM pg_views WHERE schemaname = 'public';
```

### **2. Se as views existirem:**
- Teste as consultas acima
- Copie os resultados e me envie
- Vou atualizar as páginas admin para usar as views

### **3. Se as views NÃO existirem:**
- Me confirme quais não existem
- Vou criar apenas as que faltam
- Depois testamos juntos

## � **SE PRECISAR CRIAR VIEWS - SCRIPTS PRONTOS:**

*Execute apenas se as views não existirem:*

### **VIEW: `admin_usuarios_completos`** (se não existir)
```sql
CREATE OR REPLACE VIEW admin_usuarios_completos AS
SELECT 
    u.id,
    u.email,
    u.raw_user_meta_data ->> 'tipo_usuario' as tipo_usuario,
    u.raw_user_meta_data ->> 'full_name' as nome_auth,
    u.created_at as auth_created,
    u.last_sign_in_at,
    u.email_confirmed_at,
    
    -- Dados do perfil
    p.full_name,
    p.dob,
    p.instrument,
    p.avatar_url,
    p.user_level,
    p.total_points,
    p.current_streak,
    p.best_streak,
    p.lessons_completed,
    p.modules_completed,
    p.theme_preference,
    p.notification_enabled,
    p.sound_enabled,
    p.has_voted,
    p.joined_at as profile_joined,
    p.last_active,
    p.city,
    p.state,
    
    -- Status nas tabelas específicas
    CASE 
        WHEN a.id IS NOT NULL THEN 'aluno'
        WHEN prof.id IS NOT NULL THEN 'professor' 
        WHEN u.raw_user_meta_data ->> 'tipo_usuario' = 'admin' THEN 'admin'
        ELSE 'indefinido'
    END as tipo_efetivo,
    
    -- Dados específicos de alunos
    a.instrumento_id as aluno_instrumento_id,
    a.nivel as aluno_nivel,
    a.turma as aluno_turma,
    a.data_ingresso as aluno_data_ingresso,
    a.ativo as aluno_ativo,
    
    -- Dados específicos de professores  
    prof.formacao as professor_formacao,
    prof.biografia as professor_biografia,
    prof.especialidades as professor_especialidades,
    prof.ativo as professor_ativo,
    
    -- Nome do instrumento
    i.nome as instrumento_nome,
    i.categoria as instrumento_categoria

FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN alunos a ON u.id = a.id  
LEFT JOIN professores prof ON u.id = prof.id
LEFT JOIN instrumentos i ON (a.instrumento_id = i.id OR p.instrument = i.nome);
```

### **VIEW: `admin_professores`** (se não existir)
```sql
CREATE OR REPLACE VIEW admin_professores AS
SELECT 
    u.id,
    u.email,
    COALESCE(p.full_name, u.raw_user_meta_data ->> 'full_name') as nome,
    p.instrument,
    p.avatar_url,
    p.user_level,
    p.total_points,
    p.current_streak,
    p.lessons_completed,
    p.modules_completed,
    p.last_active,
    p.joined_at,
    p.city,
    p.state,
    
    -- Dados específicos de professor
    prof.formacao,
    prof.biografia,
    prof.especialidades,
    COALESCE(prof.ativo, true) as ativo,
    prof.criado_em as professor_desde,
    
    -- Status baseado na atividade
    CASE 
        WHEN p.last_active IS NULL THEN 'nunca_acessou'
        WHEN p.last_active > NOW() - INTERVAL '7 days' THEN 'ativo'
        WHEN p.last_active > NOW() - INTERVAL '30 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    
    u.created_at as cadastro_auth,
    u.last_sign_in_at as ultimo_login

FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN professores prof ON u.id = prof.id
WHERE u.raw_user_meta_data ->> 'tipo_usuario' = 'professor'
   OR prof.id IS NOT NULL
ORDER BY prof.criado_em DESC, p.joined_at DESC;
```

### **VIEW: `admin_alunos`** (se não existir)
```sql
CREATE OR REPLACE VIEW admin_alunos AS
SELECT 
    u.id,
    u.email,
    COALESCE(p.full_name, u.raw_user_meta_data ->> 'full_name') as nome,
    p.instrument,
    p.avatar_url,
    p.user_level,
    p.total_points,
    p.current_streak,
    p.best_streak,
    p.lessons_completed,
    p.modules_completed,
    p.last_active,
    p.joined_at,
    p.city,
    p.state,
    p.dob,
    
    -- Dados específicos de aluno
    a.instrumento_id,
    a.nivel as aluno_nivel,
    a.turma,
    a.data_ingresso,
    COALESCE(a.ativo, true) as ativo,
    
    -- Instrumento info
    i.nome as instrumento_nome,
    i.categoria as instrumento_categoria,
    
    -- Status baseado na atividade
    CASE 
        WHEN p.last_active IS NULL THEN 'nunca_acessou'
        WHEN p.last_active > NOW() - INTERVAL '3 days' THEN 'ativo'
        WHEN p.last_active > NOW() - INTERVAL '14 days' THEN 'moderado'
        ELSE 'inativo'
    END as status_atividade,
    
    -- Idade calculada
    CASE 
        WHEN p.dob IS NOT NULL THEN 
            EXTRACT(YEAR FROM AGE(p.dob))
        ELSE NULL
    END as idade,
    
    u.created_at as cadastro_auth,
    u.last_sign_in_at as ultimo_login

FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN alunos a ON u.id = a.id
LEFT JOIN instrumentos i ON a.instrumento_id = i.id
WHERE u.raw_user_meta_data ->> 'tipo_usuario' = 'aluno'
   OR a.id IS NOT NULL
ORDER BY a.data_ingresso DESC, p.joined_at DESC;
```

### **VIEW: `admin_estatisticas`** (se não existir)
```sql
CREATE OR REPLACE VIEW admin_estatisticas AS
SELECT 
    'resumo_geral' as categoria,
    json_build_object(
        'total_usuarios', (SELECT COUNT(*) FROM auth.users),
        'total_professores', (SELECT COUNT(*) FROM admin_professores),
        'total_alunos', (SELECT COUNT(*) FROM admin_alunos),
        'usuarios_ativos_7d', (
            SELECT COUNT(*) FROM profiles 
            WHERE last_active > NOW() - INTERVAL '7 days'
        ),
        'usuarios_cadastrados_30d', (
            SELECT COUNT(*) FROM auth.users 
            WHERE created_at > NOW() - INTERVAL '30 days'
        ),
        'total_pontos', (SELECT SUM(total_points) FROM profiles),
        'media_streak', (SELECT AVG(current_streak) FROM profiles WHERE current_streak > 0)
    ) as dados

UNION ALL

SELECT 
    'instrumentos' as categoria,
    json_agg(
        json_build_object(
            'instrumento', i.nome,
            'categoria', i.categoria, 
            'quantidade_alunos', COUNT(p.id),
            'quantidade_professores', COUNT(prof.id)
        )
    ) as dados
FROM instrumentos i
LEFT JOIN profiles p ON p.instrument = i.nome
LEFT JOIN professores prof ON prof.especialidades @> ARRAY[i.nome]
WHERE i.ativo = true
GROUP BY i.id, i.nome, i.categoria

UNION ALL

SELECT 
    'atividade_mensal' as categoria,
    json_agg(
        json_build_object(
            'mes', TO_CHAR(date_trunc('month', last_active), 'YYYY-MM'),
            'usuarios_ativos', COUNT(*)
        ) ORDER BY date_trunc('month', last_active)
    ) as dados
FROM profiles 
WHERE last_active >= NOW() - INTERVAL '12 months'
GROUP BY date_trunc('month', last_active);
```

## 🎯 **RESULTADO ESPERADO:**

Após executar as consultas de verificação, você deve me enviar:

1. **Lista de views existentes** 
2. **Resultados dos testes** (se as views existirem)
3. **Quais views faltam** (se alguma não existir)

### **✅ PRÓXIMO PASSO:**
Com essas informações, vou atualizar o frontend para usar as views corretas e garantir que as páginas admin funcionem perfeitamente!

**Execute primeiro as consultas de verificação e me envie os resultados!** 🔍✅**Execute as Views e depois vou atualizar o cliente para usá-las!** 🚀