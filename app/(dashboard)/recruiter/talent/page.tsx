import { Users } from 'lucide-react'

import TalentFilters from '@/components/dashboard/recruiter/talent-filters'
import TalentTable from '@/components/dashboard/recruiter/talent-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { getTalentSearchPage } from '@/lib/db/queries/recruiter-talent'
import type { TalentRow } from '@/lib/types/tables'
import { getTableParams, getParam, resolveSearchParams, type Query } from '@/lib/utils/query'

export const revalidate = 0

/**
 * Recruiter → Talent search page with advanced filters.
 * Utilises `getTableParams` to keep pagination, sorting and search logic DRY.
 */
export default async function TalentSearchPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  const params = await resolveSearchParams(searchParams)

  /* -------------------------- Table helpers --------------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'email', 'id'] as const,
    'name',
  )

  /* -------------- Additional numeric / boolean filters --------------- */
  const verifiedOnly = getParam(params, 'verifiedOnly') === '1'
  const skillMin = Math.max(0, Number(getParam(params, 'skillMin') ?? '0'))
  const skillMax = Math.min(100, Number(getParam(params, 'skillMax') ?? '100'))

  /* ----------------------------- Data --------------------------------- */
  const { candidates, hasNext } = await getTalentSearchPage(
    page,
    pageSize,
    sort as 'name' | 'email' | 'id',
    order,
    searchTerm,
    verifiedOnly,
    skillMin,
    skillMax,
  )

  const rows: TalentRow[] = candidates.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    bio: c.bio,
    verified: c.verified,
    topScore: c.topScore,
  }))

  /* ----------------------------- View --------------------------------- */
  return (
    <section className='mx-auto max-w-6xl py-10'>
      <PageCard
        icon={Users}
        title='Talent Search'
        description='Discover and shortlist qualified candidates.'
      >
        <div className='space-y-6'>
          {/* Filters */}
          <TalentFilters
            basePath='/recruiter/talent'
            initialParams={initialParams}
            skillMin={skillMin}
            skillMax={skillMax}
            verifiedOnly={verifiedOnly}
          />

          {/* Results */}
          <TalentTable
            rows={rows}
            sort={sort}
            order={order as 'asc' | 'desc'}
            basePath='/recruiter/talent'
            initialParams={{
              ...initialParams,
              skillMin: String(skillMin),
              skillMax: String(skillMax),
              verifiedOnly: verifiedOnly ? '1' : '',
            }}
            searchQuery={searchTerm}
          />

          <TablePagination
            page={page}
            hasNext={hasNext}
            basePath='/recruiter/talent'
            initialParams={{
              ...initialParams,
              skillMin: String(skillMin),
              skillMax: String(skillMax),
              verifiedOnly: verifiedOnly ? '1' : '',
            }}
            pageSize={pageSize}
          />
        </div>
      </PageCard>
    </section>
  )
}
