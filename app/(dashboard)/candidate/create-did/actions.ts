'use server'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { getUserWithTeam } from '@/lib/db/queries/queries'
import { teams, teamMembers } from '@/lib/db/schema'
import { POLKADOT_DID_REGEX } from '@/lib/utils/address'

/**
 * Persist a freshly created Polkadot DID for the caller’s team.
 *
 * The caller must be an owner of the team.  Ownership of the address is now
 * enforced on-chain by the DidRegistry contract, so we only validate format.
 */
export const createDidAction = validatedActionWithUser(
  z.object({
    did: z.string().regex(POLKADOT_DID_REGEX, 'Invalid Polkadot DID (expected did:polkadot:0x…)'),
  }),
  async ({ did }, _formData, user) => {
    /* ------------------------------------------------------------ */
    /*                  R E S O L V E   T E A M                     */
    /* ------------------------------------------------------------ */
    const userWithTeam = await getUserWithTeam(user.id)
    if (!userWithTeam?.teamId) {
      return { error: "You don't belong to a team." }
    }

    /* Confirm the caller is an owner on that team */
    const [membership] = await db
      .select()
      .from(teamMembers)
      .where(and(eq(teamMembers.userId, user.id), eq(teamMembers.teamId, userWithTeam.teamId)))
      .limit(1)

    if (membership?.role !== 'owner') {
      return { error: 'Only team owners can set a DID.' }
    }

    /* ------------------------------------------------------------ */
    /*                E X I S T I N G   D I D  C H E C K            */
    /* ------------------------------------------------------------ */
    const [team] = await db
      .select({ id: teams.id, did: teams.did })
      .from(teams)
      .where(eq(teams.id, userWithTeam.teamId))
      .limit(1)

    if (!team) return { error: 'Team not found.' }
    if (team.did) return { error: 'Your team already has a DID.' }

    /* ------------------------------------------------------------ */
    /*                      P E R S I S T                           */
    /* ------------------------------------------------------------ */
    await db.update(teams).set({ did }).where(eq(teams.id, team.id))

    return { success: 'Team DID saved.' }
  },
)
