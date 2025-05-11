import { eq } from 'drizzle-orm'

import { PLAN_META } from '@/lib/constants/pricing'

import { db } from '../drizzle'
import { planFeatures } from '../schema/pricing'

/* -------------------------------------------------------------------------- */
/*                              S E E D E R                                   */
/* -------------------------------------------------------------------------- */

export async function seedPlanFeatures() {
  console.log('Seeding subscription-plan features…')

  for (const plan of PLAN_META) {
    const existing = await db
      .select({ id: planFeatures.id })
      .from(planFeatures)
      .where(eq(planFeatures.planKey, plan.key))

    if (existing.length === 0) {
      const rows = plan.features.map((feature, i) => ({
        planKey: plan.key,
        feature,
        sortOrder: i + 1,
      }))
      await db.insert(planFeatures).values(rows)
      console.log(`➕  ${rows.length} "${plan.name}” features inserted`)
    } else {
      console.log(`ℹ️  "${plan.name}” features already present`)
    }
  }

  console.log('✅  Plan-feature seeding complete.')
}
