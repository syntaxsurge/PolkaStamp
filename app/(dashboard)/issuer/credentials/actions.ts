'use server'

import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { candidateCredentials, CredentialStatus } from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'

/* -------------------------------------------------------------------------- */
/*                 C L I E N T –> S E R V E R   V E R I F Y                   */
/* -------------------------------------------------------------------------- */

/**
 * Finalise a credential after the issuer has minted the NFT on-chain.
 * Expects the credentialId (db row), tokenId (NFT id) and txHash.
 * No chain interaction is performed server-side.
 */
export const verifyCredentialServerAction = validatedActionWithUser(
  z.object({
    credentialId: z.number().int().positive(),
    tokenId: z.string().min(1),
    txHash: z.string().min(1),
  }),
  async ({ credentialId, tokenId, txHash }, _form, user) => {
    /* Check issuer ownership */
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)
    if (!issuer) return { error: 'Issuer not found.' }

    /* Fetch credential row */
    const [cred] = await db
      .select()
      .from(candidateCredentials)
      .where(
        and(
          eq(candidateCredentials.id, credentialId),
          eq(candidateCredentials.issuerId, issuer.id),
        ),
      )
      .limit(1)
    if (!cred) return { error: 'Credential not found for this issuer.' }
    if (cred.status === CredentialStatus.VERIFIED) return { error: 'Credential already verified.' }

    /* Update DB */
    await db
      .update(candidateCredentials)
      .set({
        status: CredentialStatus.VERIFIED,
        verified: true,
        verifiedAt: new Date(),
        vcJson: JSON.stringify({ tokenId, txHash }),
        txHash,
      })
      .where(eq(candidateCredentials.id, credentialId))

    return { success: 'Credential verified.' }
  },
)

/* -------------------------------------------------------------------------- */
/*                              R E J E C T                                   */
/* -------------------------------------------------------------------------- */

export const rejectCredentialAction = validatedActionWithUser(
  z.object({ credentialId: z.coerce.number() }),
  async ({ credentialId }, _, user) => {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)
    if (!issuer) return { error: 'Issuer not found.' }

    await db
      .update(candidateCredentials)
      .set({
        status: CredentialStatus.REJECTED,
        verified: false,
        verifiedAt: new Date(),
      })
      .where(
        and(
          eq(candidateCredentials.id, credentialId),
          eq(candidateCredentials.issuerId, issuer.id),
        ),
      )

    return { success: 'Credential rejected.' }
  },
)

/* -------------------------------------------------------------------------- */
/*                            U N V E R I F Y                                 */
/* -------------------------------------------------------------------------- */

export const unverifyCredentialAction = validatedActionWithUser(
  z.object({ credentialId: z.coerce.number() }),
  async ({ credentialId }, _, user) => {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)
    if (!issuer) return { error: 'Issuer not found.' }

    const [cred] = await db
      .select()
      .from(candidateCredentials)
      .where(
        and(
          eq(candidateCredentials.id, credentialId),
          eq(candidateCredentials.issuerId, issuer.id),
        ),
      )
      .limit(1)
    if (!cred) return { error: 'Credential not found for this issuer.' }
    if (cred.status !== CredentialStatus.VERIFIED)
      return { error: 'Only verified credentials can be unverified.' }

    await db
      .update(candidateCredentials)
      .set({
        status: CredentialStatus.UNVERIFIED,
        verified: false,
        verifiedAt: null,
      })
      .where(eq(candidateCredentials.id, cred.id))

    return { success: 'Credential marked unverified.' }
  },
)
