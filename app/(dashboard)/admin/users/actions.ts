'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { activityLogs } from '@/lib/db/schema'
import {
  candidates,
  candidateCredentials,
  quizAttempts,
  CredentialStatus,
} from '@/lib/db/schema/candidate'
import { users, teams, teamMembers } from '@/lib/db/schema/core'
import { issuers } from '@/lib/db/schema/issuer'
import { recruiterPipelines, pipelineCandidates } from '@/lib/db/schema/recruiter'

/* ------------------------------------------------------------------ */
/*                         U P D A T E   U S E R                      */
/* ------------------------------------------------------------------ */
export const updateUserAction = validatedActionWithUser(
  z.object({
    userId: z.coerce.number(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(['candidate', 'recruiter', 'issuer', 'admin']),
  }),
  async ({ userId, name, email, role }, _formData, authUser) => {
    if (authUser.role !== 'admin') return { error: 'Unauthorized.' }

    // prevent admins from demoting themselves mid-session
    if (authUser.id === userId && role !== 'admin') {
      return { error: 'You cannot change your own role.' }
    }

    const updateData: Record<string, unknown> = {
      name: name.trim(),
      email: email.toLowerCase(),
      role,
    }

    await db.update(users).set(updateData).where(eq(users.id, userId))

    return { success: 'User updated.' }
  },
)

/* ------------------------------------------------------------------ */
/*                         D E L E T E   U S E R                      */
/* ------------------------------------------------------------------ */
export const deleteUserAction = validatedActionWithUser(
  z.object({
    userId: z.coerce.number(),
  }),
  async ({ userId }, _formData, authUser) => {
    if (authUser.role !== 'admin') return { error: 'Unauthorized.' }
    if (authUser.id === userId) return { error: 'You cannot delete your own account.' }

    await db.transaction(async (tx) => {
      /* Activity logs */
      await tx.delete(activityLogs).where(eq(activityLogs.userId, userId))

      /* Recruiter pipelines + members */
      const pipelines = await tx
        .select({ id: recruiterPipelines.id })
        .from(recruiterPipelines)
        .where(eq(recruiterPipelines.recruiterId, userId))

      if (pipelines.length) {
        const pipelineIds = pipelines.map((p) => p.id)
        await tx.delete(pipelineCandidates).where(eq(pipelineCandidates.pipelineId, pipelineIds[0]))
        await tx.delete(recruiterPipelines).where(eq(recruiterPipelines.id, pipelineIds[0]))
      }

      /* Candidate-side clean-up */
      const candRows = await tx
        .select({ id: candidates.id })
        .from(candidates)
        .where(eq(candidates.userId, userId))

      if (candRows.length) {
        const candId = candRows[0].id
        await tx.delete(quizAttempts).where(eq(quizAttempts.candidateId, candId))
        await tx.delete(candidateCredentials).where(eq(candidateCredentials.candidateId, candId))
        await tx.delete(candidates).where(eq(candidates.id, candId))
      }

      /* Issuer-side clean-up */
      const issuerRows = await tx
        .select({ id: issuers.id })
        .from(issuers)
        .where(eq(issuers.ownerUserId, userId))

      if (issuerRows.length) {
        const issuerId = issuerRows[0].id
        await tx
          .update(candidateCredentials)
          .set({
            issuerId: null,
            status: CredentialStatus.UNVERIFIED,
            verified: false,
            verifiedAt: null,
          })
          .where(eq(candidateCredentials.issuerId, issuerId))
        await tx.delete(issuers).where(eq(issuers.id, issuerId))
      }

      /* Remove all team memberships for the user */
      await tx.delete(teamMembers).where(eq(teamMembers.userId, userId))

      /* Personal teams created by the user */
      const ownedTeams = await tx
        .select({ id: teams.id })
        .from(teams)
        .where(eq(teams.creatorUserId, userId))

      for (const t of ownedTeams) {
        const remainingMembers = await tx
          .select()
          .from(teamMembers)
          .where(eq(teamMembers.teamId, t.id))

        if (remainingMembers.length === 0) {
          await tx.delete(teams).where(eq(teams.id, t.id))
        }
      }

      /* Finally, delete the user */
      await tx.delete(users).where(eq(users.id, userId))
    })

    return { success: 'User and all associated data deleted.' }
  },
)
