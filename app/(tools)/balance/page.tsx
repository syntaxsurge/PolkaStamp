import type { Metadata } from 'next'
import { CircleDollarSign } from 'lucide-react'

import PageCard from '@/components/ui/page-card'
import { AccountBalance } from '@/components/account/account-balance'

export const metadata: Metadata = {
  title: 'Account Balance',
  description: 'View the balance of your connected wallet on the selected chain.',
}

export default function BalancePage() {
  return (
    <div className="mx-auto max-w-lg p-4">
      <PageCard
        icon={CircleDollarSign}
        title="Account Balance"
        description="View the balance of your connected wallet on the selected chain."
        className="w-full"
      >
        <div className="flex items-center justify-center">
          <AccountBalance />
        </div>
      </PageCard>
    </div>
  )
}