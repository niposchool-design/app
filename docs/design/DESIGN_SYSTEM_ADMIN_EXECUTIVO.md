# Design System Executivo - Área Admin

## 🎨 Identidade Visual Profissional

### Conceito
A área administrativa do Nipo School foi desenvolvida com uma identidade **executiva e profissional**, adequada para um CEO ou gestão corporativa. Diferente da área de alunos (vermelha e dinâmica) e professores (azul e educativa), o admin usa **roxo/púrpura** como cor principal, transmitindo:

- **Autoridade** e liderança
- **Sofisticação** corporativa
- **Confiabilidade** institucional
- **Profissionalismo** executivo

---

## 🎯 Paleta de Cores Roxa

### Cores Principais
```css
--admin-primary: #7c3aed;      /* Purple-600 - Principal */
--admin-dark: #6d28d9;         /* Purple-700 - Hover/Active */
--admin-darker: #5b21b6;       /* Purple-800 - Gradientes */
--admin-darkest: #4c1d95;      /* Purple-900 - Headers escuros */
--admin-light: #a78bfa;        /* Purple-400 - Scrollbars */
--admin-lighter: #c4b5fd;      /* Purple-300 - Fundos claros */
--admin-bg: #faf5ff;           /* Purple-50 - Background */
--admin-accent: #818cf8;       /* Indigo-400 - Acento */
```

### Cores Neutras (Base Profissional)
- **Slate**: `slate-50` a `slate-900` - Base principal
- **White**: Backgrounds de cards
- Evitar cores vibrantes demais

---

## 📐 Componentes Pré-Definidos

### Classes Utilitárias

#### 1. Cards Executivos
```tsx
className="admin-card"
// Resultado: bg-white rounded-xl shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200
```

#### 2. Gradiente Executivo
```tsx
className="admin-gradient"
// Resultado: bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950
```

#### 3. Badges/Tags
```tsx
className="admin-badge"
// Resultado: px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-200
```

#### 4. Botões

**Primário:**
```tsx
className="admin-btn-primary"
// Resultado: px-5 py-2.5 bg-purple-600 text-white rounded-xl shadow-lg
```

**Secundário:**
```tsx
className="admin-btn-secondary"
// Resultado: px-5 py-2.5 bg-white text-purple-900 rounded-xl shadow-lg
```

#### 5. Inputs
```tsx
className="admin-input"
// Resultado: Input profissional com foco roxo
```

#### 6. Scrollbar Customizada
```tsx
className="admin-scrollbar"
// Resultado: Scrollbar elegante com thumb roxo no hover
```

#### 7. Tabelas Executivas
```tsx
<table className="admin-table">
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

---

## 🏗️ Componentes React Prontos

### AdminPageLayout
Layout padrão para páginas admin com header consistente.

**Uso:**
```tsx
import AdminPageLayout from '../_components/AdminPageLayout';
import { Users } from 'lucide-react';

<AdminPageLayout
  title="Gestão de Alunos"
  subtitle="Visualize e gerencie todos os estudantes"
  icon={Users}
  badge="125 ativos"
  actions={
    <button className="admin-btn-primary">Nova Ação</button>
  }
>
  {/* Seu conteúdo aqui */}
</AdminPageLayout>
```

### AdminCard
Card executivo reutilizável.

```tsx
import { AdminCard } from '../_components/AdminPageLayout';

<AdminCard>
  <h3>Título do Card</h3>
  <p>Conteúdo...</p>
</AdminCard>
```

### AdminSectionHeader
Header de seção dentro de páginas.

```tsx
import { AdminSectionHeader } from '../_components/AdminPageLayout';
import { BarChart } from 'lucide-react';

<AdminSectionHeader
  icon={BarChart}
  title="Estatísticas"
  action={<button>Ver Mais</button>}
/>
```

### AdminGrid
Grid responsivo para layouts.

```tsx
import { AdminGrid } from '../_components/AdminPageLayout';

<AdminGrid cols={3}>
  <AdminCard>Card 1</AdminCard>
  <AdminCard>Card 2</AdminCard>
  <AdminCard>Card 3</AdminCard>
</AdminGrid>
```

### AdminEmptyState
Estado vazio com ícone.

```tsx
import { AdminEmptyState } from '../_components/AdminPageLayout';
import { Users } from 'lucide-react';

<AdminEmptyState
  icon={Users}
  title="Nenhum aluno encontrado"
  description="Comece adicionando seu primeiro aluno"
  action={<button className="admin-btn-primary">Adicionar</button>}
/>
```

---

## ✨ Características do Design

### 1. **Sem "Badulaques"**
- ❌ Sem animações excessivas
- ❌ Sem ícones desnecessários
- ❌ Sem cores chamativas
- ✅ Transições suaves e discretas
- ✅ Ícones apenas funcionais
- ✅ Paleta sóbria e profissional

### 2. **Tipografia Executiva**
```tsx
// Títulos
className="text-2xl font-semibold text-slate-900 tracking-tight"

// Subtítulos
className="text-sm text-slate-500 leading-relaxed"

// Labels
className="text-xs font-semibold uppercase tracking-wider text-slate-400"

// Corpo de texto
className="text-sm text-slate-700"
```

### 3. **Espaçamento Profissional**
- Padding cards: `p-5` ou `p-6`
- Gap em grids: `gap-5` ou `gap-6`
- Margens entre seções: `mb-6` ou `space-y-6`
- Bordas: `border-slate-200/80` (opacidade sutil)

### 4. **Sombras Discretas**
```tsx
// Cards
className="shadow-sm hover:shadow-lg"

// Botões importantes
className="shadow-lg shadow-purple-900/30"
```

### 5. **Ícones Profissionais**
- Usar `strokeWidth={2}` para clareza
- Tamanhos: `w-4 h-4` (pequeno), `w-5 h-5` (médio), `w-6 h-6` (grande)
- Cores neutras por padrão: `text-slate-400` ou `text-slate-600`

---

## 📊 Padrões de KPIs

### Card de Métrica Executiva
```tsx
<div className="admin-kpi-card">
  <div className="flex items-start justify-between mb-4">
    <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
      <Icon className="w-5 h-5" strokeWidth={2} />
    </div>
    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
      <ArrowUpRight className="w-3 h-3" /> 5%
    </span>
  </div>
  <h3 className="text-3xl font-bold text-slate-900 mb-1">125</h3>
  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
    Total de Alunos
  </p>
</div>
```

---

## 🎭 Diferenças das Outras Áreas

| Característica | Alunos (Vermelho) | Professores (Azul) | **Admin (Roxo)** |
|---------------|-------------------|-------------------|------------------|
| **Tom** | Divertido, gamificado | Educativo, organizado | **Executivo, profissional** |
| **Cores** | Vibrantes, chamativas | Calmas, confiáveis | **Sóbrias, autoritárias** |
| **Animações** | Abundantes, lúdicas | Moderadas, suaves | **Mínimas, discretas** |
| **Elementos** | Badges, conquistas | Recursos didáticos | **KPIs, métricas** |
| **Linguagem** | Informal, motivadora | Técnica, clara | **Corporativa, objetiva** |

---

## 📝 Checklist de Implementação

Ao criar uma nova página admin, verifique:

- [ ] Usa `AdminPageLayout` para estrutura
- [ ] Cores roxas da paleta executiva
- [ ] Classes utilitárias `admin-*` quando aplicável
- [ ] Tipografia profissional (semibold, não bold)
- [ ] Ícones com `strokeWidth={2}`
- [ ] Espaçamentos consistentes (5 ou 6)
- [ ] Bordas com opacidade (`border-slate-200/80`)
- [ ] Sem elementos desnecessários
- [ ] Transições suaves (`transition-all`, `duration-300`)
- [ ] Status indicators limpos e discretos

---

## 🚀 Exemplos de Uso

### Dashboard Principal
✅ **Implementado em:** `app/(protected)/admin/page.tsx`
- Header executivo com gradiente roxo escuro
- KPIs com design corporativo
- Feed de atividades profissional
- Card de insights com barra de progresso

### Lista de Alunos
✅ **Implementado em:** `app/(protected)/admin/alunos/page.tsx`
- Toolbar com busca e filtros limpos
- Tabela executiva (`admin-table`)
- Badges de nível discretos
- Ações ao hover suaves

### Header Global
✅ **Implementado em:** `app/(protected)/admin/_components/AdminHeader.tsx`
- Busca profissional
- Data formatada
- Notificações discretas
- Avatar executivo

---

## 🎨 Padrão Oriental Sayagata

Para fundos sutis na área admin:
```tsx
className="bg-pattern-sayagata"
```

Representa **estrutura e nobreza** - perfeito para admin!

---

## 💡 Dicas Finais

1. **Sempre priorize clareza sobre estética**
2. **Menos é mais** - remova elementos desnecessários
3. **Use dados reais** - mostre métricas relevantes
4. **Mantenha consistência** - use os componentes prontos
5. **Pense em CEO** - o que um executivo precisa ver?

---

**Mantido por:** Equipe de Design Nipo School  
**Última atualização:** Dezembro 2025  
**Versão:** 1.0 - Design System Executivo
