import * as React from "react"
import { cn } from "../../utils/cn"
import { Settings } from "lucide-react"
import { SquareAvatar } from "../ui/square-avatar"

export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-screen w-full flex-col",
          "bg-[#161616] text-white",
          "px-4 sm:px-6 lg:px-8 pt-10 pb-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ChatContainer.displayName = "ChatContainer"

// Chat Header with user info and settings
interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  userName?: string
  userTitle?: string
  userAvatar?: string
  onSettingsClick?: () => void
}

const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  ({ className, userName = 'Grace "Fae" Meadows', userTitle = "Your Personal Assistant", userAvatar, onSettingsClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto w-full max-w-3xl",
          "flex items-center justify-between gap-4 px-6 py-5",
          "rounded-2xl bg-[#212121] shadow-[0_18px_48px_rgba(0,0,0,0.45)]",
          "ring-1 ring-black/30",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <SquareAvatar
            src={userAvatar}
            alt={userName}
            fallback="F"
            size="md"
            variant="round"
            className="bg-gradient-to-br from-pink-400 to-pink-600"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">{userName}</span>
            <span className="text-sm text-white/70">{userTitle}</span>
          </div>
        </div>
        
        <button
          onClick={onSettingsClick}
          className="flex items-center gap-2 rounded-full bg-[#2B2B2B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#313131] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F357BB]/60"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>
    )
  }
)
ChatHeader.displayName = "ChatHeader"

// Content area wrapper - scrolling handled by children (ChatMessageList)
const ChatContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 flex flex-col min-h-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatContent.displayName = "ChatContent"

// Footer for input
const ChatFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full px-0 pb-0 pt-6 sm:px-0 flex-shrink-0",
          className
        )}
        {...props}
      >
        <div className="mx-auto w-full max-w-3xl">
          {children}
        </div>
      </div>
    )
  }
)
ChatFooter.displayName = "ChatFooter"

export { ChatContainer, ChatHeader, ChatContent, ChatFooter }