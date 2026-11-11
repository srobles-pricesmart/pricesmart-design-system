import React, { useId } from 'react'
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="h-3 w-3">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IndeterminateIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="h-3 w-3">
    <path d="M2.5 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className'> {
  label?: string
  description?: string
  error?: string
  className?: string
  wrapperClassName?: string
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ label, description, error, className, wrapperClassName, isIndeterminate, ...props }, ref) => {
    const descId = useId()
    const errorId = useId()

    const hasDesc = !!description
    const hasError = !!error
    const ariaDescribedBy = [hasDesc && descId, hasError && errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={cn('flex flex-col gap-1', wrapperClassName)}>
        <AriaCheckbox
          ref={ref}
          isIndeterminate={isIndeterminate}
          isInvalid={hasError}
          aria-describedby={ariaDescribedBy}
          className={cn(
            'group flex items-start gap-2.5 cursor-pointer',
            'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
            className,
          )}
          {...props}
        >
          {({ isSelected, isIndeterminate: ind }) => (
            <>
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-ps-xs border',
                  'transition-colors duration-[var(--ps-duration-normal)]',
                  'group-data-[focus-visible]:ring-[var(--ps-ring-width)] group-data-[focus-visible]:ring-[var(--ps-ring-color)] group-data-[focus-visible]:ring-offset-[var(--ps-ring-offset)]',
                  isSelected || ind
                    ? 'bg-ps-brand-primary border-ps-brand-primary text-ps-fg-inverse'
                    : hasError
                    ? 'border-ps-border-danger bg-ps-bg-default'
                    : 'border-ps-border-default bg-ps-bg-default group-data-[hovered]:border-ps-border-strong',
                )}
              >
                {ind ? <IndeterminateIcon /> : isSelected ? <CheckIcon /> : null}
              </span>
              {label && (
                <span className="text-ps-sm text-ps-fg-default leading-tight">{label}</span>
              )}
            </>
          )}
        </AriaCheckbox>

        {description && !error && (
          <p id={descId} className="pl-6.5 text-ps-xs text-ps-fg-muted">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="pl-6.5 text-ps-xs text-ps-fg-danger">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
