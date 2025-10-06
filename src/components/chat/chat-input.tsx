import * as React from "react"
import { cn } from "../../utils/cn"
import { Send } from "lucide-react"

export interface ChatInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSend?: (message: string) => void
  sending?: boolean
  reserveAvatarOffset?: boolean
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, onSend, sending = false, placeholder = "Enter your request here...", reserveAvatarOffset = true, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    React.useImperativeHandle(ref, () => textareaRef.current!)
    
    const handleSubmit = React.useCallback(() => {
      const message = value.trim()
      if (message && !sending && onSend) {
        onSend(message)
        setValue('')

        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }
    }, [value, sending, onSend])
    
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }, [handleSubmit])
    
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [])
    
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-3xl items-end gap-6",
          reserveAvatarOffset ? "grid grid-cols-[32px_1fr]" : "grid grid-cols-[1fr]",
          "flex-shrink-0",
          className
        )}
      >
        {reserveAvatarOffset && <div className="invisible h-8 w-8" aria-hidden />}
        <div
          className={cn(
            "relative flex items-center gap-2",
            "rounded-lg bg-ods-bg-card border border-ods-border",
            "px-3 py-1.5",
            "transition-colors",
            "bg-ods-bg-card border border-[#3a3a3a]",
            "text-left text-ods-text-primary",
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={sending}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent px-0",
              "text-[18px] leading-[20px] font-['DM_Sans'] text-ods-primary placeholder:text-ods-secondary",
              "min-h-[20px] max-h-[160px] focus:outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            {...props}
          />
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={sending || !value.trim()}
            className={cn(
              "rounded-md p-1.5 text-ods-text-secondary transition-all",
              sending || !value.trim() ? "cursor-not-allowed opacity-40" : "hover:text-ods-text-primary active:scale-95",
              "focus:outline-none"
            )}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }
)

ChatInput.displayName = "ChatInput"

export { ChatInput }