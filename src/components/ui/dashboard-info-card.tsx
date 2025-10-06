'use client'

import React from 'react'
import { cn } from '../../utils/cn'
import { CircularProgress } from './circular-progress'

interface DashboardInfoCardProps {
  title: string
  value: string | number
  percentage?: number
  showProgress?: boolean
  progressColor?: string
  className?: string
}

export function DashboardInfoCard({
  title,
  value,
  percentage,
  showProgress = false,
  progressColor,
  className
}: DashboardInfoCardProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString() 
    : value

  return (
    <div 
      className={cn(
        'bg-ods-card border border-ods-border rounded-[6px] p-4 flex gap-3 items-center',
        className
      )}
    >
      {/* Content section */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <p className="font-['Azeret_Mono'] font-medium text-[14px] leading-[20px] text-ods-text-secondary uppercase tracking-[-0.28px]">
          {title}
        </p>
        
        {/* Value and percentage */}
        <div className="flex items-center gap-2">
          <p className="font-['Azeret_Mono'] font-semibold text-[32px] leading-[40px] text-ods-text-primary tracking-[-0.64px]">
            {formattedValue}
          </p>
          {percentage !== undefined && (
            <p className="font-['DM_Sans'] font-medium text-[18px] leading-[24px] text-ods-text-secondary">
              ({percentage}%)
            </p>
          )}
        </div>
      </div>
      
      {/* Progress indicator */}
      {showProgress && percentage !== undefined && (
        <CircularProgress 
          percentage={percentage}
          color={progressColor}
        />
      )}
    </div>
  )
}