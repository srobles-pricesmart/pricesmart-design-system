/*
 * @pricesmart/ds — Public API
 *
 * Importá los componentes que necesitás:
 *   import { Button, Input, Select, Badge, Tag, Avatar, ... } from '@pricesmart/ds'
 *
 * Importá el CSS una vez en tu app:
 *   import '@pricesmart/ds/styles'
 *
 * Extendé Tailwind con el preset:
 *   import psPreset from '@pricesmart/ds/tailwind-preset'
 */

// ── Primitivos ────────────────────────────────────────────────────────────────
export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'

export { Input } from './components/Input'
export type { InputProps } from './components/Input'

export { Select, SelectItem } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'

// ── Átomos ────────────────────────────────────────────────────────────────────
export { Badge } from './components/Badge'
export type { BadgeProps } from './components/Badge'

export { Tag } from './components/Tag'
export type { TagProps } from './components/Tag'

export { Avatar } from './components/Avatar'
export type { AvatarProps, AvatarSize, AvatarStatus } from './components/Avatar'

export { Progress } from './components/Progress'
export type { ProgressProps, ProgressType, ProgressSize, ProgressColor } from './components/Progress'

export { Icon } from './components/Icon'
export type { IconProps, IconSize } from './components/Icon'

// ── Moléculas ─────────────────────────────────────────────────────────────────
export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { CheckboxGroup } from './components/CheckboxGroup'
export type { CheckboxGroupProps } from './components/CheckboxGroup'

export { Switch } from './components/Switch'
export type { SwitchProps, SwitchSize } from './components/Switch'

export { Slider } from './components/Slider'
export type { SliderProps, SliderSize } from './components/Slider'

export { Tooltip } from './components/Tooltip'
export type { TooltipProps, TooltipPlacement } from './components/Tooltip'

export { Menu, MenuItem, MenuSection, MenuSeparator } from './components/Menu'
export type { MenuProps, MenuItemProps, MenuItemVariant, MenuSectionProps } from './components/Menu'

/* Utilidad de composición de clases — expuesta para que los consumers puedan usarla */
export { cn } from './lib/cn'
