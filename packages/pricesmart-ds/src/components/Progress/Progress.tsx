import React from 'react'
import { cn } from '../../lib/cn'

export type ProgressType = 'bar' | 'spinner'
export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressColor = 'brand' | 'success' | 'warning' | 'error'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ProgressType
  value?: number
  min?: number
  max?: number
  label?: string
  showValue?: boolean
  size?: ProgressSize
  color?: ProgressColor
  indeterminate?: boolean
}

const colorMap: Record<ProgressColor, string> = {
  brand:   'bg-ps-brand-primary',
  success: 'bg-ps-status-success-fg',
  warning: 'bg-ps-status-warning-fg',
  error:   'bg-ps-status-danger-fg',
}

const strokeColorMap: Record<ProgressColor, string> = {
  brand:   'stroke-ps-brand-primary',
  success: 'stroke-ps-status-success-fg',
  warning: 'stroke-ps-status-warning-fg',
  error:   'stroke-ps-status-danger-fg',
}

const barHeight: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const spinnerSize: Record<ProgressSize, { px: number; stroke: number }> = {
  sm: { px: 16, stroke: 2 },
  md: { px: 24, stroke: 2.5 },
  lg: { px: 40, stroke: 3.5 },
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      type = 'bar',
      value,
      min = 0,
      max = 100,
      label,
      showValue = false,
      size = 'md',
      color = 'brand',
      indeterminate = false,
      className,
      ...props
    },
    ref,
  ) => {
    const pct = indeterminate || value == null ? null : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

    if (type === 'spinner') {
      const { px, stroke } = spinnerSize[size]
      const r = (px - stroke) / 2
      const circ = 2 * Math.PI * r
      const dash = pct != null ? (pct / 100) * circ : circ * 0.75

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={pct != null ? value : undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          className={cn('inline-flex items-center gap-2', className)}
          {...props}
        >
          <svg
            width={px}
            height={px}
            viewBox={`0 0 ${px} ${px}`}
            className={cn(indeterminate && 'animate-spin')}
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              cx={px / 2}
              cy={px / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              className="stroke-ps-bg-muted"
            />
            <circle
              cx={px / 2}
              cy={px / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              strokeDasharray={circ}
              strokeDashoffset={circ - dash}
              strokeLinecap="round"
              className={cn(strokeColorMap[color], 'transition-all duration-300')}
            />
          </svg>
          {label && <span className="text-ps-sm text-ps-fg-muted">{label}</span>}
          {showValue && pct != null && (
            <span className="text-ps-sm text-ps-fg-muted">{Math.round(pct)}%</span>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && <span className="text-ps-sm text-ps-fg-default">{label}</span>}
            {showValue && pct != null && (
              <span className="text-ps-xs text-ps-fg-muted">{Math.round(pct)}%</span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={pct != null ? value : undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          className={cn(
            'w-full overflow-hidden rounded-ps-full bg-ps-bg-muted',
            barHeight[size],
          )}
        >
          <div
            className={cn(
              'h-full rounded-ps-full transition-all duration-500',
              colorMap[color],
              indeterminate && 'animate-pulse w-1/2',
            )}
            style={!indeterminate && pct != null ? { width: `${pct}%` } : undefined}
          />
        </div>
      </div>
    )
  },
)

Progress.displayName = 'Progress'
