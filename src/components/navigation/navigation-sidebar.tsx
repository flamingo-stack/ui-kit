"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { cn } from '../../utils'
import { NavigationSidebarConfig, NavigationSidebarItem } from '../../types/navigation'
import { DoubleChevronIcon, OpenFrameLogo, OpenFrameText } from '../icons'

export interface NavigationSidebarProps {
  config: NavigationSidebarConfig
}

export function NavigationSidebar({ config }: NavigationSidebarProps) {
  // Check if we're on mobile and set initial state accordingly
  const [isMobile, setIsMobile] = useState(false)
  const [minimized, setMinimized] = useState(config.minimized ?? false)
  const [showText, setShowText] = useState(!(config.minimized ?? false))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 // md breakpoint
      setIsMobile(mobile)
      
      // On mobile, always start minimized unless explicitly set in config
      if (mobile && config.minimized === undefined) {
        setMinimized(true)
        setShowText(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [config.minimized])

  // Handle text visibility with delay to prevent flickering
  useEffect(() => {
    if (minimized && !mobileMenuOpen) {
      // Hide text immediately when minimizing
      setShowText(false)
    } else if (!minimized || mobileMenuOpen) {
      // Show text after sidebar expansion animation completes
      const timer = setTimeout(() => {
        setShowText(true)
      }, 150) // Half of the 300ms animation duration for smoother transition
      
      return () => clearTimeout(timer)
    }
  }, [minimized, mobileMenuOpen])

  const handleToggleMinimized = useCallback(() => {
    if (isMobile) {
      // On mobile, toggle the overlay menu
      setMobileMenuOpen(!mobileMenuOpen)
    } else {
      // On desktop, toggle minimized state
      const newMinimized = !minimized
      setMinimized(newMinimized)
    }
    config.onToggleMinimized?.()
  }, [minimized, mobileMenuOpen, isMobile, config])

  const handleItemClick = useCallback((item: NavigationSidebarItem) => {
    // Close mobile menu after clicking an item
    if (isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
    
    if (item.onClick) {
      item.onClick()
    } else if (item.path) {
      config.onNavigate?.(item.path)
    }
  }, [config, isMobile, mobileMenuOpen])

  const renderNavigationItem = (item: NavigationSidebarItem, inOverlay = false) => {
    const isActive = item.isActive ?? false
    const isMinimized = isMobile && !inOverlay ? true : minimized
    const showLabels = inOverlay || showText
    
    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={cn(
          "w-full flex items-center gap-2 p-4 transition-all duration-200 relative",
          // Default state
          !isActive && "hover:bg-[#2a2a2a] text-white",
          // Active state with yellow background and text
          isActive && "bg-[rgba(255,192,8,0.1)] text-[#ffc008] hover:bg-[rgba(255,192,8,0.15)] [&_svg]:text-[#ffc008] [&_svg]:fill-[#ffc008]",
          isMinimized && !inOverlay ? "justify-center" : "justify-start"
        )}
        title={isMinimized && !inOverlay ? item.label : undefined}
      >
        {/* Active indicator - yellow left border */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc008]" />
        )}
        
        {/* Icon - inherits text color (yellow when active) */}
        <div className={cn(
          "flex-shrink-0 w-6 h-6",
          "transition-colors duration-200",
          isActive ? "text-[#ffc008]" : "text-[#888888]"
        )}>
          {item.icon}
        </div>
        
        {/* Label with smooth opacity transition */}
        <span className={cn(
          "font-['DM_Sans'] font-medium text-[18px] leading-[24px] flex-1 text-left",
          "transition-all duration-200",
          showLabels ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        )}>
          {item.label}
        </span>
        
        {/* Badge with smooth opacity transition */}
        {item.badge && (
          <span className={cn(
            "text-sm transition-all duration-200",
            isActive ? "text-[#ffc008]" : "text-[#888888]",
            showLabels ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          )}>
            {item.badge}
          </span>
        )}
      </button>
    )
  }

  // Separate items by section
  const primaryItems = config.items.filter(item => item.section !== 'secondary')
  const secondaryItems = config.items.filter(item => item.section === 'secondary')

  const sidebarContent = (inOverlay = false) => (
    <>
      {/* Header with logo */}
      <div className="flex items-center gap-2 p-4 h-14 border-b border-[#3a3a3a]">
        <div className="flex-shrink-0">
          <OpenFrameLogo className="w-6 h-6" upperPathColor='#FAFAFA' lowerPathColor='#FFC008'/>
        </div>
        <div className={cn(
          "flex-1 transition-all duration-200",
          (inOverlay || showText) ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        )}>
          <OpenFrameText textColor='#FAFAFA'/>
        </div>
        {/* Close button for mobile overlay */}
        {inOverlay && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-2 hover:bg-[#2a2a2a] rounded-md transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-between py-4">
        {/* Primary navigation items */}
        <div className="flex flex-col">
          {primaryItems.map(item => renderNavigationItem(item, inOverlay))}
        </div>

        {/* Secondary navigation items */}
        {secondaryItems.length > 0 && (
          <div className="flex flex-col">
            {secondaryItems.map(item => renderNavigationItem(item, inOverlay))}
          </div>
        )}
      </div>

      {/* Footer with minimize/expand toggle - only show on desktop or in overlay */}
      {(!isMobile || inOverlay) && (
        <div className="border-t border-[#3a3a3a]">
          <button
            onClick={inOverlay ? () => setMobileMenuOpen(false) : handleToggleMinimized}
            className={cn(
              "w-full flex items-center gap-2 p-4 transition-colors",
              "hover:bg-[#2a2a2a] text-white",
              (!inOverlay && minimized) ? "justify-center" : "justify-start"
            )}
            title={inOverlay ? "Close Menu" : (minimized ? "Expand Menu" : "Hide Menu")}
          >
            {inOverlay ? (
              <>
                <DoubleChevronIcon direction='left' className="w-6 h-6" />
                <span className="font-['DM_Sans'] font-medium text-[18px] leading-[24px]">
                  Close Menu
                </span>
              </>
            ) : minimized ? (
              <DoubleChevronIcon direction='right' className="w-6 h-6" />
            ) : (
              <>
                <DoubleChevronIcon direction='left' className="w-6 h-6" />
                <span className={cn(
                  "font-['DM_Sans'] font-medium text-[18px] leading-[24px]",
                  "transition-all duration-200",
                  showText ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  Hide Menu
                </span>
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Custom footer content */}
      {config.footer && (
        <div className="border-t border-[#3a3a3a] p-4">
          {config.footer}
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Main sidebar - always visible, minimized on mobile */}
      <aside
        className={cn(
          "flex flex-col h-full bg-[#212121] border-r border-[#3a3a3a] transition-all duration-300",
          isMobile ? "w-14" : (minimized ? "w-14" : "w-56"),
          config.className
        )}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile overlay menu */}
      {isMobile && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Overlay sidebar */}
          <aside
            className={cn(
              "fixed left-0 top-0 h-full w-64 bg-[#212121] border-r border-[#3a3a3a] z-50 md:hidden",
              "flex flex-col",
              "animate-in slide-in-from-left duration-300"
            )}
          >
            {sidebarContent(true)}
          </aside>
        </>
      )}
    </>
  )
}