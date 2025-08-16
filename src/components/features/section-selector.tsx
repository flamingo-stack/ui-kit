"use client"

import React from 'react'
import { cn } from '../../utils/cn'

export interface SectionItem {
  id: string
  title: string
  subtitle?: string
  description?: string
  number?: string
}

export interface SectionSelectorProps {
  sections: SectionItem[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
  disabled?: boolean
  className?: string
  buttonClassName?: string
  activeButtonClassName?: string
  layout?: 'vertical' | 'wrap'
  buttonWidth?: 'auto' | 'full' | 'responsive'
  minHeight?: string
  showDescription?: boolean
}

// Button component for consistency
const SectionButton: React.FC<{
  section: SectionItem
  isActive: boolean
  disabled: boolean
  onClick: () => void
  layout: 'vertical' | 'wrap'
  widthClasses: string
  buttonClassName?: string
  activeButtonClassName?: string
  minHeight?: string
  showDescription?: boolean
}> = ({
  section,
  isActive,
  disabled,
  onClick,
  layout,
  widthClasses,
  buttonClassName,
  activeButtonClassName,
  minHeight = layout === 'vertical' ? '96px' : '76px',
  showDescription = true
}) => {
  const baseButtonClasses = cn(
    'bg-ods-card border rounded-md shadow-ods-card',
    'transition-all duration-200 cursor-pointer text-left',
    'hover:bg-ods-card-hover',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    widthClasses,
    isActive
      ? cn('border-[var(--ods-open-yellow-base)]', activeButtonClassName)
      : 'border-ods-border',
    buttonClassName
  )

  const titleClasses = "font-['DM_Sans'] text-ods-text-primary"
  const subtitleClasses = "font-['DM_Sans'] text-ods-text-secondary"
  const numberClasses = "font-['DM_Sans'] font-bold text-[var(--ods-open-yellow-base)]"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseButtonClasses}
      style={{ minHeight }}
    >
      {layout === 'vertical' ? (
        // Vertical layout with optional number prefix
        <div className="p-6 flex gap-2 items-start">
          {section.number && (
            <span className={cn(numberClasses, 'text-lg tracking-[-0.36px] leading-[24px] shrink-0')}>
              {section.number}
            </span>
          )}
          <div className="flex-1">
            <p className={cn(titleClasses, 'font-medium text-lg leading-[24px]')}>
              {section.title}
            </p>
            {section.description && showDescription && (
              <p className={cn(subtitleClasses, 'text-sm mt-1 hidden xl:block')}>
                {section.description}
              </p>
            )}
          </div>
        </div>
      ) : (
        // Wrap layout with title and subtitle
        <div className="pl-4 pr-4 lg:pr-10 py-4 flex flex-col items-start justify-start h-full overflow-hidden">
          <div className={cn(titleClasses, 'font-bold text-[18px] leading-[24px] tracking-[-0.36px] truncate lg:whitespace-nowrap')}>
            {section.title}
          </div>
          {section.subtitle && (
            <div className={cn(subtitleClasses, 'font-medium text-[14px] leading-[20px] truncate lg:whitespace-nowrap')}>
              {section.subtitle}
            </div>
          )}
        </div>
      )}
    </button>
  )
}

export const SectionSelector: React.FC<SectionSelectorProps> = ({
  sections,
  activeSection,
  onSectionChange,
  disabled = false,
  className,
  buttonClassName,
  activeButtonClassName,
  layout = 'vertical',
  buttonWidth = 'auto',
  minHeight,
  showDescription = true
}) => {
  const containerClasses = cn(
    layout === 'wrap' ? 'flex flex-wrap gap-6' : 'flex flex-col gap-2',
    className
  )

  const getButtonWidthClasses = () => {
    switch (buttonWidth) {
      case 'full':
        return 'w-full'
      case 'responsive':
        return 'w-full sm:w-[calc(50%-12px)] lg:w-auto'
      default:
        return ''
    }
  }

  const widthClasses = getButtonWidthClasses()

  return (
    <div className={containerClasses}>
      {sections.map((section) => (
        <SectionButton
          key={section.id}
          section={section}
          isActive={activeSection === section.id}
          disabled={disabled}
          onClick={() => onSectionChange(section.id)}
          layout={layout}
          widthClasses={widthClasses}
          buttonClassName={buttonClassName}
          activeButtonClassName={activeButtonClassName}
          minHeight={minHeight}
          showDescription={showDescription}
        />
      ))}
    </div>
  )
}

export default SectionSelector