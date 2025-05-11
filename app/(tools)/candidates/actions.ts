'use server'

import { createHash } from 'crypto'

import { eq } from 'drizzle-orm'

import { summariseCandidateProfile } from '@/lib/ai/openai'
import { db } from '@/lib/db/drizzle'
import { candidates, candidateCredentials } from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'

/**
 * Generate an AI summary for the specified candidate.
 *
 * Guards:
 *   • Only two generations are permitted per UTC day.
 *   • Regeneration occurs only when the candidate’s bio or credentials change.
 */
export async function generateCandidateSummary(candidateId: number): Promise<void> {
  /* ------------------------------------------------------------ */
  /*                Fetch candidate + summary meta                */
  /* ------------------------------------------------------------ */
  const [cand] = await db
    .select({
      id: candidates.id,
      summary: candidates.summary,
      bio: candidates.bio,
      summaryHash: candidates.summaryHash,
      summaryGeneratedAt: candidates.summaryGeneratedAt,
      summaryDailyCount: candidates.summaryDailyCount,
    })
    .from(candidates)
    .where(eq(candidates.id, candidateId))
    .limit(1)

  if (!cand) throw new Error('Candidate not found.')

  /* ------------------------------------------------------------ */
  /*                 Daily generation-count guard                 */
  /* ------------------------------------------------------------ */
  const now = new Date()
  const sameDay =
    cand.summaryGeneratedAt &&
    new Date(cand.summaryGeneratedAt).toDateString() === now.toDateString()

  const dailyCount = sameDay ? (cand.summaryDailyCount ?? 0) : 0
  if (dailyCount >= 2) {
    throw new Error('AI summary limit reached – please try again tomorrow.')
  }

  /* ------------------------------------------------------------ */
  /*                Build deterministic profile string            */
  /* ------------------------------------------------------------ */
  const creds = await db
    .select({
      title: candidateCredentials.title,
      issuer: issuers.name,
    })
    .from(candidateCredentials)
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))
    .where(eq(candidateCredentials.candidateId, candidateId))

  const profileText =
    `${cand.bio ?? ''}\n\nCredentials:\n` +
    creds.map((c) => `${c.title}${c.issuer ? ` – ${c.issuer}` : ''}`).join('\n')

  /* SHA-256 hash lets us detect whether the profile actually changed */
  const profileHash = createHash('sha256').update(profileText).digest('hex')

  /* Skip when nothing changed and a summary already exists */
  if (cand.summary && cand.summaryHash === profileHash) return

  /* ------------------------------------------------------------ */
  /*                 Generate fresh AI summary (≈120 w)           */
  /* ------------------------------------------------------------ */
  const summary = await summariseCandidateProfile(profileText, 120)

  /* ------------------------------------------------------------ */
  /*                       Persist to DB                          */
  /* ------------------------------------------------------------ */
  await db
    .update(candidates)
    .set({
      summary,
      summaryHash: profileHash,
      summaryGeneratedAt: now,
      summaryDailyCount: dailyCount + 1,
      updatedAt: now,
    })
    .where(eq(candidates.id, candidateId))
}
