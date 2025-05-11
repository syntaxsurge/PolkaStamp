import { eq } from 'drizzle-orm'
import { FileText } from 'lucide-react'

import AddCredentialDialog from '@/components/dashboard/candidate/add-credential-dialog'
import CandidateCredentialsTable from '@/components/dashboard/candidate/credentials-table'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getCandidateCredentialsPage } from '@/lib/db/queries/candidate-credentials'
import { teams, teamMembers } from '@/lib/db/schema/core'
import type { CandidateCredentialRow } from '@/lib/types/tables'
import { getTableParams, resolveSearchParams } from '@/lib/utils/query'

export const revalidate = 0

export default async function CredentialsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, any>>
}) {
  const params = await resolveSearchParams(searchParams)
  const user = await requireAuth(['candidate'])

  /* ----------------------- Team DID existence --------------------------- */
  const [{ did } = {}] = await db
    .select({ did: teams.did })
    .from(teamMembers)
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, user.id))
    .limit(1)
  const hasDid = !!did

  /* ----------------------- Server-action wrapper ------------------------ */
  const addCredentialAction = async (formData: FormData): Promise<{ error?: string } | void> => {
    'use server'
    return await (await import('./actions')).addCredential({}, formData)
  }

  /* ------------------- Table parameters via helper ---------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['status', 'title', 'issuer', 'category', 'type', 'id'] as const,
    'status',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { rows: credentialRows, hasNext } = await getCandidateCredentialsPage(
    user.id,
    page,
    pageSize,
    sort as any,
    order,
    searchTerm.toLowerCase(),
  )

  const rows: CandidateCredentialRow[] = credentialRows.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    type: c.type,
    issuer: c.issuer ?? null,
    status: c.status,
    fileUrl: null,
    txHash: c.txHash ?? null,
    vcJson: c.vcJson ?? null,
  }))

  /* ------------------------------ View ---------------------------------- */
  return (
    <PageCard
      icon={FileText}
      title='My Credentials'
      description='Add, organise, and track all of your verifiable credentials.'
      actions={<AddCredentialDialog addCredentialAction={addCredentialAction} hasDid={hasDid} />}
    >
      <div className='space-y-4 overflow-x-auto'>
        <CandidateCredentialsTable
          rows={rows}
          sort={sort}
          order={order}
          basePath='/candidate/credentials'
          initialParams={initialParams}
          searchQuery={searchTerm}
        />

        <TablePagination
          page={page}
          hasNext={hasNext}
          basePath='/candidate/credentials'
          initialParams={initialParams}
          pageSize={pageSize}
        />
      </div>
    </PageCard>
  )
}
