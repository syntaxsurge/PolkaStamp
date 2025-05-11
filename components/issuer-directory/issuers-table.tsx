'use client'

import Image from 'next/image'
import * as React from 'react'

import { Eye, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { IssuerDirectoryRow, TableProps } from '@/lib/types/tables'
import { copyToClipboard } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                        Per-row actions + dialog UI                         */
/* -------------------------------------------------------------------------- */

function ActionsCell({ row }: { row: IssuerDirectoryRow }) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const actions = React.useMemo<TableRowAction<IssuerDirectoryRow>[]>(() => {
    return [
      {
        label: 'View DID',
        icon: Eye,
        onClick: () => setDialogOpen(true),
        disabled: () => !row.did,
      },
    ]
  }, [row.did])

  return (
    <>
      <TableRowActions row={row} actions={actions} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issuer DID</DialogTitle>
          </DialogHeader>

          {row.did ? (
            <div className='flex flex-col gap-4'>
              <code className='bg-muted rounded-md px-3 py-2 text-sm break-all'>{row.did}</code>
              <Button
                variant='outline'
                size='sm'
                className='self-end'
                onClick={() => copyToClipboard(row.did!)}
              >
                <Copy className='mr-2 h-4 w-4' /> Copy
              </Button>
            </div>
          ) : (
            <p className='text-muted-foreground text-sm'>No DID available.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function IssuersTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<IssuerDirectoryRow>) {
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  const bulkActions = useBulkActions<IssuerDirectoryRow>([
    {
      label: 'Copy DIDs',
      icon: Copy,
      handler: async (selected) => {
        const dids = selected
          .map((r) => r.did)
          .filter(Boolean)
          .join('\n')
        if (!dids) {
          toast.error('No DIDs available in the selection.')
          return
        }
        copyToClipboard(dids)
      },
      isAvailable: (rows) => rows.some((r) => !!r.did),
      isDisabled: (rows) => rows.every((r) => !r.did),
    },
  ])

  const columns = React.useMemo<Column<IssuerDirectoryRow>[]>(() => {
    return [
      {
        key: 'logoUrl',
        header: '',
        enableHiding: false,
        sortable: false,
        className: 'w-[60px]',
        render: (v, row) =>
          v ? (
            <Image
              src={v as string}
              alt={`${row.name} logo`}
              width={40}
              height={40}
              className='h-10 w-10 rounded-md border object-contain'
            />
          ) : (
            <div className='bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded-md text-[10px]'>
              N/A
            </div>
          ),
      },
      {
        key: 'name',
        header: sortableHeader('Name', 'name'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'domain',
        header: sortableHeader('Domain', 'domain'),
        sortable: false,
        render: (v) => v as string,
      },
      {
        key: 'category',
        header: sortableHeader('Category', 'category'),
        sortable: false,
        className: 'capitalize',
        render: (v) => String(v),
      },
      {
        key: 'industry',
        header: sortableHeader('Industry', 'industry'),
        sortable: false,
        className: 'capitalize',
        render: (v) => String(v).toLowerCase(),
      },
      {
        key: 'status',
        header: sortableHeader('Status', 'status'),
        sortable: false,
        render: (v) => <StatusBadge status={String(v)} />,
      },
      {
        key: 'createdAt',
        header: sortableHeader('Created', 'createdAt'),
        sortable: false,
        render: (v) =>
          v ? new Date(v as string).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—',
      },
      {
        key: 'id',
        header: '',
        enableHiding: false,
        sortable: false,
        render: (_v, row) => <ActionsCell row={row} />,
      },
    ]
  }, [sortableHeader])

  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='name'
      filterValue={search}
      onFilterChange={handleSearchChange}
      bulkActions={bulkActions}
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}
