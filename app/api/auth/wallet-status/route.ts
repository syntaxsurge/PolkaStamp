import { NextRequest, NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { setSession } from '@/lib/auth/session'
import { WALLET_HEADER } from '@/lib/constants/blockchain'
import { toH160Hex } from '@/lib/contract-utils'
import { db } from '@/lib/db/drizzle'
import { users } from '@/lib/db/schema'

/* -------------------------------------------------------------------------- */
/*                                   SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const paramsSchema = z.object({
  /** Wallet address (SS58 or 0x) */
  address: z.string().min(1, 'Address is required'),
})

/* -------------------------------------------------------------------------- */
/*                                  HANDLER                                   */
/* -------------------------------------------------------------------------- */

export async function GET(req: NextRequest) {
  try {
    /* ------------------------------- Parse ------------------------------- */
    const qs = Object.fromEntries(req.nextUrl.searchParams.entries())
    const parsed = paramsSchema.safeParse(qs)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid address parameter.' }, { status: 400 })
    }

    let walletAddress: `0x${string}`
    try {
      walletAddress = toH160Hex(parsed.data.address)
    } catch {
      return NextResponse.json({ error: 'Invalid wallet address.' }, { status: 400 })
    }

    /* ---------------------------- DB lookup ----------------------------- */
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1)

    /* ------------------------- User not found --------------------------- */
    if (!user) {
      return NextResponse.json(
        { exists: false },
        {
          status: 200,
          headers: { [WALLET_HEADER]: walletAddress },
        },
      )
    }

    /* ---------------------- Refresh session cookie ---------------------- */
    await setSession(user)

    return NextResponse.json(
      { exists: true },
      {
        status: 200,
        headers: { 'Set-Session': 'true' },
      },
    )
  } catch (err) {
    console.error('wallet-status GET error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
