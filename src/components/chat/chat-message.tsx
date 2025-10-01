import * as React from "react"
import { cn } from "../../utils/cn"
import { SquareAvatar } from "../ui/square-avatar"
import { ChatTypingIndicator } from "./chat-typing-indicator"

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant' | 'error'
  content: string
  name?: string
  avatar?: string | null
  isTyping?: boolean
  timestamp?: Date
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, role, content, name, avatar, isTyping = false, timestamp, ...props }, ref) => {
    const isUser = role === 'user'
    const isError = role === 'error'
    
    // Generate appropriate fallback and styling based on role
    const getAvatarProps = () => {
      const displayName = name || (isUser ? "User" : "Fae")
      const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase()
      
      // Always return avatar props to reserve space, but use transparent for users
      return {
        src: avatar || undefined,
        alt: `${displayName} avatar`,
        fallback: initials,
        size: "sm" as const,
        variant: "round" as const,
        className: cn(
          "flex-shrink-0 mt-1",
          isUser 
            ? "invisible" // Reserve space but make invisible for users
            : "bg-gradient-to-br from-pink-400 to-pink-600"
        )
      }
    }
    
    const avatarProps = getAvatarProps()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-start gap-4 py-3",
          className
        )}
        {...props}
      >
        {/* Avatar - always rendered to reserve space, invisible for users */}
        <SquareAvatar
          {...avatarProps}
          className={cn(avatarProps.className, "mt-0.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]")}
        />
        
        {/* Message Content */}
        <div className="flex flex-1 flex-col gap-1">
          {/* Name and Timestamp Row */}
          <div className="flex items-center justify-between pr-2">
            <span className={cn(
              "text-sm font-semibold",
              isUser ? "text-ods-text-secondary" : "text-[#F357BB]"
            )}>
              {name || (isUser ? "User" : "Fae")}:
            </span>
            {timestamp && (
              <span className="text-xs text-white/40">
                {timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </span>
            )}
          </div>
          
          {/* Message text */}
          <div className="text-sm leading-relaxed text-white/90">
            {isTyping ? (
              <ChatTypingIndicator />
            ) : isError ? (
              <span className="text-[#F36666]">{content}</span>
            ) : (
              <span className="whitespace-pre-wrap">{content}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

ChatMessage.displayName = "ChatMessage"

export { ChatMessage }