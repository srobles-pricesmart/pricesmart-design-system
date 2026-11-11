import React from 'react'
import {
  MenuTrigger,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  Header,
  Separator,
  Popover,
  type MenuProps as AriaMenuProps,
  type MenuItemProps as AriaMenuItemProps,
  type MenuSectionProps as AriaMenuSectionProps,
  type PopoverProps,
  type Key,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

// ── MenuItem ──────────────────────────────────────────────────────────────────

export type MenuItemVariant = 'default' | 'danger'

export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className' | 'children'> {
  icon?: React.ReactNode
  shortcut?: string
  variant?: MenuItemVariant
  className?: string
  children?: React.ReactNode
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ icon, shortcut, variant = 'default', className, children, ...props }, ref) => (
    <AriaMenuItem
      ref={ref}
      className={cn(
        'flex items-center gap-2 h-9 px-3 rounded-ps-sm cursor-default select-none outline-none',
        'text-ps-sm',
        'transition-colors duration-[var(--ps-duration-fast)]',
        'data-[focused]:bg-ps-bg-subtle data-[pressed]:bg-ps-bg-muted',
        variant === 'danger'
          ? 'text-ps-fg-danger data-[focused]:text-ps-fg-danger'
          : 'text-ps-fg-default',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-ps-fg-muted">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <kbd className="shrink-0 text-ps-xs text-ps-fg-subtle font-mono">{shortcut}</kbd>
      )}
    </AriaMenuItem>
  ),
)
MenuItem.displayName = 'MenuItem'

// ── MenuSection ───────────────────────────────────────────────────────────────

export interface MenuSectionProps<T> extends Omit<AriaMenuSectionProps<T>, 'children'> {
  title?: string
  children?: React.ReactNode
}

export function MenuSection<T extends object>({ title, children, ...props }: MenuSectionProps<T>) {
  return (
    <AriaMenuSection {...(props as AriaMenuSectionProps<T>)}>
      {title && (
        <Header className="px-3 pt-2 pb-1 text-ps-xs font-medium text-ps-fg-subtle uppercase tracking-wide">
          {title}
        </Header>
      )}
      {children}
    </AriaMenuSection>
  )
}
MenuSection.displayName = 'MenuSection'

// ── MenuSeparator ─────────────────────────────────────────────────────────────

export const MenuSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn('my-1 border-t border-ps-border-default', className)} />
)
MenuSeparator.displayName = 'MenuSeparator'

// ── Menu ──────────────────────────────────────────────────────────────────────

export interface MenuProps<T extends object = object>
  extends Omit<AriaMenuProps<T>, 'className'> {
  trigger: React.ReactElement
  placement?: PopoverProps['placement']
  className?: string
}

export function Menu<T extends object>({
  trigger,
  placement = 'bottom start',
  className,
  ...props
}: MenuProps<T>) {
  return (
    <MenuTrigger>
      {trigger}
      <Popover
        placement={placement}
        className={cn(
          'z-50 min-w-[160px] origin-top-left rounded-ps-md',
          'bg-ps-bg-default border border-ps-border-default shadow-ps-md',
          'p-1',
          'data-[entering]:animate-in data-[entering]:fade-in data-[entering]:zoom-in-95',
          'data-[exiting]:animate-out data-[exiting]:fade-out data-[exiting]:zoom-out-95',
        )}
      >
        <AriaMenu className={cn('outline-none', className)} {...props} />
      </Popover>
    </MenuTrigger>
  )
}
Menu.displayName = 'Menu'
