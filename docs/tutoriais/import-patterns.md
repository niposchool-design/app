# 📦 Padrões de Import - Nipo School

## 🎯 Aliases Configurados

O projeto utiliza aliases para imports limpos e organizados:

```javascript
// Aliases disponíveis no vite.config.js e jsconfig.json
'@'            -> './src'
'@/app'        -> './src/app'
'@/features'   -> './src/features'
'@/pages'      -> './src/pages'
'@/shared'     -> './src/shared'
'@/types'      -> './src/types'
'@/styles'     -> './src/styles'
'@/components' -> './src/shared/components'
'@/services'   -> './src/shared/services'
'@/contexts'   -> './src/shared/contexts'
'@/hooks'      -> './src/shared/hooks'
'@/utils'      -> './src/shared/utils'
```

## ✅ Padrões Recomendados

### 1. **Componentes Shared**
```javascript
// ✅ Correto - usar barrel export
import { NipoHeader, NipoHeaderLogo } from '@/components';

// ❌ Evitar - import direto
import NipoHeader from '@/shared/components/UI/NipoHeader';
```

### 2. **Contextos e Hooks**
```javascript
// ✅ Correto - usar aliases
import { useAuth } from '@/contexts/AuthContext';
import { useOrientalNavigation } from '@/hooks/useOrientalNavigation';

// ❌ Evitar - imports relativos
import { useAuth } from '../../../shared/contexts/AuthContext';
```

### 3. **Services e Supabase**
```javascript
// ✅ Correto - usar aliases
import { supabase } from '@/shared/lib/supabase/supabaseClient';
import { turmasService } from '@/features/turmas/services/turmasService';

// ❌ Evitar - imports relativos
import { supabase } from '../../../shared/lib/supabase/supabaseClient';
```

### 4. **Páginas e Features**
```javascript
// ✅ Correto - usar aliases
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import { AdminRoute } from '@/app/router/AdminRoutes';

// ❌ Evitar - imports relativos
import AdminDashboard from '../../../features/admin/pages/AdminDashboard';
```

### 5. **Dentro da mesma feature**
```javascript
// ✅ Permitido - imports relativos dentro da mesma feature
import { instrumentsService } from '../services/instrumentsService';
import { InstrumentCard } from '../components/InstrumentCard';

// ✅ Também correto - usar aliases mesmo dentro da feature
import { instrumentsService } from '@/features/instrumentos/services/instrumentsService';
```

## 🚀 Barrel Exports

### Componentes Shared (`@/components`)
```javascript
// src/shared/components/index.js
export { default as NipoHeader } from './UI/NipoHeader';
export { NipoHeaderLogo } from './UI/NipoLogo';
export { NavigationBar } from './navigation/NavigationBar';
```

### Utils (`@/utils`)
```javascript
// src/shared/utils/index.js
export { formatDate } from './dateUtils';
export { formatCurrency } from './formatUtils';
export { validateEmail } from './validation';
```

## 🔧 Configuração

### **vite.config.js**
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@/components': path.resolve(__dirname, './src/shared/components'),
    // ... outros aliases
  }
}
```

### **jsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/shared/components/*"]
    }
  }
}
```

## 🎨 IntelliSense

Com o `jsconfig.json` configurado, o VS Code oferece:
- ✅ Autocomplete de imports
- ✅ Navegação com Ctrl+Click
- ✅ Refatoração automática
- ✅ Detecção de erros de import

## 📋 Checklist para Novos Arquivos

- [ ] Usar aliases `@` para imports de shared
- [ ] Usar barrel exports quando disponível
- [ ] Evitar imports relativos longos (`../../../`)
- [ ] Agrupar imports por categoria (libraries, @/, relatives)
- [ ] Organizar alfabeticamente dentro de cada grupo

## 🌟 Exemplo Completo

```javascript
// ✅ Estrutura de imports ideal
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Edit, Trash2 } from 'lucide-react';

// Aliases do projeto
import { NipoHeader } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/shared/lib/supabase/supabaseClient';

// Imports relativos (mesma feature)
import { instrumentsService } from '../services/instrumentsService';
import { InstrumentCard } from '../components/InstrumentCard';
```

---

**Status**: ✅ **Sistema de aliases implementado e funcionando!**

- **vite.config.js**: Aliases configurados ✅
- **jsconfig.json**: IntelliSense ativo ✅
- **Barrel exports**: Componentes organizados ✅
- **Arquivos principais**: Imports convertidos ✅