'use server'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import {
  candidateCredentials,
  candidates,
  CredentialStatus,
  CredentialCategory,
} from '@/lib/db/schema/candidate'
import { teams, teamMembers } from '@/lib/db/schema/core'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'

/* -------------------------------------------------------------------------- */
/*                               A D D  C R E D                               */
/* -------------------------------------------------------------------------- */

/** Enum wrapper keeps schema strongly typed. */
const CategoryEnum = z.nativeEnum(CredentialCategory)

/** Core payload schema – no proof fields required. */
const AddCredentialSchema = z.object({
  title: z.string().min(2).max(200),
  category: CategoryEnum,
  type: z.string().min(1).max(50),
  fileUrl: z.string().url('Invalid URL'),
  issuerId: z.coerce.number().optional(),
})

/* -------------------------------------------------------------------------- */
/*                           S E R V E R   A C T I O N                        */
/* -------------------------------------------------------------------------- */

export const addCredential = validatedActionWithUser(
  AddCredentialSchema,
  async ({ title, category, type, fileUrl, issuerId }, _formData, user) => {
    /* --------------------------- issuer lookup -------------------------- */
    let linkedIssuerId: number | undefined
    let status: CredentialStatus = CredentialStatus.UNVERIFIED

    if (issuerId) {
      const [issuer] = await db
        .select()
        .from(issuers)
        .where(and(eq(issuers.id, issuerId), eq(issuers.status, IssuerStatus.ACTIVE)))
        .limit(1)

      if (!issuer) return { error: 'Issuer not found or not verified.' }
      linkedIssuerId = issuer.id
      status = CredentialStatus.PENDING
    }

    /* --------------------- DID required for issuer ---------------------- */
    if (linkedIssuerId) {
      const [teamRow] = await db
        .select({ did: teams.did })
        .from(teamMembers)
        .leftJoin(teams, eq(teamMembers.teamId, teams.id))
        .where(eq(teamMembers.userId, user.id))
        .limit(1)

      if (!teamRow?.did) {
        return { error: 'Create your team DID before submitting credentials to an issuer.' }
      }
    }

    /* ------------------------- candidate ensure ------------------------- */
    let [candidate] = await db
      .select()
      .from(candidates)
      .where(eq(candidates.userId, user.id))
      .limit(1)

    if (!candidate) {
      const [newCand] = await db.insert(candidates).values({ userId: user.id, bio: '' }).returning()
      candidate = newCand
    }

    /* -------------------------- insert record --------------------------- */
    await db.insert(candidateCredentials).values({
      candidateId: candidate.id,
      title,
      category,
      type,
      fileUrl,
      issuerId: linkedIssuerId,
      status,
    })

    /* --------------------------- response ------------------------------- */
    return { success: 'Credential added.' }
  },
)
