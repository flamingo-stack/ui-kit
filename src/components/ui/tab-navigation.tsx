'use client'

import React from 'react'
import { Button } from './button'
import { cn } from '../../utils/cn'

export interface TabItem {
  id: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  component?: React.ComponentType<any>
  hasAlert?: boolean
  alertType?: 'warning' | 'error'
}

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  tabs: TabItem[]
  className?: string
}

export function TabNavigation({
  activeTab,
  onTabChange,
  tabs,
  className
}: TabNavigationProps) {
  return (
    <div className={cn("bg-ods-bg relative w-full h-14 border-b border-ods-border", className)}>
      <div className="flex gap-1 items-center justify-start h-full overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              variant="ghost"
              leftIcon={
                <div>
                  <tab.icon className={`h-6 w-6 ${isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'} transition-colors`} />
                  {tab.hasAlert && (
                    <div className={`
                      absolute -top-1 -right-1 w-2 h-2 rounded-full
                      ${tab.alertType === 'error' ? 'bg-ods-error' : 'bg-ods-accent'}
                    `} />
                  )}
                </div>
              }
              className={`
                flex gap-2 items-center justify-center p-4 relative shrink-0 h-14
                transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-b from-[rgba(255,192,8,0)] to-[rgba(255,192,8,0.1)]'
                  : 'hover:bg-ods-card/50'
                }
              `}
            >
              {/* Tab label */}
              <span className={`
                font-['DM_Sans'] font-medium text-[18px] leading-[24px] whitespace-nowrap
                ${isActive ? 'text-ods-text-primary' : 'text-ods-text-secondary'} transition-colors
              `}>
                {tab.label}
              </span>

              {/* Active tab indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-ods-accent" />
              )}
            </Button>
          )
        })}

        {/* Gradient overlay */}
        <div className="absolute right-0 top-0 w-10 h-14 bg-gradient-to-r from-transparent to-ods-bg pointer-events-none" />
      </div>
    </div>
  )
}

// Utility function to get tab by id
export const getTabById = (tabs: TabItem[], tabId: string): TabItem | undefined =>
  tabs.find(tab => tab.id === tabId)

// Utility function to get tab component
export const getTabComponent = (tabs: TabItem[], tabId: string): React.ComponentType<any> | null => {
  const tab = getTabById(tabs, tabId)
  return tab?.component || null
}