import { PricingGrid } from '@/components/pricing/pricing-grid'
import { getUser, getTeamForUser } from '@/lib/db/queries/queries'
import { fetchPlanMeta } from '@/lib/payments/pricing'

export default async function PricingPage() {
  const [planMeta, user] = await Promise.all([fetchPlanMeta(), getUser()])

  let currentPlanName: string | null = null
  if (user) {
    const team = await getTeamForUser(user.id)
    currentPlanName = team?.planName ?? 'Free'
  }

  return (
    <main className='px-4 sm:px-6 lg:px-8'>
      <PricingGrid planMeta={planMeta} currentPlanName={currentPlanName} />
    </main>
  )
}
