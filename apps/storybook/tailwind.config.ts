import type { Config } from 'tailwindcss'
import psPreset from '@pricesmart/ds/tailwind-preset'

export default {
  presets: [psPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    /* Incluir los componentes del paquete para que Tailwind genere sus clases */
    '../../packages/pricesmart-ds/src/**/*.{ts,tsx}',
  ],
} satisfies Config
