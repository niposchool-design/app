# 🎌 NIPO SCHOOL - DESIGN SYSTEM COMPLETO

## 📖 Guia de Uso do Sistema de Design Japonês

### 🎯 **Visão Geral**

O Nipo School implementa um sistema de design único baseado na filosofia japonesa, com componentes que refletem os valores de **Kaizen** (melhoria contínua), **Wabi-Sabi** (beleza na imperfeição) e **Zen** (simplicidade e mindfulness).

---

## 🎨 **Sistema de Cores**

### **Paleta Principal**
```typescript
// Sakura (Alunos) - Motivação e Crescimento
sakura: {
  50: '#fef7f7',
  100: '#feeaea',
  200: '#fcd9da',
  300: '#f8b9bd',
  400: '#f18c93',
  500: '#e6646b',  // Primary
  600: '#d04650',
  700: '#ae353f',
  800: '#922f39',
  900: '#7d2c36'
}

// Matcha (Professores) - Sabedoria e Ensino
matcha: {
  50: '#f6fdf6',
  100: '#e8fae8',
  200: '#d2f4d2',
  300: '#abe8ab',
  400: '#7dd67d',
  500: '#52c052',  // Primary
  600: '#3da13d',
  700: '#338033',
  800: '#2d652d',
  900: '#275427'
}

// Indigo (Admin) - Controle e Gestão
indigo: {
  50: '#f0f4ff',
  100: '#e1e8ff',
  200: '#c7d5fe',
  300: '#a5b6fc',
  400: '#818cf8',
  500: '#6366f1',  // Primary
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81'
}
```

### **Filosofia por Role**
- **🎓 Aluno**: Sakura (crescimento, juventude, potencial)
- **👨‍🏫 Professor**: Matcha (sabedoria, natureza, ensino)
- **👨‍💼 Admin**: Indigo (precisão, controle, visão ampla)

---

## 🧩 **Componentes Base**

### **Cards**
```tsx
import { Card } from '@/components/ui'

// Variantes disponíveis
<Card variant="default" />      // Padrão zen
<Card variant="elevated" />     // Sombra elevada
<Card variant="outlined" />     // Apenas bordas
<Card variant="glass" />        // Efeito vidro
<Card variant="zen" />          // Minimalista extremo

// Filosofias aplicáveis
<Card philosophy="kaizen" />    // Melhoria contínua
<Card philosophy="wabi-sabi" /> // Imperfeições belas
<Card philosophy="zen" />       // Simplicidade pura
```

### **Botões**
```tsx
import { Button } from '@/components/ui'

// Variantes por role
<Button variant="primary" />    // Ação principal
<Button variant="secondary" />  // Ação secundária
<Button variant="outline" />    // Contorno apenas
<Button variant="ghost" />      // Transparente
<Button variant="danger" />     // Ações críticas

// Tamanhos
<Button size="sm" />           // Pequeno
<Button size="md" />           // Médio
<Button size="lg" />           // Grande
```

### **Inputs**
```tsx
import { Input } from '@/components/ui'

// Com validação visual
<Input 
  variant="default"
  validation="success"    // success | error | warning
  role="student"         // student | professor | admin
  placeholder="Digite aqui..."
/>

// Specialized variants
<Input variant="zen" />        // Design minimalista
<Input variant="outlined" />   // Com bordas
<Input variant="filled" />     // Preenchido
```

---

## 🎌 **Componentes Nipo Únicos**

### **NipoLogo**
```tsx
import { NipoLogo } from '@/components/nipo'

<NipoLogo 
  variant="full"        // full | icon | text
  size="md"            // sm | md | lg | xl
  theme="auto"         // auto | light | dark
/>
```

### **ProgressCircle**
```tsx
import { ProgressCircle } from '@/components/nipo'

<ProgressCircle
  value={75}
  philosophy="zen"     // kaizen | wabi-sabi | zen
  role="student"       // student | professor | admin
  showPercentage={true}
  size="lg"
/>
```

### **AchievementCard**
```tsx
import { AchievementCard } from '@/components/nipo'

<AchievementCard
  type="musical"       // musical | learning | social | creative | special
  unlocked={true}
  title="Primeiro Solo"
  description="Executou sua primeira performance solo"
  icon="🎵"
  points={150}
/>
```

### **StatsCard**
```tsx
import { StatsCard } from '@/components/nipo'

<StatsCard
  label="Total de Pontos"
  value="1,250"
  trend="up"           // up | down | stable
  trendValue="+12%"
  role="student"
  gradient={true}
/>
```

### **PhilosophyQuote**
```tsx
import { PhilosophyQuote } from '@/components/nipo'

<PhilosophyQuote
  philosophy="kaizen"  // kaizen | wabi-sabi | zen
  variant="card"       // card | banner | minimal
  showJapanese={true}
  autoRotate={true}
/>
```

---

## 🚀 **Componentes Avançados (Semana 2)**

### **QRPresenceSystem**
```tsx
import { QRPresenceSystem } from '@/components/nipo'

// Professor View
<QRPresenceSystem 
  aulaId="aula-123"
  professorId="prof-456"
  isStudent={false}
/>

// Student View
<QRPresenceSystem 
  aulaId="aula-123"
  isStudent={true}
/>
```

### **RealTimeCollaboration**
```tsx
import { RealTimeCollaboration } from '@/components/nipo'

<RealTimeCollaboration
  sessionId="session-789"
  userRole="professor"  // professor | aluno
/>
```

---

## 🌙 **Dark Mode & Themes**

### **ThemeContext**
```tsx
import { useTheme } from '@/contexts/ThemeContext'

const { 
  isDark, 
  currentRole, 
  zenMode,
  toggleDark,
  setRole,
  toggleZen,
  getRoleColors 
} = useTheme()

// Aplicar cores baseadas no role
const colors = getRoleColors(currentRole)
```

### **ThemeToggle**
```tsx
import { ThemeToggle } from '@/components/nipo'

<ThemeToggle 
  variant="zen"        // zen | minimal | standard
  size="lg"
  showLabel={true}
/>
```

---

## 📱 **Responsividade Mobile-First**

### **Breakpoints**
```css
xs: '375px'    /* Mobile pequeno */
sm: '640px'    /* Mobile grande */
md: '768px'    /* Tablet */
lg: '1024px'   /* Desktop pequeno */
xl: '1280px'   /* Desktop grande */
2xl: '1536px'  /* Desktop extra */
```

### **Design Patterns**
```tsx
// Stack em mobile, grid em desktop
<div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
  {/* Conteúdo */}
</div>

// Texto responsivo japonês
<h1 className="text-lg sm:text-xl lg:text-2xl font-zen">
  <span className="block sm:hidden">こんにちは</span>
  <span className="hidden sm:block">こんにちは、{name}さん！</span>
</h1>
```

---

## 🎨 **Animações Zen**

### **Animações Disponíveis**
```css
/* Respiração zen */
.animate-zen-breath {
  animation: zenBreath 4s ease-in-out infinite;
}

/* Flutuar como sakura */
.animate-sakura-float {
  animation: sakuraFloat 6s ease-in-out infinite;
}

/* Bounce lento */
.animate-bounce-slow {
  animation: bounce 2s infinite;
}

/* Fade in suave */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
```

### **Uso em Componentes**
```tsx
// Loading states zen
<div className="animate-zen-breath">読み込み中...</div>

// Elementos flutuantes
<div className="animate-sakura-float">🌸</div>

// Hover effects
<div className="transition-all duration-300 hover:scale-105">
  {/* Conteúdo */}
</div>
```

---

## 🌐 **Internacionalização (i18n)**

### **Uso Básico**
```tsx
import { useTranslation } from '@/hooks/useTranslation'

const { t, currentLang, switchLanguage } = useTranslation()

// Texto traduzido
<h1>{t('dashboard.welcome')}</h1>

// Trocar idioma
<button onClick={() => switchLanguage('ja')}>
  {currentLang === 'ja' ? '日本語' : 'Português'}
</button>
```

### **Textos Japoneses Autênticos**
```tsx
// Saudações por contexto
const greetings = {
  morning: 'おはようございます',    // Bom dia (formal)
  general: 'こんにちは',          // Olá
  welcome: 'いらっしゃいませ',     // Bem-vindo
  return: 'おかえりなさい'         // Bem-vindo de volta
}

// Títulos por role
const roleTitles = {
  student: '学生',     // Gakusei
  professor: '先生',   // Sensei
  admin: '管理者'      // Kanrisha
}
```

---

## 🧪 **Testes**

### **Test Utilities**
```tsx
import { render, mockThemeContext } from '@/test-utils'

// Render com theme context
const { getByText } = render(
  <MyComponent />,
  { context: mockThemeContext }
)

// Mocks prontos
import { 
  mockDashboardData,
  mockQRData,
  mockCollaborationData
} from '@/test-utils'
```

---

## 📊 **Performance**

### **Lazy Loading**
```tsx
import { Suspense } from 'react'
import { LazyLoadingComponent } from '@/components/lazy'

<Suspense fallback={<LazyLoadingComponent />}>
  <ComponentePesado />
</Suspense>
```

### **Code Splitting**
Componentes pesados são automaticamente carregados sob demanda:
- QRPresenceSystem
- RealTimeCollaboration  
- ComponentShowcase
- Dashboards específicos

---

## 🎯 **Melhores Práticas**

### **Filosofia de Design**
1. **Kaizen**: Sempre busque pequenas melhorias
2. **Wabi-Sabi**: Aceite imperfeições como parte da beleza
3. **Zen**: Mantenha simplicidade e propósito claro

### **Código Limpo**
```tsx
// ✅ Bom: Componente focado e claro
const StudentCard = ({ student, onAction }) => (
  <Card philosophy="kaizen" role="student">
    <CardContent>
      <h3>{student.name}</h3>
      <ProgressCircle value={student.progress} />
    </CardContent>
  </Card>
)

// ❌ Evitar: Componentes complexos demais
const MegaComponent = ({ ...manyProps }) => {
  // Muita lógica aqui...
}
```

### **Acessibilidade**
```tsx
// Sempre incluir labels e ARIA
<Button 
  aria-label="Confirmar presença na aula"
  onClick={handleConfirm}
>
  確認 Confirmar
</Button>

// Contraste adequado para dark mode
className={`${isDark ? 'text-white' : 'text-gray-900'}`}
```

---

## 📚 **Recursos Adicionais**

- **ComponentShowcase**: `/showcase` - Demonstração completa
- **Storybook**: (em desenvolvimento)
- **Design Tokens**: `src/styles/nipo-tokens.css`
- **Testes**: `src/test-utils/`
- **i18n**: `src/locales/`

---

**🎌 Criado com filosofia japonesa e tecnologia moderna para uma experiência musical única.**