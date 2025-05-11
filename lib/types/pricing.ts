/**
 * Shared typings for pricing plans.
 * These are imported by both UI components and on-chain helpers.
 */

/** Canonical plan identifiers */
export type PlanKey = 'free' | 'base' | 'plus'

/**
 * Metadata schema for each subscription tier.
 * Mirrored in `lib/constants/pricing.ts` for runtime use.
 */
export interface PlanMeta {
  /** Unique key matching the on-chain enum value */
  key: PlanKey
  /** Marketing display name */
  name: string
  /** Feature bullet list */
  features: string[]
  /** Optional flag to highlight the tier in UI */
  highlight?: boolean
  /** Price in wei (0 wei = free tier) */
  priceWei: bigint
}
