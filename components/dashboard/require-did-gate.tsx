import type { ReactNode } from 'react'

import { eq } from 'drizzle-orm'

import { AppModal } from '@/components/ui/app-modal'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { teamMembers, teams } from '@/lib/db/schema/core'

type Props = {
  /** Page content rendered only when a DID exists */
  children: ReactNode
  /**
   * Explicit path where the user can register a DID.
   * Falls back to a role-specific default when omitted.
   */
  createPath?: string
}

/**
 * Server component that enforces the presence of a DID for the
 * caller’s workspace.  When no DID is found it renders a blocking modal
 * with a single "Create DID” CTA; otherwise it transparently renders
 * the provided children.
 */
export default async function RequireDidGate({ children, createPath }: Props) {
  const user = await requireAuth()

  /* Lookup team DID (shared across all roles) */
  const [{ did } = {}] = await db
    .select({ did: teams.did })
    .from(teamMembers)
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, user.id))
    .limit(1)

  /* Block when missing */
  if (!did) {
    const fallback =
      createPath ??
      (user.role === 'issuer'
        ? '/issuer/create-did'
        : user.role === 'recruiter'
          ? '/recruiter/create-did'
          : '/candidate/create-did')

    return (
      <AppModal
        iconKey='keyround'
        title='DID Required'
        description='You need to register a Decentralised Identifier (DID) for your team before you can continue.'
        buttonText='Create DID'
        redirectTo={fallback}
        required
      />
    )
  }

  return <>{children}</>
}
