/**
 * DIGIAI Foundation — Tailwind preset (Camada 1)
 *
 * Estrutura agnóstica de marca: espaçamento, raio, tipografia (tamanhos),
 * motion, elevação, z-index, container, + primitivos de cor de sistema
 * (neutral/green/amber/red) e os papéis semânticos como var(--digiai-*).
 *
 * Os papéis semânticos (text/surface/border/action/status/accent) apontam
 * para CSS vars com namespace de MARCA, resolvidas por var() em cascata:
 *   --digiai-role-* → (tema de marca redefine) → cor final
 * Um tema de marca (Camada 2) provê as cores via seu próprio preset/CSS.
 *
 * Uso: o projeto consumidor compõe fundação + preset de marca:
 *
 *   import foundation from '../../Cockpit/design_system/foundation/tailwind.foundation.js';
 *   import clearix    from '../../Cockpit/design_system/brands/clearix/tailwind.clearix.js';
 *   export default { presets: [foundation, clearix], content: [...] };
 *
 * @version 1.0.0
 * @owner DIGIAI
 * @see ADR-0034
 */
// PILOTO: convertido para ESM (nipo_school é "type":"module"). Achado: presets
// canônicos são CommonJS — distribuição precisa ser ESM-compatível ou .cjs.
export default {
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        // Primitivos de sistema (agnósticos de marca) — literais
        neutral: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
          800: '#1E293B', 900: '#0F172A', 950: '#020617',
        },
        green: {
          50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7',
          400: '#34D399', 500: '#10B981', 600: '#059669', 700: '#047857',
          800: '#065F46', 900: '#064E3B', 950: '#022C22',
        },
        amber: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D',
          400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309',
          800: '#92400E', 900: '#78350F', 950: '#451A03',
        },
        red: {
          50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5',
          400: '#F87171', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C',
          800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A',
        },

        // Papéis semânticos — resolvidos por CSS var do TEMA DE MARCA ativo.
        // O tema (Camada 2) declara --digiai-role-* (ou aliasa do seu namespace).
        text: {
          primary:      'var(--digiai-role-text-primary)',
          secondary:    'var(--digiai-role-text-secondary)',
          muted:        'var(--digiai-role-text-muted)',
          disabled:     'var(--digiai-role-text-disabled)',
          inverse:      'var(--digiai-role-text-inverse)',
          'on-primary': 'var(--digiai-role-text-on-primary)',
          'on-danger':  'var(--digiai-role-text-on-danger)',
          link:         'var(--digiai-role-text-link)',
          'link-hover': 'var(--digiai-role-text-link-hover)',
        },
        surface: {
          base:    'var(--digiai-role-surface-base)',
          raised:  'var(--digiai-role-surface-raised)',
          overlay: 'var(--digiai-role-surface-overlay)',
          sunken:  'var(--digiai-role-surface-sunken)',
          inverse: 'var(--digiai-role-surface-inverse)',
        },
        border: {
          subtle:  'var(--digiai-role-border-subtle)',
          default: 'var(--digiai-role-border-default)',
          strong:  'var(--digiai-role-border-strong)',
          focus:   'var(--digiai-role-border-focus)',
          danger:  'var(--digiai-role-border-danger)',
        },
        action: {
          primary:          'var(--digiai-role-action-primary)',
          'primary-hover':  'var(--digiai-role-action-primary-hover)',
          'primary-active': 'var(--digiai-role-action-primary-active)',
          secondary:        'var(--digiai-role-action-secondary)',
          'secondary-hover':'var(--digiai-role-action-secondary-hover)',
          danger:           'var(--digiai-role-action-danger)',
          'danger-hover':   'var(--digiai-role-action-danger-hover)',
          'ghost-hover':    'var(--digiai-role-action-ghost-hover)',
        },
        status: {
          'success-bg':     'var(--digiai-role-status-success-bg)',
          'success-text':   'var(--digiai-role-status-success-text)',
          'success-border': 'var(--digiai-role-status-success-border)',
          'warning-bg':     'var(--digiai-role-status-warning-bg)',
          'warning-text':   'var(--digiai-role-status-warning-text)',
          'warning-border': 'var(--digiai-role-status-warning-border)',
          'info-bg':        'var(--digiai-role-status-info-bg)',
          'info-text':      'var(--digiai-role-status-info-text)',
          'info-border':    'var(--digiai-role-status-info-border)',
          'danger-bg':      'var(--digiai-role-status-danger-bg)',
          'danger-text':    'var(--digiai-role-status-danger-text)',
          'danger-border':  'var(--digiai-role-status-danger-border)',
        },
        accent: {
          bg:     'var(--digiai-role-accent-bg)',
          text:   'var(--digiai-role-accent-text)',
          border: 'var(--digiai-role-accent-border)',
        },
      },

      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '700' }],
        'display-xl':  ['60px', { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '700' }],
        'display-lg':  ['48px', { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '700' }],
        'heading-xl':  ['36px', { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'heading-lg':  ['30px', { lineHeight: '1.25', letterSpacing: '-0.02em',  fontWeight: '600' }],
        'heading-md':  ['24px', { lineHeight: '1.3',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-sm':  ['20px', { lineHeight: '1.35', letterSpacing: '-0.01em',  fontWeight: '600' }],
        'heading-xs':  ['18px', { lineHeight: '1.4',  letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-xl':     ['20px', { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '400' }],
        'body-lg':     ['18px', { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '400' }],
        'body-md':     ['16px', { lineHeight: '1.55', letterSpacing: '0',        fontWeight: '400' }],
        'body-sm':     ['14px', { lineHeight: '1.5',  letterSpacing: '0',        fontWeight: '400' }],
        'body-xs':     ['12px', { lineHeight: '1.45', letterSpacing: '0',        fontWeight: '400' }],
        'caption':     ['11px', { lineHeight: '1.4',  letterSpacing: '0.02em',   fontWeight: '500' }],
      },

      borderRadius: {
        'none': '0', 'xs': '2px', 'sm': '4px', 'md': '6px', 'lg': '8px',
        'xl': '12px', '2xl': '16px', '3xl': '20px', 'full': '9999px',
      },

      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03)',
        'elevation-2': '0 2px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)',
        'elevation-3': '0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)',
        'elevation-4': '0 8px 16px rgba(0,0,0,0.10), 0 16px 32px rgba(0,0,0,0.08)',
        'elevation-5': '0 16px 32px rgba(0,0,0,0.12), 0 24px 48px rgba(0,0,0,0.10)',
        'focus-ring':  '0 0 0 2px var(--digiai-role-border-focus), 0 0 0 4px var(--digiai-role-surface-base)',
      },

      transitionDuration: {
        'instant': '75ms', 'fast': '150ms', 'base': '200ms',
        'slow': '300ms', 'slower': '500ms', 'deliberate': '750ms',
      },
      transitionTimingFunction: {
        'spring-soft':   'cubic-bezier(0.34, 1.20, 0.64, 1)',
        'spring-bouncy': 'cubic-bezier(0.34, 1.50, 0.64, 1)',
        'spring-rigid':  'cubic-bezier(0.5, 1.0, 0.3, 1)',
      },

      zIndex: {
        'base': '0', 'dropdown': '100', 'sticky': '200', 'drawer': '300',
        'modal': '400', 'popover': '500', 'toast': '600', 'tooltip': '700',
      },

      maxWidth: { 'container': '1440px' },

      screens: {
        'mobile': '375px', 'tablet': '768px', 'laptop': '1024px', 'desktop': '1440px',
      },
    },
  },
};
