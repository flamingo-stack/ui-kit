import React from 'react'
import { MoreHorizontal, Monitor } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from './button'
import { Tag } from './tag'
import { WindowsIcon, MacOSIcon, LinuxIcon } from '../icons'

export interface DeviceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deviceName: string
  deviceType?: 'desktop' | 'laptop' | 'mobile' | 'tablet' | 'server'
  operatingSystem?: 'windows' | 'macos' | 'linux' | 'ios' | 'android'
  organization?: string
  status?: {
    label: string
    variant?: 'active' | 'inactive' | 'offline' | 'warning' | 'error'
  }
  lastSeen?: string
  tags?: string[]
  onMoreClick?: () => void
}

// Status badge component
const StatusBadge = ({ label, variant = 'active' }: { label: string; variant?: string }) => {
  const variantStyles = {
    active: 'bg-[#2e461f] text-[#5ea62e]',
    inactive: 'bg-[#3a3a3a] text-[#888888]',
    offline: 'bg-[#461f1f] text-[#ea2e2e]',
    warning: 'bg-[#7f6004] text-[#ffc008]',
    error: 'bg-[#461f1f] text-[#ea2e2e]',
  }

  return (
    <div className={cn(
      "inline-flex items-center justify-center h-8 px-2 rounded-[6px]",
      variantStyles[variant as keyof typeof variantStyles] || variantStyles.active
    )}>
      <span className="font-['Azeret_Mono'] font-medium text-[14px] leading-[20px] tracking-[-0.28px] uppercase">
        {label}
      </span>
    </div>
  )
}


export function DeviceCard({
  deviceName,
  deviceType = 'desktop',
  operatingSystem = 'windows',
  organization,
  status = { label: 'Active', variant: 'active' },
  lastSeen,
  tags = [],
  onMoreClick,
  className,
  ...props
}: DeviceCardProps) {
  // Get OS icon
  const getOSIcon = () => {
    switch (operatingSystem) {
      case 'windows':
        return <WindowsIcon className="w-4 h-4 text-[#888888]" />
      case 'macos':
        return <MacOSIcon className="w-4 h-4 text-[#888888]" />
      case 'linux':
        return <LinuxIcon className="w-4 h-4 text-[#888888]" />
      default:
        return null
    }
  }

  return (
    <div 
      className={cn(
        "relative rounded-[6px] bg-[#212121] border border-[#3a3a3a] overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Main row with device info and actions */}
      <div className="flex items-center justify-between px-4 py-0 h-20 bg-[#212121]">
        {/* Device type icon */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center h-8 w-8 p-2 rounded-[6px] bg-[#212121] border border-[#3a3a3a]">
            <Monitor className="w-4 h-4 text-[#888888]" />
          </div>
        </div>

        {/* Device name and organization */}
        <div className="flex-1 flex flex-col justify-center min-w-0 px-2">
          <div className="flex items-center gap-1">
            <span className="font-['DM_Sans'] font-medium text-[18px] leading-[24px] text-[#fafafa] truncate">
              {deviceName}
            </span>
            {getOSIcon()}
          </div>
          {organization && (
            <span className="font-['DM_Sans'] font-medium text-[14px] leading-[20px] text-[#888888] truncate">
              {organization}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="icon"
            onClick={onMoreClick}
            className="bg-[#212121] border-[#3a3a3a] hover:bg-[#2a2a2a] h-12 w-12"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-6 w-6 text-[#fafafa]" />
          </Button>
        </div>
      </div>

      {/* Status and last seen row */}
      <div className="flex items-center gap-4 px-4 py-0 bg-[#212121]">
        <StatusBadge label={status.label} variant={status.variant} />
        {lastSeen && (
          <span className="font-['DM_Sans'] font-medium text-[14px] leading-[20px] text-[#888888]">
            Last Seen: {lastSeen}
          </span>
        )}
      </div>

      {/* Tags section */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-4 bg-[#212121] border-t border-[#3a3a3a]">
          {tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
      )}
    </div>
  )
}