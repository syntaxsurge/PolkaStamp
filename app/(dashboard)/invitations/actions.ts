'use server'

import { revalidatePath } from 'next/cache'

import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { invitations, teamMembers, activityLogs, ActivityType } from '@/lib/db/schema'

/* -------------------------------------------------------------------------- */
/*                                  A C C E P T                               */
/* -------------------------------------------------------------------------- */

const acceptSchema = z.object({ invitationId: z.coerce.number() })

/**
 * Accept an invitation, ensuring the user is associated with exactly one team.
 * If a membership already exists it is updated (team, role, joinedAt); otherwise a new membership is created.
 */
const _acceptInvitation = validatedActionWithUser(
  acceptSchema,
  async ({ invitationId }, _formData, user) => {
    /* Validate pending invitation addressed to the current user */
    const [inv] = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.id, invitationId),
          eq(invitations.email, user.email),
          eq(invitations.status, 'pending'),
        ),
      )
      .limit(1)

    if (!inv) return { error: 'Invitation not found or already handled.' }

    await db.transaction(async (tx) => {
      /* ------------------------------------------------------------------ */
      /* Ensure single team membership                                      */
      /* ------------------------------------------------------------------ */
      const [existingMember] = await tx
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.userId, user.id))
        .limit(1)

      if (existingMember) {
        /* Update current membership to point to the invited team */
        await tx
          .update(teamMembers)
          .set({
            teamId: inv.teamId,
            role: inv.role,
            joinedAt: sql`CURRENT_TIMESTAMP`,
          })
          .where(eq(teamMembers.id, existingMember.id))
      } else {
        /* Fallback: create membership if somehow none exists */
        await tx.insert(teamMembers).values({
          userId: user.id,
          teamId: inv.teamId,
          role: inv.role,
        })
      }

      /* Mark invitation as accepted */
      await tx.update(invitations).set({ status: 'accepted' }).where(eq(invitations.id, inv.id))

      /* Log activity */
      await tx.insert(activityLogs).values({
        teamId: inv.teamId,
        userId: user.id,
        action: ActivityType.ACCEPT_INVITATION,
      })
    })

    revalidatePath('/invitations')
    return { success: 'Invitation accepted — you are now a team member.' }
  },
)

export const acceptInvitationAction = async (...args: Parameters<typeof _acceptInvitation>) => {
  'use server'
  return _acceptInvitation(...args)
}

/* -------------------------------------------------------------------------- */
/*                                 D E C L I N E                              */
/* -------------------------------------------------------------------------- */

const declineSchema = z.object({ invitationId: z.coerce.number() })

const _declineInvitation = validatedActionWithUser(
  declineSchema,
  async ({ invitationId }, _formData, user) => {
    const res = await db
      .update(invitations)
      .set({ status: 'declined' })
      .where(
        and(
          eq(invitations.id, invitationId),
          eq(invitations.email, user.email),
          eq(invitations.status, 'pending'),
        ),
      )
      .returning({ id: invitations.id }) // ensure affected rows are returned

    if (res.length === 0) return { error: 'Invitation not found or already handled.' }

    revalidatePath('/invitations')
    return { success: 'Invitation declined.' }
  },
)

export const declineInvitationAction = async (...args: Parameters<typeof _declineInvitation>) => {
  'use server'
  return _declineInvitation(...args)
}

/* -------------------------------------------------------------------------- */
/*                                 D E L E T E                                */
/* -------------------------------------------------------------------------- */

const deleteSchema = z.object({ invitationId: z.coerce.number() })

const _deleteInvitation = validatedActionWithUser(
  deleteSchema,
  async ({ invitationId }, _formData, user) => {
    const res = await db
      .delete(invitations)
      .where(and(eq(invitations.id, invitationId), eq(invitations.email, user.email)))
      .returning({ id: invitations.id })

    if (res.length === 0) return { error: 'Invitation not found or unauthorized.' }

    revalidatePath('/invitations')
    return { success: 'Invitation deleted.' }
  },
)

export const deleteInvitationAction = async (...args: Parameters<typeof _deleteInvitation>) => {
  'use server'
  return _deleteInvitation(...args)
}
