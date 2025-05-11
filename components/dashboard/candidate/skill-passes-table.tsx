'use client'

import * as React from 'react'

import { ExternalLink } from 'lucide-react'

import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { SkillPassRow, TableProps } from '@/lib/types/tables'
import { buildExplorerLink } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                              Skill Passes Table                            */
/* -------------------------------------------------------------------------- */

export default function SkillPassesTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<SkillPassRow>) {
  /* ---------------------- Bulk-selection actions ------------------------ */
  const bulkActions = useBulkActions<SkillPassRow>([])

  /* -------------------- Centralised navigation helpers ------------------ */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
    paramKeys: { sort: 'passSort', order: 'passOrder', search: 'passQ', page: 'passPage' },
  })

  /* --------------------------- Row actions ------------------------------ */
  const makeActions = React.useCallback((row: SkillPassRow): TableRowAction<SkillPassRow>[] => {
    const actions: TableRowAction<SkillPassRow>[] = []

    if (row.txHash) {
      actions.push({
        label: 'View Transaction',
        icon: ExternalLink,
        href: buildExplorerLink(row.txHash),
      })
    } else {
      /* Inform user when no on-chain link is available */
      actions.push({
        label: 'No transaction',
        icon: ExternalLink,
        disabled: () => true,
      })
    }

    return actions
  }, [])

  /* ------------------------------ Columns ------------------------------- */
  const columns = React.useMemo<Column<SkillPassRow>[]>(() => {
    return [
      {
        key: 'quizTitle',
        header: sortableHeader('Quiz', 'quizTitle'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'score',
        header: sortableHeader('Score', 'score'),
        sortable: false,
        render: (v, row) =>
          row.maxScore ? `${v ?? '—'} / ${row.maxScore}` : (v ?? '—').toString(),
      },
      {
        key: 'createdAt',
        header: sortableHeader('Date', 'createdAt'),
        sortable: false,
        render: (v) => new Date(v as string).toLocaleString(),
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

  /* ------------------------------- View --------------------------------- */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='quizTitle'
      filterValue={search}
      onFilterChange={handleSearchChange}
      bulkActions={bulkActions}
      /* Disable client-side pagination to rely on server-side TablePagination */
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}
