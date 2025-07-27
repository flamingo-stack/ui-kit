import * as React from "react"
import { Button } from "./button"
import { cn } from "../../utils/cn"

interface JoinWaitlistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const JoinWaitlistButton = React.forwardRef<HTMLButtonElement, JoinWaitlistButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    return (
      <Button
        className={cn(className)}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        {children || "Join Waitlist"}
      </Button>
    )
  }
)
JoinWaitlistButton.displayName = "JoinWaitlistButton"

export { JoinWaitlistButton }