/*
 * @pricesmart/ds — Public API
 *
 * Importá los componentes que necesitás:
 *   import { Button, Input, Select } from '@pricesmart/ds'
 *
 * Importá el CSS una vez en tu app:
 *   import '@pricesmart/ds/styles'
 *
 * Extendé Tailwind con el preset:
 *   import psPreset from '@pricesmart/ds/tailwind-preset'
 */

export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'

export { Input } from './components/Input'
export type { InputProps } from './components/Input'

export { Select, SelectItem } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'

/* Utilidad de composición de clases — expuesta para que los consumers puedan usarla */
export { cn } from './lib/cn'
