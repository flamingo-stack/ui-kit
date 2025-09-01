"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { cn } from '../../utils'
import { NavigationSidebarConfig, NavigationSidebarItem } from '../../types/navigation'
import { ChevronRightIcon, ChevronLeftIcon, OpenFrameLogo, OpenFrameText } from '../icons'

export interface NavigationSidebarProps {
  config: NavigationSidebarConfig
}

export function NavigationSidebar({ config }: NavigationSidebarProps) {
  const [minimized, setMinimized] = useState(config.minimized ?? false)
  const [showText, setShowText] = useState(!(config.minimized ?? false))

  // Handle text visibility with delay to prevent flickering
  useEffect(() => {
    if (minimized) {
      // Hide text immediately when minimizing
      setShowText(false)
    } else {
      // Show text after sidebar expansion animation completes
      const timer = setTimeout(() => {
        setShowText(true)
      }, 150) // Half of the 300ms animation duration for smoother transition
      
      return () => clearTimeout(timer)
    }
  }, [minimized])

  const handleToggleMinimized = useCallback(() => {
    const newMinimized = !minimized
    setMinimized(newMinimized)
    config.onToggleMinimized?.()
  }, [minimized, config])

  const handleItemClick = useCallback((item: NavigationSidebarItem) => {
    if (item.onClick) {
      item.onClick()
    } else if (item.path) {
      config.onNavigate?.(item.path)
    }
  }, [config])

  const renderNavigationItem = (item: NavigationSidebarItem) => {
    const isActive = item.isActive ?? false
    
    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={cn(
          "w-full flex items-center gap-2 p-4 transition-colors relative",
          "hover:bg-[#2a2a2a] text-white",
          isActive && "bg-[#2a2a2a]",
          minimized ? "justify-center" : "justify-start"
        )}
        title={minimized ? item.label : undefined}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc008]" />
        )}
        
        {/* Icon */}
        <div className="flex-shrink-0 w-6 h-6">
          {item.icon}
        </div>
        
        {/* Label with smooth opacity transition */}
        <span className={cn(
          "font-['DM_Sans'] font-medium text-[18px] leading-[24px] flex-1 text-left",
          "transition-all duration-200",
          showText ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        )}>
          {item.label}
        </span>
        
        {/* Badge with smooth opacity transition */}
        {item.badge && (
          <span className={cn(
            "text-sm text-[#888888] transition-all duration-200",
            showText ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
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

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[#212121] border-r border-[#3a3a3a] transition-all duration-300",
        minimized ? "w-14" : "w-56",
        config.className
      )}
    >
      {/* Header with logo */}
      <div className="flex items-center gap-2 p-4 h-14 border-b border-[#3a3a3a]">
        <div className="flex-shrink-0">
          <OpenFrameLogo className="w-6 h-6" upperPathColor='#FAFAFA' lowerPathColor='#FFC008'/>
        </div>
        <div className={cn(
          "flex-1 transition-all duration-200",
          showText ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        )}>
          <OpenFrameText textColor='#FAFAFA'/>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-between py-4">
        {/* Primary navigation items */}
        <div className="flex flex-col">
          {primaryItems.map(renderNavigationItem)}
        </div>

        {/* Secondary navigation items */}
        {secondaryItems.length > 0 && (
          <div className="flex flex-col">
            {secondaryItems.map(renderNavigationItem)}
          </div>
        )}
      </div>

      {/* Footer with minimize/expand toggle */}
      <div className="border-t border-[#3a3a3a]">
        <button
          onClick={handleToggleMinimized}
          className={cn(
            "w-full flex items-center gap-2 p-4 transition-colors",
            "hover:bg-[#2a2a2a] text-white",
            minimized ? "justify-center" : "justify-start"
          )}
          title={minimized ? "Expand Menu" : "Hide Menu"}
        >
          {minimized ? (
            <ChevronRightIcon className="w-6 h-6" />
          ) : (
            <>
              <ChevronLeftIcon className="w-6 h-6" />
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
      
      {/* Custom footer content */}
      {config.footer && (
        <div className="border-t border-[#3a3a3a] p-4">
          {config.footer}
        </div>
      )}
    </aside>
  )
}