import { asc, desc, ilike, or, and, eq } from 'drizzle-orm'
import { ShieldCheck } from 'lucide-react'

import IssuerFilters from '@/components/issuer-directory/issuer-filters'
import IssuersTable from '@/components/issuer-directory/issuers-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { db } from '@/lib/db/drizzle'
import { issuers, IssuerStatus, IssuerCategory, IssuerIndustry } from '@/lib/db/schema/issuer'
import type { IssuerDirectoryRow } from '@/lib/types/tables'
import { getTableParams, getParam, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

export default async function IssuerDirectoryPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  const params = await resolveSearchParams(searchParams)

  /* ------------------------- Table parameters --------------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'domain', 'category', 'industry', 'createdAt'] as const,
    'name',
  )

  /* -------------------------- Filter params ----------------------------- */
  const categoryFilter = getParam(params, 'category')
  const industryFilter = getParam(params, 'industry')

  type IssuerCategoryType = (typeof IssuerCategory)[keyof typeof IssuerCategory]
  type IssuerIndustryType = (typeof IssuerIndustry)[keyof typeof IssuerIndustry]

  const validCategory: IssuerCategoryType | undefined =
    categoryFilter && (Object.values(IssuerCategory) as string[]).includes(categoryFilter)
      ? (categoryFilter as IssuerCategoryType)
      : undefined

  const validIndustry: IssuerIndustryType | undefined =
    industryFilter && (Object.values(IssuerIndustry) as string[]).includes(industryFilter)
      ? (industryFilter as IssuerIndustryType)
      : undefined

  /* ------------------------------ Sort ---------------------------------- */
  const sortMap = {
    name: issuers.name,
    domain: issuers.domain,
    category: issuers.category,
    industry: issuers.industry,
    createdAt: issuers.createdAt,
  } as const

  const orderExpr =
    order === 'asc'
      ? asc(sortMap[sort as keyof typeof sortMap])
      : desc(sortMap[sort as keyof typeof sortMap])

  /* ------------------------------ Where --------------------------------- */
  let whereExpr: any = eq(issuers.status, IssuerStatus.ACTIVE)

  if (validCategory) whereExpr = and(whereExpr, eq(issuers.category, validCategory as any))
  if (validIndustry) whereExpr = and(whereExpr, eq(issuers.industry, validIndustry as any))

  if (searchTerm) {
    const searchCond = or(
      ilike(issuers.name, `%${searchTerm}%`),
      ilike(issuers.domain, `%${searchTerm}%`),
      ilike(issuers.category, `%${searchTerm}%`),
      ilike(issuers.industry, `%${searchTerm}%`),
    )
    whereExpr = and(whereExpr, searchCond)
  }

  /* ------------------------------ Query --------------------------------- */
  const offset = (page - 1) * pageSize
  const rowsRaw = await db
    .select()
    .from(issuers)
    .where(whereExpr)
    .orderBy(orderExpr)
    .limit(pageSize + 1)
    .offset(offset)

  const hasNext = rowsRaw.length > pageSize
  if (hasNext) rowsRaw.pop()

  const rows: IssuerDirectoryRow[] = rowsRaw.map((i) => ({
    id: i.id,
    name: i.name,
    domain: i.domain,
    category: i.category,
    industry: i.industry,
    status: i.status,
    logoUrl: i.logoUrl,
    did: i.did ?? null,
    createdAt: i.createdAt?.toISOString() ?? '',
  }))

  /* ------------------------------ View ---------------------------------- */
  return (
    <PageCard
      icon={ShieldCheck}
      title='Verified Issuers'
      description='Browse all verified organisations. Use the search box, category and industry filters, sortable headers, and pagination controls to quickly locate issuers.'
    >
      <div className='space-y-4 overflow-x-auto'>
        <IssuerFilters
          basePath='/issuers'
          initialParams={initialParams}
          categories={Object.values(IssuerCategory)}
          industries={Object.values(IssuerIndustry)}
          selectedCategory={validCategory ?? ''}
          selectedIndustry={validIndustry ?? ''}
        />

        <IssuersTable
          rows={rows}
          sort={sort}
          order={order}
          basePath='/issuers'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/issuers'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
