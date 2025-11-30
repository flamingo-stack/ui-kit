'use client'

import React from 'react'
import { cn } from '../../../utils/cn'

export interface ProductReleaseCardSkeletonProps {
  /** Additional CSS classes */
  className?: string
}

export function ProductReleaseCardSkeleton({ className }: ProductReleaseCardSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-ods-card border border-ods-border rounded-[6px]',
        'flex flex-col md:flex-row',
        'min-h-[80px] md:h-[80px]',
        'items-start md:items-center',
        'gap-3 md:gap-4',
        'px-4 py-4 md:py-0',
        'animate-pulse',
        className
      )}
    >
      {/* Left column - content */}
      <div className="flex-1 w-full md:w-auto min-w-0 flex flex-col justify-center gap-1">
        <div className="h-[24px] w-3/4 bg-ods-border rounded" />
        <div className="h-[20px] w-full bg-ods-border rounded" />
      </div>

      {/* Right column - version + date */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end shrink-0">
        <div className="w-[200px] flex flex-col justify-center gap-1">
          <div className="h-[24px] w-16 bg-ods-border rounded" />
          <div className="h-[20px] w-32 bg-ods-border rounded" />
        </div>
        {/* Icon column */}
        <div className="h-6 w-6 bg-ods-border rounded shrink-0 mx-3" />
      </div>
    </div>
  )
}
