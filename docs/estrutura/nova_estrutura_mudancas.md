# 🎯 Plano de Migração Nipo School - Enterprise Structure

## 📁 **ESTRUTURA FINAL ALVO (Enterprise Completa)**

```
📁 nipo-school-hub/
├── 📁 app/                           # Next.js 13+ App Router
│   ├── 📄 layout.js                  # Layout raiz global + Design System
│   ├── 📄 page.js                    # Landing page principal
│   ├── 📄 loading.js                 # Loading universal
│   ├── 📄 error.js                   # Error boundary
│   ├── 📄 not-found.js               # 404 customizado
│   └── 📄 middleware.js              # Auth + redirects centralizados
│
├── 📁 admin/                         # 👑 ÁREA ADMINISTRATIVA
│   ├── 📄 layout.js                  # Layout admin (Design Nipo)
│   ├── 📄 page.js                    # Dashboard principal admin
│   ├── 📄 loading.js                 # Loading admin
│   │
│   ├── 📁 dashboard/                 # Central de comando
│   │   └── 📄 page.js               # Métricas gerais
│   │
│   ├── 📁 gestao/                    # 🏢 Gestão da rede
│   │   ├── 📄 layout.js             # Layout gestão
│   │   ├── 📄 page.js               # Dashboard gestão
│   │   ├── 📁 escolas/              # Gestão de unidades
│   │   │   ├── 📄 page.js           # Lista escolas
│   │   │   ├── 📁 [id]/             # Detalhes escola
│   │   │   │   └── 📄 page.js       # Perfil da escola
│   │   │   ├── 📁 nova/             # Criar escola
│   │   │   │   └── 📄 page.js
│   │   │   └── 📁 components/       # Componentes escolas
│   │   │       ├── 📄 EscolaCard.js
│   │   │       └── 📄 FormEscola.js
│   │   ├── 📁 relatorios/           # 📊 BI da rede
│   │   │   ├── 📄 page.js           # Dashboard BI
│   │   │   └── 📁 components/
│   │   └── 📁 franquias/            # Gestão franqueados
│   │       ├── 📄 page.js
│   │       └── 📁 components/
│   │
│   ├── 📁 professores/              # 👨‍🏫 Gestão de professores
│   │   ├── 📄 page.js               # Lista professores
│   │   ├── 📁 [id]/                 # Perfil professor
│   │   │   ├── 📄 page.js           # Dados do professor
│   │   │   ├── 📁 turmas/           # Turmas do professor
│   │   │   └── 📁 relatorios/       # Performance
│   │   ├── 📁 novo/                 # Cadastrar professor
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       ├── 📄 ProfessorCard.js
│   │       └── 📄 FormProfessor.js
│   │
│   ├── 📁 estudantes/               # 🎓 Gestão de alunos
│   │   ├── 📄 page.js               # Lista estudantes
│   │   ├── 📁 [id]/                 # Perfil estudante
│   │   │   ├── 📄 page.js           # Dados do estudante
│   │   │   ├── 📁 progresso/        # Progresso detalhado
│   │   │   └── 📁 conquistas/       # Achievements
│   │   ├── 📁 novo/                 # Matricular estudante
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       ├── 📄 EstudanteCard.js
│   │       └── 📄 FormEstudante.js
│   │
│   ├── 📁 instrumentos/             # 🎸 Gestão patrimônio
│   │   ├── 📄 page.js               # Dashboard instrumentos
│   │   ├── 📁 fisicos/              # Instrumentos físicos
│   │   │   ├── 📄 page.js           # Lista patrimônio
│   │   │   ├── 📁 [id]/             # Detalhes instrumento
│   │   │   ├── 📁 novo/             # Cadastrar instrumento
│   │   │   └── 📁 components/
│   │   ├── 📁 cessoes/              # Empréstimos
│   │   │   ├── 📄 page.js           # Lista cessões
│   │   │   ├── 📁 nova/             # Nova cessão
│   │   │   └── 📁 components/
│   │   └── 📁 components/
│   │       └── 📄 InstrumentoCard.js
│   │
│   ├── 📁 aulas/                    # 📅 Gestão de aulas
│   │   ├── 📄 page.js               # Kanban de aulas
│   │   ├── 📁 [id]/                 # Detalhes aula
│   │   │   ├── 📄 page.js
│   │   │   ├── 📁 presenca/         # QR Code e presenças
│   │   │   └── 📁 materiais/        # Materiais da aula
│   │   ├── 📁 nova/                 # Criar aula
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       ├── 📄 KanbanBoard.js
│   │       └── 📄 QRManager.js
│   │
│   ├── 📁 conteudos/                # 📚 Gestão de conteúdo
│   │   ├── 📄 page.js               # Dashboard conteúdos
│   │   ├── 📁 aprovacao/            # Aprovar sacadas
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       └── 📄 ConteudoCard.js
│   │
│   ├── 📁 relatorios/               # 📊 Relatórios admin
│   │   ├── 📄 page.js               # Dashboard relatórios
│   │   ├── 📁 engajamento/          # Relatórios engajamento
│   │   ├── 📁 pedagogico/           # Relatórios educacionais
│   │   └── 📁 components/
│   │
│   └── 📁 components/               # Componentes admin
│       ├── 📄 AdminHeader.js
│       ├── 📄 AdminSidebar.js
│       └── 📄 StatsCard.js
│
├── 📁 professores/                  # 👨‍🏫 ÁREA DOS PROFESSORES
│   ├── 📄 layout.js                 # Layout professor (Design Nipo)
│   ├── 📄 page.js                   # Dashboard professor
│   ├── 📄 loading.js
│   │
│   ├── 📁 dashboard/                # Central professor
│   │   ├── 📄 page.js               # Métricas pessoais
│   │   └── 📁 components/
│   │
│   ├── 📁 turmas/                   # 📚 Minhas turmas
│   │   ├── 📄 page.js               # Lista turmas
│   │   ├── 📁 [id]/                 # Detalhes turma
│   │   │   ├── 📄 page.js           # Perfil da turma
│   │   │   ├── 📁 estudantes/       # Alunos da turma
│   │   │   └── 📁 aulas/            # Aulas da turma
│   │   └── 📁 components/
│   │       └── 📄 TurmaCard.js
│   │
│   ├── 📁 conteudos/                # 🎬 Meus conteúdos
│   │   ├── 📄 page.js               # Lista conteúdos
│   │   ├── 📁 novo/                 # Criar sacada
│   │   │   └── 📄 page.js
│   │   ├── 📁 [id]/                 # Editar conteúdo
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       ├── 📄 VideoUpload.js
│   │       └── 📄 FormConteudo.js
│   │
│   ├── 📁 duvidas/                  # ❓ Gestão de dúvidas
│   │   ├── 📄 page.js               # Queue de dúvidas
│   │   ├── 📁 [id]/                 # Responder dúvida
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       └── 📄 DuvidaCard.js
│   │
│   ├── 📁 relatorios/               # 📊 Meus relatórios
│   │   ├── 📄 page.js               # Dashboard pessoal
│   │   ├── 📁 engajamento/          # Engajamento alunos
│   │   └── 📁 components/
│   │
│   ├── 📁 admin-view/               # 🔄 ACESSO CONTROLADO ADMIN
│   │   ├── 📄 page.js               # Switch para modo admin
│   │   └── 📁 components/
│   │       └── 📄 AdminAccessBanner.js
│   │
│   └── 📁 components/               # Componentes professor
│       ├── 📄 ProfessorHeader.js
│       └── 📄 ProfessorSidebar.js
│
├── 📁 estudantes/                   # 🎓 ÁREA DOS ESTUDANTES
│   ├── 📄 layout.js                 # Layout estudante (Design Nipo + Gamificação)
│   ├── 📄 page.js                   # Dashboard estudante (círculo zen atual)
│   ├── 📄 loading.js
│   │
│   ├── 📁 dashboard/                # 🎮 Central gamificada
│   │   ├── 📄 page.js               # Dashboard principal
│   │   └── 📁 components/
│   │       ├── 📄 ProgressoSemanal.js
│   │       └── 📄 ConquistasRecentes.js
│   │
│   ├── 📁 instrumento/              # 🎸 Meu instrumento
│   │   ├── 📄 page.js               # Página do instrumento
│   │   ├── 📁 licoes/               # Lições disponíveis
│   │   │   ├── 📄 page.js
│   │   │   └── 📁 [id]/             # Lição específica
│   │   └── 📁 components/
│   │       └── 📄 InstrumentoHero.js
│   │
│   ├── 📁 conquistas/               # 🏆 Gamificação
│   │   ├── 📄 page.js               # Todas conquistas
│   │   ├── 📁 ranking/              # Leaderboard
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       ├── 📄 ConquistaCard.js
│   │       └── 📄 Leaderboard.js
│   │
│   ├── 📁 modulos/                  # 📚 Módulos de aprendizado
│   │   ├── 📄 page.js               # Lista módulos
│   │   ├── 📁 [id]/                 # Módulo específico
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       └── 📄 ModuloCard.js
│   │
│   ├── 📁 aulas/                    # 📅 Minhas aulas
│   │   ├── 📄 page.js               # Próximas aulas
│   │   ├── 📁 [id]/                 # Detalhes aula
│   │   │   ├── 📄 page.js
│   │   │   └── 📁 presenca/         # Check-in QR
│   │   └── 📁 components/
│   │       └── 📄 QRScanner.js
│   │
│   ├── 📁 duvidas/                  # ❓ Minhas dúvidas
│   │   ├── 📄 page.js               # Lista dúvidas
│   │   ├── 📁 nova/                 # Enviar dúvida
│   │   │   └── 📄 page.js
│   │   └── 📁 components/
│   │       └── 📄 FormDuvida.js
│   │
│   ├── 📁 perfil/                   # 👤 Meu perfil
│   │   ├── 📄 page.js               # Dados pessoais
│   │   └── 📁 components/
│   │
│   └── 📁 components/               # Componentes estudante
│       ├── 📄 EstudanteHeader.js
│       └── 📄 GamificationWidget.js
│
├── 📁 auth/                         # 🔐 AUTENTICAÇÃO
│   ├── 📄 layout.js                 # Layout auth (Design Nipo)
│   ├── 📁 login/                    # Login
│   │   └── 📄 page.js
│   ├── 📁 register/                 # Registro
│   │   └── 📄 page.js
│   ├── 📁 verificar/                # Verificação email
│   │   └── 📄 page.js
│   ├── 📁 completar-perfil/         # Onboarding
│   │   └── 📄 page.js
│   └── 📁 components/
│       ├── 📄 LoginForm.js
│       └── 📄 RegisterForm.js
│
├── 📁 api/                          # 📡 APIs CENTRALIZADAS
│   ├── 📁 auth/                     # Autenticação
│   │   ├── 📁 login/
│   │   │   └── 📄 route.js
│   │   └── 📁 register/
│   │       └── 📄 route.js
│   ├── 📁 estudantes/               # APIs estudantes
│   │   ├── 📁 progresso/
│   │   │   └── 📄 route.js
│   │   └── 📁 conquistas/
│   │       └── 📄 route.js
│   ├── 📁 professores/              # APIs professores
│   │   ├── 📁 conteudos/
│   │   │   └── 📄 route.js
│   │   └── 📁 turmas/
│   │       └── 📄 route.js
│   ├── 📁 instrumentos/             # APIs instrumentos
│   │   ├── 📁 fisicos/
│   │   │   └── 📄 route.js
│   │   └── 📁 cessoes/
│   │       └── 📄 route.js
│   ├── 📁 aulas/                    # APIs aulas
│   │   ├── 📁 presenca/
│   │   │   └── 📄 route.js
│   │   └── 📁 qr-code/
│   │       └── 📄 route.js
│   └── 📁 relatorios/               # APIs relatórios
│       └── 📁 dashboard/
│           └── 📄 route.js
│
├── 📁 shared/                       # 🔧 RECURSOS COMPARTILHADOS
│   ├── 📁 ui/                       # Design System Nipo (já existe)
│   │   ├── 📁 buttons/
│   │   │   ├── 📄 Button.js
│   │   │   └── 📄 IconButton.js
│   │   ├── 📁 cards/
│   │   │   ├── 📄 Card.js
│   │   │   └── 📄 StatsCard.js
│   │   ├── 📁 forms/
│   │   │   ├── 📄 Input.js
│   │   │   └── 📄 Select.js
│   │   ├── 📁 navigation/
│   │   │   ├── 📄 Sidebar.js
│   │   │   └── 📄 Header.js
│   │   ├── 📁 gamification/         # UI Gamificação
│   │   │   ├── 📄 ProgressBar.js
│   │   │   ├── 📄 LevelBadge.js
│   │   │   └── 📄 ConquistaBadge.js
│   │   └── 📄 index.js              # Exports centralizados
│   │
│   ├── 📁 hooks/                    # React Hooks
│   │   ├── 📄 useAuth.js            # Migrado do atual
│   │   ├── 📄 usePermissions.js     # Novo - sistema permissões
│   │   ├── 📄 useStudents.js        # Estudantes
│   │   ├── 📄 useProfessors.js      # Professores
│   │   ├── 📄 useInstruments.js     # Instrumentos
│   │   ├── 📄 useGamification.js    # Gamificação
│   │   ├── 📄 useClasses.js         # Aulas
│   │   ├── 📄 useSupabase.js        # Database
│   │   └── 📄 index.js              # Exports
│   │
│   ├── 📁 services/                 # Business Logic
│   │   ├── 📄 authService.js        # Autenticação
│   │   ├── 📄 studentService.js     # Estudantes
│   │   ├── 📄 professorService.js   # Professores
│   │   ├── 📄 instrumentService.js  # Instrumentos
│   │   ├── 📄 gamificationService.js # Gamificação
│   │   ├── 📄 classService.js       # Aulas
│   │   ├── 📄 qrCodeService.js      # QR Code
│   │   └── 📄 permissionService.js  # Controle acesso
│   │
│   ├── 📁 lib/                      # Bibliotecas Core
│   │   ├── 📁 supabase/
│   │   │   ├── 📄 client.js         # Cliente Supabase
│   │   │   ├── 📄 admin.js          # Admin Supabase
│   │   │   └── 📄 database.js       # Database utilities
│   │   ├── 📁 qrcode/
│   │   │   ├── 📄 generator.js      # Geração QR Code
│   │   │   └── 📄 scanner.js        # Scanner QR Code
│   │   └── 📁 gamification/
│   │       ├── 📄 levelCalculator.js # Cálculo de níveis
│   │       └── 📄 achievements.js   # Conquistas
│   │
│   ├── 📁 utils/                    # Utilitários
│   │   ├── 📄 formatters.js         # Formatação dados
│   │   ├── 📄 validators.js         # Validações
│   │   ├── 📄 constants.js          # Constantes
│   │   ├── 📄 dateUtils.js          # Manipulação datas
│   │   └── 📄 accessControl.js      # Controle de acesso
│   │
│   ├── 📁 contexts/                 # React Contexts
│   │   ├── 📄 AuthContext.js        # Contexto autenticação (migrado)
│   │   ├── 📄 PermissionContext.js  # Contexto permissões (novo)
│   │   └── 📄 AppContext.js         # Contexto global
│   │
│   └── 📁 constants/                # Constantes
│       ├── 📄 roles.js              # Tipos de usuário
│       ├── 📄 permissions.js        # Permissões
│       └── 📄 routes.js             # Rotas
│
├── 📁 types/                        # 📝 TypeScript Types
│   ├── 📄 auth.ts                   # Tipos autenticação
│   ├── 📄 user.ts                   # Tipos usuário
│   ├── 📄 student.ts                # Tipos estudante
│   ├── 📄 professor.ts              # Tipos professor
│   ├── 📄 instrument.ts             # Tipos instrumento
│   ├── 📄 gamification.ts           # Tipos gamificação
│   └── 📄 database.ts               # Tipos database
│
├── 📁 styles/                       # 🎨 Estilos
│   ├── 📄 globals.css               # Estilos globais (já existe)
│   ├── 📄 nipo-design-system.css    # Design system Nipo (já existe)
│   ├── 📄 admin.css                 # Estilos área admin
│   ├── 📄 professor.css             # Estilos área professor
│   └── 📄 student.css               # Estilos área estudante
│
├── 📁 public/                       # 📁 Arquivos Públicos
│   ├── 📁 images/
│   │   ├── 📁 instruments/          # Imagens instrumentos
│   │   ├── 📁 achievements/         # Ícones conquistas
│   │   └── 📁 logos/                # Logos e marcas
│   └── 📁 sounds/                   # Sons gamificação
│       ├── 📄 achievement.mp3
│       └── 📄 level-up.mp3
│
├── 📁 docs/                         # 📚 Documentação
│   ├── 📄 README.md                 # Documentação principal
│   ├── 📄 ARCHITECTURE.md           # Arquitetura do sistema
│   └── 📄 MIGRATION.md              # Guia de migração
│
├── 📄 package.json                  # Dependências
├── 📄 next.config.js                # Config Next.js
├── 📄 tailwind.config.js            # Config Tailwind
└── 📄 README.md                     # Documentação projeto
```

---

## 🚀 **IMPLEMENTAÇÃO EM FASES**

### **🎯 FASE 1: Core Essencial (1-2 semanas)**
```
📁 admin/
├── 📄 layout.js                 # ✅ Design Nipo aplicado
├── 📄 page.js                   # ✅ Dashboard básico
├── 📁 professores/
│   └── 📄 page.js              # ✅ Lista professores
└── 📁 estudantes/
    └── 📄 page.js              # ✅ Lista estudantes

📁 professores/
├── 📄 layout.js                 # ✅ Design Nipo aplicado
├── 📄 page.js                   # ✅ Dashboard professor
└── 📁 admin-view/
    └── 📄 page.js              # ✅ Acesso admin controlado

📁 estudantes/
├── 📄 layout.js                 # ✅ Design Nipo + gamificação
└── 📄 page.js                   # ✅ Dashboard atual (círculo zen)

📁 shared/
├── 📁 hooks/
│   ├── 📄 useAuth.js           # ✅ Migrado do atual
│   └── 📄 usePermissions.js    # ✅ Sistema permissões novo
├── 📁 contexts/
│   └── 📄 AuthContext.js       # ✅ Migrado do atual
└── 📁 constants/
    ├── 📄 roles.js             # ✅ Tipos usuário
    └── 📄 permissions.js       # ✅ Matriz permissões
```

### **🔧 FASE 2: Funcionalidades (2-3 semanas)**
```
📁 admin/
├── 📁 instrumentos/
├── 📁 aulas/
├── 📁 conteudos/
└── 📁 relatorios/

📁 professores/
├── 📁 turmas/
├── 📁 conteudos/
└── 📁 duvidas/

📁 estudantes/
├── 📁 conquistas/
├── 📁 modulos/
├── 📁 aulas/
└── 📁 duvidas/

📁 api/
├── 📁 auth/
├── 📁 estudantes/
├── 📁 professores/
└── 📁 aulas/
```

### **⚡ FASE 3: Otimização (1-2 semanas)**
```
📁 shared/
├── 📁 services/                # ✅ Services organizados
├── 📁 lib/                     # ✅ Bibliotecas otimizadas
└── 📁 utils/                   # ✅ Utilitários refinados

📁 types/                       # ✅ TypeScript completo
📁 docs/                        # ✅ Documentação completa
📁 tests/                       # ✅ Testes implementados
```

---

## 🎯 **DECISÃO FINAL**

**✅ USAR: Estrutura Enterprise COMPLETA**
**✅ IMPLEMENTAR: Por fases (Core → Funcionalidades → Otimização)**
**✅ MANTER: Design System Nipo existente**
**✅ FOCAR: Sistema de permissões hierárquico**

### **Vantagens:**
1. **Profissional desde o início**
2. **Escalável para rede de escolas**
3. **Padrão reconhecível por desenvolvedores**
4. **Future-proof para investidores**
5. **Mantém identidade visual Nipo**

### **Próximo Passo:**
Começar FASE 1 - migrar arquivos atuais para nova estrutura mantendo o Design System intacto?

**Concordas com essa abordagem? Vamos começar a migração! 🚀**