import React, { useId } from 'react'
import {
  CheckboxGroup as AriaCheckboxGroup,
  Label,
  Text,
  FieldError,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'className' | 'children'> {
  label?: string
  description?: string
  error?: string
  className?: string
  orientation?: 'vertical' | 'horizontal'
  children?: React.ReactNode
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, description, error, className, orientation = 'vertical', children, isInvalid, ...props }, ref) => (
    <AriaCheckboxGroup
      ref={ref}
      isInvalid={!!error || isInvalid}
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    >
      {label && (
        <Label className="text-ps-sm font-medium text-ps-fg-default">{label}</Label>
      )}

      <div className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
      )}>
        {children}
      </div>

      {description && !error && (
        <Text slot="description" className="text-ps-xs text-ps-fg-muted">{description}</Text>
      )}
      {error && (
        <FieldError className="text-ps-xs text-ps-fg-danger">{error}</FieldError>
      )}
    </AriaCheckboxGroup>
  )
)

CheckboxGroup.displayName = 'CheckboxGroup'
