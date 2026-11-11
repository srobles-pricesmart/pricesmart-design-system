import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden bg-ps-avatar-bg select-none',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[0.5rem]',
        sm: 'h-8 w-8 text-ps-xs',
        md: 'h-10 w-10 text-ps-sm',
        lg: 'h-12 w-12 text-ps-md',
        xl: 'h-16 w-16 text-ps-lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

const statusColors = {
  online:  'bg-ps-status-success-fg',
  offline: 'bg-ps-fg-subtle',
  away:    'bg-ps-status-warning-fg',
  busy:    'bg-ps-status-danger-fg',
}

const statusSizes = {
  xs: 'h-1.5 w-1.5 ring-1',
  sm: 'h-2 w-2 ring-1',
  md: 'h-2.5 w-2.5 ring-2',
  lg: 'h-3 w-3 ring-2',
  xl: 'h-3.5 w-3.5 ring-2',
}

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  initials?: string
  status?: AvatarStatus
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', src, alt, initials, status, ...props }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        role={alt ? 'img' : undefined}
        aria-label={alt}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ''}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-semibold text-ps-avatar-fg leading-none" aria-hidden={!!alt}>
            {initials ? initials.slice(0, 2).toUpperCase() : '?'}
          </span>
        )}

        {status && (
          <span
            aria-label={status}
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-ps-bg-default',
              statusColors[status],
              statusSizes[size ?? 'md'],
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
