'use server'

import { createHash } from 'crypto'

import { and, eq } from 'drizzle-orm'

import { generateCandidateFitSummary } from '@/lib/ai/openai'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getRecruiterPipelinesPage } from '@/lib/db/queries/recruiter-pipelines'
import { candidates, candidateCredentials } from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'
import { recruiterCandidateFits } from '@/lib/db/schema/recruiter-fit'

/* -------------------------------------------------------------------------- */
/*                             R E T U R N  T Y P E                           */
/* -------------------------------------------------------------------------- */

export interface GenerateCandidateFitResult {
  /** Populated on success */
  summaryJson?: string
  /** Populated when the operation cannot proceed */
  error?: string
}

/* -------------------------------------------------------------------------- */
/*          R E C R U I T E R   " W H Y   H I R E ”  A C T I O N             */
/* -------------------------------------------------------------------------- */

/**
 * Generate (or fetch cached) recruiter-specific fit-summary JSON for a candidate.
 * When authentication fails or the user lacks recruiter privileges,
 * the function returns <code>{ error }</code> instead of throwing.
 */
export async function generateCandidateFit(
  candidateId: number,
): Promise<GenerateCandidateFitResult> {
  /* ----------------------------- Auth guard ----------------------------- */
  const user = await requireAuth()
  if (!user) {
    return {
      error:
        'You must be signed in with a recruiter account to generate a Why Hire summary. Please connect your recruiter wallet and try again.',
    }
  }
  if (user.role !== 'recruiter') {
    return {
      error: `Access denied – your current role "${user.role}" cannot generate Why Hire summaries. Recruiter privileges are required.`,
    }
  }

  /* ------------------ Fetch up-to-20 recruiter pipelines ---------------- */
  const { pipelines } = await getRecruiterPipelinesPage(user.id, 1, 20, 'createdAt', 'desc', '')

  const pipelineText =
    pipelines.length === 0
      ? 'NONE'
      : pipelines
          .map((p, i) => `${i + 1}. ${p.name}${p.description ? ` – ${p.description}` : ''}`)
          .join('\n')

  /* ---------------------- Build candidate profile text ------------------ */
  const [cand] = await db
    .select({ bio: candidates.bio })
    .from(candidates)
    .where(eq(candidates.id, candidateId))
    .limit(1)

  if (!cand) {
    return { error: 'Candidate not found.' }
  }

  const creds = await db
    .select({ title: candidateCredentials.title, issuer: issuers.name })
    .from(candidateCredentials)
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))
    .where(eq(candidateCredentials.candidateId, candidateId))

  const profileStr = [
    cand.bio ?? '',
    '',
    'Credentials:',
    ...creds.map((c) => `• ${c.title}${c.issuer ? ` – ${c.issuer}` : ''}`),
  ]
    .join('\n')
    .trim()

  /* -------------------------- Cache look-up ----------------------------- */
  const profileHash = createHash('sha256').update(profileStr).digest('hex')
  const pipelinesHash = createHash('sha256').update(pipelineText).digest('hex')

  const [cache] = await db
    .select()
    .from(recruiterCandidateFits)
    .where(
      and(
        eq(recruiterCandidateFits.recruiterId, user.id),
        eq(recruiterCandidateFits.candidateId, candidateId),
      ),
    )
    .limit(1)

  if (cache && cache.profileHash === profileHash && cache.pipelinesHash === pipelinesHash) {
    return { summaryJson: cache.summaryJson }
  }

  /* -------------------- OpenAI call (with validation) ------------------- */
  const summaryJson = await generateCandidateFitSummary(pipelineText, profileStr)

  /* --------------------------- Persist cache ---------------------------- */
  if (cache) {
    await db
      .update(recruiterCandidateFits)
      .set({
        summaryJson,
        profileHash,
        pipelinesHash,
        generatedAt: new Date(),
      })
      .where(eq(recruiterCandidateFits.id, cache.id))
  } else {
    await db.insert(recruiterCandidateFits).values({
      recruiterId: user.id,
      candidateId,
      summaryJson,
      profileHash,
      pipelinesHash,
    })
  }

  return { summaryJson }
}
