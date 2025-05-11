import { eq } from 'drizzle-orm'

import { db } from '@/lib/db/drizzle'
import { candidates } from '@/lib/db/schema/candidate'
import type { StatusCounts } from '@/lib/types/candidate'
import type { CandidateCredentialRow, PageResult } from '@/lib/types/tables'

import { getCandidateCredentialsSection } from './candidate-credentials-core'

/* -------------------------------------------------------------------------- */
/*               P U B L I C   W R A P P E R   F O R   U S E R                */
/* -------------------------------------------------------------------------- */

/**
 * Convenience wrapper that resolves the candidate row from the given user ID
 * then calls the shared credentials helper.
 */
export async function getCandidateCredentialsPage(
  userId: number,
  page: number,
  pageSize: number,
  sort: 'title' | 'category' | 'issuer' | 'status' | 'createdAt',
  order: 'asc' | 'desc',
  searchTerm: string,
): Promise<PageResult<CandidateCredentialRow> & { statusCounts: StatusCounts }> {
  const [cand] = await db
    .select({ id: candidates.id })
    .from(candidates)
    .where(eq(candidates.userId, userId))
    .limit(1)

  if (!cand) {
    return {
      rows: [],
      hasNext: false,
      statusCounts: {
        verified: 0,
        pending: 0,
        rejected: 0,
        unverified: 0,
      },
    }
  }

  return getCandidateCredentialsSection(cand.id, page, pageSize, sort, order, searchTerm)
}
