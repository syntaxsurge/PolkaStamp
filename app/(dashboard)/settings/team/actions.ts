'use server'

import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { teamMembers } from '@/lib/db/schema/core'

const updateMemberSchema = z.object({
  memberId: z.coerce.number(),
  role: z.string().trim().min(1).max(50),
})

export const updateTeamMemberRoleAction = validatedActionWithUser(
  updateMemberSchema,
  async ({ memberId, role }, _formData, user) => {
    /* Fetch the member row to locate the team */
    const [member] = await db
      .select({
        teamId: teamMembers.teamId,
        userId: teamMembers.userId,
      })
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1)

    if (!member) return { error: 'Member not found.' }

    /* Verify caller is an owner on the same team */
    const ownerRows = await db
      .select()
      .from(teamMembers)
      .where(
        and(
          eq(teamMembers.teamId, member.teamId),
          eq(teamMembers.userId, user.id),
          eq(teamMembers.role, 'owner'),
        ),
      )
      .limit(1)

    if (ownerRows.length === 0) return { error: 'Unauthorized.' }

    await db.update(teamMembers).set({ role }).where(eq(teamMembers.id, memberId))

    return { success: 'Member updated.' }
  },
)
