import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { signatureVerify } from '@polkadot/util-crypto'

import { db } from '@/lib/db/drizzle'
import { users } from '@/lib/db/schema'
import { toH160Hex } from '@/lib/contract-utils'
import { WALLET_HEADER } from '@/lib/constants/blockchain'
import { SESSION_COOKIE } from '@/lib/constants/auth'

/* -------------------------------------------------------------------------- */
/*                                   SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const payloadSchema = z.object({
  /** SS58 or 0x‑prefixed address of the signing account */
  address: z.string().min(1),
  /** Human‑readable confirmation string that was signed */
  message: z.string().min(1),
  /** Hex‑encoded sr25519 signature returned by the wallet */
  signature: z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid signature'),
})

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    /* ----------------------------- Validate body ------------------------ */
    const json = await req.json()
    const parsed = payloadSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const { address, message, signature } = parsed.data
    const walletHex = toH160Hex(address)

    /* -------------------------- Header consistency ---------------------- */
    const hdr = req.headers.get(WALLET_HEADER)
    if (!hdr || toH160Hex(hdr) !== walletHex) {
      return NextResponse.json({ error: 'Wallet header mismatch.' }, { status: 400 })
    }

    /* -------------------------- Signature verify ------------------------ */
    const { isValid } = signatureVerify(message, signature, address)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
    }

    /* ------------------------------ DB lookup --------------------------- */
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.walletAddress, walletHex))
      .limit(1)

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    /* --------------------------- Soft‑delete user ----------------------- */
    await db.update(users).set({ deletedAt: new Date() }).where(eq(users.id, user.id))

    /* ---------------------------- Clear session ------------------------- */
    ;(await cookies()).delete(SESSION_COOKIE)

    return NextResponse.json({ success: 'Account deleted.' }, { status: 200 })
  } catch (err) {
    console.error('Account deletion error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}