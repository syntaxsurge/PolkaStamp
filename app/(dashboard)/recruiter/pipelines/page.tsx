import { KanbanSquare } from 'lucide-react'

import PipelinesTable from '@/components/dashboard/recruiter/pipelines-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { getRecruiterPipelinesPage } from '@/lib/db/queries/recruiter-pipelines'
import type { PipelineRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams } from '@/lib/utils/query'

import NewPipelineDialog from './new-pipeline-dialog'

export const revalidate = 0

export default async function PipelinesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, any>>
}) {
  const params = await resolveSearchParams(searchParams)

  const user = await requireAuth(['recruiter'])

  /* ------------------- Table parameters via helper ---------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'createdAt'] as const,
    'createdAt',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { pipelines, hasNext } = await getRecruiterPipelinesPage(
    user.id,
    page,
    pageSize,
    sort as 'name' | 'createdAt',
    order,
    searchTerm,
  )

  const rows: PipelineRow[] = pipelines.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    createdAt: p.createdAt,
  }))

  /* ------------------------------ View ---------------------------------- */
  return (
    <PageCard
      icon={KanbanSquare}
      title='Pipelines'
      description='Manage and track your hiring pipelines.'
      actions={<NewPipelineDialog />}
    >
      <PipelinesTable
        rows={rows}
        sort={sort}
        order={order}
        basePath='/recruiter/pipelines'
        initialParams={initialParams}
        searchQuery={searchTerm}
      />

      <TablePagination
        page={page}
        hasNext={hasNext}
        basePath='/recruiter/pipelines'
        initialParams={initialParams}
        pageSize={pageSize}
      />
    </PageCard>
  )
}
