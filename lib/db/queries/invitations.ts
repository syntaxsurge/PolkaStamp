import { eq, and } from 'drizzle-orm'

import type { InvitationRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { buildOrderExpr, buildSearchCondition, paginate } from './query-helpers'
import { invitations, teams, users } from '../schema/core'

/**
 * Return a page of invitations addressed to the given email with optional
 * full-text search, sorting and pagination.
 */
export async function getInvitationsPage(
  email: string,
  page: number,
  pageSize = 10,
  sortBy: 'team' | 'role' | 'inviter' | 'status' | 'invitedAt' = 'invitedAt',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ invitations: InvitationRow[]; hasNext: boolean }> {
  /* --------------------------- ORDER BY -------------------------------- */
  const sortMap = {
    team: teams.name,
    role: invitations.role,
    inviter: users.email,
    status: invitations.status,
    invitedAt: invitations.invitedAt,
  } as const

  const orderBy = buildOrderExpr(sortMap, sortBy, order)

  /* ---------------------------- WHERE ---------------------------------- */
  const searchCond = buildSearchCondition(searchTerm, [
    teams.name,
    invitations.role,
    users.email,
    invitations.status,
  ])

  const whereClause = searchCond
    ? and(eq(invitations.email, email), searchCond)
    : eq(invitations.email, email)

  /* ----------------------------- QUERY --------------------------------- */
  const baseQuery = db
    .select({
      id: invitations.id,
      team: teams.name,
      role: invitations.role,
      inviter: users.email,
      status: invitations.status,
      invitedAt: invitations.invitedAt,
    })
    .from(invitations)
    .leftJoin(teams, eq(invitations.teamId, teams.id))
    .leftJoin(users, eq(invitations.invitedBy, users.id))
    .where(whereClause as any)
    .orderBy(orderBy)

  const { rows, hasNext } = await paginate<InvitationRow>(baseQuery as any, page, pageSize)

  return { invitations: rows as InvitationRow[], hasNext }
}
