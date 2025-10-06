import * as React from 'react'
import { cn } from '../utils/cn'
import { ToolIconProps } from '../types/logs.types'
import { FleetIcon } from './icons/fleet-icon'
import { MeshCentralIcon } from './icons/meshcentral-icon'
import { TacticalIcon } from './icons/tactical-icon'

export const ToolIcon = React.forwardRef<
  HTMLDivElement,
  ToolIconProps
>(({ toolType, size = 16, className }, ref) => {
  const renderIcon = () => {
    switch (toolType) {
      case 'fleet':
        return <FleetIcon size={size} />
      case 'meshcentral':
        return <MeshCentralIcon size={size} />
      case 'tactical':
        return <TacticalIcon size={size} />
      default:
        return <></>
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center shrink-0 text-[#888888]',
        className
      )}
      style={{ width: size, height: size, color: '#888888' }}
      aria-label={`${toolType} icon`}
    >
      {renderIcon()}
    </div>
  )
})

ToolIcon.displayName = 'ToolIcon'