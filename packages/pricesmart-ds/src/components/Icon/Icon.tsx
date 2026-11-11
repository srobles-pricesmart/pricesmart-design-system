import React from 'react'
import { cn } from '../../lib/cn'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: IconSize
  label?: string
  children: React.ReactNode
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ size = 'md', label, children, className, style, ...props }, ref) => {
    const px = sizeMap[size]

    return (
      <span
        ref={ref}
        role={label ? 'img' : 'presentation'}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn('inline-flex shrink-0 items-center justify-center', className)}
        style={{ width: px, height: px, ...style }}
        {...props}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ width?: number; height?: number; size?: number }>, {
              width: px,
              height: px,
              size: px,
            })
          : children}
      </span>
    )
  },
)

Icon.displayName = 'Icon'
