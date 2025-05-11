import { Users } from 'lucide-react'

import AdminUsersTable from '@/components/dashboard/admin/users-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { getAdminUsersPage } from '@/lib/db/queries/admin-users'
import type { AdminUserRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

/**
 * Admin → Users management listing.
 * Uniformly parses pagination, sort and search via `getTableParams`.
 */
export default async function AdminUsersPage({ searchParams }: { searchParams?: Promise<Query> }) {
  const params = await resolveSearchParams(searchParams)

  /* -------------------------- Table helpers --------------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'email', 'role', 'createdAt'] as const,
    'createdAt',
  )

  /* ----------------------------- Data --------------------------------- */
  const { users, hasNext } = await getAdminUsersPage(
    page,
    pageSize,
    sort as 'name' | 'email' | 'role' | 'createdAt',
    order,
    searchTerm,
  )

  const rows: AdminUserRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: new Date(u.createdAt as any).toISOString(),
  }))

  /* ----------------------------- View --------------------------------- */
  return (
    <PageCard
      icon={Users}
      title='All Users'
      description='Manage all user accounts across the platform.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <AdminUsersTable
          rows={rows}
          sort={sort}
          order={order as 'asc' | 'desc'}
          basePath='/admin/users'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/admin/users'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
