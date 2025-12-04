'use client'

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Checkbox } from '../checkbox'
import { cn } from '../../../utils/cn'
import { FileManagerTableRow } from './file-manager-table-row'
import { FileManagerEmpty } from './file-manager-empty'
import type { FileManagerTableProps } from './types'

export function FileManagerTable({ 
  files,
  selectedFiles,
  showCheckboxes = true,
  loading = false,
  onSelectFile,
  onSelectAll,
  onFolderOpen,
  onFileAction,
  className 
}: FileManagerTableProps) {
  const allSelected = useMemo(() => {
    return files.length > 0 && selectedFiles.length === files.length
  }, [files.length, selectedFiles.length])

  const someSelected = useMemo(() => {
    return selectedFiles.length > 0 && selectedFiles.length < files.length
  }, [files.length, selectedFiles.length])

  const containerRef = useRef<HTMLDivElement>(null)
  const [tableHeight, setTableHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (loading || files.length === 0) {
      setTableHeight(null)
      return
    }

    const handleResize = () => {
      const node = containerRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const availableHeight = window.innerHeight - rect.top
      setTableHeight(availableHeight > 0 ? availableHeight : null)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize, true)

    const resizeObserver = new ResizeObserver(handleResize)
    const parent = containerRef.current?.parentElement
    if (parent) {
      resizeObserver.observe(parent)
    } else if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize, true)
      resizeObserver.disconnect()
    }
  }, [loading, files.length])

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked)
  }

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center h-96', className)}>
        <div className="text-ods-text-secondary">Loading files...</div>
      </div>
    )
  }

  if (files.length === 0) {
    return <FileManagerEmpty />
  }

  return (
    <div
      ref={containerRef}
      className={cn('bg-ods-bg border border-ods-border rounded-lg flex flex-col', className)}
      style={tableHeight ? { height: `${tableHeight}px` } : undefined}
    >
      <div className="flex items-center h-12 px-4 bg-ods-bg-secondary border-b border-ods-border rounded-t-lg">
        {showCheckboxes && (
          <div className="mr-4">
            <Checkbox
              checked={allSelected || someSelected}
              onCheckedChange={handleSelectAll}
              className="h-5 w-5"
            />
          </div>
        )}
        
        <div className="flex items-center gap-3 flex-1 min-w-0 text-sm font-medium text-ods-text-secondary">
          NAME
        </div>
        
        <div className="w-24 shrink-0 pr-4 text-sm font-medium text-ods-text-secondary">
          SIZE
        </div>
        
        <div className="w-36 shrink-0 pl-4 text-sm font-medium text-ods-text-secondary">
          EDITED
        </div>
        
        <div className="w-48 shrink-0 pl-4 flex justify-end">
          {/* Space for action buttons */}
        </div>
      </div>
      
      <div className="divide-y divide-ods-border rounded-b-lg flex-1 overflow-auto">
        {files.map((file) => (
          <FileManagerTableRow
            key={file.id}
            file={file}
            isSelected={selectedFiles.includes(file.id)}
            showCheckbox={showCheckboxes}
            onSelect={(selected) => onSelectFile?.(file.id, selected)}
            onClick={() => {
              if (file.type === 'folder') {
                onFolderOpen?.(file)
              }
            }}
            onDoubleClick={() => {
              if (file.type === 'folder') {
                onFolderOpen?.(file)
              }
            }}
            onActionClick={(action) => onFileAction?.(action, file.id)}
          />
        ))}
      </div>
    </div>
  )
}