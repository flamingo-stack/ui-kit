import React from 'react'

/**
 * Base navigation item interface used across all navigation components
 */
export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: React.ReactNode | number | string
  isActive?: boolean
  children?: NavigationItem[]
  onClick?: () => void
  element?: React.ReactNode // For completely custom navigation items
  isExternal?: boolean // For external links that open in new tab
  type?: 'single' | 'dropdown' // Type of navigation item
  dropdownContent?: React.ReactNode // Additional content for dropdown (e.g., social icons)
  showDropdownDivider?: boolean // Whether to show divider above dropdown content
}

/**
 * Configuration for the header component
 */
export interface HeaderConfig {
  logo: {
    element: React.ReactNode
    href: string
  }
  navigation?: {
    items: NavigationItem[]
    position?: 'left' | 'center' | 'right'
  }
  actions?: {
    left?: React.ReactNode[]
    right?: React.ReactNode[]
  }
  mobile?: {
    enabled: boolean
    menuIcon?: React.ReactNode
    closeIcon?: React.ReactNode
    onToggle?: () => void
    isOpen?: boolean
  }
  className?: string
  style?: React.CSSProperties
  autoHide?: boolean
}

/**
 * Configuration for the mobile navigation panel
 */
export interface MobileNavConfig {
  sections: Array<{
    title?: string
    items: NavigationItem[]
  }>
  footer?: React.ReactNode
  className?: string
  onClose?: () => void
}

/**
 * Configuration for the sliding sidebar component
 */
export interface SlidingSidebarConfig {
  items: NavigationItem[]
  footer?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right'
  className?: string
}