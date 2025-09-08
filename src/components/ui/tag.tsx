import React from "react"
import { cn } from "../../utils/cn"

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Tag({ 
  label, 
  variant = 'default',
  size = 'md',
  className,
  ...props 
}: TagProps) {
  const sizeStyles = {
    sm: 'h-6 px-1.5 text-[12px]',
    md: 'h-8 px-2 text-[14px]',
    lg: 'h-10 px-3 text-[16px]'
  }

  const variantStyles = {
    default: 'bg-[#212121] border border-[#3a3a3a] text-[#fafafa]',
    outline: 'bg-transparent border border-[#3a3a3a] text-[#fafafa]',
    secondary: 'bg-[#2a2a2a] border border-[#3a3a3a] text-[#888888]'
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-[6px]",
        "font-['Azeret_Mono'] font-medium leading-[20px] tracking-[-0.28px] uppercase",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span>{label}</span>
    </div>
  )
}