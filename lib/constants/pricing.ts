import type { PlanKey, PlanMeta } from '@/lib/types/pricing'

/**
 * Subscription pricing metadata shared by frontend UI and
 * server-side logic.  All amounts are expressed in wei and **must**
 * mirror the on-chain `SubscriptionManager` configuration.
 */

export const PLAN_KEYS: readonly PlanKey[] = ['free', 'base', 'plus'] as const

/** Native RBTC token decimals (18). */
export const RBTC_DECIMALS = 18

/**
 * Immutable price & feature table.
 * ⚠️  Keep this array **sorted** in display order for the pricing grid.
 */
export const PLAN_META: readonly PlanMeta[] = [
  {
    key: 'free',
    name: 'Free',
    highlight: true,
    priceWei: 0n,
    features: [
      'Unlimited Credentials',
      'Unlimited Skill Passes',
      'Team Workspace',
      'Basic Email Support',
      'Public Recruiter Profile',
    ],
  },
  {
    key: 'base',
    name: 'Base',
    priceWei: 5_000_000_000_000_000_000n, // 0.005 RBTC
    features: [
      'Everything in Free',
      'Up to 5 Recruiter Seats',
      '50 AI Skill Checks / month',
      '50 Credential Verifications / month',
      'Advanced Talent Search Filters',
      'Exportable Reports',
    ],
  },
  {
    key: 'plus',
    name: 'Plus',
    priceWei: 10_000_000_000_000_000_000n, // 0.01 RBTC
    features: [
      'Everything in Base',
      'Unlimited Recruiter Seats',
      'Unlimited Skill Checks & Verifications',
      'Custom Branding & Domain',
      'API Access',
      'Priority Issuer Application Review',
    ],
  },
] as const

/**
 * Helper: return strongly-typed plan metadata for a given key.
 */
export function getPlanMeta(key: PlanKey): PlanMeta {
  const meta = PLAN_META.find((p) => p.key === key)
  if (!meta) throw new Error(`Unknown plan key: ${key}`)
  return meta
}

/* Re-export typings for convenience */
export type { PlanMeta, PlanKey }
