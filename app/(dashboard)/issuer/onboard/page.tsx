import Image from 'next/image'

import { eq } from 'drizzle-orm'
import { Building2, AtSign, Tag, BriefcaseBusiness, Link, Wrench } from 'lucide-react'

import RequireDidGate from '@/components/dashboard/require-did-gate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DetailItem from '@/components/ui/detail-item'
import PageCard from '@/components/ui/page-card'
import StatusBadge from '@/components/ui/status-badge'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'
import { prettify } from '@/lib/utils'

import { CreateIssuerForm } from './create-issuer-form'
import { EditIssuerForm } from './edit-issuer-form'
import { LinkDidForm } from './link-did-form'

export const revalidate = 0

export default async function IssuerOnboardPage() {
  const user = await requireAuth(['issuer'])

  const [issuer] = await db.select().from(issuers).where(eq(issuers.ownerUserId, user.id)).limit(1)

  return (
    <RequireDidGate createPath='/issuer/register-did'>
      {/* ----------------------- First-time creation ----------------------- */}
      {!issuer && (
        <PageCard
          icon={Building2}
          title='Create Your Organisation'
          description='Provide organisation details to begin issuing verified credentials.'
        >
          <CreateIssuerForm />
        </PageCard>
      )}

      {/* --------------------------- Rejected flow ------------------------- */}
      {issuer && issuer.status === IssuerStatus.REJECTED && (
        <PageCard
          icon={Wrench}
          title='Fix & Resubmit'
          description='Review feedback, update your details, and resubmit for approval.'
        >
          <div className='space-y-8'>
            {/* Previous submission summary */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg font-medium'>Previous Submission</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <DetailItem icon={Building2} label='Name' value={issuer.name} />
                  <DetailItem icon={AtSign} label='Domain' value={issuer.domain} />
                  <DetailItem
                    icon={Tag}
                    label='Category'
                    value={prettify(issuer.category)}
                    capitalize
                  />
                  <DetailItem
                    icon={BriefcaseBusiness}
                    label='Industry'
                    value={prettify(issuer.industry)}
                    capitalize
                  />
                </div>

                {issuer.logoUrl && (
                  <div className='flex flex-col gap-2'>
                    <p className='text-muted-foreground text-xs font-medium uppercase'>
                      Logo Preview
                    </p>
                    <Image
                      src={issuer.logoUrl}
                      alt={`${issuer.name} logo`}
                      width={112}
                      height={112}
                      className='h-28 w-auto rounded-md border object-contain'
                    />
                  </div>
                )}

                {issuer.rejectionReason && (
                  <p className='rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300'>
                    <span className='font-semibold'>Rejection reason:</span>{' '}
                    {issuer.rejectionReason}
                  </p>
                )}
              </CardContent>
            </Card>

            <EditIssuerForm issuer={issuer} />
          </div>
        </PageCard>
      )}

      {/* ---------------------- Active / Pending flow ---------------------- */}
      {issuer && issuer.status !== IssuerStatus.REJECTED && (
        <PageCard icon={Building2} title={issuer.name} description='Organisation profile'>
          <div className='space-y-8'>
            {/* Hero */}
            <Card className='overflow-hidden shadow-sm'>
              <CardContent className='flex flex-col items-center gap-6 p-6 sm:flex-row'>
                {issuer.logoUrl ? (
                  <Image
                    src={issuer.logoUrl}
                    alt={`${issuer.name} logo`}
                    width={96}
                    height={96}
                    className='h-24 w-24 flex-shrink-0 rounded-lg border object-contain'
                  />
                ) : (
                  <Building2 className='bg-muted text-muted-foreground h-24 w-24 flex-shrink-0 rounded-lg p-4' />
                )}

                <div className='flex-1 space-y-1'>
                  <h1 className='text-3xl leading-tight font-extrabold tracking-tight'>
                    {issuer.name}
                  </h1>
                  <p className='text-muted-foreground text-sm'>Organisation profile</p>
                </div>

                <StatusBadge status={issuer.status} showIcon className='text-base' />
              </CardContent>
            </Card>

            {/* Detail grid */}
            <Card className='shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>Organisation Details</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-6 p-6 sm:grid-cols-2'>
                <DetailItem icon={AtSign} label='Domain' value={issuer.domain} />
                <DetailItem
                  icon={Tag}
                  label='Category'
                  value={prettify(issuer.category)}
                  capitalize
                />
                <DetailItem
                  icon={BriefcaseBusiness}
                  label='Industry'
                  value={prettify(issuer.industry)}
                  capitalize
                />
                {issuer.did && (
                  <DetailItem
                    icon={Link}
                    label='Polkadot DID'
                    value={issuer.did}
                    className='sm:col-span-2'
                  />
                )}
              </CardContent>
            </Card>

            {/* DID linking & status alerts */}
            {!issuer.did && issuer.status === IssuerStatus.ACTIVE && <LinkDidForm />}

            {issuer.status === IssuerStatus.PENDING && (
              <div className='rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400 dark:bg-amber-900/20 dark:text-amber-200'>
                Your issuer is awaiting admin approval. You’ll receive an email once it becomes
                active.
              </div>
            )}
          </div>
        </PageCard>
      )}
    </RequireDidGate>
  )
}
