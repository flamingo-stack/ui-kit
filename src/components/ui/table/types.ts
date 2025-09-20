import { ReactNode } from 'react'

export interface TableColumn<T = any> {
  key: string
  label: string
  width?: string // e.g., 'w-40', 'flex-1', 'w-32'
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  filterable?: boolean
  hideOnMobile?: boolean
  renderCell?: (item: T, column: TableColumn<T>) => ReactNode
  renderHeader?: () => ReactNode
  className?: string
  // Sorting
  sortKey?: string
  sortFunction?: (a: T, b: T) => number
  // Filtering
  filterOptions?: FilterOption[]
  filterKey?: string
  filterFunction?: (item: T, filterValue: any) => boolean
}

export interface FilterOption {
  id: string
  label: string
  value: any
}

export interface FilterSection {
  id: string
  title: string
  type: 'checkbox' | 'radio' | 'select'
  options: FilterOption[]
  allowSelectAll?: boolean
}

export interface TableFilters {
  [columnKey: string]: any[]
}

export interface TableProps<T = any> {
  // Data
  data: T[]
  columns: TableColumn<T>[]
  rowKey: keyof T | ((item: T) => string)
  
  // States
  loading?: boolean
  emptyMessage?: string
  
  // Styling
  className?: string
  containerClassName?: string
  headerClassName?: string
  rowClassName?: string | ((item: T, index: number) => string)
  
  // Interactions
  onRowClick?: (item: T) => void
  
  // Row Actions
  rowActions?: RowAction<T>[]
  
  // Sorting
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  defaultSort?: { column: string; direction: 'asc' | 'desc' }
  
  // Filtering
  filters?: TableFilters
  onFilterChange?: (filters: TableFilters) => void
  showFilters?: boolean
  
  // Selection
  selectable?: boolean
  selectedRows?: T[]
  onSelectionChange?: (selected: T[]) => void
  selectAllLabel?: string
  
  // Bulk Actions
  bulkActions?: BulkAction<T>[]
  showToolbar?: boolean
  
  // Mobile
  mobileColumns?: string[]
  renderMobileRow?: (item: T) => ReactNode
}

export interface BulkAction<T = any> {
  label: string
  icon?: ReactNode
  onClick: (selectedItems: T[]) => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  requiresSelection?: boolean
  className?: string
}

export interface RowAction<T = any> {
  label: string
  icon?: ReactNode
  onClick: (item: T) => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  className?: string
  hideOnMobile?: boolean
}

export interface TableHeaderProps<T = any> {
  columns: TableColumn<T>[]
  className?: string
  hasActions?: boolean
  // Sorting
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  // Filtering
  filters?: TableFilters
  onFilterChange?: (filters: TableFilters) => void
  showFilters?: boolean
  // Selection
  selectable?: boolean
  allSelected?: boolean
  someSelected?: boolean
  onSelectAll?: () => void
}

export interface TableRowProps<T = any> {
  item: T
  columns: TableColumn<T>[]
  rowKey: keyof T | ((item: T) => string)
  rowActions?: RowAction<T>[]
  onClick?: (item: T) => void
  className?: string | ((item: T, index: number) => string)
  index: number
  isMobile?: boolean
  mobileColumns?: string[]
  renderMobileRow?: (item: T) => ReactNode
  // Selection
  selectable?: boolean
  selected?: boolean
  onSelect?: (item: T) => void
}

export interface TableCellProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  width?: string
}

export interface TableCardSkeletonProps {
  columns: TableColumn[]
  rows?: number
  hasActions?: boolean
  className?: string
}

export interface TableEmptyStateProps {
  message?: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}