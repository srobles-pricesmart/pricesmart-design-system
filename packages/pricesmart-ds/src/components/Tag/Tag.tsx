import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const tagVariants = cva(
  [
    'inline-flex items-center gap-1',
    'font-medium leading-none whitespace-nowrap',
    'rounded-ps-md border',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-ps-brand-primary-subtle text-ps-fg-brand border-ps-border-brand',
        secondary: 'bg-ps-status-danger-bg text-ps-status-danger-fg border-ps-status-danger-fg/30',
        success:   'bg-ps-status-success-bg text-ps-status-success-fg border-ps-status-success-fg/30',
        warning:   'bg-ps-status-warning-bg text-ps-status-warning-fg border-ps-status-warning-fg/30',
        error:     'bg-ps-status-danger-bg text-ps-status-danger-fg border-ps-status-danger-fg/30',
        info:      'bg-ps-status-info-bg text-ps-status-info-fg border-ps-status-info-fg/30',
        neutral:   'bg-ps-bg-muted text-ps-fg-muted border-ps-border-default',
      },
      size: {
        sm: 'h-6 px-2 text-ps-xs',
        md: 'h-7 px-2.5 text-ps-xs',
        lg: 'h-8 px-3 text-ps-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)

export type TagVariant = NonNullable<VariantProps<typeof tagVariants>['variant']>
export type TagSize = NonNullable<VariantProps<typeof tagVariants>['size']>

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removeLabel?: string
}

const XIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-3 w-3"
  >
    <path d="M4.47 4.47a.75.75 0 0 1 1.06 0L8 6.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L9.06 8l2.47 2.47a.75.75 0 1 1-1.06 1.06L8 9.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L6.94 8 4.47 5.53a.75.75 0 0 1 0-1.06Z" />
  </svg>
)

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, onRemove, removeLabel, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          aria-label={removeLabel ?? `Eliminar ${typeof children === 'string' ? children : ''}`}
          className={cn(
            'rounded-ps-xs opacity-70 hover:opacity-100',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
            '-mr-0.5 flex items-center',
          )}
        >
          <XIcon />
        </button>
      )}
    </span>
  )
)

Tag.displayName = 'Tag'
