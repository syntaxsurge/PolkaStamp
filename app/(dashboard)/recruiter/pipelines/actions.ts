'use server'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { STAGES } from '@/lib/constants/recruiter'
import { db } from '@/lib/db/drizzle'
import { recruiterPipelines, pipelineCandidates } from '@/lib/db/schema/recruiter'

export const createPipelineAction = validatedActionWithUser(
  z.object({
    name: z.string().min(2).max(150),
    description: z.string().max(1000).optional(),
  }),
  async (data, _, user) => {
    if (user.role !== 'recruiter') return { error: 'Only recruiters can create pipelines.' }

    await db.insert(recruiterPipelines).values({
      recruiterId: user.id,
      name: data.name,
      description: data.description,
    })

    return { success: 'Pipeline created.' }
  },
)

export const addCandidateToPipelineAction = validatedActionWithUser(
  z.object({
    candidateId: z.coerce.number(),
    pipelineId: z.coerce.number(),
  }),
  async ({ candidateId, pipelineId }, _, user) => {
    const [pipeline] = await db
      .select()
      .from(recruiterPipelines)
      .where(
        and(eq(recruiterPipelines.id, pipelineId), eq(recruiterPipelines.recruiterId, user.id)),
      )
      .limit(1)

    if (!pipeline) return { error: 'Pipeline not found.' }

    const existing = await db
      .select()
      .from(pipelineCandidates)
      .where(
        and(
          eq(pipelineCandidates.pipelineId, pipelineId),
          eq(pipelineCandidates.candidateId, candidateId),
        ),
      )
      .limit(1)

    if (existing.length > 0) return { error: 'Candidate already in this pipeline.' }

    await db.insert(pipelineCandidates).values({
      pipelineId,
      candidateId,
      stage: 'sourced',
    })

    return { success: 'Candidate added.' }
  },
)

export const updateCandidateStageAction = validatedActionWithUser(
  z.object({
    pipelineCandidateId: z.coerce.number(),
    stage: z.enum(STAGES),
  }),
  async ({ pipelineCandidateId, stage }, _, user) => {
    const [row] = await db
      .select({
        pc: pipelineCandidates,
        pipeline: recruiterPipelines,
      })
      .from(pipelineCandidates)
      .leftJoin(recruiterPipelines, eq(pipelineCandidates.pipelineId, recruiterPipelines.id))
      .where(eq(pipelineCandidates.id, pipelineCandidateId))
      .limit(1)

    if (!row) return { error: 'Record not found.' }
    if (!row.pipeline || row.pipeline.recruiterId !== user.id) return { error: 'Unauthorized.' }

    await db
      .update(pipelineCandidates)
      .set({ stage })
      .where(eq(pipelineCandidates.id, pipelineCandidateId))

    return { success: 'Stage updated.' }
  },
)

export const deletePipelineAction = validatedActionWithUser(
  z.object({
    pipelineId: z.coerce.number(),
  }),
  async ({ pipelineId }, _formData, user) => {
    const [pipeline] = await db
      .select()
      .from(recruiterPipelines)
      .where(
        and(eq(recruiterPipelines.id, pipelineId), eq(recruiterPipelines.recruiterId, user.id)),
      )
      .limit(1)

    if (!pipeline) return { error: 'Pipeline not found.' }

    await db.delete(pipelineCandidates).where(eq(pipelineCandidates.pipelineId, pipelineId))
    await db.delete(recruiterPipelines).where(eq(recruiterPipelines.id, pipelineId))

    return { success: 'Pipeline deleted.' }
  },
)

export const deletePipelineCandidateAction = validatedActionWithUser(
  z.object({
    pipelineCandidateId: z.coerce.number(),
  }),
  async ({ pipelineCandidateId }, _formData, user) => {
    const [row] = await db
      .select({
        pc: pipelineCandidates,
        pipeline: recruiterPipelines,
      })
      .from(pipelineCandidates)
      .leftJoin(recruiterPipelines, eq(pipelineCandidates.pipelineId, recruiterPipelines.id))
      .where(eq(pipelineCandidates.id, pipelineCandidateId))
      .limit(1)

    if (!row || !row.pipeline || row.pipeline.recruiterId !== user.id) {
      return { error: 'Unauthorized or record not found.' }
    }

    await db.delete(pipelineCandidates).where(eq(pipelineCandidates.id, pipelineCandidateId))

    return { success: 'Candidate removed from pipeline.' }
  },
)
