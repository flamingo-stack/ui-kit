import React from 'react'

import { DevicesIcon } from '../devices-icon'
import { DesktopIcon } from './desktop-icon'
import { LaptopIcon } from './laptop-icon'
import { ServerIcon } from './server-icon'

export type DeviceType = 'desktop' | 'laptop' | 'mobile' | 'tablet' | 'server'

export interface DeviceTypeIconProps {
  className?: string
  color?: string
  size?: number
}

export function getDeviceTypeIcon(
  type?: DeviceType,
  props?: DeviceTypeIconProps
): React.ReactElement {
  switch (type) {
    case 'desktop':
      return (
        <DesktopIcon
          className={props?.className}
          style={{ color: props?.color }}
        />
      )
    case 'laptop':
      return (
        <LaptopIcon
          className={props?.className}
          style={{ color: props?.color }}
        />
      )
    case 'mobile':
    case 'tablet':
    case 'server':
      return (
        <ServerIcon
          className={props?.className}
          style={{ color: props?.color }}
        />
      )
    default:
      return (
        <DevicesIcon
          className={props?.className}
          size={props?.size}
          color={props?.color}
        />
      )
  }
}


