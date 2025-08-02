"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '../../utils'
import { HeaderConfig } from '../../types/navigation'
import { Button } from '../ui/button'

export interface HeaderProps {
  config: HeaderConfig
}

export function Header({ config }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY <= 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: { isOpen: !isMobileMenuOpen } }))
  }
  
  return (
    <div className={cn("sticky top-0 z-40 w-full", !isVisible && "opacity-0 pointer-events-none")}>
      <header 
        className={cn(
          "w-full flex items-center justify-between", 
          "bg-ods-card border-b border-ods-border backdrop-blur-sm",
          "px-6 py-3",
          "transition-opacity duration-300 ease-in-out",
          config.className
        )}
      >
      {/* Left: Logo */}
      <div className="flex items-center justify-start flex-shrink-0">
        {config.actions?.left && (
          <div className="flex items-center gap-2 mr-4">
            {config.actions.left}
          </div>
        )}
        
        <a href={config.logo.href} className="transition-opacity duration-200 hover:opacity-80">
          {config.logo.element}
        </a>
      </div>

      {/* Center: Navigation */}
      {config.navigation && config.navigation.items.length > 0 && (
        <nav 
          className={cn(
            "hidden md:flex items-center gap-2",
            config.navigation.position === 'center' && "absolute left-1/2 transform -translate-x-1/2",
            config.navigation.position === 'right' && "ml-auto mr-4"
          )}
          role="navigation" 
          aria-label="Main navigation"
        >
          {config.navigation.items.map((item) => (
            <React.Fragment key={item.id}>
              {item.element || (
                item.href ? (
                  <a href={item.href} className="focus:outline-none">
                    <Button
                      variant="ghost"
                      leftIcon={item.icon}
                      className={cn(
                        "h-10 px-3 py-2",
                        "font-['DM_Sans'] font-bold text-[16px] leading-none tracking-[-0.32px]",
                        "hover:bg-ods-bg-hover focus:bg-ods-bg-hover",
                        "whitespace-nowrap",
                        item.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
                      )}
                    >
                      {item.label}
                      {item.badge !== undefined && (
                        <span className="ml-2">{item.badge}</span>
                      )}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={item.onClick}
                    leftIcon={item.icon}
                    className={cn(
                      "h-10 px-3 py-2",
                      "font-['DM_Sans'] font-bold text-[16px] leading-none tracking-[-0.32px]",
                      "hover:bg-ods-bg-hover focus:bg-ods-bg-hover",
                      "whitespace-nowrap",
                      item.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
                    )}
                  >
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="ml-2">{item.badge}</span>
                    )}
                  </Button>
                )
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-4 flex-shrink-0">
        {/* Desktop Actions */}
        {config.actions?.right && (
          <div className="hidden md:flex items-center gap-4">
            {config.actions.right}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {config.mobile?.enabled && (
          <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 h-10 w-10 flex items-center justify-center"
              onClick={() => {
                handleMobileMenuToggle()
                config.mobile.onMenuToggle?.(!isMobileMenuOpen)
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen 
                ? (config.mobile.closeIcon || <span>✕</span>)
                : (config.mobile.menuIcon || <span>☰</span>)
              }
            </Button>
        )}
      </div>
    </header>
    </div>
  )
}