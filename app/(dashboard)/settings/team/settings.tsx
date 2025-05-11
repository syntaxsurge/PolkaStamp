// 'use client'

import { useState } from 'react'

import { ArrowRight, Loader2, RotateCcw, Users } from 'lucide-react'
import { toast } from 'sonner'

import MembersTable from '@/components/dashboard/settings/members-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageCard from '@/components/ui/page-card'
import { TablePagination } from '@/components/ui/tables/table-pagination'

import { paySubscription, priceOf } from '@/lib/subscription-manager'
import type { SettingsProps } from '@/lib/types/components'
import { buildExplorerLink, ensureSigner } from '@/lib/utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { InviteTeamMember } from './invite-team'

/* -------------------------------------------------------------------------- */
/*                       Renew Subscription Button                            */
/* -------------------------------------------------------------------------- */

function RenewSubscriptionButton({ planName }: { planName: 'base' | 'plus' }) {
  const { selectedAccount } = usePolkadotExtension()
  const [pending, setPending] = useState(false)

  async function renew() {
    if (pending) return

    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(err?.message ?? 'Connect a wallet first.')
      return
    }

    const toastId = toast.loading('Preparing renewal…')
    setPending(true)

    const planKey = planName === 'base' ? 1 : 2

    try {
      /* --------------------------- Fetch price --------------------------- */
      const priceWei = await priceOf({ account: selectedAccount!, planKey })
      if (priceWei === null) throw new Error('Price unavailable on chain.')

      /* ---------------------- Chain transaction ------------------------- */
      toast.loading('Signing & submitting…', { id: toastId })

      const txResult = await paySubscription({
        account: selectedAccount!,
        team: selectedAccount!.address,
        planKey,
        value: priceWei,
      })

      if (txResult.txHash) {
        toast.loading(`Tx sent: ${txResult.txHash.slice(0, 10)}…`, {
          id: toastId,
          action: {
            label: 'View',
            onClick: () =>
              window.open(buildExplorerLink(txResult.txHash!), '_blank'),
          },
        })
      }

      /* -------------------------- Persist DB ---------------------------- */
      await fetch('/api/subscription/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey }),
      })

      toast.success('Subscription renewed ✅', { id: toastId })
      location.reload()
    } catch (err: any) {
      toast.error(err?.message ?? 'Transaction failed.', { id: toastId })
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      onClick={renew}
      disabled={pending}
      variant='outline'
      className='flex items-center gap-2'
    >
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Processing…
        </>
      ) : (
        <>
          Renew Subscription
          <RotateCcw className='h-4 w-4' />
        </>
      )}
    </Button>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Settings Card                                */
/* -------------------------------------------------------------------------- */

export function Settings({
  team,
  rows,
  isOwner,
  page,
  hasNext,
  pageSize,
  sort,
  order,
  searchQuery,
  basePath,
  initialParams,
}: SettingsProps) {
  const paidUntilDate = team.subscriptionPaidUntil
    ? new Date(team.subscriptionPaidUntil)
    : null
  const now = new Date()
  const isActive = paidUntilDate && paidUntilDate > now

  const planLabel = team.planName
    ? team.planName.charAt(0).toUpperCase() + team.planName.slice(1)
    : 'Free'

  return (
    <PageCard
      icon={Users}
      title='Team Settings'
      description='Manage your subscription, DID, and team members.'
    >
      <div className='space-y-8'>
        {/* Subscription -------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Team Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col justify-between gap-6 sm:flex-row'>
              <div>
                <p className='font-medium'>Current Plan: {planLabel}</p>
                <p className='text-muted-foreground text-sm'>
                  {isActive && paidUntilDate
                    ? `Active until ${paidUntilDate.toLocaleDateString()}`
                    : 'No active subscription'}
                </p>
              </div>

              {team.planName === 'base' || team.planName === 'plus' ? (
                <RenewSubscriptionButton planName={team.planName} />
              ) : (
                <Button asChild variant='outline'>
                  <a href='/pricing' className='flex items-center gap-2'>
                    Upgrade Plan
                    <ArrowRight className='h-4 w-4' />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DID ----------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Team DID</CardTitle>
          </CardHeader>
          <CardContent>
            {team.did ? (
              <>
                <p className='text-sm'>DID:</p>
                <p className='font-semibold break-all'>{team.did}</p>
              </>
            ) : (
              <p className='text-muted-foreground text-sm'>
                No DID yet. Create one in the PolkaStamp dashboard.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Members ------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className='overflow-x-auto'>
            <MembersTable
              rows={rows}
              isOwner={isOwner}
              sort={sort}
              order={order}
              basePath={basePath}
              initialParams={initialParams}
              searchQuery={searchQuery}
            />

            <TablePagination
              page={page}
              hasNext={hasNext}
              basePath={basePath}
              initialParams={initialParams}
              pageSize={pageSize}
            />
          </CardContent>
        </Card>

        {/* Invite -------------------------------------------------------- */}
        <InviteTeamMember isOwner={isOwner} />
      </div>
    </PageCard>
  )
}

export default Settings