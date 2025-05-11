'use client'

import * as React from 'react'

import { Clipboard, ExternalLink, FileText } from 'lucide-react'

import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, RecruiterCredentialRow } from '@/lib/types/tables'
import { buildExplorerLink, copyToClipboard, gatewayUrl } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                     Recruiter → Candidate Credentials                      */
/* -------------------------------------------------------------------------- */

export default function CredentialsTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<RecruiterCredentialRow>) {
  /* -------------------- Centralised navigation helpers -------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* -------------------------- Row-actions helper -------------------------- */
  const makeActions = React.useCallback(
    (row: RecruiterCredentialRow): TableRowAction<RecruiterCredentialRow>[] => {
      const acts: TableRowAction<RecruiterCredentialRow>[] = []

      /* View original file ------------------------------------------------- */
      if (row.fileUrl) {
        acts.push({ label: 'View file', icon: FileText, href: gatewayUrl(row.fileUrl) })
      }

      /* Copy raw VC JSON --------------------------------------------------- */
      if (row.vcJson) {
        acts.push({
          label: 'Copy VC JSON',
          icon: Clipboard,
          onClick: () => copyToClipboard(row.vcJson!),
        })
      }

      /* View on-chain tx --------------------------------------------------- */
      if (row.txHash) {
        acts.push({
          label: 'View transaction',
          icon: ExternalLink,
          href: buildExplorerLink(row.txHash),
        })
      } else {
        acts.push({
          label: 'No transaction',
          icon: ExternalLink,
          disabled: () => true,
        })
      }

      return acts
    },
    [],
  )

  /* ----------------------------- Columns ---------------------------------- */
  const columns = React.useMemo<Column<RecruiterCredentialRow>[]>(() => {
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
        render: (v) => <span className='capitalize'>{v as string}</span>,
      },
      {
        key: 'issuer',
        header: sortableHeader('Issuer', 'issuer'),
        sortable: false,
        render: (v) => (v as string) || '—',
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

  /* ------------------------------- View ----------------------------------- */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='title'
      filterValue={search}
      onFilterChange={handleSearchChange}
      /* All pagination handled server-side in parent */
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}