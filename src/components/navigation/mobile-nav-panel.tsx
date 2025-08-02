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

  if (!isOpen) {
    return null
  }

  const renderNavigationItem = (item: NavigationItem) => {
    // If custom element provided, render it
    if (item.element) {
      return <div key={item.id}>{item.element}</div>
    }

    if (item.href) {
      return (
        <Button
          key={item.id}
          variant="ghost"
          href={item.href}
          onClick={config.onClose}
          leftIcon={item.icon}
          rightIcon={item.badge}
          className={cn(
            "h-12 px-4 w-full justify-start",
            "hover:bg-ods-bg-hover",
            item.isActive ? "bg-ods-accent/10 text-ods-text-primary font-semibold" : "text-ods-text-primary"
          )}
        >
          {item.label}
        </Button>
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
          "hover:bg-ods-bg-hover",
          item.isActive ? "bg-ods-accent/10 text-ods-text-primary font-semibold" : "text-ods-text-primary"
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={config.onClose}
      />

      {/* Navigation Panel */}
      <div
        className={cn(
          "fixed z-[9999] bg-ods-card border border-ods-border rounded-lg shadow-xl",
          "right-4 top-20 w-80 max-w-[calc(100vw-2rem)]",
          "max-h-[calc(100vh-6rem)]",
          "flex flex-col"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-end p-2 border-b border-ods-border">
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
        <div className="flex-1 overflow-y-auto px-2 py-2">
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

        {/* Footer */}
        {config.footer && (
          <div className="border-t border-ods-border p-4">
            {config.footer}
          </div>
        )}
      </div>
    </>
  )
}