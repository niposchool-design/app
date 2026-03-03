# Runbook de Incidentes — Nipo School

## 1. Falha de Autenticação

### Sintomas
- Usuários não conseguem fazer login
- Redirect infinito entre `/login` e `/dashboard`
- Erro "Usuário não autenticado" em ações

### Diagnóstico
1. Verificar status do Supabase: https://status.supabase.com
2. Verificar se o custom access token hook está ativo:
   - Supabase Dashboard → Authentication → Hooks
   - Hook: `iam.custom_access_token_hook` deve estar habilitado
3. Verificar cookies do navegador (devtools → Application → Cookies)
4. Testar sessão via API:
   ```bash
   curl -H "apikey: $ANON_KEY" $SUPABASE_URL/auth/v1/user
   ```

### Resolução
- Se hook desabilitado: reabilitar no dashboard
- Se cookies corrompidos: limpar cookies e fazer login novamente
- Se Supabase fora do ar: aguardar ou verificar região do projeto

---

## 2. Falha de Banco de Dados

### Sintomas
- Erro "DATABASE_ERROR" em ações do servidor
- Páginas não carregam dados
- Timeouts nas queries

### Diagnóstico
1. Verificar status do Supabase
2. Verificar limites de conexão:
   - Dashboard → Settings → Database → Connection Pooling
3. Verificar logs:
   - Dashboard → Logs → Database
4. Testar conectividade:
   ```bash
   curl -H "apikey: $ANON_KEY" "$SUPABASE_URL/rest/v1/v_profiles?limit=1"
   ```

### Resolução
- Connection pooling esgotado: aguardar ou reiniciar projeto
- Query lenta: verificar EXPLAIN ANALYZE na query
- RLS bloqueando: verificar tenant_id no JWT
- Migration pendente: aplicar migrations faltantes no SQL Editor

---

## 3. Falha de IA (OpenAI)

### Sintomas
- Erro ao gerar materiais ou feedback
- "RATE_LIMITED" no ai_usage_log
- Timeout nas gerações

### Diagnóstico
1. Verificar status OpenAI: https://status.openai.com
2. Verificar API key:
   ```bash
   curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
   ```
3. Verificar créditos: https://platform.openai.com/usage
4. Verificar quotas no banco: `SELECT * FROM ai_quotas`
5. Verificar logs: `SELECT * FROM ai_usage_log ORDER BY created_at DESC LIMIT 20`

### Resolução
- API key inválida: gerar nova key no console OpenAI
- Créditos esgotados: adicionar créditos ou trocar organização
- Quota atingida: ajustar limites em `ai_quotas`
- Rate limit OpenAI: reduzir batch size, aumentar intervalo
- Fallback: trocar `AI_MODEL_SMART` para `gpt-4o-mini` (mais barato)

---

## 4. Falha de Storage

### Sintomas
- Upload de arquivos falha
- Imagens/vídeos não carregam
- Erro 403 ao acessar arquivos

### Diagnóstico
1. Verificar bucket policies:
   - Dashboard → Storage → Policies
2. Verificar limites de tamanho:
   - Dashboard → Settings → Storage
3. Testar upload via API:
   ```bash
   curl -X POST "$SUPABASE_URL/storage/v1/object/lessons/test.txt" \
     -H "apikey: $ANON_KEY" \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -d "test content"
   ```

### Resolução
- Policy faltando: adicionar policy para o bucket
- Limite de tamanho: ajustar limite no dashboard (padrão: 50MB)
- CORS: verificar configuração de CORS no Supabase
- Storage cheio: verificar uso no dashboard e limpar arquivos antigos

---

## 5. Falha de Deploy (Vercel)

### Sintomas
- Build falha no Vercel
- Página mostra erro 500
- Deploy travado

### Diagnóstico
1. Verificar logs de build: Vercel Dashboard → Deployments → Build Logs
2. Verificar variáveis de ambiente: Vercel → Settings → Environment Variables
3. Reproduzir localmente:
   ```bash
   npm run build
   ```

### Resolução
- Build error: verificar log, corrigir código, push novamente
- Env var faltando: adicionar no Vercel Settings
- Internal error: tentar redeploy (Vercel → Deployments → Redeploy)
- Rollback: Vercel → Deployments → selecionar deploy anterior → Promote to Production

---

## Contatos de Emergência

| Recurso | Ação |
|---------|------|
| Supabase fora | Aguardar + verificar status.supabase.com |
| OpenAI fora | Desabilitar feature flags de IA temporariamente |
| Vercel fora | Aguardar + verificar vercel.com/status |
| Bug crítico | Rollback para último deploy estável |

## Escalation

1. **L1**: Junior (developer) — bugs, configs, deploys
2. **L2**: Supabase support — database, auth issues
3. **L3**: Vercel support — deployment, hosting issues
