import React from 'react'
import { cn } from '../../utils'

interface BenefitCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  variant?: 'default' | 'dark'
  className?: string
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  variant = 'default',
  className = ''
}) => {
  const baseStyles = "flex gap-2 items-start justify-start relative"
  
  const variantStyles = {
    default: {
      container: "bg-ods-bg p-2 md:p-4",
      title: "font-body font-bold text-body-md md:text-body-lg text-ods-text-primary",
      description: "font-body font-medium text-body-sm md:text-body-md text-ods-text-secondary"
    },
    dark: {
      container: "bg-transparent p-0 shadow-[0px_48px_80px_0px_rgba(0,0,0,0.24)]",
      title: "font-mono font-semibold text-heading-4 leading-[40px] text-ods-text-primary tracking-[-0.64px]",
      description: "font-body font-medium text-body-lg leading-6 text-ods-text-tertiary"
    }
  }
  
  const styles = variantStyles[variant]
  
  return (
    <div className={cn(
      baseStyles,
      styles.container,
      className
    )}>
      {icon && (
        <div className="w-6 h-6 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h3 className={cn(
          "font-['DM_Sans'] font-bold text-[18px] leading-[24px] tracking-[-0.36px] text-white",
          styles.title
        )}>
          {title}
        </h3>
        <p className={cn(
          "font-['DM_Sans'] font-medium text-[18px] leading-[24px] text-[#888888]",
          styles.description
        )}>
          {description}
        </p>
      </div>
    </div>
  )
}

interface BenefitCardGridProps {
  children: React.ReactNode
  className?: string
}

export const BenefitCardGrid: React.FC<BenefitCardGridProps> = ({
  children,
  className = ''
}) => {
  const childrenArray = React.Children.toArray(children)
  
  return (
    <div className={cn(
      "bg-ods-card rounded-lg flex flex-col md:flex-row shadow-ods-card border border-ods-border overflow-hidden",
      className
    )}>
      {childrenArray.map((child, index) => {
        const isLastItem = index === childrenArray.length - 1
        const borderClass = isLastItem 
          ? 'border-b-0' 
          : 'border-b md:border-b-0 md:border-r border-ods-border'
        
        return React.cloneElement(child as React.ReactElement, {
          key: index
          ,
          className: borderClass
        })
      })}
    </div>
  )
}