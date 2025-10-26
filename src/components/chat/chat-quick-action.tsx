'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui'

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
          "bg-transparent border border-ods-border",
          "text-left text-ods-text-primary",
          "hover:bg-ods-bg-hover hover:border-ods-border",
          "active:bg-ods-bg-active active:scale-[0.98]",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ods-focus focus:ring-offset-2 focus:ring-offset-ods-bg",
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