import React from 'react'
import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  Label,
  type SliderProps as AriaSliderProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'

export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps extends Omit<AriaSliderProps<number | number[]>, 'className'> {
  label?: string
  description?: string
  showOutput?: boolean
  size?: SliderSize
  className?: string
}

const trackHeight: Record<SliderSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
}

const thumbSize: Record<SliderSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ label, description, showOutput = true, size = 'md', className, ...props }, ref) => (
    <AriaSlider
      ref={ref}
      className={cn('flex flex-col gap-2 w-full', className)}
      {...props}
    >
      {(label || showOutput) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label className="text-ps-sm font-medium text-ps-fg-default">{label}</Label>
          )}
          {showOutput && (
            <SliderOutput className="text-ps-sm text-ps-fg-muted" />
          )}
        </div>
      )}

      <SliderTrack
        className={cn(
          'relative w-full rounded-ps-full bg-ps-bg-muted cursor-pointer',
          'flex items-center',
          trackHeight[size],
        )}
      >
        {({ state }) => (
          <>
            <div
              className="absolute h-full rounded-ps-full bg-ps-brand-primary"
              style={{
                left: state.values.length > 1
                  ? `${state.getThumbPercent(0) * 100}%`
                  : '0%',
                width: state.values.length > 1
                  ? `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`
                  : `${state.getThumbPercent(0) * 100}%`,
              }}
            />
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                className={cn(
                  'rounded-full bg-white border-2 border-ps-brand-primary shadow-ps-xs',
                  'transition-colors',
                  'data-[focus-visible]:ring-[var(--ps-ring-width)] data-[focus-visible]:ring-[var(--ps-ring-color)] data-[focus-visible]:ring-offset-[var(--ps-ring-offset)]',
                  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                  thumbSize[size],
                )}
              />
            ))}
          </>
        )}
      </SliderTrack>

      {description && (
        <p className="text-ps-xs text-ps-fg-muted">{description}</p>
      )}
    </AriaSlider>
  ),
)

Slider.displayName = 'Slider'
