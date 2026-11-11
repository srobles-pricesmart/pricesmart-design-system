import React from 'react'
import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
  OverlayArrow,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: React.ReactNode
  placement?: TooltipPlacement
  delay?: number
  children: React.ReactElement
  className?: string
}

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 500,
  children,
  className,
}: TooltipProps) => (
  <TooltipTrigger delay={delay}>
    {children}
    <AriaTooltip
      placement={placement}
      className={({ isEntering, isExiting }) =>
        cn(
          'z-50 rounded-ps-sm bg-ps-bg-inverse text-ps-fg-on-inverse text-ps-xs',
          'px-2.5 py-1.5 shadow-ps-md max-w-xs',
          'transition-opacity duration-150',
          isEntering && 'animate-in fade-in',
          isExiting  && 'animate-out fade-out',
          className,
        )
      }
    >
      {({ placement: p }) => (
        <>
          <OverlayArrow>
            <svg
              width={8}
              height={8}
              viewBox="0 0 8 8"
              className="fill-ps-bg-inverse"
              style={{
                transform: p === 'bottom' ? 'rotate(180deg)'
                  : p === 'left'   ? 'rotate(-90deg)'
                  : p === 'right'  ? 'rotate(90deg)'
                  : undefined,
              }}
            >
              <path d="M0 8 L4 0 L8 8" />
            </svg>
          </OverlayArrow>
          {content}
        </>
      )}
    </AriaTooltip>
  </TooltipTrigger>
)

Tooltip.displayName = 'Tooltip'
