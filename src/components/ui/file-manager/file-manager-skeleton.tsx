'use client'

import React from 'react'
import { Skeleton } from '../'

interface FileManagerSkeletonProps {
  rows?: number
}

export function FileManagerSkeleton({ rows = 8 }: FileManagerSkeletonProps) {
  const rowPlaceholders = Array.from({ length: rows })

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4 animate-pulse">
      {/* Toolbar / Filters skeleton */}
      <div className="bg-ods-card border border-ods-border rounded-lg p-4 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* File list skeleton */}
      <div className="flex-1 bg-ods-card border border-ods-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-ods-border bg-ods-bg-secondary">
          <Skeleton className="h-4 col-span-6" />
          <Skeleton className="h-4 col-span-3" />
          <Skeleton className="h-4 col-span-2" />
          <Skeleton className="h-4 col-span-1" />
        </div>
        <div className="divide-y divide-ods-border">
          {rowPlaceholders.map((_, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
              <Skeleton className="h-4 col-span-6" />
              <Skeleton className="h-4 col-span-3" />
              <Skeleton className="h-4 col-span-2" />
              <Skeleton className="h-4 col-span-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

