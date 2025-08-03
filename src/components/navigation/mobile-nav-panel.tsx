"use client"

import React, { useEffect, useRef } from 'react'
import { cn } from '../../utils'
import { MobileNavConfig, NavigationItem } from '../../types/navigation'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export interface MobileNavPanelProps {
  isOpen: boolean
  config: MobileNavConfig
}

export function MobileNavPanel({ isOpen, config }: MobileNavPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        config.onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, config])

  if (!isOpen) return null

  const renderNavigationItem = (item: NavigationItem) => {
    if (item.element) {
      return <div key={item.id}>{item.element}</div>
    }

    const handleClick = () => {
      if (item.onClick) {
        item.onClick()
      }
      config.onClose?.()
    }

    if (item.href) {
      return (
        <Button
          key={item.id}
          variant="ghost"
          href={item.href}
          onClick={handleClick}
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
        onClick={handleClick}
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
      {/* Backdrop with super high z-index */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 99998 }}
        onClick={config.onClose}
      />

      {/* Panel with even higher z-index */}
      <div
        ref={panelRef}
        className={cn(
          "fixed bg-ods-card shadow-2xl",
          "flex flex-col"
        )}
        style={{
          zIndex: 99999,
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '320px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-in-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ods-border">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={config.onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Scrollable content */}
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