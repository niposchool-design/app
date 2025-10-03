# 🚀 PLANO DE MIGRAÇÃO DETALHADO - NIPO SCHOOL

**Baseado no inventário completo do sistema atual**  
**Objetivo:** Migrar de estrutura confusa para arquitetura limpa e organizada

---

## 📋 ESTRATÉGIA DE MIGRAÇÃO

### 🎯 **Princípios da Migração**
1. **Zero Downtime** - Sistema funcional durante toda migração
2. **Incremental** - Uma feature por vez
3. **Testável** - Cada etapa validada antes da próxima
4. **Reversível** - Possibilidade de rollback a qualquer momento
5. **Documentado** - Cada mudança registrada

### 🏗️ **Metodologia**
- **Dual Structure** - Nova estrutura em paralelo à antiga
- **Progressive Migration** - Migração gradual com testes
- **Alias Transition** - Uso de aliases para transição suave
- **Feature Toggle** - Switch entre old/new quando necessário

---

## 📁 NOVA ESTRUTURA TARGET

```
src/
├── app/                 # 🎯 Core da aplicação
│   ├── providers/       # Context providers
│   ├── router/          # Sistema de rotas
│   └── config/          # Configurações
│
├── pages/               # 📄 Páginas (uma pasta = uma rota)
│   ├── auth/            # login, register
│   ├── admin/           # dashboard, students, teachers, etc.
│   ├── student/         # dashboard, studies, library, etc.
│   ├── teacher/         # dashboard, content, stats, etc.
│   └── public/          # landing, about, etc.
│
├── components/          # 🧩 Componentes reutilizáveis
│   ├── ui/              # button, input, modal, table
│   ├── forms/           # student-form, instrument-form
│   ├── layout/          # header, sidebar, footer
│   └── common/          # loading, error-boundary
│
├── hooks/               # 🎣 Custom hooks
├── services/            # 🔌 APIs e serviços
├── lib/                 # 📚 Bibliotecas e utils
├── styles/              # 🎨 Estilos globais
└── assets/              # 📦 Recursos estáticos
```

---

## 📊 MAPEAMENTO DE MIGRAÇÃO

### **FASE 1: INFRAESTRUTURA** (Semana 1)

#### **1.1 - Criar Nova Estrutura Base**
```bash
# Criar pastas da nova estrutura
src_new/
├── app/
├── pages/
├── components/
├── hooks/
├── services/
├── lib/
├── styles/
└── assets/
```

#### **1.2 - Configurar Aliases Duplos**
```javascript
// vite.config.js
resolve: {
  alias: {
    // Novos aliases
    '@': path.resolve(__dirname, './src_new'),
    '@/pages': path.resolve(__dirname, './src_new/pages'),
    '@/components': path.resolve(__dirname, './src_new/components'),
    
    // Aliases legados (manter durante transição)
    '@/features': path.resolve(__dirname, './src/features'),
    '@/shared': path.resolve(__dirname, './src/shared'),
  }
}
```

#### **1.3 - Migrar Utilitários Base**
- [ ] Migrar `src/shared/lib/supabase` → `src_new/lib/supabase`
- [ ] Migrar `src/shared/contexts` → `src_new/app/providers`
- [ ] Migrar `src/styles` → `src_new/styles`

---

### **FASE 2: COMPONENTES UI** (Semana 2)

#### **2.1 - Migrar Componentes UI Base**
| Origem | Destino | Status |
|--------|---------|--------|
| `src/shared/components/UI/NipoButton.jsx` | `src_new/components/ui/button.jsx` | 🟡 |
| `src/shared/components/UI/NipoHeader.jsx` | `src_new/components/layout/header.jsx` | 🟡 |
| `src/shared/components/UI/QRCodeGenerator.jsx` | `src_new/components/ui/qr-generator.jsx` | 🟡 |

#### **2.2 - Criar Barrel Exports**
```javascript
// src_new/components/ui/index.js
export { default as Button } from './button'
export { default as Input } from './input'
export { default as Modal } from './modal'

// src_new/components/layout/index.js
export { default as Header } from './header'
export { default as Sidebar } from './sidebar'
export { default as Footer } from './footer'
```

#### **2.3 - Atualizar Imports Gradualmente**
```javascript
// Antes
import NipoButton from '../../../shared/components/UI/NipoButton'

// Depois
import { Button } from '@/components/ui'
```

---

### **FASE 3: HOOKS E SERVICES** (Semana 3)

#### **3.1 - Migrar Hooks**
| Origem | Destino | Função |
|--------|---------|--------|
| `src/shared/hooks/useInstrumentos.js` | `src_new/hooks/use-instruments.js` | Gestão instrumentos |
| `src/shared/hooks/useDuvidas.js` | `src_new/hooks/use-questions.js` | Sistema dúvidas |
| `src/features/admin/hooks/useQRCode.js` | `src_new/hooks/use-qr-code.js` | QR Codes |

#### **3.2 - Migrar Services**
| Origem | Destino | Função |
|--------|---------|--------|
| `src/features/admin/services/adminService.js` | `src_new/services/api/admin.js` | APIs admin |
| `src/features/turmas/services/turmasService.js` | `src_new/services/api/classes.js` | APIs turmas |
| `src/shared/services/mockDataService.js` | `src_new/services/mock-data.js` | Dados mock |

---

### **FASE 4: PÁGINAS - ADMIN** (Semana 4)

#### **4.1 - Migrar Dashboard Admin**
```
src/features/admin/pages/AdminDashboard.jsx
→ src_new/pages/admin/dashboard.jsx
```

**Passos:**
1. Copiar arquivo para nova localização
2. Atualizar imports para novos aliases
3. Testar funcionalidade
4. Atualizar rota no router
5. Validar não quebrou nada

#### **4.2 - Migrar Gestão de Usuários**
```
src/features/admin/pages/AdminAlunos.jsx → src_new/pages/admin/students.jsx
src/features/admin/pages/AdminProfessores.jsx → src_new/pages/admin/teachers.jsx
```

#### **4.3 - Migrar Gestão de Conteúdo**
```
src/features/admin/pages/AdminInstruments.jsx → src_new/pages/admin/instruments.jsx
src/features/admin/pages/AdminCurriculum.jsx → src_new/pages/admin/curriculum.jsx
src/features/turmas/pages/AdminTurmas.jsx → src_new/pages/admin/classes.jsx
```

---

### **FASE 5: PÁGINAS - PROFESSOR** (Semana 5)

#### **5.1 - Migrar Área do Professor**
```
src/features/professores/pages/ProfessoresDashboard.jsx → src_new/pages/teacher/dashboard.jsx
src/features/professores/pages/ProfessoresConteudos.jsx → src_new/pages/teacher/content.jsx
src/features/professores/pages/ProfessoresEstatisticas.jsx → src_new/pages/teacher/stats.jsx
```

---

### **FASE 6: PÁGINAS - ALUNO** (Semana 6)

#### **6.1 - Migrar Área do Aluno**
```
src/features/alunos/pages/AlunoDashboard.jsx → src_new/pages/student/dashboard.jsx
src/features/alunos/pages/CentroEstudos.jsx → src_new/pages/student/studies.jsx
src/features/alunos/pages/BibliotecaInstrumentos.jsx → src_new/pages/student/library.jsx
```

---

### **FASE 7: SISTEMA DE ROTAS** (Semana 7)

#### **7.1 - Atualizar Routers**
```javascript
// src_new/app/router/admin-routes.jsx
import Dashboard from '@/pages/admin/dashboard'
import Students from '@/pages/admin/students'
import Teachers from '@/pages/admin/teachers'

export const adminRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'students', element: <Students /> },
  { path: 'teachers', element: <Teachers /> },
]
```

#### **7.2 - Implementar Route Guards**
```javascript
// src_new/app/router/protected-route.jsx
import { useAuth } from '@/hooks/use-auth'

export const ProtectedRoute = ({ children, roles = [] }) => {
  // Lógica de proteção
}
```

---

### **FASE 8: LIMPEZA** (Semana 8)

#### **8.1 - Remover Estrutura Antiga**
- [ ] Mover `src` → `src_old` (backup)
- [ ] Mover `src_new` → `src`
- [ ] Atualizar todos os aliases
- [ ] Remover imports legados
- [ ] Deletar arquivos órfãos

#### **8.2 - Validação Final**
- [ ] Todas as rotas funcionando
- [ ] Todos os testes passando
- [ ] Performance mantida
- [ ] Zero erros console

---

## 🧪 ESTRATÉGIA DE TESTES

### **Testes por Fase**
1. **Componentes UI** - Teste visual + funcional
2. **Hooks** - Teste unitário + integração
3. **Services** - Teste API + mock
4. **Páginas** - Teste E2E + navegação
5. **Rotas** - Teste acesso + proteção

### **Ambiente de Teste**
```bash
# Branch específico para migração
git checkout -b migration/new-structure

# Ambiente paralelo para testes
npm run dev:migration
```

---

## ⚠️ RISCOS E MITIGAÇÕES

### **Riscos Identificados**
1. **Breaking Changes** - Imports quebrados
2. **Performance** - Bundle size aumentado
3. **State Loss** - Perda de estado durante migração
4. **Team Confusion** - Time perdido com nova estrutura

### **Mitigações**
1. **Aliases Graduais** - Manter compatibilidade
2. **Bundle Analysis** - Monitorar tamanho
3. **State Persistence** - Manter dados durante migração
4. **Documentação** - Guia completo + treinamento

---

## 📈 MÉTRICAS DE SUCESSO

### **KPIs Técnicos**
- [ ] **Import Path Length** - Redução de 60%+ nos imports
- [ ] **File Organization** - 100% dos arquivos na pasta correta
- [ ] **Build Time** - Manter ou melhorar tempo build
- [ ] **Bundle Size** - Não aumentar mais que 5%

### **KPIs de Produtividade**
- [ ] **Developer Experience** - Facilidade encontrar arquivos
- [ ] **New Developer Onboarding** - Tempo setup reduzido
- [ ] **Code Review** - Menos comments sobre estrutura
- [ ] **Bug Resolution** - Tempo reduzido para encontrar código

---

## 🚀 CRONOGRAMA EXECUTIVO

| Semana | Fase | Entregas | Responsável |
|--------|------|----------|-------------|
| 1 | Infraestrutura | Nova estrutura + aliases | Dev Lead |
| 2 | Componentes UI | UI components migrados | Frontend |
| 3 | Hooks/Services | Business logic migrado | Backend |
| 4 | Admin Pages | Área admin migrada | Fullstack |
| 5 | Teacher Pages | Área professor migrada | Frontend |
| 6 | Student Pages | Área aluno migrada | Frontend |
| 7 | Routes System | Sistema rotas migrado | Dev Lead |
| 8 | Cleanup | Estrutura antiga removida | Team |

---

**APROVAÇÃO NECESSÁRIA ANTES DE INICIAR FASE 1**

Confirma que podemos prosseguir com este plano?