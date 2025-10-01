import * as React from "react"
import { cn } from "../../utils/cn"
import { ChevronRight } from "lucide-react"

export interface ChatQuickActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onAction?: (text: string) => void
}

const ChatQuickAction = React.forwardRef<HTMLButtonElement, ChatQuickActionProps>(
  ({ className, text, onAction, onClick, ...props }, ref) => {
    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (onAction) {
        onAction(text)
      }
      if (onClick) {
        onClick(e)
      }
    }, [text, onAction, onClick])
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between gap-3 w-full",
          "px-4 py-3 rounded-lg",
          "bg-ods-bg-card border border-ods-border-primary",
          "text-left text-ods-text-primary",
          "hover:bg-ods-bg-hover hover:border-ods-border-hover",
          "active:bg-ods-bg-active active:scale-[0.98]",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ods-accent-primary focus:ring-offset-2 focus:ring-offset-ods-bg-primary",
          className
        )}
        {...props}
      >
        <span className="text-sm font-medium">{text}</span>
        <ChevronRight className="h-4 w-4 text-ods-text-secondary flex-shrink-0" />
      </button>
    )
  }
)

ChatQuickAction.displayName = "ChatQuickAction"

export { ChatQuickAction }