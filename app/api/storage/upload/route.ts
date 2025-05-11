import { NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAuth } from '@/lib/auth/guards'
import { uploadCredentialFile } from '@/lib/services/apillon-storage'

/* -------------------------------------------------------------------------- */
/*                             V A L I D A T I O N                            */
/* -------------------------------------------------------------------------- */

const MAX_SIZE_BYTES = 25 * 1024 * 1024 // 25 MiB hard limit (adjust as needed)

const AcceptedTypesSchema = z.union([z.literal('application/pdf'), z.string().startsWith('image/')])

/* -------------------------------------------------------------------------- */
/*                                   POST                                    */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    /* -------------------- Role-gated authentication -------------------- */
    await requireAuth(['candidate', 'issuer'])

    /* --------------------------- Form data ----------------------------- */
    const form = await request.formData()
    const file = form.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large.' }, { status: 413 })
    }

    /* Content-type whitelist */
    try {
      AcceptedTypesSchema.parse(file.type)
    } catch {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 415 })
    }

    /* ------------------------- Apillon upload -------------------------- */
    const url = await uploadCredentialFile(file)

    return NextResponse.json({ url }, { status: 200 })
  } catch (err: any) {
    const msg = err?.message ?? 'Internal error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

/* -------------------------------------------------------------------------- */
/*                                CONFIG                                     */
/* -------------------------------------------------------------------------- */

export const runtime = 'nodejs'
