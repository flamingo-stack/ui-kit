"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '../../utils'
import { HeaderConfig, NavigationItem } from '../../types/navigation'
import { Button } from '../ui/button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export interface HeaderProps {
  config: HeaderConfig
}

export function Header({ config }: HeaderProps) {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const dropdownRefs = useRef<Record<string, HTMLElement | null>>({})
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setLastScrollY(prevScrollY => {
        // Determine if we should show or hide the header
        const shouldHide = currentScrollY > prevScrollY && currentScrollY > 50
        const shouldShow = currentScrollY < prevScrollY || currentScrollY <= 10
        
        if (shouldHide) {
          setShow(false)
        } else if (shouldShow) {
          setShow(true)
        }
        
        return currentScrollY
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Clean up dropdowns on unmount to prevent focus errors
  useEffect(() => {
    return () => {
      setOpenDropdowns({})
    }
  }, [])

  const renderNavigationItem = (item: NavigationItem) => {
    // If custom element provided, use it
    if (item.element) {
      return <React.Fragment key={item.id}>{item.element}</React.Fragment>
    }

    // If it has children, render as dropdown
    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu.Root 
          key={item.id}
          open={openDropdowns[item.id] || false}
          onOpenChange={(open) => {
            // Safely update state to prevent focus issues
            try {
              setOpenDropdowns(prev => ({ ...prev, [item.id]: open }))
            } catch (error) {
              console.warn('Dropdown state update error:', error)
            }
          }}
          modal={false}
        >
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              leftIcon={item.icon}
              rightIcon={item.badge}
              className={cn(
                "h-10 px-3 py-2",
                "font-['DM_Sans'] font-bold text-[16px] leading-none tracking-[-0.32px]",
                "hover:bg-ods-bg-hover focus:bg-ods-bg-hover",
                "whitespace-nowrap",
                item.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
              )}
            >
              {item.label}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className={cn(
                "bg-ods-card border border-ods-border rounded-lg shadow-xl z-[9999]",
                item.id === 'community' ? "min-w-[240px]" : "min-w-[220px]"
              )}
              onCloseAutoFocus={(e) => {
                // Prevent focus errors when closing
                try {
                  e.preventDefault()
                } catch (error) {
                  console.warn('Dropdown close focus error:', error)
                }
              }}
              onEscapeKeyDown={(e) => {
                // Safely handle escape key
                try {
                  e.preventDefault()
                } catch (error) {
                  console.warn('Dropdown escape key error:', error)
                }
              }}
              onPointerDownOutside={(e) => {
                // Prevent focus issues on outside clicks
                try {
                  const target = e.target as HTMLElement
                  if (!target) return
                  // Allow the dropdown to close naturally
                } catch (error) {
                  console.warn('Dropdown outside click error:', error)
                }
              }}>
            <div className="p-2">
              {item.children.map((child, index) => (
                <DropdownMenu.Item 
                  key={child.id} 
                  asChild
                  onSelect={(e) => {
                    try {
                      if (child.href && !child.onClick) {
                        // Let the link handle navigation
                        e.preventDefault()
                      }
                    } catch (error) {
                      console.warn('Dropdown item select error:', error)
                    }
                  }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={child.icon} 
                    rightIcon={child.badge}
                    href={child.href}
                    onClick={child.onClick}
                    className={cn(
                      "flex justify-start w-full",
                      index < item.children.length - 1 && "mb-1",
                      child.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
                    )}
                    {...(child.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {child.label}
                  </Button>
                </DropdownMenu.Item>
              ))}
            </div>
            {item.dropdownContent && (
              <>
                <DropdownMenu.Separator className="h-px my-2 mx-2 bg-ods-border" />
                <div className="px-2 pb-2">
                  {item.dropdownContent}
                </div>
              </>
            )}
          </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )
    }

    // Regular navigation item
    if (item.href) {
      return (
        <Button
          key={item.id}
          variant="ghost"
          href={item.href}
          leftIcon={item.icon}
          rightIcon={item.badge}
          className={cn(
            "h-10 px-3 py-2",
            "font-['DM_Sans'] font-bold text-[16px] leading-none tracking-[-0.32px]",
            "hover:bg-ods-bg-hover focus:bg-ods-bg-hover",
            "whitespace-nowrap",
            item.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
          )}
        >
          {item.label}
        </Button>
      )
    }

    // Button with onClick
    return (
      <Button
        key={item.id}
        variant="ghost"
        onClick={item.onClick}
        leftIcon={item.icon}
        rightIcon={item.badge}
        className={cn(
          "h-10 px-3 py-2",
          "font-['DM_Sans'] font-bold text-[16px] leading-none tracking-[-0.32px]",
          "hover:bg-ods-bg-hover focus:bg-ods-bg-hover",
          "whitespace-nowrap",
          item.isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'
        )}
      >
        {item.label}
      </Button>
    )
  }
  
  
  return (
    <div 
      className={cn(
        "sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out"
      )}
      style={{
        transform: !show ? 'translateY(-100%)' : 'translateY(0)'
      }}
    >
      <header 
        className={cn(
          "w-full flex items-center justify-between", 
          "bg-ods-card border-b border-ods-border backdrop-blur-sm",
          "px-6 py-3",
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
        
        <Link href={config.logo.href} className="transition-opacity duration-200 hover:opacity-80">
          {config.logo.element}
        </Link>
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
          {config.navigation.items.map(renderNavigationItem)}
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
                config.mobile.onToggle?.()
              }}
              aria-label={config.mobile.isOpen ? "Close menu" : "Open menu"}
            >
              {config.mobile.menuIcon || <span>☰</span>}
            
            </Button>
        )}
      </div>
    </header>
    </div>
  )
}