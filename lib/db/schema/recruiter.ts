import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core'

import { candidates } from './candidate'
import { users } from './core'

/**
 * Recruiter-controlled pipelines (e.g. “Backend Engineer May 2025”).
 */
export const recruiterPipelines = pgTable('recruiter_pipelines', {
  id: serial('id').primaryKey(),
  recruiterId: integer('recruiter_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 150 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/** Candidate membership in a pipeline with a lightweight stage label */
export const pipelineCandidates = pgTable('pipeline_candidates', {
  id: serial('id').primaryKey(),
  pipelineId: integer('pipeline_id')
    .notNull()
    .references(() => recruiterPipelines.id),
  candidateId: integer('candidate_id')
    .notNull()
    .references(() => candidates.id),
  /** e.g. sourced → screening → interview 1 → offer */
  stage: varchar('stage', { length: 50 }).notNull().default('sourced'),
  notes: text('notes'),
  addedAt: timestamp('added_at').notNull().defaultNow(),
})

export const recruiterPipelinesRelations = relations(recruiterPipelines, ({ one, many }) => ({
  recruiter: one(users, {
    fields: [recruiterPipelines.recruiterId],
    references: [users.id],
  }),
  pipelineCandidates: many(pipelineCandidates),
}))

export const pipelineCandidatesRelations = relations(pipelineCandidates, ({ one }) => ({
  pipeline: one(recruiterPipelines, {
    fields: [pipelineCandidates.pipelineId],
    references: [recruiterPipelines.id],
  }),
  candidate: one(candidates, {
    fields: [pipelineCandidates.candidateId],
    references: [candidates.id],
  }),
}))
