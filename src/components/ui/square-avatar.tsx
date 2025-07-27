import * as React from "react"
import { cn } from "../../utils/cn"

interface SquareAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const SquareAvatar = React.forwardRef<HTMLDivElement, SquareAvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    };

    return (
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-md",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {src ? (
          <img
            className="aspect-square h-full w-full object-cover"
            src={src}
            alt={alt}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-xs font-medium">
              {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}
      </div>
    )
  }
)
SquareAvatar.displayName = "SquareAvatar"

export { SquareAvatar }