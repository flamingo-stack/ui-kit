import * as React from "react"
import { cn } from "../../utils/cn"

export interface ChatTypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const ChatTypingIndicator = React.forwardRef<HTMLDivElement, ChatTypingIndicatorProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-3 w-0.5',
      md: 'h-4 w-0.5',
      lg: 'h-5 w-1'
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-0.5", className)}
        {...props}
      >
        <span className="text-ods-text-secondary text-sm">Assistant is typing</span>
        <div className={cn(
          sizeClasses[size],
          "bg-ods-text-secondary rounded-full",
          "animate-pulse-cursor"
        )} />
      </div>
    )
  }
)

ChatTypingIndicator.displayName = "ChatTypingIndicator"

// Add the animation to the global styles or as a style tag
const pulseStyles = `
  @keyframes pulse-cursor {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
  .animate-pulse-cursor {
    animation: pulse-cursor 1.5s ease-in-out infinite;
  }
`

// Inject styles if not already present
if (typeof document !== 'undefined') {
  const styleId = 'chat-typing-indicator-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = pulseStyles
    document.head.appendChild(style)
  }
}

export { ChatTypingIndicator }