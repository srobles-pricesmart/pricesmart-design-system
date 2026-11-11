import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

/**
 * PriceSmart Design System — Tailwind Preset
 *
 * La app consumidora extiende su tailwind.config con este preset:
 *
 *   import psPreset from '@pricesmart/ds/tailwind-preset'
 *   export default { presets: [psPreset], ... }
 *
 * Los colores usan var() sobre los CSS custom properties definidos en tokens/index.css,
 * de modo que swapping de tema sólo requiere cambiar las variables CSS, no recompilar Tailwind.
 */
const preset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        ps: {
          /* Brand */
          'brand-primary':          'var(--ps-color-brand-primary)',
          'brand-primary-hover':    'var(--ps-color-brand-primary-hover)',
          'brand-primary-active':   'var(--ps-color-brand-primary-active)',
          'brand-primary-subtle':   'var(--ps-color-brand-primary-subtle)',
          'brand-secondary':        'var(--ps-color-brand-secondary)',
          'brand-secondary-hover':  'var(--ps-color-brand-secondary-hover)',

          /* Foreground */
          'fg-default':  'var(--ps-color-fg-default)',
          'fg-muted':    'var(--ps-color-fg-muted)',
          'fg-subtle':   'var(--ps-color-fg-subtle)',
          'fg-disabled': 'var(--ps-color-fg-disabled)',
          'fg-inverse':  'var(--ps-color-fg-inverse)',
          'fg-brand':    'var(--ps-color-fg-brand)',
          'fg-danger':   'var(--ps-color-fg-danger)',
          'fg-success':  'var(--ps-color-fg-success)',
          'fg-warning':  'var(--ps-color-fg-warning)',

          /* Background */
          'bg-default':  'var(--ps-color-bg-default)',
          'bg-subtle':   'var(--ps-color-bg-subtle)',
          'bg-muted':    'var(--ps-color-bg-muted)',
          'bg-disabled': 'var(--ps-color-bg-disabled)',

          /* Border */
          'border-default': 'var(--ps-color-border-default)',
          'border-strong':  'var(--ps-color-border-strong)',
          'border-brand':   'var(--ps-color-border-brand)',
          'border-danger':  'var(--ps-color-border-danger)',
          'border-focus':   'var(--ps-color-border-focus)',

          /* Status */
          'status-danger-bg':  'var(--ps-color-status-danger-bg)',
          'status-danger-fg':  'var(--ps-color-status-danger-fg)',
          'status-success-bg': 'var(--ps-color-status-success-bg)',
          'status-success-fg': 'var(--ps-color-status-success-fg)',
          'status-warning-bg': 'var(--ps-color-status-warning-bg)',
          'status-warning-fg': 'var(--ps-color-status-warning-fg)',
          'status-info-bg':    'var(--ps-color-status-info-bg)',
          'status-info-fg':    'var(--ps-color-status-info-fg)',

          /* Inverse surface */
          'bg-inverse':     'var(--ps-color-bg-inverse)',
          'fg-on-inverse':  'var(--ps-color-fg-on-inverse)',

          /* Avatar */
          'avatar-bg': 'var(--ps-color-avatar-bg)',
          'avatar-fg': 'var(--ps-color-avatar-fg)',
        },
      },

      fontFamily: {
        ps: 'var(--ps-font-family-sans)',
        'ps-mono': 'var(--ps-font-family-mono)',
      },

      fontSize: {
        'ps-xs':  ['var(--ps-font-size-xs)', { lineHeight: 'var(--ps-line-height-normal)' }],
        'ps-sm':  ['var(--ps-font-size-sm)', { lineHeight: 'var(--ps-line-height-normal)' }],
        'ps-md':  ['var(--ps-font-size-md)', { lineHeight: 'var(--ps-line-height-normal)' }],
        'ps-lg':  ['var(--ps-font-size-lg)', { lineHeight: 'var(--ps-line-height-tight)' }],
        'ps-xl':  ['var(--ps-font-size-xl)', { lineHeight: 'var(--ps-line-height-tight)' }],
        'ps-2xl': ['var(--ps-font-size-2xl)', { lineHeight: 'var(--ps-line-height-tight)' }],
        'ps-3xl': ['var(--ps-font-size-3xl)', { lineHeight: 'var(--ps-line-height-tight)' }],
      },

      borderRadius: {
        'ps-xs':   'var(--ps-radius-xs)',
        'ps-sm':   'var(--ps-radius-sm)',
        'ps-md':   'var(--ps-radius-md)',
        'ps-lg':   'var(--ps-radius-lg)',
        'ps-xl':   'var(--ps-radius-xl)',
        'ps-2xl':  'var(--ps-radius-2xl)',
        'ps-3xl':  'var(--ps-radius-3xl)',
        'ps-full': 'var(--ps-radius-full)',
      },

      boxShadow: {
        'ps-xs': 'var(--ps-shadow-xs)',
        'ps-sm': 'var(--ps-shadow-sm)',
        'ps-md': 'var(--ps-shadow-md)',
        'ps-lg': 'var(--ps-shadow-lg)',
        'ps-xl': 'var(--ps-shadow-xl)',
      },

      spacing: {
        'ps-1':   'var(--ps-spacing-1)',
        'ps-1.5': 'var(--ps-spacing-1\\.5)',
        'ps-2':   'var(--ps-spacing-2)',
        'ps-2.5': 'var(--ps-spacing-2\\.5)',
        'ps-3':   'var(--ps-spacing-3)',
        'ps-4':   'var(--ps-spacing-4)',
        'ps-5':   'var(--ps-spacing-5)',
        'ps-6':   'var(--ps-spacing-6)',
        'ps-8':   'var(--ps-spacing-8)',
        'ps-10':  'var(--ps-spacing-10)',
        'ps-12':  'var(--ps-spacing-12)',
      },
    },
  },

  plugins: [
    plugin(({ addBase }) => {
      /* Clases base de accesibilidad para el focus ring */
      addBase({
        '[data-ps-focus-visible]:focus-visible, .ps-focusable:focus-visible': {
          outline: `var(--ps-ring-width) solid var(--ps-ring-color)`,
          outlineOffset: `var(--ps-ring-offset)`,
        },
      })
    }),
  ],
}

export default preset
