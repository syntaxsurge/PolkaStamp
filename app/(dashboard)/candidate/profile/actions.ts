'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { candidates } from '@/lib/db/schema/candidate'
import { users } from '@/lib/db/schema/core'

const urlField = z
  .string()
  .url('Invalid URL')
  .max(255)
  .or(z.literal('').transform(() => undefined))

export const updateCandidateProfile = validatedActionWithUser(
  z.object({
    name: z.string().min(1, 'Name is required').max(100),
    bio: z.string().max(2000).optional().default(''),

    twitterUrl: urlField.optional(),
    githubUrl: urlField.optional(),
    linkedinUrl: urlField.optional(),
    websiteUrl: urlField.optional(),
  }),
  async (data, _, user) => {
    const { name, bio, twitterUrl, githubUrl, linkedinUrl, websiteUrl } = data

    /* Update basic user profile */
    await db.update(users).set({ name }).where(eq(users.id, user.id))

    /* Upsert candidate row */
    let [candidate] = await db
      .select()
      .from(candidates)
      .where(eq(candidates.userId, user.id))
      .limit(1)

    if (!candidate) {
      await db.insert(candidates).values({
        userId: user.id,
        bio: bio ?? '',
        twitterUrl,
        githubUrl,
        linkedinUrl,
        websiteUrl,
      })
    } else {
      await db
        .update(candidates)
        .set({
          bio: bio ?? '',
          twitterUrl,
          githubUrl,
          linkedinUrl,
          websiteUrl,
        })
        .where(eq(candidates.id, candidate.id))
    }

    return { success: 'Profile updated successfully.' }
  },
)
