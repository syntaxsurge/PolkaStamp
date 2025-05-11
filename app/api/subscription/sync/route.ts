import { NextRequest, NextResponse } from 'next/server'

import { inArray, eq } from 'drizzle-orm'
import { z } from 'zod'

import { requireAuth } from '@/lib/auth/guards'
import { paidUntil } from '@/lib/subscription-manager'
import { SERVER_CALLER } from '@/lib/constants/blockchain'
import { db } from '@/lib/db/drizzle'
import { teams, teamMembers } from '@/lib/db/schema/core'

/* -------------------------------------------------------------------------- */
/*                               V A L I D A T I O N                          */
/* -------------------------------------------------------------------------- */

const BodySchema = z.object({
  /** 1 = Base, 2 = Plus */
  planKey: z.number().int().min(1).max(2),
})

/* -------------------------------------------------------------------------- */
/*                                     POST                                   */
/* -------------------------------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    /* ----------------------------- Auth check ---------------------------- */
    const user = await requireAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    /* ------------------------------ Body --------------------------------- */
    const body = await req.json()
    const { planKey } = BodySchema.parse(body)
    const planName = planKey === 1 ? 'base' : 'plus'

    if (!user.walletAddress) {
      return NextResponse.json({ error: 'User wallet not connected.' }, { status: 400 })
    }

    /* ----------------------- Read on-chain paidUntil ---------------------- */
    const paidUntilSec = await paidUntil({
      account: SERVER_CALLER,
      team: user.walletAddress,
    })

    if (!paidUntilSec) {
      return NextResponse.json({ error: 'Subscription not active on chain' }, { status: 400 })
    }

    const paidUntilDate = new Date(Number(paidUntilSec) * 1000)

    /* ------------------------- Resolve relevant teams --------------------- */
    const created = await db
      .select({ id: teams.id })
      .from(teams)
      .where(eq(teams.creatorUserId, user.id))

    const member = await db
      .select({ teamId: teamMembers.teamId })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user.id))

    const ids = Array.from(
      new Set<number>([...created.map((t) => t.id), ...member.map((m) => m.teamId)]),
    )
    if (ids.length === 0) {
      return NextResponse.json({ error: 'No team found for user' }, { status: 404 })
    }

    /* --------------------------- Persist to DB --------------------------- */
    await db
      .update(teams)
      .set({
        planName,
        subscriptionPaidUntil: paidUntilDate,
      })
      .where(inArray(teams.id, ids))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 500 })
  }
}