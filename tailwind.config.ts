import type { Config } from 'tailwindcss'

// Nipo Wa Design System — escalas de papel + marca. Fonte: design-system/nipo-wa.tokens.json
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626',
          dark: '#991b1b',
        },
        sakura: { DEFAULT: '#FF6B9D', light: '#ff8fb3', dark: '#e84a82' },
        ivory: '#fbf7f0',
        sumi: '#1c1917',
        // Sistema de 4 papéis (Nipo Wa)
        student: { DEFAULT: '#dc2626', dark: '#991b1b', light: '#f87171', bg: '#fef2f2' },
        teacher: { DEFAULT: '#0284c7', dark: '#075985', light: '#38bdf8', bg: '#eff6ff' },
        admin:   { DEFAULT: '#7c3aed', dark: '#6d28d9', light: '#a78bfa', bg: '#faf5ff' },
        family:  { DEFAULT: '#d97706', dark: '#b45309', light: '#fbbf24', bg: '#fffbeb' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}

export default config
