import { eq, asc } from 'drizzle-orm'

import { SERVER_CALLER } from '@/lib/constants/blockchain'
import { PLAN_META } from '@/lib/constants/pricing'
import { db } from '@/lib/db/drizzle'
import { planFeatures } from '@/lib/db/schema/pricing'
import { priceOf } from '@/lib/subscription-manager'
import type { PlanMeta } from '@/lib/types/pricing'

/* -------------------------------------------------------------------------- */
/*                         Runtime plan-metadata helper                       */
/* -------------------------------------------------------------------------- */

/** Serialisable variant for client components (priceWei as string). */
export type PlanMetaSerialised = Omit<PlanMeta, 'priceWei'> & { priceWei: string }

/* ----------------------------- feature lists ------------------------------ */

/**
 * Fetch ordered feature strings for a given plan key; falls back to compile-time
 * PLAN_META when the database table is empty (first-run safety).
 */
async function getFeatures(planKey: 'free' | 'base' | 'plus'): Promise<string[]> {
  const rows = await db
    .select({ feature: planFeatures.feature })
    .from(planFeatures)
    .where(eq(planFeatures.planKey, planKey))
    .orderBy(asc(planFeatures.sortOrder))

  if (rows.length) return rows.map((r) => r.feature)

  /* Bootstrap with PLAN_META defaults */
  const constant = PLAN_META.find((p) => p.key === planKey)
  return constant ? [...constant.features] : []
}

/* -------------------------------------------------------------------------- */
/*                         P A P I   P R I C E   R E A D S                    */
/* -------------------------------------------------------------------------- */

/**
 * Combine on-chain prices read via Polkadot-API with DB-driven feature lists.
 */
export async function fetchPlanMeta(): Promise<PlanMetaSerialised[]> {
  const [baseWeiRaw, plusWeiRaw, freeFeat, baseFeat, plusFeat] = await Promise.all([
    priceOf({ account: SERVER_CALLER, planKey: 1 }),
    priceOf({ account: SERVER_CALLER, planKey: 2 }),
    getFeatures('free'),
    getFeatures('base'),
    getFeatures('plus'),
  ])

  /* Fallback to constants when the chain call returns null */
  const baseConst = PLAN_META.find((p) => p.key === 'base')!.priceWei
  const plusConst = PLAN_META.find((p) => p.key === 'plus')!.priceWei

  const baseWei = baseWeiRaw ?? baseConst
  const plusWei = plusWeiRaw ?? plusConst

  return [
    {
      key: 'free',
      name: 'Free',
      highlight: true,
      priceWei: '0',
      features: freeFeat,
    },
    {
      key: 'base',
      name: 'Base',
      priceWei: baseWei.toString(),
      features: baseFeat,
    },
    {
      key: 'plus',
      name: 'Plus',
      priceWei: plusWei.toString(),
      features: plusFeat,
    },
  ]
}
