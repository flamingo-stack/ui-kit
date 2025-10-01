import * as React from "react"
import { cn } from "../../utils/cn"
import { Send } from "lucide-react"

export interface ChatInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSend?: (message: string) => void
  sending?: boolean
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, onSend, sending = false, placeholder = "Enter your request here...", ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    React.useImperativeHandle(ref, () => textareaRef.current!)
    
    const handleSubmit = React.useCallback(() => {
      const message = value.trim()
      if (message && !sending && onSend) {
        onSend(message)
        setValue('')
        // Reset textarea height
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
      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [])
    
    return (
      <div
        className={cn(
          "mx-auto grid w-full max-w-3xl grid-cols-[32px_1fr] items-end gap-4",
          className
        )}
      >
        <div className="invisible h-8 w-8" aria-hidden />
        <div
          className={cn(
            "relative flex items-end gap-3",
            "rounded-2xl bg-[#212121] px-5 py-4",
            "border border-white/5 focus-within:border-white/15",
            "shadow-[0_18px_48px_rgba(0,0,0,0.45)]",
            "transition-colors"
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
              "text-sm text-white placeholder:text-white/40",
              "min-h-[32px] max-h-[160px] focus:outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            {...props}
          />
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={sending || !value.trim()}
            className={cn(
              "rounded-full bg-[#2B2B2B] p-2 text-white transition-all",
              sending || !value.trim()
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-[#343434] active:scale-95",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F357BB]/60"
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