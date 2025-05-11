import type { ComponentPropsWithoutRef } from 'react'

import type { Avatar } from '@/components/ui/avatar'
import type { PlanMeta } from '@/lib/types/pricing'

/* -------------------------------------------------------------------------- */
/*                               User Avatar                                  */
/* -------------------------------------------------------------------------- */

/**
 * Props for the <UserAvatar/> component.
 * Extends the underlying shadcn/ui <Avatar> whilst adding domain-specific
 * convenience fields used across the app.
 */
export interface UserAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {
  /** Optional remote image URL */
  src?: string | null
  /** User’s display name */
  name?: string | null
  /** Fallback — user’s email address */
  email?: string | null
  /** Number of characters to show in the fallback initials (default 2) */
  initialsLength?: number
}

/* -------------------------------------------------------------------------- */
/*                               Pricing Grid                                 */
/* -------------------------------------------------------------------------- */

/** Serialisable variant used by the client-side pricing grid */
export type PlanMetaSerialised = Omit<PlanMeta, 'priceWei'> & { priceWei: string }

/**
 * Props consumed by the <PricingGrid/> marketing component.
 */
export interface PricingGridProps {
  /** Team’s current plan ("Free” | "Base” | "Plus”) or <code>null</code> if anonymous. */
  currentPlanName?: string | null
  /** Live plan metadata pulled from the SubscriptionManager contract. */
  planMeta: PlanMetaSerialised[]
}

/* -------------------------------------------------------------------------- */
/*                          Table-navigation Hook                             */
/* -------------------------------------------------------------------------- */

/** Query-string key overrides accepted by <code>useTableNavigation</code>. */
export interface TableNavigationParamKeys {
  /** Sort column key (default <code>sort</code>) */
  sort?: string
  /** Sort-order key (default <code>order</code>) */
  order?: string
  /** Search term key (default <code>q</code>) */
  search?: string
  /** Page number key (default <code>page</code>) */
  page?: string
}

/**
 * Options bag consumed by the <code>useTableNavigation</code> hook.
 */
export interface TableNavigationOptions {
  /** Base pathname for <code>router.push</code>. */
  basePath: string
  /** Params that should persist across navigations (e.g. existing filters). */
  initialParams: Record<string, string>
  /** Current sort column. */
  sort: string
  /** Current sort order. */
  order: 'asc' | 'desc'
  /** Current search value (from URL). */
  searchQuery: string
  /** Optional query-param key overrides. */
  paramKeys?: TableNavigationParamKeys
  /** Debounce in ms for server navigation (default 400). */
  debounce?: number
}
