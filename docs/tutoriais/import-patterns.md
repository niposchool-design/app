# Padroes de Import - Nipo School

**Ultima atualizacao:** 2026-03-02

---

## Alias ativo

Alias principal no projeto:

- `@/*` -> raiz do projeto

Exemplos:

```ts
import { createClient } from '@/lib/supabase/server'
import { loadUserRBAC } from '@/app/actions/rbac-actions'
import { PermissionGate } from '@/components/auth/PermissionGate'
```

---

## Regras praticas

1. Preferir imports absolutos com `@/`.
2. Evitar paths relativos longos (`../../../`).
3. Em arquivos de `app/actions`, manter dependencias server-side explicitas.
4. Nao usar exemplos legados de `features/*`.
