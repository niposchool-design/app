# 🎌 Estrutura do Projeto Nipo School

## 📁 Estrutura de Diretórios

```
nipo_school/
├── 📂 src/                          # Código fonte da aplicação
│   ├── 📂 app/                      # Configuração principal do app
│   │   └── app.jsx                  # Componente raiz da aplicação
│   │   └── main.jsx                 # Entry point
│   ├── 📂 pages/                    # Páginas da aplicação
│   │   └── LandingPage.jsx          # Landing page institucional
│   ├── 📂 components/               # Componentes reutilizáveis
│   ├── 📂 shared/                   # Componentes compartilhados
│   │   └── components/UI/           # Componentes de UI (NipoUI, NipoLogo)
│   ├── 📂 contexts/                 # React Contexts (Auth, etc)
│   ├── 📂 router/                   # Sistema de rotas
│   ├── 📂 styles/                   # Estilos globais e CSS
│   ├── 📂 features/                 # Módulos por funcionalidade
│   ├── 📂 hooks/                    # Custom React hooks
│   ├── 📂 services/                 # Serviços e APIs
│   ├── 📂 lib/                      # Bibliotecas e utilitários
│   └── 📂 config/                   # Configurações
│
├── 📂 public/                       # Assets públicos estáticos
│
├── 📂 docs/                         # 📚 Documentação completa
│   ├── Nipo_School-Sistema_de_Design_e_Normativas_UX_UI.md
│   ├── DOCUMENTACAO_COMPLETA_NIPO_SCHOOL.md
│   └── ... (toda documentação do projeto)
│
├── 📂 scripts/                      # Scripts de desenvolvimento
│   ├── 📂 tests/                    # Scripts de teste
│   │   ├── test-alpha-*.mjs
│   │   └── ... (todos os test-*.mjs)
│   └── 📂 database/                 # Scripts de banco de dados
│       ├── create-*.mjs
│       ├── populate-*.mjs
│       └── implementacao-modulos-restantes.sql
│
├── 📂 database/                     # Schema e estrutura do DB
│   └── centro_estudos_schema.sql
│
├── 📂 sql_scripts/                  # Scripts SQL adicionais
│
├── 📂 src_backup_*/                 # Backups de código (histórico)
│
├── 📄 package.json                  # Dependências do projeto
├── 📄 vite.config.js                # Configuração do Vite
├── 📄 tailwind.config.js            # Configuração do Tailwind CSS
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 eslint.config.js              # Configuração ESLint
├── 📄 postcss.config.js             # Configuração PostCSS
├── 📄 vercel.json                   # Deploy Vercel
├── 📄 .env                          # Variáveis de ambiente
├── 📄 README.md                     # Documentação principal
└── 📄 ESTRUTURA.md                  # Este arquivo
```

## 🎯 Estrutura de Trabalho Atual

### ✅ Estado Atual (Outubro 2025)

**Landing Page Principal**
- ✅ `src/pages/LandingPage.jsx` - Landing institucional completa
- ✅ Design System aplicado (cores Nipo, tipografia Inter)
- ✅ Mobile-first e responsivo
- ✅ Componentes NipoUI integrados

**Configuração Base**
- ✅ Vite + React 18
- ✅ TailwindCSS com paleta customizada
- ✅ Estrutura limpa e organizada

### 🔄 Próximos Passos

1. **Sistema de Autenticação**
   - Implementar login/registro
   - Integração com Supabase
   - Redirecionamento por roles

2. **Dashboards por Tipo de Usuário**
   - Admin Dashboard
   - Professor Dashboard
   - Aluno Dashboard

3. **Módulos Educacionais**
   - Centro de Estudos
   - Sistema de Aulas
   - Gamificação

## 📋 Convenções

### Nomenclatura de Arquivos
- Componentes React: `PascalCase.jsx`
- Utilitários: `camelCase.js`
- Estilos: `kebab-case.css`
- Scripts: `kebab-case.mjs`

### Estrutura de Componentes
```jsx
// src/components/ExemploComponente.jsx
import React from 'react';

/**
 * ExemploComponente - Descrição breve
 * @param {Object} props - Propriedades do componente
 */
const ExemploComponente = ({ prop1, prop2 }) => {
  return (
    <div className="nipo-classes">
      {/* Conteúdo */}
    </div>
  );
};

export default ExemploComponente;
```

### Classes CSS Padronizadas
- Prefixo `nipo-` para classes customizadas
- Usar Tailwind como base
- Seguir o Design System documentado

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento (localhost:3000)

# Build
npm run build            # Build de produção
npm run preview          # Preview do build

# Testes
npm test                 # Executa testes

# Scripts de Database (dentro de scripts/database/)
node scripts/database/create-test-users.mjs      # Cria usuários de teste
node scripts/database/populate-alpha.mjs         # Popula dados iniciais
```

## 📚 Documentação Principal

- **Design System**: `docs/Nipo_School-Sistema_de_Design_e_Normativas_UX_UI.md`
- **Documentação Completa**: `docs/DOCUMENTACAO_COMPLETA_NIPO_SCHOOL.md`
- **Planos**: `docs/plano_completo.md`
- **Estruturas**: Ver pasta `docs/estrutura/`

## 🎨 Design System

### Cores Principais
- **Vermelho Nipo**: `#ef4444` (red-500)
- **Laranja**: `#f97316` (orange-500)
- **Cinza Zen**: `#64748b` (zen-500)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Fonte Japonesa**: Noto Sans JP (para elementos especiais)

### Componentes Base
- `NipoBackground` - Background com gradiente
- `NipoContainer` - Container responsivo
- `NipoCard` - Card padrão
- `NipoButton` - Botão estilizado

---

**Última atualização**: Outubro 2025
**Versão**: 1.0.0
**Status**: 🚀 Em desenvolvimento ativo
