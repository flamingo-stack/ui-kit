'use client'

import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { TableCell } from './table-cell'
import type { TableRowProps } from './types'

export function TableRow<T = any>({
  item,
  columns,
  rowKey,
  rowActions,
  renderRowActions,
  actionsWidth,
  onClick,
  className,
  index,
  mobileColumns,
  renderMobileRow,
  selectable,
  selected,
  onSelect
}: TableRowProps<T>) {
  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('[data-no-row-click]')) {
      return
    }
    
    if (onClick) {
      onClick(item)
    }
  }
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(item)
    }
  }

  const getCellValue = (column: typeof columns[0]): React.ReactNode => {
    if (column.renderCell) {
      return column.renderCell(item, column)
    }
    
    // Access nested properties using dot notation
    const keys = column.key.split('.')
    let value: any = item
    for (const key of keys) {
      value = value?.[key]
    }

    if (value === null || value === undefined) {
      return '-'
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    
    return String(value)
  }

  // Filter columns for mobile display
  const mobileColumnsToShow = mobileColumns 
    ? columns.filter(col => mobileColumns.includes(col.key))
    : columns.filter(col => !col.hideOnMobile).slice(0, 3) // Default: show first 3 columns

  return (
    <div
      className={cn(
        'relative rounded-[6px] bg-[#212121] border border-[#3a3a3a] overflow-hidden',
        onClick && 'cursor-pointer hover:bg-[#2a2a2a] transition-colors',
        typeof className === 'function' ? className(item, index) : className
      )}
      onClick={handleRowClick}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-4 px-4 py-0 h-20">
        {/* Selection checkbox */}
        {selectable && (
          <div className="flex items-center justify-center w-10 shrink-0" data-no-row-click>
            <Checkbox
              checked={selected}
              onCheckedChange={handleSelect}
              className="border-[#3a3a3a]"
            />
          </div>
        )}
        
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            width={column.width}
            className={column.className}
          >
            {getCellValue(column)}
          </TableCell>
        ))}
        
        {/* Row Actions */}
        {(renderRowActions || (rowActions && rowActions.length > 0)) && (
          <div
            className="flex gap-2 items-center ml-auto shrink-0"
            style={{ width: actionsWidth ? `${actionsWidth}px` : undefined, minWidth: actionsWidth ? `${actionsWidth}px` : '3rem' }}
            data-no-row-click
          >
            {renderRowActions ? (
              renderRowActions(item)
            ) : (
              rowActions!.map((action, actionIndex) => (
                <Button
                  key={actionIndex}
                  variant={action.variant || 'outline'}
                  size={action.icon && !action.label ? 'icon' : 'default'}
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick(item)
                  }}
                  className={cn(
                    'bg-[#212121] border-[#3a3a3a] hover:bg-[#2a2a2a]',
                    action.className
                  )}
                  aria-label={action.label}
                >
                  {action.icon && !action.label ? (
                    action.icon
                  ) : (
                    <>
                      {action.icon}
                      {action.label}
                    </>
                  )}
                </Button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden gap-3 items-center justify-start px-3 py-0 min-h-[80px]">
        {renderMobileRow ? (
          // Custom mobile renderer
          renderMobileRow(item)
        ) : (
          // Default mobile layout
          <>
            <div className="flex-1 flex flex-col justify-center min-w-0 py-3">
              {mobileColumnsToShow.map((column, colIndex) => (
                <div key={column.key} className="flex flex-col">
                  {colIndex === 0 ? (
                    // First column - primary text
                    <span className="font-['DM_Sans'] font-medium text-[14px] leading-[20px] text-[#fafafa] truncate">
                      {getCellValue(column)}
                    </span>
                  ) : (
                    // Other columns - secondary text
                    <span className="font-['DM_Sans'] font-medium text-[12px] leading-[16px] text-[#888888] truncate">
                      {getCellValue(column)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Actions */}
            {rowActions && rowActions.length > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  if (rowActions.length === 1) {
                    rowActions[0].onClick(item)
                  } else {
                    rowActions[0].onClick(item)
                  }
                }}
                className="bg-[#212121] border-[#3a3a3a] hover:bg-[#2a2a2a] h-12 w-12 shrink-0"
              >
                {rowActions.length === 1 && rowActions[0].icon ? (
                  rowActions[0].icon
                ) : (
                  <MoreHorizontal className="h-6 w-6 text-[#fafafa]" />
                )}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}