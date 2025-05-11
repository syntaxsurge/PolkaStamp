import type { Metadata } from 'next'

import { AccountBalance } from '@/components/account/account-balance'

export const metadata: Metadata = {
  title: 'Account Balance',
  description: 'View the balance of your connected wallet on the selected chain.',
}

export default function BalancePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-64px)] w-full max-w-lg items-center justify-center p-4">
      <AccountBalance />
    </section>
  )
}