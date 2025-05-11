'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { candidateCredentials, candidates } from '@/lib/db/schema/candidate'

/* -------------------------------------------------------------------------- */
/*                          C R E D E N T I A L   D E L E T E                 */
/* -------------------------------------------------------------------------- */

/**
 * Single shared server-action that deletes a candidate credential when the
 * caller is either (a) the owning candidate or (b) an admin user.
 *
 * Both candidate- and admin-side UIs now import this action directly to avoid
 * duplication across route segments.
 */
const DeleteCredentialSchema = z.object({
  credentialId: z.coerce.number(),
})

export const deleteCredentialAction = validatedActionWithUser(
  DeleteCredentialSchema,
  async ({ credentialId }, _formData, user) => {
    /* Fetch credential & owning user ------------------------------------ */
    const [cred] = await db
      .select({
        id: candidateCredentials.id,
        candidateId: candidateCredentials.candidateId,
      })
      .from(candidateCredentials)
      .where(eq(candidateCredentials.id, credentialId))
      .limit(1)

    if (!cred) return { error: 'Credential not found.' }

    const [cand] = await db
      .select({ userId: candidates.userId })
      .from(candidates)
      .where(eq(candidates.id, cred.candidateId))
      .limit(1)

    /* Authorisation: owner or admin ------------------------------------- */
    const isOwner = cand?.userId === user.id
    if (!isOwner && user.role !== 'admin') {
      return { error: 'Unauthorized.' }
    }

    /* Delete + cache bust ------------------------------------------------ */
    await db.delete(candidateCredentials).where(eq(candidateCredentials.id, credentialId))
    revalidatePath('/candidate/credentials')
    revalidatePath('/admin/credentials')

    return { success: 'Credential deleted.' }
  },
)
