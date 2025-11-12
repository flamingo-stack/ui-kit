"use client";

import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';

export interface StatusOption {
  value: string;
  label: string;
}

export interface StatusFilterComponentProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  statusOptions: StatusOption[];
  showCount?: boolean;
  count?: number;
  className?: string;
}

/**
 * StatusFilterComponent - Reusable status filter for admin dashboards
 *
 * Displays a row of status filter buttons matching the blog posts dashboard pattern
 */
export function StatusFilterComponent({
  selectedStatus,
  onStatusChange,
  statusOptions,
  showCount = false,
  count = 0,
  className = ''
}: StatusFilterComponentProps) {
  return (
    <div className={`flex items-center gap-4 p-4 bg-ods-card border border-ods-border rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-ods-accent" />
        <span className="text-ods-text-secondary font-['Azeret_Mono'] text-[14px] uppercase font-semibold">
          Status
        </span>
      </div>

      {/* All button */}
      <Button
        type="button"
        variant={selectedStatus === 'all' ? "primary" : "outline"}
        size="sm"
        onClick={() => onStatusChange('all')}
        className="font-['DM_Sans'] text-[16px] md:text-[18px] font-bold"
      >
        All
      </Button>

      {/* Status option buttons */}
      {statusOptions.filter(option => option.value !== 'all').map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={selectedStatus === option.value ? "primary" : "outline"}
          size="sm"
          onClick={() => onStatusChange(option.value)}
          className="font-['DM_Sans'] text-[16px] md:text-[18px] font-bold"
        >
          {option.label}
        </Button>
      ))}

      {/* Optional count display */}
      {showCount && (
        <div className="ml-auto text-[12px] font-['DM_Sans'] text-ods-text-secondary">
          {count} items
        </div>
      )}
    </div>
  );
}
