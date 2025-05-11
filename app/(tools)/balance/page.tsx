import { CircleDollarSign } from 'lucide-react'
import type { Metadata } from 'next'

import { AccountBalance } from '@/components/account/account-balance'
import PageCard from '@/components/ui/page-card'

export const metadata: Metadata = {
  title: 'Account Balance',
  description: 'View the balance of your connected wallet on the selected chain.',
}

export default function BalancePage() {
  return (
    <div className='mx-auto max-w-lg p-4'>
      <PageCard
        icon={CircleDollarSign}
        title='Account Balance'
        description='View the balance of your connected wallet on the selected chain.'
        className='w-full'
      >
        <div className='flex items-center justify-center'>
          <AccountBalance />
        </div>
      </PageCard>
    </div>
  )
}
