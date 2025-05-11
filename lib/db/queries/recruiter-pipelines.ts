import type { PipelineRow } from '@/lib/types/tables'

import { getPipelinesPage } from './pipelines'

/**
 * Paginate pipelines for the given recruiter with optional search and sorting.
 */
export async function getRecruiterPipelinesPage(
  recruiterId: number,
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ pipelines: PipelineRow[]; hasNext: boolean }> {
  const { pipelines, hasNext } = await getPipelinesPage(
    page,
    pageSize,
    sortBy,
    order,
    searchTerm,
    recruiterId,
  )

  /* Strip recruiterName for recruiter-specific table rows */
  const rows: PipelineRow[] = pipelines.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    createdAt: p.createdAt, // already normalised to ISO string
  }))

  return { pipelines: rows, hasNext }
}
