import { eq } from 'drizzle-orm'

import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getTeamMembersPage } from '@/lib/db/queries/team-members'
import { teamMembers, teams } from '@/lib/db/schema/core'
import { getTableParams, resolveSearchParams, type Query } from '@/lib/utils/query'

import { Settings } from './settings'

export const revalidate = 0

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default async function TeamSettingsPage({
  searchParams,
}: {
  searchParams?: Promise<Query>
}) {
  const params = await resolveSearchParams(searchParams)

  const user = await requireAuth()

  /* --------------------------- Locate team ------------------------------- */
  const [membership] = await db
    .select({ teamId: teamMembers.teamId, role: teamMembers.role })
    .from(teamMembers)
    .where(eq(teamMembers.userId, user.id))
    .limit(1)

  let teamId = membership?.teamId
  if (!teamId) {
    const [personal] = await db
      .select({ id: teams.id })
      .from(teams)
      .where(eq(teams.creatorUserId, user.id))
      .limit(1)
    teamId = personal?.id
  }
  if (!teamId) throw new Error('Team not found')

  const [team] = await db
    .select({
      id: teams.id,
      planName: teams.planName,
      subscriptionPaidUntil: teams.subscriptionPaidUntil,
      did: teams.did,
    })
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1)

  /* -------------------- Pagination / sort / search ---------------------- */
  const { page, pageSize, sort, order, searchTerm, initialParams } = getTableParams(
    params,
    ['name', 'email', 'role', 'joinedAt'] as const,
    'joinedAt',
  )

  /* ------------------------------ Data ---------------------------------- */
  const { members, hasNext } = await getTeamMembersPage(
    teamId,
    page,
    pageSize,
    sort as 'name' | 'email' | 'role' | 'joinedAt',
    order as 'asc' | 'desc',
    searchTerm,
  )

  const rows = members.map((m) => ({
    id: m.id,
    name: m.name ?? '—',
    email: m.email,
    walletAddress: (m as any).walletAddress ?? null,
    role: m.role,
    joinedAt: new Date(m.joinedAt).toISOString(),
  }))

  const isOwner = membership?.role === 'owner'

  /* ------------------------------ View ---------------------------------- */
  return (
    <Settings
      team={team}
      rows={rows}
      isOwner={!!isOwner}
      page={page}
      hasNext={hasNext}
      pageSize={pageSize}
      sort={sort}
      order={order as 'asc' | 'desc'}
      searchQuery={searchTerm}
      basePath='/settings/team'
      initialParams={initialParams}
    />
  )
}
