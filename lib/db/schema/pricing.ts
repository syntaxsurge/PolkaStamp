import { pgTable, serial, varchar, integer, uniqueIndex } from 'drizzle-orm/pg-core'

/* -------------------------------------------------------------------------- */
/*                        S U B S C R I P T I O N   P L A N S                 */
/* -------------------------------------------------------------------------- */

/**
 * Normalised feature list for each subscription tier.
 *
 * ─ schema ───────────────────────────────────────────────────────────────────
 *  id          PK
 *  plan_key    'free' | 'base' | 'plus'
 *  feature     Benefit bullet rendered in pricing grid
 *  sort_order  1-based position to preserve ordering
 * ────────────────────────────────────────────────────────────────────────────
 */
export const planFeatures = pgTable(
  'plan_features',
  {
    id: serial('id').primaryKey(),
    planKey: varchar('plan_key', { length: 50 }).notNull(),
    feature: varchar('feature', { length: 255 }).notNull(),
    sortOrder: integer('sort_order').notNull().default(1),
  },
  (t) => [uniqueIndex('plan_features_plan_sort_idx').on(t.planKey, t.sortOrder)],
)

export type PlanFeature = typeof planFeatures.$inferSelect
export type NewPlanFeature = typeof planFeatures.$inferInsert
