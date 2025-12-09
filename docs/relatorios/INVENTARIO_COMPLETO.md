# 📊 INVENTÁRIO COMPLETO DO SISTEMA NIPO SCHOOL

**Data:** 30 de setembro de 2025  
**Status:** Sistema ativo em desenvolvimento  
**Arquitetura:** React + Vite + Supabase  

---

## 🗺️ MAPEAMENTO COMPLETO DE PÁGINAS E ROTAS

### 📑 **PÁGINAS PÚBLICAS**
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Landing Page | `src/pages/LandingPage.jsx` | `/` | Página inicial pública |
| Smart Dashboard | `src/pages/SmartDashboard.jsx` | `/dashboard` | Dashboard inteligente |
| Dashboard | `src/pages/Dashboard.jsx` | - | Dashboard genérico |

### 🔐 **AUTENTICAÇÃO**
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Login | `src/features/auth/pages/Login.jsx` | `/login` | Autenticação |
| Register | `src/features/auth/pages/Register.jsx` | `/register` | Cadastro |
| Register Oriental | `src/features/auth/pages/RegisterOriental.jsx` | - | Cadastro oriental |
| Verify Email | `src/features/auth/pages/VerifyEmail.jsx` | - | Verificação email |
| Vote | `src/features/auth/pages/Vote.jsx` | `/vote` | Sistema votação |

### 👨‍🎓 **ÁREA DOS ALUNOS** (`/alunos/*`)
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Dashboard Aluno | `src/features/alunos/pages/AlunoDashboard.jsx` | `/alunos` | Dashboard principal |
| Dashboard Oriental | `src/features/alunos/pages/AlunoDashboardOriental.jsx` | - | Dashboard oriental |
| Centro de Estudos | `src/features/alunos/pages/CentroEstudos.jsx` | `/alunos/estudos` | Centro estudos |
| Centro Estudos Simples | `src/features/alunos/pages/CentroEstudosSimples.jsx` | - | Versão simples |
| Centro Estudos Padronizado | `src/features/alunos/pages/CentroEstudosPadronizado.jsx` | - | Versão padronizada |
| Centro Estudos Fixed | `src/features/alunos/pages/CentroEstudosFixed.jsx` | - | Versão fixa |
| Biblioteca Instrumentos | `src/features/alunos/pages/BibliotecaInstrumentos.jsx` | `/alunos/biblioteca/instrumentos` | Biblioteca instrumentos |
| Biblioteca Videos | `src/features/alunos/pages/BibliotecaVideos.jsx` | `/alunos/biblioteca/videos` | Biblioteca vídeos |
| Biblioteca Repertório | `src/features/alunos/pages/BibliotecaRepertorio.jsx` | `/alunos/biblioteca/repertorio` | Biblioteca repertório |
| Meu Instrumento | `src/features/alunos/pages/MeuInstrumento.jsx` | `/alunos/meu-instrumento` | Instrumento do aluno |
| Detalhe Instrumento | `src/features/alunos/pages/DetalheInstrumento.jsx` | `/alunos/instrumentos/:id` | Detalhes instrumento |
| Metodologias Ensino | `src/features/alunos/pages/MetodologiasEnsino.jsx` | `/alunos/metodologias` | Metodologias |
| Progresso Aluno | `src/features/alunos/pages/ProgressoAluno.jsx` | `/alunos/progresso` | Progresso |
| Sistema Dúvidas | `src/features/alunos/pages/SistemaDuvidas.jsx` | `/alunos/duvidas` | Sistema dúvidas |
| Nova Pergunta | `src/features/alunos/pages/NovaPergunta.jsx` | `/alunos/duvidas/nova` | Nova pergunta |
| QR Scanner | `src/features/alunos/pages/QRScannerPage.jsx` | `/alunos/qr-scanner` | Scanner QR |

### 👨‍🏫 **ÁREA DOS PROFESSORES** (`/professores/*`)
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Dashboard Professor | `src/features/professores/pages/ProfessoresDashboard.jsx` | `/professores` | Dashboard principal |
| Dashboard Oriental | `src/features/professores/pages/ProfessorDashboardOriental.jsx` | - | Dashboard oriental |
| Conteúdos | `src/features/professores/pages/ProfessoresConteudos.jsx` | `/professores/conteudos` | Gestão conteúdos |
| Detalhe Conteúdo | `src/features/professores/pages/ConteudoDetalhes.jsx` | `/professores/conteudos/:id` | Detalhes conteúdo |
| Novo Conteúdo | `src/features/professores/pages/ProfessoresNovo.jsx` | `/professores/novo` | Criar conteúdo |
| Minha Área | `src/features/professores/pages/ProfessoresMinhaArea.jsx` | `/professores/minha-area` | Área pessoal |
| Estatísticas | `src/features/professores/pages/ProfessoresEstatisticas.jsx` | `/professores/estatisticas` | Estatísticas |
| Layout | `src/features/professores/pages/ProfessoresLayout.jsx` | - | Layout base |
| Modal Acesso | `src/features/professores/pages/ProfessorAccessModal.jsx` | - | Modal acesso |

### 👑 **ÁREA ADMINISTRATIVA** (`/admin/*`)
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Dashboard Admin | `src/features/admin/pages/AdminDashboard.jsx` | `/admin` | Dashboard principal |
| Dashboard Oriental | `src/features/admin/pages/AdminDashboardOriental.jsx` | - | Dashboard oriental |
| Dashboard Completo | `src/features/admin/pages/AdminDashboardCompleto.jsx` | - | Dashboard completo |
| Dashboard Oriental Nav | `src/features/admin/pages/AdminDashboardOrientalWithNavigation.jsx` | - | Dashboard c/ nav |
| Gestão Alunos | `src/features/admin/pages/AdminAlunos.jsx` | `/admin/alunos` | Gestão alunos |
| Detalhe Aluno | `src/features/admin/pages/AdminAlunoDetalhe.jsx` | `/admin/alunos/:id` | Detalhes aluno |
| Gestão Professores | `src/features/admin/pages/AdminProfessores.jsx` | `/admin/professores` | Gestão professores |
| Detalhe Professor | `src/features/admin/pages/AdminProfessorDetalhe.jsx` | `/admin/professores/:id` | Detalhes professor |
| Gestão Instrumentos | `src/features/admin/pages/AdminInstruments.jsx` | `/admin/instruments` | Gestão instrumentos |
| Detalhe Instrumento | `src/features/admin/pages/AdminInstrumentView.jsx` | `/admin/instruments/view/:id` | Detalhes instrumento |
| Form Instrumento | `src/features/admin/pages/AdminInstrumentForm.jsx` | `/admin/instruments/new` | Formulário instrumento |
| Detalhes Instrumento | `src/features/admin/pages/AdminInstrumentDetails.jsx` | - | Detalhes (antigo) |
| Currículo | `src/features/admin/pages/AdminCurriculum.jsx` | `/admin/curriculum` | Gestão currículo |
| Currículo (old) | `src/features/admin/pages/AdminCurriculum_old.jsx` | - | Versão antiga |
| Turmas | `src/features/turmas/pages/AdminTurmas.jsx` | `/admin/turmas` | Gestão turmas |
| Devocionais | `src/features/admin/pages/AdminDevocionais.jsx` | `/admin/devocionais` | Gestão devocionais |
| QR Manager | `src/features/admin/pages/QRCodeManager.jsx` | `/admin/qr-manager` | Gestão QR codes |
| QR Display | `src/features/admin/pages/QRDisplay.jsx` | - | Display QR |
| Kanban | `src/features/admin/pages/Kanban.jsx` | `/admin/kanban` | Kanban aulas |
| Detalhe Aula | `src/features/admin/pages/AulaDetail.jsx` | `/admin/aulas/:id` | Detalhes aula |
| Metodologia View | `src/features/admin/pages/AdminMethodologyView.jsx` | - | Visualizar metodologia |
| Metodologia Editor | `src/features/admin/pages/AdminMethodologyEditor.jsx` | - | Editar metodologia |
| Relatórios | `src/features/admin/pages/AdminRelatorios.jsx` | - | Relatórios |
| Configurações | `src/features/admin/pages/AdminConfiguracoes.jsx` | - | Configurações |
| Teste | `src/features/admin/pages/AdminTeste.jsx` | - | Página teste |
| Painel Navegação | `src/features/admin/pages/AdminNavigationPanel.jsx` | - | Painel navegação |
| Banco Dados Status | `src/features/admin/pages/BancoDadosStatus.jsx` | - | Status BD |

### 🎼 **INSTRUMENTOS**
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Lista Instrumentos | `src/features/instrumentos/pages/InstrumentosList.jsx` | `/instrumentos` | Lista instrumentos |
| Layout Instrumentos | `src/features/instrumentos/pages/InstrumentosLayout.jsx` | - | Layout base |
| Página Instrumento | `src/features/instrumentos/pages/InstrumentoPagina.jsx` | `/instrumentos/:id` | Página instrumento |
| Detalhe (Alunos) | `src/features/alunos/instrumentos/pages/DetalheInstrumento.jsx` | - | Detalhe para alunos |

### 📚 **CURRÍCULO E MÓDULOS**
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Módulos Page | `src/features/modulos/pages/ModulosPage.jsx` | - | Página módulos |
| Test Curriculum | `src/features/curriculum/pages/TestCurriculumPage.jsx` | - | Teste currículo |
| Methodology Simple | `src/features/curriculum/pages/CurriculumMethodologyPageSimple.jsx` | - | Metodologia simples |
| Methodology Page | `src/features/curriculum/pages/CurriculumMethodologyPage.jsx` | - | Página metodologia |

### 🙏 **DEVOCIONAL**
| Página | Arquivo | Rota | Função |
|--------|---------|------|--------|
| Devocional Page | `src/features/devocional/pages/DevocionalPage.jsx` | - | Página devocional |

---

## 🔗 SISTEMA DE ROTAS ATUAL

### **AppRouter Principal** (`src/app/router/AppRouter.jsx`)
```javascript
/ → LandingPage
/login → Login  
/register → Register
/dashboard → SmartDashboard (protegida)
/alunos/* → AlunosRoutes
/professores/* → ProfessoresRoutes  
/admin/* → AdminRoutes
```

### **AdminRoutes** (`src/app/router/AdminRoutes.jsx`)
```javascript
/admin → AdminDashboard
/admin/alunos → AdminAlunos
/admin/alunos/:id → AdminAlunoDetalhe  
/admin/professores → AdminProfessores
/admin/professores/:id → AdminProfessorDetalhe
/admin/devocionais → AdminDevocionais
/admin/curriculum → AdminCurriculum
/admin/turmas → AdminTurmas
/admin/qr-manager → QRCodeManager
/admin/instruments → AdminInstruments
/admin/instruments/new → AdminInstrumentForm
/admin/instruments/:id/edit → AdminInstrumentForm
/admin/instruments/view/:instrumentId → AdminInstrumentView
/admin/kanban → Kanban
/admin/aulas/:id → AulaDetail
```

### **AlunosRoutes** (`src/app/router/AlunosRoutes.jsx`)
```javascript
/alunos → AlunoDashboard
/alunos/estudos → CentroEstudos
/alunos/biblioteca/instrumentos → BibliotecaInstrumentos
/alunos/biblioteca/videos → BibliotecaVideos  
/alunos/biblioteca/repertorio → BibliotecaRepertorio
/alunos/meu-instrumento → MeuInstrumento
/alunos/instrumentos/:id → DetalheInstrumento
/alunos/metodologias → MetodologiasEnsino
/alunos/progresso → ProgressoAluno
/alunos/duvidas → SistemaDuvidas
/alunos/duvidas/nova → NovaPergunta
/alunos/qr-scanner → QRScannerPage
/alunos/instrumentos/:instrumentId → InstrumentoPagina
```

### **ProfessoresRoutes** (`src/app/router/ProfessoresRoutes.jsx`)
```javascript
/professores → ProfessoresDashboard
/professores/conteudos → ProfessoresConteudos
/professores/conteudos/:id → ConteudoDetalhes
/professores/novo → ProfessoresNovo
/professores/minha-area → ProfessoresMinhaArea
/professores/estatisticas → ProfessoresEstatisticas
```

---

## 🧩 COMPONENTES PRINCIPAIS

### **UI Components** (`src/shared/components/UI/`)
- NipoHeader.jsx - Header principal
- NipoButton.jsx - Botão padronizado  
- QRCodeGenerator.jsx - Gerador QR
- E mais ~15 componentes UI

### **Admin Components** (`src/features/admin/components/`)
- AdminQRManager.jsx - Gerenciador QR
- KanbanBoard.jsx - Board Kanban
- AulaCard.jsx - Card aula
- AdminQuickAccess.jsx - Acesso rápido
- E mais ~10 componentes admin

### **Professor Components** (`src/features/professores/components/`)
- ConteudoCard.jsx - Card conteúdo
- FormConteudo.jsx - Formulário conteúdo
- ProfessorSidebar.jsx - Sidebar professor
- FilterBar.jsx - Barra filtros
- E mais ~15 componentes professor

### **Aluno Components** (`src/features/alunos/components/`)
- AlunoStats.jsx - Estatísticas aluno
- AlunoProgress.jsx - Progresso aluno
- MinhasConquistas.jsx - Conquistas
- ProximasAulas.jsx - Próximas aulas
- QRScanner.jsx - Scanner QR

---

## 📊 ESTATÍSTICAS DO SISTEMA

- **Total Páginas:** ~90 páginas
- **Total Componentes:** ~150 componentes
- **Rotas Ativas:** ~45 rotas
- **Features:** 8 módulos principais
- **Arquivos JSX:** 270+ arquivos

---

## ⚠️ PROBLEMAS IDENTIFICADOS

### **Estrutura Confusa:**
- Nomes muito longos (`AdminDashboardOrientalWithNavigation.jsx`)
- Múltiplas versões da mesma página (_old, backup, etc.)
- Organização inconsistente de pastas
- Imports complexos e confusos

### **Duplicações:**
- Dashboard duplicados (Oriental, Completo, etc.)
- Componentes similares espalhados
- Lógica repetida entre features

### **Manutenibilidade:**
- Difícil encontrar arquivos
- Imports longos e complexos
- Falta de padrão de nomenclatura
- Muitos arquivos órfãos

---

## � HOOKS CUSTOMIZADOS

### **Shared Hooks** (`src/shared/hooks/`)
- useMetodologias.js - Gestão metodologias
- useInstrumentosReal.js - Instrumentos reais
- useInstrumentos.js - Gestão instrumentos
- useOrientalNavigation.js - Navegação oriental
- useRepertorio.js - Gestão repertório
- useDuvidas.js - Sistema dúvidas
- useCentroEstudos.js - Centro estudos
- useSmartRedirect.ts - Redirecionamento inteligente
- useVideos.js - Gestão vídeos
- useWinningLogo.js - Logo vencedor

### **Feature Hooks**
- `src/features/curriculum/hooks/useCurriculumContent.js` - Conteúdo currículo
- `src/features/instrumentos/hooks/useInstruments.js` - Instrumentos
- `src/features/instrumentos/hooks/useInstrumentPage.js` - Página instrumento
- `src/features/professores/hooks/useFileUpload.js` - Upload arquivos
- `src/features/professores/hooks/useProfessoresStats.js` - Stats professores
- `src/features/professores/hooks/useProfessoresConteudos.js` - Conteúdos professores
- `src/features/turmas/hooks/useTurmas.js` - Gestão turmas
- `src/features/turmas/hooks/useAulasAvancado.js` - Aulas avançadas
- `src/features/modulos/hooks/useModules.js` - Gestão módulos
- `src/features/admin/hooks/useQRCode.js` - QR Codes

---

## 🔧 SERVICES

### **Admin Services** (`src/features/admin/services/`)
- adminService.js - Serviços administrativos
- qrCodeService.js - Gestão QR codes
- presencaService.js - Controle presença

### **Feature Services**
- `src/features/turmas/services/turmasService.js` - Serviços turmas
- `src/features/professores/services/professoresService.js` - Serviços professores
- `src/features/instrumentos/services/instrumentsService.js` - Serviços instrumentos
- `src/features/instrumentos/services/instrumentDetailService.js` - Detalhes instrumento
- `src/features/instrumentos/services/instrumentPageService.js` - Página instrumento

### **Shared Services** (`src/shared/services/`)
- redirectService.js - Serviço redirecionamento
- mockDataService.js - Dados mock

---

## 📁 PRINCIPAIS CONTEXTOS

### **Auth Context** (`src/shared/contexts/`)
- AuthContext.js - Contexto autenticação
- PerfilContext.js - Contexto perfil
- SupabaseAuthContext.js - Contexto Supabase

### **Database** (`src/shared/lib/`)
- supabase/ - Cliente e configurações Supabase
- database/ - Utilitários banco dados

---

## �🎯 PRÓXIMOS PASSOS

1. **Validar inventário** com time
2. **Criar plano de migração** detalhado
3. **Implementar nova estrutura** gradualmente
4. **Migrar página por página** testando
5. **Limpar arquivos órfãos** após migração