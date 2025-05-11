import { redirect } from 'next/navigation'

import { eq } from 'drizzle-orm'
import { ListChecks } from 'lucide-react'

import IssuerRequestsTable from '@/components/dashboard/issuer/requests-table'
import RequireDidGate from '@/components/dashboard/require-did-gate'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getIssuerRequestsPage } from '@/lib/db/queries/issuer-requests'
import { issuers } from '@/lib/db/schema/issuer'
import type { IssuerRequestRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default async function RequestsPage({ searchParams }: { searchParams?: Promise<Query> }) {
  /* Resolve synchronous or async `searchParams` uniformly */
  const params = await resolveSearchParams(searchParams)

  const user = await requireAuth(['issuer'])

  const [issuer] = await db.select().from(issuers).where(eq(issuers.ownerUserId, user.id)).limit(1)
  if (!issuer) redirect('/issuer/onboard')

  /* -------------------- Pagination / sort / search ---------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['title', 'type', 'status', 'candidate'] as const,
    'status',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { requests, hasNext } = await getIssuerRequestsPage(
    issuer.id,
    page,
    pageSize,
    sort as 'title' | 'type' | 'status' | 'candidate',
    order as 'asc' | 'desc',
    searchTerm,
  )

  const rows: IssuerRequestRow[] = requests

  /* ------------------------------ View ---------------------------------- */
  return (
    <RequireDidGate createPath='/issuer/create-did'>
      <PageCard
        icon={ListChecks}
        title='Verification Requests'
        description='Review and manage credential verification requests submitted by candidates.'
      >
        <div className='space-y-4 overflow-x-auto'>
          <IssuerRequestsTable
            rows={rows}
            sort={sort}
            order={order as 'asc' | 'desc'}
            basePath='/issuer/requests'
            initialParams={initialParams}
            searchQuery={searchTerm}
          />

          <TablePagination
            page={page}
            hasNext={hasNext}
            basePath='/issuer/requests'
            initialParams={initialParams}
            pageSize={pageSize}
          />
        </div>
      </PageCard>
    </RequireDidGate>
  )
}
