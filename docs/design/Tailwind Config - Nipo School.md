/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 🎨 NIPO BRAND COLORS
      colors: {
        nipo: {
          primary: {
            50: '#fef2f2',
            100: '#fde8e8',
            200: '#fbd5d5',
            300: '#f8b4b4',
            400: '#f87171',
            500: '#ef4444', // Main brand color
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          // ROLE-BASED COLORS
          admin: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#8b5cf6', // Main admin color
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          professor: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9', // Main professor color
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          student: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#10b981', // Main student color
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          // JAPANESE INSPIRED COLORS
          sakura: {
            50: '#fef7f7',
            100: '#feecec',
            200: '#fdd8d8',
            300: '#fcb5b5',
            400: '#f98080',
            500: '#f56565',
            600: '#e53e3e',
            700: '#c53030',
            800: '#9b2c2c',
            900: '#742a2a',
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
          },
        },
      },

      // 📏 SPACING BASED ON 8PX GRID
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem',  // 352px
        '128': '32rem', // 512px
      },

      // 📐 BORDER RADIUS
      borderRadius: {
        'nipo-sm': '6px',
        'nipo-md': '8px', 
        'nipo-lg': '12px',
        'nipo-xl': '16px',
        'nipo-2xl': '20px',
        'nipo-3xl': '24px',
      },

      // 🌫️ BOX SHADOWS
      boxShadow: {
        'nipo-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'nipo-md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'nipo-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'nipo-xl': '0 12px 32px rgba(0, 0, 0, 0.2)',
        'nipo-brand': '0 4px 14px rgba(239, 68, 68, 0.25)',
        'nipo-admin': '0 4px 14px rgba(139, 92, 246, 0.25)',
        'nipo-professor': '0 4px 14px rgba(14, 165, 233, 0.25)',
        'nipo-student': '0 4px 14px rgba(16, 185, 129, 0.25)',
      },

      // 📝 FONT FAMILIES
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'japanese': ['Noto Sans JP', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Noto Sans JP', 'Inter', 'system-ui', 'sans-serif'],
      },

      // 📊 FONT SIZES
      fontSize: {
        'nipo-xs': ['0.75rem', { lineHeight: '1.4' }], // 12px
        'nipo-sm': ['0.875rem', { lineHeight: '1.5' }], // 14px  
        'nipo-base': ['1rem', { lineHeight: '1.6' }], // 16px
        'nipo-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'nipo-xl': ['1.25rem', { lineHeight: '1.5' }], // 20px
        'nipo-2xl': ['1.5rem', { lineHeight: '1.4' }], // 24px
        'nipo-3xl': ['2rem', { lineHeight: '1.3' }], // 32px
        'nipo-4xl': ['2.5rem', { lineHeight: '1.2' }], // 40px
        'nipo-5xl': ['3rem', { lineHeight: '1.1' }], // 48px
      },

      // ⏱️ ANIMATION TIMING
      transitionDuration: {
        'nipo-fast': '150ms',
        'nipo-normal': '250ms', 
        'nipo-slow': '350ms',
      },

      // 🎭 ANIMATION CURVES
      transitionTimingFunction: {
        'nipo-ease': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'nipo-ease-in': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'nipo-ease-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'nipo-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // 🎬 CUSTOM ANIMATIONS
      keyframes: {
        // Zen breathing animation
        'zen-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        // Sakura falling animation
        'sakura-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        // Kaizen progress animation
        'kaizen-progress': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        // Notification slide in
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // Modal backdrop fade
        'backdrop-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Achievement unlock celebration
        'celebration-bounce': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
          '70%': { transform: 'translate3d(0, -15px, 0)' },
          '90%': { transform: 'translate3d(0, -4px, 0)' },
        },
        // QR scan pulse
        'qr-pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
        },
      },

      // 🎨 ANIMATION CLASSES
      animation: {
        'zen-breathe': 'zen-breathe 3s ease-in-out infinite',
        'sakura-fall': 'sakura-fall 8s linear infinite',
        'kaizen-progress': 'kaizen-progress 1s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'backdrop-fade': 'backdrop-fade 0.2s ease-out',
        'celebration-bounce': 'celebration-bounce 1s ease-in-out',
        'qr-pulse': 'qr-pulse 2s infinite',
      },

      // 📱 RESPONSIVE BREAKPOINTS
      screens: {
        'xs': '375px',   // Mobile small
        'sm': '640px',   // Mobile large
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop small
        'xl': '1280px',  // Desktop large
        '2xl': '1536px', // Desktop extra large
        // Custom breakpoints for specific components
        'mobile': { 'max': '640px' },
        'tablet': { 'min': '641px', 'max': '1024px' },
        'desktop': { 'min': '1025px' },
      },

      // 🎯 Z-INDEX LAYERS
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },

      // 🖼️ BACKDROP BLUR
      backdropBlur: {
        'nipo': '12px',
      },

      // 📐 ASPECT RATIOS
      aspectRatio: {
        'qr': '1 / 1',
        'card': '4 / 3',
        'banner': '16 / 9',
        'portrait': '3 / 4',
      },

      // 🎨 GRADIENTS
      backgroundImage: {
        'nipo-gradient': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'admin-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        'professor-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        'student-gradient': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'zen-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'sakura-gradient': 'linear-gradient(135deg, #fef7f7 0%, #fdd8d8 100%)',
      },
    },
  },
  
  // 🔌 PLUGINS
  plugins: [
    // Form plugin for better form styling
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    
    // Typography plugin for rich text content
    require('@tailwindcss/typography'),
    
    // Custom Nipo plugin for utilities
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities
      addUtilities({
        '.nipo-card-hover': {
          transition: 'all 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.nipo-md'),
          },
        },
        
        '.nipo-button-hover': {
          transition: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        
        '.nipo-focus': {
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.nipo.primary.500')}, 0 0 0 4px ${theme('colors.nipo.primary.100')}`,
          },
        },
        
        '.nipo-text-gradient': {
          background: theme('backgroundImage.nipo-gradient'),
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        '.nipo-glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        '.nipo-glass-dark': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
      
      // Custom components
      addComponents({
        '.nipo-container': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@media (min-width: 641px)': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@media (min-width: 1025px)': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        
        '.nipo-section': {
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          '@media (min-width: 768px)': {
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
          },
        },
        
        '.nipo-card-base': {
          backgroundColor: 'white',
          borderRadius: theme('borderRadius.nipo-lg'),
          boxShadow: theme('boxShadow.nipo-sm'),
          padding: theme('spacing.6'),
          border: '1px solid rgba(0, 0, 0, 0.05)',
          '[data-theme="dark"] &': {
            backgroundColor: theme('colors.gray.800'),
            borderColor: theme('colors.gray.700'),
          },
        },
      });
    },
  ],
};