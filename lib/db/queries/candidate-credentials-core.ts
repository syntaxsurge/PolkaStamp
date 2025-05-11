import { eq, ilike, and, sql } from 'drizzle-orm'

import { db } from '@/lib/db/drizzle'
import { candidateCredentials, CredentialStatus } from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'
import type { StatusCounts } from '@/lib/types/candidate'
import type { CandidateCredentialRow, PageResult } from '@/lib/types/tables'

import { buildOrderExpr, paginate } from './query-helpers'

/* -------------------------------------------------------------------------- */
/*                S H A R E D   C A N D I D A T E   C R E D S                 */
/* -------------------------------------------------------------------------- */

export async function getCandidateCredentialsSection(
  candidateId: number,
  page: number,
  pageSize: number,
  sort: 'title' | 'category' | 'issuer' | 'status' | 'createdAt' = 'status',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<PageResult<CandidateCredentialRow> & { statusCounts: StatusCounts }> {
  /* ----------------------------- Status counts ---------------------------- */
  const [counts] = await db
    .select({
      verified:
        sql<number>`SUM(CASE WHEN ${candidateCredentials.status} = 'verified' THEN 1 ELSE 0 END)`.as(
          'verified',
        ),
      pending:
        sql<number>`SUM(CASE WHEN ${candidateCredentials.status} = 'pending' THEN 1 ELSE 0 END)`.as(
          'pending',
        ),
      rejected:
        sql<number>`SUM(CASE WHEN ${candidateCredentials.status} = 'rejected' THEN 1 ELSE 0 END)`.as(
          'rejected',
        ),
      unverified:
        sql<number>`SUM(CASE WHEN ${candidateCredentials.status} = 'unverified' THEN 1 ELSE 0 END)`.as(
          'unverified',
        ),
    })
    .from(candidateCredentials)
    .where(eq(candidateCredentials.candidateId, candidateId))

  /* ---------------------------- ORDER BY helper -------------------------- */
  const sortMap = {
    title: candidateCredentials.title,
    category: candidateCredentials.category,
    issuer: issuers.name,
    status: candidateCredentials.status,
    createdAt: candidateCredentials.createdAt,
  } as const
  const orderBy = buildOrderExpr(sortMap, sort, order)

  /* ------------------------------ WHERE clause --------------------------- */
  const term = searchTerm.trim()
  const whereExpr =
    term.length === 0
      ? eq(candidateCredentials.candidateId, candidateId)
      : and(
          eq(candidateCredentials.candidateId, candidateId),
          ilike(candidateCredentials.title, `%${term}%`),
        )

  /* ------------------------------- Query --------------------------------- */
  const baseQuery = db
    .select({
      id: candidateCredentials.id,
      title: candidateCredentials.title,
      category: candidateCredentials.category,
      type: candidateCredentials.type,
      issuer: issuers.name,
      status: candidateCredentials.status,
      fileUrl: candidateCredentials.fileUrl,
      txHash: candidateCredentials.txHash,
      vcJson: candidateCredentials.vcJson,
    })
    .from(candidateCredentials)
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))
    .where(whereExpr as any)
    .orderBy(orderBy)

  const { rows: rawRows, hasNext } = await paginate<CandidateCredentialRow>(
    baseQuery as any,
    page,
    pageSize,
  )

  const rows: CandidateCredentialRow[] = rawRows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    type: r.type,
    issuer: r.issuer ?? null,
    status: r.status as CredentialStatus,
    fileUrl: r.fileUrl ?? null,
    txHash: r.txHash ?? null,
    vcJson: r.vcJson ?? null,
  }))

  return { rows, hasNext, statusCounts: counts as StatusCounts }
}
