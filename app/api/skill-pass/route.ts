'use server'

import { NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { candidates, quizAttempts } from '@/lib/db/schema/candidate'

/* -------------------------------------------------------------------------- */
/*                               V A L I D A T I O N                          */
/* -------------------------------------------------------------------------- */

const BodySchema = z.object({
  quizId: z.number(),
  score: z.number().int().min(0),
  seed: z
    .string()
    .regex(/^0x[0-9a-fA-F]{1,64}$/)
    .max(66),
  txHash: z.string().regex(/^0x[0-9a-fA-F]{64}$/),
  vcJson: z.string().optional(),
})

/* -------------------------------------------------------------------------- */
/*                                 H A N D L E R                              */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  /* --------------------------- Auth & payload --------------------------- */
  const user = await requireAuth(['candidate'])
  const body = await req.json()
  const data = BodySchema.parse(body)

  /* --------------------------- Candidate row --------------------------- */
  let [candidateRow] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.userId, user.id))
    .limit(1)

  if (!candidateRow) {
    const [created] = await db.insert(candidates).values({ userId: user.id, bio: '' }).returning()
    candidateRow = created
  }

  /* --------------------------- DB insert ------------------------------- */
  await db.insert(quizAttempts).values({
    candidateId: candidateRow.id,
    quizId: data.quizId,
    seed: data.seed,
    score: data.score,
    pass: 1,
    vcIssuedId: data.txHash,
    vcJson: data.vcJson ?? null,
  })

  return new NextResponse(null, { status: 201 })
}
