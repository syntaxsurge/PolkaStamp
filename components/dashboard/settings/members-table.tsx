'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { removeTeamMember } from '@/app/(auth)/actions'
import { updateTeamMemberRoleAction } from '@/app/(dashboard)/settings/team/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TableRowActions, type TableRowAction } from '@/components/ui/tables/row-actions'
import { useBulkActions } from '@/lib/hooks/use-bulk-actions'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, MemberRow } from '@/lib/types/tables'
import { truncateAddress } from '@/lib/utils/address'
import { relativeTime } from '@/lib/utils/time'

const ROLES = ['member', 'owner'] as const

function EditMemberForm({ row, onDone }: { row: MemberRow; onDone: () => void }) {
  const [role, setRole] = React.useState<MemberRow['role']>(row.role)
  const [pending, startTransition] = React.useTransition()
  const router = useRouter()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const fd = new FormData()
      fd.append('memberId', row.id.toString())
      fd.append('role', role)
      const res = await updateTeamMemberRoleAction({}, fd)
      res?.error ? toast.error(res.error) : toast.success(res?.success ?? 'Member updated.')
      onDone()
      router.refresh()
    })
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      <div>
        <Label htmlFor='role'>Role</Label>
        <select
          id='role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='h-10 w-full rounded-md border px-2 capitalize'
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <Button type='submit' className='w-full' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Saving…
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  )
}

export default function MembersTable({
  rows,
  isOwner = false,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<MemberRow>) {
  const router = useRouter()

  /* ----------------------- Bulk-selection actions ----------------------- */
  const bulkActions = isOwner
    ? useBulkActions<MemberRow>([
        {
          label: 'Remove',
          icon: Trash2,
          variant: 'destructive',
          handler: async (selected) => {
            const toastId = toast.loading('Removing members…')
            await Promise.all(
              selected.map(async (m) => {
                const fd = new FormData()
                fd.append('memberId', m.id.toString())
                return removeTeamMember({}, fd)
              }),
            )
            toast.success('Selected members removed.', { id: toastId })
            router.refresh()
          },
        },
      ])
    : []

  /* ------------------ Centralised navigation helpers ------------------- */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* --------------------------- Edit-dialog state ------------------------ */
  const [editRow, setEditRow] = React.useState<MemberRow | null>(null)
  const [isPending, startTransition] = React.useTransition()

  /* ------------------- Row-level action builders ------------------------ */
  const makeActions = React.useCallback(
    (row: MemberRow): TableRowAction<MemberRow>[] => [
      {
        label: 'Edit',
        icon: Pencil,
        onClick: () => setEditRow(row),
        disabled: () => isPending,
      },
      {
        label: 'Remove',
        icon: Trash2,
        variant: 'destructive',
        onClick: () =>
          startTransition(async () => {
            const fd = new FormData()
            fd.append('memberId', row.id.toString())
            const res = await removeTeamMember({}, fd)
            res?.error ? toast.error(res.error) : toast.success(res?.success ?? 'Member removed.')
            router.refresh()
          }),
        disabled: () => isPending,
      },
    ],
    [router, isPending, startTransition],
  )

  /* --------------------------- Column definitions ----------------------- */
  const columns = React.useMemo<Column<MemberRow>[]>(() => {
    const base: Column<MemberRow>[] = [
      {
        key: 'name',
        header: sortableHeader('Name', 'name'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'email',
        header: sortableHeader('Email', 'email'),
        sortable: false,
        render: (v) => v as string,
      },
      {
        key: 'walletAddress',
        header: 'Wallet',
        sortable: false,
        render: (v) => <span className='font-mono text-xs'>{truncateAddress(v as string)}</span>,
      },
      {
        key: 'role',
        header: sortableHeader('Role', 'role'),
        sortable: false,
        className: 'capitalize',
        render: (v) => v as string,
      },
      {
        key: 'joinedAt',
        header: sortableHeader('Joined', 'joinedAt'),
        sortable: false,
        render: (v) => relativeTime(new Date(v as string)),
      },
    ]

    if (isOwner) {
      base.push({
        key: 'id',
        header: '',
        enableHiding: false,
        sortable: false,
        render: (_v, row) => <TableRowActions row={row} actions={makeActions(row)} />,
      })
    }

    return base
  }, [sortableHeader, isOwner, makeActions])

  /* -------------------------------- Render ------------------------------ */
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

      {/* --------------------------- Edit dialog -------------------------- */}
      {editRow && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setEditRow(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
              <DialogDescription>
                Modify the member’s role, then save your changes.
              </DialogDescription>
            </DialogHeader>
            <EditMemberForm row={editRow} onDone={() => setEditRow(null)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
