'use server'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { requireAuth } from '@/lib/auth/guards'
import { STAGES } from '@/lib/constants/recruiter'
import { db } from '@/lib/db/drizzle'
import { candidates } from '@/lib/db/schema/candidate'
import { recruiterPipelines, pipelineCandidates } from '@/lib/db/schema/recruiter'

interface ActionResult {
  success?: string
  error?: string
}

/**
 * Attempt to apply the current user (must be a logged-in candidate) to the
 * specified job opening (recruiter pipeline).  Unauthenticated or wrong-role
 * callers receive a structured error so the client can show a toast instead
 * of crashing due to an unhandled server exception.
 */
export async function applyToJobAction(
  _prevState: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  /* -------------------------- Validate payload -------------------------- */
  const parse = z
    .object({
      pipelineId: z.coerce.number().positive(),
    })
    .safeParse(Object.fromEntries(formData))

  if (!parse.success) return { error: 'Invalid request.' }
  const { pipelineId } = parse.data

  /* -------------------------- Auth & role guard ------------------------- */
  const user = await requireAuth()
  if (!user || user.role !== 'candidate') {
    return { error: 'Only logged in candidates could apply to these job openings.' }
  }

  /* ----------------------- Resolve candidate row ------------------------ */
  const [cand] = await db
    .select({ id: candidates.id })
    .from(candidates)
    .where(eq(candidates.userId, user.id))
    .limit(1)

  if (!cand) return { error: 'Candidate profile not found.' }

  /* --------------------------- Verify job ID ---------------------------- */
  const [pipeline] = await db
    .select()
    .from(recruiterPipelines)
    .where(eq(recruiterPipelines.id, pipelineId))
    .limit(1)

  if (!pipeline) return { error: 'Job opening not found.' }

  /* ------------------------ Prevent duplicates -------------------------- */
  const dup = await db
    .select()
    .from(pipelineCandidates)
    .where(
      and(
        eq(pipelineCandidates.pipelineId, pipelineId),
        eq(pipelineCandidates.candidateId, cand.id),
      ),
    )
    .limit(1)

  if (dup.length) return { error: 'You have already applied to this job.' }

  /* ---------------------------- Insert row ------------------------------ */
  await db.insert(pipelineCandidates).values({
    pipelineId,
    candidateId: cand.id,
    stage: STAGES[0], // 'sourced'
  })

  return { success: 'Application submitted.' }
}
