import { and, sql } from 'drizzle-orm'

import type { TalentRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { buildOrderExpr, buildSearchCondition, paginate } from './query-helpers'
import { candidates } from '../schema/candidate'
import { users } from '../schema/core'

/* -------------------------------------------------------------------------- */
/*                 S H A R E D   C A N D I D A T E   L I S T I N G            */
/* -------------------------------------------------------------------------- */

/**
 * Generic, paginated candidate-directory search used by both the public
 * Candidate Directory and recruiter-side Talent Search.
 *
 * Optional filters:
 *   • <code>verifiedOnly</code> → only candidates with at least one verified credential
 *   • <code>skillMin/skillMax</code> → inclusive top-score range for Skill Passes
 */

/* Pre-computed verified-count SQL fragment reused in SELECT and ORDER BY */
const VERIFIED_COUNT_EXPR = sql<number>`(
  SELECT COUNT(*)
  FROM candidate_credentials cc
  WHERE cc.candidate_id = ${candidates.id}
    AND cc.verified
)`

export async function getCandidateListingPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'email' | 'id' | 'verified' = 'name',
  order: 'asc' | 'desc' = 'asc',
  searchTerm = '',
  verifiedOnly = false,
  skillMin = 0,
  skillMax = 100,
): Promise<{ candidates: TalentRow[]; hasNext: boolean }> {
  /* --------------------------- ORDER BY helper --------------------------- */
  const sortMap = {
    name: users.name,
    email: users.email,
    id: candidates.id,
    verified: VERIFIED_COUNT_EXPR,
  } as const

  const orderBy = buildOrderExpr(sortMap, sortBy, order)

  /* ---------------------------- WHERE clause ---------------------------- */
  const filters: any[] = []

  const searchCond = buildSearchCondition(searchTerm, [users.name, users.email, candidates.bio])
  if (searchCond) filters.push(searchCond)

  if (verifiedOnly) {
    filters.push(sql`(${VERIFIED_COUNT_EXPR}) > 0`)
  }

  /* Skill-score range filter */
  if (skillMin > 0) {
    filters.push(
      sql`${skillMin} <= (
        SELECT COALESCE(MAX(score), 0)
        FROM quiz_attempts qa
        WHERE qa.candidate_id = ${candidates.id}
          AND qa.pass = 1
      )`,
    )
  }
  if (skillMax < 100) {
    filters.push(
      sql`${skillMax} >= (
        SELECT COALESCE(MAX(score), 0)
        FROM quiz_attempts qa
        WHERE qa.candidate_id = ${candidates.id}
          AND qa.pass = 1
      )`,
    )
  }

  const whereExpr = filters.length > 0 ? and(...filters) : sql`TRUE`

  /* ------------------------------ Query ---------------------------------- */
  const baseQuery = db
    .select({
      id: candidates.id,
      name: users.name,
      email: users.email,
      bio: candidates.bio,
      verified: VERIFIED_COUNT_EXPR.as('verified'),
      topScore: sql<number | null>`(
        SELECT MAX(score)
        FROM quiz_attempts qa
        WHERE qa.candidate_id = ${candidates.id}
          AND qa.pass = 1
      )`.as('topScore'),
    })
    .from(candidates)
    .leftJoin(users, sql`${users.id} = ${candidates.userId}`)
    .where(whereExpr as any)
    .orderBy(orderBy)

  const { rows, hasNext } = await paginate<TalentRow>(baseQuery as any, page, pageSize)

  return { candidates: rows as TalentRow[], hasNext }
}
