import { NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { setSession } from '@/lib/auth/session'
import { WALLET_HEADER } from '@/lib/constants/blockchain'
import { toH160Hex } from '@/lib/contract-utils'
import { db } from '@/lib/db/drizzle'
import { users, teams, teamMembers, activityLogs, ActivityType } from '@/lib/db/schema'

/* -------------------------------------------------------------------------- */
/*                                   SCHEMA                                   */
/* -------------------------------------------------------------------------- */

/**
 * Accept both SS58 and 0x-prefixed H160 addresses.
 * Strict hex validation is performed later by toH160Hex().
 */
const payloadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['candidate', 'recruiter', 'issuer']),
  address: z.string().min(1, 'Wallet address is required'),
})

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  try {
    /* --------------------------- Parse body ----------------------------- */
    const body = await req.json()
    const parsed = payloadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const name = parsed.data.name.trim()
    const email = parsed.data.email.trim().toLowerCase()
    const role = parsed.data.role
    let walletAddress: `0x${string}`
    try {
      walletAddress = toH160Hex(parsed.data.address)
    } catch {
      return NextResponse.json({ error: 'Invalid wallet address.' }, { status: 400 })
    }

    /* --------------- Verify forwarded WALLET_HEADER matches ------------- */
    const headerAddr = req.headers.get(WALLET_HEADER)
    if (!headerAddr || toH160Hex(headerAddr) !== walletAddress) {
      return NextResponse.json({ error: 'Wallet header mismatch.' }, { status: 400 })
    }

    /* ----------------------- Duplicate checks --------------------------- */
    const [dupEmail] = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (dupEmail) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    }

    const [dupWallet] = await db
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1)

    if (dupWallet) {
      return NextResponse.json({ error: 'Wallet already registered.' }, { status: 409 })
    }

    /* ---------------------------- Create user --------------------------- */
    const [user] = await db.insert(users).values({ name, email, role, walletAddress }).returning()

    /* ---------------------- Personal placeholder team ------------------- */
    const [team] = await db
      .insert(teams)
      .values({ name: `${email}'s Team`, creatorUserId: user.id })
      .returning()

    await db.insert(teamMembers).values({
      userId: user.id,
      teamId: team.id,
      role: 'owner',
    })

    /* --------------------------- Activity log --------------------------- */
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: ActivityType.CREATE_TEAM,
      ipAddress: req.headers.get('x-forwarded-for') ?? '',
    })

    /* -------------------------- Session cookie -------------------------- */
    await setSession(user)

    return NextResponse.json(
      { onboarded: true },
      {
        status: 200,
        headers: { 'Set-Session': 'true' },
      },
    )
  } catch (err: any) {
    console.error('Wallet onboard error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
