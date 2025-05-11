import { FileText } from 'lucide-react'

import AdminCredentialsTable from '@/components/dashboard/admin/credentials-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { getAdminCredentialsPage } from '@/lib/db/queries/admin-credentials'
import type { AdminCredentialRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default async function AdminCredentialsPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  /* Resolve synchronous or async `searchParams` supplied by Next.js */
  const params = await resolveSearchParams(searchParams)

  /* ---------------------- Pagination, sort, search ----------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['title', 'candidate', 'issuer', 'status', 'id'] as const,
    'id',
  )

  /* ---------------------------- Data fetch ------------------------------- */
  const { credentials, hasNext } = await getAdminCredentialsPage(
    page,
    pageSize,
    sort as 'title' | 'candidate' | 'issuer' | 'status' | 'id',
    order,
    searchTerm,
  )

  const rows: AdminCredentialRow[] = credentials.map((c) => ({
    id: c.id,
    title: c.title,
    candidate: c.candidate,
    issuer: c.issuer,
    status: c.status,
    vcJson: c.vcJson,
  }))

  /* ------------------------------ View ----------------------------------- */
  return (
    <PageCard
      icon={FileText}
      title='All Credentials'
      description='View and manage all candidate credentials.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <AdminCredentialsTable
          rows={rows}
          sort={sort}
          order={order}
          basePath='/admin/credentials'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/admin/credentials'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
