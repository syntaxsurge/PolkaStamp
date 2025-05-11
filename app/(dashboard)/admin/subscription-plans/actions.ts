'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { planFeatures } from '@/lib/db/schema/pricing'

/* -------------------------------------------------------------------------- */
/*                              V A L I D A T I O N                           */
/* -------------------------------------------------------------------------- */

const schema = z.object({
  free: z.string(),
  base: z.string(),
  plus: z.string(),
})

/* -------------------------------------------------------------------------- */
/*                               A C T I O N                                  */
/* -------------------------------------------------------------------------- */

const _updatePlanFeatures = validatedActionWithUser(
  schema,
  async ({ free, base, plus }, _formData, user) => {
    if (user.role !== 'admin') return { error: 'Unauthorized.' }

    const parse = (txt: string) =>
      txt
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)

    const plans: Record<'free' | 'base' | 'plus', string[]> = {
      free: parse(free),
      base: parse(base),
      plus: parse(plus),
    }

    await db.transaction(async (tx) => {
      for (const [key, list] of Object.entries(plans) as [keyof typeof plans, string[]][]) {
        await tx.delete(planFeatures).where(eq(planFeatures.planKey, key))
        if (list.length) {
          await tx.insert(planFeatures).values(
            list.map((feature, i) => ({
              planKey: key,
              feature,
              sortOrder: i + 1,
            })),
          )
        }
      }
    })

    /* Invalidate pricing pages */
    revalidatePath('/pricing')
    revalidatePath('/admin/subscription-plans')

    return { success: 'Plan features updated.' }
  },
)

export const updatePlanFeaturesAction = async (...args: Parameters<typeof _updatePlanFeatures>) => {
  'use server'
  return _updatePlanFeatures(...args)
}
