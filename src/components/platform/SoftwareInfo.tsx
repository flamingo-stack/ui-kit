/**
 * SoftwareInfo Component
 *
 * Displays software name with optional vendor information below it.
 * Part of the ODS (OpenFrame Design System) platform components.
 *
 * @example
 * ```tsx
 * <SoftwareInfo name="Visual Studio Code" vendor="Microsoft" />
 * <SoftwareInfo name="Chrome" /> // Without vendor
 * ```
 */

import React from 'react'
import { cn } from '../../utils/cn'

export interface SoftwareInfoProps {
  /** Software name (required) */
  name: string
  /** Software vendor (optional) */
  vendor?: string
  /** Additional CSS classes */
  className?: string
}

export const SoftwareInfo: React.FC<SoftwareInfoProps> = ({
  name,
  vendor,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="font-['DM_Sans'] font-medium text-[16px] leading-[20px] text-ods-text-primary">
        {name}
      </div>
      {vendor && (
        <div className="font-['DM_Sans'] font-normal text-[12px] leading-[16px] text-ods-text-secondary">
          {vendor}
        </div>
      )}
    </div>
  )
}

SoftwareInfo.displayName = 'SoftwareInfo'
