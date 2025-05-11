import { redirect } from 'next/navigation'

import { eq, sql } from 'drizzle-orm'
import { KeyRound } from 'lucide-react'

import { CreateDidButton } from '@/app/(dashboard)/candidate/create-did/create-did-button'
import { AppModal } from '@/components/ui/app-modal'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import PageCard from '@/components/ui/page-card'
import { UserAvatar } from '@/components/ui/user-avatar'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { teamMembers, users as usersT, teams } from '@/lib/db/schema/core'

export const revalidate = 0

type Member = {
  id: number
  name: string | null
  email: string
}

const MAX_DISPLAY = 5

/**
 * Server component that renders the "Create DID” workflow for the
 * current user’s workspace; reused by Candidate, Issuer and Recruiter
 * dashboards to enforce a single, consistent flow.
 */
export default async function CreateDidPage() {
  const user = await requireAuth()

  /* ------------------------------------------------------------ */
  /*                        T E A M   C H E C K                   */
  /* ------------------------------------------------------------ */
  const [membership] = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, user.id))
    .limit(1)

  if (!membership?.teamId) redirect('/dashboard')

  /* Existing DID? -------------------------------------------------------- */
  const [{ did } = {}] = await db
    .select({ did: teams.did })
    .from(teams)
    .where(eq(teams.id, membership.teamId))
    .limit(1)

  if (did) {
    return (
      <AppModal
        iconKey='keyround'
        title='Team DID Already Registered'
        description='Your workspace already owns a Decentralised Identifier; you cannot register another one.'
        buttonText='Go to Dashboard'
        redirectTo='/dashboard'
        required
      />
    )
  }

  /* ------------------------------------------------------------ */
  /*                    M E M B E R   D I S P L A Y               */
  /* ------------------------------------------------------------ */
  let members: Member[] = []
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(teamMembers)
    .where(eq(teamMembers.teamId, membership.teamId))

  const rows = await db
    .select({
      id: usersT.id,
      name: usersT.name,
      email: usersT.email,
    })
    .from(teamMembers)
    .innerJoin(usersT, eq(teamMembers.userId, usersT.id))
    .where(eq(teamMembers.teamId, membership.teamId))
    .limit(MAX_DISPLAY)

  members = rows.map((r) => ({ id: r.id, name: r.name, email: r.email }))

  if (!members.some((m) => m.id === user.id)) {
    members.unshift({ id: user.id, name: user.name, email: user.email })
    members = members.slice(0, MAX_DISPLAY)
  }

  const overflow = Math.max(count - members.length, 0)

  /* ------------------------------------------------------------ */
  /*                            V I E W                           */
  /* ------------------------------------------------------------ */
  return (
    <PageCard
      icon={KeyRound}
      title='Register your Team DID'
      description='Unlock verifiable credentials and sign them as a team.'
    >
      <div className='space-y-6'>
        {/* Avatars */}
        <div className='flex -space-x-3'>
          {members.map((m) => (
            <HoverCard key={m.id}>
              <HoverCardTrigger asChild>
                <UserAvatar
                  name={m.name}
                  email={m.email}
                  className='border-background ring-background size-10 cursor-pointer rounded-full border-2 shadow'
                />
              </HoverCardTrigger>
              <HoverCardContent className='w-48 text-sm'>
                {m.name ?? 'Unnamed'}
                <br />
                <span className='text-muted-foreground text-xs break-all'>{m.email}</span>
              </HoverCardContent>
            </HoverCard>
          ))}

          {overflow > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className='border-background bg-muted text-muted-foreground flex size-10 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-medium'>
                  +{overflow}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className='w-48 text-sm'>
                {overflow} more member{overflow > 1 ? 's' : ''}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        <p className='text-sm leading-relaxed'>
          A Decentralised Identifier (DID) acts like a verified username for your company. Once
          registered, your team can issue <span className='font-semibold'>signed</span> credentials
          that employers, clients, and platforms can trust instantly.
        </p>

        <CreateDidButton />
      </div>
    </PageCard>
  )
}
