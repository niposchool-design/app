-- Verificar estrutura das tabelas de roles
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name IN ('role', 'user_roles', 'role_permissions')
ORDER BY table_name, ordinal_position;


| table_name       | column_name   | data_type                | is_nullable |
| ---------------- | ------------- | ------------------------ | ----------- |
| role_permissions | role_id       | bigint                   | NO          |
| role_permissions | permission_id | bigint                   | NO          |
| user_roles       | id            | uuid                     | NO          |
| user_roles       | user_id       | uuid                     | YES         |
| user_roles       | role_type     | text                     | NO          |
| user_roles       | role_level    | integer                  | YES         |
| user_roles       | permissions   | jsonb                    | YES         |
| user_roles       | granted_by    | uuid                     | YES         |
| user_roles       | granted_at    | timestamp with time zone | YES         |
| user_roles       | expires_at    | timestamp with time zone | YES         |
| user_roles       | is_active     | boolean                  | YES         |
| user_roles       | metadata      | jsonb                    | YES         |
| user_roles       | created_at    | timestamp with time zone | YES         |
| user_roles       | updated_at    | timestamp with time zone | YES         |
