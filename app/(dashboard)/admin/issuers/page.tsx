import { Building } from 'lucide-react'

import AdminIssuersTable from '@/components/dashboard/admin/issuers-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { getAdminIssuersPage, type AdminIssuerRowWithWallet } from '@/lib/db/queries/admin-issuers'
import type { AdminIssuerRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

export default async function AdminIssuersPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  const params = await resolveSearchParams(searchParams)

  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'domain', 'owner', 'category', 'industry', 'status', 'id'] as const,
    'id',
  )

  const { issuers, hasNext } = await getAdminIssuersPage(
    page,
    pageSize,
    sort as 'name' | 'domain' | 'owner' | 'category' | 'industry' | 'status' | 'id',
    order,
    searchTerm,
  )

  const rows: (AdminIssuerRow & { ownerWalletAddress: string | null })[] = issuers.map((i) => ({
    id: i.id,
    name: i.name,
    domain: i.domain,
    owner: i.owner,
    ownerWalletAddress: i.ownerWalletAddress,
    category: i.category,
    industry: i.industry,
    status: i.status,
  }))

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