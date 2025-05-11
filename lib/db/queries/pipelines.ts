import { and, eq, sql } from 'drizzle-orm'

import type { PipelineListingRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { buildOrderExpr, buildSearchCondition, paginate } from './query-helpers'
import { users } from '../schema/core'
import { recruiterPipelines } from '../schema/recruiter'

/* -------------------------------------------------------------------------- */
/*                         Generic Pipelines Listing                          */
/* -------------------------------------------------------------------------- */

/**
 * Shared helper that returns a paginated, searchable and sortable list of
 * recruiter pipelines. When <code>recruiterId</code> is supplied the result
 * is filtered to pipelines owned by that recruiter; otherwise all pipelines
 * are returned.
 */
export async function getPipelinesPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
  recruiterId?: number,
): Promise<{ pipelines: PipelineListingRow[]; hasNext: boolean }> {
  /* --------------------------- ORDER BY ---------------------------------- */
  const sortMap = {
    name: recruiterPipelines.name,
    createdAt: recruiterPipelines.createdAt,
  } as const
  const orderBy = buildOrderExpr(sortMap, sortBy, order)

  /* ---------------------------- WHERE ----------------------------------- */
  const searchCond = buildSearchCondition(searchTerm, [recruiterPipelines.name, users.name])
  const filters: any[] = []
  if (recruiterId !== undefined) filters.push(eq(recruiterPipelines.recruiterId, recruiterId))
  if (searchCond) filters.push(searchCond)

  const whereExpr = filters.length > 0 ? and(...filters) : sql`TRUE`

  /* ----------------------------- QUERY ---------------------------------- */
  const baseQuery = db
    .select({
      id: recruiterPipelines.id,
      name: recruiterPipelines.name,
      description: recruiterPipelines.description,
      createdAt: recruiterPipelines.createdAt,
      recruiterName: users.name,
    })
    .from(recruiterPipelines)
    .innerJoin(users, eq(recruiterPipelines.recruiterId, users.id))
    .where(whereExpr as any)
    .orderBy(orderBy)

  const { rows, hasNext } = await paginate<PipelineListingRow>(baseQuery as any, page, pageSize)

  /* ---------------------- Normalise createdAt --------------------------- */
  const pipelines = rows.map((r) => ({
    ...r,
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : (r.createdAt as Date).toISOString(),
  })) as PipelineListingRow[]

  return { pipelines, hasNext }
}
