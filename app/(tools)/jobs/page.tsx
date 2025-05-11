import { and, eq, inArray } from 'drizzle-orm'
import { Briefcase } from 'lucide-react'

import JobsTable from '@/components/job-directory/jobs-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getJobOpeningsPage } from '@/lib/db/queries/job-openings'
import { candidates } from '@/lib/db/schema/candidate'
import { pipelineCandidates } from '@/lib/db/schema/recruiter'
import type { JobRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

export default async function JobsDirectoryPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  const params = await resolveSearchParams(searchParams)

  /* ------------------------- Table parameters --------------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'recruiter', 'createdAt'] as const,
    'createdAt',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { jobs, hasNext } = await getJobOpeningsPage(
    page,
    pageSize,
    sort as 'name' | 'recruiter' | 'createdAt',
    order,
    searchTerm.toLowerCase(),
  )

  /* -------------- Enrich with candidate-specific state ------------------ */
  const user = await requireAuth()
  const isCandidate = user?.role === 'candidate'

  let appliedSet = new Set<number>()
  if (isCandidate) {
    const [cand] = await db
      .select({ id: candidates.id })
      .from(candidates)
      .where(eq(candidates.userId, user!.id))
      .limit(1)

    if (cand) {
      const pipelineIds = jobs.map((j) => j.id)
      if (pipelineIds.length) {
        const appliedRows = await db
          .select({ pipelineId: pipelineCandidates.pipelineId })
          .from(pipelineCandidates)
          .where(
            and(
              eq(pipelineCandidates.candidateId, cand.id),
              inArray(pipelineCandidates.pipelineId, pipelineIds),
            ),
          )
        appliedSet = new Set(appliedRows.map((r) => r.pipelineId))
      }
    }
  }

  const rows: JobRow[] = jobs.map((j) => ({ ...j, applied: appliedSet.has(j.id) }))

  /* ------------------------------ View ---------------------------------- */
  return (
    <PageCard
      icon={Briefcase}
      title='Job Openings'
      description='Browse publicly listed job pipelines and apply directly.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <JobsTable
          rows={rows}
          sort={sort}
          order={order}
          basePath='/jobs'
          initialParams={initialParams}
          searchQuery={searchTerm}
          isCandidate={isCandidate}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/jobs'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
