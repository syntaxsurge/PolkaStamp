'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  acceptInvitationAction,
  declineInvitationAction,
  deleteInvitationAction,
} from '@/app/(dashboard)/invitations/actions'
import { AcceptIcon, DeclineIcon } from '@/components/ui/colored-icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, InvitationRow } from '@/lib/types/tables'
import { relativeTime } from '@/lib/utils/time'

/* -------------------------------------------------------------------------- */
/*                       Bulk-actions hook for invitations                    */
/* -------------------------------------------------------------------------- */

function useInvitationBulkActions(router: ReturnType<typeof useRouter>) {
  /* Predicates */
  const canAccept = (rows: InvitationRow[]) =>
    rows.length > 0 &&
    rows.every((r) => r.status === 'pending') &&
    new Set(rows.map((r) => r.role)).size === 1

  const canDecline = (rows: InvitationRow[]) =>
    rows.length > 0 && rows.every((r) => r.status === 'pending')

  /* Shared runner */
  async function runBulk(
    rows: InvitationRow[],
    fn:
      | typeof acceptInvitationAction
      | typeof declineInvitationAction
      | typeof deleteInvitationAction,
    loading: string,
    success: string,
  ) {
    const toastId = toast.loading(loading)
    const results = await Promise.all(
      rows.map(async (inv) => {
        const fd = new FormData()
        fd.append('invitationId', String(inv.id))
        return fn({}, fd)
      }),
    )
    const errors = results.filter((r) => r?.error).map((r) => r!.error)
    errors.length
      ? toast.error(errors.join('\n'), { id: toastId })
      : toast.success(success, { id: toastId })
    router.refresh()
  }

  return useBulkActions<InvitationRow>([
    {
      label: 'Accept',
      icon: AcceptIcon,
      handler: (rows) =>
        runBulk(rows, acceptInvitationAction, 'Accepting…', 'Invitations accepted.'),
      isAvailable: canAccept,
      isDisabled: (rows) => !canAccept(rows),
    },
    {
      label: 'Decline',
      icon: DeclineIcon,
      handler: (rows) =>
        runBulk(rows, declineInvitationAction, 'Declining…', 'Invitations declined.'),
      isAvailable: canDecline,
      isDisabled: (rows) => !canDecline(rows),
    },
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      handler: (rows) => runBulk(rows, deleteInvitationAction, 'Deleting…', 'Invitations deleted.'),
    },
  ])
}

/* -------------------------------------------------------------------------- */
/*                         Row actions builder                                */
/* -------------------------------------------------------------------------- */

function useRowActions(
  router: ReturnType<typeof useRouter>,
): (row: InvitationRow) => TableRowAction<InvitationRow>[] {
  return React.useCallback(
    (row: InvitationRow) => {
      const actions: TableRowAction<InvitationRow>[] = []
      const isAwaiting = row.status === 'pending'

      async function runAction(
        fn:
          | typeof acceptInvitationAction
          | typeof declineInvitationAction
          | typeof deleteInvitationAction,
        successMsg: string,
      ) {
        const fd = new FormData()
        fd.append('invitationId', String(row.id))
        const res = await fn({}, fd)
        res?.error ? toast.error(res.error) : toast.success(res?.success ?? successMsg)
        router.refresh()
      }

      if (isAwaiting) {
        actions.push({
          label: 'Accept',
          icon: AcceptIcon,
          onClick: () => runAction(acceptInvitationAction, 'Invitation accepted.'),
        })
        actions.push({
          label: 'Decline',
          icon: DeclineIcon,
          onClick: () => runAction(declineInvitationAction, 'Invitation declined.'),
        })
      }

      actions.push({
        label: 'Delete',
        icon: Trash2,
        variant: 'destructive',
        onClick: () => runAction(deleteInvitationAction, 'Invitation deleted.'),
      })

      return actions
    },
    [router],
  )
}

/* -------------------------------------------------------------------------- */
/*                              TABLE COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function InvitationsTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<InvitationRow>) {
  const router = useRouter()
  const bulkActions = useInvitationBulkActions(router)
  const makeActions = useRowActions(router)

  /* -------------------- Centralised navigation helpers -------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* ----------------------------- Columns ---------------------------------- */
  const columns = React.useMemo<Column<InvitationRow>[]>(() => {
    return [
      {
        key: 'team',
        header: sortableHeader('Team', 'team'),
        sortable: false,
        render: (v) => <span className='font-medium'>{String(v)}</span>,
      },
      {
        key: 'role',
        header: sortableHeader('Role', 'role'),
        sortable: false,
        className: 'capitalize',
        render: (v) => <span>{String(v)}</span>,
      },
      {
        key: 'inviter',
        header: sortableHeader('Invited By', 'inviter'),
        sortable: false,
        className: 'break-all',
        render: (v) => <span>{v ? String(v) : '—'}</span>,
      },
      {
        key: 'status',
        header: sortableHeader('Status', 'status'),
        sortable: false,
        render: (v) => <StatusBadge status={String(v)} />,
      },
      {
        key: 'invitedAt',
        header: sortableHeader('Invited', 'invitedAt'),
        sortable: false,
        render: (v) => <span>{relativeTime(new Date(v as Date))}</span>,
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

  /* ------------------------------ View ------------------------------------ */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='team'
      filterValue={search}
      onFilterChange={handleSearchChange}
      bulkActions={bulkActions}
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}
