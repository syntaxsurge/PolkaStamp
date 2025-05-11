import { eq, asc, and } from 'drizzle-orm'

import CandidateDetailedProfileView from '@/components/dashboard/candidate/profile-detailed-view'
import AddToPipelineForm from '@/components/recruiter/add-to-pipeline-form'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { getCandidateCredentialsSection } from '@/lib/db/queries/candidate-credentials-core'
import { getCandidateSkillPassesSection } from '@/lib/db/queries/candidate-skill-passes'
import { getCandidatePipelineEntriesPage } from '@/lib/db/queries/recruiter-pipeline-entries'
import { candidates, users } from '@/lib/db/schema'
import {
  candidateHighlights,
  candidateCredentials,
  CredentialCategory,
  CredentialStatus,
} from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'
import { recruiterPipelines } from '@/lib/db/schema/recruiter'
import { recruiterCandidateFits } from '@/lib/db/schema/recruiter-fit'
import type { StatusCounts } from '@/lib/types/candidate'
import type { PipelineEntryRow, RecruiterCredentialRow, SkillPassRow } from '@/lib/types/tables'
import {
  getTableParams,
  getSectionParams,
  resolveSearchParams,
  type Query,
} from '@/lib/utils/query'

export const revalidate = 0

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

type Params = { id: string }

export default async function PublicCandidateProfile({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams?: Promise<Query>
}) {
  /* ------------------------ Dynamic route param ------------------------- */
  const { id } = await params
  const candidateId = Number(id)

  /* ------------ Uniformly resolve sync/async Next.js searchParams -------- */
  const q = await resolveSearchParams(searchParams)

  /* ----------------------------- Candidate row --------------------------- */
  const [row] = await db
    .select({ cand: candidates, userRow: users })
    .from(candidates)
    .leftJoin(users, eq(candidates.userId, users.id))
    .where(eq(candidates.id, candidateId))
    .limit(1)

  if (!row) return <div>Candidate not found.</div>

  /* -------------------------- Logged-in user ----------------------------- */
  const user = await requireAuth()
  const isRecruiter = user?.role === 'recruiter'

  /* ---------------------------------------------------------------------- */
  /*                     Recruiter-specific fit summary                     */
  /* ---------------------------------------------------------------------- */
  let fitSummary: string | undefined
  if (isRecruiter) {
    const [fit] = await db
      .select({ summaryJson: recruiterCandidateFits.summaryJson })
      .from(recruiterCandidateFits)
      .where(
        and(
          eq(recruiterCandidateFits.recruiterId, user!.id),
          eq(recruiterCandidateFits.candidateId, candidateId),
        ),
      )
      .limit(1)
    if (fit) fitSummary = fit.summaryJson
  }

  /* ---------------------------------------------------------------------- */
  /*                    Experiences & Projects (Highlights)                 */
  /* ---------------------------------------------------------------------- */
  const highlightRows = await db
    .select({
      id: candidateCredentials.id,
      title: candidateCredentials.title,
      createdAt: candidateCredentials.createdAt,
      issuerName: issuers.name,
      link: candidateCredentials.fileUrl,
      description: candidateCredentials.type,
      status: candidateCredentials.status,
      category: candidateCredentials.category,
      sortOrder: candidateHighlights.sortOrder,
    })
    .from(candidateHighlights)
    .innerJoin(candidateCredentials, eq(candidateHighlights.credentialId, candidateCredentials.id))
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))
    .where(eq(candidateHighlights.candidateId, candidateId))

  const experiences = highlightRows
    .filter((h) => h.category === CredentialCategory.EXPERIENCE)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((e) => ({
      id: e.id,
      title: e.title,
      company: e.issuerName,
      createdAt: e.createdAt,
      status: e.status as CredentialStatus,
    }))

  const projects = highlightRows
    .filter((h) => h.category === CredentialCategory.PROJECT)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((p) => ({
      id: p.id,
      title: p.title,
      link: p.link,
      description: p.description,
      createdAt: p.createdAt,
      status: p.status as CredentialStatus,
    }))

  /* ---------------------------------------------------------------------- */
  /*                 Credentials (shared core helper)                       */
  /* ---------------------------------------------------------------------- */
  const {
    page,
    pageSize,
    sort,
    order,
    searchTerm,
    initialParams: credInitialParams,
  } = getTableParams(q, ['status', 'title', 'issuer', 'category', 'type', 'id'] as const, 'status')

  const {
    rows: rawCredRows,
    hasNext,
    statusCounts,
  } = await getCandidateCredentialsSection(
    candidateId,
    page,
    pageSize,
    sort as any,
    order as any,
    searchTerm,
  )

  const credRows: RecruiterCredentialRow[] = rawCredRows.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category ?? CredentialCategory.OTHER,
    issuer: c.issuer ?? null,
    status: c.status as CredentialStatus,
    fileUrl: c.fileUrl ?? null,
    txHash: c.txHash ?? null,
    vcJson: c.vcJson ?? null,
  }))

  /* ---------------------------------------------------------------------- */
  /*                     Skill Passes (prefixed helper)                     */
  /* ---------------------------------------------------------------------- */
  const {
    page: passPage,
    pageSize: passPageSize,
    sort: passSort,
    order: passOrder,
    searchTerm: passSearch,
    initialParams: passInitialParams,
  } = getSectionParams(q, 'pass', ['quizTitle', 'score', 'createdAt'] as const, 'createdAt')

  const { rows: passRows, hasNext: passHasNext } = await getCandidateSkillPassesSection(
    candidateId,
    passPage,
    passPageSize,
    passSort as 'quizTitle' | 'score' | 'createdAt',
    passOrder,
    passSearch,
  )

  /* ---------------------------------------------------------------------- */
  /*                   Recruiter-only Pipeline Entries                      */
  /* ---------------------------------------------------------------------- */
  let pipelineSummary: string | undefined
  let pipelineSection:
    | {
        rows: PipelineEntryRow[]
        sort: string
        order: 'asc' | 'desc'
        pagination: {
          page: number
          hasNext: boolean
          pageSize: number
          basePath: string
          initialParams: Record<string, string>
        }
        addToPipelineForm?: React.ReactNode
      }
    | undefined

  if (isRecruiter) {
    /* Pipelines for dropdown ------------------------------------------------ */
    const pipelines = await db
      .select({ id: recruiterPipelines.id, name: recruiterPipelines.name })
      .from(recruiterPipelines)
      .where(eq(recruiterPipelines.recruiterId, user!.id))
      .orderBy(asc(recruiterPipelines.name))

    /* Pipeline entries params ---------------------------------------------- */
    const {
      page: pipePage,
      pageSize: pipePageSize,
      sort: pipeSort,
      order: pipeOrder,
      searchTerm: pipeSearch,
      initialParams: pipeInitialParams,
    } = getSectionParams(q, 'pipe', ['pipelineName', 'stage', 'addedAt'] as const, 'addedAt')

    /* Entries listing ------------------------------------------------------- */
    const { entries, hasNext: pipeHasNext } = await getCandidatePipelineEntriesPage(
      candidateId,
      user!.id,
      pipePage,
      pipePageSize,
      pipeSort as 'pipelineName' | 'stage' | 'addedAt',
      pipeOrder,
      pipeSearch,
    )

    /* Summary label */
    const uniquePipelines = new Set(entries.map((e) => e.pipelineName))
    if (entries.length > 0) {
      pipelineSummary =
        uniquePipelines.size === 1
          ? `In ${[...uniquePipelines][0]}`
          : `In ${uniquePipelines.size} Pipelines`
    }

    pipelineSection = {
      rows: entries,
      sort: pipeSort,
      order: pipeOrder as 'asc' | 'desc',
      pagination: {
        page: pipePage,
        hasNext: pipeHasNext,
        pageSize: pipePageSize,
        basePath: `/candidates/${candidateId}`,
        initialParams: pipeInitialParams,
      },
      addToPipelineForm: <AddToPipelineForm candidateId={candidateId} pipelines={pipelines} />,
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                               Render                                   */
  /* ---------------------------------------------------------------------- */
  return (
    <CandidateDetailedProfileView
      candidateId={candidateId}
      name={row.userRow?.name ?? null}
      email={row.userRow?.email ?? ''}
      avatarSrc={(row.userRow as any)?.image ?? null}
      bio={row.cand.bio ?? null}
      summary={row.cand.summary ?? null}
      pipelineSummary={pipelineSummary}
      fitSummary={fitSummary}
      statusCounts={statusCounts as StatusCounts}
      passes={{
        rows: passRows as SkillPassRow[],
        sort: passSort,
        order: passOrder as 'asc' | 'desc',
        pagination: {
          page: passPage,
          hasNext: passHasNext,
          pageSize: passPageSize,
          basePath: `/candidates/${candidateId}`,
          initialParams: passInitialParams,
        },
      }}
      experiences={experiences}
      projects={projects}
      socials={{
        twitterUrl: row.cand.twitterUrl,
        githubUrl: row.cand.githubUrl,
        linkedinUrl: row.cand.linkedinUrl,
        websiteUrl: row.cand.websiteUrl,
      }}
      credentials={{
        rows: credRows,
        sort,
        order: order as 'asc' | 'desc',
        pagination: {
          page,
          hasNext,
          pageSize,
          basePath: `/candidates/${candidateId}`,
          initialParams: credInitialParams,
        },
      }}
      pipeline={pipelineSection}
      showShare
    />
  )
}
