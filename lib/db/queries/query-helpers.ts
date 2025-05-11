import { asc, desc, ilike, or, type SQL } from 'drizzle-orm'

/* -------------------------------------------------------------------------- */
/*                               ORDER HELPERS                                */
/* -------------------------------------------------------------------------- */

/**
 * Build an ORDER BY expression from a map of sortable columns.
 */
export function buildOrderExpr<T extends Record<string, any>>(
  sortMap: T,
  sortKey: string,
  direction: 'asc' | 'desc' = 'asc',
) {
  const col = (sortMap as Record<string, any>)[sortKey] ?? Object.values(sortMap)[0]
  return direction === 'asc' ? asc(col) : desc(col)
}

/* -------------------------------------------------------------------------- */
/*                            SEARCH HELPERS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Build a full-text ILIKE search condition across multiple columns.
 *
 * Accepts Drizzle `SQL` fragments *or* column objects; everything is
 * coerced to `SQL<unknown>` internally for simplicity.
 */
export function buildSearchCondition(
  term: string,
  columns: (SQL<unknown> | unknown | undefined | null)[],
): SQL<unknown> | null {
  const t = term.trim()
  if (!t) return null

  /* Filter out falsy columns and generate `ILIKE` conditions */
  const conditions: SQL<unknown>[] = columns
    .filter(Boolean)
    .map((c) => ilike(c as SQL<unknown>, `%${t}%`))

  if (conditions.length === 0) return null

  /* Combine using OR while keeping the accumulator strongly typed */
  let combined: SQL<unknown> = conditions[0]
  for (let i = 1; i < conditions.length; i++) {
    combined = or(combined, conditions[i]) as SQL<unknown>
  }

  return combined
}

/* -------------------------------------------------------------------------- */
/*                              PAGINATION                                    */
/* -------------------------------------------------------------------------- */

export async function paginate<T>(
  q: any,
  page: number,
  pageSize: number,
): Promise<{ rows: T[]; hasNext: boolean }> {
  const offset = (page - 1) * pageSize
  const rows: T[] = await q.limit(pageSize + 1).offset(offset)
  const hasNext = rows.length > pageSize
  if (hasNext) rows.pop()
  return { rows, hasNext }
}

/* -------------------------------------------------------------------------- */
/*                        GENERIC PAGINATED LIST HELPER                       */
/* -------------------------------------------------------------------------- */

/**
 * Execute a paginated, optionally searchable and sortable query.
 *
 * @param baseQuery     Drizzle-select query to extend.
 * @param page          1-based page number.
 * @param pageSize      Rows per page (max-limit handled upstream).
 * @param sortBy        Requested sort key.
 * @param sortMap       Map of valid sort keys → Drizzle columns/SQL.
 * @param order         'asc' | 'desc' (default 'asc').
 * @param searchTerm    Raw search string (trimmed internally).
 * @param searchColumns Columns included in full-text search.
 */
export async function getPaginatedList<T>(
  baseQuery: any,
  page: number,
  pageSize: number,
  sortBy: string,
  sortMap: Record<string, any>,
  order: 'asc' | 'desc' = 'asc',
  searchTerm = '',
  searchColumns: (SQL<unknown> | unknown | undefined | null)[] = [],
): Promise<{ rows: T[]; hasNext: boolean }> {
  const orderBy = buildOrderExpr(sortMap, sortBy, order)
  const searchCond = buildSearchCondition(searchTerm, searchColumns)

  let q = baseQuery
  if (searchCond) q = q.where(searchCond)
  q = q.orderBy(orderBy)

  return paginate<T>(q as any, page, pageSize)
}
