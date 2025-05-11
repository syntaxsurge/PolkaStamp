import type { JobRow } from '@/lib/types/tables'

import { getPipelinesPage } from './pipelines'

/* -------------------------------------------------------------------------- */
/*                     P U B L I C   J O B   O P E N I N G S                  */
/* -------------------------------------------------------------------------- */

/**
 * Fetch a paginated, searchable, sortable list of public job openings
 * backed by recruiter pipelines.
 */
export async function getJobOpeningsPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'recruiter' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ jobs: JobRow[]; hasNext: boolean }> {
  /* Internally map "recruiter” sort to recruiter name (string) */
  const mappedSort: 'name' | 'createdAt' = sortBy === 'recruiter' ? 'name' : sortBy

  const { pipelines, hasNext } = await getPipelinesPage(
    page,
    pageSize,
    mappedSort,
    order,
    searchTerm,
    undefined, // no recruiterId filter – public listing
  )

  /* Normalise rows with safe fall-backs */
  const jobs: JobRow[] = pipelines.map((p) => ({
    id: p.id,
    name: p.name ?? '(Untitled)',
    recruiter: p.recruiterName ?? 'Unknown',
    description: p.description ?? '',
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : (p.createdAt as Date).toISOString(),
    applied: false,
  }))

  return { jobs, hasNext }
}
