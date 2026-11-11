import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'font-medium leading-none whitespace-nowrap',
    'rounded-ps-full px-2',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-ps-brand-primary text-ps-fg-inverse',
        secondary: 'bg-ps-brand-secondary text-ps-fg-inverse',
        success:   'bg-ps-status-success-bg text-ps-status-success-fg',
        warning:   'bg-ps-status-warning-bg text-ps-status-warning-fg',
        error:     'bg-ps-status-danger-bg text-ps-status-danger-fg',
        info:      'bg-ps-status-info-bg text-ps-status-info-fg',
        neutral:   'bg-ps-bg-muted text-ps-fg-muted',
      },
      size: {
        sm: 'h-5 text-[0.6875rem]',
        md: 'h-6 text-ps-xs',
        lg: 'h-7 text-ps-xs',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const DotIndicator = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 rounded-full bg-current', className)} />
)

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && <DotIndicator />}
      {children}
    </span>
  )
)

Badge.displayName = 'Badge'
