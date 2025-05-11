import { Building } from 'lucide-react'

import AdminIssuersTable from '@/components/dashboard/admin/issuers-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { getAdminIssuersPage } from '@/lib/db/queries/admin-issuers'
import type { AdminIssuerRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

export default async function AdminIssuersPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  /* Resolve synchronous or async `searchParams` supplied by Next.js */
  const params = await resolveSearchParams(searchParams)

  /* ---------------------- Pagination, sort, search ----------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'domain', 'owner', 'category', 'industry', 'status', 'id'] as const,
    'id',
  )

  /* ---------------------------- Data fetch ------------------------------- */
  const { issuers, hasNext } = await getAdminIssuersPage(
    page,
    pageSize,
    sort as 'name' | 'domain' | 'owner' | 'category' | 'industry' | 'status' | 'id',
    order,
    searchTerm,
  )

  const rows: AdminIssuerRow[] = issuers.map((i) => ({
    id: i.id,
    name: i.name,
    domain: i.domain,
    owner: i.owner,
    category: i.category,
    industry: i.industry,
    status: i.status,
  }))

  /* ------------------------------ View ----------------------------------- */
  return (
    <PageCard
      icon={Building}
      title='Issuer Management'
      description='Review, verify, and manage issuers.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <AdminIssuersTable
          rows={rows}
          sort={sort}
          order={order}
          basePath='/admin/issuers'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/admin/issuers'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
