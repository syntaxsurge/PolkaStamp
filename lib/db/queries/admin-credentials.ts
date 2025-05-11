import { eq } from 'drizzle-orm'

import type { AdminCredentialRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { getPaginatedList } from './query-helpers'
import { candidateCredentials, candidates } from '../schema/candidate'
import { users } from '../schema/core'
import { issuers } from '../schema/issuer'

/* -------------------------------------------------------------------------- */
/*                      A D M I N   C R E D E N T I A L S                     */
/* -------------------------------------------------------------------------- */

export async function getAdminCredentialsPage(
  page: number,
  pageSize = 10,
  sortBy: 'title' | 'candidate' | 'issuer' | 'status' | 'id' = 'id',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ credentials: AdminCredentialRow[]; hasNext: boolean }> {
  const sortMap = {
    title: candidateCredentials.title,
    candidate: users.email,
    issuer: issuers.name,
    status: candidateCredentials.status,
    id: candidateCredentials.id,
  } as const

  const baseQuery = db
    .select({
      id: candidateCredentials.id,
      title: candidateCredentials.title,
      status: candidateCredentials.status,
      candidate: users.email,
      issuer: issuers.name,
      vcJson: candidateCredentials.vcJson,
    })
    .from(candidateCredentials)
    .leftJoin(candidates, eq(candidateCredentials.candidateId, candidates.id))
    .leftJoin(users, eq(candidates.userId, users.id))
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))

  const { rows, hasNext } = await getPaginatedList<AdminCredentialRow>(
    baseQuery,
    page,
    pageSize,
    sortBy,
    sortMap,
    order,
    searchTerm,
    [candidateCredentials.title, users.email, issuers.name],
  )

  return { credentials: rows, hasNext }
}
