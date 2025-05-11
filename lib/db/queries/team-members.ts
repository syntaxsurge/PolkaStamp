import { eq, and } from 'drizzle-orm'

import type { MemberRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { buildOrderExpr, buildSearchCondition, paginate } from './query-helpers'
import { teamMembers, users } from '../schema/core'

/**
 * Return a single page of team members with optional search, sorting and pagination.
 */
export async function getTeamMembersPage(
  teamId: number,
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'email' | 'role' | 'joinedAt' = 'joinedAt',
  order: 'asc' | 'desc' = 'asc',
  searchTerm = '',
): Promise<{ members: MemberRow[]; hasNext: boolean }> {
  /* ----------------------------- ORDER BY -------------------------------- */
  const sortMap = {
    name: users.name,
    email: users.email,
    role: teamMembers.role,
    joinedAt: teamMembers.joinedAt,
  } as const

  const orderBy = buildOrderExpr(sortMap, sortBy, order)

  /* ------------------------------ WHERE ---------------------------------- */
  const base = eq(teamMembers.teamId, teamId)
  const searchCond = buildSearchCondition(searchTerm, [users.name, users.email, teamMembers.role])
  const whereClause = searchCond ? and(base, searchCond) : base

  /* ------------------------------ QUERY ---------------------------------- */
  const baseQuery = db
    .select({
      id: teamMembers.id,
      name: users.name,
      email: users.email,
      walletAddress: users.walletAddress,
      role: teamMembers.role,
      joinedAt: teamMembers.joinedAt,
    })
    .from(teamMembers)
    .leftJoin(users, eq(teamMembers.userId, users.id))
    .where(whereClause as any)
    .orderBy(orderBy)

  const { rows, hasNext } = await paginate<MemberRow>(baseQuery as any, page, pageSize)

  return { members: rows as MemberRow[], hasNext }
}
