'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { deleteUserAction } from '@/app/(dashboard)/admin/users/actions'
import EditUserForm from '@/app/(dashboard)/admin/users/edit-user-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, AdminUserRow } from '@/lib/types/tables'
import { formatDateTime } from '@/lib/utils/time'

export default function AdminUsersTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<AdminUserRow>) {
  const router = useRouter()

  /* ------------------------ Bulk-selection actions ----------------------- */
  const bulkActions = useBulkActions<AdminUserRow>([
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      handler: async (selected) => {
        const toastId = toast.loading('Deleting users…')
        await Promise.all(
          selected.map(async (row) => {
            const fd = new FormData()
            fd.append('userId', row.id.toString())
            return deleteUserAction({}, fd)
          }),
        )
        toast.success('Selected users deleted.', { id: toastId })
        router.refresh()
      },
    },
  ])

  /* -------------------- Centralised navigation helpers -------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* --------------------------- Edit-dialog state -------------------------- */
  const [editRow, setEditRow] = React.useState<AdminUserRow | null>(null)
  const [isPending, startTransition] = React.useTransition()

  /* ------------------------ Row-level action builder ---------------------- */
  const makeActions = React.useCallback(
    (row: AdminUserRow): TableRowAction<AdminUserRow>[] => [
      {
        label: 'Edit',
        icon: Pencil,
        onClick: () => setEditRow(row),
        disabled: () => isPending,
      },
      {
        label: 'Delete',
        icon: Trash2,
        variant: 'destructive',
        onClick: () =>
          startTransition(async () => {
            const fd = new FormData()
            fd.append('userId', row.id.toString())
            const res = await deleteUserAction({}, fd)
            res?.error ? toast.error(res.error) : toast.success(res?.success ?? 'User deleted.')
            router.refresh()
          }),
        disabled: () => isPending,
      },
    ],
    [router, isPending, startTransition],
  )

  /* --------------------------- Column definitions ------------------------- */
  const columns = React.useMemo<Column<AdminUserRow>[]>(() => {
    return [
      {
        key: 'name',
        header: sortableHeader('Name', 'name'),
        sortable: false,
        render: (v) => <>{(v as string) || '—'}</>,
      },
      {
        key: 'email',
        header: sortableHeader('Email', 'email'),
        sortable: false,
        render: (v) => <>{v as string}</>,
      },
      {
        key: 'role',
        header: sortableHeader('Role', 'role'),
        sortable: false,
        className: 'capitalize',
        render: (v) => <>{v as string}</>,
      },
      {
        key: 'createdAt',
        header: sortableHeader('Joined', 'createdAt'),
        sortable: false,
        render: (v) => <>{formatDateTime(v as string)}</>,
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

  /* -------------------------------- Render -------------------------------- */
  return (
    <>
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

      {/* --------------------------- Edit dialog --------------------------- */}
      {editRow && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setEditRow(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Modify the user’s details, then save.</DialogDescription>
            </DialogHeader>

            <EditUserForm
              id={editRow.id}
              defaultName={editRow.name}
              defaultEmail={editRow.email}
              defaultRole={editRow.role}
              onDone={() => setEditRow(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
