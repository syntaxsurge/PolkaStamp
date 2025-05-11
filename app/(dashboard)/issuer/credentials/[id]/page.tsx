import { redirect } from 'next/navigation'
import type { ElementType } from 'react'

import { eq, and } from 'drizzle-orm'
import { FileText, BadgeCheck, Clock, XCircle } from 'lucide-react'

import { CredentialActions } from '@/components/dashboard/issuer/credential-actions'
import RequireDidGate from '@/components/dashboard/require-did-gate'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import PageCard from '@/components/ui/page-card'
import StatusBadge from '@/components/ui/status-badge'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { candidateCredentials, CredentialStatus, candidates } from '@/lib/db/schema/candidate'
import { users, teams, teamMembers } from '@/lib/db/schema/core'
import { issuers } from '@/lib/db/schema/issuer'
import { gatewayUrl } from '@/lib/utils'

export const revalidate = 0

export default async function CredentialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const credentialId = Number(id)

  const user = await requireAuth(['issuer'])

  const [issuer] = await db.select().from(issuers).where(eq(issuers.ownerUserId, user.id)).limit(1)
  if (!issuer) redirect('/issuer/onboard')

  /* -------------------------- Credential row ---------------------------- */
  const [data] = await db
    .select({
      cred: candidateCredentials,
      cand: candidates,
      candUser: users,
      candTeam: teams,
    })
    .from(candidateCredentials)
    .leftJoin(candidates, eq(candidateCredentials.candidateId, candidates.id))
    .leftJoin(users, eq(candidates.userId, users.id))
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(
      and(eq(candidateCredentials.id, credentialId), eq(candidateCredentials.issuerId, issuer.id)),
    )
    .limit(1)
  if (!data) redirect('/issuer/requests')

  const { cred, candUser, candTeam } = data
  const status = cred.status as CredentialStatus
  const StatusIcon: ElementType = (() => {
    switch (status) {
      case CredentialStatus.VERIFIED:
        return BadgeCheck
      case CredentialStatus.REJECTED:
        return XCircle
      default:
        return Clock
    }
  })()

  /* -------------------------------- UI ---------------------------------- */
  return (
    <RequireDidGate createPath='/issuer/create-did'>
      <PageCard
        icon={StatusIcon}
        title={cred.title}
        description={`Status: ${status.toLowerCase()}`}
        className='w-full'
      >
        <div className='space-y-6'>
          {/* Meta row */}
          <div className='flex flex-wrap items-center gap-4'>
            <p className='text-muted-foreground text-sm'>
              Submitted by{' '}
              <span className='font-medium'>{candUser?.name || candUser?.email || 'Unknown'}</span>
            </p>
            <StatusBadge status={status} showIcon />
          </div>

          {/* Details */}
          <Card className='shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>Credential Details</CardTitle>
            </CardHeader>

            <CardContent className='grid gap-4 text-sm sm:grid-cols-2'>
              <div>
                <p className='text-muted-foreground mb-1 text-xs font-medium uppercase'>Type</p>
                <p className='font-medium capitalize'>{cred.type}</p>
              </div>

              <div>
                <p className='text-muted-foreground mb-1 text-xs font-medium uppercase'>
                  Candidate
                </p>
                <p className='font-medium break-all'>
                  {candUser?.name || candUser?.email || 'Unknown'}
                </p>
              </div>

              {cred.fileUrl && (
                <div className='sm:col-span-2'>
                  <p className='text-muted-foreground mb-1 text-xs font-medium uppercase'>
                    Attached File
                  </p>
                  <a
                    href={gatewayUrl(cred.fileUrl)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary inline-flex items-center gap-2 font-medium underline-offset-2 hover:underline'
                  >
                    <FileText className='h-4 w-4' />
                    View Document
                  </a>
                </div>
              )}
            </CardContent>

            <CardFooter className='bg-muted/50 border-t py-4'>
              <div className='ml-auto'>
                <CredentialActions
                  credentialId={cred.id}
                  status={status}
                  candidateDid={candTeam?.did || ''}
                  candidateName={candUser?.name || candUser?.email || 'Unknown'}
                  credentialTitle={cred.title}
                  credentialType={cred.type}
                  fileUrl={cred.fileUrl || ''}
                  issuerDid={issuer.did || ''}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </PageCard>
    </RequireDidGate>
  )
}
