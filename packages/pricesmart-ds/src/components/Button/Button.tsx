import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

/*
 * Button — Figma ref: Design System Master Library VARIABLES v4.1
 * Node: 2210-441096 (pending confirmation de nodo exacto del Button)
 *
 * Variantes implementadas según patrón típico de DS corporativo:
 *   variant: primary | secondary | outline | ghost | destructive
 *   size:    sm | md | lg
 *   state:   default | loading | disabled
 */

const buttonVariants = cva(
  /* Base styles — siempre presentes */
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium leading-none whitespace-nowrap',
    'rounded-ps-md border',
    'transition-all duration-[var(--ps-duration-normal)] ease-[var(--ps-ease-default)]',
    'cursor-pointer select-none',
    'focus-visible:outline-none',
    'focus-visible:ring-[var(--ps-ring-width)] focus-visible:ring-[var(--ps-ring-color)] focus-visible:ring-offset-[var(--ps-ring-offset)]',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-ps-brand-primary text-ps-fg-inverse border-transparent',
          'hover:bg-ps-brand-primary-hover',
          'active:bg-ps-brand-primary-active',
        ],
        secondary: [
          'bg-ps-brand-secondary text-ps-fg-inverse border-transparent',
          'hover:bg-ps-brand-secondary-hover',
          'active:opacity-90',
        ],
        outline: [
          'bg-transparent text-ps-fg-brand border-ps-border-brand',
          'hover:bg-ps-brand-primary-subtle',
          'active:bg-ps-brand-primary-subtle',
        ],
        ghost: [
          'bg-transparent text-ps-fg-brand border-transparent',
          'hover:bg-ps-brand-primary-subtle',
          'active:bg-ps-brand-primary-subtle',
        ],
        destructive: [
          'bg-ps-brand-secondary text-ps-fg-inverse border-transparent',
          'hover:bg-ps-brand-secondary-hover',
          'active:opacity-90',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-ps-sm',
        md: 'h-10 px-4 text-ps-sm',
        lg: 'h-12 px-6 text-ps-md',
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Muestra un spinner y deshabilita el botón mientras carga */
  loading?: boolean
  /** Ícono que se renderiza a la izquierda del label */
  leftIcon?: React.ReactNode
  /** Ícono que se renderiza a la derecha del label */
  rightIcon?: React.ReactNode
  /** Ocupa el ancho completo del contenedor */
  fullWidth?: boolean
  /** Variante visual del botón */
  variant?: ButtonVariant
  /** Tamaño del botón */
  size?: ButtonSize
}

const Spinner = () => (
  <svg
    aria-hidden="true"
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
