'use client'

import React from 'react'
import { cn } from '../../../utils/cn'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import { TableCardSkeleton } from './table-skeleton'
import { TableEmptyState } from './table-empty-state'
import type { TableProps } from './types'

export function Table<T = any>({
  data,
  columns,
  rowKey,
  loading = false,
  emptyMessage = 'No data available',
  className,
  containerClassName,
  headerClassName,
  rowClassName,
  onRowClick,
  rowActions,
  renderRowActions,
  actionsWidth,
  actionsMinWidth = 48,
  sortBy,
  sortDirection,
  onSort,
  filters,
  onFilterChange,
  showFilters,
  selectable,
  selectedRows = [],
  onSelectionChange,
  bulkActions,
  showToolbar,
  mobileColumns,
  renderMobileRow
}: TableProps<T>) {
  const getRowKey = (item: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(item)
    }
    const key = item[rowKey]
    return key?.toString() || index.toString()
  }

  const getRowClassName = (item: T, index: number): string => {
    if (typeof rowClassName === 'function') {
      return rowClassName(item, index)
    }
    return rowClassName || ''
  }

  const isRowSelected = (item: T) => {
    if (!selectable || !selectedRows) return false
    const key = getRowKey(item, -1)
    return selectedRows.some(row => getRowKey(row, -1) === key)
  }

  const handleSelectRow = (item: T) => {
    if (!onSelectionChange) return
    
    const key = getRowKey(item, -1)
    const isSelected = isRowSelected(item)
    
    if (isSelected) {
      onSelectionChange(selectedRows.filter(row => getRowKey(row, -1) !== key))
    } else {
      onSelectionChange([...selectedRows, item])
    }
  }

  const handleSelectAll = () => {
    if (!onSelectionChange) return
    
    if (selectedRows.length === data.length) {
      onSelectionChange([])
    } else {
      onSelectionChange([...data])
    }
  }
  
  const allSelected = selectedRows.length > 0 && selectedRows.length === data.length
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length

  return (
    <div className={cn('flex flex-col gap-1 w-full', containerClassName)}>
      {/* Toolbar for bulk actions */}
      {showToolbar && bulkActions && selectedRows.length > 0 && (
        <div className="flex items-center justify-between bg-[#212121] border border-[#3a3a3a] rounded-[6px] p-3 mb-2">
          <span className="text-[#888888] text-sm">
            {selectedRows.length} item{selectedRows.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            {bulkActions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.onClick(selectedRows)}
                disabled={action.requiresSelection && selectedRows.length === 0}
                className={cn(
                  "px-3 py-1.5 text-sm rounded border transition-colors",
                  "bg-[#212121] border-[#3a3a3a] hover:bg-[#2a2a2a] text-[#fafafa]",
                  action.className
                )}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Desktop Header */}
      <TableHeader 
        columns={columns} 
        className={headerClassName}
        hasActions={!!renderRowActions || (!!rowActions && rowActions.length > 0)}
        actionsWidth={actionsWidth || actionsMinWidth}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
        filters={filters}
        onFilterChange={onFilterChange}
        showFilters={showFilters}
        selectable={selectable}
        allSelected={allSelected}
        someSelected={someSelected}
        onSelectAll={handleSelectAll}
      />
      
      {/* Table Body */}
      <div className={cn('flex flex-col gap-1 w-full', className)}>
        {loading ? (
          <TableCardSkeleton 
            columns={columns} 
            rows={6}
            hasActions={!!rowActions && rowActions.length > 0}
          />
        ) : data.length === 0 ? (
          <TableEmptyState message={emptyMessage} />
        ) : (
          data.map((item, index) => (
            <TableRow
              key={getRowKey(item, index)}
              item={item}
              columns={columns}
              rowKey={rowKey}
              rowActions={rowActions}
            renderRowActions={renderRowActions}
            actionsWidth={actionsWidth || actionsMinWidth}
              onClick={onRowClick}
              className={getRowClassName(item, index)}
              index={index}
              mobileColumns={mobileColumns}
              renderMobileRow={renderMobileRow}
              selectable={selectable}
              selected={isRowSelected(item)}
              onSelect={handleSelectRow}
            />
          ))
        )}
      </div>
    </div>
  )
}