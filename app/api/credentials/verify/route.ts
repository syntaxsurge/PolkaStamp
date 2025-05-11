import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { requireAuth } from '@/lib/auth/guards'
import { verifyCredentialServerAction } from '@/app/(dashboard)/issuer/credentials/actions'

/* -------------------------------------------------------------------------- */
/*                               V A L I D A T I O N                          */
/* -------------------------------------------------------------------------- */

const BodySchema = z.object({
  credentialId: z.number().int().positive(),
  tokenId: z.string().min(1),
  txHash: z.string().min(1),
})

/* -------------------------------------------------------------------------- */
/*                                     POST                                   */
/* -------------------------------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    /* ----------------------- Auth & role check -------------------------- */
    await requireAuth(['issuer'])

    /* --------------------------- Parse body ----------------------------- */
    const body = await req.json()
    const { credentialId, tokenId, txHash } = BodySchema.parse(body)

    /* -------------------- Forward to server action --------------------- */
    const formData = new FormData()
    formData.set('credentialId', credentialId.toString())
    formData.set('tokenId', tokenId)
    formData.set('txHash', txHash)

    const result: any = await verifyCredentialServerAction({}, formData)

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Internal error' },
      { status: 500 },
    )
  }
}