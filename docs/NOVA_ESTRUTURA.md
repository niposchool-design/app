# 🏗️ Nova Estrutura Organizada para Nipo School

## 📁 Estrutura Proposta (Clean Architecture)

```
src/
├── app/                          # 🎯 Configuração da aplicação
│   ├── providers/               # Context providers
│   ├── router/                  # Sistema de rotas
│   └── store/                   # Estado global (se usar Redux/Zustand)
│
├── pages/                       # 📄 Páginas principais (uma pasta = uma rota)
│   ├── auth/
│   │   ├── login.jsx
│   │   └── register.jsx
│   ├── admin/
│   │   ├── dashboard.jsx
│   │   ├── students.jsx
│   │   ├── teachers.jsx
│   │   ├── instruments.jsx
│   │   ├── curriculum.jsx
│   │   ├── classes.jsx
│   │   └── qr-manager.jsx
│   ├── student/
│   │   ├── dashboard.jsx
│   │   ├── lessons.jsx
│   │   └── profile.jsx
│   └── teacher/
│       ├── dashboard.jsx
│       ├── classes.jsx
│       └── materials.jsx
│
├── components/                  # 🧩 Componentes reutilizáveis
│   ├── ui/                     # Componentes básicos de UI
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── modal.jsx
│   │   ├── table.jsx
│   │   └── index.js
│   ├── forms/                  # Componentes de formulário
│   │   ├── student-form.jsx
│   │   ├── instrument-form.jsx
│   │   └── index.js
│   ├── layout/                 # Componentes de layout
│   │   ├── header.jsx
│   │   ├── sidebar.jsx
│   │   ├── footer.jsx
│   │   └── index.js
│   └── common/                 # Componentes comuns
│       ├── loading.jsx
│       ├── error-boundary.jsx
│       └── index.js
│
├── hooks/                      # 🎣 Custom hooks
│   ├── use-auth.js
│   ├── use-students.js
│   ├── use-instruments.js
│   └── use-api.js
│
├── services/                   # 🔌 Serviços e APIs
│   ├── api/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── instruments.js
│   │   └── index.js
│   ├── supabase/
│   │   ├── client.js
│   │   ├── auth.js
│   │   └── database.js
│   └── utils/
│       ├── validation.js
│       ├── formatters.js
│       └── constants.js
│
├── styles/                     # 🎨 Estilos globais
│   ├── globals.css
│   ├── components.css
│   └── utilities.css
│
└── assets/                     # 📦 Recursos estáticos
    ├── images/
    ├── icons/
    └── fonts/
```

## 🎯 Vantagens desta Estrutura

### ✅ **Simplicidade**
- Nomes curtos e diretos
- Uma pasta = uma responsabilidade
- Fácil de navegar

### ✅ **Escalabilidade**
- Fácil adicionar novas páginas
- Componentes organizados por tipo
- Hooks e serviços separados

### ✅ **Manutenção**
- Onde está cada coisa é óbvio
- Imports limpos e previsíveis
- Fácil refatorar

### ✅ **Performance**
- Code splitting natural por páginas
- Lazy loading simples de implementar
- Bundle otimizado

## 🔧 Configuração dos Aliases (vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    }
  }
})
```

## 📋 Exemplo de Migração

### Antes (Atual):
```
src/features/admin/pages/AdminInstruments.jsx
src/shared/components/UI/NipoHeader.jsx
src/features/admin/hooks/useInstruments.js
```

### Depois (Novo):
```
src/pages/admin/instruments.jsx
src/components/layout/header.jsx
src/hooks/use-instruments.js
```

## 🚀 Plano de Migração

1. **Criar nova estrutura** em paralelo
2. **Migrar página por página** testando cada uma
3. **Atualizar imports** usando aliases
4. **Remover estrutura antiga** após validação
5. **Atualizar documentação**

## 📝 Convenções de Nomenclatura

- **Arquivos**: kebab-case (`student-form.jsx`)
- **Componentes**: PascalCase (`StudentForm`)
- **Hooks**: camelCase com "use" (`useStudents`)
- **Constantes**: UPPER_CASE (`API_ENDPOINTS`)

## 🎨 Exemplo de Imports Limpos

```javascript
// ✅ Depois - Limpo e organizado
import Button from '@/components/ui/button'
import { useStudents } from '@/hooks/use-students'
import { studentsApi } from '@/services/api/students'

// ❌ Antes - Confuso e longo
import Button from '../../../shared/components/UI/NipoButton'
import { useStudents } from '../../hooks/useStudents'
import { studentsService } from '../../../services/studentsService'
```

---

**Quer que eu implemente esta nova estrutura? Posso começar criando as pastas e migrando uma página por vez para você validar.**