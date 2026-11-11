import React, { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

/*
 * Input (TextField) — Figma ref: Design System Master Library VARIABLES v4.1
 *
 * Implementa el patrón de campo de formulario con:
 *   - label visible asociado con htmlFor (accesibilidad)
 *   - description con aria-describedby
 *   - error message con aria-errormessage + aria-invalid
 *   - ícono izquierdo / derecho (slot)
 *   - estados: default, focus, disabled, readonly, error
 */

const inputVariants = cva(
  [
    'w-full rounded-ps-md border bg-ps-bg-default',
    'text-ps-sm text-ps-fg-default placeholder:text-ps-fg-subtle',
    'transition-colors duration-[var(--ps-duration-normal)]',
    'focus-visible:outline-none',
    'focus-visible:ring-[var(--ps-ring-width)] focus-visible:ring-[var(--ps-ring-color)] focus-visible:ring-offset-[var(--ps-ring-offset)]',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ps-bg-disabled',
    'read-only:bg-ps-bg-subtle',
  ],
  {
    variants: {
      state: {
        default: 'border-ps-border-default hover:border-ps-border-strong',
        error:   'border-ps-border-danger hover:border-ps-border-danger focus-visible:ring-[var(--ps-color-border-danger)]',
      },
      hasLeftIcon: { true: 'pl-10' },
      hasRightIcon: { true: 'pr-10' },
      inputSize: {
        sm: 'h-8  px-3 py-1.5',
        md: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'state' | 'hasLeftIcon' | 'hasRightIcon'> {
  /** Label visible del campo */
  label?: string
  /** Texto de ayuda debajo del campo */
  description?: string
  /** Mensaje de error — activa estado visual de error */
  error?: string
  /** Ícono o elemento decorativo a la izquierda del input */
  leftIcon?: React.ReactNode
  /** Ícono o elemento decorativo a la derecha del input */
  rightIcon?: React.ReactNode
  /** Tamaño del campo */
  inputSize?: 'sm' | 'md' | 'lg'
  /** Prop contenedor extra para el wrapper del campo */
  wrapperClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: idProp,
      label,
      description,
      error,
      leftIcon,
      rightIcon,
      inputSize,
      className,
      wrapperClassName,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const descriptionId = `${id}-description`
    const errorId = `${id}-error`

    const hasError = Boolean(error)
    const hasDescription = Boolean(description)

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-ps-sm font-medium text-ps-fg-default',
              disabled && 'text-ps-fg-disabled'
            )}
          >
            {label}
            {required && (
              <span aria-hidden="true" className="ml-1 text-ps-fg-danger">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 flex items-center text-ps-fg-muted"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [hasDescription && descriptionId, hasError && errorId]
                .filter(Boolean)
                .join(' ') || undefined
            }
            className={cn(
              inputVariants({
                state: hasError ? 'error' : 'default',
                inputSize,
                hasLeftIcon: Boolean(leftIcon),
                hasRightIcon: Boolean(rightIcon),
              }),
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 flex items-center text-ps-fg-muted"
            >
              {rightIcon}
            </span>
          )}
        </div>

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
)

Input.displayName = 'Input'
