'use server'

import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import {
  candidateHighlights,
  candidateCredentials,
  CredentialCategory,
  candidates,
} from '@/lib/db/schema/candidate'

/* -------------------------------------------------------------------------- */
/*                         V A L I D A T I O N                                */
/* -------------------------------------------------------------------------- */

const payloadSchema = z.object({
  experience: z.array(z.number()).max(5, 'Maximum 5 experience highlights').optional().default([]),
  project: z.array(z.number()).max(5, 'Maximum 5 project highlights').optional().default([]),
})

/* -------------------------------------------------------------------------- */
/*                        S A V E   H I G H L I G H T S                       */
/* -------------------------------------------------------------------------- */

export const saveHighlightsAction = validatedActionWithUser(
  z.object({
    experience: z.string().optional(),
    project: z.string().optional(),
  }),
  async (data, _formData, user) => {
    /* --------------------------- parse payload --------------------------- */
    const parsed = payloadSchema.parse({
      experience: data.experience ? data.experience.split(',').map(Number) : [],
      project: data.project ? data.project.split(',').map(Number) : [],
    })

    /* ------------------------- confirm candidate ------------------------- */
    const [cand] = await db
      .select({ id: candidates.id })
      .from(candidates)
      .where(eq(candidates.userId, user.id))
      .limit(1)

    if (!cand) return { error: 'Candidate profile not found.' }

    /* ------------------ verify credential ownership/category ------------- */
    const allIds = [...parsed.experience, ...parsed.project]
    if (allIds.length) {
      const creds = await db
        .select({
          id: candidateCredentials.id,
          category: candidateCredentials.category,
        })
        .from(candidateCredentials)
        .where(
          and(
            eq(candidateCredentials.candidateId, cand.id),
            inArray(candidateCredentials.id, allIds),
          ),
        )

      const invalidIds = allIds.filter((id) => !creds.find((c) => c.id === id))
      if (invalidIds.length) return { error: 'Invalid credential selection.' }

      const wrongCategory =
        creds.filter(
          (c) =>
            (parsed.experience.includes(c.id) && c.category !== CredentialCategory.EXPERIENCE) ||
            (parsed.project.includes(c.id) && c.category !== CredentialCategory.PROJECT),
        ).length > 0

      if (wrongCategory) return { error: 'Category mismatch in highlights.' }
    }

    /* ----------------------- rebuild highlights rows --------------------- */
    await db.delete(candidateHighlights).where(eq(candidateHighlights.candidateId, cand.id))

    /* Ensure a single, continuous sortOrder across all highlights so that
       ordering is unambiguous and unique per candidate. */
    const expInserts = parsed.experience.map((id, idx) => ({
      candidateId: cand.id,
      credentialId: id,
      sortOrder: idx + 1,
    }))

    const projInserts = parsed.project.map((id, idx) => ({
      candidateId: cand.id,
      credentialId: id,
      sortOrder: parsed.experience.length + idx + 1,
    }))

    const inserts = [...expInserts, ...projInserts]

    if (inserts.length) await db.insert(candidateHighlights).values(inserts)

    return { success: 'Highlights updated.' }
  },
)
