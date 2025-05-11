/**
 * Shared helpers for pages that read Next.js searchParams.
 * Keeps all tiny utilities in one place to avoid repetition.
 */
export type Query = Record<string, string | string[] | undefined>

/* -------------------------------------------------------------------------- */
/*                               Core helpers                                 */
/* -------------------------------------------------------------------------- */

/** Safely return the first (string) value of a query param. */
export function getParam(params: Query, key: string): string | undefined {
  const v = params[key]
  return Array.isArray(v) ? v[0] : v
}

/**
 * Uniformly resolve the `searchParams` that Next.js can pass either as an
 * object or a `Promise` of that object (depending on framework version).
 */
export async function resolveSearchParams(searchParams?: Query | Promise<Query>): Promise<Query> {
  if (!searchParams) return {}
  return (searchParams as any).then
    ? await (searchParams as Promise<Query>)
    : (searchParams as Query)
}

/**
 * Return a shallow object containing only the specified keys whose values
 * exist (and are non-empty) in the supplied `Query`. Useful for preserving
 * pagination, sort and filter state in URL constructions.
 */
export function pickParams(params: Query, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const k of keys) {
    const val = getParam(params, k)
    if (val !== undefined && val !== '') {
      out[k] = val
    }
  }
  return out
}

/* -------------------------------------------------------------------------- */
/*                         Extended helper utilities                          */
/* -------------------------------------------------------------------------- */

/** Globally-accepted page sizes for data tables. */
const PAGE_SIZES = [10, 20, 50] as const
export type PageSize = (typeof PAGE_SIZES)[number]

export interface Pagination {
  page: number
  pageSize: PageSize
}

/**
 * Parse page and size query-string values into a validated Pagination object
 * with sensible fall-backs.
 */
export function parsePagination(params: Query, defaultSize: PageSize = 10): Pagination {
  const page = Math.max(1, Number(getParam(params, 'page') ?? '1'))

  const sizeRaw = Number(getParam(params, 'size') ?? String(defaultSize))
  const pageSize = (PAGE_SIZES as readonly number[]).includes(sizeRaw)
    ? (sizeRaw as PageSize)
    : defaultSize

  return { page, pageSize }
}

export interface Sort {
  sort: string
  order: 'asc' | 'desc'
}

/**
 * Clamp sort to allowed keys and normalise order to the canonical
 * 'asc' | 'desc' strings.
 */
export function parseSort(params: Query, allowed: readonly string[], fallback: string): Sort {
  const sortRaw = getParam(params, 'sort') ?? fallback
  const sort = allowed.includes(sortRaw) ? sortRaw : fallback
  const order = getParam(params, 'order') === 'asc' ? 'asc' : 'desc'
  return { sort, order }
}

/** Extract and trim the q search term. */
export function getSearchTerm(params: Query): string {
  return (getParam(params, 'q') ?? '').trim()
}

/* -------------------------------------------------------------------------- */
/*                            Table-param bundle                              */
/* -------------------------------------------------------------------------- */

export interface TableParams extends Pagination, Sort {
  searchTerm: string
  initialParams: Record<string, string>
}

/**
 * Reduces boilerplate in page components that render data tables by applying
 * the common trio of pagination → sort → search parsing steps and preparing
 * the initialParams object used to persist state across navigation.
 */
export function getTableParams(
  params: Query,
  allowedSort: readonly string[],
  defaultSort: string,
): TableParams {
  const { page, pageSize } = parsePagination(params)
  const { sort, order } = parseSort(params, allowedSort, defaultSort)
  const searchTerm = getSearchTerm(params)
  const initialParams = pickParams(params, ['size', 'sort', 'order', 'q'])
  return { page, pageSize, sort, order, searchTerm, initialParams }
}

/* -------------------------------------------------------------------------- */
/*                       Prefixed section-param helper                        */
/* -------------------------------------------------------------------------- */

export interface SectionParams extends Pagination, Sort {
  searchTerm: string
  initialParams: Record<string, string>
}

/**
 * Generic parser for paginated sections that prefix their query keys
 * (e.g. passPage, passSize, passSort, passOrder, passQ).
 *
 * @param params       Raw query-object
 * @param prefix       Prefix string (e.g. 'pass', 'pipe')
 * @param allowedSort  Whitelisted sort keys
 * @param defaultSort  Fallback sort column
 */
export function getSectionParams(
  params: Query,
  prefix: string,
  allowedSort: readonly string[],
  defaultSort: string,
): SectionParams {
  const page = Math.max(1, Number(getParam(params, `${prefix}Page`) ?? '1'))

  const sizeRaw = Number(getParam(params, `${prefix}Size`) ?? '10')
  const pageSize = (PAGE_SIZES as readonly number[]).includes(sizeRaw) ? (sizeRaw as PageSize) : 10

  const sortRaw = getParam(params, `${prefix}Sort`) ?? defaultSort
  const sort = allowedSort.includes(sortRaw) ? sortRaw : defaultSort

  const order = getParam(params, `${prefix}Order`) === 'asc' ? 'asc' : 'desc'
  const searchTerm = (getParam(params, `${prefix}Q`) ?? '').trim()

  const initialParams = pickParams(params, [
    `${prefix}Size`,
    `${prefix}Sort`,
    `${prefix}Order`,
    `${prefix}Q`,
  ])

  return { page, pageSize, sort, order, searchTerm, initialParams }
}
