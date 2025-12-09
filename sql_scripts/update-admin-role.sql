-- Script para atualizar o role do usuário para admin

-- 1. Verificar role atual
SELECT 
    id,
    email,
    full_name,
    tipo_usuario AS role_atual,
    created_at
FROM profiles
WHERE email = 'junior.sax@gmail.com';

-- 2. Atualizar para admin
UPDATE profiles
SET tipo_usuario = 'admin'
WHERE email = 'junior.sax@gmail.com';

-- 3. Verificar atualização
SELECT 
    id,
    email,
    full_name,
    tipo_usuario AS role_atualizado,
    updated_at
FROM profiles
WHERE email = 'junior.sax@gmail.com';
