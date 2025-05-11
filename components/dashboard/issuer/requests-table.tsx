'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { FileSignature } from 'lucide-react'
import { toast } from 'sonner'

import { rejectCredentialAction } from '@/app/(dashboard)/issuer/credentials/actions'
import { RejectIcon } from '@/components/ui/colored-icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, IssuerRequestRow } from '@/lib/types/tables'

/* -------------------------------------------------------------------------- */
/*                         Bulk-selection actions                             */
/* -------------------------------------------------------------------------- */

function useBulkReject(router: ReturnType<typeof useRouter>) {
  return useBulkActions<IssuerRequestRow>([
    {
      label: 'Reject',
      icon: RejectIcon,
      variant: 'destructive',
      handler: async (rows) => {
        const toastId = toast.loading('Rejecting…')
        const results = await Promise.all(
          rows.map(async (cred) => {
            const fd = new FormData()
            fd.append('credentialId', cred.id.toString())
            return rejectCredentialAction({}, fd)
          }),
        )

        const errors = results
          .filter(
            (r): r is { error: string } =>
              typeof r === 'object' &&
              r !== null &&
              'error' in r &&
              typeof (r as any).error === 'string',
          )
          .map((r) => r.error)

        errors.length
          ? toast.error(errors.join('\n'), { id: toastId })
          : toast.success('Credentials rejected.', { id: toastId })

        router.refresh()
      },
    },
  ])
}

/* -------------------------------------------------------------------------- */
/*                         Row-level action builder                           */
/* -------------------------------------------------------------------------- */

function useRowActions(): (row: IssuerRequestRow) => TableRowAction<IssuerRequestRow>[] {
  return React.useCallback(
    (row: IssuerRequestRow) => [
      {
        label: 'Review & Sign',
        icon: FileSignature,
        href: `/issuer/credentials/${row.id}`,
      },
    ],
    [],
  )
}

export default function IssuerRequestsTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<IssuerRequestRow>) {
  const router = useRouter()
  const bulkActions = useBulkReject(router)
  const makeActions = useRowActions()

  /* -------------------- Centralised navigation helpers -------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* ------------------------ Column definitions --------------------------- */
  const columns = React.useMemo<Column<IssuerRequestRow>[]>(() => {
    return [
      {
        key: 'title',
        header: sortableHeader('Title', 'title'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'type',
        header: sortableHeader('Type', 'type'),
        sortable: false,
        className: 'capitalize',
        render: (v) => v as string,
      },
      {
        key: 'candidate',
        header: sortableHeader('Candidate', 'candidate'),
        sortable: false,
        render: (v) => v as string,
      },
      {
        key: 'status',
        header: sortableHeader('Status', 'status'),
        sortable: false,
        render: (v) => <StatusBadge status={String(v)} />,
      },
      {
        key: 'id',
        header: '',
        enableHiding: false,
        sortable: false,
        render: (_v, row) => <TableRowActions row={row} actions={makeActions(row)} />,
      },
    ]
  }, [sortableHeader, makeActions])

  /* ----------------------------- Render ---------------------------------- */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='title'
      filterValue={search}
      onFilterChange={handleSearchChange}
      bulkActions={bulkActions}
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}
