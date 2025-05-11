'use client'

import * as React from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tables/table'
import type { Column, DataTableProps } from '@/lib/types/components'
import { cn } from '@/lib/utils'

/* Re-export for backwards compatibility */
export type { Column, BulkAction } from '@/lib/types/components'

/* -------------------------------------------------------------------------- */
/*                               H E L P E R S                                */
/* -------------------------------------------------------------------------- */

function SortableHeader({ column, title }: { column: any; title: React.ReactNode }) {
  return (
    <Button
      variant='ghost'
      size='sm'
      className='data-[state=open]:bg-accent -ml-3 h-8'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc', false)}
    >
      <span>{title}</span>
      <ArrowUpDown className='ml-1 h-4 w-4' />
    </Button>
  )
}

const checkboxOutline =
  'border-foreground/50 data-[state=unchecked]:bg-background data-[state=unchecked]:border-foreground/50'

function buildColumnDefs<T extends Record<string, any>>(cols: Column<T>[]): ColumnDef<T>[] {
  return cols.map((col) => {
    const headerLabel = typeof col.header === 'string' ? col.header : String(col.key)

    return {
      accessorKey: col.key as string,
      header: col.sortable
        ? ({ column }) => <SortableHeader column={column} title={col.header} />
        : col.header,
      cell: col.render ? ({ row }) => col.render!(row.original[col.key], row.original) : undefined,
      enableSorting: !!col.sortable,
      enableHiding: col.enableHiding !== false,
      meta: { className: col.className, label: headerLabel } as any,
    } as ColumnDef<T>
  })
}

/* Page-numbers helper - returns an array of page indexes; -1 represents an ellipsis. */
function getPageNumbers(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i)

  if (current < 4) return [0, 1, 2, 3, 4, -1, total - 1]
  if (current > total - 5) return [0, -1, total - 5, total - 4, total - 3, total - 2, total - 1]

  return [0, -1, current - 1, current, current + 1, -1, total - 1]
}

/* -------------------------------------------------------------------------- */
/*                                   T A B L E                                */
/* -------------------------------------------------------------------------- */

export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  filterKey,
  filterValue,
  onFilterChange,
  bulkActions = [],
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  hidePagination = false,
}: DataTableProps<T>) {
  const includeSelection = bulkActions.length > 0

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  })

  /* ---------------------------------------------------------------------- */
  /* Sync pageSize with dataset when pagination is hidden (display-all mode) */
  /* ---------------------------------------------------------------------- */
  const prevRowsLength = React.useRef(rows.length)

  React.useEffect(() => {
    if (!hidePagination) return
    if (rows.length !== prevRowsLength.current) {
      setPagination((prev) => ({
        ...prev,
        pageSize: rows.length,
        pageIndex: 0,
      }))
      prevRowsLength.current = rows.length
    }
  }, [rows.length, hidePagination])

  /* --------------------------- Column definitions -------------------------- */
  const columnDefs = React.useMemo<ColumnDef<T>[]>(() => {
    const base = buildColumnDefs(columns)

    if (!includeSelection) return base

    const selectCol: ColumnDef<T> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          className={checkboxOutline}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label='Select all rows'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className={checkboxOutline}
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 48,
      maxSize: 48,
    }
    return [selectCol, ...base]
  }, [columns, includeSelection])

  /* --------------------------------- Table --------------------------------- */
  const table = useReactTable({
    data: rows,
    columns: columnDefs,
    state: { columnVisibility, columnFilters, rowSelection, sorting, pagination },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: false,
  })

  /* --------------------------- Derived helpers ----------------------------- */
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedCount = selectedRows.length
  const selectedOriginals = React.useMemo(() => selectedRows.map((r) => r.original), [selectedRows])
  const { pageIndex, pageSize: size } = table.getState().pagination
  const pageCount = table.getPageCount()

  const filterColumn = React.useMemo(() => {
    return filterKey ? table.getColumn(filterKey as string) : undefined
  }, [table, filterKey])

  const pageNumbers = React.useMemo(
    () => getPageNumbers(pageIndex, pageCount),
    [pageIndex, pageCount],
  )

  /* ------------------------------------------------------------------------ */
  /*                                  UI                                     */
  /* ------------------------------------------------------------------------ */
  return (
    <div className='w-full overflow-x-auto'>
      {(filterKey ||
        table.getAllColumns().some((c) => c.getCanHide()) ||
        bulkActions.length > 0) && (
        <div className='flex flex-col gap-2 py-4 sm:flex-row sm:items-center'>
          {/* Filter input */}
          {filterKey && (
            <Input
              placeholder={`Filter ${String(filterKey)}…`}
              value={
                filterValue !== undefined
                  ? filterValue
                  : ((filterColumn?.getFilterValue() as string | undefined) ?? '')
              }
              onChange={(e) => {
                filterColumn?.setFilterValue(e.target.value)
                onFilterChange?.(e.target.value)
              }}
              className='max-w-sm sm:mr-auto'
            />
          )}

          {/* Bulk-actions */}
          {bulkActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='sm:ml-2'>
                  Bulk Selection {selectedCount > 0 && `(${selectedCount})`}{' '}
                  <ChevronDown className='ml-1 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {selectedCount === 0 && (
                  <>
                    <DropdownMenuLabel className='text-muted-foreground'>
                      No rows selected
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}

                {bulkActions
                  .filter((a) => !a.isAvailable || a.isAvailable(selectedOriginals))
                  .map((a) => (
                    <DropdownMenuItem
                      key={a.label}
                      onClick={() => a.onClick(selectedOriginals)}
                      disabled={
                        selectedCount === 0 ||
                        (a.isDisabled ? a.isDisabled(selectedOriginals) : false)
                      }
                      className={cn(
                        'cursor-pointer',
                        a.variant === 'destructive' &&
                          'font-medium text-rose-600 dark:text-rose-400',
                        (selectedCount === 0 ||
                          (a.isDisabled ? a.isDisabled(selectedOriginals) : false)) &&
                          'cursor-not-allowed opacity-50',
                      )}
                    >
                      <a.icon className='mr-2 h-4 w-4' />
                      {a.label}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Column-visibility */}
          {table.getAllColumns().some((c) => c.getCanHide()) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='sm:ml-2'>
                  Columns <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((c) => c.getCanHide())
                  .map((c) => {
                    const label = (c.columnDef.meta as any)?.label ?? c.id
                    return (
                      <DropdownMenuCheckboxItem
                        key={c.id}
                        className='capitalize'
                        checked={c.getIsVisible()}
                        onCheckedChange={(v) => c.toggleVisibility(!!v)}
                      >
                        {label}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {/* ----------------------------- Table body ----------------------------- */}
      <div className='rounded-md border'>
        <Table className='w-full table-auto'>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => {
                  const cls = (header.column.columnDef.meta as any)?.className
                  return (
                    <TableHead key={header.id} className={cn(cls, 'break-words')}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='align-top break-words'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnDefs.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ---------------------------- Pagination ----------------------------- */}
      {!hidePagination && (
        <div className='flex flex-col items-center justify-between gap-2 py-4 sm:flex-row'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            {selectedCount} of {table.getFilteredRowModel().rows.length} row(s) selected.
            <span className='hidden sm:inline'>•</span>
            <span className='hidden sm:inline'>
              Page {pageIndex + 1} of {pageCount}
            </span>
          </div>

          <div className='flex flex-col items-center gap-3 sm:flex-row'>
            {/* Page-size selector */}
            <select
              value={size}
              onChange={(e) => {
                const newSize = Number(e.target.value)
                table.setPageSize(newSize)
                table.setPageIndex(0) // Always jump back to the first page on size change
              }}
              className='h-8 rounded-md border px-2 text-sm'
            >
              {pageSizeOptions.map((sz) => (
                <option key={sz} value={sz}>
                  {sz} / page
                </option>
              ))}
            </select>

            {/* Prev */}
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            {/* Page numbers */}
            <div className='flex items-center gap-1'>
              {pageNumbers.map((n, idx) =>
                n === -1 ? (
                  <MoreHorizontal key={`ellipsis-${idx}`} className='h-4 w-4 opacity-50' />
                ) : (
                  <Button
                    key={n}
                    variant={n === pageIndex ? 'default' : 'outline'}
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => table.setPageIndex(n)}
                  >
                    {n + 1}
                  </Button>
                ),
              )}
            </div>

            {/* Next */}
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
