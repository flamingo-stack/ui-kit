import React from 'react'
import { MoreHorizontal, Monitor } from 'lucide-react'
import { cn } from '../../utils/cn'
import { getOSIcon as getOSIconFromTypes } from '../../types/os.types'
import type { OSPlatformId } from '../../utils/os-platforms'

export interface Device {
  id?: string
  name: string
  type?: 'desktop' | 'laptop' | 'mobile' | 'tablet' | 'server'
  operatingSystem?: OSPlatformId | 'macos' | 'ios' | 'android'  // Support both OSPlatformId and legacy values
  organization?: string
  status?: 'active' | 'inactive' | 'offline' | 'warning' | 'error'
  lastSeen?: string | Date
  tags?: string[]
  // Additional device properties
  ipAddress?: string
  macAddress?: string
  version?: string
  location?: string
}

// Action button configuration
export interface ActionButton {
  label: string
  onClick?: () => void
  variant?: 'default' | 'outline' | 'secondary'
  visible?: boolean
}

export interface DeviceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  device: Device
  actions?: {
    moreButton?: {
      visible?: boolean
      onClick?: () => void
    }
    detailsButton?: {
      visible?: boolean
      label?: string
      onClick?: () => void
    }
    customActions?: ActionButton[]
  }
}

// Status badge
const StatusBadge = ({ status }: { status?: string }) => {
  const statusConfig = {
    active: {
      bg: 'bg-[#2e461f]',
      text: 'text-[#5ea62e]',
      label: 'ACTIVE'
    },
    inactive: {
      bg: 'bg-[#3a3a3a]',
      text: 'text-[#888888]',
      label: 'INACTIVE'
    },
    offline: {
      bg: 'bg-[#461f1f]',
      text: 'text-[#ea2e2e]',
      label: 'OFFLINE'
    },
    warning: {
      bg: 'bg-[#7f6004]',
      text: 'text-[#ffc008]',
      label: 'WARNING'
    },
    error: {
      bg: 'bg-[#461f1f]',
      text: 'text-[#ea2e2e]',
      label: 'ERROR'
    }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

  return (
    <div 
      className={cn(
        "flex items-center justify-center h-8 px-2 rounded-[6px]",
        config.bg
      )}
    >
      <span 
        className={cn(
          "font-['Azeret_Mono'] font-medium text-[14px] leading-[20px] tracking-[-0.28px] uppercase",
          config.text
        )}
      >
        {config.label}
      </span>
    </div>
  )
}

export function DeviceCard({
  device,
  actions = {
    moreButton: { visible: true },
    detailsButton: { visible: true, label: 'Details' }
  },
  className,
  ...props
}: DeviceCardProps) {
  // Get OS icon using centralized OS type system
  const getOSIcon = () => {
    if (!device.operatingSystem) return null

    // Support legacy 'macos' value by mapping to 'darwin'
    const osValue = device.operatingSystem === 'macos' ? 'darwin' : device.operatingSystem

    // Use centralized OS icon system
    const IconComponent = getOSIconFromTypes(osValue)
    if (IconComponent) {
      return <IconComponent className="w-4 h-4 text-[#888888]" />
    }

    return null
  }

  // Format date for last seen
  const formatLastSeen = (lastSeen?: string | Date) => {
    if (!lastSeen) return null
    
    const date = typeof lastSeen === 'string' ? new Date(lastSeen) : lastSeen
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}/${month}/${day}, ${hours}:${minutes}`
  }

  return (
    <div 
      className={cn(
        "bg-[#212121] relative rounded-[6px] size-full border border-[#3a3a3a]",
        className
      )}
      {...props}
    >
      <div className="content-stretch flex flex-col items-start justify-start overflow-clip relative size-full">
        {/* Main row with device info and actions */}
        <div className="bg-[#212121] box-border content-stretch flex gap-4 h-20 items-center justify-start px-4 py-0 relative shrink-0 w-full">
          {/* Device type icon section */}
          <div className="content-stretch flex gap-2 h-20 items-center justify-start overflow-clip relative shrink-0">
            <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
              <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 w-full">
                <div className="bg-[#212121] box-border content-stretch flex gap-2 h-8 items-center justify-center p-2 relative rounded-[6px] shrink-0 border border-[#3a3a3a]">
                  <Monitor className="relative shrink-0 size-4 text-[#888888]" />
                </div>
              </div>
            </div>
          </div>

          {/* Device name and organization section */}
          <div className="basis-0 content-stretch flex gap-2 grow h-20 items-center justify-start min-h-px min-w-px overflow-clip relative shrink-0">
            <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 w-full">
                <div className="font-['DM_Sans'] font-medium leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[18px] text-[#fafafa] text-nowrap">
                  <p className="leading-[24px] overflow-ellipsis overflow-hidden whitespace-pre">
                    {device.name}
                  </p>
                </div>
                {getOSIcon()}
              </div>
              {device.organization && (
                <div className="font-['DM_Sans'] font-medium h-5 leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#888888] text-[14px] text-nowrap w-full">
                  <p className="leading-[20px] overflow-ellipsis overflow-hidden">
                    {device.organization}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons section */}
          {actions.moreButton?.visible !== false && (
            <div 
              className="bg-[#212121] box-border content-stretch flex gap-2 items-center justify-center p-3 relative rounded-[6px] shrink-0 border border-[#3a3a3a] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              onClick={actions.moreButton?.onClick}
            >
              <MoreHorizontal className="relative shrink-0 size-6 text-[#fafafa]" />
            </div>
          )}
          
          {actions.detailsButton?.visible !== false && (
            <div 
              className="bg-[#212121] box-border content-stretch flex gap-2 items-center justify-center px-4 py-3 relative rounded-[6px] shrink-0 border border-[#3a3a3a] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              onClick={actions.detailsButton?.onClick}
            >
              <div className="font-['DM_Sans'] font-bold leading-[0] relative shrink-0 text-[18px] text-[#fafafa] text-nowrap tracking-[-0.36px]">
                <p className="leading-[24px] whitespace-pre">{actions.detailsButton?.label || 'Details'}</p>
              </div>
            </div>
          )}

          {/* Custom action buttons */}
          {actions.customActions?.map((action, index) => 
            action.visible !== false && (
              <div 
                key={index}
                className="bg-[#212121] box-border content-stretch flex gap-2 items-center justify-center px-4 py-3 relative rounded-[6px] shrink-0 border border-[#3a3a3a] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={action.onClick}
              >
                <div className="font-['DM_Sans'] font-bold leading-[0] relative shrink-0 text-[18px] text-[#fafafa] text-nowrap tracking-[-0.36px]">
                  <p className="leading-[24px] whitespace-pre">{action.label}</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Status and last seen row */}
        <div className="bg-[#212121] box-border content-stretch flex gap-4 items-center justify-start px-4 py-2 relative shrink-0 w-full">
          <div className="basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0">
            <StatusBadge status={device.status} />
            {device.lastSeen && (
              <div className="basis-0 font-['DM_Sans'] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#888888] text-[14px]">
                <p className="leading-[20px]">Last Seen: {formatLastSeen(device.lastSeen)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tags section */}
        {device.tags && device.tags.length > 0 && (
          <div className="bg-[#212121] box-border content-stretch flex gap-2 items-center justify-start p-4 pt-3 relative shrink-0 w-full">
            {device.tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-[#212121] box-border content-stretch flex gap-2 h-8 items-center justify-center p-2 relative rounded-[6px] shrink-0 border border-[#3a3a3a]"
              >
                <div className="font-['Azeret_Mono'] font-medium leading-[0] relative shrink-0 text-[14px] text-[#fafafa] text-nowrap tracking-[-0.28px] uppercase">
                  <p className="leading-[20px] whitespace-pre">{tag}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}