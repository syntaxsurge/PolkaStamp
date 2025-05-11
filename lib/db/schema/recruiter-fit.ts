import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

import { candidates } from './candidate'
import { users } from './core'

/**
 * Cached "Why Hire” summaries keyed by (recruiter × candidate).
 * Hashes let us detect when either the candidate profile or the recruiter’s
 * pipelines changed, so we can return the previous JSON instantly.
 */
export const recruiterCandidateFits = pgTable(
  'recruiter_candidate_fits',
  {
    id: serial('id').primaryKey(),
    recruiterId: integer('recruiter_id')
      .notNull()
      .references(() => users.id),
    candidateId: integer('candidate_id')
      .notNull()
      .references(() => candidates.id),
    /** Raw JSON string returned by OpenAI (valid per fit-summary schema). */
    summaryJson: text('summary_json').notNull(),
    /** SHA-256 of candidate bio + credential list. */
    profileHash: varchar('profile_hash', { length: 64 }).notNull(),
    /** SHA-256 of the recruiter’s pipeline list. */
    pipelinesHash: varchar('pipelines_hash', { length: 64 }).notNull(),
    generatedAt: timestamp('generated_at').notNull().defaultNow(),
  },
  /* One row per recruiter × candidate */
  (t) => [uniqueIndex('recruiter_candidate_unique_idx').on(t.recruiterId, t.candidateId)],
)

export type RecruiterCandidateFit = typeof recruiterCandidateFits.$inferSelect
export type NewRecruiterCandidateFit = typeof recruiterCandidateFits.$inferInsert
