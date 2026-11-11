import type { Config } from 'tailwindcss'
import psPreset from '@pricesmart/ds/tailwind-preset'

export default {
  presets: [psPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    /* Incluye los componentes del DS para que Tailwind genere las clases */
    '../../packages/pricesmart-ds/src/**/*.{ts,tsx}',
  ],
} satisfies Config
