'use client'

import React from 'react'
import { ProgressBar } from './progress-bar'

interface InfoCardData {
  title: string
  subtitle?: string
  items: Array<{
    label: string
    value: string
  }>
  progress?: {
    value: number
    warningThreshold?: number
    criticalThreshold?: number
  }
}

interface InfoCardProps {
  data: InfoCardData
  className?: string
}

export function InfoCard({ data, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-[#212121] border border-[#3a3a3a] rounded-[6px] p-4 flex flex-col gap-3 ${className}`}>
      {/* Title */}
      <div className="font-['DM_Sans'] font-medium text-[18px] text-[#fafafa] leading-[24px] truncate">
        {data.title}
      </div>
      
      {/* Subtitle */}
      {data.subtitle && (
        <div className="font-['DM_Sans'] font-medium text-[18px] text-[#888888] leading-[24px] truncate">
          {data.subtitle}
        </div>
      )}
      
      {/* Info items */}
      <div className="flex flex-col gap-2">
        {data.items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center w-full">
            <span className="font-['DM_Sans'] font-medium text-[18px] text-[#fafafa] leading-[24px] whitespace-nowrap">
              {item.label}
            </span>
            <div className="flex-1 h-px bg-[#3a3a3a]" />
            <span className="font-['DM_Sans'] font-medium text-[18px] text-[#fafafa] leading-[24px] whitespace-nowrap">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      {data.progress && (
        <ProgressBar progress={data.progress.value} warningThreshold={data.progress.warningThreshold} criticalThreshold={data.progress.criticalThreshold} />
      )}
    </div>
  )
}
