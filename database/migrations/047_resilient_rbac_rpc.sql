-- =============================================
-- Migration 047: Make rpc_get_user_rbac resilient
-- If tenant_id is not in JWT (hook not yet enabled),
-- fall back to looking it up from iam.profiles.
-- Also makes AuthProvider role work without hook.
-- =============================================

CREATE OR REPLACE FUNCTION public.rpc_get_user_rbac()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = iam, core, internal
AS $$
DECLARE
    v_tenant_id uuid;
    v_user_id uuid;
    v_role jsonb;
    v_permissions jsonb;
    v_navigation jsonb;
    v_role_ids uuid[];
BEGIN
    v_user_id := auth.uid();

    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('role', NULL, 'permissions', '[]'::jsonb, 'navigation', '[]'::jsonb);
    END IF;

    -- Try to get tenant_id from JWT first (injected by custom_access_token_hook)
    v_tenant_id := (auth.jwt() ->> 'tenant_id')::uuid;

    -- Fallback: if hook not enabled yet, look up tenant from profiles
    IF v_tenant_id IS NULL THEN
        SELECT p.tenant_id INTO v_tenant_id
        FROM iam.profiles p
        WHERE p.user_id = v_user_id AND p.is_active = true
        ORDER BY p.created_at ASC
        LIMIT 1;
    END IF;

    IF v_tenant_id IS NULL THEN
        RETURN jsonb_build_object('role', NULL, 'permissions', '[]'::jsonb, 'navigation', '[]'::jsonb);
    END IF;

    -- Get role IDs for this user in this tenant
    SELECT array_agg(ur.role_id) INTO v_role_ids
    FROM iam.user_roles ur
    WHERE ur.user_id = v_user_id AND ur.tenant_id = v_tenant_id AND ur.is_active = true;

    -- Get primary role config (highest hierarchy)
    SELECT row_to_json(r)::jsonb INTO v_role
    FROM (
        SELECT r.id, r.slug, r.display_name, r.kanji, r.kanji_meaning,
               r.primary_color, r.secondary_color, r.gradient, r.pattern,
               r.icon_name, r.hierarchy_level, r.is_active
        FROM iam.roles r
        WHERE r.id = ANY(v_role_ids) AND r.is_active = true
        ORDER BY r.hierarchy_level DESC
        LIMIT 1
    ) r;

    -- Get all permissions (union across all roles)
    SELECT COALESCE(jsonb_agg(DISTINCT p.slug), '[]'::jsonb) INTO v_permissions
    FROM iam.role_permissions rp
    JOIN iam.permissions p ON p.id = rp.permission_id
    WHERE rp.role_id = ANY(v_role_ids);

    -- Get navigation for primary role
    SELECT COALESCE(jsonb_agg(nav ORDER BY nav.group_order, nav.item_order), '[]'::jsonb) INTO v_navigation
    FROM (
        SELECT
            ni.slug,
            COALESCE(rn.label_override, ni.label) AS label,
            ni.href,
            ni.icon_name,
            rn.group_name,
            rn.group_order,
            rn.item_order,
            ni.required_permission
        FROM iam.role_navigation rn
        JOIN iam.navigation_items ni ON ni.id = rn.navigation_item_id
        WHERE rn.role_id = (v_role ->> 'id')::uuid
          AND rn.is_active = true
          AND ni.is_active = true
    ) nav;

    RETURN jsonb_build_object(
        'role', v_role,
        'permissions', v_permissions,
        'navigation', v_navigation
    );
END;
$$;

NOTIFY pgrst, 'reload schema';
