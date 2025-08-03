"use client"

import * as React from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  useHover,
  safePolygon,
} from '@floating-ui/react'
import { cn } from "../../utils/cn"

interface FloatingTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  delayDuration?: number
}

// Parse colored text markup like [YELLOW]text[/YELLOW] into JSX
function parseColoredText(text: string): React.ReactNode {
  if (typeof text !== 'string') return text;

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  
  // Regex to match [COLOR]text[/COLOR] patterns
  const colorRegex = /\[([A-Z]+)\](.*?)\[\/\1\]/g
  let match
  let keyIndex = 0

  while ((match = colorRegex.exec(text)) !== null) {
    // Add text before the colored part
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index)
      parts.push(<span key={`text-${keyIndex++}`}>{beforeText}</span>)
    }
    
    // Add colored text
    const color = match[1].toLowerCase()
    const coloredText = match[2]
    
    // Map colors to CSS classes
    const colorClass = color === 'yellow' ? 'text-[#FFC008]' : 
                      color === 'green' ? 'text-green-400' :
                      color === 'red' ? 'text-red-400' :
                      color === 'blue' ? 'text-blue-400' :
                      'text-[#FFC008]' // Default to yellow
    
    parts.push(
      <span key={`color-${keyIndex++}`} className={cn("font-semibold", colorClass)} style={{ color: color === 'yellow' ? '#FFC008' : undefined }}>
        {coloredText}
      </span>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex)
    parts.push(<span key={`text-${keyIndex++}`}>{remainingText}</span>)
  }
  
  return parts.length > 0 ? <>{parts}</> : text
}

export function FloatingTooltip({ 
  content, 
  children, 
  side = "right", 
  className,
  delayDuration = 0 
}: FloatingTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: side,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: "start",
        crossAxis: false,
        padding: 8,
      }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {
    move: false,
    delay: { open: delayDuration, close: 0 },
    handleClose: safePolygon(),
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ])

  // Parse content if it's a string with color markup
  const parsedContent = React.useMemo(() => {
    if (typeof content === 'string') {
      return parseColoredText(content)
    }
    return content
  }, [content])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: 2147483647,
            }}
            {...getFloatingProps()}
            className={cn(
              "max-w-xs overflow-hidden rounded-md bg-[#1A1A1A] border border-[#333333] px-3 py-2 text-sm text-[#FAFAFA] shadow-lg whitespace-pre-line",
              className
            )}
          >
            {parsedContent}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}