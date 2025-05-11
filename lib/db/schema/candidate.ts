import { relations } from 'drizzle-orm'
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  uniqueIndex,
  text,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core'

import { users } from './core'
import { issuers } from './issuer'

/* -------------------------------------------------------------------------- */
/*                              C A N D I D A T E S                           */
/* -------------------------------------------------------------------------- */

export const candidates = pgTable(
  'candidates',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    bio: text('bio'),
    /** AI-generated 120-word profile summary */
    summary: text('summary'),
    /** SHA-256 hash of profile content used for the last summary */
    summaryHash: varchar('summary_hash', { length: 64 }),
    /** Timestamp when the last AI summary was generated */
    summaryGeneratedAt: timestamp('summary_generated_at'),
    /** How many AI summaries were generated on the generation date */
    summaryDailyCount: integer('summary_daily_count').notNull().default(0),
    /** Optional social links */
    twitterUrl: varchar('twitter_url', { length: 255 }),
    githubUrl: varchar('github_url', { length: 255 }),
    linkedinUrl: varchar('linkedin_url', { length: 255 }),
    websiteUrl: varchar('website_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [uniqueIndex('candidates_user_id_idx').on(t.userId)],
)

/* -------------------------------------------------------------------------- */
/*                       C A N D I D A T E   C R E D E N T I A L S            */
/* -------------------------------------------------------------------------- */

export const credentialCategoryEnum = pgEnum('credential_category', [
  'EDUCATION',
  'EXPERIENCE',
  'PROJECT',
  'AWARD',
  'CERTIFICATION',
  'OTHER',
])

export enum CredentialCategory {
  EDUCATION = 'EDUCATION',
  EXPERIENCE = 'EXPERIENCE',
  PROJECT = 'PROJECT',
  AWARD = 'AWARD',
  CERTIFICATION = 'CERTIFICATION',
  OTHER = 'OTHER',
}

export enum CredentialStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export const candidateCredentials = pgTable('candidate_credentials', {
  id: serial('id').primaryKey(),
  candidateId: integer('candidate_id')
    .notNull()
    .references(() => candidates.id),
  issuerId: integer('issuer_id').references(() => issuers.id),
  category: credentialCategoryEnum('category').notNull().default(CredentialCategory.OTHER),
  title: varchar('title', { length: 200 }).notNull(),
  /**
   * Fine-grained type identifier (e.g. 'bachelor', 'certificate').
   */
  type: varchar('type', { length: 50 }).notNull(),
  /** HTTP or IPFS link (e.g. ipfs://<cid>/filename.pdf) */
  fileUrl: text('file_url'),
  /** -------------------------------------------------------------------- */
  status: varchar('status', { length: 20 }).notNull().default(CredentialStatus.UNVERIFIED),
  verified: boolean('verified').notNull().default(false),
  /** Polkadot transaction hash anchoring the Credential NFT (optional). */
  txHash: text('tx_hash'),
  /** Full VC JSON (optional). */
  vcJson: text('vc_json'),
  issuedAt: timestamp('issued_at'),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/* -------------------------------------------------------------------------- */
/*                   N E W   C A N D I D A T E   H I G H L I G H T S          */
/* -------------------------------------------------------------------------- */

export const candidateHighlights = pgTable(
  'candidate_highlights',
  {
    id: serial('id').primaryKey(),
    candidateId: integer('candidate_id')
      .notNull()
      .references(() => candidates.id, { onDelete: 'cascade' }),
    credentialId: integer('credential_id')
      .notNull()
      .references(() => candidateCredentials.id, { onDelete: 'cascade' }),
    /** 1-based position used for drag-and-drop sorting */
    sortOrder: integer('sort_order').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('candidate_highlights_candidate_credential_idx').on(t.candidateId, t.credentialId),
    uniqueIndex('candidate_highlights_candidate_sort_idx').on(t.candidateId, t.sortOrder),
  ],
)

/* -------------------------------------------------------------------------- */
/*                         A I   S K I L L   Q U I Z Z E S                    */
/* -------------------------------------------------------------------------- */

export const skillQuizzes = pgTable('skill_quizzes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const skillQuizQuestions = pgTable('skill_quiz_questions', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id')
    .notNull()
    .references(() => skillQuizzes.id, { onDelete: 'cascade' }),
  prompt: text('prompt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const quizAttempts = pgTable('quiz_attempts', {
  id: serial('id').primaryKey(),
  candidateId: integer('candidate_id').notNull(),
  quizId: integer('quiz_id').notNull(),
  /** Hex-encoded RNG seed that produced the question order */
  seed: varchar('seed', { length: 66 }).notNull().default(''),
  score: integer('score'),
  maxScore: integer('max_score').default(100),
  pass: integer('pass').default(0),
  vcIssuedId: text('vc_issued_id'),
  /** Optional Verifiable Credential JSON */
  vcJson: text('vc_json'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/* -------------------------------------------------------------------------- */
/*                                R E L A T I O N S                           */
/* -------------------------------------------------------------------------- */

export const candidatesRelations = relations(candidates, ({ one, many }) => ({
  user: one(users, {
    fields: [candidates.userId],
    references: [users.id],
  }),
  credentials: many(candidateCredentials),
  quizAttempts: many(quizAttempts),
  highlights: many(candidateHighlights),
}))

export const candidateCredentialsRelations = relations(candidateCredentials, ({ one, many }) => ({
  candidate: one(candidates, {
    fields: [candidateCredentials.candidateId],
    references: [candidates.id],
  }),
  issuer: one(issuers, {
    fields: [candidateCredentials.issuerId],
    references: [issuers.id],
  }),
  highlights: many(candidateHighlights),
}))

export const candidateHighlightsRelations = relations(candidateHighlights, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateHighlights.candidateId],
    references: [candidates.id],
  }),
  credential: one(candidateCredentials, {
    fields: [candidateHighlights.credentialId],
    references: [candidateCredentials.id],
  }),
}))

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  candidate: one(candidates, {
    fields: [quizAttempts.candidateId],
    references: [candidates.id],
  }),
  quiz: one(skillQuizzes, {
    fields: [quizAttempts.quizId],
    references: [skillQuizzes.id],
  }),
}))

export const skillQuizQuestionsRelations = relations(skillQuizQuestions, ({ one }) => ({
  quiz: one(skillQuizzes, {
    fields: [skillQuizQuestions.quizId],
    references: [skillQuizzes.id],
  }),
}))

/* -------------------------------------------------------------------------- */
/*                               T Y P E S                                    */
/* -------------------------------------------------------------------------- */

export type Candidate = typeof candidates.$inferSelect
export type NewCandidate = typeof candidates.$inferInsert

export type CandidateCredential = typeof candidateCredentials.$inferSelect
export type NewCandidateCredential = typeof candidateCredentials.$inferInsert

export type CandidateHighlight = typeof candidateHighlights.$inferSelect
export type NewCandidateHighlight = typeof candidateHighlights.$inferInsert

export type SkillQuiz = typeof skillQuizzes.$inferSelect
export type NewSkillQuiz = typeof skillQuizzes.$inferInsert

export type SkillQuizQuestion = typeof skillQuizQuestions.$inferSelect
export type NewSkillQuizQuestion = typeof skillQuizQuestions.$inferInsert

export type QuizAttempt = typeof quizAttempts.$inferSelect
export type NewQuizAttempt = typeof quizAttempts.$inferInsert