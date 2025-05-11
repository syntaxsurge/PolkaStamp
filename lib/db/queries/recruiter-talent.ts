import type { TalentRow } from '@/lib/types/tables'

import { getCandidateListingPage } from './candidates-core'

/**
 * Recruiter-side talent search wrapper that re-uses the central
 * <code>getCandidateListingPage</code> helper for query execution.
 *
 * The exported function signature remains unchanged for downstream
 * consumers – it simply forwards all arguments to the shared helper.
 */
export async function getTalentSearchPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'email' | 'id' = 'name',
  order: 'asc' | 'desc' = 'asc',
  searchTerm = '',
  verifiedOnly = false,
  skillMin = 0,
  skillMax = 100,
): Promise<{ candidates: TalentRow[]; hasNext: boolean }> {
  return getCandidateListingPage(
    page,
    pageSize,
    sortBy,
    order,
    searchTerm,
    verifiedOnly,
    skillMin,
    skillMax,
  )
}
