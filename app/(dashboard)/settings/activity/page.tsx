import { Activity } from 'lucide-react'

import ActivityLogsTable from '@/components/dashboard/settings/activity-logs-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { getActivityLogsPage } from '@/lib/db/queries/activity'
import type { ActivityLogRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

export default async function ActivityPage({ searchParams }: { searchParams?: Promise<Query> }) {
  const params = await resolveSearchParams(searchParams)

  const user = await requireAuth()

  /* ------------------------- Table parameters ---------------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['timestamp', 'action'] as const,
    'timestamp',
  )

  /* ---------------------------- Data fetch ------------------------------- */
  const { logs, hasNext } = await getActivityLogsPage(
    user.id,
    page,
    pageSize,
    sort as 'timestamp' | 'action' | undefined,
    order as 'asc' | 'desc',
    searchTerm,
  )

  const rows: ActivityLogRow[] = logs

  /* ------------------------------ View ----------------------------------- */
  return (
    <PageCard
      icon={Activity}
      title='Activity Log'
      description='Review your recent account activity and wallet connections.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <ActivityLogsTable
          rows={rows}
          sort={sort}
          order={order as 'asc' | 'desc'}
          basePath='/settings/activity'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/settings/activity'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
