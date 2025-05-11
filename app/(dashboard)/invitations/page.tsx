import { Mail } from 'lucide-react'

import InvitationsTable from '@/components/dashboard/invitations-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { getInvitationsPage } from '@/lib/db/queries/invitations'
import type { InvitationRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams } from '@/lib/utils/query'

export const revalidate = 0

export default async function InvitationsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, any>>
}) {
  const params = await resolveSearchParams(searchParams)

  const user = await requireAuth()

  /* ------------------- Table parameters via helper ---------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['team', 'role', 'inviter', 'status', 'invitedAt'] as const,
    'invitedAt',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { invitations, hasNext } = await getInvitationsPage(
    user.email,
    page,
    pageSize,
    sort as 'team' | 'role' | 'inviter' | 'status' | 'invitedAt',
    order as 'asc' | 'desc',
    searchTerm,
  )

  const rows: InvitationRow[] = invitations.map((inv) => ({
    ...inv,
    invitedAt: new Date(inv.invitedAt),
  }))

  /* ------------------------------ View ---------------------------------- */
  return (
    <PageCard
      icon={Mail}
      title='Team Invitations'
      description='Review and manage the invitations sent to your email.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <InvitationsTable
          rows={rows}
          sort={sort}
          order={order as 'asc' | 'desc'}
          basePath='/invitations'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/invitations'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
