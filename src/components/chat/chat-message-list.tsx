"use client"

import { useRef, useCallback, useLayoutEffect, useEffect, useImperativeHandle, forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../utils/cn"
import { ChatMessage } from "./chat-message"

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'error'
  name?: string
  content: string
  timestamp: Date
  avatar?: string | null
}

export interface ChatMessageListProps extends HTMLAttributes<HTMLDivElement> {
  messages: Message[]
  isTyping?: boolean
  autoScroll?: boolean
  showAvatars?: boolean
}

const ChatMessageList = forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, messages, isTyping = false, autoScroll = true, showAvatars = true, ...props }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const isPinnedToBottomRef = useRef(true)

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
      if (!scrollRef.current) return
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior })
    }, [])

    useLayoutEffect(() => {
      scrollToBottom('auto')
    }, [scrollToBottom])

    useEffect(() => {
      const node = scrollRef.current
      if (!node) return

      const handleScroll = () => {
        const distanceFromBottom = node.scrollHeight - (node.scrollTop + node.clientHeight)
        isPinnedToBottomRef.current = distanceFromBottom <= 24
      }

      handleScroll()
      node.addEventListener('scroll', handleScroll, { passive: true })
      return () => node.removeEventListener('scroll', handleScroll)
    }, [])

    useLayoutEffect(() => {
      if (!autoScroll) return

      const lastMessage = messages[messages.length - 1]
      if (!lastMessage) return

      const shouldForceScroll = lastMessage.role === 'user' || isPinnedToBottomRef.current
      if (!shouldForceScroll) return

      const behavior: ScrollBehavior = lastMessage.role === 'user' ? 'smooth' : 'auto'
      scrollToBottom(behavior)
    }, [autoScroll, scrollToBottom, messages[messages.length - 1]?.id, messages[messages.length - 1]?.content])

    useEffect(() => {
      if (!autoScroll) return
      if (!isPinnedToBottomRef.current) return
      scrollToBottom('smooth')
    }, [isTyping, scrollToBottom, autoScroll])

    useImperativeHandle(ref, () => scrollRef.current!)
    
    return (
      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollRef}
          className={cn(
            "flex h-full w-full flex-col overflow-y-auto overflow-x-hidden",
            "[scroll-behavior:smooth]",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20",
            className
          )}
          {...props}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-3 pt-8" style={{ minHeight: '100%' }}>
            <div className="flex-1" />
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name={message.name}
                content={message.content}
                timestamp={message.timestamp}
                isTyping={index === messages.length - 1 && isTyping && message.role === 'assistant'}
                avatar={showAvatars ? message.avatar : null}
                showAvatar={showAvatars}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

ChatMessageList.displayName = "ChatMessageList"

export { ChatMessageList }