'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Trash2, FileText, Clipboard, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { deleteCredentialAction } from '@/lib/actions/delete'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, CandidateCredentialRow } from '@/lib/types/tables'
import { buildExplorerLink, copyToClipboard, gatewayUrl } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                        Candidate Credentials Table                         */
/* -------------------------------------------------------------------------- */

export default function CandidateCredentialsTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<CandidateCredentialRow>) {
  const router = useRouter()

  /* ------------------------ Bulk-selection actions ----------------------- */
  const bulkActions = useBulkActions<CandidateCredentialRow>([
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      handler: async (selected) => {
        const toastId = toast.loading('Deleting credentials…')
        await Promise.all(
          selected.map(async (cred) => {
            const fd = new FormData()
            fd.append('credentialId', cred.id.toString())
            return deleteCredentialAction({}, fd)
          }),
        )
        toast.success('Selected credentials deleted.', { id: toastId })
        router.refresh()
      },
    },
  ])

  /* -------------------- Centralised navigation helpers ------------------ */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* --------------------------- Row actions ------------------------------ */
  const makeActions = React.useCallback(
    (row: CandidateCredentialRow): TableRowAction<CandidateCredentialRow>[] => {
      const actions: TableRowAction<CandidateCredentialRow>[] = []

      /* View original file ------------------------------------------------ */
      if (row.fileUrl) {
        actions.push({
          label: 'View file',
          icon: FileText,
          href: gatewayUrl(row.fileUrl),
        })
      }

      /* Copy raw VC JSON -------------------------------------------------- */
      if (row.vcJson) {
        actions.push({
          label: 'Copy VC JSON',
          icon: Clipboard,
          onClick: () => copyToClipboard(row.vcJson!),
        })
      }

      /* View on-chain transaction ---------------------------------------- */
      if (row.txHash) {
        actions.push({
          label: 'View transaction',
          icon: ExternalLink,
          href: buildExplorerLink(row.txHash),
        })
      } else {
        actions.push({
          label: 'No transaction',
          icon: ExternalLink,
          disabled: () => true,
        })
      }

      /* Delete (single) --------------------------------------------------- */
      actions.push({
        label: 'Delete',
        icon: Trash2,
        variant: 'destructive',
        onClick: async () => {
          const fd = new FormData()
          fd.append('credentialId', row.id.toString())
          const res = await deleteCredentialAction({}, fd)
          res?.error ? toast.error(res.error) : toast.success(res?.success ?? 'Credential deleted.')
          router.refresh()
        },
      })

      return actions
    },
    [router],
  )

  /* ------------------------------- Columns ------------------------------ */
  const columns = React.useMemo<Column<CandidateCredentialRow>[]>(() => {
    return [
      {
        key: 'title',
        header: sortableHeader('Title', 'title'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'category',
        header: sortableHeader('Category', 'category'),
        sortable: false,
        className: 'capitalize',
        render: (v) => v as string,
      },
      {
        key: 'type',
        header: sortableHeader('Type', 'type'),
        sortable: false,
        className: 'capitalize',
        render: (v) => v as string,
      },
      {
        key: 'issuer',
        header: sortableHeader('Issuer', 'issuer'),
        sortable: false,
        render: (v) => (v as string | null) || '—',
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

  /* ------------------------------ Render ------------------------------- */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='title'
      filterValue={search}
      onFilterChange={handleSearchChange}
      bulkActions={bulkActions}
      /* Disable client-side pagination – handled by server TablePagination */
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}