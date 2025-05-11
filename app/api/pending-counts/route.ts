import { NextResponse } from 'next/server'

import { and, eq } from 'drizzle-orm'

import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { invitations } from '@/lib/db/schema'
import { candidateCredentials, CredentialStatus } from '@/lib/db/schema/candidate'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'

export async function GET() {
  const user = await requireAuth()

  /* ------------------------- Invitations ------------------------- */
  const invitationsCount = (
    await db
      .select({ id: invitations.id })
      .from(invitations)
      .where(and(eq(invitations.email, user.email), eq(invitations.status, 'pending')))
  ).length

  /* ---------------------- Issuer Requests ----------------------- */
  let issuerRequestsCount = 0
  if (user.role === 'issuer') {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)

    if (issuer) {
      issuerRequestsCount = (
        await db
          .select({ id: candidateCredentials.id })
          .from(candidateCredentials)
          .where(
            and(
              eq(candidateCredentials.issuerId, issuer.id),
              eq(candidateCredentials.status, CredentialStatus.PENDING),
            ),
          )
      ).length
    }
  }

  /* -------------------- Admin Pending Issuers ------------------- */
  const adminPendingIssuersCount =
    user.role === 'admin'
      ? (
          await db
            .select({ id: issuers.id })
            .from(issuers)
            .where(eq(issuers.status, IssuerStatus.PENDING))
        ).length
      : 0

  return NextResponse.json({
    invitations: invitationsCount,
    issuerRequests: issuerRequestsCount,
    adminPendingIssuers: adminPendingIssuersCount,
  })
}
