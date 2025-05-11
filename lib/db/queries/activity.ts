import { eq, and } from 'drizzle-orm'

import type { ActivityLogRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { buildOrderExpr, buildSearchCondition, paginate } from './query-helpers'
import { activityLogs, ActivityType } from '../schema/core'

/**
 * Fetch a page of activity logs with optional full-text search, pagination and sorting.
 */
export async function getActivityLogsPage(
  userId: number,
  page: number,
  pageSize = 10,
  sortBy: 'timestamp' | 'action' = 'timestamp',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ logs: ActivityLogRow[]; hasNext: boolean }> {
  /* --------------------------- ORDER BY -------------------------------- */
  const sortMap = {
    action: activityLogs.action,
    timestamp: activityLogs.timestamp,
  } as const

  const orderBy = buildOrderExpr(sortMap, sortBy, order)

  /* ---------------------------- WHERE ---------------------------------- */
  const searchCond = buildSearchCondition(searchTerm, [activityLogs.action, activityLogs.ipAddress])
  const whereClause = searchCond
    ? and(eq(activityLogs.userId, userId), searchCond)
    : eq(activityLogs.userId, userId)

  /* ----------------------------- QUERY --------------------------------- */
  const base = db.select().from(activityLogs).where(whereClause).orderBy(orderBy)

  const { rows, hasNext } = await paginate<any>(base as any, page, pageSize)

  const logs: ActivityLogRow[] = rows.map((r: any) => ({
    id: r.id,
    type: r.action as ActivityType,
    ipAddress: r.ipAddress,
    timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : String(r.timestamp),
  }))

  return { logs, hasNext }
}
