import React, { useId } from 'react'
import {
  Select as AriaSelect,
  SelectValue,
  Button as AriaButton,
  Popover,
  ListBox,
  ListBoxItem,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

/*
 * Select — Figma ref: Design System Master Library VARIABLES v4.1
 *
 * Construido sobre react-aria-components para garantizar:
 *   - Apertura con Space/Enter/ArrowDown
 *   - Navegación entre opciones con ArrowUp/ArrowDown/Home/End
 *   - Cierre con Escape
 *   - Type-ahead search
 *   - ARIA roles: combobox, listbox, option
 *   - Foco manejado automáticamente por React Aria
 *
 * API compatible con el patrón label/description/error del DS.
 */

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps<T extends object = SelectOption>
  extends Omit<AriaSelectProps<T>, 'children'> {
  /** Label visible del campo */
  label?: string
  /** Texto de ayuda debajo del campo */
  description?: string
  /** Mensaje de error */
  error?: string
  /** Lista de opciones */
  options: SelectOption[]
  /** Texto cuando no hay selección */
  placeholder?: string
  /** Clase extra para el wrapper */
  wrapperClassName?: string
  /** Tamaño del trigger */
  size?: 'sm' | 'md' | 'lg'
}

const triggerSizeClasses = {
  sm: 'h-8 px-3 text-ps-sm',
  md: 'h-10 px-3 text-ps-sm',
  lg: 'h-12 px-4 text-ps-md',
}

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 shrink-0 transition-transform duration-[var(--ps-duration-normal)] group-data-[state=open]:rotate-180"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

export function Select<T extends object = SelectOption>({
  label,
  description,
  error,
  options,
  placeholder = 'Seleccioná una opción',
  wrapperClassName,
  size = 'md',
  className,
  ...props
}: SelectProps<T>) {
  const generatedId = useId()
  const descriptionId = `${generatedId}-description`
  const errorId = `${generatedId}-error`

  const hasError = Boolean(error)
  const hasDescription = Boolean(description)

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <span
          className={cn(
            'text-ps-sm font-medium text-ps-fg-default',
            props.isDisabled && 'text-ps-fg-disabled'
          )}
        >
          {label}
          {props.isRequired && (
            <span aria-hidden="true" className="ml-1 text-ps-fg-danger">
              *
            </span>
          )}
        </span>
      )}

      <AriaSelect
        {...props}
        aria-describedby={
          [hasDescription && descriptionId, hasError && errorId]
            .filter(Boolean)
            .join(' ') || undefined
        }
        isInvalid={hasError}
      >
        {({ isOpen }) => (
          <>
            {/* Trigger button */}
            <AriaButton
              className={cn(
                'group flex w-full items-center justify-between gap-2',
                'rounded-ps-md border bg-ps-bg-default',
                'text-ps-fg-default',
                'transition-colors duration-[var(--ps-duration-normal)]',
                'cursor-pointer select-none',
                /* states */
                hasError
                  ? 'border-ps-border-danger hover:border-ps-border-danger'
                  : 'border-ps-border-default hover:border-ps-border-strong',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-[var(--ps-ring-width)] focus-visible:ring-[var(--ps-ring-color)] focus-visible:ring-offset-[var(--ps-ring-offset)]',
                triggerSizeClasses[size],
                className
              )}
            >
              <SelectValue
                className={cn(
                  'flex-1 text-left truncate',
                  /* placeholder text */
                  'data-[placeholder]:text-ps-fg-subtle'
                )}
              >
                {({ selectedText, defaultChildren }) =>
                  selectedText || <span className="text-ps-fg-subtle">{placeholder}</span>
                }
              </SelectValue>
              <ChevronDown />
            </AriaButton>

            {/* Dropdown */}
            <Popover
              className={cn(
                'w-[--trigger-width] z-50',
                'rounded-ps-lg border border-ps-border-default bg-ps-bg-default shadow-ps-md',
                'entering:animate-in entering:fade-in-0 entering:zoom-in-95',
                'exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95',
                'max-h-60 overflow-y-auto'
              )}
            >
              <ListBox
                className="p-1 outline-none"
                items={options as any}
              >
                {(item: any) => (
                  <SelectItem
                    key={item.value}
                    id={item.value}
                    isDisabled={item.disabled}
                    textValue={item.label}
                  >
                    {item.label}
                  </SelectItem>
                )}
              </ListBox>
            </Popover>
          </>
        )}
      </AriaSelect>

      {hasDescription && !hasError && (
        <p id={descriptionId} className="text-ps-xs text-ps-fg-muted">
          {description}
        </p>
      )}

      {hasError && (
        <p id={errorId} role="alert" className="text-ps-xs text-ps-fg-danger flex items-center gap-1">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── SelectItem ─────────────────────────────────────────────── */

export function SelectItem({ children, className, ...props }: ListBoxItemProps & { className?: string }) {
  return (
    <ListBoxItem
      {...props}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-ps-sm',
        'text-ps-sm text-ps-fg-default cursor-pointer',
        'outline-none select-none',
        'hover:bg-ps-brand-primary-subtle focus:bg-ps-brand-primary-subtle',
        'selected:font-medium selected:text-ps-fg-brand',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-[var(--ps-duration-fast)]',
        /* React Aria data attributes */
        'data-[hovered]:bg-ps-brand-primary-subtle',
        'data-[focused]:bg-ps-brand-primary-subtle',
        'data-[selected]:font-semibold data-[selected]:text-ps-fg-brand',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        className
      )}
    >
      {({ isSelected }) => (
        <>
          <span className="flex-1">{children as React.ReactNode}</span>
          {isSelected && (
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-ps-fg-brand shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </>
      )}
    </ListBoxItem>
  )
}
