# 🔍 ANÁLISE: TABELAS DOCUMENTADAS vs CONSULTAS NO CÓDIGO

## 📊 Resumo da Investigação

### **TABELAS DOCUMENTADAS (docs/mapa_copmleto_banco_de_dados.md)**
✅ **Tabelas Confirmadas Existindo:**
- `auth.users` - Supabase nativo ✅
- `profiles` - Perfil do usuário expandido ✅
- `modules` - Módulos de conteúdo ✅
- `lessons` - Aulas/lições ✅  
- `user_progress` - Progresso do usuário ✅
- `achievements` - Sistema de conquistas ✅
- `achievements_progress` - Progresso das conquistas ✅
- `devotional_posts` - Posts devocionais ✅
- `user_devotional_progress` - Progresso devocional ✅

### **TABELAS SENDO CONSULTADAS NO ADMINR DASHBOARD**
❌ **Tabelas Problemáticas (provavelmente não existem):**
- `user_roles` - Consultada mas não documentada
- `aulas` - Consultada mas deveria ser `lessons`
- `instrumentos` - Consultada mas não documentada claramente
- `turmas` - Consultada mas não documentada
- `alunos` - Consultada mas não documentada
- `professores` - Consultada mas não documentada

## 🚨 PROBLEMAS IDENTIFICADOS

### 1. **MISMATCH DE NOMENCLATURA**
```
CÓDIGO USA          | DOCUMENTAÇÃO USA
aulas              | lessons 
instrumentos       | Não definido claramente
turmas             | Não definido
alunos             | Derivado de profiles
professores        | Derivado de profiles
```

### 2. **TABELAS FANTASMA**
Tabelas consultadas que provavelmente não existem:
- `user_roles` 
- `instrumentos`
- `turmas`
- `alunos` 
- `professores`

### 3. **FALLBACKS INADEQUADOS**
O AdminDashboard usa dados mockados quando as consultas falham, mascarando os problemas reais.

## 🔧 AÇÕES CORRETIVAS NECESSÁRIAS

### **FASE 1: VALIDAR TABELAS EXISTENTES**
1. Testar conexão com cada tabela documentada
2. Confirmar estrutura dos campos
3. Verificar políticas RLS

### **FASE 2: CORRIGIR CONSULTAS**
1. Substituir `aulas` por `lessons`
2. Criar/mapear tabelas de instrumentos, turmas, etc.
3. Mapear alunos/professores a partir de `profiles`

### **FASE 3: ELIMINAR DADOS MOCKADOS**
1. Remover fallbacks desnecessários
2. Implementar tratamento de erro adequado
3. Criar consultas eficientes

---
**Status**: ANÁLISE INICIAL COMPLETA
**Próximo Passo**: Testar consultas individuais