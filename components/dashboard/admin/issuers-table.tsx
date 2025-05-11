'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  updateIssuerStatusAction,
  deleteIssuerAction,
} from '@/app/(dashboard)/admin/issuers/actions'
import { VerifyIcon, UnverifyIcon, RejectIcon } from '@/components/ui/colored-icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { IssuerStatus } from '@/lib/db/schema/issuer'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, AdminIssuerRow } from '@/lib/types/tables'

export default function AdminIssuersTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<AdminIssuerRow>) {
  const router = useRouter()

  /* -------------------------- Bulk-selection actions ---------------------- */
  const bulkActions = useBulkActions<AdminIssuerRow>([
    {
      label: 'Verify',
      icon: VerifyIcon,
      handler: async (selected) => {
        const toastId = toast.loading('Updating issuers…')
        await Promise.all(
          selected.map(async (row) => {
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.ACTIVE)
            return updateIssuerStatusAction({}, fd)
          }),
        )
        toast.success('Issuers updated.', { id: toastId })
        router.refresh()
      },
    },
    {
      label: 'Unverify',
      icon: UnverifyIcon,
      handler: async (selected) => {
        const toastId = toast.loading('Updating issuers…')
        await Promise.all(
          selected.map(async (row) => {
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.PENDING)
            return updateIssuerStatusAction({}, fd)
          }),
        )
        toast.success('Issuers updated.', { id: toastId })
        router.refresh()
      },
    },
    {
      label: 'Reject',
      icon: RejectIcon,
      variant: 'destructive',
      handler: async (selected) => {
        const toastId = toast.loading('Updating issuers…')
        await Promise.all(
          selected.map(async (row) => {
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.REJECTED)
            fd.append('rejectionReason', 'Bulk reject')
            return updateIssuerStatusAction({}, fd)
          }),
        )
        toast.success('Issuers updated.', { id: toastId })
        router.refresh()
      },
    },
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      handler: async (selected) => {
        const toastId = toast.loading('Deleting issuers…')
        await Promise.all(
          selected.map(async (row) => {
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            return deleteIssuerAction({}, fd)
          }),
        )
        toast.success('Issuers deleted.', { id: toastId })
        router.refresh()
      },
    },
  ])

  /* --------------------- Centralised navigation helpers ------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* ----------------------- Row-level actions builder ---------------------- */
  const makeActions = React.useCallback(
    (row: AdminIssuerRow): TableRowAction<AdminIssuerRow>[] => {
      const actions: TableRowAction<AdminIssuerRow>[] = []

      if (row.status !== 'ACTIVE') {
        actions.push({
          label: 'Verify',
          icon: VerifyIcon,
          onClick: async () => {
            const toastId = toast.loading('Updating issuer…')
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.ACTIVE)
            const res = await updateIssuerStatusAction({}, fd)
            res?.error
              ? toast.error(res.error, { id: toastId })
              : toast.success(res?.success ?? 'Issuer updated.', { id: toastId })
            router.refresh()
          },
        })
      }

      if (row.status === 'ACTIVE') {
        actions.push({
          label: 'Unverify',
          icon: UnverifyIcon,
          onClick: async () => {
            const toastId = toast.loading('Updating issuer…')
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.PENDING)
            const res = await updateIssuerStatusAction({}, fd)
            res?.error
              ? toast.error(res.error, { id: toastId })
              : toast.success(res?.success ?? 'Issuer updated.', { id: toastId })
            router.refresh()
          },
        })
      }

      if (row.status !== 'REJECTED') {
        actions.push({
          label: 'Reject',
          icon: RejectIcon,
          variant: 'destructive',
          onClick: async () => {
            const toastId = toast.loading('Updating issuer…')
            const fd = new FormData()
            fd.append('issuerId', row.id.toString())
            fd.append('status', IssuerStatus.REJECTED)
            fd.append('rejectionReason', 'Rejected by admin')
            const res = await updateIssuerStatusAction({}, fd)
            res?.error
              ? toast.error(res.error, { id: toastId })
              : toast.success(res?.success ?? 'Issuer updated.', { id: toastId })
            router.refresh()
          },
        })
      }

      actions.push({
        label: 'Delete',
        icon: Trash2,
        variant: 'destructive',
        onClick: async () => {
          const toastId = toast.loading('Deleting issuer…')
          const fd = new FormData()
          fd.append('issuerId', row.id.toString())
          const res = await deleteIssuerAction({}, fd)
          res?.error
            ? toast.error(res.error, { id: toastId })
            : toast.success(res?.success ?? 'Issuer deleted.', { id: toastId })
          router.refresh()
        },
      })

      return actions
    },
    [router],
  )

  /* ------------------------------- Columns -------------------------------- */
  const columns = React.useMemo<Column<AdminIssuerRow>[]>(() => {
    return [
      {
        key: 'name',
        header: sortableHeader('Name / Domain', 'name'),
        sortable: false,
        render: (_v, row) => (
          <div className='min-w-[180px]'>
            <p className='truncate font-medium'>{row.name}</p>
            <p className='text-muted-foreground truncate text-xs'>{row.domain}</p>
          </div>
        ),
      },
      {
        key: 'owner',
        header: sortableHeader('Owner', 'owner'),
        sortable: false,
        className: 'truncate',
        render: (v) => <span className='break-all'>{(v && String(v).trim()) || '—'}</span>,
      },
      {
        key: 'category',
        header: sortableHeader('Category', 'category'),
        sortable: false,
        className: 'capitalize',
        render: (v) => (v as string).replaceAll('_', ' ').toLowerCase(),
      },
      {
        key: 'industry',
        header: sortableHeader('Industry', 'industry'),
        sortable: false,
        className: 'capitalize',
        render: (v) => (v as string).toLowerCase(),
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

  /* ----------------------------- Render ----------------------------------- */
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
