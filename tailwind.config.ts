import type { Config } from 'tailwindcss'
// PILOTO design system (ADR-0034 Fase 3): preset da fundação DIGIAI.
// Provê utilities semânticas (bg-action-primary, text-text-primary, ...) que
// resolvem para var(--digiai-role-*), preenchidas pelo nipo.theme.css.
// eslint-disable-next-line @typescript-eslint/no-var-requires
import foundationPreset from './app/design-system/tailwind.foundation.js'

const config: Config = {
  presets: [foundationPreset as unknown as Config],
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
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}

export default config
