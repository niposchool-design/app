import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        nipo: {
          primary: '#ef4444',
          'primary-hover': '#dc2626',
          'primary-light': '#fca5a5',
          'primary-bg': '#fef2f2',
          
          admin: {
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          professor: {
            500: '#0ea5e9',
            600: '#0284c7', 
            700: '#0369a1',
          },
          student: {
            500: '#10b981',
            600: '#059669',
            700: '#047857',
          },
          
          sakura: {
            400: '#f98080',
            500: '#f26363',
            600: '#e03e3e',
            700: '#c53030',
          },
          matcha: {
            500: '#84cc16',
            600: '#65a30d',
            700: '#4d7c0f',
          },
          indigo: {
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
          },
          gold: {
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          zen: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        zen: ['Noto Sans JP', 'Inter', 'sans-serif'],
        music: ['Fredoka One', 'cursive'],
      },
      
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-zen': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'zen-breath': 'zenBreath 4s ease-in-out infinite',
        'sakura-float': 'sakuraFloat 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'portal-particle': 'portalParticle 4s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zenBreath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        sakuraFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) rotate(240deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        portalParticle: {
          '0%': { 
            transform: 'translateX(-300px) translateZ(0px) scale(0.5)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1',
            transform: 'translateX(0px) translateZ(100px) scale(1)'
          },
          '100%': { 
            transform: 'translateX(300px) translateZ(0px) scale(0.5)',
            opacity: '0'
          },
        },
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'zen': '1.5rem',
        'nipo': '2rem',
        'sakura': '1.25rem',
      },
      
      boxShadow: {
        'zen': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config