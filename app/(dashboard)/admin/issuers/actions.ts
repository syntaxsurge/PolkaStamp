'use server'

import { revalidatePath } from 'next/cache'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { candidateCredentials, CredentialStatus } from '@/lib/db/schema/candidate'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'
import { users } from '@/lib/db/schema/core'
import { grantIssuerRole } from '@/lib/credential-nft'
import { getPlatformSigner } from '@/lib/platform-signer'

/* -------------------------------------------------------------------------- */
/*                               U P D A T E                                  */
/* -------------------------------------------------------------------------- */

const updateIssuerStatusSchema = z
  .object({
    issuerId: z.coerce.number(),
    status: z.enum([IssuerStatus.PENDING, IssuerStatus.ACTIVE, IssuerStatus.REJECTED]),
    rejectionReason: z.string().max(2000).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.status === IssuerStatus.REJECTED && !val.rejectionReason) {
      ctx.addIssue({
        code: 'custom',
        message: 'Rejection reason is required when rejecting an issuer.',
        path: ['rejectionReason'],
      })
    }
  })

const _updateIssuerStatus = validatedActionWithUser(
  updateIssuerStatusSchema,
  async ({ issuerId, status, rejectionReason }, _formData, user) => {
    if (user.role !== 'admin') return { error: 'Unauthorized.' }

    /* ------------------------------------------------------------------ */
    /* Fetch issuer + owner wallet                                        */
    /* ------------------------------------------------------------------ */
    const [issuer] = await db.select().from(issuers).where(eq(issuers.id, issuerId)).limit(1)
    if (!issuer) return { error: 'Issuer not found.' }

    const [owner] = await db
      .select({ walletAddress: users.walletAddress })
      .from(users)
      .where(eq(users.id, issuer.ownerUserId))
      .limit(1)

    if (!owner?.walletAddress) {
      return { error: 'Issuer owner wallet address missing.' }
    }

    /* Require issuer DID before activation ----------------------------- */
    if (status === IssuerStatus.ACTIVE && !issuer.did) {
      return {
        error:
          'Issuer has not linked a DID. Ask the organisation to attach their Polkadot DID before activation.',
      }
    }

    let txHash: string | undefined = issuer.grantTxHash ?? undefined

    /* ------------------------------------------------------------------ */
    /* First-time activation → grant on-chain issuer role                 */
    /* ------------------------------------------------------------------ */
    if (status === IssuerStatus.ACTIVE && issuer.status !== IssuerStatus.ACTIVE) {
      try {
        const signer = await getPlatformSigner()
        const res = await grantIssuerRole({ account: signer, issuer: owner.walletAddress })
        txHash = res.txHash ?? undefined
      } catch (err) {
        return { error: `Blockchain transaction failed: ${(err as Error).message}` }
      }
    }

    /* ------------------------------------------------------------------ */
    /* Persist change                                                     */
    /* ------------------------------------------------------------------ */
    await db
      .update(issuers)
      .set({
        status,
        rejectionReason: status === IssuerStatus.REJECTED ? rejectionReason ?? null : null,
        grantTxHash: txHash ?? null,
      })
      .where(eq(issuers.id, issuerId))

    /* When status downgrades, also unlink from candidate credentials ---- */
    if (issuer.status === IssuerStatus.ACTIVE && status !== IssuerStatus.ACTIVE) {
      await db
        .update(candidateCredentials)
        .set({
          issuerId: null,
          status: CredentialStatus.UNVERIFIED,
          verified: false,
          verifiedAt: null,
        })
        .where(and(eq(candidateCredentials.issuerId, issuerId)))
    }

    revalidatePath('/admin/issuers')
    return { success: `Issuer status updated to ${status}.` }
  },
)

export const updateIssuerStatusAction = async (...args: Parameters<typeof _updateIssuerStatus>) => {
  'use server'
  return _updateIssuerStatus(...args)
}

/* -------------------------------------------------------------------------- */
/*                               D E L E T E                                  */
/* -------------------------------------------------------------------------- */

const deleteIssuerSchema = z.object({
  issuerId: z.coerce.number(),
})

const _deleteIssuer = validatedActionWithUser(
  deleteIssuerSchema,
  async ({ issuerId }, _formData, user) => {
    if (user.role !== 'admin') return { error: 'Unauthorized.' }

    await db.transaction(async (tx) => {
      /* Unlink credentials first */
      await tx
        .update(candidateCredentials)
        .set({
          issuerId: null,
          status: CredentialStatus.UNVERIFIED,
          verified: false,
          verifiedAt: null,
        })
        .where(eq(candidateCredentials.issuerId, issuerId))

      /* Delete issuer row */
      await tx.delete(issuers).where(eq(issuers.id, issuerId))
    })

    revalidatePath('/admin/issuers')
    return { success: 'Issuer deleted.' }
  },
)

export const deleteIssuerAction = async (...args: Parameters<typeof _deleteIssuer>) => {
  'use server'
  return _deleteIssuer(...args)
}