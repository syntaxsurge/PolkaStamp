import { asc, eq } from 'drizzle-orm'
import { Tag } from 'lucide-react'

import PageCard from '@/components/ui/page-card'
import { priceOf } from '@/lib/subscription-manager'
import { SERVER_CALLER } from '@/lib/constants/blockchain'
import { db } from '@/lib/db/drizzle'
import { planFeatures } from '@/lib/db/schema/pricing'

import UpdatePlanFeaturesForm from './update-plan-features-form'
import UpdatePlanPricesForm from './update-plan-prices-form'

export const revalidate = 0

/**
 * Admin → Subscription Plans page
 * Lets an admin edit on-chain prices and database-driven feature lists.
 */
export default async function AdminPlanPricesPage() {
  /* -------------------------- Prices (on-chain) ------------------------- */
  const [baseWeiRaw, plusWeiRaw] = await Promise.all([
    priceOf({ account: SERVER_CALLER, planKey: 1 }),
    priceOf({ account: SERVER_CALLER, planKey: 2 }),
  ])

  const baseWei: bigint = baseWeiRaw ?? 0n
  const plusWei: bigint = plusWeiRaw ?? 0n

  /* -------------------------- Feature lists ----------------------------- */
  const [freeRows, baseRows, plusRows] = await Promise.all([
    db
      .select({ feature: planFeatures.feature })
      .from(planFeatures)
      .where(eq(planFeatures.planKey, 'free'))
      .orderBy(asc(planFeatures.sortOrder)),
    db
      .select({ feature: planFeatures.feature })
      .from(planFeatures)
      .where(eq(planFeatures.planKey, 'base'))
      .orderBy(asc(planFeatures.sortOrder)),
    db
      .select({ feature: planFeatures.feature })
      .from(planFeatures)
      .where(eq(planFeatures.planKey, 'plus'))
      .orderBy(asc(planFeatures.sortOrder)),
  ])

  const defaultFeatures = {
    free: freeRows.map((r) => r.feature),
    base: baseRows.map((r) => r.feature),
    plus: plusRows.map((r) => r.feature),
  }

  /* ------------------------------- View --------------------------------- */
  return (
    <PageCard
      icon={Tag}
      title='Subscription Plans'
      description='Update on-chain prices and marketing features for every tier.'
    >
      <UpdatePlanPricesForm
        defaultBaseWei={baseWei.toString()}
        defaultPlusWei={plusWei.toString()}
      />

      <hr className='my-8' />

      <UpdatePlanFeaturesForm defaultFeatures={defaultFeatures} />
    </PageCard>
  )
}