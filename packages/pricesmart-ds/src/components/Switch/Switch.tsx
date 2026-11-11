import React from 'react'
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

const trackSize = {
  sm: { track: 'h-4 w-8', thumb: 'h-3 w-3', translate: 'group-data-[selected]:translate-x-4' },
  md: { track: 'h-5 w-10', thumb: 'h-4 w-4', translate: 'group-data-[selected]:translate-x-5' },
  lg: { track: 'h-6 w-12', thumb: 'h-5 w-5', translate: 'group-data-[selected]:translate-x-6' },
}

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<AriaSwitchProps, 'className'> {
  label?: string
  size?: SwitchSize
  className?: string
}

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  ({ label, size = 'md', className, ...props }, ref) => {
    const { track, thumb, translate } = trackSize[size]

    return (
      <AriaSwitch
        ref={ref}
        className={cn(
          'group flex items-center gap-2.5 cursor-pointer',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'flex shrink-0 items-center rounded-ps-full p-0.5',
            'transition-colors duration-[var(--ps-duration-normal)]',
            'bg-ps-bg-muted group-data-[selected]:bg-ps-brand-primary',
            'group-data-[focus-visible]:ring-[var(--ps-ring-width)] group-data-[focus-visible]:ring-[var(--ps-ring-color)] group-data-[focus-visible]:ring-offset-[var(--ps-ring-offset)]',
            track,
          )}
        >
          <span
            className={cn(
              'rounded-full bg-white shadow-ps-xs',
              'transform transition-transform duration-[var(--ps-duration-normal)]',
              translate,
              thumb,
            )}
          />
        </span>
        {label && (
          <span className="text-ps-sm text-ps-fg-default">{label}</span>
        )}
      </AriaSwitch>
    )
  }
)

Switch.displayName = 'Switch'
