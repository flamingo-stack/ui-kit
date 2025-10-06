import * as React from 'react'
import { cn } from '../../utils/cn'

export interface FleetIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export const FleetIcon = React.forwardRef<SVGSVGElement, FleetIconProps>(
  ({ size = 16, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        {...props}
      >
        <rect x="1.33" y="1.33" width="3.33" height="3.33" fill="currentColor" />
        <rect x="6.33" y="1.33" width="3.33" height="3.33" fill="currentColor" />
        <rect x="11.33" y="1.33" width="3.33" height="3.33" fill="currentColor" />
        <rect x="1.33" y="6.33" width="3.33" height="3.33" fill="currentColor" />
        <rect x="6.33" y="6.33" width="3.33" height="3.33" fill="currentColor" />
        <rect x="1.33" y="11.33" width="3.33" height="3.33" fill="currentColor" />
      </svg>
    )
  }
)