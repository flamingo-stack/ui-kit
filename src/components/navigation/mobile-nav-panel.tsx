"use client"

import React, { useEffect } from 'react'
import { cn } from '../../utils'
import { MobileNavConfig, NavigationItem } from '../../types/navigation'
import { Button } from '../ui/button'

export interface MobileNavPanelProps {
  isOpen: boolean
  config: MobileNavConfig
}

export function MobileNavPanel({ isOpen, config }: MobileNavPanelProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const renderNavigationItem = (item: NavigationItem) => {
    // If custom element provided, render it
    if (item.element) {
      return <div key={item.id}>{item.element}</div>
    }

    if (item.href) {
      return (
        <a
          key={item.id}
          href={item.href}
          onClick={config.onClose}
          className={cn(
            "flex items-center justify-start h-12 px-4 bg-transparent border-none",
            "text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
            item.isActive && "bg-ods-bg-hover"
          )}
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {item.badge !== undefined && (
            <span className="ml-auto">{item.badge}</span>
          )}
        </a>
      )
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        onClick={() => {
          item.onClick?.()
          config.onClose?.()
        }}
        leftIcon={item.icon}
        className={cn(
          "h-12 px-4 w-full justify-start",
          "text-ods-text-primary hover:bg-ods-bg-hover",
          item.isActive && "bg-ods-bg-hover"
        )}
      >
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge !== undefined && (
          <span className="ml-auto">{item.badge}</span>
        )}
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop - closes nav when clicked outside */}
      <div
        className="fixed inset-0 z-[9999998] bg-black/50"
        onClick={config.onClose}
      />

      {/* Navigation Panel */}
      <div
        className={cn(
          "fixed z-[9999999] bg-ods-card border border-ods-border rounded-lg shadow-xl",
          // Responsive positioning and sizing
          "right-2 left-2 sm:right-4 sm:left-auto sm:w-96 sm:max-w-[calc(100vw-2rem)]",
          "md:right-6 md:w-[400px] md:max-w-[calc(100vw-3rem)]",
          // Height constraints with proper mobile spacing
          "top-[72px] max-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-88px)]",
          "flex flex-col",
          config.className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside nav
      >
        {/* Header with close button - fixed at top */}
        <div className="flex justify-end p-2 border-b border-ods-border flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close menu"
            onClick={config.onClose}
            className="p-2 h-8 w-8"
          >
            <svg className="w-4 h-4 text-ods-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
          <div className="flex flex-col space-y-1">
            {config.sections.map((section, index) => (
              <div key={index}>
                {section.title && (
                  <div className="px-4 pt-4 pb-1 text-xs font-semibold text-ods-text-secondary uppercase tracking-wide">
                    {section.title}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {section.items.map(renderNavigationItem)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - fixed at bottom */}
        {config.footer && (
          <div className="border-t border-ods-border p-4 flex-shrink-0">
            {config.footer}
          </div>
        )}
      </div>
    </>
  )
}