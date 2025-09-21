# 🚀 NIPO SCHOOL - GUIA DE IMPLEMENTAÇÃO

## 🎯 **SEQUÊNCIA DE IMPLEMENTAÇÃO**

### **SEMANA 1: FUNDAÇÃO VISUAL**

#### **1. CSS Design System** (`src/styles/globals.css`)
```css
/* 🎌 NIPO DESIGN SYSTEM */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* ===== DESIGN TOKENS ===== */
:root {
  /* Brand Colors */
  --nipo-primary: #ef4444;
  --nipo-primary-hover: #dc2626;
  --nipo-primary-light: #fca5a5;
  --nipo-primary-bg: #fef2f2;
  
  /* Dark Mode */
  --nipo-dark-bg: #1a1a1a;
  --nipo-dark-card: #2a2a2a;
  --nipo-dark-text: #ffffff;
  --nipo-dark-text-muted: #a3a3a3;
  
  /* Role Colors */
  --nipo-admin: #8b5cf6;
  --nipo-professor: #0ea5e9;
  --nipo-student: #10b981;
  
  /* Spacing (8px base) */
  --nipo-space-1: 0.25rem;  /* 4px */
  --nipo-space-2: 0.5rem;   /* 8px */
  --nipo-space-3: 0.75rem;  /* 12px */
  --nipo-space-4: 1rem;     /* 16px */
  --nipo-space-6: 1.5rem;   /* 24px */
  --nipo-space-8: 2rem;     /* 32px */
  
  /* Radius */
  --nipo-radius-sm: 0.375rem;  /* 6px */
  --nipo-radius-md: 0.5rem;    /* 8px */
  --nipo-radius-lg: 0.75rem;   /* 12px */
  --nipo-radius-xl: 1rem;      /* 16px */
  
  /* Shadows */
  --nipo-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --nipo-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --nipo-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
  --nipo-shadow-brand: 0 4px 14px rgba(239, 68, 68, 0.25);
  
  /* Animation */
  --nipo-duration-fast: 150ms;
  --nipo-duration-normal: 250ms;
  --nipo-duration-slow: 350ms;
  --nipo-ease: cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Dark mode override */
[data-theme="dark"] {
  --nipo-bg: var(--nipo-dark-bg);
  --nipo-card: var(--nipo-dark-card);
  --nipo-text: var(--nipo-dark-text);
  --nipo-text-muted: var(--nipo-dark-text-muted);
}

/* Base styles */
body {
  @apply antialiased;
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--nipo-bg, #ffffff);
  color: var(--nipo-text, #1c1917);
  transition: background-color var(--nipo-duration-normal) var(--nipo-ease);
}

/* Japanese font integration */
.nipo-japanese {
  font-family: 'Noto Sans JP', 'Inter', system-ui, sans-serif;
}

/* Utility classes */
.nipo-card {
  background: var(--nipo-card, #ffffff);
  border-radius: var(--nipo-radius-lg);
  box-shadow: var(--nipo-shadow-sm);
  transition: all var(--nipo-duration-normal) var(--nipo-ease);
}

.nipo-card:hover {
  box-shadow: var(--nipo-shadow-md);
  transform: translateY(-2px);
}

.nipo-button {
  border-radius: var(--nipo-radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  padding: var(--nipo-space-3) var(--nipo-space-6);
  transition: all var(--nipo-duration-fast) var(--nipo-ease);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--nipo-space-2);
}

.nipo-button:hover {
  transform: scale(1.02);
}

.nipo-button:active {
  transform: scale(0.98);
}

/* Animation classes */
@keyframes nipo-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes nipo-scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.nipo-animate-in {
  animation: nipo-fade-in var(--nipo-duration-normal) var(--nipo-ease);
}

.nipo-animate-scale {
  animation: nipo-scale-in var(--nipo-duration-normal) var(--nipo-ease);
}
```

#### **2. Theme Provider** (`src/contexts/ThemeContext.tsx`)
```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Role = 'admin' | 'professor' | 'student';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentTheme: 'light' | 'dark';
  role?: Role;
  setRole: (role: Role) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [role, setRole] = useState<Role>('student');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nipo-theme') as Theme;
    const savedRole = localStorage.getItem('nipo-role') as Role;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedRole) setRole(savedRole);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      const resolvedTheme = theme === 'system' 
        ? (mediaQuery.matches ? 'dark' : 'light')
        : theme;
      
      setCurrentTheme(resolvedTheme);
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      document.documentElement.setAttribute('data-role', role);
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme, role]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('nipo-theme', newTheme);
  };

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('nipo-role', newRole);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: handleSetTheme,
      currentTheme,
      role,
      setRole: handleSetRole,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

#### **3. Button Component** (`src/components/ui/Button.tsx`)
```tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    outline: 'bg-transparent hover:bg-red-50 text-red-600 border border-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'nipo-button',
        'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children && <span>Loading...</span>}
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
```

#### **4. Card Component** (`src/components/ui/Card.tsx`)
```tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'stats' | 'achievement';
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  padding = 'md',
  shadow = 'sm',
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'nipo-card',
    interactive: 'nipo-card cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
    stats: 'nipo-card border-l-4 border-l-red-500',
    achievement: 'nipo-card bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200',
  };

  const paddings = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      ref={ref}
      className={cn(
        variants[variant],
        paddings[padding],
        shadows[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = 'CardContent';
```

#### **5. Input Component** (`src/components/ui/Input.tsx`)
```tsx
'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type = 'text',
  label,
  error,
  icon,
  iconPosition = 'left',
  helperText,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = () => setFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        {label && (
          <label
            className={cn(
              'absolute left-3 text-sm transition-all duration-200 pointer-events-none',
              'text-gray-500',
              focused || hasValue
                ? 'top-2 text-xs text-red-500'
                : 'top-1/2 -translate-y-1/2',
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full rounded-lg border border-gray-300 bg-white px-3 py-3',
              'text-gray-900 placeholder-transparent',
              'transition-all duration-200',
              'focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20',
              label && (focused || hasValue) && 'pt-6 pb-2',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-red-500 focus:border-red-500',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      {(error || helperText) && (
        <p className={cn(
          'text-xs',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
```

#### **6. Theme Toggle Component** (`src/components/nipo/ThemeToggle.tsx`)
```tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const getIcon = () => {
    if (currentTheme === 'dark') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    );
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      icon={getIcon()}
      className="nipo-japanese"
      title={currentTheme === 'dark' ? '明るいテーマ' : '暗いテーマ'}
    />
  );
}
```

#### **7. Progress Circle Component** (`src/components/nipo/ProgressCircle.tsx`)
```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'info';
}

export function ProgressCircle({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  showLabel = true,
  label,
  color = 'primary'
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colors = {
    primary: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(colors[color], 'transition-all duration-500 ease-in-out')}
          style={{
            filter: 'drop-shadow(0 0 6px currentColor)',
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showLabel && (
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(progress)}%
            </div>
            {label && (
              <div className="text-xs text-gray-500 dark:text-gray-400 nipo-japanese">
                {label}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### **8. Achievement Card Component** (`src/components/nipo/AchievementCard.tsx`)
```tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
}

export function AchievementCard({
  title,
  description,
  icon,
  unlocked,
  progress,
  maxProgress,
  rarity = 'common',
  className
}: AchievementCardProps) {
  const rarityColors = {
    common: 'from-gray-100 to-gray-200 border-gray-300',
    rare: 'from-blue-100 to-blue-200 border-blue-300',
    epic: 'from-purple-100 to-purple-200 border-purple-300',
    legendary: 'from-yellow-100 to-yellow-200 border-yellow-400',
  };

  const iconColors = {
    common: 'text-gray-600',
    rare: 'text-blue-600',
    epic: 'text-purple-600',
    legendary: 'text-yellow-600',
  };

  return (
    <Card
      variant="achievement"
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        unlocked ? rarityColors[rarity] : 'from-gray-50 to-gray-100 border-gray-200',
        unlocked ? 'shadow-lg hover:shadow-xl' : 'opacity-60',
        className
      )}
    >
      {/* Sparkle effect for unlocked achievements */}
      {unlocked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-150" />
          <div className="absolute top-6 right-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-300" />
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 p-3 rounded-full',
            unlocked ? iconColors[rarity] : 'text-gray-400',
            unlocked ? 'bg-white/50' : 'bg-gray-200'
          )}
        >
          <div className="w-6 h-6">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'text-lg font-semibold nipo-japanese',
            unlocked ? 'text-gray-900' : 'text-gray-500'
          )}>
            {title}
          </h3>
          
          <p className={cn(
            'text-sm mt-1',
            unlocked ? 'text-gray-700' : 'text-gray-400'
          )}>
            {description}
          </p>

          {/* Progress bar for locked achievements */}
          {!unlocked && progress !== undefined && maxProgress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>進捗 (Progresso)</span>
                <span>{progress}/{maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(progress / maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Unlocked badge */}
          {unlocked && (
            <div className="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              解除済み (Desbloqueado)
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
```

---

### **SEMANA 2: COMPONENTES AVANÇADOS**

#### **9. Header Component** (`src/components/layout/Header.tsx`)
```tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/nipo/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
    role: 'admin' | 'professor' | 'student';
  };
}

export function Header({ user }: HeaderProps) {
  const { role } = useTheme();

  const roleColors = {
    admin: 'from-purple-500 to-purple-600',
    professor: 'from-blue-500 to-blue-600',
    student: 'from-green-500 to-green-600',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center',
            role ? roleColors[role] : 'from-red-500 to-red-600'
          )}>
            <span className="text-white font-bold text-sm nipo-japanese">音</span>
          </div>
          <h1 className="text-xl font-bold nipo-japanese">
            Nipo School
          </h1>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors">
            Aulas
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors">
            Progresso
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors">
            Conquistas
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5h-5m-6 0h5l-5-5 5-5h-5" />
            </svg>
          </Button>

          {/* User Avatar */}
          {user && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize nipo-japanese">
                  {user.role === 'admin' ? '管理者' : user.role === 'professor' ? '先生' : '学生'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
```

#### **10. Stats Card Component** (`src/components/nipo/StatsCard.tsx`)
```tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: React.ReactNode;
  color?: 'red' | 'blue' | 'green' | 'purple' | 'yellow';
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  color = 'red',
  className
}: StatsCardProps) {
  const colorClasses = {
    red: 'border-l-red-500 bg-red-50 text-red-600',
    blue: 'border-l-blue-500 bg-blue-50 text-blue-600',
    green: 'border-l-green-500 bg-green-50 text-green-600',
    purple: 'border-l-purple-500 bg-purple-50 text-purple-600',
    yellow: 'border-l-yellow-500 bg-yellow-50 text-yellow-600',
  };

  const getChangeIcon = () => {
    if (!change) return null;
    
    if (change.type === 'increase') {
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (change.type === 'decrease') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  return (
    <Card
      variant="stats"
      className={cn(
        'border-l-4',
        colorClasses[color].replace('bg-', '').replace('text-', ''),
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 nipo-japanese">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </p>
          
          {change && (
            <div className="flex items-center mt-2 space-x-1">
              {getChangeIcon()}
              <span className={cn(
                'text-sm font-medium',
                change.type === 'increase' ? 'text-green-600' : 
                change.type === 'decrease' ? 'text-red-600' : 
                'text-gray-600'
              )}>
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            'p-3 rounded-full',
            colorClasses[color]
          )}>
            <div className="w-6 h-6">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
```

---

## 🚀 **PRÓXIMOS PASSOS**

### **Implementação Imediata:**
1. **Criar a pasta structure:** `src/styles/`, `src/contexts/`, `src/components/ui/`, `src/components/nipo/`
2. **Implementar o CSS global** com todas as variáveis do design system
3. **Criar o ThemeProvider** e integrar no layout principal
4. **Implementar os componentes base** (Button, Card, Input)
5. **Testar responsividade** em diferentes dispositivos

### **Próxima Semana:**
- Modal e Toast components
- QR Scanner e Generator
- Music Player component
- Philosophy Quote component
- Landing page sections

### **Filosofia de Implementação:**
- **Mobile-first** sempre
- **Acessibilidade** em cada componente
- **Performance** otimizada
- **Animações suaves** que não comprometem UX
- **Consistência visual** através do design system

**🎌 Vamos começar criando esses componentes e ver nosso Nipo School ganhar vida!** ✨