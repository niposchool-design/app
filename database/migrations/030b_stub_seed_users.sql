-- =============================================
-- Migration: 030b_stub_seed_users.sql
-- Description: Create stub users and courses needed by subsequent migrations:
--              031_user_achievements, 034_enrollments, 035_challenge_submissions.
-- Creates:
--   - 24 stub users (auth.users + iam.profiles + iam.user_roles + core.user_progress)
--   - 3 stub courses (core.courses) referenced by 034_enrollments
-- Tenant: 00000000-0000-0000-0000-000000000001
-- =============================================

DO $$
DECLARE
    _tenant_id  uuid := '00000000-0000-0000-0000-000000000001';
    _unit_id    uuid := '00000000-0000-0000-0000-000000000002';
    _student_role uuid := '00000000-0000-0000-0000-000000000010';
    _uid        uuid;
    _n          integer := 0;
    _uids       uuid[] := ARRAY[
        '07f4a049-faf4-4852-8512-6ef64f2966ff',
        '1dc09e87-282c-47a9-b0b8-6f84d79f300c',
        '1f63bfc3-62d7-48cb-b497-6699cb7d2037',
        '2577157b-8ad4-4c64-870d-189dcf962c33',
        '40bbb718-086b-45b5-b816-55c836c7634d',
        '41f409ee-1614-4bc6-8cce-a02086601dc9',
        '46e25388-417a-4d84-9f3d-fb59c804304d',
        '4d0b00fd-dbb6-4941-9093-61ab7d7b1122',
        '54e79a05-59f7-4cc8-b67f-f522a1b452e4',
        '550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4',
        '5697f078-c2f5-4da6-bb6c-db9ec9764d41',
        '7558a9c8-67c7-4c88-968e-f6a5e193d48c',
        '840f99c4-7479-4098-9c2e-474a695178f0',
        '8483907a-5521-43b1-b824-5068b02a2872',
        '9064ab32-12ce-415a-8c19-51b566608ee5',
        '953666c4-4b76-4d52-8332-6be7323c0f55',
        '9756b78f-ba05-416f-a90d-e35916b3d780',
        '9bbcbdbd-b478-43ab-afa5-ddec11d3a63c',
        'a57eeb22-a246-4243-8e32-98297c6f3bad',
        'a5f0b00a-4c68-4c01-b459-ea55d3ab6907',
        'ae514bfc-c915-473d-bb40-de3b0323e79e',
        'b37a40d9-ba6c-465f-abfc-c441b47edb4d',
        'c91f1974-e102-46dd-b1c3-ba3f06c039af',
        'e64310ba-69bb-41e5-8174-b8d52432f735'
    ];
BEGIN
    FOREACH _uid IN ARRAY _uids LOOP
        _n := _n + 1;

        -- 1. auth.users (Supabase managed table)
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            recovery_token,
            -- Campos de token NÃO podem ficar NULL: o GoTrue falha no login com
            -- "Database error querying schema" (bug corrigido em produção 2026-07-13)
            email_change,
            email_change_token_new,
            email_change_token_current,
            phone_change,
            phone_change_token,
            reauthentication_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            _uid,
            'authenticated',
            'authenticated',
            'aluno' || _n || '@niposchool.seed',
            crypt('SeedUser2024!', gen_salt('bf')),
            now(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            ('{"full_name":"Aluno Seed ' || _n || '"}')::jsonb,
            now(),
            now(),
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ) ON CONFLICT (id) DO NOTHING;

        -- 2. iam.profiles
        INSERT INTO iam.profiles (user_id, tenant_id, unit_id, full_name, display_name)
        VALUES (_uid, _tenant_id, _unit_id, 'Aluno Seed ' || _n, 'Aluno ' || _n)
        ON CONFLICT (user_id, tenant_id) DO NOTHING;

        -- 3. iam.user_roles (student role)
        INSERT INTO iam.user_roles (user_id, tenant_id, role_id)
        VALUES (_uid, _tenant_id, _student_role)
        ON CONFLICT (user_id, tenant_id, role_id) DO NOTHING;

        -- 4. core.user_progress
        INSERT INTO core.user_progress (tenant_id, user_id)
        VALUES (_tenant_id, _uid)
        ON CONFLICT (tenant_id, user_id) DO NOTHING;

    END LOOP;

    RAISE NOTICE '030b_stub_seed_users: created % stub users', _n;
END $$;

-- =============================================
-- STUB COURSES (referenced by 034_enrollments.sql)
-- =============================================
INSERT INTO core.courses (id, tenant_id, unit_id, name, description, level)
VALUES
    ('6b144088-27f3-421a-92be-24a1e4a05661', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002',
     'Turma Seed A', 'Turma de seed para dados de exemplo', 'beginner'),
    ('fc0750bd-9ce4-4f1d-8003-3daed93e872a', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002',
     'Turma Seed B', 'Turma de seed para dados de exemplo', 'beginner'),
    ('c4a209bd-1e64-4e4c-b16c-d0883eb3d4b1', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002',
     'Turma Seed C', 'Turma de seed para dados de exemplo', 'beginner')
ON CONFLICT (id) DO NOTHING;
